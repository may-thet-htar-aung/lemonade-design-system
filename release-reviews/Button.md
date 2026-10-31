# Release review: Button

Reviewed commit: a7eaa75 (full SHA in the footer)
Date: 31/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes, 31/10/2026. Deployment dpl_4Qy1ugMvMrdDeDMB6oF5EgH8FAwA is READY at a7eaa75 and holds lemonade-design-system.vercel.app. 12 stories, 9 matrix and 3 examples: every one loaded with a non-zero box and no error display.
Figma node: 165:1639.
Re-review for 0.3.1: replaces the review at 29e20af. Every gate and check was run again at a7eaa75.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Button/Button.intent.json exists at a7eaa75; 1 listed gap; no empty field outside gaps |  |
| 2 | Development status is Completed | ✗ | Components.Development reads Released, read 31/10/2026 by plain list. The gate passes only on Completed. Test summary reads Passed, Production Storybook is set, Release Verdict reads Cleared from the 0.3.0 review | A human, to rule whether Released satisfies the gate |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 25 var(--…) names are semantic; node scripts/verify-tokens.mjs at a7eaa75: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports Button and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✓ | Figma node 165:1639 is named "Button"; the name matches. Properties read live from the component set: Style, State, Label, Icon Left, Icon Left swap, Icon Right, Icon Right swap. All match character for character. className, type and the inherited button attributes are standard HTML attributes. No New, Temp, WIP or v2 in any name |  |
| 6 | States complete | ✓ | 9 variants in the Figma set, 9 matrix stories, 9 linked Staging Testing rows, 9 Passed; none Failed or Fixed (To re-test). See Notes on re-testing |  |
| 7 | Version meaning known | ✓ | git log v0.3.0..a7eaa75 -- src/components/Button: 3 commits, none breaking. No shipped change. Button.tsx and Button.css are unchanged since v0.3.0 |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | all 8 entries name an element, role, attribute, key or hidden state and cite a source; a11y is unchanged since v0.3.0; 23 figma: citations, 20 distinct nodes in this file read live from Figma on 31/10/2026 |  |
| 4 | required_tokens resolve in the built output | ✓ | all 25 names are defined in build/css/tokens.css at a7eaa75, and the list equals the var(--…) set in the CSS |  |
| 5 | All variants covered | ✓ | variant props in the .tsx: Style (3), State (3); every value has a filled variant_intent entry |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with all 25 intent files at a7eaa75; no shared sentence with this component; use_when is unchanged since v0.3.0 |  |

## Warnings
- 5 dont_use_when entries name no alternative.

## Gate 7 commits
- a1f7f67 adds three example stories: added, not breaking, nothing shipped.
- 0adfc7f sets control: false on the swap props in the stories: changed, not breaking, nothing shipped.
- 1661e12 fills the State intent from Figma: changed, not breaking, nothing shipped.

## Notes
Gate 2 is the only failure. The row moved past Completed when 0.3.0 went live, and the skill names no other passing value. It is reported as written, not read around. If a human rules that Released passes, every other gate and check here passes and the verdict would be Cleared.

Gate 6 reads the rows, so it passes. The rows predate a7eaa75; QA did not re-test after 0adfc7f.

Swap controls: Icon Left swap and Icon Right swap show no control in production, on Primary Default and on Example: with an icon, and both stories render with no error display.

Full SHA: a7eaa75d2d362fb35c46e75efb44f00f4bfeb8f2
