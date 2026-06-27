---
name: thales-portal-design
description: Use this skill to generate well-branded interfaces and assets for the Thales NextGen In-Flight Wi-Fi Portal — a white-label in-flight entertainment & connectivity UI — for production or throwaway prototypes/mocks. Contains design guidelines, color & type tokens, fonts, the Thales logo, and a full set of React UI-kit components (nav, drawer, bento tiles, plan cards, weather, news).
user-invocable: true
---

# Thales NextGen Portal — design skill

Read `readme.md` first — it is the full design guide (brand, content fundamentals,
visual foundations, iconography) and a file manifest. Then explore the other files.

## What's here
- `styles.css` — global entry point; link this one file to inherit every token & font.
- `tokens/` — colors, typography, spacing/shape/motion as CSS custom properties.
- `assets/logos/` — Thales wordmark (white / dark / mono-white).
- `components/` — React primitives (Button, GenrePill, Icon, NavBar, SideDrawer,
  ShowcaseTile, HeroBanner, WeatherTile, FlightTracker, FlightProgress, NewsItem,
  PlanCard, MetricTile, DetailItem, TileGrid, …). Each has a `.d.ts` (props), a
  `.prompt.md` (what & when), and a directory `@dsCard` HTML.
- `ui_kits/portal/` — interactive click-through of the whole portal (Showcase bento →
  Movies → News → Weather → Connect/Plans → Payment).
- `guidelines/` — foundation specimen cards.

## How to use
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets you need
  (logos, token CSS) out into static HTML files the user can open. Pull real component
  markup from `components/` and `ui_kits/portal/` rather than re-deriving it.
- **Production code**: read the rules here and reference the tokens/components to design
  on-brand. Components reference CSS variables, so linking `styles.css` is enough.

## Non-negotiables
- Near-black base `rgb(24,28,33)`, white text, ONE blue accent (`rgb(31,153,255)` fills /
  `rgb(114,217,251)` emphasis). Never add a second hue.
- Playfair Display + Noto Serif Display for editorial headlines ONLY; Montserrat for all
  UI/body; Inter for body on light surfaces.
- Square corners in this skin (radius 0); pills/dots/toggles are the only rounded
  shapes. Sharpness is white-label-configurable via semantic tokens — build surfaces with
  `var(--radius-card)`, controls with `var(--radius-control)`, pills with
  `var(--radius-pill)`; never hard-code 0 or 999.
- Metrics & dashboards: `MetricTile` (icon · label · value) + `DetailItem` laid out in
  `TileGrid` — the uniform responsive grid. The asymmetric Showcase bento uses
  `BentoGrid` (named `grid-template-areas`, mobile-first). Don't invent new tile shapes or
  bespoke grids. Icons stay in the Lucide-style line set; never mix in a second icon language.
- No drop shadows — depth comes from surface contrast and image scrims. No emoji.
- Author **RTL-ready**: use logical properties (`margin-inline-*`, `inset-inline-*`,
  `text-align:start`), never physical `left`/`right`. Grids (TileGrid/BentoGrid) mirror
  for free; flip only directional glyphs (chevrons, plane). Full RTL is a planned feature.
- Navigation items are a demo set — more sections are coming; keep nav data-driven.
- Media tiles are full-bleed imagery + bottom scrim + bright-blue kicker + serif title.

If invoked with no other guidance, ask what the user wants to build, ask a few focused
questions, then act as an expert designer who outputs on-brand HTML artifacts or
production code as needed.
