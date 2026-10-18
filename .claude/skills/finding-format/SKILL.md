---
name: finding-format
description: The format of a QA finding, which is what QA hands the Engineer when a case fails. Defines its five required parts and the rule that every value is named as a token or a prop, never as a raw value. A finding must be actionable without a follow-up question.
---

# Finding format

A finding is what QA hands the Engineer when a case fails. The Engineer will act on it alone, from the registry, with no chance to ask QA what it meant. If the Engineer would need to ask a question, it is not a finding yet.

Write one finding per failed case, never one finding for several cases. It goes in two places:

- **In the case's Staging Testing row**, in `Expected Results`, using the row format below. The screenshot goes in `Attachment`, or is named in `Context` when it cannot be attached.
- **In `reports/<Component>.md`**, under the case, with all the parts below.

## What goes in `Expected Results`

Every row gets one of these two blocks, exactly as laid out, one line per field. Dates are `dd/mm/yyyy`, the day the case was tested.

**Failed row:**

```
Tested : 18/10/2026
Status : Failed (previously Passed)
Issue Type : Visual
Expected : svg fills the icon box: width and height use --size-icon-xl (Figma node 76:12, get_metadata)
Actual : svg stays 24×24 inside a 32×32 box (computed style, staging)
Fix : Icon.tsx line 53, the width/height regex needs \d+ instead of d+
```

- **Status** gives this row's verdict, and in brackets what it was before this test: `previously Passed`, `previously Failed`, `previously Fixed (To re-test)`, or `first test` when the row is new.
- **Issue Type** is one of `Visual`, `Behaviour`, `Missing case` or `Design gap` (see Type below). A `Design gap` is for the Designer, not the Engineer.
- **Expected** is the part called Expect below, ending with its Source in brackets.
- **Actual** is the part called Saw below.
- **Fix** is Where, plus the fix when it follows directly. It is never a patch.

**Passed row:**

```
Tested : 18/10/2026
Status : This Variant passed.
```

Nothing else goes in a passed row's `Expected Results`.

## The required parts

Every finding has all five parts, in this order. A finding missing any part is not finished.

| Part | What it says | It must |
|---|---|---|
| **Case** | Which case failed | Name the component, the variant combination, the size and the state, exactly as they appear in the row: `Button · secondary · md · hover` |
| **Expect** | What the design specifies | Name the token or the prop the design binds, and give the property: `border-color uses --color-border-default` |
| **Source** | Where that expectation came from | Name the design node and the tool that showed it: `Figma node 1234:567, get_design_context`. Never the story file |
| **Saw** | What the deployed component actually did | Name the token or prop it actually uses, or say plainly that it uses none, and say how you know: `border-color is transparent: no token applied (computed style, staging)` |
| **Where** | Where in the code the cause lives | Give the file and the rule, prop or line: `Button.css, .button--secondary:hover`. If the cause is missing code, say where it belongs |

Add a **Fix** line only when the fix follows directly from Expect and Where. It is a pointer, not a patch. QA never writes the code.

Add a **Type** line when the failure is not an engineering defect:
- `Type: design gap`: the design leaves the value unbound, so there is no token to expect. Say that the Designer must decide, not the Engineer.
- `Type: behaviour`: the state renders but does not work, for example a disabled button that still fires its click handler. Say what you did and what happened.

## The rule: name the token or the prop

Every value in a finding is named the way the code should name it: a token (`--color-border-default`, `--space-3`) or a prop (`size="md"`, `disabled`).

A raw value, such as `#2F6BFF`, `13px` or `rgba(0,0,0,.4)`, is never the expectation and never the whole observation. The Engineer cannot fix "it should be #2F6BFF", because the component must not contain a hex. It can fix "it should use `--color-action-primary`".

If the only way you can describe what you saw is a raw value, write the raw value and then say which token it fails to match: `Saw 13px, which matches no --space-* token. Expected --space-3 (12px)`. The token still leads.

Words like "off", "wrong", "weird", "too big", "not quite" and "looks different" are not observations. Replace each one with the token, the prop or the measurement.

## A good finding

```
Case    Button · secondary · md · hover
Expect  border-color uses --color-border-default
Source  Figma node 1234:567 (Button / secondary / hover), get_design_context
Saw     border-color is transparent: no token applied (computed style, staging Storybook)
Where   Button.css, .button--secondary:hover sets only background-color
Fix     add border-color: var(--color-border-default) to that rule
```

It works because the Engineer can act on it without asking anything. It names exactly one case. The token in **Expect** is what to use. **Source** says where to check it. **Saw** says what is wrong and that it was measured on the deployed build. **Where** says which rule to open.

## A bad finding

```
Secondary button: the colour looks off on hover, should be #2F6BFF-ish.
See screenshot.
```

It fails on every part:

- **Case is vague.** "Secondary button" does not say which size, so the Engineer does not know which row this is or whether every size is affected.
- **Expect is a raw value, and an approximate one.** "#2F6BFF-ish" is not a token. Writing it into the component would break the token rule, and "-ish" admits the reporter does not know the value.
- **There is no Source.** Nothing says whether the expectation came from the design or from memory, so it cannot be checked.
- **Saw is an impression.** "Looks off" does not say which property failed. It could be the background, the border, the text or the focus ring.
- **There is no Where.** The Engineer has to go and find the cause before it can begin to fix it.
- **"See screenshot" is offered in place of a description.** A screenshot is evidence attached to a finding. It is not the finding itself.

The Engineer's first reply would be a question: "which property, which size, and which token?" That question is the proof that it was not a finding.

## Self-check for every finding

- [ ] The case names component, variant, size and state, and matches exactly one row.
- [ ] **Expect** names a token or a prop.
- [ ] **Source** names the design node, not the story file.
- [ ] **Saw** names the token or prop actually used, or says none was, and was observed on the deployed staging build.
- [ ] **Where** names a file and a rule, prop or line.
- [ ] No raw value stands alone, and none of the words "off", "wrong" or "looks" appears in the finding.
- [ ] A design gap is marked `Type: design gap` and is not addressed to the Engineer.
