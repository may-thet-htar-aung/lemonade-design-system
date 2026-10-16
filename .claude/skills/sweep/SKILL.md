---
name: sweep
description: The registry audit procedure. Read every row of every table, reconcile each status against the evidence underneath it, open every link, hunt contradictions between rows, tests and the repo, and write one report in a fixed order. Read-only on the registry. Used by the PM.
---

# Sweep: auditing the registry

A sweep answers one question: **does the registry tell the truth?** A status is a claim. The cells underneath it are the evidence, and the links in those cells are evidence only if they still open. A sweep checks all three, on every row, and writes down every place they disagree.

A sweep reads. It never writes to the registry, never fixes what it finds, and never decides what a finding means. It reports each finding to the owner of the column, as named in `.claude/skills/registry/SKILL.md`.

Every stage ends with a check. A sweep with a red check is not finished, and its report is not written.

---

## 1 · Prepare

1. Read `.claude/skills/registry/SKILL.md`: the owner table, the Development formula, and the flags. Resolve every ID through `.claude/registry.local.json`.
2. Read the previous report, `reports/registry-audit.md`, if it exists. Keep it in memory. Stage 6 compares against it, and you will overwrite the file.
3. Note the time the sweep started. Everything you report describes the registry at that moment.

**Check:** you hold the owner table, the formula order, and the previous report (or know there is none).

## 2 · Read every row

Read every table: Components, Staging Testing, GitHub Commits, DS Feedback and One-Off Components.

- **No view, no filter, no formula filter, no sort that drops rows.** Use a plain list of the table with every field requested. A saved view can hide exactly the rows that disagree, and a status filter only shows rows that already admit their status.
- **Follow pagination to the end.** Keep requesting with the returned offset until there is none. A first page is not a table.
- **Request every field.** An empty cell omitted from a response is still a cell. Treat a missing field as empty, never as "not checked".
- Keep each row's record ID. Every finding cites it.

**Check:** for each table, the number of rows you hold equals the number of rows the base reports, and you followed every page.

## 3 · Reconcile every status against its evidence

`Development` is derived, but a derived value can still disagree with what is underneath it. A rollup may lag, a formula may be edited, or a display may show a default (registry Flag 18). So you recompute it.

For every Components row, compute the status yourself from the **raw cells and the test rows you read in stage 2**. Do not use the rollup, the counts or `Synchronization %`. Use the registry skill's order: the first match wins.

```
tests   = Staging Testing rows whose Composed In links to this row
failed  = any test row with Testing Results = "Failed"
retest  = any test row with Testing Results = "Fixed (To re-test)"

1  failed and retest                                      → Fixing
2  failed                                                 → To be fixed
3  retest                                                 → Fixed
4  Design = "To be fixed"                                 → To be fixed
5  Astro Link and Release Review and Verdict = "Cleared"  → Released
6  Production Storybook                                   → Completed
7  any test row with a non-empty Testing Results          → To be deployed
8  Staging Storybook                                      → Ready for Testing
9  Figma and Design = "Done"                              → To-do
10 otherwise                                              → (blank)
```

Then compare three things for each row:

| Compare | A mismatch means | Owner of the finding |
|---|---|---|
| Your computed status vs the displayed `Development` | The formula, the rollup or the display is not saying what the evidence says | Base maintainer (human) |
| Your computed status vs **what the status is meant to mean** | The formula is satisfied but the evidence does not support it, for example `To be deployed` while some rows have an empty result or the matrix is incomplete (registry Flag 6) | Owner of the missing evidence |
| The rollups and counts vs the test rows | `Staging Testing Results Summary`, `Total Staging Tests`, `Staging Passed Count` or `Synchronization %` disagree with the rows they summarise (registry Flag 5) | Base maintainer (human) |

**Rows that look finished get the same treatment.** `Completed` and `Released` rows are reconciled cell by cell like any other, and so is every link they rest on in stage 4.

**Check:** every Components row has a computed status written beside its displayed one, and every disagreement is a finding.

## 4 · Open every link

Every URL in the registry is a claim that something exists. Open each one. Counting non-empty cells is not checking them.

| Column | Opened how | Good only when |
|---|---|---|
| `Figma` (Components, One-Off Components) | Figma connection, `get_metadata` on the node | The node exists and is the component the row names |
| `Staging Storybook`, `Production Storybook` | Browser, the story's iframe URL | The story renders this component. Storybook answers 200 even for a story that does not exist, so look at what renders |
| `Astro Link` | Browser | The page renders and documents this component |
| `Commit`, GitHub `Commit URL` | Browser or `git cat-file -e <sha>` | The commit exists |
| `Release Review` | Browser | It opens the report, and the URL pins a commit SHA, not a branch |
| DS Feedback `Attachment` | Browser | It opens |

Record every link as one of:
- **good**: it opened and showed what the column claims.
- **dead**: an error, a 404, an empty Storybook, or a page for the wrong component.
- **unreachable**: an auth wall, a missing connection, or a timeout. Say exactly which, and who can grant access. This is never good, and never silently dead.

Do not sample, reuse last sweep's results, or treat a well-formed URL as an open one.

**Check:** the number of links opened equals the number of non-empty URL cells, and every one has a recorded result.

## 5 · Hunt contradictions

A contradiction is a set of cells, rows or files that cannot all be true at once. Check every row, finished or not.

**A row whose status disagrees with its own evidence:**
- Stage 3 mismatches.
- `Development` reads `To-do`, but `Figma` is empty or `Design` is not `Done`.
- `Staging Storybook` is set but `Commit` is empty, or the reverse.
- `Production Storybook` is set while a linked test row is `Failed`, `Fixed (To re-test)` or empty.
- `Release Verdict` is set without `Release Review`, or the reverse.
- `Astro Link` is set while `Release Verdict` is not `Cleared`, or while `Production Storybook` is empty.
- A status that rests on a link stage 4 found dead or unreachable, for example `Released` with a dead `Astro Link`.

**A test row linked to nothing, or linked wrongly:**
- A Staging Testing row with no `Composed In` link. It feeds no status, so its failure is invisible.
- A test row linked to more than one component.
- A test row with more than one `Size` or `State`, or with an empty `Testing Results`.
- A test row at `Fixed (To re-test)` while its component reads anything but `Fixed` or `Fixing`.

**The repo and the registry disagreeing:**
- A folder in `src/components/<Name>/` with no Components row named `<Name>`.
- A Components row with a `Staging Storybook`, `Production Storybook` or `Commit` and no folder in `src/components/`.
- A row's `Commit` that does not touch that row's component folder.

Names must match exactly. `Btn` is not `Button`, and the mismatch is the finding.

**Check:** every Components row and every Staging Testing row went through every check above, and every `src/components/` folder was matched in both directions.

## 6 · Write the report

Overwrite `reports/registry-audit.md`. The sections appear in this order, every time. A section with nothing in it still appears, reading **None**, so an empty section is visibly empty rather than missing.

```markdown
# Registry audit · <sweep start time>
Rows read: Components <n> · Staging Testing <n> · GitHub Commits <n> · DS Feedback <n> · One-Off Components <n>
Links opened: <n> · good <n> · dead <n> · unreachable <n>

## 1. What changed since the last sweep
<compared with the previous report: rows whose status moved (from → to), new and resolved
contradictions, new and recovered dead links, rows added or removed. "First sweep" if there was none.>

## 2. Status counts
### <Status> · <n>
- <component> (<record id>)
<one block per Development value, including blank. Every count lists its rows, and the rows add up to the count.>

## 3. Waiting on
### <Owner>
- <component> (<record id>): <what they are waiting to do, and since when if known>
<one block per owner: Designer, Engineer, QA, DevOps, Release, Doc-generator, a human for Blocked verdicts.>

## 4. Contradictions
- <component> (<record id>) · <columns involved> · <what cannot all be true> · owner: <owner>

## 5. Dead links
- <component> (<record id>) · <column> · <URL> · <what happened when opened> · owner: <owner>
<unreachable links are listed here too, marked unreachable, with who can grant access.>
```

Who is waiting on what follows the registry contract:

| Row state | Waiting on |
|---|---|
| `Figma` empty, or `Design` not `Done` | Designer |
| `To-do`, `To be fixed`, `Fixing` | Engineer |
| `Ready for Testing`, `Fixed` | QA |
| `To be deployed` | DevOps |
| `Completed`, `Release Verdict` empty | Release |
| `Completed`, `Cleared`, `Astro Link` empty | Doc-generator, then DevOps |
| `Completed`, `Blocked` | A human. No status wakes anyone |
| `Released` | Nobody. Still audited in full |

**Every finding names exactly one owner** from the registry skill's owner table. A human-owned column goes to its human role, and an agent-owned column goes to that agent. A computed column goes to the owner of the evidence underneath it. An UNASSIGNED column goes to "no owner: a human must assign one". A fault in a formula or a description goes to the base maintainer.

**Check:**
- [ ] The five sections are in order, and none is missing.
- [ ] Every count lists its rows, and the rows add up to the count.
- [ ] Every finding names exactly one owner, with human and agent columns never swapped.
- [ ] "What changed" was computed from the previous report you read in stage 1.
- [ ] `git status` shows that only `reports/registry-audit.md` changed, and no registry write was made.

---

## Never

- **Never read from a view or a filter,** and never stop at the first page.
- **Never use a rollup, count or percentage as evidence.** Reconcile them against the rows.
- **Never report a link as good without opening it,** or judge a Storybook link by its HTTP status alone.
- **Never report a count without the rows behind it.**
- **Never skip a row because it looks finished.**
- **Never drop a finding because it repeats.** It stays until the evidence changes.
- **Never write to the registry, fix anything, or decide what a finding means.**
- **Never assign a finding to an agent when a human owns the column, or the reverse.**
- **Never reuse a previous sweep's results** in place of reading again.
