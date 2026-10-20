import { getDb } from "@/db";
import {
  editions,
  sections,
  claims,
  imageAssets,
  documents,
  settings,
  audit,
  runs,
  steps,
  sources,
  vehicles,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import {
  adminIdentity,
  sameOrigin,
  apiError,
  logAction,
  rateLimit,
} from "@/lib/security";
import { seedSamples } from "@/lib/repository";
import {
  startRun,
  advanceRun,
  editionQuality,
  publishEdition,
} from "@/lib/workflow";
import { identityKey } from "@/lib/quality";
export async function GET(req: Request) {
  try {
    await adminIdentity();
    await seedSamples();
    const db = getDb();
    const id = new URL(req.url).searchParams.get("id");
    if (id) {
      const [edition] = await db
        .select()
        .from(editions)
        .where(eq(editions.id, id));
      if (!edition) throw Error("VALIDATION: Unknown edition");
      const [ss, cc, ii, dd, rr] = await Promise.all([
        db.select().from(sections).where(eq(sections.editionId, id)),
        db.select().from(claims).where(eq(claims.editionId, id)),
        db
          .select()
          .from(imageAssets)
          .where(eq(imageAssets.vehicleSlug, edition.vehicleSlug)),
        db
          .select()
          .from(documents)
          .where(eq(documents.vehicleSlug, edition.vehicleSlug)),
        db.select().from(sources).where(eq(sources.editionId, id)),
      ]);
      return Response.json(
        {
          edition,
          sections: ss,
          claims: cc,
          images: ii,
          documents: dd,
          sources: rr,
          gates: await editionQuality(id),
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    const [ee, rr, aa, ss] = await Promise.all([
      db.select().from(editions).orderBy(desc(editions.number)),
      db.select().from(runs).orderBy(desc(runs.createdAt)).limit(30),
      db.select().from(audit).orderBy(desc(audit.createdAt)).limit(30),
      db.select().from(settings),
    ]);
    return Response.json(
      { editions: ee, runs: rr, audit: aa, settings: ss },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return apiError(e);
  }
}
export async function POST(req: Request) {
  try {
    sameOrigin(req);
    const user = await adminIdentity();
    await rateLimit("admin:" + user.userId, 100);
    const body = (await req.json()) as Record<string, unknown>;
    const db = getDb();
    let result: unknown;
    const id = String(body.id || "");
    switch (body.action) {
      case "candidate": {
        const v = body.vehicle as Record<string, unknown>;
        if (
          !v ||
          [
            "manufacturer",
            "model",
            "generation",
            "country",
            "category",
            "body",
            "engine",
            "drivetrain",
            "fuel",
            "significance",
          ].some(
            (k) =>
              typeof v[k] !== "string" ||
              !(v[k] as string).trim() ||
              (v[k] as string).length > 150,
          )
        )
          throw Error("VALIDATION: Complete all vehicle identity fields");
        const year = Number(v.startYear),
          end = Number(v.endYear);
        if (
          !Number.isInteger(year) ||
          !Number.isInteger(end) ||
          year < 1880 ||
          end < year ||
          end > 2100
        )
          throw Error("VALIDATION: Invalid production era");
        const slug = String(v.slug || "");
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 120)
          throw Error("VALIDATION: Invalid vehicle slug");
        await db.insert(vehicles).values({
          slug,
          identity: identityKey(
            String(v.manufacturer),
            String(v.model),
            String(v.generation),
          ),
          manufacturer: String(v.manufacturer),
          model: String(v.model),
          generation: String(v.generation),
          country: String(v.country),
          startYear: year,
          endYear: end,
          category: String(v.category),
          body: String(v.body),
          engine: String(v.engine),
          drivetrain: String(v.drivetrain),
          fuel: String(v.fuel),
          motorsport: v.motorsport === true,
          significance: String(v.significance),
        });
        result = {
          message: "Candidate added; research is required before publication.",
        };
        break;
      }
      case "select-cover": {
        const [e] = await db.select().from(editions).where(eq(editions.id, id));
        const [image] = await db
          .select()
          .from(imageAssets)
          .where(eq(imageAssets.id, String(body.imageId)));
        if (
          !e ||
          !image ||
          image.vehicleSlug !== e.vehicleSlug ||
          !image.identityVerified ||
          !image.rightsVerified
        )
          throw Error(
            "VALIDATION: Select a reviewed photograph of this vehicle",
          );
        await db
          .update(editions)
          .set({ image: image.url, status: "draft" })
          .where(eq(editions.id, id));
        result = { message: "Cover photograph selected" };
        break;
      }
      case "resume-review": {
        const [run] = await db.select().from(runs).where(eq(runs.id, id));
        if (!run?.editionId) throw Error("VALIDATION: Run has no edition");
        await db
          .update(steps)
          .set({ status: "pending", attempts: 0 })
          .where(eq(steps.id, id + "-quality"));
        await db
          .update(runs)
          .set({ status: "running", error: null })
          .where(eq(runs.id, id));
        result = { message: "Quality review reopened" };
        break;
      }

      case "seed":
        await seedSamples();
        result = { message: "Sample editions loaded" };
        break;
      case "start": {
        const key = String(body.key || "");
        if (!/^[a-zA-Z0-9:_-]{8,120}$/.test(key))
          throw Error("VALIDATION: Supply an idempotency key");
        result = await startRun(key, body.dryRun !== false);
        break;
      }
      case "advance":
        result = await advanceRun(id);
        break;
      case "quality":
        result = await editionQuality(id);
        break;
      case "publish":
        result = await publishEdition(id, user.userId);
        break;
      case "unpublish":
        await db
          .update(editions)
          .set({ status: "draft" })
          .where(eq(editions.id, id));
        result = { message: "Edition returned to draft" };
        break;
      case "reject":
        await db
          .update(editions)
          .set({ status: "rejected" })
          .where(eq(editions.id, id));
        result = { message: "Edition rejected" };
        break;
      case "edit": {
        const heading = String(body.heading || "");
        const text = String(body.text || "");
        if (heading.length < 3 || text.length < 20 || text.length > 30000)
          throw Error("VALIDATION: Invalid article section");
        const [previous] = await db
          .select()
          .from(sections)
          .where(eq(sections.id, id));
        if (!previous) throw Error("VALIDATION: Unknown section");
        await logAction(user.userId, "article_revision", {
          section: previous,
          replacement: { heading, body: text },
        });
        await db
          .update(sections)
          .set({ heading, body: text })
          .where(eq(sections.id, id));
        const [section] = await db
          .select()
          .from(sections)
          .where(eq(sections.id, id));
        if (section) {
          await db
            .update(editions)
            .set({ status: "draft", version: sql`version+1` })
            .where(eq(editions.id, section.editionId));
          await db
            .update(claims)
            .set({ verified: false })
            .where(eq(claims.editionId, section.editionId));
        }
        result = { message: "Saved as a new draft; claims require review" };
        break;
      }
      case "verify-claim": {
        const [claim] = await db.select().from(claims).where(eq(claims.id, id));
        if (!claim?.sourceId || !claim.passage || claim.contradictions)
          throw Error(
            "VALIDATION: Claim needs source, passage and resolved contradictions",
          );
        await db
          .update(claims)
          .set({ verified: body.verified === true })
          .where(eq(claims.id, id));
        result = { message: "Evidence review recorded" };
        break;
      }
      case "verify-image": {
        const [image] = await db
          .select()
          .from(imageAssets)
          .where(eq(imageAssets.id, id));
        if (!image?.creator || !image.licenseUrl || !image.sourceUrl)
          throw Error("VALIDATION: Incomplete image provenance");
        await db
          .update(imageAssets)
          .set({
            identityVerified: body.identity === true,
            rightsVerified: body.rights === true,
          })
          .where(eq(imageAssets.id, id));
        result = { message: "Image review recorded" };
        break;
      }
      case "settings": {
        const values = body.values as Record<string, string>;
        const allowed = [
          "publishing_mode",
          "monthly_budget",
          "weekly_cron",
          "timezone",
        ];
        if (!values || Object.keys(values).some((k) => !allowed.includes(k)))
          throw Error("VALIDATION: Unknown setting");
        if (
          values.publishing_mode &&
          !["draft", "approval", "automatic"].includes(values.publishing_mode)
        )
          throw Error("VALIDATION: Invalid publishing mode");
        if (
          values.monthly_budget &&
          (!Number.isFinite(Number(values.monthly_budget)) ||
            Number(values.monthly_budget) < 0)
        )
          throw Error("VALIDATION: Invalid budget");
        if (values.timezone) {
          try {
            new Intl.DateTimeFormat("en", { timeZone: values.timezone });
          } catch {
            throw Error("VALIDATION: Invalid timezone");
          }
        }
        for (const [key, value] of Object.entries(values)) {
          await db
            .insert(settings)
            .values({ key, value: String(value).slice(0, 120) })
            .onConflictDoUpdate({
              target: settings.key,
              set: { value: String(value).slice(0, 120) },
            });
        }
        result = {
          message:
            "Settings saved. An external scheduler must invoke the protected cron endpoint.",
        };
        break;
      }
      default:
        throw Error("VALIDATION: Unknown action");
    }
    await logAction(user.userId, String(body.action), { id });
    return Response.json({ result });
  } catch (e) {
    return apiError(e);
  }
}
