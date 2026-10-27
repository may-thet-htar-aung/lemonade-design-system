# Release review: Logo

Reviewed commit: 8d005aa (full SHA in the footer)
Date: 27/10/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes (`Logo` root element rendered, no error display).
Figma node: 23:1348.
Rules: `.claude/skills/release-review/SKILL.md` at 8d005aa, including the three clarifications from #91 (check 3 figma: sources, check 6 parent and sub-component, gate 3 font-family tokens).

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Logo/Logo.intent.json exists at 8d005aa; 2 listed gap(s); empty fields pairs_with are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing (font-family: var(--token) lines excluded per the skill); all 31 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports Logo, LogoProps, LogoSize, LogoTheme and nothing else from Logo/ |  |
| 5 | Names final | ✓ | Figma node 23:1348 is named "Logo"; component set name matches. Every prop that mirrors a Figma property matches it character for character; variant values all match; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 12 stories in Logo.stories.tsx (one per matrix row); 12 linked Staging Testing rows, 12 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: E404), so 5 commit(s) from the start of history to 8d005aa were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✓ | 6 entries; each names an element, role, attribute, key or hidden state and cites a code: line or a figma: node. Every figma: source was read in Figma and its text matches the entry word for word. No generic entry |  |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 8d005aa, and the list equals the var(--…) set in Logo.css |  |
| 5 | All variants covered | ✓ | variant props in Logo.tsx: Theme (4), Size (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | Logo and Logo/Symbol both carry "Use Logo/Symbol on its own for the app icon and favicon." Exempt: Logo/Symbol is a sub-component of Logo (the Logo set holds Logo/Symbol instances, and both sets live on the Logo page). No other overlap |  |

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 5af0ece Logo: bind the "Found" weight to --fontweight-wordmark-found (node 23:1348)
- cdd2e3a Logo: bind mark sizes, Large gap, plate padding and ExtraBold weight (node 23:1348)
- d5ea6a6 Logo: Theme x Size with tokenised mark and wordmark (node 23:1348)

Full SHA: 8d005aaeffa9d3a15f8eed36edb28bba24bec5f1
