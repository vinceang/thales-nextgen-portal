# DESIGN_CHANGES.md

Running log of every decision made while building the app that **deviates from,
extends, or refines** a rule in `CLAUDE.md` — tokens, component behavior, layout,
typography, spacing, or any hard rule. The designer reads this to sync changes
back into the canonical Thales NextGen Portal Design System.

Per the Design System Sync Protocol, these are **not** unilateral rule changes —
each is logged here for the designer to ratify (or reject) upstream. Entries are
append-only; do not delete or truncate.

Each entry is logged as it happens, in this format:

```
### [date] [file or page affected]
**Rule/token changed:** ...
**Was:** ...
**Now:** ...
**Why:** ...
```

---

### 2026-06-27 portal/src/shell/AppShell.tsx (NavBar usage)
**Rule/token changed:** Layout rules — "Sticky top nav bar (logo / hamburger left …)"
**Was:** NavBar shows the airline logo at the inline-start, beside the hamburger (per comp 01).
**Now:** App renders the NavBar with no logo (the `logo` prop is omitted); the Thales mark moved to a footer.
**Why:** Designer asked to remove the logo from the header.

---

### 2026-06-27 portal/src/shell/Footer.tsx (app shell)
**Rule/token changed:** Component inventory — there is no Footer component in the system.
**Was:** The design system ships no footer; the app shell was NavBar + SideDrawer + content slot only.
**Now:** Added a centered, token-driven footer (small Thales mark, legal links, copyright) to the app shell, rendered on every route. Links sit muted (`--text-secondary`) and go bright-blue on hover (the system's one-accent hover convention).
**Why:** Designer asked for a footer and for the Thales mark to live there instead of the header.

---

### 2026-06-27 portal/src/index.css (Search component)
**Rule/token changed:** Component behavior — Search field (`<input type="search">`).
**Was:** No rule about the browser's native search-clear control; Chrome paints its own `::-webkit-search-cancel-button`.
**Now:** App-level global CSS hides `::-webkit-search-cancel-button` / `-decoration` so only the Search component's own custom clear (×) shows. No component internals were edited.
**Why:** Chrome rendered a duplicate native × next to the component's clear button.

---

### 2026-06-27 components/media/ShowcaseTile.jsx
**Rule/token changed:** Typography roles — "Noto Serif = tile/card titles."
**Was:** ShowcaseTile titles defaulted to Noto Serif Display (`--font-tile`).
**Now:** Title font is prominence-driven: a tile clearly larger than its neighbours (heuristic `titleSize ≥ 30` or `height ≥ 300`) renders in Playfair (`display`); every other tile renders in Montserrat (`sans`). Noto Serif is opt-in via `titleFont="tile"`. (Already ratified into `CLAUDE.md` typography rules.)
**Why:** Designer wanted ordinary tiles in Montserrat and large/featured tiles in Playfair.

---

### 2026-06-27 components/media/ShowcaseTile.jsx
**Rule/token changed:** Component behavior — ShowcaseTile font configurability.
**Was:** Only a single `font` prop ("tile" | "sans" | "display") controlled the title; the kicker font was fixed (Montserrat).
**Now:** Added per-tile overrides: `titleFont` / `kickerFont` (font role) and `titleStyle` / `kickerStyle` (arbitrary style). Legacy `font` / `serif` still work.
**Why:** Designer wanted tiles to accept inputs that override kicker and title font styles.

---

### 2026-06-27 components/media/ShowcaseTile.jsx
**Rule/token changed:** Typography weight — tile title presets.
**Was:** `display` and `sans` title presets used font-weight 700 (`tile` was 600).
**Now:** All three title font roles use font-weight 600 systematically.
**Why:** Designer asked for a uniform 600 weight on tile titles.

---

### 2026-06-27 components/core/Icon.jsx + components/navigation/NavBar.jsx
**Rule/token changed:** Component behavior — NavBar affordances; Icon glyph set.
**Was:** Icon set had no `home` glyph; NavBar's left side was hamburger + optional logo only.
**Now:** Added a `home` glyph to the Icon set and a standard built-in Home button to the NavBar (to the right of the hamburger), wired via a new `onHome` handler prop. The button is always rendered (like search/Wi-Fi/profile).
**Why:** Designer wanted Home to be a default affordance baked into the design system.

---

### 2026-06-27 components/navigation/SideDrawer.jsx
**Rule/token changed:** Layout — SideDrawer nav list inline alignment.
**Was:** Nav items used a fixed 28px inline-start padding; the flight tracker sat offset to the right of the close button, so the two did not align.
**Now:** When a FlightTracker is present, the nav items left-align with the tracker's origin code (inset = header padding + close-button width + gap, via named constants). Falls back to 28px when no tracker.
**Why:** Designer wanted the nav items left-aligned with the flight tracker's "LAX".

---

### 2026-06-27 portal/src/pages/Showcase.tsx
**Rule/token changed:** Layout — Showcase category filter row.
**Was:** Comp 01 renders the GenrePill filter row left-aligned (`justify-content: flex-start`).
**Now:** The pill row is centered (`justify-content: center`).
**Why:** Designer asked to center the nav/pill group.

---

### 2026-06-27 components/media/HeroBanner.jsx
**Rule/token changed:** Component behavior / convention — "UPPERCASE button labels"; chevrons are a standalone-Link affordance, not a Button one.
**Was:** HeroBanner's CTA was a plain filled Button label with no chevron; the system reserves the chevron (`arrow`) for standalone action Links.
**Now:** Added a `ctaArrow` prop that appends a trailing chevron-right Icon inside the CTA Button (mirrors the Link `arrow` pattern). Opt-in; default off.
**Why:** Designer chose the "WATCH ›" CTA style for the hero carousel, which puts a chevron on the hero button.

---

### 2026-06-27 portal/src/pages/Showcase.tsx
**Rule/token changed:** Content/behavior — comp 01 hero CTA spec ("CTA routes to Connect/Plans").
**Was:** Every promo's CTA read "View Plans" and routed to /connect regardless of the promo's content.
**Now:** The CTA label and destination are derived from each promo's kicker (Watch → "Watch ›" → /watch, Listen → /listen, Connect → /connect, Destination → "Forecast ›" → /weather).
**Why:** Designer wanted each carousel CTA to match its card content and route to the matching page.

---

### 2026-06-27 portal/src/pages/Showcase.tsx (Showcase v2)
**Rule/token changed:** Layout — Showcase composition; v1 interactive features.
**Was:** v1 Showcase used a hand-rolled flex hero with a rotating CarouselDots carousel, a centered GenrePill filter row, Skeleton loading states, and TileGrid "Featured"/"Destinations" rows.
**Now:** Rebuilt as ONE `BentoGrid` (4 named rows: hero+rail, four tiles, feature+WeatherTile, four tiles) per the `ui_kits/portal/ShowcaseScreen.jsx` reference. The carousel/dots, genre-pill filter, and skeletons were dropped (the bento hub is a fixed editorial composition, not a filterable grid). Adds a `WeatherTile` panel.
**Why:** Designer asked to rebuild the Showcase using BentoGrid (the configurable bento hub), matching the reference implementation.

---

### 2026-06-27 components/media/ShowcaseTile.d.ts + components/media/HeroBanner.d.ts
**Rule/token changed:** Type signature — `height` prop.
**Was:** `height?: number` (px only) on both ShowcaseTile and HeroBanner, though the components already apply the value directly as a CSS height.
**Now:** Widened to `height?: number | string` so a tile/banner can fill its grid cell with `height="100%"` (the reference's aspect-ratio pattern). No runtime change; types now match behavior.
**Why:** The BentoGrid reference sizes tiles via an aspect-ratio wrapper + `height="100%"`, which the px-only type rejected.

---

### 2026-06-27 portal/src/pages/Showcase.tsx (Showcase v2 — tablet rail)
**Rule/token changed:** Layout — Showcase bento rail region (vs the `ui_kits/portal/ShowcaseScreen.jsx` reference).
**Was:** The reference models the two row-1 promos as ONE `rail` region (a flex column of two tiles). On tablet the reference spans it full width (`"rail rail"`), so the two promos stack into full-width ultra-wide letterboxes (not 2:1).
**Now:** Split the rail into two first-class cells `r1`/`r2`. Desktop: hero spans 2 rows with `r1`/`r2` stacked in the right 4 cols (hero fills via `aspectRatio + height:100%`, so cell bottoms align with the hero). Tablet: `"r1 r2"` places them side-by-side, each keeping its 2:1 aspect. Phone: stacked. No design-system component change — Showcase page only.
**Why:** Designer asked that on tablet the two promo cells stay 2:1 and occupy two columns beneath the hero, instead of stretching full-width.

---

### 2026-06-28 portal/src/pages/Connect.tsx (Connect/Plans header)
**Rule/token changed:** Token usage — header type sizes & blurb color vs the `PlansScreen.jsx` reference's literals.
**Was:** The reference (and the page-build spec) hard-code the editorial header: title `fontSize: 60`, blurb `fontSize: 17` and `color: rgba(255,255,255,0.82)`.
**Now:** Used tokens: title `var(--fs-h1)` (= 60px desktop, fluid down on mobile), blurb `var(--fs-body)` (≈18px desktop, fluid) and `var(--on-surface-2)` (which IS `rgba(255,255,255,0.82)`). Bold emphasis span uses `var(--color-white)`.
**Why:** CLAUDE rule — all colors/sizes from tokens, no hard-coded values; fluid `--fs-*` also gives the mobile down-scaling the phone mockup shows. (Visual delta: blurb 17→18px desktop; otherwise identical.)

---

### 2026-06-28 portal/src/pages/Connect.tsx (Connect/Plans header layout)
**Rule/token changed:** Layout — responsive editorial header (vs the reference's raw CSS grid).
**Was:** `PlansScreen.jsx` lays the split header out as a plain CSS grid (`1.2fr 1fr`), relying on the ui-kit's external `.plans-head` CSS to stack it on phone.
**Now:** Built the header with `BentoGrid` (regions `title`/`blurb`): desktop & tablet `1.2fr 1fr`, phone single-column stack — responsive without a hand-rolled media query.
**Why:** CLAUDE rule — compose layout with TileGrid/BentoGrid, never hand-rolled grid + media queries.

---

### 2026-06-28 tokens/spacing.css + components/domain/PlanCard.jsx
**Rule/token changed:** New responsive spacing tokens; PlanCard inner padding.
**Was:** PlanCard's inner content padding was hard-coded `32px 28px 28px` (28 is off the unit-of-8 grid; not responsive).
**Now:** Added `--pad-card-block` / `--pad-card-inline` — `clamp()` tokens fluid over 480→1200px, endpoints on the 8-grid (block 24→48px, inline 16→24px). PlanCard now uses `paddingBlock: var(--pad-card-block)` / `paddingInline: var(--pad-card-inline)` (logical, RTL-safe). Desktop 48/24, phone 24/16.
**Why:** Designer specified card padding 48/24 desktop clamping to 24/16 phone, everything divisible by 8. (Design-system change — synced to the app copy; flag for upstream ratification.)

---

### 2026-06-28 portal/src/pages/Connect.tsx (hero padding)
**Rule/token changed:** Spacing — Connect editorial header / page gutters.
**Was:** Page wrapper padding `40px 24px 64px`; header bottom margin `var(--space-xl)` (48px).
**Now:** Page wrapper `var(--space-2xl) var(--space-md)` (64/24); header `marginBlock: var(--space-md) var(--space-2xl)` (24 top / 64 bottom) — more vertical breathing room around the hero section. All values ÷8.
**Why:** Designer asked for more padding in the hero section.

---

### 2026-06-28 portal/src/pages/Connect.tsx (plan grid order)
**Rule/token changed:** Layout — plan grid (TileGrid → BentoGrid) + phone ordering.
**Was:** Plan grid was `TileGrid columns={3} phone={1}`, stacking on phone in source order (Messaging → Browsing → High-Speed), so the cheapest plan sat on top.
**Now:** Plan grid is a `BentoGrid` with areas derived from plan ids: desktop/tablet 3-up in source order; **phone tier reverses the areas** so the highest-value plan (High-Speed Streaming) is on top. PlanCards fill cells via `height:100%` to equalize heights. No media query.
**Why:** Designer asked that when the layout stacks to one column, plans reverse so the highest-value plan gets top visual hierarchy.

---

### 2026-06-28 Styling architecture — inline styles → CSS Modules (CANONICAL, ADR 0002)
**Rule/token changed:** How components are styled (sitewide). Now canonical — `CLAUDE.md` updated, `docs/adr/0002-styling-css-modules-tokens.md` added.
**Was:** Every component styled with inline `style={{…}}` objects; states emulated in JS (`onMouseEnter/Leave`); responsive via runtime-injected `<style>` tags.
**Now:** Components author styling as **CSS Modules consuming the same `var(--token)` tokens**. Real pseudo-classes for states; `data-*` for variants/sizes; dynamic per-instance values pass through CSS custom properties via a minimal `style`. Tokens unchanged — white-label theming preserved (and deepened: tenants can now cascade-override). **Pilot done:** `components/core/Button.{jsx,module.css}` converted & verified (class-driven, no inline styles, real `:hover`). Remaining 50 components + app shell/pages to migrate in waves.
**Why:** Lead frontend engineer's ruling — inline styles are not acceptable for a production white-label product (no real states, CSP friction, shallow override ceiling). Decided to standardize on CSS Modules + tokens.

---

### 2026-06-28 CSS Modules migration — COMPLETE (all 52 components + app)
**Rule/token changed:** Styling delivery (sitewide, finished); new tokens; `className` on every component.
**Was:** Migration in progress (pilot + early waves).
**Now:** **All 52 design-system components + the app shell/pages are inline-style-free** — presentational styling lives in `Name.module.css` consuming tokens; states are real `:hover`/`:focus-visible`/`:focus-within`/`:disabled`; variants/sizes are `data-*`; dynamic per-instance values (sizes, %, grid templates, knob travel, progress) pass through CSS custom properties. The layout primitives (`BentoGrid`/`TileGrid`) no longer inject a runtime `<style>` — `@media` is static, templates come in as vars. Every component now also accepts a `className` (added to all `.d.ts`).
**New tokens:** `--accent-hover` (color-mix, primary-button hover), `--overlay-backdrop` (rgba 0,0,0,0.7 — Modal/Drawer/SideDrawer scrim), `--pad-card-block` / `--pad-card-inline` (responsive card padding). Removed `PlanCard`'s `box-shadow` (no-shadow rule). Stray white-alpha literals snapped to the nearest `--on-surface-*` token where clean; a few decorative one-offs remain component-local literals (PlanCard gradient, breadcrumb-chevron `0.35`, ShowcaseTile hover `brightness(1.08)`).
**Why:** Complete ADR 0002. Build green throughout; Showcase + Connect verified identical at desktop/tablet/phone. JS bundle ~10kB smaller; CSS ~22kB (static, cacheable, CSP-clean).

---
