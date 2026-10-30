# Release review: Icon

Reviewed commit: 2d5f426 (full SHA in the footer)
Date: 30/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes, opened 30/10/2026 for this review (`components-icon--home`: `.icon.icon--lg` rendered 24 × 24 with its svg, no error display).
Figma node: 76:12 (Lemonade-Icons file).
Rules: `.claude/skills/release-review/SKILL.md` at 2d5f426.
Re-review: Icon only, for 0.2.0. It replaces the 5a7e2b4 review, which blocked on gates 4 and 5. Both now pass. The Figma changes that fixed gate 5 also rewrote four documentation notes the intent file cites, so the intent file no longer reads as Figma reads.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Icon/Icon.intent.json exists at 2d5f426; 3 listed gaps; empty field pairs_with is listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 30/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep on Icon.css returns nothing; all 6 var(--…) names are semantic, literal values in build/css/tokens.css:208-213; node scripts/verify-tokens.mjs: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports Icon, type IconName, type IconProps; ICON_NAMES is not exported; src/styles.css:1 imports Icon.css |  |
| 5 | Names final | ✓ | Figma 76:12 is a component set named "Icon". Properties: Name (variant), Size (variant), Label (text, internal key Label#123:0), matching the props in Icon.tsx character for character. The 33 Name values and 6 Size values match the code. Size default is lg in both |  |
| 6 | States complete | ✓ | 198 Figma variants (Name × Size), 198 stories, 198 linked Staging Testing rows; rollup reads only Passed, 0 rows have an empty result, none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | git log v0.1.0..2d5f426 -- src/components/Icon is empty. git diff v0.1.0 2d5f426 -- src/index.ts adds one export line: added, not breaking, forces a minor bump |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 9 entries, all specific and sourced, but 2 cite a Figma node that no longer states the note. a11y[4] cites figma:79:639, which now also says to leave Label empty. a11y[5] cites figma:79:642, which now says to set the Label property, where the entry puts the name on the control. See "Stale Figma sources" | Doc-generator, to rewrite the entries from Figma, then a new review |
| 4 | required_tokens resolve in the built output | ✓ | all 6 names are defined in build/css/tokens.css at 2d5f426, and the list equals the var(--…) set in Icon.css |  |
| 5 | All variants covered | ✓ | variant props in Icon.tsx: Name (33), Size (6); every value has a variant_intent entry, and each empty intent is listed in gaps. The Size lg intent is stale, see below |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with the other 24 intent files at 2d5f426; no other component claims the same job |  |

## Stale Figma sources

17 figma: sources were re-read in Figma; 13 match word for word and 4 do not. The component-intent skill requires these fields to read as Figma reads.

| Intent entry | Cites | Intent says | Figma now says |
|---|---|---|---|
| a11y[4] (fails check 3) | 79:639 | When a text label sits next to the icon, hide the icon from screen readers with aria-hidden="true". | When a text label sits next to the icon, leave Label empty and hide the icon from screen readers with aria-hidden="true". |
| a11y[5] (fails check 3) | 79:642 | An icon on its own needs an accessible name on its control, such as aria-label="Search". | An icon on its own needs an accessible name. Set the Label property; code uses it as aria-label, such as "Search". |
| use_when[2], and variant_intent Size lg | 81:385 | Use one of the documented sizes. 24 px is the default. | Pick the size with the Size property. lg (24) is the default. |
| dont_use_when[2] | 81:401 | Do not use sizes outside 16 to 48 px. | Do not resize an instance by hand. Switch Size instead. |

Fix: Doc-generator regenerates Icon.intent.json from the current Figma page; the change reaches main by pull request; Release reviews Icon again at that commit.

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits
- None touch src/components/Icon since v0.1.0.
- 2d5f426 src/index.ts: exports Icon, IconName and IconProps. Added, not breaking.

Full SHA: 2d5f426bd3e98cd1559b6895e82e1207cffdde8d
