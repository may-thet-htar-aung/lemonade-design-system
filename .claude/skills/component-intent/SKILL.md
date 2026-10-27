---
name: component-intent
description: Write one component's intent file, src/components/<Name>/<Name>.intent.json, from three sources in a fixed order — the Figma documentation page, the code, then the stories. Every entry names its source. A field with no source stays empty and is listed as a gap, never filled with a plausible sentence.
---

# Component intent

The intent file says what a component is for: when to reach for it, when not to, what each variant means, where it goes, what it goes with, what it needs and what it promises assistive technology. The Release agent gates on it and the docs site prints it as the component's Usage tab. Both trust it, so it must say only what a source says.

Use this for one component at a time, for every component the Doc-generator is asked to cover. Do not use it to write guides, page copy or anything outside the intent file.

## The rule about invention

**Never invent a product rule.** A plausible sentence in these fields is worse than an empty field, because nothing downstream can tell it is wrong. Release reads "Use for the primary action on a page" and clears it; the docs site prints it; a product team follows it. If no source says it, the field stays empty and the gap is listed. An empty field gets fixed. A fluent wrong one does not.

The same goes for tidying. When Figma says it one way, transpose it, do not paraphrase it into something vaguer. "Use one primary button per screen" does not become "Use primary buttons sparingly".

---

## Where it goes

`src/components/<Name>/<Name>.intent.json`, beside the component. One file per component, named after the component folder.

You write this file and nothing else in `src/`. Never touch the component's `.tsx`, `.css` or stories to make them easier to describe.

## The sources, in order

Each field has one source it comes from. Read them in this order and do not fill a field from a later source when its own source is silent.

| Order | Source | How to read it | Fills |
|---|---|---|---|
| 1 | The component's **documentation page in Figma** | The Figma link in `Components.Figma` gives the file. Find the component's documentation page or frame and its **usage region**: when to use, when not to, best practice. `get_metadata` to find it, `get_design_context` and `get_screenshot` to read it | `use_when`, `dont_use_when`, `best_practice`, and any accessibility note it states |
| 2 | The component's **code** | `src/components/<Name>/<Name>.tsx` and `<Name>.css` at the commit you were given | `variant_intent`, `required_tokens`, `a11y` |
| 3 | The component's **stories** | `src/components/<Name>/<Name>.stories.tsx`, and the stories of components that render this one | `placement`, `pairs_with` |

`variant_intent` takes its list of variants from the code (the prop's union type) and its meaning for each from Figma when the documentation page states one. A variant the code has but Figma never explains gets an entry with an empty `intent` and is listed as a gap.

## The file

```json
{
  "component": "Button",
  "figma": "https://www.figma.com/design/<file>?node-id=165-1639",
  "commit": "a1b2c3d",
  "use_when": [
    { "text": "Use one primary button per screen, for the action that moves the flow forward.", "source": "figma:165:2101" }
  ],
  "dont_use_when": [
    { "text": "Don't use a button to navigate to another page.", "alternative": "Link Button", "source": "figma:165:2101" }
  ],
  "best_practice": [
    { "text": "Write the label as a verb.", "source": "figma:165:2101" }
  ],
  "variant_intent": [
    { "prop": "Style", "value": "Primary", "intent": "The single main action on the screen.", "source": "code:src/components/Button/Button.tsx:5 · figma:165:2101" },
    { "prop": "Style", "value": "Ghost", "intent": "", "source": "code:src/components/Button/Button.tsx:5" }
  ],
  "placement": [
    { "text": "Footer of Dialog Box, right-aligned, after the secondary action.", "source": "story:src/components/DialogBox/DialogBox.stories.tsx:Default" }
  ],
  "pairs_with": [
    { "component": "Icon", "how": "IconLeft / IconRight slots", "source": "code:src/components/Button/Button.tsx:2 · story:src/components/Button/Button.stories.tsx:PrimaryIconLeft" }
  ],
  "required_tokens": ["--color-bg-brandgreen-idle", "--border-radius-md"],
  "a11y": [
    { "text": "Renders a native <button> with type=\"button\" by default, so it is in the tab order and activates on Enter and Space.", "source": "code:src/components/Button/Button.tsx:27" }
  ],
  "gaps": [
    { "field": "variant_intent", "detail": "Style=Ghost: the Figma documentation page does not say what Ghost is for." }
  ]
}
```

- **The seven required fields** are `use_when`, `dont_use_when`, `variant_intent`, `placement`, `pairs_with`, `required_tokens` and `a11y`. Every one is present, even when it is an empty array. `best_practice` is an extra the docs site prints in the Usage tab; include it when Figma has one.
- **Every entry carries a `source`.** `figma:<node id>` for the documentation page, `code:<path>:<line>` for code, `story:<path>:<export name>` for a story. Two sources are joined with ` · `.
- **`dont_use_when` names the alternative** when Figma does. Copy the component Figma names, spelled as the registry's `Components` column spells it. If Figma names none, leave `alternative` out. Never supply one yourself.
- **`required_tokens`** is every `var(--…)` the component's CSS uses, read from `<Name>.css` and the CSS of nothing else. Only tokens, no fallbacks.
- **`a11y`** is facts, each tied to the line that makes it true: the element rendered, its role, the ARIA attributes set and when, what keyboard keys do, what is hidden from assistive technology. "Accessible", "follows WCAG" or "screen reader friendly" are not facts. If the code does nothing specific, say exactly that ("Renders a <span> with no role") rather than nothing.
- **`commit`** is the short SHA of the code you read.

## When Figma has no usage region

Leave `use_when` and `dont_use_when` as empty arrays and add one gap for each:

```json
{ "field": "use_when", "detail": "No usage region on the Figma documentation page for Button (checked node 165:2100)." }
```

Name the node you checked, so whoever fixes it knows where you looked. Do not fall back to the component description, the stories or common sense for these two fields.

## Check (must be green before you report)

- [ ] The file is valid JSON at `src/components/<Name>/<Name>.intent.json`.
- [ ] All seven required fields are present.
- [ ] Every entry has a `source`, and every source points at a node, line or story that exists.
- [ ] `use_when`, `dont_use_when` and `best_practice` read as Figma reads, not paraphrased.
- [ ] `variant_intent` has an entry for every value of every variant prop in the code.
- [ ] `required_tokens` equals the set of `var(--…)` names in `<Name>.css`, no more and no fewer.
- [ ] Every empty field and every empty `intent` is in `gaps`.
- [ ] No sentence in the file comes from you rather than a source.
- [ ] Nothing else in `src/` changed.

## What you report when done

```
Intent   Button · 7/7 fields · 14 entries, every one sourced · commit a1b2c3d
Gaps     1: variant_intent Style=Ghost (no meaning on Figma 165:2101)
```

One line per component, then one line per gap: component, field, and what was missing where.

## Never

- **Never invent a product rule,** or fill a field because it would look odd empty.
- **Never paraphrase Figma** into something vaguer or tidier.
- **Never fill `use_when` or `dont_use_when` from anything but Figma's usage region.**
- **Never supply an alternative** Figma did not name.
- **Never write a generic accessibility claim.** State the fact and its line, or nothing.
- **Never edit the component, its CSS or its stories.**
- **Never edit `tokens/` or `build/`.**
