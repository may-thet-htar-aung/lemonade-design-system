# Lime Crew — Pipeline Spec (from the FigJam board)

Source: FigJam board "Lime Crew — Evidence Loop" (`8Wa9Ylenvi3EeAWBX8V9PW`), read 2026-10-16.

This spec only says what the board says. Where the board is silent, unclear, or contradicts files already in this repo, the gap is listed in **Ambiguities** at the end, numbered `A1`, `A2`, and so on. Nothing here has been resolved by guesswork. Each line is tagged by where it came from:

- **[board]**: drawn or written on the board.
- **[legend]**: follows from the board's legend.
- **[inferred]**: my reading of the board's layout. Treat it as a question, not a rule.

## The board's one rule

> Solid line = main path (actor → tool → output → Airtable record → Jira status).
> Dashed line = the Jira status provokes the next actor.
> **Nothing moves without a record in Airtable.**

So every hand-off happens in three steps:

1. An actor produces evidence.
2. The evidence is written to an Airtable column.
3. A condition on that column sets a Jira status, and the status wakes the next actor.

No actor hands work directly to another actor. **[legend]**

## Tools and budget [board]

| Tool | Used for | Plan |
|---|---|---|
| Figma | Design, UI Kit, FigJam | Edu |
| AI IDE (Claude) | Development | Pro |
| Git (GitHub) | Branches, PRs, staging → main | Free |
| Hosting and domain (Vercel) | Preview (staging) and production | Free |
| Jira | Status per component | Free |
| Airtable | Registry, the evidence store | Free |
| Package registry (npm) | Listed, but no actor uses it (see A30) | Free |

## Jira statuses in board order [board]

To Do → Ready for QA → (To be fixed ⇄ Fixing / Fixed) → To be deployed → Completed → Closed
Release branch: Completed → Cleared / Blocked → Released

---

## Actors

There are 8 actors: 2 humans and 6 agents.

### 1. Client (Human)

| | |
|---|---|
| Works in | Claude Cowork chat **[board]** |
| Reads | Nothing shown on the board. |
| Produces | A prompt plus acceptance criteria. **[board]** |
| Writes | Airtable `Components / Brief` **[board]** |
| Refuses | Nothing stated. |
| Hands off when | A dashed line runs from the Brief record to the Designer. **[board]** The line has no condition label and no Jira status (A5). |

### 2. Designer (Human)

| | |
|---|---|
| Works in | Figma / FigJam **[board]** |
| Reads | The Brief, via the dashed line from `Components / Brief`. **[board]** |
| Produces | The UI Kit: tokens and components. **[board]** |
| Writes | The Figma node link in Airtable `Components / Figma + Design`. The line is labelled "Write Figma node link in Airtable". **[board]** |
| Refuses | Nothing stated. |
| Hands off when | **"When Figma column has a link"** → Jira **To Do** → Developer. **[board]** |
| Second exit | **"When Design = To be fixed"** → Jira **To be fixed** → Developer. This line is drawn from the same `Figma + Design` record. **[board]** Who sets `Design` to that value, and when, is unclear (A7, A8). |

### 3. Developer (Agent)

The Developer has two entry modes, labelled "New" and "Fix in staging". **[board]**

**New build**, woken by Jira **To Do**: **[board]**

| | |
|---|---|
| Works in | AI IDE (Claude), then GitHub: feature branch → PR → staging **[board]** |
| Reads | The Figma node linked in `Components / Figma + Design`. **[inferred]** |
| Produces | A Vercel Preview: the Storybook staging URL. **[board]** |
| Writes | The staging URL in Airtable `Components / Staging URL`. The line is labelled "Write staging URL in Airtable". **[board]** |
| Hands off when | **"When Staging URL column has a link"** → Jira **Ready for QA** → QA. **[board]** |

**Fix**, woken by Jira **To be fixed** or **Fixing**: **[board]**

| | |
|---|---|
| Works in | AI IDE (Claude, fix), then GitHub: new commit → PR → staging **[board]** |
| Reads | The failed rows in `Staging Testing / Testing Results`. **[inferred]** |
| Produces | A Vercel Preview redeploy. **[board]** |
| Writes | `Staging Testing / Fixed (To re-test)`. The line is labelled "Update testing result". **[board]** This directly contradicts `engineer.md` (A11). |
| Hands off when | **"All rows = Fixed (To re-test)"** → Jira **Fixed** → QA. **[board]** |
| Loops when | **"Only some rows = Fixed (To re-test)"** → Jira **Fixing** → back to the Developer. **[board]** |

| | |
|---|---|
| Refuses | Nothing is stated on the board. The existing `engineer.md` has a long "Never" list: never mark its own work fixed, never merge to main, never write production or Astro links. Those rules were not drawn from this board (A2). |

### 4. QA (Agent)

| | |
|---|---|
| Woken by | Jira **Ready for QA**, after a new build. Jira **Fixed**, after a fix. **[board]** |
| Works in | Tests the staging URL against the Figma UI Kit. The line is labelled "Staging test". **[board]** |
| Reads | The staging URL and the Figma UI Kit. **[board]** |
| Produces | Test rows, one per variant, state and prop. **[board]** |
| Writes | Airtable `Staging Testing / Testing Results`, one record per variant, state and prop. **[board]** |
| Refuses | Nothing stated. The existing `qa.md` says never fix and never test its own work (A2). |
| Hands off when | **"One or more = Failed"** → Jira **To be fixed** → Developer. **[board]** |
| | **"All = Passed"** → Jira **To be deployed** → DevOps. **[board]** |

### 5. DevOps (Agent)

| | |
|---|---|
| Woken by | Jira **To be deployed**. **[board]** |
| Works in | GitHub: staging → main. The line is labelled "Deploy". **[board]** |
| Produces | Vercel Production plus the domain. **[board]** |
| Writes | Airtable `Components / Production URL`. The line is labelled "Write production URL in Airtable". **[board]** |
| Also writes | `Components / Astro Link`. The line is labelled "DevOps writes Astro Link". **[board]** This comes after a line labelled "Page is live: DevOps opens and fetches it", so DevOps opens the live docs page before writing the link. **[board]** What wakes DevOps for this second job is unclear (A22). |
| Refuses | Nothing stated. |
| Hands off when | **"When Production URL column has a link"** → Jira **Completed**. Completed then wakes **both** PM and Release. **[board]** |

### 6. PM (Agent)

| | |
|---|---|
| Woken by | Jira **Completed**, by a dashed line. **[board]** It also runs as a "Claude Cowork scheduled audit". **[board]** Whether it is triggered, scheduled, or both is unclear (A24). |
| Reads | All columns and all records in Airtable. **[board]** |
| Produces | An evidence audit report. **[board]** |
| Writes | Nothing is drawn. The connector from the audit leaves the report and ends on empty canvas. Where the report is stored is unclear (A25). |
| Refuses | Nothing stated. |
| Hands off when | **"Check every column and record"**, then **"All evidence present"** → Jira **Closed**. **[board]** There is no exit drawn for missing evidence (A26). |

### 7. Release (Agent)

| | |
|---|---|
| Woken by | Jira **Completed**, by a dashed line. **[board]** |
| Works in | The Component Library repo, using the skill **Release-review**. The line is labelled "Review". **[board]** |
| Produces | A Release Review Report and a Release Verdict. **[board]** |
| Writes | `Components / Release Review` ("Write Release Review") and `Components / Release Verdict` ("Write Release Verdict"). **[board]** |
| Refuses | Nothing stated. |
| Hands off when | Release Verdict "result" → Jira **Cleared** → Doc-generator. **[board]** |
| | Release Verdict "result" → Jira **Blocked** → no next actor is drawn (A28). |

### 8. Doc-generator (Agent)

| | |
|---|---|
| Woken by | Jira **Cleared**. **[board]** |
| Works in | The Component Library repo, compared against **Figma Documentation**. The line is labelled "Compare". **[board]** |
| Produces | "Intent for each component" using the skill **component-intent**. The fields are `use_when`, `dont_use_when`, `variant_intent`, `placement`, `pairs_with`, `required_tokens` and `a11y`. **[board]** |
| | The Astro site using the skill **Astro-page**: "whole docs site, every run". **[board]** |
| Writes | No Airtable column is drawn. The component-intent connector ends on empty canvas (A31). |
| Refuses | Nothing stated. |
| Hands off when | **"Astro Link + Release Review + Cleared"** → Jira **Released**. **[board]** The Astro Link that completes this condition is written by DevOps, not by the Doc-generator. |

---

## Hand-off table

| # | From (column condition) | Jira status | Wakes |
|---|---|---|---|
| 1 | Brief record exists (no condition is written) | — | Designer |
| 2 | Figma column has a link | To Do | Developer (new) |
| 3 | Design = To be fixed | To be fixed | Developer (fix) |
| 4 | Staging URL column has a link | Ready for QA | QA |
| 5 | Testing Results: one or more Failed | To be fixed | Developer (fix) |
| 6 | Fixed (To re-test): only some rows | Fixing | Developer (fix) |
| 7 | Fixed (To re-test): all rows | Fixed | QA |
| 8 | Testing Results: all Passed | To be deployed | DevOps |
| 9 | Production URL column has a link | Completed | PM **and** Release |
| 10 | All evidence present | Closed | — |
| 11 | Release Verdict result | Cleared | Doc-generator |
| 12 | Release Verdict result | Blocked | — |
| 13 | Astro Link + Release Review + Cleared | Released | — |

---

## Ambiguities

These are not resolved. Each one would otherwise be decided the same way in every agent.

### Machinery: who moves the work

- **A1. Who sets the Jira status?** The "Conditional" column reads like an automation, but no actor owns it. It could be an Airtable automation, a Jira automation, a Zapier-style bridge, or each agent setting it themselves.
- **A2. Do these agents replace the existing ones, or merge with them?** The repo already has `engineer.md`, `qa.md` and `token-runner.md`. They disagree with the board in several places (A11, A13, A14, A16, A17). It is also undecided whether the board's "Developer" becomes `engineer`.
- **A3. Which system is the source of truth for status: Jira or Airtable?** `engineer.md` says the status is an Airtable formula column called `Development`, which nobody writes and which wakes agents. The board says a Jira status wakes them. Are they mirrored? If they disagree, which one wins?
- **A4. What is the actual wake-up mechanism?** A Claude Code agent cannot watch Jira by itself. It could be polling on a schedule (how often, and run by whom?), a webhook, or a human typing "go".
- **A5. The Client → Designer hand-off has no condition and no Jira status.** What counts as a finished Brief? Does the Jira issue exist before **To Do**? Who creates the Jira issue at all?
- **A6. What is the unit of work?** One Jira issue per component? One per component plus one per test row? The Airtable `Staging Testing` table has many rows per component, but Jira status is per component.

### Designer

- **A7. Who sets `Design = To be fixed`?** It could be the Designer, QA (when the failure is in the design rather than the code), or anyone.
- **A8. When can the `Design = To be fixed` path fire?** Only before build, or at any time? If it fires after QA, does it override **Ready for QA** or **To be deployed**?
- **A9. Does the Developer need `Design = Done`, or only a Figma link?** The board's **To Do** fires on the Figma link alone. `engineer.md` refuses to build unless Design is `Done`.
- **A10. Where do tokens fit?** The Designer's output includes tokens, but token-runner is not on the board. Does a token change re-open built components? Should token-runner's PR target `main`, as it does now, when the board says only DevOps reaches main and everything else goes through staging?

### Developer and QA loop

- **A11. Who writes `Fixed (To re-test)`?** The board says the Developer, after a fix ("Update testing result"). `engineer.md` forbids the Developer from writing any Staging Testing column, and says QA writes it after re-testing. Under the `engineer.md` rule, the "Fixed / Fixing" condition can only be set by QA.
- **A12. Who merges a feature-branch PR into staging?** It could be the Developer, a human reviewer, or an automatic merge.
- **A13. What is the "staging URL"?** A per-PR Vercel preview, a single staging-branch Storybook, or a deep link to the component's story? `engineer.md` calls the column `Staging Storybook`. The board calls it `Staging URL`.
- **A14. Where does QA test?** The board says the staging URL. `qa.md` says the local Storybook (`npm run storybook`) and writes to `reports/`, not Airtable.
- **A15. Who calls QA?** The board says the Jira status. `qa.md` says "a human hands it to you".
- **A16. What counts as one test row?** The board says one per variant, state and **prop**. `qa.md` and the test skill say variant, state and **size**.
- **A17. On a re-test, does QA update existing rows or add new ones?** This decides whether "all rows = Fixed (To re-test)" is countable, and whether the failure history survives.
- **A18. Is there a limit on fix loops?** Fixing → Developer and To be fixed ⇄ Fixed can repeat forever. Is there a pass limit, or an escalation to a human?
- **A19. Is QA's verdict final?** `qa.md` says no verdict is final until a human reads it. The board has no human after the Designer. Does **To be deployed** fire without a human?

### DevOps

- **A20. What does "staging → main" deploy?** The staging branch may hold other components that have not passed QA. Does DevOps merge all of staging, or cherry-pick only this component?
- **A21. Is DevOps the only actor allowed to merge to main?** `engineer.md` assumes so. token-runner pushes branches and opens PRs against `main` but never merges. Should a token PR wait for DevOps too?
- **A22. What wakes DevOps to write the Astro Link?** It is not a Jira status. The connector comes from the Doc-generator's output ("Page is live"). Who deploys the Astro site to make it live: DevOps, Vercel automatically, or the Doc-generator?
- **A23. Is there a human approval before production?** None is drawn.

### PM

- **A24. Is the PM triggered by Completed, run on a schedule, or both?**
- **A25. Where is the evidence audit report stored?** The connector ends on empty canvas.
- **A26. What happens when evidence is missing?** No exit is drawn. Does the PM open a ticket? `engineer.md` says the PM opens **Asana** tickets, but the board uses Jira.
- **A27. Does the order of Closed and Released matter?** PM and Release both start at **Completed**. Can a component be **Closed** before **Released**? Does Closed check the Release columns too ("all columns")?

### Release and Doc-generator

- **A28. What happens after Blocked?** No exit is drawn. Who acts, and does the work return to the Developer?
- **A29. What are the criteria for Cleared versus Blocked?** The board only says "result". The `Release-review` skill does not exist in the repo yet.
- **A30. Who publishes to npm?** npm is in the tool list, but no actor publishes a package. Is that part of Release, of DevOps, or not in scope?
- **A31. Where is the component-intent output stored?** Is it an Airtable column, a file in the repo, or only on the Astro page? The connector ends on empty canvas.
- **A32. How does a per-component trigger fit a whole-site rebuild?** The Doc-generator is woken per component (**Cleared**) but rebuilds the "whole docs site, every run". What happens when two components clear at the same time?
- **A33. What if the repo and Figma Documentation disagree?** The board says "Compare" but does not say who wins or who is told.
- **A34. Which repo is the "Component Library repo"?** Is it this repo (`lemonade-design-system`) or a separate one?

### Registry naming

- **A35. What are the exact Airtable table and column names?** The board's names (`Staging URL`, `Production URL`, `Fixed (To re-test)`) differ from `engineer.md` (`Staging Storybook`, `Production Storybook`, `Fixed (Re-test)`).
- **A36. What are the exact Jira status names?** The board's statuses (`To Do`, `Ready for QA`) differ from `engineer.md` (`To-do`, `Ready for Testing`).
- **A37. Where are the registry contract files?** `engineer.md` points to `.claude/skills/registry/SKILL.md` and `.claude/registry.local.json`. Neither exists in the repo.
- **A38. Who owns which column?** No table assigns column ownership on the board. Without one, each agent's "never write X" list will be guessed.

### Refusals

- **A39. Every "Refuses" row above is empty because the board states no refusals.** Should the refusals come from the existing `engineer.md` and `qa.md` "Never" lists, or be written fresh from a column-ownership table?
