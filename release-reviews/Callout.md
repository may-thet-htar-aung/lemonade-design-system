# Release review: Callout

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`Callout` root element rendered, no error display).
Figma node: 109:69.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Callout/Callout.intent.json exists at 162af96; 0 listed gaps; no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 20 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports Callout, CalloutProps, CalloutType |  |
| 5 | Names final | ✗ | Figma node 109:69 is named "Callout"; component set name matches. Prop names differ from the Figma property names: Show body → ShowBody. The repo already uses quoted names elsewhere (IconButton 'Show badge', ItemCard 'Show status', StatCard 'Show delta'). Props with no Figma property: Title, Body. Variant values all match. | Engineer (prop names); Designer to expose or Engineer to drop the props with no Figma property |
| 6 | States complete | ✓ | 2 stories in Callout.stories.tsx (one per matrix row); 2 linked Staging Testing rows, 2 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 4 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 5 of 7 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[2] (figma:129:421), a11y[3] (figma:129:424), a11y[4] (figma:129:427), a11y[5] (figma:129:430), a11y[6] (figma:129:433) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in Callout.css |  |
| 5 | All variants covered | ✓ | variant props in Callout.tsx: Type (2); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | no other intent file at the commit has a use_when describing the same job |  |

## Warnings
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- ed370e6 Callout: padding from --padding-card, replacing the unset gap (node 109:69)
- e006d21 Callout: Privacy and AI Match types (node 109:69)

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
