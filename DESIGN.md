# DESIGN.md — Decision Log

This is **not** a second reference (`readme.md` is the reference: tokens, components,
usage). This is the *why* — the provenance, the load-bearing decisions and their
rationale, and the open questions. Its job is to stop a deliberate choice from being
"improved" away in a future session — human or AI.

When a decision here conflicts with something that feels like a quick win, the decision
wins until it's consciously revisited *here*.

---

## Provenance & thesis

This is a recreation of a real product: the **Thales white-label IFE (In-Flight
Entertainment) & Connectivity portal** — the seat-back / BYOD interface airlines
re-brand as their own. It shipped to several carriers, **Spirit Airlines** the primary
customer.

**The thesis of this project is the recreation itself**: rebuilding a shipped product
with AI tools. That has two consequences that shape everything:

1. **White-label is the point, not a feature.** Every visual decision must survive a
   reskin. The system is the constant; the airline's brand is the variable. Anything
   that hard-codes one airline's look is a bug.
2. **Decisions must be legible to the next session.** Each AI session rebuilds from
   what's written down, not from memory. Undocumented intent gets re-litigated (and
   often quietly reversed). This file is the antidote — record intent, not just output.

Colour foundations are anchored to the **Thales Brand Standards** (1 Dec 2015),
§3.3 Colours, pp. 54–55 — see "Light theme" below.

---

## Load-bearing decisions

### 1. Sharp, flat, dark-first
Near-black page (`rgb(24,28,33)`), white default text, flat surfaces, **sharp corners**
by default (radius is opt-in via `--radius-card` / `--radius-control`). Rationale: the
portal runs on seat-back screens and personal devices in a **dark cabin** — a dark UI is
the comfortable default at altitude, and a restrained, sharp treatment reads as
equipment-grade rather than consumer-app trendy. *Don't* round everything or add
elevation/gradients to "modernise" it; the flatness is intentional.

### 2. Exactly one accent hue
Highlight-blue `rgb(31,153,255)` for fills/active; bright-blue `rgb(114,217,251)` for
emphasis text, kickers, active links. Grey only for de-emphasis. Rationale: a single
hue is what makes the white-label reskin a **one-token swap** — introduce a second
brand hue and every airle's rebrand becomes a manual audit. Status/meaning is carried
by icon + text, never by a second colour. *Never introduce a second hue.*

### 3. Light theme **flips the ramp**, it does not invert
`[data-theme="light"]` is a cool daytime skin, not a colour inversion. The neutral ramp
**reverses direction**: dark steps *up* in lightness for raised tiles; light steps
*down* (tinted near-white page `rgb(244,247,250)`, tiles to white, input/hover steps
darker). White-alpha text/borders become **carbon-alpha**. The accent **deepens**
(`rgb(20,115,225)`) to stay legible on white, while `--color-white` is left white for
text on accent fills. Rationale: a literal invert destroys depth cues and produces
muddy, low-contrast surfaces; a hand-tuned ramp keeps the same *spatial* logic in a new
key. Light anchors derive from the **Thales brand palette** (pp. 54–55): Dark Blue
`#242A75`, Blue-Grey light `#DDE4EC`, Carbon light `#C2C6C9` — so the light skin is
brand-grounded, not invented.

### 4. Some overlays stay dark in **both** themes — on purpose
Tooltip, Toast, and image scrims keep their dark treatment under
`data-theme="light"`. Rationale: these are small *over*-content overlays; their
contrast comes from being darker than whatever they float above, which is true in
either theme. **Exception:** the full-bleed nav drawer (Sidebar A) *does* theme —
it's large enough to read as a broken dark slab on an otherwise light page, so it
follows the theme like a surface. The rule is about small transient chrome, not
full-screen surfaces. A light theme is "the page gets light," not "everything
gets light."

### 5. Components theme via semantic aliases — never hard-coded white
Every component reads `--bg-page` / `--surface-tile` / `--text-primary` / `--on-surface*`
/ `--border-hairline` / `--accent`. The `--on-surface*` ramp exists specifically so body
text that used to be `rgba(255,255,255,.x)` can flip to carbon-alpha in light mode.
Rationale: this is what lets a new component theme **for free**. *A literal white in a
component is a theming bug* — the light-mode `NavigationMenu` miss (near-invisible
inactive items) was exactly this, and is why the rule is stated so bluntly.

### 6. Sidebar is one component, two configurable treatments
`Sidebar` ships both white-label nav skins behind a `variant` prop:
- `variant="overlay"` (**A**) — full-height slide-out drawer over a backdrop,
  large single-word items. The white-label *default* skin. **Themed** (follows
  light/dark).
- `variant="rail"` (**B**) — a persistent icon rail pinned to the inline-start
  edge; expanding it **widens the rail in-flow and pushes the content aside**
  (right in LTR, left in RTL) rather than overlaying. Built from logical
  properties so RTL needs no extra code.

The mini `FlightTracker` is an **optional configurable item** in either (`flight`
prop — pass to show, omit to hide), mirroring the original product where it was a
per-airline config switch. Rationale: in the real IFE these were configuration
options, not separate builds — so they belong as one component with a switch,
surfaced as Tweaks in the App Shell. A then overlays (transient, over content);
B pushes (persistent, part of the layout) — that overlay-vs-push split is the
substantive difference between the treatments, not just styling. (The older
overlay-only `SideDrawer` is superseded by `Sidebar variant="overlay"` but kept
for now.)

### 7. FlightTracker is tone-aware
`tone="dark"` (white-alpha, fixed) for the always-black overlay; `tone="theme"` (follows
tokens) for the themed rail. Rationale: the same component sits on two fundamentally
different surfaces — a permanently-black panel and a theme-following rail — so it needs
to know which, rather than guessing from context.

### 8. Navigation is data-driven
Item lists are data (`{ key, label, icon, badge }`), not hard-coded markup, so adding
sections / grouping / overflow doesn't force a layout rewrite.

---

## Open questions (decide before building on them)

- **Breakpoint-exclusive sidebars?** Today the App Shell shows rail B on desktop and
  *also* keeps overlay A reachable via the hamburger. In the original product, was each
  treatment exclusive per breakpoint (rail on large, drawer on small), or could both
  coexist? This changes whether `navVariant` is a true either/or or a responsive pair.
- **RTL.** Several carriers are RTL-market. The system uses logical properties in places
  (`border-inline-end`) but RTL is not yet audited end-to-end (icon mirroring, the
  overlay's slide direction, flight-tracker origin→destination order).
- **White-label `--brand-*` layer.** Light theme + Sidebar A/B are the first
  configurable axes. The full reskin path (promote accent + key surfaces to overridable
  `--brand-*` tokens, swap imagery) is intended but not built.

---

## Out of scope (so it's not "missing")

- Real data / live telemetry — all flight numbers, routes, and progress are sample data.
- Auth, payments, and the actual media-streaming layer — this is the design system and
  page templates, not the running portal.
- Airline-specific brand assets beyond the Thales reference palette — those arrive per
  reskin, not in the base system.
