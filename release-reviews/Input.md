# Release review: Input

Reviewed commit: a7eaa75 (full SHA in the footer)
Date: 31/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, 31/10/2026. Deployment dpl_4Qy1ugMvMrdDeDMB6oF5EgH8FAwA is READY at a7eaa75 and holds lemonade-design-system.vercel.app. 17 stories, 16 matrix and 1 example: every one loaded with a non-zero box and no error display.
Figma node: 88:62.
Re-review for 0.3.1: replaces the review at 29e20af. Every gate and check was run again at a7eaa75.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Input/Input.intent.json exists at a7eaa75; 0 listed gaps; no empty field outside gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Released, read 31/10/2026 by plain list, under the Designer ruling in Notes. Test summary reads Passed, Production Storybook is set |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 37 var(--…) names are semantic; node scripts/verify-tokens.mjs at a7eaa75: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports Input and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✓ | Figma node 88:62 is named "Input"; the name matches. Properties read live from the component set: Type, State, Show label, Show helper, Icon Right, Icon Right swap, Label, Placeholder, Helper. All match character for character. defaultValue is a content prop. onTypeChange is a runtime prop. name and className are standard HTML attributes. No New, Temp, WIP or v2 in any name |  |
| 6 | States complete | ✓ | 16 variants in the Figma set, 16 matrix stories, 16 linked Staging Testing rows, 16 Passed; none Failed or Fixed (To re-test). See Notes on re-testing |  |
| 7 | Version meaning known | ✓ | git log v0.3.0..a7eaa75 -- src/components/Input: 3 commits, none breaking. One fix, not breaking. Forces a patch |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | all 12 entries name an element, role, attribute, key or hidden state and cite a source; a11y is unchanged since v0.3.0; 26 figma: citations, 19 distinct nodes in this file read live from Figma on 31/10/2026 |  |
| 4 | required_tokens resolve in the built output | ✓ | all 37 names are defined in build/css/tokens.css at a7eaa75, and the list equals the var(--…) set in the CSS |  |
| 5 | All variants covered | ✓ | variant props in the .tsx: Type (4), State (4); every value has a filled variant_intent entry |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with all 25 intent files at a7eaa75; no shared sentence with this component; use_when is unchanged since v0.3.0 |  |

## Warnings
- 5 dont_use_when entries name no alternative.

## Gate 7 commits
- a1f7f67 adds one example story and placement: added, not breaking, nothing shipped.
- 0adfc7f changes Input.tsx: fixed, not breaking. A swapped Icon Right now sits in a span with class input__icon and aria-hidden="true". The stories set control: false on the swap prop.
- 1661e12 fills the State intent from Figma: changed, not breaking, nothing shipped.

## Notes
Gate 2: the Designer ruled that Released satisfies gate 2 when a patch re-reviews a component that already shipped. The ruling reached this review through the coordinator, not directly. The skill at a7eaa75 still says Completed; its wording is left for a human to change.

Gate 6 reads the rows, so it passes. The rows predate a7eaa75; QA did not re-test after 0adfc7f.

Swapped icon, in production at a7eaa75: no story passes a swap, so an Icon element from the deployed bundle was passed to Single Default and Single Disabled through the Storybook preview channel. Default: the wrapper and the icon path compute to rgb(91, 106, 126), equal to var(--color-icon-secondary). Disabled: both compute to rgb(131, 144, 162), equal to var(--color-icon-disabled). The wrapper carries aria-hidden="true". Icon Right swap shows no control. The wrapper is 22 tall where the default chevron is 18; it stays inside the 48 field. The a11y list does not yet mention the aria-hidden wrapper.

The placement entry cites 98:307 and shortens it. Placement is not one of the six checks and #148 did not add it, so this is a note for the Doc-generator, not a failure.

Full SHA: a7eaa75d2d362fb35c46e75efb44f00f4bfeb8f2
