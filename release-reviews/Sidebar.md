# Release review: Sidebar

Reviewed commit: 162af96 (full SHA in the footer)
Date: 27/10/2026
Verdict: **Blocked**

Production Storybook opened and seen to render: yes (`Sidebar` root element rendered, no error display).
Figma node: 163:295.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Sidebar/Sidebar.intent.json exists at 162af96; 2 listed gaps; empty fields placement are listed in gaps |  |
| 2 | Development status is Completed | ✓ | Components.Development reads Completed (read 27/10/2026 at start and again before the write) |  |
| 3 | Tokens clean | ✗ | stage-3 grep returns 3 line(s): Sidebar.css:156 font-family: var(--tagline-14-font-family);; Sidebar.css:185 font-family: var(--tagline-14-font-family);; Sidebar.css:197 font-family: var(--body3-font-family);; all 35 var(--…) names are semantic; node scripts/verify-tokens.mjs at the pinned tree: RESULT: PASS (8 checks) | Engineer |
| 4 | Public surface decided | ✓ | src/index.ts exports Sidebar, SidebarActive, SidebarCollapsed, SidebarProps |  |
| 5 | Names final | ✓ | Figma node 163:295 is named "Sidebar"; component set name matches. Every prop name and variant value matches its Figma property character for character; no New/Temp/WIP/v2 names. |  |
| 6 | States complete | ✓ | 12 stories in Sidebar.stories.tsx (one per matrix row); 12 linked Staging Testing rows, 12 Passed; none Failed or Fixed (To re-test) |  |
| 7 | Version meaning known | ✓ | No v* tag exists and the package was never published (npm view: 404), so 4 commit(s) from the start of history to 162af96 were read. All are classified "added", none breaking. There is no prior public API to change. |  |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays |  |
| 2 | Every dont_use_when names an alternative | ⚠ | 5 entries without an alternative (warning) | Designer (Figma names none), warning only |
| 3 | a11y is specific, not generic | ✗ | 5 of 10 entries cite no code: line (Figma-sourced guidance, not a fact tied to a line): a11y[5] (figma:206:1175), a11y[6] (figma:206:1178), a11y[7] (figma:206:1181), a11y[8] (figma:206:1184), a11y[9] (figma:206:1187) | Doc-generator |
| 4 | required_tokens resolve in the built output | ✓ | all listed names are defined in build/css/tokens.css at 162af96, and the list equals the var(--…) set in Sidebar.css |  |
| 5 | All variants covered | ✓ | variant props in Sidebar.tsx: Collapsed (2), Active (6); every value has a variant_intent entry, and each empty intent is listed in gaps |  |
| 6 | No two components claiming the same job | ✓ | no other intent file at the commit has a use_when describing the same job |  |

## Warnings
- dont_use_when[0] names "Tab Bar or Top Nav", not a registry component.
- dont_use_when[1] names no alternative.
- dont_use_when[2] names no alternative.
- dont_use_when[3] names no alternative.
- dont_use_when[4] names no alternative.

## Gate 7 commits (all "added", none breaking)
- 23732d3 Add intent files for the 25 Completed components
- ff2d000 Make the repo a publishable npm package
- 807bb8f Sidebar: bind size, padding, gaps and divider to the new sidebar tokens (node 163:295)
- 6b57ef5 Sidebar: nav with collapse toggle, built from node 163:295

Full SHA: 162af966d1987a75a841c1d2695587000be9ec84
