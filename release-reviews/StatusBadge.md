# Release review: Status Badge

Reviewed commit: 7265eb2 (full SHA in the footer)
Date: 03/11/2026
Verdict: **Cleared**

Production Storybook opened and seen to render: yes, opened 03/11/2026 (`.status-badge` rendered at 28.6 x 24 px, no error display).
Figma node: 66:22, read 03/11/2026: 7 symbols (Lost, Found, Potential Match, Claim Pending, Verified, Returned, Rejected).
Re-review: patch release 0.3.2. Status Badge is the only component whose shipped code changed since v0.3.1 (git diff v0.3.1..7265eb2 touches only src/components/StatusBadge/StatusBadge.css, +2 lines). The other 24 components are Released and unchanged since v0.3.1.

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/StatusBadge/StatusBadge.intent.json exists at 7265eb2; 1 listed gap (pairs_with) | |
| 2 | Development status is Completed (Released for a patch re-review) | ✓ | Components.Development reads Released (read 03/11/2026) | |
| 3 | Tokens clean | ✓ | raw-value grep on StatusBadge.css returns nothing; the new `width: fit-content` is a keyword, not a raw value; all 30 var(--…) names are semantic; node scripts/verify-tokens.mjs: RESULT: PASS (8 checks) | |
| 4 | Public surface decided | ✓ | src/index.ts line 22 exports StatusBadge, StatusBadgeProps, StatusBadgeStatus and nothing else from StatusBadge/ | |
| 5 | Names final | ✓ | Figma node 66:22 is "Status Badge"; the 7 Status values match the 7 symbols; no New/Temp/WIP/v2 | |
| 6 | States complete | ✓ | 7 matrix stories (one per Status) plus example stories; 7 linked Staging Testing rows, 7 Passed, none Failed or Fixed (To re-test) | |
| 7 | Version meaning known | ✓ | Since v0.3.1: 01ff8dd "hug the label in column flex and grid parents", classified fixed, not breaking | |

## Checks
| # | Check | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Fields present | ✓ | all seven fields present as arrays (intent unchanged since the previous review) | |
| 2 | Every dont_use_when names an alternative | ⚠ | 4 of 5 entries name no alternative (warning) | Designer, warning only |
| 3 | a11y is specific, not generic | ✓ | intent file unchanged since 5a7e2b4, where every entry was verified against code: and figma: sources | |
| 4 | required_tokens resolve in the built output | ✓ | every --token used by StatusBadge.css is defined in build/css/tokens.css at 7265eb2 | |
| 5 | All variants covered | ✓ | Status (7 values) each has a variant_intent entry | |
| 6 | No two components claiming the same job | ✓ | use_when compared with the other 24 intent files; only Filter Chip mentions Lost/Found, as a different job (switching report types) | |

## Warnings
- dont_use_when entries 2 to 5 name no alternative.

## Gate 7 commits
- 01ff8dd StatusBadge: hug the label in column flex and grid parents (fixed, CSS only, not breaking)

Full SHA: 7265eb2703d2a2bd4bc9a19536eadacfd672c48e
