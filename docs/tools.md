# Tools

What the Lime Crew works with, how each tool is reached, and what goes wrong with it. `CLAUDE.md` says what the crew may do; this file says what it does it with.

Never write an ID from any of these services into this file or any committed file. Airtable IDs live in `.claude/registry.local.json`.

## Who uses what

| Tool | Engineer | QA | DevOps | Release | Doc-generator | PM | token-runner |
|---|---|---|---|---|---|---|---|
| Figma MCP | read | read | | read | read | read | |
| Airtable MCP | 3 cells | Staging Testing | 2 cells | 2 cells | read | read | |
| Git + `gh` | `component/*` → `staging` | | `staging` → `main` | `release-review/*` | `docs/*` → `staging` | read | `tokens/sync-*` |
| Storybook, local | self-check | | | | | | |
| Vercel | staging deploy | | production deploy | | | | |
| Browser | staging | staging | production | production | production | every link | |
| `scripts/` | | | `security-check.mjs` | | | | `verify-tokens.mjs` |

## Figma MCP

The design source. Read only for every agent.

| Call | Use it for |
|---|---|
| `get_metadata` | Every variant in a component set, with its size. The matrix comes from here |
| `get_design_context` | Layout, the variable bound to each property, and the component description |
| `get_variable_defs` | Variable values, **in the mode the file is open in** (see `test` skill, stage 6) |
| `get_screenshot` | What each variant looks like |

- The node is in the URL: `node-id=165-1639` is node `165:1639`.
- A registry `Figma` link should point at a component set or its frame, not a whole page. A page link (Icon's row points at page `4:98`) makes the agent pick the frame itself.
- `get_design_context` returns React and Tailwind as a reference. Never paste it. Translate it to `var(--token)` CSS.
- Asset URLs it returns expire after 7 days. Download assets into the repo, and never reference the Figma URL at runtime.
- A value it prints as raw (`size-[18px]`, no `var(--…)`) is unbound in the design. That is a gap to report.

## Airtable MCP

The registry. Read `.claude/skills/registry/SKILL.md` before any write.

- Write by field ID, resolved from `.claude/registry.local.json`. Read the table by plain list, never through a view or a filter.
- Single selects come back as objects. Write them back as the plain option name, with no typecast.
- `Development` reads `To-do` on rows with no design yet, because that is the formula's default display (registry Flag 18). Check `Figma` and `Design` yourself.
- After a write, ask for `Development` in the response to see the status the formula now gives.

## Git and GitHub (`gh`)

- Repo: `may-thet-htar-aung/lemonade-design-system`.
- Branches: `main` (production; DevOps opens the PR from `staging`, a human merges), `staging` (QA tests here), `component/<name>`, `docs/<name>`, `release-review/<name>`, `tokens/sync-<description>`.
- Branch from an up-to-date `staging`: `git checkout staging && git pull --ff-only` first.
- `gh pr create --base staging` for every branch except `tokens/sync-*`, which targets `main`.
- Git warns that LF will be replaced by CRLF on every commit. That is expected on Windows.

## Node, TypeScript and Storybook

Node 24 and npm 11.

| Command | What it does |
|---|---|
| `npm run build:tokens` | Regenerates `build/` from `tokens/` |
| `npm run typecheck` | `tsc --noEmit`. Must exit 0 before any deploy |
| `npm run storybook` | Local Storybook on port 6006, for the Engineer's self-check only |
| `npm run build-storybook` | Static Storybook into `storybook-static/` (gitignored). This is what Vercel runs |

- Stack: React 19, TypeScript, Storybook 10 on Vite (`@storybook/react-vite`).
- `.storybook/preview.ts` imports `build/css/tokens.css`, so every story has the tokens.
- `.storybook/preview-head.html` loads Manrope and Noto Sans Myanmar from Google Fonts. Without it the fonts fall back silently, and every text measurement is wrong.
- `.storybook/main.ts` forces Vite to pre-bundle React. Without that, stories fail with "does not provide an export named 'default'".
- Components do not import CSS. Each component's `<Name>.css` is imported once in `src/styles.css`, which `.storybook/preview.ts` loads and the package ships as `styles.css`. A new component adds its line there.
- Components may import other components, and assets with `import.meta.glob` (Icon loads its SVGs this way). The package build swaps that call for static imports (`tsup.config.ts`), so it stays Vite-only syntax in the source.
- One story per matrix row. A story's iframe is `/iframe.html?id=components-<name>--<story>&viewMode=story`, and the list of every story is `/index.json`.

## Vercel

Two projects, both built from the GitHub repo on every push.

**`lemonade-design-system`**: Storybook.

| Environment | Branch | URL |
|---|---|---|
| Production | `main` | `lemonade-design-system.vercel.app` |
| Staging | `staging` | `lemonade-design-system-git-staging-htar1.vercel.app` |

- Settings live in `vercel.json` in the repo: build `npm run build-storybook`, output `storybook-static`. The file overrides the dashboard's Framework Preset.
- A deploy takes about a minute after the push. A branch deploy is ready when its `/index.json` lists the new stories.
- Deployment Protection is **off** for this project, so both URLs are public. Turning it on makes every URL redirect to Vercel login, and agents cannot open them. Change it on the project (Settings → Deployment Protection), not in the team's default for new projects, which does not touch existing projects.
- The Vercel MCP connection reads and writes both projects. If it answers 403 for the team scope, it needs team access re-approved: the MCP returns a one-time link for a human to open.

**`lemonade-design-system-docs`**: the docs site.

| Environment | Branch | URL |
|---|---|---|
| Production | `astro` | `lemonade-design-system-docs.vercel.app` |

- Folder: `docs-site/`, its own npm package (Astro + Starlight) with its own lockfile, only on the `astro` branch. It is the project's root directory.
- Settings live in `docs-site/vercel.json`: framework `astro`, install `npm install` (a lockfile written on another OS can leave out packages Linux needs, and `npm ci` refuses it), build `npm run build`, output `dist`.
- Every other branch carries `docs-site/vercel.json` = `{"git": {"deploymentEnabled": false}}`, so it never builds this project. Without it, every push to a branch with no `docs-site/` fails and leaves a red check on PRs.
- Production branch is `astro` (Settings → Environments → Production → Branch Tracking). The MCP cannot set it.
- Deployment Protection is off. The address is the one Vercel assigned; confirm it serves our site before linking it, because an obvious name can belong to someone else.

## Browser

Agents open staging and production in a real browser, never by HTTP status alone.

- Storybook answers 200 for a story that does not exist. Look at what rendered.
- Measure with `getComputedStyle` and `getBoundingClientRect` in the story's iframe. The `test` skill has the scripts.
- Read the console. A clean console is part of the Engineer's self-check.
- A 302 to `vercel.com/sso-api` means Deployment Protection is on. That is an access problem, not a dead link.

## Scripts

| Script | Who runs it | Must end |
|---|---|---|
| `node scripts/verify-tokens.mjs` | token-runner, after every rebuild | `RESULT: PASS` |
| `node scripts/security-check.mjs` | DevOps, before merging to `main` | `RESULT: PASS` |
| `node scripts/security-check.mjs --live <url> --expect public` | DevOps, before writing `Production Storybook` | `RESULT: PASS` |

Both are dependency-free. See the `tokens` and `security-check` skills.

## Not set up yet

- No lint config. The Engineer's checks are `typecheck`, the raw-value grep in the `build` skill, and rendered stories.
- No CI on pull requests. Nothing runs between a push and a Vercel deploy.
- The `deploy-gate` skill does not exist, so DevOps stops when it needs it.
