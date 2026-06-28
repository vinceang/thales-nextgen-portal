# 0002 — Styling: CSS Modules + design tokens (retire inline styles)

- **Status:** Accepted
- **Date:** 2026-06-28
- **Deciders:** Lead frontend engineer (project owner), app build
- **Supersedes:** the inline-style approach the design system shipped with.

## Context

The design system was generated with a focus on a unified visual system; the
*delivery* of those styles — inline `style={{…}}` objects on every element — was
not scrutinized. It works, and theming is preserved because every value is a
`var(--token)` binding, but inline styling carries real costs we are choosing to
retire now, while the app is young:

- **States are faked in JS.** `:hover`/`:focus`/`:active` can't be expressed
  inline, so components emulate them with `onMouseEnter/onMouseLeave` handlers
  flipping `style` (e.g. `Button`, `Link`, `IconButton`, `Breadcrumbs`). This is
  worse than CSS: no `:focus-visible`, weaker keyboard/touch, render churn, SSR
  hover-flash risk.
- **Responsive is injected at runtime.** Layout primitives inject a `<style>`
  tag with generated ids (`BentoGrid`/`TileGrid`) to get `@media`.
- **CSP.** Inline styles require `style-src 'unsafe-inline'` — a friction point
  for enterprise/airline buyers.
- **Override ceiling.** Inline styles beat author stylesheets, so a white-label
  tenant can only customize as far as the exposed tokens reach; they can't
  cascade-override.

Theming itself is **not** powered by inline styles — it is powered by the CSS
custom-property tokens (see the shipped `[data-theme="light"]` skin). So moving to
classes keeps white-label fully intact and actually deepens it.

## Decision

Author all styling as **CSS Modules that consume the design tokens**. The token
files (`tokens/*.css`) are unchanged.

### Conventions

1. **One module per component:** `Name.jsx` + `Name.module.css`,
   `import s from "./Name.module.css"`.
2. **Tokens only.** Every value is `var(--token)`. No hard-coded colors, sizes,
   radii, or shadows (unchanged rule). If a value is missing, add a token.
3. **Real states.** `:hover` / `:focus-visible` / `:active` / `:disabled` live in
   CSS. Delete the JS hover/focus emulation. (`:focus-visible` rings are a
   welcome a11y upgrade where the inline version had none.)
4. **Variants & sizes** are selected with `data-*` attributes in CSS
   (`.btn[data-variant="primary"]`, `.btn[data-size="lg"]`) — enumerable, no
   className gymnastics.
5. **Dynamic per-instance values flow through CSS variables, not inline styling.**
   A tile height, a progress `width: N%`, a BentoGrid `grid-template-areas` from
   props → set with a minimal `style={{ "--tile-h": h }}` and consume via
   `var(--tile-h)` in the module. This is the *only* sanctioned use of the `style`
   attribute (besides the consumer override seam below). Layout primitives keep
   their `@media` rules **static** in CSS and pass only the prop-derived templates
   in as CSS vars — no more runtime `<style>` injection.
6. **Escape hatches stay.** Components still accept and spread a `style` prop
   (wins over the class) and a `className` (appended), so call sites and tenants
   can override.
7. **Theming unchanged.** Re-skin via token overrides at `:root` /
   `[data-theme="…"]` / a future `[data-tenant="…"]` scope.

### Trade accepted

CSS Modules require a CSS-Modules-capable bundler (Vite handles it natively). The
original "drop raw files into any project, no build" portability is intentionally
given up — this app is the product, and the gains (real states, CSP-clean,
deeper override seam, no runtime style injection) are worth it.

## Consequences

**Positive:** real pseudo-classes & media queries; CSP-clean; tenants can
cascade-override; smaller/cleaner DOM; static, cacheable CSS; tokens still drive
white-label.

**Costs:** a one-time refactor of 51 components + app shell/pages; class names are
build-time hashed (use `data-*` for anything that must be queryable/stable);
`BentoGrid`-style dynamic primitives need the CSS-var template pattern (§5).

## Migration plan

Token files untouched throughout; visual output stays identical (it's a refactor).

1. **Pilot:** `Button` (variants + sizes + hover hack) — proves the pattern.
2. **State-hack components first:** `Link`, `IconButton`, `Button` ✓, form controls.
3. **Remaining components in waves;** then app shell + pages.
4. **Cleanup:** tokenize stray literal values surfaced during conversion (e.g.
   `Button`'s hover colors `rgb(13,130,232)` / `rgba(255,255,255,0.08)`).
5. Keep canonical `components/` and the `portal/src/design-system/` copy in sync
   each wave; verify parity per component.
