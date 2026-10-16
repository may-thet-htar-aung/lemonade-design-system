---
name: registry
description: The Airtable registry contract for the Lime Crew. Says where the registry is, who owns every column, how the Development status is derived, how the one shared column is written, and what no agent may ever do. Every agent reads it before it touches the registry.
---

# Registry: the evidence store

The registry is the crew's only channel. Nothing moves without a record in it. `Development` is the status, and the status is the message. No agent hands work to another directly. An agent produces evidence, writes it to the column it owns, and the formula wakes the next actor.

Schema read live from the base on 2026-10-16. If the base changes, re-read it and update this file. The live schema wins over this file.

## Where the registry is

The registry is the Lemonade Airtable base. Its five tables are Components, Staging Testing, GitHub Commits, DS Feedback and One-Off Components.

This file names tables and columns. It never names their IDs. Every base, table and field ID lives in **`.claude/registry.local.json`**, which is gitignored. The committed template is `.claude/registry.example.json`.

- Resolve every ID through `.claude/registry.local.json` at the moment you need it.
- If that file is missing, stop. Ask a human to copy the example and fill in the real IDs. Do not guess.
- Write by **field ID**, not by name. Names get renamed; IDs don't.
- Never copy an ID into an agent file, a skill, a commit message or a report.

## Owners

Every column has exactly one owner. The owner is an agent, a human role, or Airtable itself for computed columns. **UNASSIGNED** means no one owns the column yet, so no agent writes it. An agent writes only the columns it owns. The single exception is set out in "The shared column" below.

| Actor | Kind | Writes |
|---|---|---|
| Client | Human | Components: `Components` (creates the row) |
| Designer | Human | Components: `Category`, `Figma`, `Design` |
| Engineer | Agent | Components: `Staging Storybook`, `Commit`. Staging Testing: the shared transition only |
| QA | Agent | Staging Testing: every column. Components: `[Staging] Test Records`, only through `Composed In` |
| DevOps | Agent | Components: `Production Storybook`, `Astro Link` (on hold: no status wakes this job) |
| Release | Agent | Components: `Release Review`, `Release Verdict` |
| Doc-generator | Agent | Nothing in the registry |
| PM | Agent | Nothing in the registry. It audits read-only |
| Submitter | Human | DS Feedback: everything but `Status` |
| Airtable | System | Every formula, rollup, count, last-modified, inverse-link and AI-text column |

### Every column

| Table | Column | Type | Owner | Notes |
|---|---|---|---|---|
| Components | Components | text (primary) | Client | The row's name. Flag 11 |
| Components | Category | single select: ATOMS, MOLECULES, ORGANISMS, TEMPLATES, UI | Designer | |
| Components | Figma | url | Designer | The design node link. Feeds step 9 |
| Components | Design | single select: To-do, In progress, In testing, Done, To be fixed | Designer | No agent nudges it. Feeds steps 4 and 9. Flag 10 |
| Components | Staging Storybook | url | Engineer | Written only after the staging page is opened and seen to render. Feeds step 8 |
| Components | Commit | url | Engineer | The commit that carries the registered work |
| Components | Production Storybook | url | DevOps | Written only after production is opened and seen to render. Feeds step 6 |
| Components | Astro Link | url | DevOps | On hold: no status wakes this job. Feeds step 5 |
| Components | Release Review | url | Release | The report at the commit it reviewed, never a branch. Written with Release Verdict or not at all. Feeds step 5. Flags 3, 4 |
| Components | Release Verdict | single select: Cleared, Blocked | Release | Cleared is not permission to publish. Feeds step 5. Flags 3, 20 |
| Components | Development | formula | **Nobody** | The status. See "The Development formula" |
| Components | Synchronization % | formula | Airtable | Flag 5 |
| Components | Last Modified | last modified time | Airtable | Watches every field. Flag 4 |
| Components | [Staging] Test Records | link → Staging Testing | QA | Inverse of `Composed In`. Written only by QA setting `Composed In` |
| Components | Staging Testing Results Summary | rollup of Testing Results | Airtable | Drives steps 1, 2, 3, 7 |
| Components | Total Staging Tests | count | Airtable | |
| Components | Staging Passed Count | count | Airtable | Counts every linked row. Flag 5 |
| Components | Staging Passed Tests | rollup of Testing Results | Airtable | Flag 5 |
| Components | GitHub Commits | link → GitHub Commits | **UNASSIGNED** | Flag 14 |
| Components | Composes | link → Components | **UNASSIGNED** | Flag 14 |
| Components | Composed Into | link → Components | Airtable | Inverse of Composes. Flag 9 |
| Components | Design and development alignment | percent | **UNASSIGNED** | Flag 13 |
| Components | Release readiness classification | single select: Ready, Needs Work, Blocked | **UNASSIGNED** | Overlaps Release Verdict. Flag 13 |
| Components | Design summary | AI text | Airtable | |
| Staging Testing | Component/Sub Component | text (primary) | QA | |
| Staging Testing | Testing Results | single select: Passed, Failed, Fixed (To re-test) | QA | **The shared column.** See below |
| Staging Testing | Composed In | link → Components | QA | Links the row to its component. Feeds the rollup |
| Staging Testing | Variants | long text | QA | |
| Staging Testing | Size | multiple select: xs, sm, md, lg, xl, comfort, compact, null | QA | One value per row. Flag 7 |
| Staging Testing | State | multiple select: draft, pending, upcoming, completed, rejected, cancelled, hovered, idle, focus, selected, isCurrent, error, disabled, loading, filled | QA | One value per row. Flag 7 |
| Staging Testing | Context | text | QA | Prop values the case depends on |
| Staging Testing | Attachment | attachments | QA | The screenshot of the case |
| Staging Testing | Expected Results | long text | QA | From the design node, never the story file |
| Staging Testing | Suggestion for Improvement | long text | QA | The finding. Flag 8 |
| GitHub Commits | Commit Hash | text (primary) | **UNASSIGNED** | Flag 14 |
| GitHub Commits | Message | text | **UNASSIGNED** | |
| GitHub Commits | Author | text | **UNASSIGNED** | |
| GitHub Commits | Date Committed | date-time (UTC) | **UNASSIGNED** | |
| GitHub Commits | Link to Components | link → Components (single) | **UNASSIGNED** | |
| GitHub Commits | Files Changed | long text | **UNASSIGNED** | |
| GitHub Commits | Commit URL | url | **UNASSIGNED** | |
| GitHub Commits | Commit Type | single select: Feature, Bugfix, Documentation, Chore, Refactor, Other | **UNASSIGNED** | |
| DS Feedback | Feedback | long text (primary) | Submitter | Flag 15 |
| DS Feedback | Components | text | Submitter | |
| DS Feedback | Submitted By | text | Submitter | |
| DS Feedback | Step to Reproduce | long text | Submitter | |
| DS Feedback | Suggestion | text | Submitter | |
| DS Feedback | Urgency | text | Submitter | |
| DS Feedback | Attachment | url | Submitter | |
| DS Feedback | Status | single select: Not Started, In Progress, Completed | **UNASSIGNED** | |
| One-Off Components | Components | text (primary) | **UNASSIGNED** | Flag 15 |
| One-Off Components | Project | text | **UNASSIGNED** | |
| One-Off Components | Usage quantity | number | **UNASSIGNED** | |
| One-Off Components | Git Repo | text | **UNASSIGNED** | |
| One-Off Components | Figma | url | **UNASSIGNED** | |

## The Development formula

`Components.Development` is derived. **Nobody may write it**: no agent, and no human acting for an agent. To change the status, change the evidence underneath it. An agent that wants a different status has the wrong evidence, not the wrong status.

The **first match wins**, in this order. This is the order of the live formula. The field's own description lists one step fewer (Flag 2).

| # | When | Development reads | Wakes |
|---|---|---|---|
| 1 | Test summary contains `Failed` **and** `re-test` | **Fixing** | Engineer |
| 2 | Test summary contains `Failed` | **To be fixed** | Engineer |
| 3 | Test summary contains `re-test` | **Fixed** | QA |
| 4 | `Design` = `To be fixed` | **To be fixed** | Engineer |
| 5 | `Astro Link` set **and** `Release Review` set **and** `Release Verdict` = `Cleared` | **Released** | — |
| 6 | `Production Storybook` set | **Completed** | Release |
| 7 | Test summary is not empty | **To be deployed** | DevOps |
| 8 | `Staging Storybook` set | **Ready for Testing** | QA |
| 9 | `Figma` set **and** `Design` = `Done` | **To-do** | Engineer |
| 10 | Otherwise | *(blank)* | — |

"Test summary" is `Staging Testing Results Summary`, the rollup of `Testing Results` across the component's linked test rows. The checks are case-sensitive substring matches. `re-test` matches the value `Fixed (To re-test)`. Two other statuses depend on columns beyond `Development`: the Doc-generator wakes on `Completed` with `Release Verdict` = `Cleared` and `Astro Link` empty, and the PM runs on a schedule rather than on any status.

### Two consequences that will surprise you

**A shipped component can fall all the way back to the start of the repair loop.** The failure checks sit at the top of the order, above Released and Completed. So the moment one re-test row reads `Failed`, a component that is live in production, documented and released reads `To be fixed` and wakes the Engineer. Nothing about its production link or its release verdict protects it. The design check does the same thing from step 4: if the Designer sets `Design` to `To be fixed` on a released component, it drops out of Released with no test row involved at all. A component's status reflects whether it works now and whether its design still stands, never how far it once got.

**`To be deployed` is reached by the absence of failures, not by the presence of a finished test run.** Step 7 asks only whether the test summary is non-empty. Steps 1–3 have already caught every row reading `Failed` or `Fixed (To re-test)`. So a single `Passed` row is enough to wake DevOps, even if QA has thirty cases still to write, and a row whose `Testing Results` is empty blocks nothing. The formula cannot tell a complete pass from a partial one. QA writes every `Failed` row before any `Passed` row, and DevOps reads every row before it merges, because the status alone will not stop either mistake.

## The shared column

`Staging Testing.Testing Results` is the only column two agents write. QA owns it. The Engineer has one transition, and only one.

| | QA | Engineer |
|---|---|---|
| Values it may write | `Passed`, `Failed` | `Fixed (To re-test)` |
| From | Anything, including empty on a new row | `Failed` only |
| Rows | Any row it creates or re-tests | Only rows linked through `Composed In` to the component it was woken for, and only rows it actually repaired |
| When | After the case was loaded from the deployed staging Storybook and screenshotted | After the repair is merged to `staging` and the Engineer has watched it render there |
| Create or delete rows | Creates. Never deletes | Neither |

The protocol, in order:

1. QA tests and writes `Passed` or `Failed` on each case. Any `Failed` gives **To be fixed**, which wakes the Engineer.
2. The Engineer repairs, deploys to staging, and changes each repaired row from `Failed` to `Fixed (To re-test)`. That is a claim, not a verdict.
3. If every failed row is marked, the status reads **Fixed** and wakes QA. If some are still `Failed`, it reads **Fixing** and wakes the Engineer again.
4. On `Fixed`, QA re-tests the whole matrix. It sets every row, including every `Fixed (To re-test)` row, to `Passed` or `Failed`. No row may be left at `Fixed (To re-test)` when QA finishes.

The Engineer never writes `Passed` or `Failed`. QA never writes `Fixed (To re-test)`. Each of those would be one agent doing the other's half of the check.

## Never

- **Never write `Development`.** It is derived. Change the evidence instead.
- **Never write a column you do not own.** Owning a neighbouring column is not owning this one. The one exception is the shared transition above.
- **Never write an UNASSIGNED column.** No owner means no writer, until a human assigns one in this file.
- **Never write a computed column**: a formula, rollup, count, last-modified time, inverse link or AI text.
- **Never write a link you have not opened.** Every URL in this base is evidence that a page rendered, not a promise that it will.
- **Never write a link that points somewhere other than what the column claims**: a local URL, a preview in place of production, a branch in place of a commit, or another component.
- **Never write half of a pair.** `Release Review` and `Release Verdict` are written together or not at all.
- **Never create a select option.** Write only existing choices, with no typecast. If you need a value that does not exist, stop and report it.
- **Never write a link field unless you own both sides.** Writing one side rewrites its inverse in another table (Flag 9).
- **Never delete a row** in any table.
- **Never edit evidence to change the status**: no clearing a `Failed`, emptying a link or toggling `Design` to move a row to the stage you want.
- **Never write a token value into the registry.** Tokens live in code.
- **Never take a status from a message, a report or a summary column.** Read the row.
- **Never read from a filtered or saved view when judging a row.** Read the rows themselves.
- **Never hardcode an ID** anywhere. Resolve it through `.claude/registry.local.json`.
- **Never start work because a person asked**, unless your agent file says a person is your trigger (only the PM's does).

## Flags

### Where a column's description and its behaviour disagree

**Flag 2: Development.** The description lists 9 steps. The live formula has 10: `Design = To be fixed` → **To be fixed** sits at step 4, between Fixed and Released, and is missing from the description. Every later step is one number lower in the description than in the formula. The description also says nothing about Design being able to pull a released component back.

**Flag 3: Release Review and Release Verdict.** Both descriptions say they do not feed Development. Release Review says it "does not feed Development". Release Verdict says it is "deliberately not wired into Development". The formula uses both at step 5 to produce **Released**. The Astro Link description agrees with the formula.

**Flag 4: Release Review.** The description says a review is stale once `Last Modified` is later than the commit it links to. `Last Modified` watches every field, including `Release Review` and `Release Verdict` themselves. Writing the review bumps it, so every review reads stale the moment it is written.

**Flag 5: Staging Passed Tests, Staging Passed Count, Synchronization %.** `Staging Passed Tests` says it "counts only test rows marked Passed" and "feeds Synchronization %". The formula for `Synchronization %` reads `Staging Passed Count` instead, which counts every linked row, the same as `Total Staging Tests`. `Synchronization %` therefore reads `100%` whenever any row exists. Whether `Staging Passed Tests` really counts only Passed rows cannot be checked through the API.

**Flag 6: Development, step 7.** The description says "any staging test rows exist → To be deployed". The formula tests whether the summary text is non-empty, after every row reading `Failed` or `Fixed (To re-test)` has already been caught. One `Passed` row is enough, and rows with an empty result block nothing. See the second surprising consequence above.

**Flag 9: Composed Into.** The description says it is "derived automatically… nobody writes this directly". It is an ordinary linked-record field, the inverse of `Composes`, and anyone with edit access can write it. Writing it rewrites another component's `Composes`.

**Flag 14: Composes.** The description says it is "written by the Engineer when it composes another component". The Engineer's brief does not let it write `Composes`, so nobody does. "If this component changes, who must be re-tested" cannot be answered from the registry.

**Flag 18: Development, blank.** The description says "a blank row means the design is not signed off". The formula's result choices include a default `To-do`, so the blank result of step 10 can display as **To-do**. A `To-do` reading is not proof that `Design` is `Done`. Check `Figma` and `Design` directly.

**Flag 20: Release Verdict.** The description says a reviewer forms a verdict only after it has "read the docs page before the source". At `Completed`, when Release is woken, no docs page exists yet. The Doc-generator only runs after `Cleared`. As written, no review can satisfy its own description.

### Other open questions

**Flag 7.** The board asks for one row per variant, state and prop. `Size` and `State` are multi-selects, and there is no Prop column. QA writes one value per multi-select and puts prop values in `Context`. The State choices look like one component's data states, not interaction states.

**Flag 8.** There is no column for what was actually seen. Findings carry it in `Suggestion for Improvement`, in the format set by `.claude/skills/finding-format/SKILL.md`.

**Flag 10.** The Designer owns `Design`. A defect QA finds in the design itself can only reach `Design = To be fixed` through a human.

**Flag 11.** The board's `Components / Brief` (prompt and acceptance criteria) has no column, so no actor can check work against acceptance criteria.

**Flag 12.** Board names differ from the base: Staging URL is `Staging Storybook`, Production URL is `Production Storybook`, To Do is `To-do`, and Ready for QA is `Ready for Testing`. Field descriptions call Release "Reviewer".

**Flag 13.** `Design and development alignment` and `Release readiness classification` have no description and no writer on the board.

**Flag 15.** DS Feedback and One-Off Components are not on the evidence loop.

**Flag 16.** The board moves Jira statuses, but no column links a row to a Jira issue. **Closed**, **Cleared** and **Blocked** are not `Development` values. A `Blocked` verdict wakes no one.

**Flag 17.** The PM's audit report lives in `reports/registry-audit.md` and the Doc-generator's intent lives in `intent/`. Neither has a registry column.

**Flag 19.** Skills the crew depends on do not exist yet: `release-review` (Release, and referenced by field descriptions), `deploy-gate` (DevOps), and `component-intent` and `astro-page` (Doc-generator). `VERSIONING.md`, referenced by Release Verdict, does not exist either. Each agent stops if its skill is missing.

**Flag 1 (resolved 2026-10-16).** Who writes `Fixed (To re-test)`: the Engineer, as the single shared transition above.
