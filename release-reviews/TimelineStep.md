# Release review: Timeline Step

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`TimelineStep` root element rendered, no error display).
Figma node: 110:34.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/TimelineStep/TimelineStep.intent.json exists at 162af96; 0 listed gaps; no empty field |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✓ | stage-3 grep returns nothing; all 30 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) |  |
| 4 | Public surface decided | ✓ | src/index.ts exports TimelineStep, TimelineStepProps |  |
| 5 | Names final | ✗ | Figma node 110:34 is named "Timeline Step"; component set name matches. Prop names differ from the Figma property names: Show line → ShowLine. The repo already uses quoted names elsewhere (IconButton 'Show badge', ItemCard 'Show status', StatCard 'Show delta'). Variant values all match. | Engineer (prop names) |
| 6 | States complete | ✓ | 4 stories in TimelineStep.stories.tsx (one per matrix row); 4 linked Staging Testing rows, 4 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 5 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 5 of 10 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[5] (figma:135:352), a11y[6] (figma:135:355), a11y[7] (figma:135:358), a11y[8] (figma:135:361), a11y[9] (figma:135:364) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in TimelineStep.css |  |
| 5 | All variants covered | ✓ | variant props in TimelineStep.tsx: State (4), Done (3); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | no other intent file at the commit has a use_when describing the same job |  |

## Warnings
- dont_use_when[0] names no alternative.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 89a8c96 Timeline Step: Event keeps 24 dot frame with centred 10 dot inside (node 132:7)
- 770a714 Timeline Step: apply dot, line, min height and text padding bindings (node 110:34)
- d19651c Timeline Step: 4 states (node 110:34)

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
