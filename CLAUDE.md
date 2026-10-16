# Lemonade Design System

Design tokens and, soon, components for the Lemonade design system. Built by an agent crew (the Lime Crew) that moves work through an Airtable registry, not through messages.

## Layout

| Path | What it is | Who writes it |
|---|---|---|
| `tokens/` | Figma variable export: one JSON file per collection mode, plus `manifest.json` | The Figma export plugin only |
| `build/` | Generated CSS, Swift and Android outputs (`build/css/tokens.css` is the one components use) | `npm run build:tokens` only |
| `build-tokens.js` | Style Dictionary build, plus the rules that repair export *shapes* | Humans, by reviewed change |
| `src/components/<Name>/` | `<Name>.tsx`, `<Name>.css`, `<Name>.stories.tsx` (none exist yet) | Engineer |
| `scripts/` | `security-check.mjs`, `verify-tokens.mjs`, both dependency-free | Humans |
| `.claude/agents/` | The crew | Humans |
| `.claude/skills/` | Procedures the agents follow | Humans |
| `.claude/registry.local.json` | Airtable base, table and field IDs. Gitignored. Copy from `registry.example.json` | Humans |
| `docs/lime-crew-spec.md` | The pipeline spec read from the FigJam board | Humans |

## Commands

```bash
npm run build:tokens              # regenerate build/ from tokens/
node scripts/verify-tokens.mjs    # prove the rebuild is right; must end RESULT: PASS
node scripts/security-check.mjs   # build output, deps, clean tree; --live <url> --expect public|protected
```

Not set up yet: TypeScript, Storybook and a lint config. The build and test skills assume `npx tsc --noEmit` and a Storybook. Add them before the first component is built.

## Hard rules

- **Never hand-edit `tokens/` or `build/`.** Both are generated. A missing or wrong token is fixed in Figma and re-exported. See `.claude/skills/tokens/SKILL.md`.
- **Never push or merge to `main`.** DevOps merges `staging` → `main`. Everything else lands by pull request: `component/<name>` → `staging`, `tokens/sync-<description>` from token-runner, `docs/<name>` and `release-review/<name>`.
- **Never hardcode an Airtable ID** in any committed file. Resolve it through `.claude/registry.local.json`.
- **Never write `Development`** in the registry. It is a formula. Change the evidence underneath it.
- **Never write a registry column you do not own.** Ownership is in `.claude/skills/registry/SKILL.md`. Read it before any registry write.
- **`Design`, `Figma` and `Category` belong to the Designer,** a human. No agent sets them.

## How work moves

The registry status is the message. Each agent is woken by a status and hands off by writing evidence, never by messaging the next agent.

| Development reads | Wakes | Agent file |
|---|---|---|
| `To-do`, `To be fixed`, `Fixing` | Engineer | `.claude/agents/engineer.md` |
| `Ready for Testing`, `Fixed` | QA | `.claude/agents/qa.md` |
| `To be deployed` | DevOps | `.claude/agents/devops.md` |
| `Completed`, no Release Verdict | Release | `.claude/agents/release.md` |
| `Completed` + `Cleared`, no Astro Link | Doc-generator | `.claude/agents/doc-generator.md` |
| A schedule, or a human asking | PM (read-only audit) | `.claude/agents/pm.md` |
| "I have re-exported tokens from Figma" | token-runner | `.claude/agents/token-runner.md` |

The full formula, the column owners and the open flags are in `.claude/skills/registry/SKILL.md`.

## Component conventions

- One Figma component set becomes one component. Its variant matrix sets the props, the stories and QA's test cases. See `.claude/skills/build/SKILL.md`.
- Prop names match the Figma property names exactly.
- Every CSS value is `var(--token)`. No hex, `px` or font family appears in a component.
- Use semantic tokens only. If another token points at a token through `var(--…)`, that token is base, and a component never uses it.
- A property the design leaves unbound is a design gap. Report it. Never pick a value for it.
- Modes switch through attributes on an ancestor: `data-semantic`, `data-typography`, `data-layout` and `data-density`. Never resolve a mode-varying token to its default value.
- The story file starts with the Figma node URL.

## Skills

| Skill | Use it for |
|---|---|
| `registry` | Column owners, the Development formula, the shared column, flags |
| `build` | One design node → one component, in four checked stages |
| `test` | Testing a component against its node: fonts, computed values, real input, modes |
| `finding-format` | The shape of a QA finding |
| `tokens` | Export, modes, gap versus naming mistake, verifying a rebuild |
| `security-check` | What the security gate covers and what it does not |
| `sweep` | The PM's registry audit |

Not written yet, and each agent stops when it needs one: `deploy-gate` (DevOps), `release-review` (Release), and `component-intent` and `astro-page` (Doc-generator).

## Environment

Windows with Git Bash and PowerShell. Node 24, npm 11. Git warns about LF → CRLF on commit, which is expected. If token diffs ever show every line as changed, add a `.gitattributes`.
