# Release review: Table Row

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`TableRow` root element rendered, no error display).
Figma node: 112:32.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/TableRow/TableRow.intent.json exists at 162af96; 1 listed gaps; no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✗ | stage-3 grep returns 2 line(s): TableRow.css:91 font-family: var(--tagline-12-font-family);; TableRow.css:105 font-family: var(--body1-font-family);; all 27 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) | Engineer |
| 4 | Public surface decided | ✓ | src/index.ts exports TableRow, TableRowProps, TableRowType |  |
| 5 | Names final | ✗ | Figma node 112:32 is named "Table Row"; component set name matches. Props with no Figma property: Reference, Item, Owner, Location, Status, Action. Variant values all match. | Designer to expose the property in Figma, or Engineer to drop the prop |
| 6 | States complete | ✓ | 3 stories in TableRow.stories.tsx (one per matrix row); 3 linked Staging Testing rows, 3 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 5 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 2 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 5 of 8 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[3] (figma:146:329), a11y[4] (figma:146:332), a11y[5] (figma:146:335), a11y[6] (figma:146:338), a11y[7] (figma:146:341) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in TableRow.css |  |
| 5 | All variants covered | ✓ | variant props in TableRow.tsx: Type (3), Reference (6); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✗ | Table and Table Row: both carry the same three entries: "Start with one Header row, then Body rows with no gap.", "Use Body Hover for the row under the pointer.", "Keep the same column widths in every row." | Designer |

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 3c39bf6 Table Row: draw the bottom stroke inside the row and keep nested controls off the line box (nodes 112:32, 141:8)
- 9aa23bd Table Row: apply column width, cell padding, row Fill and Header border bindings (node 112:32)
- 2cb4d5a Table Row: Header, Body, Body Hover (node 112:32)

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
