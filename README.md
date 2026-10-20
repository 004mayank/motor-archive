# MOTOR / ARCHIVE

A working, private automotive publication preview, with a deliberately editorial visual system: oversized Anton display typography, a strong black/orange identity, authentic historic color photography, asymmetric grids, photographic essays, and a consistent workshop experience.

## Revised editorial direction

The homepage now opens with an oversized masthead and an original June 1966 Le Mans photograph, replacing the previous restrained serif design. Anton is self-hosted; its OFL license is included under `public/fonts/`.

The subject navigation links to `/motorsport`, `/design`, and `/photography`, alongside the vehicle archive and workshop. Motorsport includes two substantial photo essays at `/motorsport/le-mans-1966` and `/motorsport/rally-without-barriers`. Design includes three visual studies, linked to their vehicle stories. The photo archive presents eight period photographs with names, source records and individual licenses. The Le Mans essay also links its historical race-result summary to the Automobile Club de l’Ouest’s own historical account.

The four Le Mans images are dated June 1966 in their source metadata. John Lloyd’s rally photograph is captioned as the 1975 Castrol International Rally; its later digital-copy timestamp is explicitly distinguished from the event date. Modern vehicle reference photographs are labelled as such on the design page. `public/images/history-credits.json` preserves the period-image records; the main credits page includes both historic and modern photography.

## Catalogue profile redesign

All four sample cars—Porsche 911, Honda NSX, Jaguar E-type and Lancia Stratos—now have a magazine-style profile with oversized model typography, a dated period cover, a distinct accent, five source-linked chapters, a three-event timeline, modern reference photography, a lightbox gallery, the vehicle workshop and links to the rest of the catalogue. The additional 1968 Porsche, 1963 Jaguar and 1994 Honda photographs retain named photographers and Creative Commons licenses in `public/images/catalogue-credits.json`. Competition cars are identified explicitly.

The sample-only refresh records its revision in the audit trail and preserves live editions and sample versions that have already been edited. These remain curated preview editions, not automatically approved production articles.

## Service manual and instruction library

Vehicle workshops now contain 13 curated external source links across the four cars: a Porsche 1965–1971 workshop set, classic parts catalogues and literature programme; the Jaguar factory-manual compilation plus separate 3.8/4.2 maintenance charts; four original 1991 Acura NSX handbook PDFs and a service-information enquiry route; and the official heritage enquiry for the Stratos documentation gap. Access type, publication identifier and coverage are explicit. Listings are distinct from inspected repair content. No paid manuals are mirrored.

The NSX has two owner-level checklists summarized from the inspected 1991 US/Canada handbook pages: oil-level measurement (127) and tyre pressure/condition checks (153–154). These require confirmation of applicability and link to the complete source sections. There are no invented repair instructions for the other vehicles. Search/type filters, task-to-source links and a browser-generated service-preparation text worksheet make the library usable. Worksheet entries and checklist progress are session-only, with no server submission.

## Technical plate and typography

The workshop overview, homepage workshop teaser, Porsche story teaser and Porsche workshop use the reader-supplied three-view Porsche dimension reference. The full image retains its aspect ratio and can be enlarged in an accessible modal with 100-300% zoom, scroll, fit-width, Escape dismissal and focus return. It is labelled as an unverified visual reference, not an applicable service specification. The supplied source link and unverified redistribution status are recorded in `public/images/technical-reference.json` and the credits page. The other three catalogue cars use their own model-specific multi-view raster drawings from Outlines, whose source pages link CC BY 4.0. `public/images/technical-plates.json` maps each vehicle to its correct asset, credit, licence and source. Every catalogue profile and workshop now uses this registry; the old generic SVG placeholder has been removed.

House style uses no em dashes. Static site copy, metadata, ranges and worksheet templates use simple punctuation; public database-backed article and document text is formatted at display time without changing the underlying evidence records. The writer prompt includes the same style rule.

## BMAD design and flow review

BMAD 6.12.4 is installed project-locally under `_bmad/`. `UX-AUDIT.md` records the design analysis, fixes and verification limits. Design and user-flow contracts are under `_bmad-output/planning-artifacts/ux-designs/ux-motor-archive-2026-10-20/`. Archive state survives reload/Back; workshops retain vehicle context; gallery focus stays stable; newsletter availability is exposed before entry; corrections support contextual local draft downloads. `npm test` includes URL-state regression tests.

## Honest delivery status

This is **not yet the full production-ready system described by the master brief**. It is a runnable and deployable application, with database-backed sample editions, functional public routes, a protected editorial desk, an evidence-review interface, publication gates, durable workflow records, and provider adapters. The private preview clearly labels sample content and is excluded from indexing.

No live research or paid model credentials were supplied. The live provider adapters have not been tested against authenticated accounts. Email delivery, a scheduled production edition, automatic publication, and a complete live end-to-end edition have not been demonstrated. We do not represent those integrations as operational.

## Architecture

- TypeScript strict mode, React 19, Next.js App Router API, Tailwind 4, Lucide icons.
- The hosted preview runs on **Vinext + Cloudflare Workers through Sites**, using **D1 + Drizzle**, and Sites-owned sign-in with an explicit server-side administrator email allowlist.
- This intentionally uses the deployment platform available in this session. It **does not implement the requested PostgreSQL + Prisma + Vercel + Supabase + Inngest stack**. Moving to that stack requires a repository adapter, authentication integration, migrations and a new deployment configuration. This is a material departure from the full brief, not a claim of equivalent completion.
- No privileged key is bundled in client code. `.dev.vars`, environment files, local data and runtime state are ignored by Git.

## Run locally

Use Node.js 22.13 or newer (Node 24 was used for verification).

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_pink_mandarin.sql
npm run dev -- --port 5173 --hostname 127.0.0.1
```

Open `http://127.0.0.1:5173/`. The database schema must be applied before the first request. With `CONTENT_MODE=sample` (the documented default), an isolated, idempotent sample seed populates four editions and their provenance. All sample editions are marked as samples. The homepage reads the current published edition from the database.

Copy the needed values from `.env.example` into `.dev.vars` for local Worker bindings. Development sign-in at `/signin-with-chatgpt?return_to=/admin` uses the starter's local-only identity `seedy@sites.test`. To exercise local editorial controls, set `ADMIN_EMAILS=seedy@sites.test` in `.dev.vars`. That identity simulation is excluded from production. Hosted administrator access requires the real authenticated email allowlist configured as a server-side runtime value. Without it, the desk is a read-only preview and all write APIs fail closed.

## Public routes

`/`, `/archive`, `/search`, `/collections`, `/collections/[slug]`, `/cars/[slug]`, `/workshop`, `/cars/[slug]/workshop`, `/newsletter`, `/about`, `/editorial-policy`, `/image-credits`, `/corrections`, `/privacy`, `/terms`, `/contact`, `/feed.xml`, `/sitemap.xml`, `/robots.txt`.

Archive search covers the loaded published vehicle records and article text, with manufacturer, country, decade, production-year, category, body, engine, drivetrain, fuel, motorsport and significance filters. It is a client-side search of the currently loaded collection, **not a scalable PostgreSQL full-text index**. Documents are not indexed until the document ingestion system is implemented.

All four sample stories have permanent routes. The Porsche sample contains a longer source-linked reading layout; the remaining editions deliberately show shorter sample text rather than inventing complete historical research. Exact repair values are not supplied.

## Editorial controls

`/admin` requires platform sign-in. `/api/admin` additionally requires the server-side email allowlist on every read and mutation. Mutations enforce same-origin requests, validate input, use persistent rate counters, and record audit events. `/admin/editions/[id]` provides section editing, evidence inspection, claim review, image identity/rights review, cover selection, quality checks, rejection and approval.

Section edits preserve the prior section and its replacement in an `article_revision` audit event, increment the edition version, return the edition to draft, and invalidate claim verification. This is basic revision history, not a full diff/rollback CMS.

Additional authorized API actions include:

- `candidate`: add a normalized vehicle generation using `vehicle` fields `slug`, `manufacturer`, `model`, `generation`, `country`, `startYear`, `endYear`, `category`, `body`, `engine`, `drivetrain`, `fuel`, `motorsport`, `significance`. The generation identity has a unique constraint.
- `start`: create a workflow with a unique `key` and `dryRun` flag.
- `advance`: execute or retry the next incomplete stage of a run.
- `resume-review`: reopen a blocked run's quality checkpoint after evidence has been reviewed.
- `settings`: save publishing mode, monthly estimate limit, cron expression and IANA timezone.

Candidates currently require manual entry through the authorized API; there is no comprehensive candidate management UI. The sample cars are already featured and therefore ineligible for reselection.

## Workflow and external configuration

The stage sequence is selection → research → article → image discovery → independent workshop discovery → quality review. Stages are persisted, unique per run, guarded against concurrent execution, and capped at three attempts. Transient provider calls use timeout and bounded exponential backoff. Failed-stage records preserve their error; completing a stage creates a recovery checkpoint.

Selection excludes previously featured generations and scores country, manufacturer, decade, motorsport and significance diversity. Source sufficiency and image availability are later gates. Full source-aware candidate pre-scoring and automatic fallback to another candidate are not implemented.

Tavily discovery records source URLs. The writer uses the provided evidence and must return supporting passages that exist in the source excerpts. This is **not independent factual verification**: claims remain unverified until reviewed. Wikimedia image discovery records candidate licenses and creators, but model identity and full reuse permissions remain subject to human review. Unreviewed documents remain absent from the public workshop. Missing workshop manuals do not block a historical article.

The default mode is approval. Draft runs stop without publishing. Automatic mode only publishes when all implemented critical gates pass; new research and new photos normally require human evidence/rights review first. These gates are a conservative baseline, not the comprehensive factual/safety evaluation system required by the master brief.

No cloud schedule is enabled. An external scheduler must POST to `/api/cron` with `Authorization: Bearer <CRON_SECRET>` and JSON `{ "key": "edition-YYYY-WW" }`. Reuse the same weekly key for each stage invocation. The endpoint advances one checkpoint per call; invoke again after the preceding response. The saved cron/timezone are configuration records and are **not themselves a deployed scheduler**. Do not assume weekly automation is running merely because settings are saved.

Costs are conservative fixed estimates for implemented calls, not provider-reconciled usage or an atomic hard billing cap. Keep live automatic mode off until actual usage accounting, spending reservations, provider quotas and operational monitoring are implemented.

Publishing updates the database, creates an editorial review and prepares one unique newsletter campaign record. Homepage/archive pages query the current database. RSS excludes samples. Campaign delivery to subscribers is **not implemented**; a prepared campaign is not a sent newsletter.

## Newsletter

Subscription requires valid email, explicit consent, same-origin requests, per-address and global rate limits, Resend credentials and a verified sender. An unconfigured provider returns an honest “coming soon” response and does not store the email. Configured subscription creates a pending record and sends a confirmation link with an idempotency key. Confirmation and unsubscribe use an explicit POST form; visiting the link alone does not change state.

No messages are sent during development verification. Contact and correction inboxes are intentionally not fabricated.

## Data, licensing and technical knowledge

The 15 schema tables cover vehicles, editions, sections, sources, claims, image assets, technical documents, runs, steps, reviews, campaigns, subscribers, audit events, settings and rate limits. Generated SQL and Drizzle metadata are committed. Schema changes require append-only migrations; never change an applied migration.

Photography source metadata is in `public/images/credits.json` and `/image-credits`. Photographs retain their individual Creative Commons licenses. Resizing/cropping is disclosed. ShareAlike applies to adaptations of applicable photographs; it does not imply unrelated code is part of that photographic adaptation. No AI-generated picture is presented as a real vehicle photograph.

The schematic is an original decorative illustration, explicitly labelled as not to scale and not a service diagram. No manuals are redistributed in this preview. PDF/OCR extraction, diagram indexing, structured maintenance/repair procedures, technical specification provenance and technical document review workflows remain to be implemented before a production workshop launch.

## Verification

```sh
npm run typecheck
npm test
npm run build
```

The tests exercise publication gates, image rights, identity matching, unsupported quotations, sample exclusion, claim contradictions, generation deduplication, model applicability, and PS/hp normalization. Browser testing covers the homepage, archive search/filtering, a complete sample story, gallery controls, collection, workshop, protected administration, mobile menu and responsive layout. See `VERIFICATION.md` for observed results and limits. No Core Web Vitals score, authenticated external integration test, full live edition demonstration or exhaustive end-to-end suite is claimed.

## Deploy, monitor and recover

The Site identity is retained in `.openai/hosting.json`. Use the Sites workflow helper to build, push the exact source state, package, save and privately deploy. Never commit repository credentials. Sites applies generated D1 migrations on deployment. New deployments stay private unless access is explicitly changed.

Health: `/api/health` checks the database. Workflow failures and audit actions are visible at the editorial desk. Structured API errors are emitted server-side without credentials. Full error aggregation, alerting and privacy-conscious usage analytics are not yet configured.

Before schema changes or public launch, export the hosted D1 database through its supported administration tools, keep an encrypted backup outside this checkout, and verify a restore in a separate non-production database. A source deployment rollback does not roll back the database. Resume failed workflows by their existing run IDs and idempotency keys; do not start a replacement run to retry a completed stage. Never re-send an email by changing its idempotency key just to bypass an uncertain outcome.

## Remaining production work

The full master brief's acceptance criteria are not met. Besides credential verification, remaining work includes the requested PostgreSQL/Prisma/Vercel/Inngest architecture, a real deployed scheduler, candidate discovery and fallback, complete normalized content taxonomy, independently corroborated claim extraction, link validation and contradiction analysis, broader editorial CMS controls, database-backed collections, scalable full-text search, PDF/OCR/manual ingestion, stricter technical reviews, complete edition/version rollback, production campaign sending, provider-metered costs, monitoring/analytics, backup automation, production legal/contact details, accessibility/performance audits, and a complete scheduled-to-published test edition.

## Manual alongside the worksheet

The Porsche worksheet section now includes the Scribd manual previously reachable only through the technical plate reference link. Its provider-hosted reader is embedded with a persistent external access link. The manual is also indexed in the document shelf, with 1972-onward USA/Canada coverage and later supplements stated explicitly. The earlier 1965-1971 Porsche listing remains separate. Other vehicle worksheets show their indexed service-manual link or a route to their literature library. No manual is downloaded or mirrored by this site.
