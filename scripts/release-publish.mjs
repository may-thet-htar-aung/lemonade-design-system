// npm run release:publish -- <version> [--dry-run]
// npm run release:publish -- --smoke <version>     (only smoke-test the registry copy)
//
// The one way this package is published. It re-runs every gate, refuses a version
// that is already on the registry, lifts "private": true for the publish and nothing
// else, publishes, tags, then installs the published copy into an empty folder and
// renders components from it. Dependency-free. Never reads or prints the npm token:
// npm resolves auth from its own config.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pkgPath = join(root, 'package.json');
const win = process.platform === 'win32';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const smokeOnly = args.includes('--smoke');
const version = args.find((a) => !a.startsWith('--'));

const fail = (msg, code = 1) => {
  console.error(`\nrelease:publish refused: ${msg}`);
  process.exit(code);
};

if (!version || !/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(version)) {
  fail('give a version, e.g. npm run release:publish -- 0.1.0 --dry-run');
}

// --- the private guard: restore it on every way out, before anything can change it ---
const original = readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(original);
const spec = `${pkg.name}@${version}`;

function restoreGuard() {
  try {
    if (readFileSync(pkgPath, 'utf8') !== original) writeFileSync(pkgPath, original);
  } catch (err) {
    console.error(`\n!!! COULD NOT RESTORE "private": true in package.json: ${err.message}`);
    console.error('!!! Restore it by hand now: git checkout package.json');
  }
}
// finally does not run when something calls process.exit(), so the restore is
// registered on exit (which does), on SIGINT and the other ways a run is killed.
process.on('exit', restoreGuard);
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK']) {
  try {
    process.on(sig, () => {
      restoreGuard();
      process.exit(130);
    });
  } catch {
    // a signal this platform does not have
  }
}
process.on('uncaughtException', (err) => {
  console.error(err);
  restoreGuard();
  process.exit(1);
});

const run = (cmd, cmdArgs, opts = {}) =>
  spawnSync(cmd, cmdArgs, { cwd: root, encoding: 'utf8', shell: win, ...opts });

const gate = (name, cmd, cmdArgs) => {
  console.log(`\n── gate: ${name}`);
  const r = run(cmd, cmdArgs, { stdio: 'inherit' });
  if (r.status !== 0) fail(`gate "${name}" failed`);
};

const onRegistry = () => {
  const r = run('npm', ['view', spec, 'version']);
  if (r.status === 0 && r.stdout.trim() === version) return true;
  if (r.status !== 0 && /E404/.test(`${r.stderr}${r.stdout}`)) return false;
  fail(`could not tell whether ${spec} is on the registry (npm view said: ${(r.stderr || '').split('\n')[0]})`);
};

// --- smoke test: install into an empty folder and render from it ---
function smoke(installSpec, label) {
  console.log(`\n── smoke test: ${label}`);
  const dir = mkdtempSync(join(tmpdir(), 'lemonade-smoke-'));
  try {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'smoke', private: true, type: 'module' }));
    const inst = run('npm', ['install', installSpec, 'react@^19', 'react-dom@^19', '--no-audit', '--no-fund'], {
      cwd: dir,
      stdio: 'inherit',
    });
    if (inst.status !== 0) fail('smoke test: install failed');

    const test = `
import { createElement } from 'react';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { IconButton, StatusBadge } from '${pkg.name}';
const require = createRequire(import.meta.url);
const cjs = require('${pkg.name}');
const check = (ok, what) => { if (!ok) { console.error('smoke test failed: ' + what); process.exit(1); } };
const badge = renderToString(createElement(StatusBadge, { Status: 'Found' }));
check(badge.includes('Found'), 'StatusBadge (ESM) did not render its status');
check(renderToString(createElement(cjs.StatusBadge, { Status: 'Lost' })).includes('Lost'), 'StatusBadge (CJS) did not render its status');
check(renderToString(createElement(IconButton, { 'aria-label': 'Smoke test' })).includes('<svg'), 'IconButton did not render its icon artwork');
for (const css of ['styles.css', 'tokens.css']) check(existsSync('node_modules/${pkg.name}/dist/' + css), css + ' is not in the package');
console.log('smoke test ok: StatusBadge renders from ESM and CJS, IconButton renders its icon; styles.css and tokens.css present');
`;
    writeFileSync(join(dir, 'smoke.mjs'), test);
    const r = run('node', ['smoke.mjs'], { cwd: dir, stdio: 'inherit' });
    if (r.status !== 0) fail('smoke test: render failed');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (smokeOnly) {
  if (!onRegistry()) fail(`${spec} is not on the registry yet`, 2);
  smoke(spec, `${spec} from the registry`);
  process.exit(0);
}

// --- gates, every time ---
if (pkg.private !== true) fail('package.json has no "private": true guard. Put it back and run again.');
if (pkg.version !== version) {
  fail(`package.json says ${pkg.version}, you asked for ${version}. Bump the version by pull request first, so the tag lands on the commit that carries it.`);
}
if (run('git', ['rev-parse', '-q', '--verify', `refs/tags/v${version}`]).status === 0) {
  fail(`tag v${version} already exists`);
}
gate('build:package (tokens → library → CSS)', 'npm', ['run', 'build:package']);
gate('test (typecheck, token verification)', 'npm', ['test']);
gate('security-check', 'node', ['scripts/security-check.mjs']);
for (const f of ['dist/index.mjs', 'dist/index.js', 'dist/index.d.ts', 'dist/styles.css', 'dist/tokens.css']) {
  if (!existsSync(join(root, f))) fail(`${f} is missing after the build`);
}

console.log(`\n── registry: is ${spec} already published?`);
if (onRegistry()) fail(`${spec} is already on the registry`);
console.log('not on the registry');

// A local tarball is smoke-tested before anything is published, so a broken package never goes out.
const tmp = mkdtempSync(join(tmpdir(), 'lemonade-pack-'));
try {
  const packed = run('npm', ['pack', '--pack-destination', tmp, '--json']);
  if (packed.status !== 0) fail('npm pack failed');
  const tarball = join(tmp, JSON.parse(packed.stdout)[0].filename);
  smoke(tarball, 'the packed tarball');
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// --- publish: lift the guard for this command only, put it straight back ---
const lifted = original.replace(/^[ \t]*"private":[ \t]*true,?[ \t]*\r?\n/m, '');
if (lifted === original) fail('could not find the "private": true line to lift');
console.log(`\n── ${dryRun ? 'npm publish --dry-run' : 'npm publish'} (guard lifted for this command only)`);
writeFileSync(pkgPath, lifted);
const pub = run('npm', dryRun ? ['publish', '--dry-run'] : ['publish'], { stdio: 'inherit' });
restoreGuard();
if (readFileSync(pkgPath, 'utf8') !== original) fail('"private": true was not restored. Run git checkout package.json.');
console.log('"private": true restored');
if (pub.status !== 0) fail('npm publish failed. Nothing was tagged. If the error is E403, run npm token list and check that the token is granular.');

if (dryRun) {
  console.log(`\nDry run complete: ${spec} passed every gate and nothing was published or tagged.`);
  process.exit(0);
}

// --- tag, then verify the registry copy ---
// No shell here: on Windows it would split the message at the space.
const tag = run('git', ['tag', '-a', `v${version}`, '-m', `Release ${version}`], { shell: false });
if (tag.status !== 0) console.error(`published, but tagging failed: ${tag.stderr}. Tag by hand: git tag -a v${version}`);
else console.log(`tagged v${version} (not pushed: git push origin v${version})`);

console.log(`\n── waiting for ${spec} to appear on the registry`);
let visible = false;
for (let i = 0; i < 18 && !visible; i++) {
  visible = onRegistry();
  if (!visible) spawnSync(process.execPath, ['-e', 'setTimeout(()=>{},10000)']);
}
if (!visible) {
  console.error(`\n${spec} was published but is not visible on the registry yet. Do NOT publish again.`);
  console.error(`Wait, then run: npm run release:publish -- --smoke ${version}`);
  process.exit(2);
}
smoke(spec, `${spec} from the registry`);
console.log(`\nReleased ${spec}.`);
