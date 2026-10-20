---
name: MOTOR / ARCHIVE
status: final
updated: 2026-10-20
description: Existing automotive editorial identity, captured for consistent implementation and repair.
sources:
  - ../../../../app/globals.css
  - ../../../../app/components.tsx
  - ../../../../app/page.tsx
  - ../../../../app/cars/catalogue-story.tsx
  - ../../../../app/workshop/technical-plate.tsx
colors:
  paper: '#eeeee7'
  ink: '#171814'
  muted: '#62645b'
  line: '#c7c9be'
  accent: '#ed4c2d'
  accent-text: '#b5321b'
  white: '#ffffff'
  article-ink: '#454b3d'
typography:
  display:
    fontFamily: 'MotorDisplay, Impact, Arial Narrow, sans-serif'
    fontWeight: '400'
    lineHeight: '1.03'
    letterSpacing: '-0.015em'
  body:
    fontFamily: 'Arial, Helvetica, sans-serif'
    fontSize: '14px'
    fontWeight: '400'
  article:
    fontFamily: 'Georgia, Times New Roman, serif'
    fontSize: '19px'
    lineHeight: '1.9'
  label:
    fontFamily: 'Arial, Helvetica, sans-serif'
    fontSize: '9px'
    fontWeight: '600'
    letterSpacing: '1.5px'
rounded:
  DEFAULT: '0px'
spacing:
  gutter: '4.2%'
  chapter: '65px'
  navigation-gap: '27px'
  compact: '16px'
components:
  site-navigation:
    background: '{colors.paper}'
    foreground: '{colors.ink}'
  editorial-card:
    foreground: '{colors.ink}'
    radius: '{rounded.DEFAULT}'
  archive-controls:
    focus: '{colors.accent}'
  story-chapters:
    border: '{colors.line}'
  gallery-dialog:
    background: '{colors.ink}'
    foreground: '{colors.white}'
  technical-plate:
    foreground: '{colors.ink}'
  manual-library:
    foreground: '{colors.ink}'
  owner-check:
    foreground: '{colors.ink}'
  service-worksheet:
    foreground: '{colors.ink}'
  newsletter:
    background: '{colors.ink}'
    foreground: '{colors.paper}'
  correction-report:
    foreground: '{colors.ink}'
  recovery-panel:
    foreground: '{colors.ink}'
---

# MOTOR / ARCHIVE visual contract

## Brand & Style

An independent motoring publication with the scale and confidence of a printed magazine. The user approved bold fonts, real historic photographs, relevant editorial pages and model-specific line drawings after rejecting the earlier encyclopedia feel. Preserve that direction. The contrast between dramatic display type, generous editorial whitespace and detailed source captions is the identity.

This document records the implemented design, rather than proposing a new brand. The final cascading declarations in `app/globals.css`, beginning at the self-hosted font around line 1854, override the earlier palette. `EXPERIENCE.md` owns behavior. These two spines take precedence over illustrative artifacts if those disagree. No new mocks were requested in this headless capture; all surfaces are spine-only and the parent run owns browser evidence.

## Colors

| Token | Existing role | Rule |
|---|---|---|
| `{colors.paper}` | Main ivory canvas | Maintain between editorial sections; do not substitute pure white globally. |
| `{colors.ink}` | Headlines, navigation, dark panels | The primary text color and inverse panel background. |
| `{colors.muted}` | Secondary prose and metadata | Keep readable; small credits remain essential information. |
| `{colors.line}` | Section rules and control boundaries | Decoration only where its contrast is insufficient to identify a required control. |
| `{colors.accent}` | Orange masthead slash, active states, focus | Preserve brand usage; do not assume it meets body-text contrast on ivory. |
| `{colors.white}` | Text over sufficiently dark imagery | Preserve the dark overlay behind photograph headlines. |
| `{colors.article-ink}` | Long-form article copy | Maintain its softer appearance without weakening legibility. |

Contrast targets for implementation acceptance are 4.5:1 for ordinary text, 3:1 for large text and 3:1 for required focus/control boundaries. Calculated solid-color ratios: ink/ivory approximately 15.3:1, muted/ivory approximately 5.2:1, orange/ivory approximately 3.2:1, orange/ink approximately 4.8:1. These are token calculations, not a full rendered contrast audit. Orange on ivory is unsuitable for small informational text; preserve orange as a decorative/large-type accent or pair it with ink. Photograph overlays require separate rendered checks.

## Typography

`{typography.display}` is Anton, served locally as `/fonts/anton.ttf` through the `MotorDisplay` font family. Its tight uppercase mass provides the publication's display voice. Keep headline weight at the actual font's 400; synthetic bold is unnecessary. Main masthead scale is fluid at 13.9vw. The wordmark uses 31px on desktop, while story section headlines use fluid 44px to 71px sizes. These are source observations, not a requirement to make every heading oversized.

`{typography.body}` supports navigation, controls and straightforward explanation. `{typography.article}` supports sustained reading inside vehicle chapters. `{typography.label}` is used for edition numbers, eyebrows and provenance. Existing labels can fall to 8px, which needs a mobile readability check; do not extend that small size to new essential content. Keep long copy in sentence case. Never use an em dash in website content, accessible labels, generated worksheets or metadata.

## Layout & Spacing

The shared content frame uses `{spacing.gutter}` on each side. Desktop article sections mix asymmetric two-column grids, full-width historic covers and quieter reading widths. The vehicle standfirst uses 0.6fr/2fr columns; origin uses 1fr/1.3fr. `{spacing.chapter}` separates major story beats. This deliberate rhythm is useful only when a clear route to the next action remains visible.

The CSS includes breakpoint rules at 1120px, 1000px and 760px, plus selected large-screen adjustments. At 760px and below, stack editorial columns and use fluid heading sizes that fit the viewport. Manual metadata, source URLs and plate controls must wrap within the page; an enlarged technical image may scroll within its own viewer. Preserve the existing hero crops per car rather than treating every image as interchangeable.

## Elevation & Depth

Flat surfaces, photographic contrast and strong rules carry hierarchy. Avoid introducing dashboard-like drop shadows, glass panels or rounded card stacks. A dark modal isolates imagery; focus indication must remain distinct from the modal border and photographic highlights.

## Shapes

Use `{rounded.DEFAULT}` for editorial images, rule-based cards and primary actions. The publication's rectangular framing suits archive photographs and technical sheets. Scale original line drawings with containment so dimensions and views are not cropped. Do not redraw a generic car in place of a model-specific technical reference.

## Components

Names in this table match `EXPERIENCE.md` exactly.

| Component | Visual anatomy and states |
|---|---|
| Site navigation | Ink utility strip, ivory header, Anton wordmark, uppercase links, orange active underline; mobile menu control remains visible. |
| Editorial card | Large rectangular photograph, edition and era metadata, Anton vehicle name, sentence-case headline; hover arrow supplements the whole-card link. |
| Archive controls | Search field, compact labeled selects, clear/reset actions and separate results count; visible focus uses `{colors.accent}` against an adequate contrasting surface. |
| Story chapters | Rule-separated chapter links, prominent section headings and readable article copy; current story identity remains above the workshop entry. |
| Gallery dialog | Dark full-viewport backdrop, image contained at its aspect ratio, close/previous/next controls, count and credits; no layout shift when advancing. |
| Technical plate | Model label and plate number above contained line drawing, enlarge affordance, visible caption, creator/license and reference link; zoom controls remain separate from image. |
| Manual library | Search/type controls followed by publication cards; document kind, publisher, coverage, revision, access and checked date stay legible before external action. |
| Owner check | Applicability statement and checkbox precede expandable tasks; numbered checks, source link and session progress have distinct hierarchy. |
| Service worksheet | Labeled configuration/job fields, notes area and solid download button; local-only state explanation adjacent to action. |
| Newsletter | Editorial panel, contrasting type, labeled email and consent controls only when signup can work; unavailable and submission states occupy a persistent readable region. |
| Correction report | Text-page hierarchy, precise requested evidence and honest channel status; any local draft control uses the existing field/button language. |
| Recovery panel | Prominent short heading, explanation and single primary recovery action; error and 404 pages use the normal publication frame. |

## Do's and Don'ts

| Do | Avoid |
|---|---|
| Use actual period photography with accurate date and variant captions. | Passing a modern photo or race variant off as the road car in its original era. |
| Show a different verified line drawing for each catalogue car. | A reused generic silhouette or a cropped dimension sheet. |
| Preserve ivory, ink, orange and Anton. | Replacing the approved direction with a neutral encyclopedia or software dashboard. |
| Keep sources, access conditions and year/market coverage close to decisions. | Calling an external listing a reviewed repair procedure. |
| Use periods, commas, parentheses or colons as appropriate. | Em dashes or the removed Vol 01 label. |
| Reserve extreme type scale for editorial hierarchy. | Letting display type crowd forms or dominate error recovery. |

## Repair implementation

Small light-surface orange labels and text-link hover states use `{colors.accent-text}`. Bright `{colors.accent}` remains for large/decorative roles and small accents on ink. Tags and technical plate credits are 10px minimum. See UX-AUDIT.md for tested surfaces and limits; a full rendered contrast audit is not claimed.
