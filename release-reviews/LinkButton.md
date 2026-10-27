# Release review: Link Button

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`LinkButton` root element rendered, no error display).
Figma node: 147:183.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/LinkButton/LinkButton.intent.json exists at 162af96; 1 listed gaps; no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 11 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports LinkButton, LinkButtonProps |  |
| 5 | Names final | ✗ | Figma node 147:183 is named "Link Button"; component set name matches. Prop names differ from the Figma property names: Icon Right → IconRight, Icon Right swap → IconRightSwap. The repo already uses quoted names elsewhere (IconButton 'Show badge', ItemCard 'Show status', StatCard 'Show delta'). Variant values all match. | Engineer (prop names) |
| 6 | States complete | ✓ | 3 stories in LinkButton.stories.tsx (one per matrix row); 3 linked Staging Testing rows, 3 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 3 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 6 of 8 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[2] (code:src/components/LinkButton/LinkButton.tsx:37 · code:src/components/LinkButton/LinkButton.tsx:35), a11y[3] (figma:232:604), a11y[4] (figma:232:607), a11y[5] (figma:232:610), a11y[6] (figma:232:613), a11y[7] (figma:232:616) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in LinkButton.css |  |
| 5 | All variants covered | ✓ | variant props in LinkButton.tsx: State (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✗ | Button and Link Button: Button use_when[2] claims Ghost for "low-emphasis actions in toolbars, cards and table rows"; Link Button use_when[0] and [1] claim "the action in a table row" and "secondary actions inside cards". Both claim actions in table rows and cards | Designer |

## Warnings
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- f758ff9 LinkButton: build from node 147:183, one story per State

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
