# Release review: Status Badge

Reviewed commit: 49746c6 (full SHA in the footer)
Date: 03/11/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, opened 03/11/2026 (`.status-badge` for Status=Lost rendered at 44.6 x 24 px with 8px inline padding, no error display). Figma node 66:22, read 03/11/2026: Status=Lost is 45 x 24, 7 symbols (Lost, Found, Potential Match, Claim Pending, Verified, Returned, Rejected).
Re-review: patch release 0.3.3. Status Badge is the only component whose shipped code changed since v0.3.2 (git diff v0.3.2..49746c6 touches only src/components/StatusBadge/StatusBadge.css, +6 -2 lines). The other 24 components are Released and unchanged since v0.3.2.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/StatusBadge/StatusBadge.intent.json exists at 49746c6; 1 listed gap (pairs_with) | |
| 2 | Development status is Completed (Released for a patch re-review) | ✓ | Components.Development reads Released (read 03/11/2026) | |
| 3 | Tokens clean | ✓ | raw-value grep on StatusBadge.css returns nothing but the font shorthand using var(--tagline-12-*) tokens; all 31 var(--…) names are defined in build/css/tokens.css; the new `--gap-component` is semantic (no token points at it; it points at base --spacing-sm) and the CSS comment records the binding as a design gap; node scripts/verify-tokens.mjs: RESULT: PASS (8 checks) | |
| 4 | Public surface decided | ✓ | src/index.ts exports StatusBadge, StatusBadgeProps, StatusBadgeStatus and nothing else from StatusBadge/ (unchanged since v0.3.2) | |
| 5 | Names final | ✓ | Figma node 66:22 is "Status Badge"; the 7 Status values match the 7 symbols; no New/Temp/WIP/v2 | |
| 6 | States complete | ✓ | 7 matrix stories (one per Status) plus an example story; 7 linked Staging Testing rows, 7 Passed, none Failed or Fixed (To re-test); QA re-test of bc845cd passed 7/7 | |
| 7 | Version meaning known | ✓ | Since v0.3.2: bc845cd "add 8px inline padding to match the Figma node", classified fixed, not breaking | |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays (intent file unchanged since v0.3.2) | |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 of 5 entries name no alternative (warning) | Designer, warning only |
| 3 | a11y is specific, not generic | ✓ | intent file unchanged since the previous review, where every entry was verified against code: and figma: sources | |
| 4 | required_tokens resolve in the built output | ✓ | all 30 listed names are defined in build/css/tokens.css at 49746c6 | |
| 5 | All variants covered | ✓ | Status (7 values) each has a variant_intent entry | |
| 6 | No two components claiming the same job | ✓ | unchanged since the previous review; only Filter Chip mentions Lost/Found, as a different job | |

## Warnings
- dont_use_when entries 2 to 5 name no alternative.
- required_tokens does not list `--gap-component`, which StatusBadge.css now uses for padding-inline. Check 4 passes (it tests only the listed names). Doc-generator may add it at the next intent refresh; not a blocker.
- Design gap, Designer: padding-inline is bound to base token spacing/sm in the node; `--gap-component` is a stand-in until a semantic padding token is bound.

## Gate 7 commits
- bc845cd StatusBadge: add 8px inline padding to match the Figma node (fixed, CSS only, not breaking)

Full SHA: 49746c6ed656f69caf9bdf973b6026df6eaf4443
