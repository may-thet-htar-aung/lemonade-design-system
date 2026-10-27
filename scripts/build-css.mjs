// Builds dist/styles.css (every component's CSS, inlined from src/styles.css)
// and dist/tokens.css (a copy of build/css/tokens.css). Dependency-free.
// Run after tsup: tsup cleans dist/ first.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const entry = resolve(root, 'src/styles.css');
const tokens = resolve(root, 'build/css/tokens.css');
const out = resolve(root, 'dist');

if (!existsSync(tokens)) {
  console.error('build/css/tokens.css is missing. Run npm run build:tokens first.');
  process.exit(1);
}

const inline = (file) =>
  readFileSync(file, 'utf8').replace(/^@import\s+['"](.+?)['"];?[ \t]*\r?$/gm, (_, rel) => {
    const target = resolve(dirname(file), rel);
    if (!existsSync(target)) {
      console.error(`${file} imports ${rel}, which does not exist.`);
      process.exit(1);
    }
    return `/* ${rel} */\n${inline(target).trim()}\n`;
  });

mkdirSync(out, { recursive: true });
const css = inline(entry);
if (/@import|url\(/.test(css)) {
  console.error('dist/styles.css still has an @import or url(). Inline it or ship the asset.');
  process.exit(1);
}
writeFileSync(resolve(out, 'styles.css'), css);
copyFileSync(tokens, resolve(out, 'tokens.css'));
console.log(`dist/styles.css ${css.length} bytes, dist/tokens.css copied`);
