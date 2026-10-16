#!/usr/bin/env node
// Security check for the Lemonade design system. No dependencies.
// What it covers and what it does not: .claude/skills/security-check/SKILL.md
//
// Static mode (run from the repo root):
//   node scripts/security-check.mjs [--dir <path>]... [--env-file <path>]... [--registry <path>] [--audit-level high]
// Live mode:
//   node scripts/security-check.mjs --live <url> --expect public|protected
//
// Exit codes: 0 every check passed · 1 at least one check failed · 2 a check could not run.
// A check that could not run never counts as a pass.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, resolve } from 'node:path';
import { execSync } from 'node:child_process';

// ---------- arguments ----------

const argv = process.argv.slice(2);
const args = { dir: [], envFile: [], registry: '.claude/registry.local.json', auditLevel: 'high', live: null, expect: null };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => {
    const v = argv[++i];
    if (v === undefined) usage(`${a} needs a value`);
    return v;
  };
  if (a === '--dir') args.dir.push(next());
  else if (a === '--env-file') args.envFile.push(next());
  else if (a === '--registry') args.registry = next();
  else if (a === '--audit-level') args.auditLevel = next();
  else if (a === '--live') args.live = next();
  else if (a === '--expect') args.expect = next();
  else usage(`unknown argument ${a}`);
}

function usage(msg) {
  console.error(`security-check: ${msg}
  static: node scripts/security-check.mjs [--dir <path>]... [--env-file <path>]... [--registry <path>] [--audit-level low|moderate|high|critical]
  live:   node scripts/security-check.mjs --live <url> --expect public|protected`);
  process.exit(2);
}

if (args.live && !['public', 'protected'].includes(args.expect)) usage('--live needs --expect public or --expect protected');
if (!args.live && args.expect) usage('--expect only applies with --live');
if (!['low', 'moderate', 'high', 'critical'].includes(args.auditLevel)) usage('--audit-level must be low, moderate, high or critical');

// ---------- patterns ----------
// Provider-specific formats only. No entropy guessing: a match here has a known shape.

const CREDENTIALS = [
  ['AWS access key ID', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{36,255}\b/g],
  ['GitHub fine-grained token', /\bgithub_pat_[A-Za-z0-9_]{82}\b/g],
  ['Airtable personal access token', /\bpat[A-Za-z0-9]{14}\.[a-f0-9]{64}\b/g],
  ['Figma personal access token', /\bfigd_[A-Za-z0-9_-]{40,}/g],
  ['npm access token', /\bnpm_[A-Za-z0-9]{36}\b/g],
  ['Stripe live secret key', /\b(?:sk|rk)_live_[A-Za-z0-9]{24,}\b/g],
  ['Slack token', /\bxox[abposr]-[A-Za-z0-9-]{10,}/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['Anthropic API key', /\bsk-ant-[A-Za-z0-9_-]{20,}/g],
  ['OpenAI project key', /\bsk-proj-[A-Za-z0-9_-]{20,}/g],
  ['Private key block', /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY(?: BLOCK)?-----/g],
];

// Airtable base, table, field, view and record IDs. At least one digit, which keeps
// ordinary camelCase words such as "applicationName" from matching.
const AIRTABLE_ID = /\b(?:app|tbl|fld|viw|rec)(?=[A-Za-z0-9]{0,13}[0-9])[A-Za-z0-9]{14}\b/g;

// Environment names that only exist on a build machine. Three or more in one client file
// means a whole process.env object was inlined into the bundle.
const MACHINE_ENV_NAMES = ['PATH', 'HOME', 'USERPROFILE', 'APPDATA', 'COMPUTERNAME', 'USERNAME', 'HOMEPATH', 'SystemRoot', 'npm_config_cache', 'npm_lifecycle_event', 'PWD', 'SHELL', 'VERCEL_GIT_COMMIT_SHA', 'VERCEL_TOKEN'];

// Prefixes that bundlers expose to the client on purpose.
const PUBLIC_ENV_PREFIXES = ['PUBLIC_', 'VITE_', 'STORYBOOK_', 'NEXT_PUBLIC_'];

const CLIENT_EXT = new Set(['.js', '.mjs', '.cjs', '.html', '.htm', '.map', '.json']);
const MAX_FILE = 20 * 1024 * 1024;

// ---------- helpers ----------

const results = [];
function report(name, status, findings = [], note = '') {
  results.push({ name, status, findings, note });
}

function mask(s) {
  if (s.length <= 12) return s.slice(0, 3) + '…';
  return `${s.slice(0, 6)}…${s.slice(-4)} (${s.length} chars)`;
}

function lineOf(text, index) {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(p, out);
    } else if (entry.isFile()) out.push(p);
  }
  return out;
}

function readText(path) {
  const st = statSync(path);
  if (st.size > MAX_FILE) return null;
  const buf = readFileSync(path);
  if (buf.subarray(0, 8192).includes(0)) return null; // binary
  return buf.toString('utf8');
}

function scanCredentials(label, text, findings) {
  for (const [provider, re] of CREDENTIALS) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) findings.push(`${label}:${lineOf(text, m.index)}  ${provider}  ${mask(m[0])}`);
  }
}

function scanIdentifiers(label, text, privateValues, findings) {
  AIRTABLE_ID.lastIndex = 0;
  for (const m of text.matchAll(AIRTABLE_ID)) findings.push(`${label}:${lineOf(text, m.index)}  Airtable ID  ${mask(m[0])}`);
  for (const v of privateValues) {
    let i = text.indexOf(v);
    while (i !== -1) {
      findings.push(`${label}:${lineOf(text, i)}  value from the registry config  ${mask(v)}`);
      i = text.indexOf(v, i + v.length);
    }
  }
}

function scanEnvLeak(label, text, secretEnv, findings) {
  for (const [name, value] of secretEnv) {
    const i = text.indexOf(value);
    if (i !== -1) findings.push(`${label}:${lineOf(text, i)}  value of non-public env var ${name}  ${mask(value)}`);
  }
  const present = MACHINE_ENV_NAMES.filter((n) => new RegExp(`["']?\\b${n}\\b["']?\\s*:\\s*["']`).test(text));
  if (present.length >= 3) findings.push(`${label}  whole environment inlined (keys: ${present.join(', ')})`);
}

function registryValues(path) {
  if (!existsSync(path)) return { values: [], missing: true };
  const values = [];
  const visit = (v) => {
    if (typeof v === 'string') {
      if (v.length >= 8 && !/X{6,}/.test(v)) values.push(v);
    } else if (v && typeof v === 'object') Object.values(v).forEach(visit);
  };
  visit(JSON.parse(readFileSync(path, 'utf8')));
  return { values, missing: false };
}

function parseEnvFile(path) {
  const out = [];
  for (const raw of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    out.push([m[1], value]);
  }
  return out;
}

// ---------- static mode ----------

function staticMode() {
  const defaults = ['build', 'dist', 'storybook-static', 'site/dist'];
  const dirs = args.dir.length ? args.dir : defaults.filter((d) => existsSync(d));
  const missingDirs = dirs.filter((d) => !existsSync(d));

  const files = [];
  for (const d of dirs.filter((d) => existsSync(d))) {
    for (const f of walk(d)) {
      const text = readText(f);
      if (text !== null) files.push({ label: relative(process.cwd(), resolve(f)) || f, path: f, text, client: CLIENT_EXT.has(extname(f).toLowerCase()) });
    }
  }
  const scanned = `${files.length} text files in ${dirs.join(', ') || '(none)'}`;
  const noOutput = dirs.length === 0 || missingDirs.length > 0;
  const noOutputNote = dirs.length === 0 ? 'no build output found (build, dist, storybook-static, site/dist)' : `missing: ${missingDirs.join(', ')}`;

  // 1. Credentials in build output
  {
    const f = [];
    for (const file of files) scanCredentials(file.label, file.text, f);
    if (noOutput) report('Credentials in build output', 'ERROR', [], noOutputNote);
    else report('Credentials in build output', f.length ? 'FAIL' : 'PASS', f, scanned);
  }

  // 2. Private identifiers
  {
    const reg = registryValues(args.registry);
    const f = [];
    for (const file of files) scanIdentifiers(file.label, file.text, reg.values, f);
    const note = `${scanned}; ${reg.missing ? `${args.registry} not found, pattern check only` : `${reg.values.length} values from ${args.registry}`}`;
    if (noOutput) report('Private identifiers in build output', 'ERROR', [], noOutputNote);
    else report('Private identifiers in build output', f.length ? 'FAIL' : 'PASS', f, note);
  }

  // 3. Environment leakage into client JS
  {
    const envFiles = args.envFile.length ? args.envFile : readdirSync('.').filter((n) => /^\.env(\..+)?$/.test(n) && !n.endsWith('.example'));
    const missingEnv = envFiles.filter((ef) => !existsSync(ef));
    const secretEnv = [];
    for (const ef of envFiles.filter((ef) => existsSync(ef))) {
      for (const [k, v] of parseEnvFile(ef)) if (!PUBLIC_ENV_PREFIXES.some((p) => k.startsWith(p)) && v.length >= 6) secretEnv.push([k, v]);
    }
    const f = [];
    for (const file of files.filter((x) => x.client)) scanEnvLeak(file.label, file.text, secretEnv, f);
    const note = `${files.filter((x) => x.client).length} client files; ${secretEnv.length} non-public values from ${envFiles.join(', ') || 'no .env files'}`;
    if (noOutput) report('Environment leakage into client JS', 'ERROR', [], noOutputNote);
    else if (missingEnv.length) report('Environment leakage into client JS', 'ERROR', [], `env file not found: ${missingEnv.join(', ')}`);
    else report('Environment leakage into client JS', f.length ? 'FAIL' : 'PASS', f, note);
  }

  // 4. Dependency advisories
  {
    let out;
    try {
      out = execSync('npm audit --json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      out = e.stdout; // npm audit exits non-zero when it finds advisories
    }
    try {
      const data = JSON.parse(out);
      if (data.error) throw new Error(data.error.summary || 'npm audit error');
      const v = data.metadata.vulnerabilities;
      const order = ['low', 'moderate', 'high', 'critical'];
      const counted = order.slice(order.indexOf(args.auditLevel));
      const f = [];
      for (const [name, info] of Object.entries(data.vulnerabilities || {})) {
        if (counted.includes(info.severity)) f.push(`${name}  ${info.severity}  ${info.isDirect ? 'direct' : 'transitive'}`);
      }
      const note = `${order.map((s) => `${s} ${v[s] ?? 0}`).join(', ')}; failing at ${args.auditLevel} and above`;
      report('Dependency advisories', f.length ? 'FAIL' : 'PASS', f, note);
    } catch (e) {
      report('Dependency advisories', 'ERROR', [], `npm audit could not run: ${e.message.split('\n')[0]}`);
    }
  }

  // 5. Dirty working tree
  {
    try {
      const out = execSync('git status --porcelain', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      const f = out.split('\n').filter(Boolean);
      report('Clean working tree', f.length ? 'FAIL' : 'PASS', f, f.length ? 'uncommitted or untracked files: what ships would not match a commit' : '');
    } catch (e) {
      report('Clean working tree', 'ERROR', [], `git status could not run: ${e.message.split('\n')[0]}`);
    }
  }

  print('static');
}


// ---------- live mode ----------

const PROTECTION_MARKERS = [/Authentication Required/i, /vercel\.com\/sso-api/i, /_vercel_sso_nonce/i, /<input[^>]+type=["']?password/i, /Log in to Vercel/i];

async function liveMode() {
  let res, body;
  try {
    res = await fetch(args.live, { redirect: 'manual', headers: { 'user-agent': 'lemonade-security-check' } });
    body = res.status >= 300 && res.status < 400 ? '' : await res.text();
  } catch (e) {
    report(`Live access (${args.expect})`, 'ERROR', [], `could not reach ${args.live}: ${e.cause?.code || e.message}`);
    return print('live');
  }

  const location = res.headers.get('location') || '';
  const redirectsToLogin = res.status >= 300 && res.status < 400 && /login|signin|sso|auth|vercel\.com/i.test(location);
  const loginPage = res.status === 200 && PROTECTION_MARKERS.some((re) => re.test(body));
  const isProtected = res.status === 401 || res.status === 403 || redirectsToLogin || loginPage;
  const isPublic = res.status === 200 && !loginPage;
  const seen = `HTTP ${res.status}${location ? ` → ${location}` : ''}${loginPage ? ' (login page)' : ''}`;

  if (args.expect === 'public') {
    report('Live access (expected public)', isPublic ? 'PASS' : 'FAIL', isPublic ? [] : [`${args.live}  ${seen}: not publicly readable`], seen);
  } else {
    report('Live access (expected protected)', isProtected ? 'PASS' : 'FAIL', isProtected ? [] : [`${args.live}  ${seen}: readable without signing in`], seen);
  }

  // Whatever the expectation, scan what an anonymous visitor actually received.
  if (res.status === 200 && body) {
    const reg = registryValues(args.registry);
    const pages = [{ label: args.live, text: body }];
    const origin = new URL(args.live).origin;
    const scripts = [...body.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => new URL(m[1], args.live)).filter((u) => u.origin === origin).slice(0, 50);
    for (const u of scripts) {
      try {
        const r = await fetch(u, { headers: { 'user-agent': 'lemonade-security-check' } });
        if (r.ok) pages.push({ label: u.href, text: await r.text() });
      } catch { /* an unreachable script is not evidence of a leak */ }
    }
    const f = [];
    for (const p of pages) {
      scanCredentials(p.label, p.text, f);
      scanIdentifiers(p.label, p.text, reg.values, f);
      scanEnvLeak(p.label, p.text, [], f);
    }
    report('Live page and scripts', f.length ? 'FAIL' : 'PASS', f, `${pages.length} documents fetched anonymously`);
  }

  print('live');
}

// ---------- output ----------

function print(mode) {
  console.log(`security-check · ${mode} · ${new Date().toISOString()}`);
  for (const r of results) {
    console.log(`\n[${r.status}] ${r.name}${r.note ? `  (${r.note})` : ''}`);
    for (const f of r.findings) console.log(`   - ${f}`);
  }
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const errored = results.filter((r) => r.status === 'ERROR').length;
  console.log(`\n${results.length} checks · ${results.length - failed - errored} passed · ${failed} failed · ${errored} could not run`);
  console.log(failed ? 'RESULT: FAIL' : errored ? 'RESULT: INCOMPLETE (not a pass)' : 'RESULT: PASS');
  process.exitCode = failed ? 1 : errored ? 2 : 0;
}

if (args.live) await liveMode();
else staticMode();
