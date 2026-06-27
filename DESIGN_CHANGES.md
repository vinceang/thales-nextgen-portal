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
