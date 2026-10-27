# Release review: Icon Button

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`IconButton` root element rendered, no error display).
Figma node: 192:33.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/IconButton/IconButton.intent.json exists at 162af96; 1 listed gaps; no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 17 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports IconButton, IconButtonProps |  |
| 5 | Names final | ✓ | Figma node 192:33 is named "Icon Button"; component set name matches. Every prop name and variant value matches its Figma property character for character; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 9 stories in IconButton.stories.tsx (one per matrix row); 9 linked Staging Testing rows, 9 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 4 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 6 of 9 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[1] (code:src/components/IconButton/IconButton.tsx:15 · code:src/components/IconButton/IconButton.tsx:39), a11y[4] (figma:205:519), a11y[5] (figma:205:522), a11y[6] (figma:205:525), a11y[7] (figma:205:528), a11y[8] (figma:205:531) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in IconButton.css |  |
| 5 | All variants covered | ✓ | variant props in IconButton.tsx: Style (3), State (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | no other intent file at the commit has a use_when describing the same job |  |

## Warnings
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 6309055 Icon Button: bind width and height to --size-iconbutton (node 192:33)
- d381e96 IconButton: build from node 192:33, one story per Style x State

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
