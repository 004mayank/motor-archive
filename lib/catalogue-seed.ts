import { getDb } from "@/db";
import {
  editions,
  sections,
  sources,
  imageAssets,
  settings,
  audit,
} from "@/db/schema";
import { catalogueEditions } from "./catalogue";
import credits from "@/public/images/credits.json";
import { eq, and } from "drizzle-orm";
// A versioned development-content refresh. Live editions and edited sample versions are preserved.
export async function refreshCatalogueSamples() {
  const db = getDb();
  const [done] = await db
    .select()
    .from(settings)
    .where(eq(settings.key, "catalogue_editorial_v2"));
  if (done) return;
  const now = new Date().toISOString();
  for (const [slug, d] of Object.entries(catalogueEditions)) {
    const id = "sample-" + slug;
    const [e] = await db.select().from(editions).where(eq(editions.id, id));
    if (!e || !e.sample || e.version !== 1) continue;
    const before = await db
      .select()
      .from(sections)
      .where(eq(sections.editionId, id));
    await db.batch([
      db
        .insert(sources)
        .values(
          d.sources.map((s) => ({ ...s, editionId: id, retrievedAt: now })),
        )
        .onConflictDoNothing(),
      db.delete(sections).where(eq(sections.editionId, id)),
      db
        .insert(sections)
        .values(
          d.sections.map((s, i) => ({
            id: slug + "-catalogue-v2-" + i,
            editionId: id,
            position: i,
            heading: s.heading,
            body: s.body,
            sourceId: s.sourceId,
          })),
        )
        .onConflictDoNothing(),
      db
        .update(editions)
        .set({
          headline: d.headline,
          excerpt: d.standfirst,
          image: d.image,
          version: 2,
        })
        .where(
          and(
            eq(editions.id, id),
            eq(editions.sample, true),
            eq(editions.version, 1),
          ),
        ),
      db
        .insert(audit)
        .values({
          id: "catalogue-refresh-" + slug,
          actor: "development-content-refresh",
          action: "sample_edition_revision",
          detail: JSON.stringify({
            edition: e,
            sections: before,
            newVersion: 2,
          }),
          createdAt: now,
        })
        .onConflictDoNothing(),
    ]);
    for (const photoId of d.photoIds) {
      const p = credits.find((p) => p.id === photoId);
      if (!p) continue;
      await db
        .insert(imageAssets)
        .values({
          id: p.id,
          vehicleSlug: slug,
          url: p.src,
          sourceUrl: p.source,
          creator: p.creator,
          license: p.license,
          licenseUrl: p.licenseUrl,
          identityVerified: true,
          rightsVerified: true,
          retrievedAt: p.retrievedAt,
        })
        .onConflictDoNothing();
    }
  }
  await db
    .insert(settings)
    .values({ key: "catalogue_editorial_v2", value: "complete" })
    .onConflictDoNothing();
}
