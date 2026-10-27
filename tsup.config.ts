import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig } from 'tsup';
import type { Plugin } from 'esbuild';

// Icon.tsx reads its artwork with Vite's import.meta.glob, which esbuild does
// not know. Swap that one call for static imports of the same files, so the
// source stays as Storybook runs it and the bundle holds the same markup.
const iconGlob: Plugin = {
  name: 'icon-svg-glob',
  setup(build) {
    build.onLoad({ filter: /Icon.Icon\.tsx$/ }, (args) => {
      const dir = dirname(args.path);
      const svgs = readdirSync(join(dir, 'svg')).filter((f) => f.endsWith('.svg')).sort();
      const imports = svgs.map((f, i) => `import svg${i} from './svg/${f}';`).join('\n');
      const entries = svgs.map((f, i) => `  './svg/${f}': svg${i},`).join('\n');
      const source = readFileSync(args.path, 'utf8');
      const glob = /const files = import\.meta\.glob[\s\S]*?\}\);/;
      if (!glob.test(source)) throw new Error('Icon.tsx no longer has the import.meta.glob block this plugin replaces');
      return {
        contents: `${imports}\n${source.replace(glob, `const files: Record<string, string> = {\n${entries}\n};`)}`,
        loader: 'tsx',
        resolveDir: dir,
      };
    });
  },
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // Declarations come from tsc (see build:lib): tsup's dts step needs the TypeScript 7 compiler API, which does not exist.
  dts: false,
  clean: true,
  external: ['react', 'react-dom'],
  loader: { '.svg': 'text' },
  esbuildPlugins: [iconGlob],
});
