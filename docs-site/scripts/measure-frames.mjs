#!/usr/bin/env node
// Measures every story and docs page the generated component pages embed, in headless Chrome,
// and writes src/data/story-frames.json. generate.mjs turns it into each embed's frame size,
// because the site cannot reach inside a cross-origin Storybook iframe at runtime.
//
//   node scripts/generate.mjs --commit <sha>     (writes the pages, so the embeds are known)
//   node scripts/measure-frames.mjs [--chrome <path>]
//   node scripts/generate.mjs --commit <sha>     (writes the frames from the measurements)
//
// Sizes are stored in rows and columns of the --size-icon-sm token, never in pixels.
// Dependency-free: Node's fetch and WebSocket, and an installed Chrome.

import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const CHROME = args.includes('--chrome') ? args[args.indexOf('--chrome') + 1] : 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const UNIT = 16; // --size-icon-sm, checked against tokens.css below.
const WIDTHS = [672, 600, 328]; // The column at its widest, the live preview's panel, and a phone's.
const NARROW = 600; // Under this a frame uses its narrow rows. The head script in astro.config.mjs holds the same number.
const DOCS_WIDTH = 704; // 44 rows of the unit: a docs page keeps this width and scales down on a phone.
const PAD = 16; // Storybook's own padding around a padded or centred story.
const WORKERS = 6;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const tokens = readFileSync(join(SITE, 'src/styles/tokens.css'), 'utf8');
if (!new RegExp(`--size-icon-sm:\\s*${UNIT}px`).test(tokens)) throw new Error(`--size-icon-sm is no longer ${UNIT}px: update UNIT`);

// What the generated pages embed.
const dir = join(SITE, 'src/content/docs/components');
const embeds = readdirSync(dir).flatMap((f) => [...readFileSync(join(dir, f), 'utf8').matchAll(/data-src="([^"]+)"/g)].map((m) => m[1]))
  .filter((u) => u.includes('/iframe.html'));
if (!embeds.length) throw new Error('no embeds found: run generate.mjs first');
const SB = new URL(embeds[0]).origin;
const ids = (mode) => [...new Set(embeds.filter((u) => u.includes(`viewMode=${mode}`)).map((u) => new URL(u).searchParams.get('id')))];

// ---------- Chrome ----------
const profile = mkdtempSync(join(tmpdir(), 'lds-frames-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
let version;
for (let i = 0; i < 100 && !version; i++) {
  try { version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); } catch { await sleep(200); }
}
if (!version) throw new Error('Chrome did not start');

// Each tab is its own window: a background tab gets no animation frames, so nothing would render.
const open = async () => {
  const b = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { b.onopen = r; b.onerror = j; });
  const targetId = await new Promise((r) => {
    b.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id === 1) r(d.result.targetId); };
    b.send(JSON.stringify({ id: 1, method: 'Target.createTarget', params: { url: 'about:blank', newWindow: true } }));
  });
  b.close();
  const ws = new WebSocket(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let n = 0;
  const pending = new Map();
  const onLoad = new Set();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method === 'Page.loadEventFired') for (const f of onLoad) f();
  };
  const send = (method, params = {}) => new Promise((r) => { const i = ++n; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setScrollbarsHidden', { hidden: true }); // Frames have none, so nothing may wrap for one here.
  return {
    size: (width, height) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }),
    goto: async (url) => {
      const loaded = new Promise((r) => { onLoad.add(r); setTimeout(r, 30000); });
      await send('Page.navigate', { url });
      await loaded;
      onLoad.clear();
    },
    run: async (expression) => {
      const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
      if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description);
      return r.result.result.value;
    },
  };
};

// ---------- measuring ----------
const READY = `(async (root) => {
  for (let i = 0; i < 100; i++) {
    const r = document.querySelector(root);
    if (r && r.children.length && !document.body.classList.contains('sb-show-preparing-story') && !document.body.classList.contains('sb-show-preparing-docs')) break;
    await new Promise((f) => setTimeout(f, 100));
  }
  await document.fonts.ready;
  await new Promise((f) => requestAnimationFrame(() => requestAnimationFrame(f)));
  await new Promise((f) => setTimeout(f, 250));
})`;
const STORY = `(async () => {
  await ${READY}('#storybook-root');
  const root = document.querySelector('#storybook-root');
  let top = 1e9, bottom = -1e9, right = 0;
  for (const e of root.querySelectorAll('*')) { const b = e.getBoundingClientRect(); if (b.width || b.height) { top = Math.min(top, b.top); bottom = Math.max(bottom, b.bottom); right = Math.max(right, b.right); } }
  const c = document.body.classList;
  return { layout: c.contains('sb-main-centered') ? 'centered' : c.contains('sb-main-fullscreen') ? 'fullscreen' : 'padded', top, bottom, right, sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, sb: c.contains('sb-show-errordisplay') ? (document.querySelector('#error-message')?.textContent || 'error').slice(0, 200) : '' };
})()`;
// A dialog overlays its own story: the frame has to hold the open dialog, so open it and read it.
const OPEN_DIALOG = `(async () => {
  document.querySelector('#storybook-root button')?.click();
  await new Promise((f) => setTimeout(f, 400));
  const d = document.querySelector('[role=dialog], [role=alertdialog]');
  return d ? d.getBoundingClientRect().height : 0;
})()`;
const DOCS = `(async () => {
  await ${READY}('#storybook-docs');
  await new Promise((f) => setTimeout(f, 1000)); // The primary story settles after the page does.
  // The frame shows only the props table: above it Storybook repeats the title and the primary
  // story, which the page already has, and below it lists every story. No table, no frame.
  const tables = [...document.querySelectorAll('table.docblock-argstable')];
  const top = tables.length ? tables[0].getBoundingClientRect().top + scrollY : 0;
  const bottom = tables.length ? tables[tables.length - 1].getBoundingClientRect().bottom + scrollY : 0;
  const stories = [...document.querySelectorAll('#storybook-docs h2')].find((h) => h.textContent.trim() === 'Stories');
  return { top, bottom, stories: stories ? stories.getBoundingClientRect().top + scrollY : 1e9, height: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, dialogs: document.querySelectorAll('[role=dialog], [role=alertdialog]').length };
})()`;

const stories = {};
const docs = {};
const heightOf = (m) => Math.max(m.sh, m.layout === 'fullscreen' ? m.bottom : m.layout === 'centered' ? m.bottom - m.top + 2 * PAD : m.bottom + PAD);
// The width a story needs, counting content that scrolls inside its own wrapper, as Table's does.
const needOf = (m) => Math.max(m.sw, Math.ceil(m.right) + (m.layout === 'fullscreen' ? 0 : PAD));
const rowsOf = (h) => Math.ceil(h / UNIT);
const url = (id, mode) => `${SB}/iframe.html?id=${id}&viewMode=${mode}`;
const storyQueue = ids('story');
// Every docs page, from the index: one with no props table has no embed on its page.
const sbIndex = await (await fetch(`${SB}/index.json`)).json();
const docsQueue = Object.values(sbIndex.entries).filter((e) => e.type === 'docs').map((e) => e.id);
const worker = async () => {
  const t = await open();
  while (storyQueue.length) {
    const id = storyQueue.shift();
    const seen = [];
    // The viewport is shorter than any story, so scrollHeight reads what the story needs, not the viewport.
    // A failed module fetch shows Storybook's error screen until the next load, so it gets three tries.
    const at = async (width) => {
      await t.size(width, 40);
      let m;
      for (let i = 0; i < 3 && !(m && !m.sb); i++) { await t.goto(url(id, 'story')); m = await t.run(STORY); }
      seen.push({ ...m, width });
    };
    for (const w of WIDTHS) await at(w);
    if (seen.some((m) => m.sb)) throw new Error(`${id}: Storybook shows an error: ${seen.find((m) => m.sb).sb}`);
    // Wider than some column it sits in: it lays out at its own width and scales down there.
    const wide = Math.max(0, ...seen.filter((m) => needOf(m) > m.width).map(needOf));
    if (wide) await at(wide);
    const fits = seen.filter((m) => needOf(m) <= m.width);
    const big = fits.filter((m) => m.width >= NARROW);
    const small = fits.filter((m) => m.width < NARROW);
    let height = Math.max(...(big.length ? big : fits).map(heightOf));
    const narrow = small.length ? Math.max(height, ...small.map(heightOf)) : height;
    if (id.includes('dialog-box')) {
      await t.size(WIDTHS[1], 900);
      await t.goto(url(id, 'story'));
      await t.run(STORY);
      height = Math.max(height, (await t.run(OPEN_DIALOG)) + 2 * PAD);
    }
    stories[id] = { rows: rowsOf(height), ...(rowsOf(narrow) > rowsOf(height) && !id.includes('dialog-box') ? { narrow: rowsOf(narrow) } : {}), ...(wide ? { cols: Math.ceil(wide / UNIT) } : {}) };
  }
  while (docsQueue.length) {
    const id = docsQueue.shift();
    await t.size(DOCS_WIDTH, 2400); // As tall as the frames, so the page lays out as it does embedded.
    await t.goto(url(id, 'docs'));
    const m = await t.run(DOCS);
    const skip = Math.floor((m.top - PAD) / UNIT);
    docs[id] = m.bottom ? { skip, rows: Math.min(Math.ceil((m.bottom + PAD) / UNIT), Math.floor((m.stories - 2 * PAD) / UNIT)) - skip, cols: Math.ceil(DOCS_WIDTH / UNIT), dialogs: m.dialogs, overflow: m.sw > DOCS_WIDTH } : { table: false, dialogs: m.dialogs };
  }
};
try {
  await Promise.all(Array.from({ length: WORKERS }, worker));
} finally {
  chrome.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold it */ }
}
const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(join(SITE, 'src/data/story-frames.json'), JSON.stringify({
  storybook: SB, unit: '--size-icon-sm', stories: sorted(stories), docs: sorted(docs),
}, null, 2) + '\n');
console.log(`measured ${Object.keys(stories).length} stories, ${Object.keys(docs).length} docs pages`);
process.exit(0);
