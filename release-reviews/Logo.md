# Release review: Logo

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`Logo` root element rendered, no error display).
Figma node: 23:1348.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Logo/Logo.intent.json exists at 162af96; 2 listed gaps; empty fields pairs_with are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 31 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports Logo, LogoProps, LogoSize, LogoTheme |  |
| 5 | Names final | ✓ | Figma node 23:1348 is named "Logo"; component set name matches. Every prop name and variant value matches its Figma property character for character; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 12 stories in Logo.stories.tsx (one per matrix row); 12 linked Staging Testing rows, 12 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 5 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 4 of 6 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[2] (figma:23:1217), a11y[3] (figma:23:1220), a11y[4] (figma:23:1223), a11y[5] (figma:23:1226) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in Logo.css |  |
| 5 | All variants covered | ✓ | variant props in Logo.tsx: Theme (4), Size (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✗ | Logo and Logo/Symbol: both use_when lists carry "Use Logo/Symbol on its own for the app icon and favicon." | Designer |

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

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
