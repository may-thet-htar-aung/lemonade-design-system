# Release review: Stat Card

Reviewed commit: 5a7e2b4 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, re-opened 27/10/2026 for this review (`StatCard` root element rendered with a non-zero box, no error display).
Figma node: 111:16.
Rules: `.claude/skills/release-review/SKILL.md` at 5a7e2b4, including the three clarifications from #91 (check 3 figma: sources, check 6 parent and sub-component, gate 3 font-family tokens).
Re-review: pinned to 5a7e2b4 for the 0.1.0 publish. src/components/, build/ and tokens/ are byte-identical to the previous review at 8d005aa (git diff 8d005aa 5a7e2b4 on those paths is empty); src/index.ts and src/styles.css changed in 7a25b07 (#96). Every gate and check was re-run at 5a7e2b4: Staging Testing rows re-read, Figma component set names, properties and every figma: source re-read (342 + 17 sources matched), Production Storybook re-opened.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/StatCard/StatCard.intent.json exists at 5a7e2b4; 3 listed gap(s); empty fields variant_intent, placement, pairs_with are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 23 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports StatCard, StatCardProps and nothing else from StatCard/ |  |
| 5 | Names final | ✓ | Figma node 111:16 is named "Stat Card"; component set name matches. Every prop that mirrors a Figma property matches it character for character; variant values all match; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 2 stories in StatCard.stories.tsx (one per matrix row); 2 linked Staging Testing rows, 2 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: E404), so 4 commit(s) from the start of history to 5a7e2b4 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | 8 entries; each names an element, role, attribute, key or hidden state and cites a code: line or a figma: node. Every figma: source was read in Figma and its text matches the entry word for word. No generic entry |  |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 5a7e2b4, and the list equals the var(--…) set in StatCard.css |  |
| 5 | All variants covered | ✓ | StatCard.tsx has no variant prop; variant_intent is empty and listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | use_when compared with the other 24 intent files at 5a7e2b4; no other component claims the same job |  |

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 822f57b Stat Card: bind padding to --padding-statcard (node 111:16)
- 195f20b Stat Card: label, value and delta on semantic tokens (node 111:16)

Full SHA: 5a7e2b4e64ad273826706fd2e619c05117b4e55b
