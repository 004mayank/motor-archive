import { getDb } from "@/db";
import {
  vehicles,
  editions,
  sections,
  sources,
  imageAssets,
  settings,
  documents,
} from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { sampleCars, porscheSources, type Car } from "./sample";
import credits from "@/public/images/credits.json";
import { env } from "cloudflare:workers";
import { identityKey } from "./quality";
import { refreshCatalogueSamples } from "./catalogue-seed";
import { editorialText } from "./typography";
import { catalogueEditions } from "./catalogue";
export const contentMode = () => env.CONTENT_MODE || "sample";
export async function seedSamples() {
  if (contentMode() !== "sample") return;
  const db = getDb();
  const initialized = await db
    .select()
    .from(settings)
    .where(eq(settings.key, "sample_seed_complete"));
  if (initialized.length) return;
  const now = new Date().toISOString();
  await db
    .insert(vehicles)
    .values(
      sampleCars.map((c) => ({
        slug: c.slug,
        identity: identityKey(c.manufacturer, c.model, c.generation),
        manufacturer: c.manufacturer,
        model: c.model,
        generation: c.generation,
        country: c.country,
        startYear: c.startYear,
        endYear: c.endYear,
        category: c.category,
        body: c.body,
        engine: c.engine,
        drivetrain: c.drivetrain,
        fuel: c.fuel,
        motorsport: c.motorsport,
        significance: c.significance,
      })),
    )
    .onConflictDoNothing();
  await db
    .insert(editions)
    .values(
      sampleCars.map((c) => ({
        id: "sample-" + c.slug,
        vehicleSlug: c.slug,
        number: c.number,
        headline: c.headline,
        excerpt: c.excerpt,
        image: c.image,
        status: "published",
        sample: true,
        publishedAt: now,
        createdAt: now,
      })),
    )
    .onConflictDoNothing();
  for (const c of sampleCars) {
    await db
      .insert(sections)
      .values(
        c.sections.map((s, i) => ({
          id: c.slug + "-" + i,
          editionId: "sample-" + c.slug,
          position: i,
          heading: s.heading,
          body: s.body,
          sourceId: s.sourceId,
        })),
      )
      .onConflictDoNothing();
  }
  await db
    .insert(sources)
    .values(
      porscheSources.map((s) => ({
        ...s,
        editionId: "sample-porsche-911-original",
        retrievedAt: now,
      })),
    )
    .onConflictDoNothing();
  for (let offset = 0; offset < credits.length; offset += 5) {
    await db
      .insert(imageAssets)
      .values(
        credits.slice(offset, offset + 5).map((c) => ({
          id: c.id,
          vehicleSlug: c.id.startsWith("porsche")
            ? "porsche-911-original"
            : c.id.startsWith("nsx")
              ? "honda-nsx-na1"
              : c.id.startsWith("jaguar")
                ? "jaguar-e-type-series-1"
                : c.id.startsWith("stratos")
                  ? "lancia-stratos-hf"
                  : null,
          url: c.src,
          sourceUrl: c.source,
          creator: c.creator,
          license: c.license,
          licenseUrl: c.licenseUrl,
          identityVerified: !c.id.startsWith("bmw"),
          rightsVerified: true,
          retrievedAt: c.retrievedAt,
        })),
      )
      .onConflictDoNothing();
  }
  await db
    .insert(settings)
    .values([
      { key: "publishing_mode", value: "approval" },
      { key: "monthly_budget", value: "25" },
      { key: "weekly_cron", value: "0 9 * * 0" },
      { key: "timezone", value: "Asia/Kolkata" },
      { key: "sample_seed_complete", value: "true" },
    ])
    .onConflictDoNothing();
}
export async function getCars(): Promise<Car[]> {
  await seedSamples();
  if (contentMode() === "sample") await refreshCatalogueSamples();
  const db = getDb();
  const rows = await db
    .select()
    .from(editions)
    .innerJoin(vehicles, eq(editions.vehicleSlug, vehicles.slug))
    .where(
      and(
        eq(editions.status, "published"),
        ...(contentMode() === "live" ? [eq(editions.sample, false)] : []),
      ),
    )
    .orderBy(desc(editions.number));
  const ss = await db.select().from(sections);
  const assets = await db.select().from(imageAssets);
  const sourceRows = await db.select().from(sources);
  return rows.map(({ vehicles: v, editions: e }) => ({
    ...v,
    manufacturer: editorialText(v.manufacturer),
    model: editorialText(v.model),
    generation: editorialText(v.generation),
    country: editorialText(v.country),
    category: editorialText(v.category),
    body: editorialText(v.body),
    engine: editorialText(v.engine),
    drivetrain: editorialText(v.drivetrain),
    fuel: editorialText(v.fuel),
    significance: editorialText(v.significance),
    number: e.number,
    headline: editorialText(e.headline),
    excerpt: editorialText(e.excerpt),
    image: e.image,
    imagePosition:
      e.sample && e.image === catalogueEditions[v.slug]?.image
        ? catalogueEditions[v.slug].imagePosition
        : "50% 50%",
    sample: e.sample,
    galleryImages: assets
      .filter(
        (i) =>
          i.vehicleSlug === v.slug && i.identityVerified && i.rightsVerified,
      )
      .map((i) => i.url),
    sourceList: sourceRows
      .filter((s) => s.editionId === e.id)
      .map((s) => ({
        ...s,
        title: editorialText(s.title),
        publisher: editorialText(s.publisher),
      })),
    sections: ss
      .filter((s) => s.editionId === e.id)
      .sort((a, b) => a.position - b.position)
      .map((s) => ({
        heading: editorialText(s.heading),
        body: editorialText(s.body),
        sourceId: s.sourceId || undefined,
      })),
  }));
}
export async function getCar(slug: string) {
  return (await getCars()).find((c) => c.slug === slug);
}
export async function getDocuments(slug: string) {
  const rows = await getDb()
    .select()
    .from(documents)
    .where(and(eq(documents.vehicleSlug, slug), eq(documents.verified, true)));
  return rows.map((d) => ({
    ...d,
    title: editorialText(d.title),
    publisher: editorialText(d.publisher),
    kind: editorialText(d.kind),
    modelYears: editorialText(d.modelYears),
    market: editorialText(d.market),
    variant: editorialText(d.variant),
    revision: d.revision ? editorialText(d.revision) : null,
  }));
}
