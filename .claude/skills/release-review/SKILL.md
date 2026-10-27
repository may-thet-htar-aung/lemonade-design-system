---
name: release-review
description: Review one component for release at one pinned commit — 7 gates, then 6 checks — and record a Cleared or Blocked verdict with a committed report. Every failure is reported in a single pass with the agent who owns the fix. Never edits an intent file, never fixes what it finds, never publishes.
---

# Release review

A release review decides whether one component is fit to ship under the design system's name. It runs **7 gates** and **6 checks** against the repo at **one pinned commit**, writes a report, and gives a verdict: `Cleared` or `Blocked`.

Use this for each component the Release agent lists as `Completed`. Every component in one release is reviewed at the same commit. Do not use it to review a page, a token change or a whole release's packaging; Track A in `.claude/agents/release.md` covers the package.

## The rule about findings

**Report it, never fix it.** A review that repairs what it finds has reviewed its own work. If an intent field is wrong, the token is raw or a story is missing, write it down with the agent who owns the fix and move on to the next gate. Never stop at the first failure: one pass reports every failure, so the owners get one list, not a drip.

---

## Pin the commit

Before any gate, record the commit you are reviewing: `git rev-parse HEAD` on the branch the release is built from. Read every file at that commit (`git show <sha>:<path>`), not from a working tree that may move. Every report in this release names the same SHA.

## The 7 gates

A gate is pass or fail. Any failed gate blocks.

| # | Gate | Passes when | Read | Owner of a fail |
|---|---|---|---|---|
| 1 | **Intent written** | `src/components/<Name>/<Name>.intent.json` exists at the commit, and every empty field is listed in its `gaps` | the intent file | Doc-generator, or the Designer when the gap is missing Figma usage |
| 2 | **Development status is `Completed`** | `Components.Development` reads `Completed` when you start and when you write the verdict | the registry, by plain list | whoever owns the evidence the formula is missing (see the `registry` skill) |
| 3 | **Tokens clean** | `<Name>.css` has no raw values (the grep in the `build` skill, stage 3, returns nothing), every `var(--…)` is a semantic token, and `node scripts/verify-tokens.mjs` ends `RESULT: PASS` | `<Name>.css`, `build/css/tokens.css` | Engineer; token-runner for a verify failure |
| 4 | **Public surface decided** | The component and its prop types are exported from `src/index.ts`, and nothing else from its folder is | `src/index.ts` | Engineer |
| 5 | **Names final** | The component name matches its Figma component set, every prop name matches its Figma property character for character, and no name carries `New`, `Temp`, `WIP`, `v2` or similar | the `.tsx`, the Figma node | Engineer for code names, Designer for Figma names |
| 6 | **States complete** | Every variant-matrix row has a story, every row has a linked Staging Testing row reading `Passed`, and none reads `Failed` or `Fixed (To re-test)` | the stories, `Staging Testing` | Engineer to fix, QA to re-test |
| 7 | **Version meaning known** | Every commit touching the component since the last `v*` tag is classified as added, changed, fixed, deprecated or removed, and as breaking or not, so the version bump it forces is clear | `git log <last tag>..<sha> -- src/components/<Name>` | Release (you), or a human when a commit cannot be classified from its diff |

Gate 2 is read from the registry. Every other gate is read from the repo at the pinned commit.

## The 6 checks

Checks look inside the intent file. They run even when a gate failed, so the report is complete.

| # | Check | Passes when | Severity |
|---|---|---|---|
| 1 | **Fields present** | All seven fields (`use_when`, `dont_use_when`, `variant_intent`, `placement`, `pairs_with`, `required_tokens`, `a11y`) exist, with the types the `component-intent` skill gives | blocks |
| 2 | **Every `dont_use_when` names an alternative** | Each entry has an `alternative` that is a component in the registry | **warning, never a blocker** |
| 3 | **`a11y` is specific, not generic** | Each entry states an element, role, attribute, key or hidden state, and cites a `code:` line. "Accessible", "WCAG compliant", "screen reader friendly" or any entry with no line fails | blocks |
| 4 | **`required_tokens` resolve in the built output** | Every name is defined in `build/css/tokens.css` at the commit | blocks |
| 5 | **All variants covered** | `variant_intent` has an entry for every value of every variant prop in the `.tsx`, and every entry's `intent` is filled or listed in `gaps` | blocks |
| 6 | **No two components claiming the same job** | No other component's `use_when` describes the same job. Compare this file with every other intent file at the commit; name both components when two overlap | blocks, and the owner is the Designer |

A check that cannot run (no intent file, unreadable JSON) is a fail with that reason, not a skip.

## The verdict

- **`Cleared`**: all 7 gates pass, and checks 1 and 3 to 6 pass. Check 2 warnings are listed but do not block.
- **`Blocked`**: anything else. The report names every failing gate and check and the agent who owns each fix.

## The report

Write `release-reviews/<Component>.md` and commit it on `release-review/<name>`:

```markdown
# Release review: Button

Reviewed commit: a1b2c3d (full SHA in the footer)
Date: 26/10/2026
Verdict: **Blocked**

## Gates
| # | Gate | Result | Evidence | Owner |
|---|---|---|---|---|
| 1 | Intent written | ✓ | src/components/Button/Button.intent.json, 1 listed gap | |
| 6 | States complete | ✗ | Staging Testing row "Ghost / Disabled" reads Failed | Engineer, then QA |
...

## Checks
| # | Check | Result | Evidence | Owner |
...

## Warnings
- dont_use_when[1] names no alternative.

Full SHA: a1b2c3d4e5f6…
```

One row for every gate and every check, passed or not, each with the evidence you read: a path and line, a registry value, a command's last line. Then write `Release Review` (the report's permalink, by the SHA of the commit that adds it, never a branch URL) and `Release Verdict` in the same registry update.

## Check (must be green before you write the verdict)

- [ ] One SHA was pinned before the first gate, and every file was read at it.
- [ ] Every gate and every check has a row with evidence, including the ones that passed.
- [ ] Every failure names the agent who owns the fix.
- [ ] Development still reads `Completed`.
- [ ] The report is committed and pushed, and the permalink you are writing contains that commit's SHA.
- [ ] You changed no file but the report.

## What you report when done

```
Review   Button @ a1b2c3d · gates 6/7 · checks 5/6 (1 warning) · Blocked
Fails    gate 6 States complete → Engineer (Ghost/Disabled Failed), then QA
Report   release-reviews/Button.md @ 9f8e7d6 · Release Review + Verdict written
```

## Never

- **Never edit an intent file,** even to fix a typo. The Doc-generator writes it.
- **Never fix what you find,** in code, tokens, stories, intent or Figma. Name the owner.
- **Never stop at the first failure.** Every gate and every check runs.
- **Never review at more than one commit** within one release, or read from a moving working tree.
- **Never let a check 2 warning block,** and never let any other failure pass as a warning.
- **Never write a verdict without the committed report,** or the report link without the verdict.
- **Never publish, version, tag or deploy.**
