// Builds CSS, Swift and Android outputs from the Figma export in ./tokens.
// Never edit ./tokens by hand: every repair lives here as a rule.
const fs = require('fs');
const path = require('path');

const TOKENS_DIR = process.env.TOKENS_DIR || 'tokens';
const BUILD_DIR = process.env.BUILD_DIR || 'build';
const manifest = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'manifest.json'), 'utf8'));

// ---------------------------------------------------------------------------
// Modes, read from the manifest. The first mode listed for a collection is
// its default (:root / base file); every other mode becomes an override.
// ---------------------------------------------------------------------------
const collections = Object.entries(manifest.collections).map(([name, c]) => {
  const modes = Object.entries(c.modes).map(([mode, files]) => ({ mode, files }));
  return { name, defaultMode: modes[0], otherModes: modes.slice(1) };
});
const styleFiles = Object.values(manifest.styles || {}).flat();
const src = (files) => files.map((f) => `${TOKENS_DIR}/${f}`);

const baseSources = src([...collections.flatMap((c) => c.defaultMode.files), ...styleFiles]);
const variants = collections.flatMap((c) =>
  c.otherModes.map((m) => ({
    collection: c.name,
    mode: m.mode,
    // Swap one collection's default file for this mode; keep everything else.
    sources: src([
      ...collections.flatMap((o) => (o.name === c.name ? m.files : o.defaultMode.files)),
      ...styleFiles,
    ]),
  })),
);

// ---------------------------------------------------------------------------
// Preprocessor: repairs value SHAPES before any transform runs.
// ---------------------------------------------------------------------------
const round = (n) => Math.round(n * 1e4) / 1e4; // strips float32 noise (0.4000000059604645)

function repairToken(name, token) {
  const v = token.$value;
  const isDimObj = v && typeof v === 'object' && !Array.isArray(v) && 'unit' in v && 'value' in v;

  // Exported as dimension/px, but they are durations.
  // A string, not a DTCG {value, unit} object: the css group has no rule for
  // duration objects and prints [object Object].
  if (name.startsWith('motion-duration-') && isDimObj) {
    token.$type = 'duration';
    token.$value = `${v.value}ms`;
    return;
  }
  // Exported as dimension/px; z-index is unitless.
  if (name.startsWith('z-index-') && isDimObj) {
    token.$type = 'number';
    token.$value = v.value;
    return;
  }
  // Exported as 8 / 16 / 40 / 60 (percent); CSS and native expect 0-1.
  if (name.startsWith('opacity-') && typeof v === 'number') {
    token.$value = round(v / 100);
    return;
  }
  deepRound(token, '$value');
}

function deepRound(obj, key) {
  const v = obj[key];
  if (typeof v === 'number') obj[key] = round(v);
  else if (v && typeof v === 'object') for (const k of Object.keys(v)) deepRound(v, k);
}

// Typography composites are split into one token per property, keeping each
// sub-value's reference. CSS `font` has no slot for letterSpacing, and the
// built-in `expand` resolves references and mistypes lineHeight as a number.
const TYPOGRAPHY_TYPES = { fontFamily: 'fontFamily', fontWeight: 'fontWeight', fontSize: 'dimension', lineHeight: 'dimension', letterSpacing: 'dimension' };
const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function splitTypography(token) {
  const group = {};
  for (const [prop, value] of Object.entries(token.$value)) {
    group[kebab(prop)] = { $type: TYPOGRAPHY_TYPES[prop] ?? token.$type, $value: value, ...(token.$description && { $description: token.$description }) };
  }
  return group;
}

function walk(node, prefix) {
  for (const [k, child] of Object.entries(node)) {
    if (k.startsWith('$') || !child || typeof child !== 'object') continue;
    const name = prefix ? `${prefix}-${k}` : k;
    if ('$value' in child && child.$type === 'typography') node[k] = splitTypography(child);
    else if ('$value' in child) repairToken(name, child);
    else walk(child, name);
  }
}

// ---------------------------------------------------------------------------
// Value transforms for native: the stock iOS/Android groups assume rem
// (x16). These tokens are px, so px maps 1:1 to pt / dp / sp.
// ---------------------------------------------------------------------------
const pxNumber = (token) => {
  const v = token.$value ?? token.value;
  if (v && typeof v === 'object' && 'value' in v) return v.value;
  return parseFloat(v);
};
const isPxDim = (token) => (token.$type ?? token.type) === 'dimension';
// Uses the path, not token.name: the group's name transform has already run.
const isTextSize = (token) => /^(fontsize|lineheight|letterspacing)-|^(font-size|line-height|letter-spacing)$/.test(token.path.at(-1));

async function main() {
  const { default: StyleDictionary } = await import('style-dictionary');

  StyleDictionary.registerPreprocessor({
    name: 'lemonade/repair-shapes',
    preprocessor: (dictionary) => {
      walk(dictionary, '');
      return dictionary;
    },
  });
  // Not transitive: aliases inherit the target's already-transformed value.
  // (Transitive re-ran on "CGFloat(16)" and produced CGFloat(NaN).)
  StyleDictionary.registerTransform({
    name: 'lemonade/size/swift-px',
    type: 'value',
    filter: isPxDim,
    transform: (t) => `CGFloat(${pxNumber(t)})`,
  });
  StyleDictionary.registerTransform({
    name: 'lemonade/size/android-px',
    type: 'value',
    filter: isPxDim,
    transform: (t) => `${pxNumber(t)}${isTextSize(t) ? 'sp' : 'dp'}`,
  });
  StyleDictionary.registerTransform({
    name: 'lemonade/duration/native-ms',
    type: 'value',
    filter: (t) => (t.$type ?? t.type) === 'duration',
    transform: (t) => String(pxNumber(t)),
  });
  StyleDictionary.registerTransform({
    name: 'lemonade/font-family/swift-string',
    type: 'value',
    filter: (t) => (t.$type ?? t.type) === 'fontFamily',
    transform: (t) => JSON.stringify(t.$value ?? t.value),
  });

  // android/resources maps every `number` to <integer>, which aapt rejects
  // for 0.08. Pick the resource tag from the final value instead.
  StyleDictionary.registerFormat({
    name: 'lemonade/android-resources',
    format: ({ dictionary }) => {
      const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
      const line = (t) => {
        const type = t.$type ?? t.type;
        const v = t.$value ?? t.value;
        if (type === 'color') return `<color name="${t.name}">${v}</color>`;
        if (type === 'dimension') return `<dimen name="${t.name}">${v}</dimen>`;
        if (['number', 'duration', 'fontWeight'].includes(type) && !Number.isInteger(Number(v)))
          return `<item name="${t.name}" format="float" type="dimen">${v}</item>`;
        if (['number', 'duration', 'fontWeight'].includes(type)) return `<integer name="${t.name}">${v}</integer>`;
        return `<string name="${t.name}">${esc(v)}</string>`;
      };
      return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Do not edit directly, this file was auto-generated by build-tokens.js. -->\n<resources>\n${dictionary.allTokens.map((t) => `  ${line(t)}`).join('\n')}\n</resources>\n`;
    },
  });

  const iosTransforms = StyleDictionary.hooks.transformGroups['ios-swift']
    .filter((t) => !t.startsWith('size/'))
    .concat('lemonade/size/swift-px', 'lemonade/duration/native-ms', 'lemonade/font-family/swift-string');
  const androidTransforms = StyleDictionary.hooks.transformGroups['android']
    .filter((t) => !t.startsWith('size/'))
    .concat('lemonade/size/android-px', 'lemonade/duration/native-ms');

  const config = (source) => ({
    source,
    preprocessors: ['lemonade/repair-shapes'],
    log: { verbosity: process.env.SD_VERBOSE ? 'verbose' : 'default' },
    platforms: {
      // Shadows stay a var()-preserving shorthand in CSS; native has no shorthand, so expand them.
      css: { transformGroup: 'css' },
      ios: { transforms: iosTransforms, expand: { include: ['shadow'] } },
      android: { transforms: androidTransforms, expand: { include: ['shadow'] } },
    },
  });

  const resolve = async (source) => {
    const sd = new StyleDictionary(config(source));
    await sd.hasInitialized;
    const out = {};
    for (const p of ['css', 'ios', 'android']) {
      const { allTokens } = await sd.getPlatformTokens(p);
      out[p] = new Map(allTokens.map((t) => [t.name, t]));
    }
    return { sd, tokens: out };
  };

  // A token belongs in a mode block when its RESOLVED value differs from the
  // default. That includes aliases of changed primitives, so the block works
  // on any element, not only on the element that owns :root.
  const diffNames = (base, variant) =>
    new Set([...variant].filter(([n, t]) => JSON.stringify(t.$value ?? t.value) !== JSON.stringify(base.get(n)?.$value ?? base.get(n)?.value)).map(([n]) => n));

  const base = await resolve(baseSources);
  const built = [];
  for (const v of variants) built.push({ ...v, ...(await resolve(v.sources)) });

  fs.rmSync(BUILD_DIR, { recursive: true, force: true });

  // Formats one file in memory; `names` filters to the tokens that differ.
  const format = async (source, platform, fmt, options, names, destination = 'tokens.css') => {
    const cfg = config(source);
    cfg.platforms = {
      [platform]: {
        ...cfg.platforms[platform],
        files: [{ destination, format: fmt, filter: names ? (t) => names.has(t.name) : undefined, options: { showFileHeader: false, ...options } }],
      },
    };
    const sd = new StyleDictionary(cfg);
    const [res] = await sd.formatPlatform(platform);
    return res.output;
  };

  // ---- CSS: one file, :root + one block per non-default mode -------------
  const cssBlocks = [
    '/**\n * Do not edit directly, this file was auto-generated by build-tokens.js.\n */',
    (await format(baseSources, 'css', 'css/variables', { selector: ':root', outputReferences: true })).trim(),
  ];
  for (const v of built) {
    const names = diffNames(base.tokens.css, v.tokens.css);
    if (!names.size) continue;
    cssBlocks.push((await format(v.sources, 'css', 'css/variables', { selector: `[data-${v.collection}="${v.mode}"]`, outputReferences: true }, names)).trim());
  }
  // Mode blocks reference primitives that live in :root (Style Dictionary
  // warns about these "filtered out token references"). Prove they resolve,
  // and that no mode block introduces a name :root does not have.
  const declared = (block) => new Set([...block.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
  const rootNames = declared(cssBlocks[1]);
  for (const block of cssBlocks.slice(2)) {
    const stray = [...declared(block)].filter((n) => !rootNames.has(n));
    if (stray.length) throw new Error(`Mode block declares names missing from :root: ${stray.join(', ')}`);
  }
  const css = cssBlocks.join('\n\n') + '\n';
  const missing = [...new Set([...css.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]))].filter((n) => !rootNames.has(n));
  if (missing.length) throw new Error(`var() references with no :root definition: ${missing.join(', ')}`);
  write(`${BUILD_DIR}/css/tokens.css`, css);

  // ---- Native: base file + one file per non-default mode (diff only) -----
  const emit = async (file, source, platform, fmt, options, names) =>
    write(file, await format(source, platform, fmt, options, names, path.basename(file)));
  const pascal = (s) => s.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
  const snake = (s) => s.replace(/-/g, '_');

  await emit(`${BUILD_DIR}/ios/Tokens.swift`, baseSources, 'ios', 'ios-swift/class.swift', { className: 'Tokens' });
  await emit(`${BUILD_DIR}/android/tokens.xml`, baseSources, 'android', 'lemonade/android-resources', {});
  for (const v of built) {
    const suffix = `${pascal(v.collection)}${pascal(v.mode)}`;
    const ios = diffNames(base.tokens.ios, v.tokens.ios);
    const android = diffNames(base.tokens.android, v.tokens.android);
    if (ios.size) await emit(`${BUILD_DIR}/ios/Tokens${suffix}.swift`, v.sources, 'ios', 'ios-swift/class.swift', { className: `Tokens${suffix}` }, ios);
    if (android.size) await emit(`${BUILD_DIR}/android/tokens_${snake(v.collection)}_${snake(v.mode)}.xml`, v.sources, 'android', 'lemonade/android-resources', {}, android);
  }
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`✔ ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
