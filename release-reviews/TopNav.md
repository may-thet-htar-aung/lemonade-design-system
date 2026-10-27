# Release review: Top Nav

Reviewed commit: 8d005aa (full SHA in the footer)
Date: 27/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes (`TopNav` root element rendered, no error display).
Figma node: 161:415.
Rules: `.claude/skills/release-review/SKILL.md` at 8d005aa, including the three clarifications from #91 (check 3 figma: sources, check 6 parent and sub-component, gate 3 font-family tokens).

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/TopNav/TopNav.intent.json exists at 8d005aa; 1 listed gap(s); empty fields placement are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 9 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports TopNav, TopNavPage, TopNavProps and nothing else from TopNav/ |  |
| 5 | Names final | ✓ | Figma node 161:415 is named "Top Nav"; component set name matches. Every prop that mirrors a Figma property matches it character for character; variant values all match; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 4 stories in TopNav.stories.tsx (one per matrix row); 4 linked Staging Testing rows, 4 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: E404), so 4 commit(s) from the start of history to 8d005aa were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 3 entries without an alternative (warning); alternative "Tab Bar or Sidebar" names two components, not one registry row (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | 9 entries; each names an element, role, attribute, key or hidden state and cites a code: line or a figma: node. Every figma: source was read in Figma and its text matches the entry word for word. No generic entry |  |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 8d005aa, and the list equals the var(--…) set in TopNav.css |  |
| 5 | All variants covered | ✓ | variant props in TopNav.tsx: Page (4); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | Shares "Set a link to Hover through its nested Top Nav Link." with Top Nav Link, which it renders (TopNav.tsx imports TopNavLink; both on the Top Nav page): exempt. No other overlap |  |

## Warnings
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.
- an alternative reads "Tab Bar or Sidebar", two components in one value.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- d86f055 Top Nav: bind height, block padding and gaps to the new topnav tokens (node 161:415)
- 253aebc Top Nav: header with Logo, Top Nav Links and Buttons, Page = Home|Browse|Report|Track (node 161:415)

Full SHA: 8d005aaeffa9d3a15f8eed36edb28bba24bec5f1
