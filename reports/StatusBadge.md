# StatusBadge QA report

Re-test round, 03/11/2026. Figma node 66:22 (get_metadata, get_design_context, get_variable_defs). Build under test: bc845cd (PR 158) on staging https://lemonade-design-system-git-staging-htar1.vercel.app. Stories loaded as `iframe.html?id=components-status-badge--<id>&viewMode=story`.

Wake check: Development read `Fixed`; all 7 test rows read `Fixed (To re-test)`. Matches the re-test trigger. No half-written rows found (7 rows, all linked; earlier Expected Results and Suggestion text was stale from the previous run and was rewritten).

Result: 7 cases, Passed 7, Failed 0. Whole matrix re-tested.

## Environment checks
- Fonts: label resolves to Manrope, weight 600 (the only weight used). Canvas probe real 345.32 vs bogus 343.08 (differ). `document.fonts` holds a Manrope 600 face with `status: loaded`.
- Mode on both sides: Figma node default (light), browser `data-semantic`, `data-typography`, `data-layout`, `data-density` all default.
- Test pane runs at devicePixelRatio 1.25, so `--border-width-1` (token reads 1px) is snapped to 0.8px by the browser. Renderer, not component. It accounts for 0.4px of every width shortfall.

## Expected matrix (node 66:22, 7 variants, Dot off, no size or interaction states) and results

| Case | Node w x h | Staging w x h | padding-inline | Verdict |
|---|---|---|---|---|
| Lost (66:4) | 45 x 24 | 44.61 x 24 | 8px | Passed |
| Found (66:7) | 56 x 24 | 55.42 x 24 | 8px | Passed |
| Potential Match (66:10) | 116 x 24 | 115.65 x 24 | 8px | Passed |
| Claim Pending (66:13) | 106 x 24 | 105.91 x 24 | 8px | Passed |
| Verified (66:16) | 66 x 24 | 65.66 x 24 | 8px | Passed |
| Returned (66:19) | 76 x 24 | 75.41 x 24 | 8px | Passed |
| Rejected (68:4) | 73 x 24 | 73.09 x 24 | 8px | Passed |

Every case: padding 2px 8px (`--spacing-2xs` block, `--gap-component` inline), gap 4px (`--gap-element`), height 24 (`--size-badge-height`), radius `--border-radius-circle`, label Manrope 12/600/16 with 0.5px tracking (Tagline/12), `display: inline-flex`, `width: fit-content`. Hug verified: width = label width + 2 x padding-inline + borders on all 7. Fill, border and label colours equal the bound status tokens for each variant (hex from get_variable_defs converted to rgb, matched exactly; Found uses brandyellow-light, verifying-border, text-accent), light mode on both sides.

## Design gaps (for the Designer, not the Engineer)
1. `padding-inline` binds `spacing/sm` (8px) in node 66:22, a base token with no semantic padding token. `StatusBadge.css` uses `--gap-component` (8px) as a stand-in. Value matches. Designer must bind a semantic padding token, then the stand-in can be swapped.
2. Dot is 6 x 6 in the node with no size token bound. Dot is off in all 7 variants and was not tested.

## Reconcile with stories
7 node variants, 7 stories. No missing case. One extra story, "Example: next to an item name", is a usage example, not a matrix row; reported, not added.

## Findings
None.

## Screenshots
reports/StatusBadge/lost.png, found.png, potential-match.png, claim-pending.png, verified.png, returned.png, rejected.png (headless Edge, staging iframe, DPR 2). Not attached to the Airtable rows: the registry tool cannot upload local files, so each row's Context names its file. Node renders not saved.
