#!/usr/bin/env node
// Checks every internal link in the built site (dist/) points at a file that exists.
// Run after `npm run build`. Exits 1 on any broken internal link. Dependency-free.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const html = walk(DIST).filter((f) => f.endsWith('.html'));
const broken = [];
let checked = 0;
const exists = (url) => {
  const clean = decodeURI(url.split('#')[0].split('?')[0]);
  if (clean === '' ) return true;
  const p = join(DIST, clean);
  return (existsSync(p) && statSync(p).isFile()) || existsSync(join(p, 'index.html')) || existsSync(p + '.html');
};
for (const f of html) {
  const page = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    let u = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|data:|javascript:|#)/.test(u) || u.startsWith('//')) continue;
    if (!u.startsWith('/')) u = new URL(u, 'http://x' + page).pathname;
    checked++;
    if (!exists(u)) broken.push(`${page} -> ${m[1]}`);
  }
}
console.log(`pages ${html.length} · internal links checked ${checked} · broken ${broken.length}`);
for (const b of [...new Set(broken)]) console.log('BROKEN ' + b);
process.exit(broken.length || !html.length ? 1 : 0);
