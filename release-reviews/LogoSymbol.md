# Release review: Logo/Symbol

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`LogoSymbol` root element rendered, no error display).
Figma node: 23:1470.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/LogoSymbol/LogoSymbol.intent.json exists at 162af96; 6 listed gaps; empty fields dont_use_when, pairs_with are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 8 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports LogoSymbol, LogoSymbolColor, LogoSymbolProps, LogoSymbolSize |  |
| 5 | Names final | ✓ | Figma node 23:1470 is named "Logo/Symbol"; component set name matches. Every prop name and variant value matches its Figma property character for character; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 9 stories in LogoSymbol.stories.tsx (one per matrix row); 9 linked Staging Testing rows, 9 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 4 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ✓ | dont_use_when is empty (listed in gaps), so no entry lacks an alternative |  |
| 3 | a11y is specific, not generic | ✓ | all 3 entries cite a code: line and state a specific fact |  |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in LogoSymbol.css |  |
| 5 | All variants covered | ✓ | variant props in LogoSymbol.tsx: Color (3), Size (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✗ | Logo and Logo/Symbol: both use_when lists carry "Use Logo/Symbol on its own for the app icon and favicon." | Designer |

## Warnings
- None.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 51f46f3 Logo/Symbol: bind sizes to --size-logosymbol-sm/md/lg (node 23:1470)
- c404d69 Logo/Symbol: LF letter-mark with Color and Size props (node 23:1470)

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
