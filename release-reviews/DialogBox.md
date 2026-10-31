# Release review: Dialog Box

Reviewed commit: a7eaa75 (full SHA in the footer)
Date: 31/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, 31/10/2026. Deployment dpl_4Qy1ugMvMrdDeDMB6oF5EgH8FAwA is READY at a7eaa75 and holds lemonade-design-system.vercel.app. 4 stories, 2 matrix and 2 examples; each opens with focus on Cancel. The Docs page shows 5 closed Open dialog triggers and no scrim: every one loaded with a non-zero box and no error display.
Figma node: 160:307.
Re-review for 0.3.1: replaces the review at 29e20af. Every gate and check was run again at a7eaa75.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/DialogBox/DialogBox.intent.json exists at a7eaa75; 0 listed gaps; no empty field outside gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Released, read 31/10/2026 by plain list, under the Designer ruling in Notes. Test summary reads Passed, Production Storybook is set |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 23 var(--…) names are semantic; node scripts/verify-tokens.mjs at a7eaa75: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports DialogBox and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✓ | Figma node 160:307 is named "Dialog Box"; the name matches. Properties read live from the component set: Type, Show callout. Both match character for character. Title, Body, CalloutProps, CancelLabel and ConfirmLabel only set what it shows: content props. open, onCancel and onConfirm are runtime props. className and the inherited div attributes are standard HTML attributes. No New, Temp, WIP or v2 in any name |  |
| 6 | States complete | ✓ | 2 variants in the Figma set, 2 matrix stories, 2 linked Staging Testing rows, 2 Passed; none Failed or Fixed (To re-test). See Notes on re-testing |  |
| 7 | Version meaning known | ✓ | git log v0.3.0..a7eaa75 -- src/components/DialogBox: 3 commits, none breaking. One fix, not breaking. Forces a patch |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | all 13 entries name an element, role, attribute, key or hidden state and cite a source; a11y is unchanged since v0.3.0; 21 figma: citations, 18 distinct nodes in this file read live from Figma on 31/10/2026 |  |
| 4 | required_tokens resolve in the built output | ✓ | all 23 names are defined in build/css/tokens.css at a7eaa75, and the list equals the var(--…) set in the CSS |  |
| 5 | All variants covered | ✓ | variant props in the .tsx: Type (2); every value has a filled variant_intent entry |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with all 25 intent files at a7eaa75; no shared sentence with this component; use_when is unchanged since v0.3.0 |  |

## Warnings
- 4 dont_use_when entries name no alternative.

## Gate 7 commits
- a1f7f67 adds two example stories and placement: added, not breaking, nothing shipped.
- 0adfc7f changes DialogBox.tsx: fixed, not breaking. Focus from inside another open dialog is no longer pulled back, and a server render while open returns null. The stories start closed on the Docs page.
- 1661e12 fills the Type=Default intent from Figma: changed, not breaking, nothing shipped.

## Notes
Gate 2: the Designer ruled that Released satisfies gate 2 when a patch re-reviews a component that already shipped. The ruling reached this review through the coordinator, not directly. The skill at a7eaa75 still says Completed; its wording is left for a human to change.

Gate 6 reads the rows, so it passes. The rows predate a7eaa75; QA did not re-test after 0adfc7f.

The two fixes were read in the diff. Two dialogs open at once and a server render were not driven in a browser. The a11y entry "focus is kept inside while open" does not name the new exception for another open dialog; it stays true for one dialog, and Figma 184:488 says not to stack them.

The placement entry cites 184:462 and 184:478 and shortens them. Placement is not one of the six checks and #148 did not add it, so this is a note for the Doc-generator, not a failure.

Full SHA: a7eaa75d2d362fb35c46e75efb44f00f4bfeb8f2
