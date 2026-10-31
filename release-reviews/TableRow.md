# Release review: Table Row

Reviewed commit: 29e20af (full SHA in the footer)
Date: 31/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, 31/10/2026. Production deployment READY at 29e20af; all 3 stories loaded with a non-zero box and no error display.
Figma node: 112:32.
Rules: `.claude/skills/release-review/SKILL.md` and `.claude/skills/build/SKILL.md` at 29e20af, including the gate 5 runtime-prop rule from #137.
Re-review: replaces the review at 13e049a. `git diff 13e049a 29e20af -- src build tokens` is empty, so the code, intent, stories and tokens reviewed are the same files. Run again at 29e20af: gates 1 to 6, checks 1 to 5, verify-tokens, the Figma properties and every figma: source, the registry and test rows, and the production render. Reused from 13e049a: the gate 7 classification, the check 6 comparison and the diff read in Notes.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/TableRow/TableRow.intent.json exists at 29e20af; 1 listed gap(s); no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 31/10/2026 at start and again before the write); test summary reads Passed |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 27 var(--…) names are semantic; node scripts/verify-tokens.mjs at 29e20af: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports TableRow and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✓ | Figma node 112:32 is named "Table Row"; the name matches. Properties read live from the component set: Type. Reference, Item, Owner and Location only set cell text; Status and Action set text or pass a value to the nested Status Badge and Link Button; all six are content props. All match character for character. Event handlers are runtime props. Inherited DOM attributes are not design properties, see Notes. No New, Temp, WIP or v2 in any name |  |
| 6 | States complete | ✓ | 3 variants in the Figma set, 3 stories, 3 linked Staging Testing rows, 3 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | git log v0.2.0..29e20af -- src/components/TableRow: No commit touches src/components/TableRow since v0.2.0; only its export line was added. Forces no breaking bump |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 2 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | each entry names an element, role, attribute, key or hidden state and cites its source; every code: line read at 29e20af; all 13 figma: sources in this file read live and match word for word |  |
| 4 | required_tokens resolve in the built output | ✓ | all 27 names are defined in build/css/tokens.css at 29e20af, and the list equals the var(--…) set in TableRow.css |  |
| 5 | All variants covered | ✓ | variant props in TableRow.tsx: Type (3); every value has a variant_intent entry; none empty |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with all 25 intent files at 13e049a; no overlap; evidence reused from 13e049a, intent files unchanged at 29e20af |  |

## Warnings
- 2 dont_use_when entries name no alternative.

## Gate 7 commits
- None. No commit touches src/components/TableRow since v0.2.0; only its export line was added.

## Notes
Gate 5: the build skill defines content props and runtime props. DOM attributes (className, name, href and inherited HTML attributes) are neither by its words. They are passed through to the element and set no design choice, so they are read as outside the gate, as in the review at 13e049a. A human can write that into the skill.

Full SHA: 29e20afb1a8bdd6efd96a4b127fdb7df057db3e6
