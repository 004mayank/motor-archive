import { getDb } from "@/db";
import {
  vehicles,
  editions,
  sections,
  sources,
  claims,
  imageAssets,
  documents,
  runs,
  steps,
  settings,
  campaigns,
  reviews,
} from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { Tavily, CompatibleWriter, discoverImages } from "./providers";
import {
  allowedLicense,
  qualityGates,
  canPublish,
  scoreCandidates,
} from "./quality";
const stages = [
  "selection",
  "research",
  "article",
  "images",
  "workshop",
  "quality",
] as const;
export async function editionQuality(id: string) {
  const db = getDb();
  const [e] = await db.select().from(editions).where(eq(editions.id, id));
  if (!e) throw Error("VALIDATION: Unknown edition");
  const ss = await db.select().from(sections).where(eq(sections.editionId, id));
  const cc = await db
    .select()
    .from(claims)
    .leftJoin(sources, eq(claims.sourceId, sources.id))
    .where(eq(claims.editionId, id));
  const ii = await db
    .select()
    .from(imageAssets)
    .where(eq(imageAssets.vehicleSlug, e.vehicleSlug));
  const gates = qualityGates({
    sample: e.sample,
    sections: ss,
    headline: e.headline,
    excerpt: e.excerpt,
    claims: cc.map((c) => ({
      ...c.claims,
      sourceUrl: c.sources?.url,
      passage: c.claims.passage || undefined,
    })),
    images: ii.filter((i) => i.identityVerified && i.rightsVerified),
  });
  gates.push({
    name: "Approved cover photograph",
    passed:
      !!e.image &&
      ii.some(
        (i) =>
          i.url === e.image &&
          i.identityVerified &&
          i.rightsVerified &&
          allowedLicense(i.license),
      ),
    critical: true,
    detail:
      "The cover must belong to this vehicle and have reviewed identity and rights.",
  });
  return gates;
}
export async function startRun(key: string, dryRun = true) {
  const db = getDb();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const [modeSetting] = await db
    .select()
    .from(settings)
    .where(eq(settings.key, "publishing_mode"));
  const mode = ["draft", "approval", "automatic"].includes(modeSetting?.value)
    ? modeSetting.value
    : "approval";
  await db
    .insert(runs)
    .values({
      id,
      idempotencyKey: key,
      mode,
      status: "queued",
      dryRun,
      createdAt: now,
    })
    .onConflictDoNothing();
  const [run] = await db
    .select()
    .from(runs)
    .where(eq(runs.idempotencyKey, key));
  return run;
}
export async function advanceRun(id: string) {
  const db = getDb();
  const [run] = await db.select().from(runs).where(eq(runs.id, id));
  if (!run) throw Error("VALIDATION: Unknown run");
  if (
    [
      "awaiting_review",
      "published",
      "draft_complete",
      "dry_run_complete",
      "blocked",
    ].includes(run.status)
  )
    return run;
  const config = await db.select().from(settings);
  const budget = Number(
    config.find((s) => s.key === "monthly_budget")?.value || 25,
  );
  const month = new Date().toISOString().slice(0, 7);
  const spent = await db
    .select({ total: sql<number>`coalesce(sum(cost),0)` })
    .from(runs)
    .where(sql`substr(created_at,1,7) = ${month}`);
  if (spent[0].total >= budget) throw Error("Monthly spending limit reached");
  const completed = await db.select().from(steps).where(eq(steps.runId, id));
  const stage = stages.find(
    (s) => !completed.some((c) => c.stage === s && c.status === "completed"),
  );
  if (!stage) return run;
  const stepId = id + "-" + stage;
  await db
    .insert(steps)
    .values({
      id: stepId,
      runId: id,
      stage,
      status: "pending",
      attempts: 0,
      updatedAt: new Date().toISOString(),
    })
    .onConflictDoNothing();
  const locked = await db
    .update(steps)
    .set({
      status: "running",
      attempts: sql`attempts + 1`,
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(steps.id, stepId),
        sql`status != 'completed' AND attempts < 3 AND (status != 'running' OR updated_at < ${new Date(Date.now() - 120000).toISOString()})`,
      ),
    )
    .returning();
  if (!locked.length)
    throw Error("Stage is already running or its retry limit was reached");
  try {
    let result: unknown;
    let editionId = run.editionId;
    let [edition] = editionId
      ? await db.select().from(editions).where(eq(editions.id, editionId))
      : [];
    if (stage === "selection") {
      const candidates = await db.select().from(vehicles);
      const featured = await db
        .select({ slug: editions.vehicleSlug })
        .from(editions);
      const ranked = scoreCandidates(
        candidates,
        candidates.filter((c) =>
          featured.slice(-8).some((f) => f.slug === c.slug),
        ),
        featured.map((f) => f.slug),
      );
      const selected = ranked[0]?.vehicle;
      if (!selected)
        throw Error(
          "No unfeatured candidate is available. Add a researched vehicle generation before retrying.",
        );
      const max = await db
        .select({ n: sql<number>`coalesce(max(number),0)` })
        .from(editions);
      editionId = "edition-" + id;
      await db
        .insert(editions)
        .values({
          id: editionId,
          vehicleSlug: selected.slug,
          number: max[0].n + 1,
          headline: "Research in progress",
          excerpt:
            "This edition is awaiting evidence-led research and editorial review.",
          image: "",
          status: "draft",
          sample: false,
          createdAt: new Date().toISOString(),
        })
        .onConflictDoNothing();
      await db
        .update(runs)
        .set({
          editionId,
          rationale: ranked[0].rationale,
          status: "running",
        })
        .where(eq(runs.id, id));
      result = { vehicle: selected.slug };
    }
    if (stage !== "selection") {
      if (!edition) throw Error("Edition is missing");
      const [vehicle] = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.slug, edition.vehicleSlug));
      const name =
        vehicle.manufacturer +
        " " +
        vehicle.model +
        " " +
        vehicle.generation +
        " " +
        vehicle.startYear +
        " " +
        vehicle.endYear;
      if (stage === "research") {
        const found = await new Tavily().search(
          name + " official manufacturer history engineering archive",
        );
        if (found.length < 3) throw Error("Insufficient source coverage");
        for (let i = 0; i < found.length; i++) {
          const s = found[i];
          await db
            .insert(sources)
            .values({
              id: id + "-source-" + i,
              editionId: edition.id,
              title: s.title,
              publisher: new URL(s.url).hostname,
              url: s.url,
              retrievedAt: new Date().toISOString(),
              kind: "discovery candidate",
            })
            .onConflictDoNothing();
        }
        result = found;
        await db
          .update(runs)
          .set({ cost: sql`cost + 0.02` })
          .where(eq(runs.id, id));
      }
      if (stage === "article") {
        const [research] = completed.filter((s) => s.stage === "research");
        const found = JSON.parse(research.result || "[]");
        const article = await new CompatibleWriter().write(found, name);
        await db.delete(sections).where(eq(sections.editionId, edition.id));
        await db.delete(claims).where(eq(claims.editionId, edition.id));
        const stored = await db
          .select()
          .from(sources)
          .where(eq(sources.editionId, edition.id));
        await db.insert(sections).values(
          article.sections.map((s, i) => ({
            id: edition.id + "-section-" + i,
            editionId: edition.id,
            position: i,
            heading: s.heading,
            body: s.body,
            sourceId: stored.find((k) => k.url === s.sourceUrl)?.id,
          })),
        );
        if (article.claims.length)
          await db.insert(claims).values(
            article.claims.map((c, i) => ({
              id: edition.id + "-claim-" + i,
              editionId: edition.id,
              claim: c.claim,
              sourceId: stored.find((s) => s.url === c.sourceUrl)?.id,
              passage: c.passage,
              verified: false,
            })),
          );
        await db
          .update(editions)
          .set({
            headline: article.headline,
            excerpt: article.excerpt,
            version: sql`version + 1`,
          })
          .where(eq(editions.id, edition.id));
        await db
          .update(runs)
          .set({ cost: sql`cost + 0.50` })
          .where(eq(runs.id, id));
        result = {
          sections: article.sections.length,
          claims: article.claims.length,
          note: "Independent verification required; cost is a conservative estimate, reconcile with provider usage.",
        };
      }
      if (stage === "images") {
        const found = await discoverImages(name);
        const pages = Object.values(found.query?.pages || {});
        let count = 0;
        for (const p of pages) {
          const info = p.imageinfo?.[0];
          if (!info) continue;
          const m = info.extmetadata;
          const license = m.LicenseShortName?.value || "";
          if (!allowedLicense(license)) continue;
          await db
            .insert(imageAssets)
            .values({
              id: id + "-image-" + count,
              vehicleSlug: vehicle.slug,
              url: info.url,
              sourceUrl: info.descriptionurl,
              creator: (m.Artist?.value || "").replace(/<[^>]*>/g, ""),
              license,
              licenseUrl: m.LicenseUrl?.value || "",
              identityVerified: false,
              rightsVerified: false,
              retrievedAt: new Date().toISOString(),
            })
            .onConflictDoNothing();
          count++;
        }
        result = {
          candidates: count,
          note: "Model identity and complete license terms need human verification before approval.",
        };
      }
      if (stage === "workshop") {
        try {
          const found = await new Tavily().search(
            name +
              " official service manual owner manual technical information",
          );
          for (let i = 0; i < found.length; i++) {
            const s = found[i];
            await db
              .insert(documents)
              .values({
                id: id + "-doc-" + i,
                vehicleSlug: vehicle.slug,
                title: s.title,
                publisher: new URL(s.url).hostname,
                url: s.url,
                kind: "Unreviewed discovery candidate",
                modelYears: "Unverified",
                market: "Unverified",
                variant: "Unverified",
                verified: false,
                redistributable: false,
                retrievedAt: new Date().toISOString(),
              })
              .onConflictDoNothing();
          }
          result = {
            candidates: found.length,
            note: "Discovery only. No document is redistributed or treated as applicable before review.",
          };
        } catch (e) {
          result = {
            candidates: 0,
            note: "Workshop discovery unavailable; historical article remains reviewable.",
          };
        }
      }
      if (stage === "quality") {
        const gates = await editionQuality(edition.id);
        const passed = canPublish(gates);
        await db.insert(reviews).values({
          id: crypto.randomUUID(),
          editionId: edition.id,
          actor: "workflow",
          decision: passed ? "ready" : "blocked",
          checks: JSON.stringify(gates),
          createdAt: new Date().toISOString(),
        });
        await db
          .update(runs)
          .set({
            status: run.dryRun
              ? "dry_run_complete"
              : passed
                ? "awaiting_review"
                : "blocked",
          })
          .where(eq(runs.id, id));
        if (passed && !run.dryRun && run.mode === "automatic") {
          await publishEdition(edition.id, "automatic-workflow");
          await db
            .update(runs)
            .set({ status: "published" })
            .where(eq(runs.id, id));
        }
        if (passed && !run.dryRun && run.mode === "draft")
          await db
            .update(runs)
            .set({ status: "draft_complete" })
            .where(eq(runs.id, id));
        result = gates;
      }
    }
    await db
      .update(steps)
      .set({
        status: "completed",
        result: JSON.stringify(result),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(steps.id, stepId));
    return { stage, result };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Stage failed";
    await db
      .update(steps)
      .set({
        status: "failed",
        result: JSON.stringify({ error }),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(steps.id, stepId));
    await db
      .update(runs)
      .set({ status: "failed", error })
      .where(eq(runs.id, id));
    throw e;
  }
}
export async function publishEdition(id: string, actor: string) {
  const db = getDb();
  const gates = await editionQuality(id);
  if (!canPublish(gates))
    throw Error(
      "VALIDATION: Critical quality gates failed. Review the edition’s evidence, images and content before publishing.",
    );
  await db.batch([
    db
      .update(editions)
      .set({ status: "published", publishedAt: new Date().toISOString() })
      .where(eq(editions.id, id)),
    db.insert(reviews).values({
      id: crypto.randomUUID(),
      editionId: id,
      actor,
      decision: "approved",
      checks: JSON.stringify(gates),
      createdAt: new Date().toISOString(),
    }),
    db
      .insert(campaigns)
      .values({ id: crypto.randomUUID(), editionId: id, status: "prepared" })
      .onConflictDoNothing(),
  ]);
  return gates;
}
