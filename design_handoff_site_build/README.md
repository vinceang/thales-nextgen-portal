# Handoff: Thales NextGen Portal — Site Build

## Overview
This package contains the **Thales NextGen In‑Flight Wi‑Fi Portal design system** — a complete, branded React component library plus its design tokens and brand assets. The goal of the next phase is to **stand up a real React application and build out the portal site** on top of this system.

## ⚠️ Read this first — what kind of files these are
Unlike a typical design handoff, **these are not throwaway HTML mockups**. They are **real, production‑shaped React source files**:

- Every component is an ES module (`export function Button(...)`) that does `import React from "react"` and imports siblings with normal relative paths (`import { Icon } from "../core/Icon.jsx"`).
- Styling is **inline style objects driven by CSS custom properties** (design tokens). There is **no CSS‑in‑JS library, no Tailwind, no build‑time styling step** — just React + CSS variables.
- This means the components can be dropped into a standard Vite/Next React project **almost as‑is**. The main work is scaffolding the app, wiring fonts + tokens globally, and building pages — *not* rewriting components.

**The task is therefore "scaffold an app and assemble these components into pages," not "recreate mockups from scratch."**

## Fidelity
**High‑fidelity.** Colors, typography, spacing, radii, motion, and interaction states are all final and encoded as tokens. Reproduce the system exactly; do not re‑interpret the visual language. A branded deployment customizes the look **only** by overriding token values (see *Theming / white‑label* below), never by editing component internals.

---

## What's in this package
This handoff is delivered as **the whole design‑system project**. The canonical, ready‑to‑use source lives at the **project root**; the `design_handoff_site_build/` folder holds just this guide and reference docs.

```
<project root>
  components/            ← 51 React components in 9 groups (THE LIBRARY — use this)
    index.js            ← barrel: import everything from one path
    core/  forms/  feedback/  surfaces/  media/
    layout/  data/  domain/  navigation/
      Name.jsx          ← the component
      Name.prompt.md    ← usage guidance, do/don't, examples
  tokens/
    colors.css  typography.css  spacing.css  fonts.css  animation.css
  styles.css            ← entry point that @imports all tokens
  assets/
    logos/              ← Thales + AccuWeather SVG logos
    icons/weather/      ← weather glyph assets
  readme.md             ← the full system readme (conventions, rules, rationale)

  design_handoff_site_build/   ← THIS handoff (docs only, no source duplication)
    README.md                  ← this guide
    CLAUDE.md                  ← drop into your repo root as project memory
    COMPONENT_TYPES.md         ← TypeScript prop signatures for ALL components
    PAGE_COMPS.md              ← guide to the three annotated page comps
    page-comps/                ← hi‑fi page references (live component renders + spec)
      comp.css
      01-showcase.html
      02-connect-plans.html
      03-account-settings.html
```

> The four `components/`, `tokens/`, `styles.css`, `assets/` directories at the root are exactly what you copy into the new app. There is **no** second copy inside the handoff folder (a duplicate component tree would collide in the design tool).

### Deliberately ignore (authoring‑tool only, not for your repo)
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — build artifacts of the authoring environment.
- `*.card.html` (inside `components/**`) — gallery specimen pages that preview each component in the design tool.
- `ui_kits/`, `templates/`, `guidelines/`, `SKILL.md` — authoring‑environment scaffolding.

You do **not** need any of those to build the site — copy only `components/`, `tokens/`, `styles.css`, `assets/`.

---

## Recommended target stack
A plain SPA portal fits **Vite + React + TypeScript**. (If the org standard is Next.js, that works too — the only nuance is marking interactive components with `"use client"`, since these are all client components.)

### Setup steps
1. **Create the app**
   ```bash
   npm create vite@latest portal -- --template react-ts
   cd portal
   ```
2. **Drop the system in.** Copy the project‑root `components/`, `tokens/`, `styles.css`, and `assets/` into `src/design-system/` (and move `assets/` to `public/assets/` so they're served statically — see *Assets* below).
3. **Load fonts + tokens globally.** In `src/main.tsx`:
   ```ts
   import "./design-system/styles.css"; // @imports fonts.css + all tokens
   ```
   `fonts.css` already `@import`s the four families from Google Fonts. For production, consider self‑hosting them (e.g. Fontsource) instead of the CDN `@import` for performance and offline‑on‑aircraft reliability.
4. **Set the app background.** The system assumes a dark canvas. In your global CSS:
   ```css
   html, body, #root { background: var(--bg-page); color: var(--text-primary); margin: 0; }
   ```
5. **(Optional) Path alias.** Add an `@/` alias in `vite.config.ts` + `tsconfig.json` so imports read cleanly.

### Importing components
A barrel (`components/index.js`) is included — import any component from one path:
```tsx
import { Button, DatePicker, DataGrid, NavBar } from "@/design-system/components";
```
Tree‑shaking with the barrel works under Vite's production build. If you prefer, import directly from the file (`.../components/core/Button.jsx`).

### `.jsx` in a TypeScript project
The components are authored as `.jsx`. Two options:
- **Keep them as `.jsx`** — Vite compiles them fine. Set `"allowJs": true` in `tsconfig.json`. Prop signatures for every component are in **`COMPONENT_TYPES.md`** (use it for prop names/types at call sites).
- **Add types as you go** — convert a component to `.tsx` (or drop a sibling `.d.ts`) by folding in the relevant interface from `COMPONENT_TYPES.md`. Not required to ship.

---

## Component inventory (51)
| Group | Components |
|---|---|
| **core** | Avatar, Badge, Button, Chip, GenrePill, Icon, IconButton, Kicker, Link, Spinner |
| **forms** | Checkbox, DatePicker, Input *(the text field)*, Radio *(+ RadioGroup)*, Search, Select, TextArea, Toggle |
| **feedback** | Alert, EmptyState, Popover, ProgressBar, Skeleton, Toast *(+ ToastViewport)*, Tooltip |
| **surfaces** | Card, Drawer, Modal |
| **media** | CarouselDots, HeroBanner, ShowcaseTile |
| **layout** | BentoGrid, TileGrid |
| **data** | DataGrid, DetailItem, MetricTile, Table |
| **domain** | FlightProgress, FlightTracker, NewsItem, PlanCard, WeatherGlyph, WeatherTile |
| **navigation** | Accordion, Breadcrumbs, FilterPanel *(+ FilterSection)*, NavBar *(the header)*, NavigationMenu, Pagination, SideDrawer *(the sidebar)*, Tabs |

Per‑component prop signatures are collected in **`COMPONENT_TYPES.md`**; usage rules and examples live in each `Name.prompt.md`. **Read the `.prompt.md` before using a component** — they encode the system's conventions (e.g. one‑hue status, sharp corners, when to use Chip vs GenrePill).

---

## Design tokens (reference)
All values are CSS custom properties on `:root`. Components read them via `var(--…)`, so the app theme is controlled entirely from `tokens/`.

### Color
| Token | Value | Use |
|---|---|---|
| `--color-bg` / `--bg-page` | `rgb(24,28,33)` | page / app background |
| `--color-black` / `--bg-overlay` | `rgb(0,0,0)` | drawers, overlays, weather tile |
| `--color-surface-2` / `--surface-tile` | `rgb(31,36,42)` | raised tile / nav bar |
| `--color-surface-3` / `--surface-input` | `rgb(42,48,56)` | input fill / hover |
| `--color-highlight-blue` / `--accent` | `rgb(31,153,255)` | primary CTA, active fills |
| `--color-bright-blue` / `--text-emphasis` | `rgb(114,217,251)` | emphasis text, kickers, active links |
| `--color-link-blue` | `rgb(0,136,255)` | in‑body link hover |
| `--color-white` / `--text-primary` | `rgb(255,255,255)` | primary text |
| `--color-grey` / `--text-secondary` | `rgb(97,98,101)` | muted text |
| `--color-border` | `rgba(255,255,255,0.16)` | hairline divider |
| `--color-border-strong` | `rgba(255,255,255,0.32)` | stronger outline |

**One‑hue rule:** the brand has exactly **one accent** (blue) and **no second hue**. Status (`Alert`/`Toast`/`Badge`) is conveyed by **icon + label**, never red/green/amber. Keep it.

### Typography — four families, one role each
- `--font-display` *(Playfair Display)* — big hero / section H1 **only**
- `--font-tile` *(Noto Serif Display)* — cinematic tile / card titles
- `--font-sans` *(Montserrat)* — all UI, body, buttons, labels
- `--font-body-alt` *(Inter)* — body on light surfaces

Serif is **never** used for nav, UI, or body. Sizes are fluid `clamp()` scales (`--fs-h1` 34→60px, `--fs-tile` 22→32px, `--fs-body` 15→18px, etc.) that shrink with the viewport — no per‑breakpoint overrides needed. Weights 300–800; button tracking `0.04em` and UPPERCASE.

### Spacing, shape & motion
- Spacing (unit‑of‑8): `--space-sm` 16 · `--space-md` 24 · `--space-lg` 32 · `--space-xl` 48 · `--space-2xl` 64
- **Radius is 0 everywhere** (`--radius-card`, `--radius-control`). Only pills/dots/toggles round (`--radius-pill` 999px). Depth comes from **surface contrast, never drop shadows** — there are no shadows in the system.
- Motion: `--ease-smooth` `cubic-bezier(0.44,0,0.56,1)`, `--dur-link` `0.3s`. No bouncy/springy motion.
- Breakpoints (design widths): desktop `1200px`, tablet `810px`, phone `390px`. Nav height `64px`.

### Theming / white‑label
This is a **white‑label** system. To re‑skin for a specific airline, override token values only — e.g. set `--radius-card: 12px` and `--radius-control: 8px` to round the skin, or swap `--color-highlight-blue` for the carrier's brand color. **Never** hard‑code colors/radii in components; always go through tokens.

---

## Assets
- **Logos** (`assets/logos/`): `thales-white.svg`, `thales-mono-white.svg`, `thales-dark.svg`, `accuweather-light.svg`, `accuweather-dark.svg`.
- **Weather icons** (`assets/icons/weather/`): glyph set used by `WeatherTile` / `WeatherGlyph`.

Components that need an asset take its **path as a prop** (e.g. `NavBar logo="/assets/logos/thales-white.svg"`, `WeatherTile base="/assets/icons/weather"`) — they do not hard‑code asset URLs. Put `assets/` under `public/` so those paths resolve at the site root, or import the SVGs as modules and pass the resolved URL. The two logo families are licensed brand marks (Thales, AccuWeather) — keep usage within their brand guidelines.

---

## Suggested build order (pages)
Start from the three annotated page comps in `page-comps/` (see `PAGE_COMPS.md`) — they are live component renders with an implementation spec for each section. The library already includes the portal's domain pieces, so building pages is mostly assembly:
1. **App shell** — `NavBar` (header) + `SideDrawer` (slide‑out nav) + routing. `FlightTracker` lives in the drawer; `FlightProgress` is the route hero.
2. **Showcase / home** — comp 01. `HeroBanner` + `TileGrid` of `ShowcaseTile`s, `CarouselDots`, `GenrePill` filter.
3. **Connect / plans** — comp 02. `PlanCard` grid + purchase `Modal` + success `Toast`.
4. **Account / settings** — comp 03. `Tabs` + `Card`‑grouped forms (`Input`, `Select`, `Toggle`, `Radio`, `Checkbox`, `DatePicker`, `TextArea`).
5. **Watch / Listen / News** — `Tabs`/`GenrePill` filtering, `ShowcaseTile` grids, `NewsItem` lists, `EmptyState`, `Skeleton` while loading.
6. **Weather** — `WeatherTile` + `DetailItem`/`MetricTile`.

---

## Files to reference
- `readme.md` (project root) — the full system rationale and conventions (read this early).
- `design_handoff_site_build/PAGE_COMPS.md` + `page-comps/*.html` — annotated hi‑fi page references.
- `components/**/*.prompt.md` — per‑component usage rules.
- `design_handoff_site_build/COMPONENT_TYPES.md` — all component prop types in one file.
- `tokens/*.css` — the single source of truth for all visual values.
