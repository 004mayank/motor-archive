# MOTOR / ARCHIVE UX audit

Recorded 20 October 2026. This records the source-based BMAD baseline and the completed local repair pass. Delivery and verification evidence are recorded below. The approved magazine direction is preserved and the Vol 01 label has been removed. No user research was supplied.

## Original findings and acceptance criteria

| Priority | Baseline evidence | User impact | Required outcome |
|---|---|---|---|
| P1 | `app/components.tsx`, original `ArchiveBrowser`: query/filter/sort/page initialized only in component state; `/search` reads only q. | Following a car link and returning can lose the reader's shortlist. | Safe URL-backed state and contextual return; Back/reload restore query, filters, ordering and page. Clamp invalid pages. |
| P1 | `app/components.tsx`, original `Gallery` effect depends on index; trap selects only button elements although credits is a link. | Arrow navigation restarts the modal focus lifecycle. The incomplete selector merits hardening, but a credits-link focus escape was not reproduced. | Open/close lifecycle independent of image; include all focusable children; Escape restores exact opener and scrolling. |
| P3 | `app/workshop/technical-plate.tsx`, original focus selector excludes `.plate-scroll[tabindex=0]`. | The focusable scroll viewport is omitted from enumeration. A focus escape was not reproduced; this is defensive hardening. | Include viewport, links and enabled buttons; exclude disabled zoom controls; test 100% and 300% bounds. |
| P1 | `app/components.tsx` Newsletter shows active entry; `app/api/newsletter/route.ts:21` checks missing provider and returns 503. | Reader supplies email and consent before learning signup is unavailable. | Discover availability before input; keep server guard, explicit pending/confirmation/error outcomes and no false success. |
| P2 | `app/corrections/page.tsx:28`, `app/contact/page.tsx:23`: no configured channel and no usable report form/draft. | Story and workshop reporting calls to action terminate at instructions. | Preserve source context, offer a local draft while unavailable and a clear return. Do not invent an inbox or claim delivery. |
| P2 | `app/components.tsx` original filter toggle lacks aria-expanded; results count lacks status role; active navigation is only class styling. | State changes and page location are less discoverable to assistive technology. | Expanded/control semantics, polite count, aria-current, correct Workshop context and Escape menu behavior. |
| P2 | `app/globals.css:1862` palette and later 8px labels/captions. | Orange small text on ivory and tiny provenance may be hard to read. | Keep orange for large/decorative roles or darker pairings; verify real captions and controls at narrow widths/text zoom. |
| P2 | `app/workshop/manual-library.tsx:206` uses page-local worksheet state and explicitly says entries last until departure. | Useful preparation notes disappear if reader leaves before downloading. | Keep limitation explicit; consider draft persistence only with a clear privacy/lifecycle decision. Existing disclosure is honest. |
| P3 | Homepage masthead supplied by user screenshot includes volume label. | Unwanted publication branding remains. | Remove Vol 01 while retaining the masthead statement; check visual/accessibility text and metadata. |

P1 means a core flow or keyboard operation is materially broken or misleading. P2 means avoidable friction or accessibility risk. P3 means editorial consistency. No critical data-loss or security finding is asserted by this UX-only review.

All repairable findings below were incorporated in the completed pass. Worksheet persistence remains a disclosed optional enhancement, with no storage added. These rows retain the original baseline for traceability.

## Design analysis

Keep `#eeeee7` ivory, `#171814` ink, `#ed4c2d` orange and self-hosted Anton. The later CSS palette overrides the earlier one; audit computed styles against that final cascade. Historic cover photographs, asymmetrical chapters, strong rules and car-specific technical sheets are intentional. Repair behavior without introducing an unrelated dashboard visual system.

The useful rhythm is discovery, sustained reading, then a clear workshop decision. The largest opportunity is continuity: a filtered catalogue should survive a story visit, the workshop should retain the selected car, a modal should return focus, and a reporting link should preserve source context. Dense provenance should remain readable rather than become a decorative footer.

Source-observed strengths: skip-to-main link (`app/layout.tsx`), reduced-motion rules (`app/globals.css:1759`), honest sample/preview disclosure (`app/components.tsx` Footer), model/year/market literature scope (`app/cars/[slug]/workshop/page.tsx`), truthful procedure gaps and applicability gating (`app/workshop/manual-library.tsx`), model-specific plate registry (`app/workshop/technical-plate.tsx`), error retry and 404 archive recovery (`app/error.tsx`, `app/not-found.tsx`). Preserve these.

## Deliverables and coverage

The visual and behavior contracts are in `_bmad-output/planning-artifacts/ux-designs/ux-motor-archive-2026-10-20/DESIGN.md` and `EXPERIENCE.md`. Five journeys cover discovery/return, workshop/manual/plate/worksheet, keyboard gallery, unavailable newsletter, and correction/reporting. Named journey actors are explicitly hypothetical assumptions. Mermaid diagrams describe branch and recovery behavior; these are acceptance models, not evidence of working deployment.

The BMAD headless fast path used current implementation and inherited approved direction. No new creative-tool mocks, paid providers, publishing, interviews or external communications were used. Every surface is documented in the spines; browser coverage, real contrast checks, external manual availability, touch behavior, downloads and keyboard outcomes remain the parent run's verification responsibility. Production editorial/email channels remain configuration dependencies.

## Completed repair pass

BMAD 6.12.4 was installed locally. The `bmad-build` oneshot workflow ran with its configured blind-hunter review; `bmad-ux` supplied the design and experience contracts. No full multi-lens code review, user study or production certification is claimed.

- Archive query, available filters, ordering and page use URL state. Reload and browser Back restore the shortlist. Invalid filter options are discarded, text input is bounded consistently, and empty results offer Show all cars. Pagination pushes a history entry, though the four-car preview has no second page to exercise.
- Workshop hub cards open the selected vehicle workshop. Header active state and aria-current correctly identify Workshop. Expanded filters, result announcements and mobile menu Escape behavior are explicit.
- Gallery image changes retain focus; dismissal restores the initiating thumbnail and background scrolling. Modal focus enumeration includes links and the technical viewport. Plate buttons are at least 44px high and zoom remains bounded at 100-300%.
- Newsletter availability is known before rendering entry fields. The unconfigured preview collects no email and offers archive navigation. The server still rejects unavailable subscriptions; live provider delivery remains untested.
- Correction links carry their source page. Correction drafts require page, claim, proposal and a source URL; download status clears when edited. Drafts remain local and are explicitly not sent. The download action and rendered status were checked, not the downloaded file contents.
- Smaller orange labels and light-surface hover links use #b5321b; bright orange remains on large/decorative elements and ink surfaces. Tags and plate credits are now at least 10px. Solid-color contrast is approximately 5.2:1 for the darker accent on ivory. Full rendered contrast and 200% text zoom certification remain outside this pass.
- Vol 01 is removed. Historic photography, Anton headlines and all four car-specific diagrams are preserved.

## Verification evidence

23 unit tests, strict TypeScript checking and production compilation passed. 39 local HTTP route/security/flow checks passed. Browser checks at 1440px covered filtered search, reload and story/Back restoration, no-results reset, all four workshop card destinations, gallery focus, newsletter availability and contextual draft export/status reset. At 390px, homepage, archive, workshop hub, newsletter, corrections, Porsche story and NSX workshop all had matching viewport/document width and no broken completed images. Mobile menu Escape restored its trigger. NSX plate reached 300%, disabled further zoom and closed back to its trigger with 44px controls.

Deferred: production email and editorial submission configuration, provider delivery verification, persistent workshop drafts, a catalogue larger than six for live pagination QA, exhaustive assistive-technology and contrast/zoom audits. Worksheet persistence is a product/privacy decision; current page-only lifetime remains disclosed. No publication or external communication occurred.

## Follow-up status check

Rechecked the requested incorporation on 20 October 2026. The actionable navigation, URL state, focus, availability, correction draft, contrast and branding changes are already in application source. Updated the experience contract to label them Implemented rather than Required fix. No additional feature change is needed to satisfy these findings. Remaining items depend on real delivery configuration, optional persistence decisions or broader verification, as listed above.
