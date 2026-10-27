# Release review: Pagination Arrow

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`PaginationArrow` root element rendered, no error display).
Figma node: 155:30.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/PaginationArrow/PaginationArrow.intent.json exists at 162af96; 2 listed gaps; no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 11 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports PaginationArrow, PaginationArrowProps |  |
| 5 | Names final | ✓ | Figma node 155:30 is named "Pagination Arrow"; component set name matches. Every prop name and variant value matches its Figma property character for character; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 6 stories in PaginationArrow.stories.tsx (one per matrix row); 6 linked Staging Testing rows, 6 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 3 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 1 entry without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 3 of 7 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[4] (figma:156:332), a11y[5] (figma:156:335), a11y[6] (figma:156:341) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in PaginationArrow.css |  |
| 5 | All variants covered | ✓ | variant props in PaginationArrow.tsx: Direction (2), State (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✗ | Pagination and Pagination Arrow: both carry "Set an arrow to Hover through its nested instance to show the pointer over it." | Designer |

## Warnings
- dont_use_when[0] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 30e90a6 Pagination Arrow: 2 directions x 3 states (node 155:30)

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
