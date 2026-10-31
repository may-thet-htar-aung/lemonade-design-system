# Release review: Link Button

Reviewed commit: 13e049a (full SHA in the footer)
Date: 31/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, 31/10/2026. Production deployment READY at 13e049a; all 3 stories loaded with a non-zero box and no error display.
Figma node: 147:183.
Rules: `.claude/skills/release-review/SKILL.md` and `.claude/skills/build/SKILL.md` at 13e049a, including the gate 5 content-prop rule from #128.
Re-review: replaces the review at 5a7e2b4. Every gate and check was re-run at 13e049a.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/LinkButton/LinkButton.intent.json exists at 13e049a; 1 listed gap(s); no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 31/10/2026 at start and again before the write); test summary reads Passed |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 11 var(--…) names are semantic; node scripts/verify-tokens.mjs at 13e049a: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports LinkButton and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✓ | Figma node 147:183 is named "Link Button"; the name matches. Properties read live from the component set: State, Label, Icon Right, Icon Right swap. All match character for character. Handler and DOM props are wiring, not design properties. No New, Temp, WIP or v2 in any name |  |
| 6 | States complete | ✓ | 3 variants in the Figma set, 3 stories, 3 linked Staging Testing rows, 3 Passed; none Failed or Fixed (To re-test). The rows predate the prop rename in c49a3f1: not re-tested by QA, see Notes |  |
| 7 | Version meaning known | ✓ | git log v0.2.0..13e049a -- src/components/LinkButton: 1 commit: changed, not breaking. Forces no breaking bump |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | each entry names an element, role, attribute, key or hidden state and cites its source; every code: line read at 13e049a; all 18 figma: sources in this file read live and match word for word |  |
| 4 | required_tokens resolve in the built output | ✓ | all 11 names are defined in build/css/tokens.css at 13e049a, and the list equals the var(--…) set in LinkButton.css |  |
| 5 | All variants covered | ✓ | variant props in LinkButton.tsx: State (3); every value has a variant_intent entry; State=Default, Disabled listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | Previous Button and Link Button overlap resolved: Button use_when[2] no longer claims cards and table rows (Figma 64:423 read live). Link Button use_when[0] and [1] are the only claim on those jobs |  |

## Warnings
- 4 dont_use_when entries name no alternative.

## Gate 7 commits
- c49a3f1 renames the icon props: changed, not breaking. A pure prop rename to the Figma name; the component was never exported in v0.1.0 or v0.2.0, so no public API moved.

## Notes
Gate 6 reads the rows, so it passes. QA did not re-test after the prop rename in c49a3f1. The diff since v0.2.0 was read and changes nothing else, and every story renders in production at 13e049a, but that is a render check, not a test against the node.

Full SHA: 13e049a7c45c7747d085ea13682d63eeb7eb5db4
