# Release review: Item Card

Reviewed commit: 13e049a (full SHA in the footer)
Date: 31/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, 31/10/2026. Production deployment READY at 13e049a; all 6 stories loaded with a non-zero box and no error display.
Figma node: 108:39.
Rules: `.claude/skills/release-review/SKILL.md` and `.claude/skills/build/SKILL.md` at 13e049a, including the gate 5 content-prop rule from #128.
Re-review: replaces the review at 5a7e2b4. Every gate and check was re-run at 13e049a.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/ItemCard/ItemCard.intent.json exists at 13e049a; 2 listed gap(s); empty field placement is listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 31/10/2026 at start and again before the write); test summary reads Passed |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 22 var(--…) names are semantic; node scripts/verify-tokens.mjs at 13e049a: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports ItemCard and its prop types, and nothing else from its folder |  |
| 5 | Names final | ✓ | Figma node 108:39 is named "Item Card"; the name matches. Properties read live from the component set: Layout, State, Show status, Title, Meta. Status passes a value to the nested Status Badge; Photo and PhotoAlt only set the image and its alt text; all three are content props. All match character for character. Handler and DOM props are wiring, not design properties. No New, Temp, WIP or v2 in any name |  |
| 6 | States complete | ✓ | 6 variants in the Figma set, 6 stories, 6 linked Staging Testing rows, 6 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | git log v0.2.0..13e049a -- src/components/ItemCard: No commit touches src/components/ItemCard since v0.2.0; only its export line was added. Forces no breaking bump |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | each entry names an element, role, attribute, key or hidden state and cites its source; every code: line read at 13e049a; all 21 figma: sources in this file read live and match word for word |  |
| 4 | required_tokens resolve in the built output | ✓ | all 22 names are defined in build/css/tokens.css at 13e049a, and the list equals the var(--…) set in ItemCard.css |  |
| 5 | All variants covered | ✓ | variant props in ItemCard.tsx: Layout (3), State (2); every value has a variant_intent entry; State=Default listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with all 25 intent files at 13e049a; no overlap |  |

## Warnings
- 5 dont_use_when entries name no alternative.

## Gate 7 commits
- None. No commit touches src/components/ItemCard since v0.2.0; only its export line was added.

Full SHA: 13e049a7c45c7747d085ea13682d63eeb7eb5db4
