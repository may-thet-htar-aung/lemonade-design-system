# Release review: Dialog Box

Reviewed commit: 13e049a (full SHA in the footer)
Date: 31/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes, 31/10/2026. Production deployment READY at 13e049a; all 2 stories loaded with a non-zero box and no error display.
Figma node: 160:307.
Rules: `.claude/skills/release-review/SKILL.md` and `.claude/skills/build/SKILL.md` at 13e049a, including the gate 5 content-prop rule from #128.
Re-review: replaces the review at 5a7e2b4. Every gate and check was re-run at 13e049a.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/DialogBox/DialogBox.intent.json exists at 13e049a; 2 listed gap(s); empty field placement is listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 31/10/2026 at start and again before the write); test summary reads Passed |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 23 var(--…) names are semantic; node scripts/verify-tokens.mjs at 13e049a: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports DialogBox and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✗ | Figma node 160:307 is named "Dialog Box"; the name matches. Type and Show callout match. Title, Body, CalloutProps, CancelLabel and ConfirmLabel are content props. `open` (DialogBox.tsx:26, default true at :61) is not: `if (!open) return null` at :128 decides whether the component renders at all, and the focus handling at :82 depends on it. The build skill, stage 3, says a prop that changes how the component looks or behaves is a design property and must exist in Figma. The set has only Show callout and Type. Handler props (onCancel, onConfirm) are treated as wiring, as on the Cleared components that have them | Designer: add the property in Figma, or rule that runtime open state sits outside gate 5. Engineer if the prop name must then change to match |
| 6 | States complete | ✓ | 2 variants in the Figma set, 2 stories, 2 linked Staging Testing rows, 2 Passed; none Failed or Fixed (To re-test). The rows predate the prop rename in f0fe1a2: not re-tested by QA, see Notes |  |
| 7 | Version meaning known | ✓ | git log v0.2.0..13e049a -- src/components/DialogBox: 1 commit: changed, not breaking. Forces no breaking bump |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | each entry names an element, role, attribute, key or hidden state and cites its source; every code: line read at 13e049a; all 18 figma: sources in this file read live and match word for word |  |
| 4 | required_tokens resolve in the built output | ✓ | all 23 names are defined in build/css/tokens.css at 13e049a, and the list equals the var(--…) set in DialogBox.css |  |
| 5 | All variants covered | ✓ | variant props in DialogBox.tsx: Type (2); every value has a variant_intent entry; Type=Default listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with all 25 intent files at 13e049a; no overlap |  |

## Warnings
- 4 dont_use_when entries name no alternative.

## Gate 7 commits
- f0fe1a2 renames ShowCallout: changed, not breaking. A pure prop rename to the Figma name; the component was never exported in v0.1.0 or v0.2.0, so no public API moved.

## Notes
Gate 6 reads the rows, so it passes. QA did not re-test after the prop rename in f0fe1a2. The diff since v0.2.0 was read and changes nothing else, and every story renders in production at 13e049a, but that is a render check, not a test against the node.

Full SHA: 13e049a7c45c7747d085ea13682d63eeb7eb5db4
