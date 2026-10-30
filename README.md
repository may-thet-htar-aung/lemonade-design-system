# Lemonade Design System

Design tokens and React components for Lemonade Found, a lost-and-found service. Every value comes from Figma as a token, and every component is built from one Figma component set, tested against it, and documented in Storybook.

The work is done by an agent crew, the **Lime Crew**, that moves each component through an Airtable registry. A human designer owns the design; a human merges every release to `main`.

- **Storybook (production):** https://lemonade-design-system.vercel.app
- **Storybook (staging):** https://lemonade-design-system-git-staging-htar1.vercel.app

## Components

25 components, each with one story per Figma variant:

| | | | | |
|---|---|---|---|---|
| Avatar | Button | Callout | Dialog Box | Filter Chip |
| Footer | Icon | Icon Button | Input | Item Card |
| Link Button | Logo | Logo/Symbol | Pagination | Pagination Arrow |
| Search Field | Sidebar | Stat Card | Status Badge | Tab Bar |
| Table | Table Row | Timeline Step | Top Nav | Top Nav Link |

Each lives in `src/components/<Name>/` as `<Name>.tsx`, `<Name>.css` and `<Name>.stories.tsx`. The story file starts with its Figma node URL.

## Using it

Install the package and its React peer:

```bash
npm install @may_thet_htar_aung/lemonade-design-system react react-dom
```

Load the token stylesheet and the component styles once, then use the components:

```tsx
import '@may_thet_htar_aung/lemonade-design-system/tokens.css';
import '@may_thet_htar_aung/lemonade-design-system/styles.css';
import { StatusBadge } from '@may_thet_htar_aung/lemonade-design-system';

<StatusBadge Status="Found" />
```

The package exports only components whose release review is Cleared (15 in 0.2.0). The rest are in Storybook and join a later release once they clear.

Prop names match the Figma property names exactly (`Style`, `State`, `Size`, `Type`, ...).

### Examples

**Filter Chip**

```tsx
import { FilterChip } from '@may_thet_htar_aung/lemonade-design-system';

<FilterChip Label="Lost" State="Active" />
<FilterChip Label="Found" />
```

**Footer**

```tsx
import { Footer } from '@may_thet_htar_aung/lemonade-design-system';

<Footer />
```

**Icon**

```tsx
import { Icon } from '@may_thet_htar_aung/lemonade-design-system';

<Icon Name="search" Size="md" Label="Search" />
```

**Icon Button**

```tsx
import { IconButton } from '@may_thet_htar_aung/lemonade-design-system';

<IconButton Style="Ghost" aria-label="Notifications" />
```

**Logo**

```tsx
import { Logo } from '@may_thet_htar_aung/lemonade-design-system';

<Logo Theme="Light" Size="Medium" />
```

**Logo/Symbol**

```tsx
import { LogoSymbol } from '@may_thet_htar_aung/lemonade-design-system';

<LogoSymbol Color="Brand" Size="Large" />
```

**Pagination Arrow**

```tsx
import { PaginationArrow } from '@may_thet_htar_aung/lemonade-design-system';

<PaginationArrow Direction="Next" />
```

**Search Field**

```tsx
import { SearchField } from '@may_thet_htar_aung/lemonade-design-system';

<SearchField State="Default" />
```

**Sidebar**

```tsx
import { Sidebar } from '@may_thet_htar_aung/lemonade-design-system';

<Sidebar Active="Dashboard" Collapsed="False" />
```

**Stat Card**

```tsx
import { StatCard } from '@may_thet_htar_aung/lemonade-design-system';

<StatCard Label="Open reports" Value="128" Delta="+12 since yesterday" />
```

**Tab Bar**

```tsx
import { TabBar } from '@may_thet_htar_aung/lemonade-design-system';

<TabBar Active="Home" />
```

**Table**

```tsx
import { Table } from '@may_thet_htar_aung/lemonade-design-system';

<Table aria-label="Reports" />
```

**Top Nav**

```tsx
import { TopNav } from '@may_thet_htar_aung/lemonade-design-system';

<TopNav Page="Home" />
```

**Top Nav Link**

```tsx
import { TopNavLink } from '@may_thet_htar_aung/lemonade-design-system';

<TopNavLink Label="Browse" State="Active" />
```

### Modes

Tokens switch by attributes on any ancestor element. Never hardcode a mode's value.

| Attribute | Values | Changes |
|---|---|---|
| `data-semantic` | light (default), `dark` | Colours and shadows |
| `data-typography` | english (default), `burmese` | Font family, line heights, letter spacing |
| `data-layout` | compact (default), `medium`, `expanded` | Page and card padding, gaps |
| `data-density` | mobile (default), `web`, `back-office` | Control heights, row heights, control padding |

```html
<div data-semantic="dark" data-density="back-office">...</div>
```

## Commands

```bash
npm install
npm run build:tokens              # regenerate build/ from tokens/
npm run typecheck                 # tsc --noEmit; must exit 0
npm run storybook                 # local Storybook on port 6006
npm run build-storybook           # static Storybook, what Vercel deploys
node scripts/verify-tokens.mjs    # prove a token rebuild is right; must end RESULT: PASS
node scripts/security-check.mjs   # build output, deps, clean tree; --live <url> --expect public|protected
```

## Layout

| Path | What it is |
|---|---|
| `tokens/` | Figma variable export, one JSON file per collection mode, plus `manifest.json`. Generated: never hand-edit. |
| `build/` | Generated CSS, iOS and Android token outputs. `build/css/tokens.css` is the one components use. Never hand-edit. |
| `build-tokens.js` | Style Dictionary build |
| `src/components/` | The components |
| `scripts/` | `verify-tokens.mjs` and `security-check.mjs` |
| `.claude/agents/`, `.claude/skills/` | The Lime Crew and the procedures they follow |
| `docs/` | `lime-crew-spec.md` (the pipeline) and `tools.md` (the tools and their pitfalls) |

## Rules

- **Tokens only.** Every CSS value is `var(--token)`: no hex, `px` or font family in a component.
- **Semantic tokens only.** A token that another token points at is a base token, and components never use it.
- **Unbound means a design gap.** If a value in Figma is not bound to a variable, it is reported to the designer, never guessed. New tokens are created in Figma and exported, never added to `tokens/` or `build/` by hand.
- **Never push to `main`.** Work lands by pull request into `staging`; a human merges `staging` into `main`.

## How a component moves

The registry status is the hand-off. Each agent wakes on a status and hands off by writing evidence, not by messaging the next agent.

```
To-do ──Engineer──▶ Ready for Testing ──QA──▶ To be deployed ──DevOps──▶ Completed ──Release──▶ ...
              ▲                          │
              └──── To be fixed ◀────────┘ (a failed case)
```

| Agent | Does |
|---|---|
| Engineer | Builds one Figma component set into one component, deploys it to staging, registers the links |
| QA | Tests every variant on staging against Figma, with real input, and records each case |
| DevOps | Checks the gate and security, confirms the production deploy, records the production link |
| Release | Reviews a completed component (its skill is not written yet) |
| Doc-generator | Writes the component docs (its skills are not written yet) |
| token-runner | Syncs tokens after the designer re-exports from Figma |
| PM | Audits the registry on request |

The full process is in `CLAUDE.md` and `docs/lime-crew-spec.md`.
