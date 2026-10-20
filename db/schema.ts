import {
  sqliteTable,
  text,
  integer,
  real,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
export const vehicles = sqliteTable("vehicles", {
  slug: text("slug").primaryKey(),
  identity: text("identity").notNull().unique(),
  manufacturer: text("manufacturer").notNull(),
  model: text("model").notNull(),
  generation: text("generation").notNull(),
  country: text("country").notNull(),
  startYear: integer("start_year").notNull(),
  endYear: integer("end_year").notNull(),
  category: text("category").notNull(),
  body: text("body").notNull(),
  engine: text("engine").notNull(),
  drivetrain: text("drivetrain").notNull(),
  fuel: text("fuel").notNull(),
  motorsport: integer("motorsport", { mode: "boolean" }).notNull(),
  significance: text("significance").notNull(),
});
export const editions = sqliteTable("editions", {
  id: text("id").primaryKey(),
  vehicleSlug: text("vehicle_slug")
    .notNull()
    .references(() => vehicles.slug),
  number: integer("number").notNull().unique(),
  headline: text("headline").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  status: text("status").notNull().default("draft"),
  sample: integer("sample", { mode: "boolean" }).notNull().default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull(),
  version: integer("version").notNull().default(1),
});
export const sections = sqliteTable("sections", {
  id: text("id").primaryKey(),
  editionId: text("edition_id")
    .notNull()
    .references(() => editions.id),
  position: integer("position").notNull(),
  heading: text("heading").notNull(),
  body: text("body").notNull(),
  sourceId: text("source_id"),
});
export const sources = sqliteTable("sources", {
  id: text("id").primaryKey(),
  editionId: text("edition_id")
    .notNull()
    .references(() => editions.id),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  url: text("url").notNull(),
  retrievedAt: text("retrieved_at").notNull(),
  kind: text("kind").notNull(),
});
export const claims = sqliteTable("claims", {
  id: text("id").primaryKey(),
  editionId: text("edition_id")
    .notNull()
    .references(() => editions.id),
  claim: text("claim").notNull(),
  value: text("value"),
  unit: text("unit"),
  sourceId: text("source_id").references(() => sources.id),
  passage: text("passage"),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
  critical: integer("critical", { mode: "boolean" }).notNull().default(false),
  contradictions: text("contradictions"),
});
export const imageAssets = sqliteTable("image_assets", {
  id: text("id").primaryKey(),
  vehicleSlug: text("vehicle_slug").references(() => vehicles.slug),
  url: text("url").notNull(),
  sourceUrl: text("source_url").notNull(),
  creator: text("creator").notNull(),
  license: text("license").notNull(),
  licenseUrl: text("license_url").notNull(),
  identityVerified: integer("identity_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  rightsVerified: integer("rights_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  retrievedAt: text("retrieved_at").notNull(),
});
export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  vehicleSlug: text("vehicle_slug").references(() => vehicles.slug),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  url: text("url").notNull(),
  kind: text("kind").notNull(),
  modelYears: text("model_years").notNull(),
  market: text("market").notNull(),
  variant: text("variant").notNull(),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
  redistributable: integer("redistributable", { mode: "boolean" })
    .notNull()
    .default(false),
  revision: text("revision"),
  retrievedAt: text("retrieved_at").notNull(),
});
export const runs = sqliteTable("runs", {
  id: text("id").primaryKey(),
  idempotencyKey: text("idempotency_key").notNull().unique(),
  editionId: text("edition_id").references(() => editions.id),
  mode: text("mode").notNull(),
  status: text("status").notNull(),
  dryRun: integer("dry_run", { mode: "boolean" }).notNull(),
  rationale: text("rationale"),
  error: text("error"),
  cost: real("cost").notNull().default(0),
  createdAt: text("created_at").notNull(),
});
export const steps = sqliteTable(
  "steps",
  {
    id: text("id").primaryKey(),
    runId: text("run_id")
      .notNull()
      .references(() => runs.id),
    stage: text("stage").notNull(),
    status: text("status").notNull(),
    attempts: integer("attempts").notNull().default(0),
    result: text("result"),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [uniqueIndex("run_stage_unique").on(t.runId, t.stage)],
);
export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  editionId: text("edition_id").references(() => editions.id),
  actor: text("actor").notNull(),
  decision: text("decision").notNull(),
  checks: text("checks").notNull(),
  createdAt: text("created_at").notNull(),
});
export const subscribers = sqliteTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});
export const campaigns = sqliteTable("campaigns", {
  id: text("id").primaryKey(),
  editionId: text("edition_id")
    .notNull()
    .unique()
    .references(() => editions.id),
  status: text("status").notNull(),
  providerId: text("provider_id"),
});
export const audit = sqliteTable("audit", {
  id: text("id").primaryKey(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  detail: text("detail").notNull(),
  createdAt: text("created_at").notNull(),
});
export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  expiresAt: integer("expires_at").notNull(),
});
