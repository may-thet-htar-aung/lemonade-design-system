---
name: test-component
description: Test one built component on its deployed staging Storybook against its Figma design node, covering every variant, size and state. Expectations come from the node, never the story file. Covers the measurement techniques that are easy to get wrong: proving fonts loaded, reading computed values, driving states with real input, and matching theme modes before judging a colour.
---

# Test a component

You are proving that a built component matches its design node. **The node is the expectation. The story file is the claim under test.** A component checked against its own stories agrees with itself by construction, and proves nothing.

You test the deployed build at the URL in `Components.Staging Storybook`. You never test a local build. If that cell is empty, there is nothing to test yet.

Most wrong test results do not come from a bad component. They come from a bad measurement: a font that never loaded, a colour judged by eye, a hover state "tested" by reading a class name, a colour compared across two different theme modes. Stages 3 to 6 exist to stop those.

Every stage ends with a check. Do not start the next stage while a check is red.

---

## 1 · Read the node: the expected matrix

Pull the node in `Components.Figma` over the Figma MCP connection before you look at the component:

| Tool | Gives you | Use it for |
|---|---|---|
| `get_metadata` on the component set | Every variant name, and each one's exact width and height | The matrix, and the geometry baseline |
| `get_design_context` | Layout, and the variable bound to each property | Which token each property should carry |
| `get_variable_defs` | The variable → value map, **in the mode the file is open in** | Confirming a binding. Read stage 6 before trusting a value |
| `get_screenshot` | A render of each variant | The visual comparison, and the evidence beside a failure |

Write the expected matrix: one row per variant combination × size × state that the component set contains. For each row, list every property you will measure and its expected token.

**Check:** every row and every expectation came from the node. Nothing came from the story file, the component code, or memory.

## 2 · Reconcile against the stories: the code's claim

Now open the story file, read only, and list the cases its stories cover. Compare the two lists:

- A row in the node with no story is a **missing case**. That is a failure in its own right, recorded on its own row.
- A story with no row in the node is **undocumented**. Report it. Do not quietly drop it, and do not add it to the expected matrix.

The story list never adds to, removes from, or redefines the expected matrix.

**Check:** every difference between the two lists is written down. The expected matrix is unchanged by the comparison.

## 3 · Prove the fonts loaded before measuring anything

Every text width, height, line box and baseline depends on the font. If the design system font did not load, the browser falls back silently. Every text measurement after that is wrong, and wrong in a way that looks like a component bug.

**Do not trust `document.fonts.check()` or `document.fonts.status`.** `check()` returns `true` when no font in the list needs loading, and that includes the case where the family does not exist at all. `status === "loaded"` only means nothing is pending.

Measure instead. Draw the same string in the declared family, and again in a family name that cannot exist. If the widths are identical, the declared font is not being used:

```js
const probe = (family, weight = 400, size = 16) => {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = `${weight} ${size}px "${family}", monospace`;
  return ctx.measureText('Lemonade Design System 0123456789 Wwgjy').width;
};
const declared = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim();
const real  = probe(declared, getComputedStyle(el).fontWeight);
const bogus = probe('ZzNoSuchFont-' + Date.now(), getComputedStyle(el).fontWeight);
({ declared, real, bogus, loaded: Math.abs(real - bogus) > 0.5 });
```

- Use `monospace` as the fallback, so a missing font produces a clearly different width from a proportional design font.
- **Probe every weight the component uses.** Regular can load while Bold falls back.
- **Probe in every typography mode you test.** `[data-typography="burmese"]` swaps the family, so a pass in English proves nothing about Burmese.
- Read the declared family from the element's computed style, not from the token file.

**The probe proves the browser rendered the family. It does not prove the page served it.** If the font is installed on the testing machine, the probe passes even when the page's web font failed to load, and every real user who lacks it sees the fallback. Confirm the page itself loaded the font:

```js
[...document.fonts]
  .filter((f) => f.family.replace(/["']/g, '') === declared)
  .map((f) => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
```

You need at least one entry with `status: "loaded"` for each weight you probed. No entry means the page declares no `@font-face` for that family, so it renders only on machines that happen to have it installed. That is a finding.

If either test fails, stop measuring text. Report it as an environment finding against the deployed page, not against the component's sizing.

**Check:** for every family and weight on the page, `real ≠ bogus` (recorded with both numbers) **and** `document.fonts` holds a `loaded` face for it.

## 4 · Read computed values, not impressions

Open each story directly at `<Staging Storybook>/iframe.html?id=<story-id>&viewMode=story`, so the Storybook chrome is not part of the page you measure.

Read every number from the browser:

```js
const el = document.querySelector('#storybook-root > *');
const r = el.getBoundingClientRect();
const cs = getComputedStyle(el);
({
  width: r.width, height: r.height,
  padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft],
  gap: cs.gap, radius: cs.borderRadius,
  background: cs.backgroundColor, color: cs.color,
  border: [cs.borderTopWidth, cs.borderTopStyle, cs.borderTopColor],
  shadow: cs.boxShadow, opacity: cs.opacity,
  font: [cs.fontFamily, cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing],
});
```

To check **which token** produced a value, read the token itself on the same element, and compare:

```js
getComputedStyle(el).getPropertyValue('--color-bg-brandgreen-idle').trim();
```

Two values matching does not prove the binding is right, because two tokens can share a value today. Where the binding matters, confirm in the CSS that the rule uses `var(--that-token)`.

Rules for the comparison:
- **Never judge by eye.** "Looks the same" is not a measurement. A screenshot is evidence attached to a measurement, not a substitute for one.
- **Measure the right element.** The root of the story may be a wrapper. Measure the element that corresponds to the node's frame.
- **Expect renderer drift in text.** Figma and browsers rasterise text differently. A consistent sub-pixel difference on every case is the renderer. A difference on one case is a finding.
- **A Figma stroke set to inside does not grow the frame.** An inset ring or `box-shadow: inset` in CSS is a faithful translation, not a size bug.

**Check:** every value in your results came from `getComputedStyle` or `getBoundingClientRect` on the deployed page, and each one is written beside its expected token.

## 5 · Drive every state with real input

A state is behaviour. Reading a class name, toggling a pseudo-class in DevTools, or opening a story pinned to `hover` proves only that a style exists, not that a user can reach it.

| State | How to drive it | What proves it |
|---|---|---|
| Hover | Move a real pointer onto the element, then off it | The style applies on enter and clears on leave |
| Focus | Press **Tab** from the element before it | `:focus-visible` styling appears, and `document.activeElement` is the control. A programmatic `.focus()` does not trigger `:focus-visible` and does not count |
| Active / pressed | Press and hold with the pointer, and press Space or Enter | The pressed style appears for both pointer and keyboard |
| Disabled | Click it, press Tab to it, and press Enter or Space on it | The handler does not fire (watch the Storybook actions panel or a console log), and the control is skipped or inert |
| Loading | Click it while loading | The handler does not fire, `aria-busy` is set, and the width does not change between loading and idle |
| Selected / checked / current | Click or press Space to toggle | The visual changes **and** the ARIA state (`aria-selected`, `aria-checked`, `aria-current`) changes with it |
| Error | Trigger it through its prop or input | `aria-invalid` is set, and the message is associated (`aria-describedby`) |

Measure the computed values (stage 4) **while** the real input holds the state, not from a separate pinned story.

**Check:** every state in the matrix was reached with real pointer or keyboard input, and its values were read while it was held.

## 6 · Confirm both sides are in the same theme mode before judging a colour

A colour can only be wrong if both sides are answering in the same mode. Each side can be in a different one without saying so.

**The design side.** `get_variable_defs` returns values for whichever mode the Figma file is currently open in, not the default. Before calling a colour wrong, find out which mode the node's frame uses (light/dark, typography, layout, density), and read the variable in **that** mode. Check every mode of the variable if you cannot tell which one applies. If the browser's value matches any mode of the bound variable, the issue is which mode was compared, not the component.

**The browser side.** The token file switches modes with attributes on an ancestor: `[data-semantic="dark"]`, `[data-typography="burmese"]`, `[data-layout="medium" | "expanded"]`, `[data-density="web" | "back-office"]`. Read the mode in force on the element you measured:

```js
const mode = (a) => el.closest(`[${a}]`)?.getAttribute(a) ?? 'default';
({
  semantic: mode('data-semantic'), typography: mode('data-typography'),
  layout: mode('data-layout'), density: mode('data-density'),
  prefersDark: matchMedia('(prefers-color-scheme: dark)').matches,
});
```

Record that mode beside every colour, spacing and type measurement. Then compare like with like: Figma light against browser default, Figma dark against `data-semantic="dark"`, and so on.

**Check:** every colour finding names the mode on both sides, and they are the same mode.

## 7 · Record the results

- One Staging Testing row per case: variant × size × state. Exactly one `Size` and one `State` per row, with `Passed` or `Failed`. Pass and fail are recorded alike.
- Write every `Failed` row before any `Passed` row.
- Every failure follows `.claude/skills/finding-format/SKILL.md`. In the row, `Expected Results` uses its row format (Tested, Status, and on failures Issue Type, Expected, Actual, Fix). It names the token or prop, never a raw value.
- A value the design left unbound is a **design gap**. Mark it `Type: design gap`. Do not log it against the Engineer.
- Save one screenshot per case to `reports/<Component>/`, and attach it to the row. Where a case fails, save the node's render beside it.
- Write the full matrix, passes and failures both, to `reports/<Component>.md`.

**Check:** the number of rows equals the number of cases in the expected matrix, every row is linked to the component, and nothing in the component's code was changed.

---

## Self-check

- [ ] The expected matrix came from the design node, not the story file.
- [ ] Every case was loaded from the deployed staging URL, not localhost.
- [ ] Fonts were proven loaded, by the declared-vs-bogus measurement and by a `loaded` face in `document.fonts`, for every weight and typography mode used, before any width was reported.
- [ ] Every number came from `getComputedStyle` or `getBoundingClientRect`, not from looking.
- [ ] Every state was driven with real pointer or keyboard input, and measured while held.
- [ ] Every colour comparison names the same theme mode on both sides.
- [ ] Every case has a row, every row is linked, and passes and failures are both recorded.
- [ ] Every failure follows the finding format and names a token or prop.
- [ ] Design gaps are marked as gaps, not as engineering defects.
- [ ] I changed nothing in `src/components/`.

## Never

- **Never build expectations from the story file.**
- **Never trust `document.fonts.check()` or `document.fonts.status`.** Measure, and confirm the page served the face.
- **Never let a font installed on your machine stand in for the web font.**
- **Never report a width, height or text size before the font probe passes.**
- **Never judge a value by eye,** or let a screenshot stand in for a measurement.
- **Never test a state by inspecting a class, forcing a pseudo-class, or opening a pinned story alone.** Use real input.
- **Never use `.focus()` to test focus.** Press Tab.
- **Never call a colour wrong from `get_variable_defs` alone,** or before both sides are confirmed in the same mode.
- **Never re-run a failing case until it passes and record only that run.**
- **Never test a local build** when a staging link exists, and never test at all when it does not.
- **Never fix what you find.**
