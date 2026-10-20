---
title: Reliable reading and workshop journeys
type: bugfix
created: 2026-10-20
status: done
route: oneshot
review_loop_iteration: 0
context: []
---

<frozen-after-approval>

## Intent

The approved automotive journal has avoidable friction in its browse, story, workshop and return journeys. Run BMAD UX analysis, repair evidenced interaction defects and verify the resulting flows without changing the approved visual direction.

Preserve the historic photographs, Anton typography, ivory/black/orange design, per-car line diagrams and no-em-dash copy. Archive search and filter state must survive reload and return navigation. A workshop page must identify Workshop as the active navigation item, and selecting a car on the workshop index must open its workshop. Gallery navigation must preserve focus until dismissal. Newsletter availability must be clear before email entry when the provider is unconfigured. Correction links must carry their source context and allow a clearly labelled local draft export without implying delivery. Use only reversible local source changes; no database migrations, paid calls, publication, synthetic service instructions or external messages.

</frozen-after-approval>

## Implementation Notes

- BMAD 6.12.4 installed project-locally. Existing source is not in a Git checkout; baseline copies were saved under work/bmad-baseline for review. No VCS revisions are invented.
- Chosen oneshot route: one cohesive reliability pass across existing public journeys, known implementation patterns, no irreversible effects or unresolved product decisions. Existing conversation establishes brand and scope.
- Code map: app/components.tsx owns Header, CarCard, Newsletter, Gallery and ArchiveBrowser. Root layout can expose server-known email availability via a client context. Archive/search server pages provide initial URL state. Repository maps stored editions to public Car records. Workshop index currently routes its cards to stories. Corrections is a truthful but unusable preview dead end.
- Verify URL-state reload/back behavior, empty-state recovery, active navigation, workshop card destinations, gallery keyboard focus, newsletter unavailable state, correction draft context and export, mobile overflow, type checking, HTTP assertions and build. UX spines and audit are delegated through bmad-ux headless distillation.

- Completed URL state, invalid-filter recovery, workshop routing/active navigation, gallery focus lifecycle, availability-aware newsletter rendering, local contextual correction drafts and small-text contrast fixes. Preserved catalogue imagery and no-em-dash house style.
- Validation: npm test 23 passed; npm run typecheck passed; npm run build passed; local HTTP 39 checks passed. Browser observations and verification boundaries are in UX-AUDIT.md. Production provider behavior and second-page browser pagination remain unverified.
- Only the configured oneshot blind-hunter review ran. No extra code-review lenses were claimed. Git is unavailable, so the commit step was skipped.

## Review Triage Log

1. Pagination replaceState loses page history: low, defer. Four current cars cannot reach pagination (>6); no current user defect demonstrated. A simple pushState correction is included for catalogue expansion, with live multi-page QA deferred.
2. Invalid URL filter values silently hide results: medium, patch. Native select has no corresponding option; invalid country was reachable by URL. Validate filters against actual catalogue options; browser now canonicalizes invalid country to four results. Unit test added.
3. Unbounded input differs after reload: medium, patch. Reader could enter >200 characters while parser clipped them. Input maxLength, onChange and URL serialization now share the 200-character bound; round-trip test passed.
4. Correction draft can omit affected page: medium, patch. Direct /corrections had optional page. Correction form now requires page; contextual entry remains prefilled. Enquiry page stays optional by design.
5. Downloaded status survives draft edits: medium, patch. Editing after export left stale completion status. Form changes now clear status; browser observed fallback draft-lifetime copy after edit.
6. New UX tests excluded from npm test: medium, patch. Default command ran only quality tests. Package script now includes UX state tests; default run passed all 23.

## Remaining boundaries

No unresolved verified high or medium issue from this bounded review. Larger-catalogue pagination QA, exhaustive accessibility testing, persistent workshop drafts, production provider delivery and an editorial submission channel remain deferred work, not completed functionality.
