# Release review: Item Card

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`ItemCard` root element rendered, no error display).
Figma node: 108:39.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/ItemCard/ItemCard.intent.json exists at 162af96; 2 listed gaps; empty fields placement are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 22 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports ItemCard, ItemCardLayout, ItemCardProps, ItemCardState |  |
| 5 | Names final | ✗ | Figma node 108:39 is named "Item Card"; component set name matches. Props with no Figma property: Status, Photo, PhotoAlt. Variant values all match. | Designer to expose the property in Figma, or Engineer to drop the prop |
| 6 | States complete | ✓ | 6 stories in ItemCard.stories.tsx (one per matrix row); 6 linked Staging Testing rows, 6 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 4 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 6 of 8 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[1] (code:src/components/ItemCard/ItemCard.tsx:59 · code:src/components/ItemCard/ItemCard.tsx:60), a11y[3] (figma:123:371), a11y[4] (figma:123:374), a11y[5] (figma:123:377), a11y[6] (figma:123:380), a11y[7] (figma:123:383) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in ItemCard.css |  |
| 5 | All variants covered | ✓ | variant props in ItemCard.tsx: Layout (3), State (2); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | no other intent file at the commit has a use_when describing the same job |  |

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 10dbb0a Item Card: rename root data-layout to data-card-layout (node 108:39)
- 5dd5ef0 Item Card: 3 layouts x 2 states (node 108:39)

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
