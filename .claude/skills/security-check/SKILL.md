---
name: security-check
description: A dependency-free security gate for the Lemonade design system. Static mode scans build output for provider-specific credentials, private identifiers and leaked environment values, then checks dependency advisories and a clean working tree. Live mode checks a deployed URL is public or protected as intended. States plainly what it does not cover. DevOps runs it before every merge to main and against every live URL it records.
---

# Security check

`scripts/security-check.mjs` is a narrow gate with known edges. It catches a specific set of mistakes that are easy to make when a design system ships to the web: a key baked into a bundle, an internal ID published in a page, a `.env` value inlined into client JS, a known-vulnerable dependency, or a build made from uncommitted files. It does not make the system secure. No gate protects against every attack, and a gate that claims to cannot be trusted. Read "What it does not cover" before you rely on a pass.

## Who runs it, and when

**DevOps runs it.** It is part of the deploy gate, at two points in DevOps's sequence:

| When | Command | Blocks |
|---|---|---|
| Before merging `staging` into `main`, on the built output | `node scripts/security-check.mjs` | The merge |
| After deploying, against the production Storybook URL, before writing `Production Storybook` | `node scripts/security-check.mjs --live <url> --expect public` | Writing the link |
| Against any URL that is meant to be private, such as a protected preview | `node scripts/security-check.mjs --live <url> --expect protected` | Recording or sharing that URL |

The human or agent who asks for a URL to be public or protected decides `--expect`. The script does not guess. A Storybook meant for consumers is public. Anything carrying unreleased work behind Vercel deployment protection is protected.

Anyone may run it locally at any time. Only DevOps's run counts as the gate.

## How to read the result

Every check ends in one of three states, and only one of them is a pass.

| State | Meaning | Exit code |
|---|---|---|
| `PASS` | The check ran and found nothing it looks for | 0 when every check passes |
| `FAIL` | The check ran and found something. The finding names the file and line, or the URL | 1 |
| `ERROR` | The check could not run: no build output, npm offline, git missing, URL unreachable | 2 |

`ERROR` is never a pass. The run prints `RESULT: INCOMPLETE (not a pass)`, and the gate stays closed until the check can run.

Findings print credentials masked: the first six and last four characters, plus the length. The script never prints a full secret.

## What it covers

### Static mode

Run it from the repo root after building. By default it scans whichever of `build/`, `dist/`, `storybook-static/` and `site/dist/` exist. `--dir` replaces that list. Every check runs on every run, and there is no flag to skip one.

**1 · Credentials in build output.** It matches every text file in the output, source maps included, against **provider-specific formats**, not entropy:

| Provider | Shape it matches |
|---|---|
| AWS | access key ID `AKIA…` / `ASIA…` + 16 |
| GitHub | `ghp_`, `gho_`, `ghu_`, `ghs_`, `ghr_` tokens and `github_pat_` fine-grained tokens |
| Airtable | personal access token `pat<14>.<64 hex>` |
| Figma | personal access token `figd_…` |
| npm | access token `npm_…` |
| Stripe | live secret and restricted keys `sk_live_` / `rk_live_` |
| Slack | `xoxb-`, `xoxp-`, `xoxa-` and related tokens |
| Google | API key `AIza…` |
| Anthropic | API key `sk-ant-…` |
| OpenAI | project key `sk-proj-…` |
| Any | PEM private key blocks |

Every match has a known shape, so a finding is never a guess. The cost is that a secret in a format not on this list passes.

**2 · Private identifiers.** The registry's Airtable IDs must not reach a public page. It fails on any Airtable base, table, field, view or record ID pattern in the output, and on any value from `.claude/registry.local.json` (or `--registry <path>`) appearing anywhere in the output.

**3 · Environment leakage into client JS.** It reads `.env`, `.env.*` (except `.env.example`), or the files given with `--env-file`. Every variable without a public prefix (`PUBLIC_`, `VITE_`, `STORYBOOK_`, `NEXT_PUBLIC_`) is treated as server-only. The check fails if any of those values appears in a client file (`.js`, `.mjs`, `.cjs`, `.html`, `.map`, `.json`). It also fails when one client file contains three or more build-machine variable names, such as `PATH`, `HOME` or `USERPROFILE`, which shows a whole `process.env` was inlined.

**4 · Dependency advisories.** It runs `npm audit` and fails on any advisory at `--audit-level` or above (default `high`). If the audit cannot reach the registry, the result is `ERROR`, not a pass.

**5 · Dirty working tree.** It fails if `git status --porcelain` lists anything. A build made from uncommitted or untracked files is not the build any commit describes, so nobody can reproduce or review what shipped.

### Live mode

`--live <url> --expect public|protected` fetches the URL anonymously, without following redirects, and fails if the access is the wrong way round:

| Expected | Passes when | Fails when |
|---|---|---|
| `public` | HTTP 200 with a real page | 401, 403, a redirect to a login or SSO page, or a 200 that is a login page |
| `protected` | 401, 403, a redirect to a login or SSO page, or a 200 that is a login page (Vercel's "Authentication Required", password form) | HTTP 200 with a real page, readable by anyone |

Either way, when the anonymous visitor receives a page, it also scans that page and up to 50 same-origin scripts for credentials, Airtable IDs, registry values and an inlined environment. An anonymous visitor sees exactly that content, so it is the content that matters.

## What it does not cover

A pass means only that none of the above was found. It does **not** mean:

- **Secrets in git history.** It reads the working tree and the build output, not past commits. A key committed and later deleted is still exposed.
- **Secrets in unknown formats.** There is no entropy scan. A token from a provider not in the table, a custom internal key or a password passes.
- **Secrets outside the build output.** It does not scan source files, `node_modules`, CI logs, Vercel project settings, Airtable or Figma.
- **Non-Airtable private identifiers.** Figma file keys, internal hostnames, email addresses and people's names are not checked, unless they appear as values in the registry config.
- **Server-side exposure.** It does not read Vercel environment variables, serverless functions, headers or the CDN configuration.
- **Web vulnerabilities.** That means XSS, CSP, CORS, clickjacking, open redirects, injection, and auth logic beyond "is there a wall".
- **Supply-chain attacks with no advisory yet.** `npm audit` only knows published advisories. A malicious or compromised package that is not yet reported passes.
- **Whether protection is strong.** Live mode checks that a wall exists. It does not test who can get through it, cookie or session security, or shared preview links.
- **Pages it did not fetch.** Live mode reads one URL and its same-origin scripts. Other routes, lazy-loaded chunks, and assets on other origins are not scanned.
- **Changes after it ran.** A pass describes one moment. Anything built or deployed afterwards is unchecked.

When a risk on this list matters for a release, it needs its own check or a human review. A pass from this gate does not cover it.

## Never

- **Never call a run that ended `INCOMPLETE` a pass,** and never re-run with fewer directories, no `.env` files, or `--audit-level critical` until it goes green.
- **Never point `--dir` at a different folder from the one being deployed.**
- **Never add an allowlist, an exception or a weaker pattern to make a finding go away.** Remove the secret from the output. If it was ever published, rotate it.
- **Never treat a masked finding as harmless because it is masked.** The real value is in the build output.
- **Never pass `--expect` the answer the URL happens to give.** It states what the URL is meant to be.
- **Never describe this gate as making the system secure.** Say what it checked.
- **Never commit a real credential to test the script.** Use fake values in a scratch directory outside the repo.
