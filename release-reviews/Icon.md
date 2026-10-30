# Release review: Icon

Reviewed commit: cf362ff (full SHA in the footer)
Date: 30/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, opened 30/10/2026 for this review (`components-icon--home`: `.icon.icon--lg` rendered 24 × 24 with its svg, no error display).
Figma node: 76:12 (Lemonade-Icons file).
Rules: `.claude/skills/release-review/SKILL.md` at cf362ff.
Re-review: Icon only, for 0.2.0. It replaces the 2d5f426 review, which blocked on check 3 because Figma notes 79:639 and 79:642 had been reworded. 78c96f0 updated five intent entries to match Figma. The other 24 components keep their verdicts.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Icon/Icon.intent.json exists at cf362ff; 3 listed gaps; empty field pairs_with is listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 30/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep on Icon.css returns nothing; all 6 var(--…) names are semantic, literal values in build/css/tokens.css:208-213; node scripts/verify-tokens.mjs: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts:6 exports Icon, type IconName, type IconProps; ICON_NAMES is not exported; src/styles.css:1 imports Icon.css |  |
| 5 | Names final | ✓ | Figma 76:12 read live: component set named "Icon". Properties: Name (variant), Size (variant), Label (text, internal key Label#123:0), matching the props in Icon.tsx character for character. The 33 Name values and 6 Size values match the code. Size default is lg in both |  |
| 6 | States complete | ✓ | 198 Figma variants (Name × Size), 198 stories, 198 linked Staging Testing rows; rollup reads only Passed, 0 rows have an empty result, none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | git log v0.1.0..cf362ff -- src/components/Icon has one commit, classified below. git diff v0.1.0 cf362ff -- src/index.ts adds one export line: added, not breaking, forces a minor bump |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays: use_when 5, dont_use_when 5, variant_intent 39, placement 11, pairs_with 0, required_tokens 6, a11y 9 |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | 9 entries, each states an element, role, attribute or hidden state and cites a source. 4 cite code lines, confirmed at Icon.tsx:71-76. 5 cite Figma, re-read live and identical to the node text, including 79:639 and 79:642, which failed last time |  |
| 4 | required_tokens resolve in the built output | ✓ | all 6 names are defined in build/css/tokens.css at cf362ff, and the list equals the var(--…) set in Icon.css |  |
| 5 | All variants covered | ✓ | variant props in Icon.tsx: Name (33), Size (6); all 39 values have a variant_intent entry; the 38 empty intents are all listed in gaps; Size lg is filled and matches 81:385 |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with the other 24 intent files at cf362ff; no other component claims the same job. A word-overlap pass raised Button (Icon Left) and Link Button, which describe a button's icon and a table-row action, not the same job |  |

## Figma sources

All 17 figma: sources in the intent file were re-read live for this review. 17 match word for word, 0 do not. The four notes listed as stale in the 2d5f426 review (79:639, 79:642, 81:385, 81:401) now read the same in Figma and in the intent file.

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits
- 78c96f0 src/components/Icon/Icon.intent.json: five entries reworded to match Figma. Changed, documentation only, not in the package, not breaking.
- 17bc754 src/index.ts: exports Icon, IconName and IconProps. Added, not breaking.

Full SHA: cf362ff20d78d269af7c67867acaaadd4f735ec7
