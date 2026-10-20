# Verification record — 18 October 2026

## Passed

- Strict TypeScript compilation with `tsc --noEmit`.
- 16 unit tests for publication gates, licenses, image identity, contradictions, supporting passages, sample exclusion, metadata, article completeness, unsupported quotations, normalized generation identity, document applicability and power-unit conversion.
- 27 HTTP assertions covering 20 application/metadata/health routes, denied anonymous admin reads and writes, explicit missing-email-provider state, denied cross-origin subscription writes, protected cron endpoint, sample exclusion from RSS and preview robots rules.
- 6 local authenticated operational checks: sample quality failure; manual approval blocked by the same failure; repeated workflow start reuses its existing ID; selection fails before a paid call when every candidate was already featured; failed run and audit persistence; cross-origin mutation blocked even with authenticated development identity.
- Browser interaction: archive search for Porsche returned one story; country Japan returned Honda NSX; gallery opened, next-photo control changed the photograph, Escape closed it and returned focus; collection linked to its story list; the workshop displayed missing documentation explicitly; dashboard authorization was tested both unconfigured/read-only and with the local-only seeded development identity; edition review loaded its sections, photographs and gates.
- Visual inspection of homepage, full sample story and gallery, archive, collection, workshop and editorial dashboard. Viewports tested: desktop 1440×1000, tablet 768×1024, mobile 390×844. Mobile measured document width equals viewport width, with no broken loaded images. Mobile menu opens/closes.
- Fixed a D1 statement bind-variable limit in sample seeding by chunking image inserts. Fixed tablet navigation wrapping. Added an inline story photograph to vary the reading rhythm.

## Limits

- This is a private sample-content preview. The complete production acceptance criteria in the master brief are not met.
- Paid research/writer/email credentials were unavailable, so authenticated provider calls, email receipt, a full live edition, production scheduling and automatic publication were not tested.
- The live publisher's quality gates are unit-tested and sample blocking is integration-tested; there is no complete live scheduled-to-published demonstration.
- The browser review is manual tool-driven QA, not a complete Playwright CI suite. No Lighthouse/Core Web Vitals score, exhaustive accessibility audit, load test, backup restore test or security penetration test was run.
- The implementation uses Sites' Vinext/Workers/D1 architecture, not the requested Vercel/PostgreSQL/Prisma/Inngest architecture. See README for remaining implementation work.
- Local HTTP tests can pass the status check on a React error boundary, so the HTTP script also rejects the application's error-boundary text; health separately checks an actual database query.
- During rapid development, Vinext HMR produced stale route paints and a development-only multiple-renderer warning. Reloading and restarting the preview resolved inspection state. Production behavior must still be checked after deployment.

## Repeat checks

```sh
npm run typecheck
npm test
npm run build
# With the migrated local dev server running:
node tests-http.mjs
# Requires local-only .dev.vars ADMIN_EMAILS=seedy@sites.test:
node tests-operations.mjs
```

Do not point `tests-operations.mjs` at production. It creates a local dry-run record and audit entries. It does not send email, publish a story or call a paid provider.

## Publishing result

A private Site was registered, but no source version or deployment was created. The required source-workflow helper could start, but the session approval policy rejected `write_stdin` before the helper could receive its credential and ordered build/package request. Requesting write access to the project's own Git directory and restarting the helper did not resolve the restriction. Publication was not bypassed. The expected Site origin is not a verified live deployment URL.

The final production compilation passed. A local built-Worker preview was attempted but did not begin listening during the observed startup window; it was stopped. The development server was restarted successfully and the final homepage was visually rechecked. A successful built-Worker runtime start is therefore not claimed. All owned preview servers were stopped during handoff cleanup.


## Editorial redesign after visual feedback

- Replaced the restrained serif homepage with an oversized self-hosted Anton masthead, bold condensed headings, black/orange accents and a full-width historic photographic cover.
- Added five period photographs with permission records: four images dated June 1966 from ZANTAFIO56 and John Lloyd’s image captioned as the 1975 Castrol International Rally. Preserved original colors, creator credits, source links and Creative Commons license links. Digital-copy metadata is explicitly distinguished from the rally event date.
- Added `/motorsport`, `/motorsport/le-mans-1966`, `/motorsport/rally-without-barriers`, `/design` and `/photography`. All five new routes returned successful responses without the error boundary. The HTTP suite now contains 32 assertions.
- New navigation exposes the actual editorial subjects. The Lancia sample profile now includes the period rally photograph and a direct link to the rally essay.
- Visually inspected the redesigned desktop homepage and the photo essay, Design and Photo Archive pages. Tablet Motorsport and mobile homepage/Photo Archive had matching viewport/document widths, with no horizontal overflow at 768px and 390px.
- The existing production scope limits and unpublished Site status remain unchanged. This pass changes the visual and editorial experience; it does not claim to complete the previously documented automation/backend work.

## Catalogue-wide editorial profiles

- Extended the visual treatment to all four sample vehicle profiles: Porsche 911, Honda NSX, Jaguar E-type and Lancia Stratos. Added three licensed period photographs and expanded the photo archive to eight frames.
- All four profiles visually inspected at 1440px desktop and 390px mobile. Document width matched viewport width; no broken loaded profile images were observed. Checked the mobile gallery opening and Escape dismissal. The expanded photo archive rendered eight frames without broken images.
- HTTP suite passed 36 route/security assertions, including the Honda and Jaguar profiles and workshops. TypeScript strict checking passed. Production compilation passed with `npm run build`; the Sites build wrapper itself could not launch in this session.
- The sample refresh is versioned and audit-recorded. Live records and edited sample versions are excluded. Existing production-scope and publication limitations still apply.

## Workshop documentation revision — 20 October 2026

- Replaced the generic vehicle-workshop placeholder with a curated, typed publication library, document filters, task/source index, applicability notes and service-preparation worksheet. Twelve external links across four cars; paid listings, public PDFs and provider enquiries have distinct labels.
- Retrieved and text-inspected the original Honda-hosted 1991 Acura NSX index and maintenance sections (printed pages 120–122, 127–129 and 153–157). Added narrow-scope oil-level and tyre-check summaries, original page references and an applicability confirmation. No numeric repair specifications were invented. Other cars retain explicit procedure gaps pending access to matching manuals.
- Browser: text search returned one oil resource; maintenance-chart filter returned one resource. Unconfirmed NSX applicability hid checklist steps; confirmation revealed four oil-check steps; marking one updated progress to 1/4. Download action produced a text worksheet containing applicability and source links. A populated export was not independently file-verified.
- All four workshop pages measured 390px document/viewport width. Desktop library and mobile owner-check layout visually inspected. HTTP suite passed all 36 existing route/security assertions. TypeScript strict check and production build passed.
- Existing publication blocker and production workflow limits remain unchanged. This is an improvement to the local preview; it is not a claim that complete repair instructions exist for every car.

## Technical reference plate and punctuation update

- Added the user-supplied Porsche multi-view reference image in place of the general workshop schematic, with a fullscreen viewer and source/applicability caption. Preserved the original pixels and aspect ratio. Its metadata explicitly records unverified reuse rights and vehicle applicability; no source licensing or service dimensions are represented as verified.
- Inspected the overview at 1440px and viewer at 390px. At 150% the image scrolls inside its viewport; page width remains 390px. Escape closes the viewer and returns focus to its trigger. Zoom/fit-width controls and a 300% limit are present.
- Removed literal em/en dashes from site source copy, public metadata and reference metadata. Added display formatting for pre-existing database-backed vehicle/article/document text and the same rule to the draft writer prompt. An HTTP sweep of 31 public routes confirmed no em/en dashes or dash entities in their responses.
- Existing 36 route/security checks and strict type checking passed. Production build passed after the final source changes. The local preview server remains available for the user.

## Model-specific line diagrams for every car

- Replaced the remaining generic SVG on the Stratos, NSX and E-type with model-specific multi-view drawings. Preserved the existing supplied Porsche plate. All four profiles and all four workshops now select their diagram from a typed registry. Removed the unused generic blueprint component.
- Downloaded original raster assets from the provider’s public image links. Each source page links CC BY 4.0. Credits and source URLs are visible on the plates and image-credit page; images retain their original pixels. These are visual references, not verified service dimensions.
- Checked all eight profile/workshop responses for the correct model asset and absence of the old placeholder. All four image requests succeeded with image content types. No long dashes were found in those responses.
- Visually checked all four profile plates on desktop and measured matching 390px document/viewport widths on all four mobile profiles. The NSX viewer opened its correct image, zoomed to 150% and closed with Escape; the Stratos enlarged image was also inspected. TypeScript checking and production compilation passed.

## BMAD reader-flow repair, 20 October 2026

BMAD 6.12.4 oneshot build and UX analysis completed. See UX-AUDIT.md for repaired flows, source review triage and browser evidence. Default npm test passed 23 tests; strict typecheck, production build and 39 HTTP checks passed. Mobile 390px checks found no horizontal overflow on seven core surfaces. Local preview remains available. Live delivery, production publication, exhaustive accessibility certification and a second catalogue page remain unverified.

## Manual placement correction

- Added the user-linked Porsche Scribd manual to the document shelf and directly inside #worksheet, above preparation fields. Scribd's oEmbed response supplied the official iframe URL. The browser rendered the actual manual cover on desktop and mobile; full document access remains controlled by Scribd.
- Inspected the linked manual's opening text: it identifies 1972-onward USA/Canada coverage and later supplements, now shown beside the reader. Earlier-year official literature remains listed separately. Plate links are now labelled Open service manual for Porsche and Diagram source for the other cars.
- Browser at 1440px and 390px confirmed placement; mobile document width remained 390px. A persistent external link remains available if the embed is blocked. The service worksheet still follows the reader.

- Follow-up: removed repeated Scribd naming from first-party manual copy, keeping provider-managed access language and the external reader’s own branding intact. TypeScript check passed.
