# Thales NextGen In-Flight Wi-Fi Portal — Design System

A white-label in-flight entertainment & connectivity portal that airlines re-brand as
their own. Dark, cinematic, editorial: serif display headlines paired with a clean
sans for UI, sharp (un-rounded) edges, generous spacing, and a single bright-blue
accent on a near-black base.

> **Mood:** Premium, editorial, high-contrast. Restrained neutrals on a dark base,
> with one bright blue reserved for emphasis, active states and primary CTAs.

---

## Sources

This system was reconstructed from materials provided by the project owner. The reader
may not have access to these — they are recorded for provenance:

- **Live prototype (Framer):** `tender-studies-850364.framer.app` (Showcase, Movies,
  News, Weather, Wi-Fi Plans, Payment views; desktop / tablet / phone breakpoints).
- **Case-study PDF:** *Thales NextGen In-Flight Wi-Fi Portal — My Framer Site* (by
  Vincent Ang). 7 pages describing the product, layouts and design approach.
- **Logo:** Thales wordmark SVGs (`HO.PA_BIG.svg`, `HO.PA_BIG.D.svg`).
- **Screens:** showcase / movies / news / weather captures at laptop, tablet (iPad
  Air) and phone (iPhone 13 & 14) widths, plus the slide-out nav drawer frames.

All uploads live in `uploads/`. The portal aligns with the **Thales Core Showcase UI**
so passengers get a familiar experience across entertainment and connectivity.

---

## Products & surfaces

The portal is a single responsive web app with these views, all reachable from one
slide-out side menu:

| View | Purpose |
| --- | --- |
| **Showcase** | Main hub. Configurable, responsive **Bento grid** of feature/promo/service tiles. |
| **Movies** (Watch) | Hero carousel + genre pill filter + poster grid. |
| **News** | Source logos + topic tabs + editorial headline list. |
| **Weather** | Location forecast strip (°F/°C toggle) + weather-news list. |
| **Wi-Fi Plans** (Connect) | Pricing plan cards; recommended plan emphasized. |
| **Payment** | Multiple payment methods + plan summary. |
| **Listen / Read / Shop** | Additional configurable content sections. |

Everything is **white-label**: detailed enough to ship as-is, yet every screen is
re-themable via configuration to match an airline's brand.

---

## CONTENT FUNDAMENTALS

How copy is written across the portal.

- **Voice — editorial, not chatty.** Copy reads like a premium magazine cover, not an
  app. Tiles carry *titles*, not sentences: "Orlando's Best: Epcot", "Explore
  England's Mountains", "Red Moon In Venus". No exclamation marks, no emoji, ever.
- **Kickers label the action.** Each media tile pairs a short ALL-CAPS or small-caps
  **kicker verb** with the title: `CONNECT`, `WATCH`, `LISTEN`, `PLAY`, `READ`,
  `DESTINATION`, `TRAVEL`, `SHOP`. The kicker is the only colored text on the tile
  (bright-blue), set in Montserrat; the title below is the serif.
- **Title case for content, UPPERCASE for controls.** Editorial titles use Title Case
  ("High Speed Internet for $9.99"). Buttons and primary CTAs are UPPERCASE Montserrat
  700 ("VIEW PLANS", "5-DAY FORECAST" appears as a link). Genre/topic filters are
  UPPERCASE ("ALL", "ACTION", "COMEDY", "WORLD", "POLITICS", "BUSINESS").
- **Second person, sparingly.** The passenger is addressed implicitly through
  invitations ("Explore…", "View Plans") rather than "you". Promotional copy is
  benefit-first and concrete: a price ("$9.99"), a place, a named title.
- **Numbers are specific and human.** "79.5° F", "Top 10 Dining in Orlando", "3h 28m"
  flight time, "5-Day Forecast". Ratings use the certification convention: "Rated R".
- **Metadata is terse.** Movie meta: `Rated R · Action, Comedy, Science Fiction`.
  News items: a relative timestamp ("an hour ago", "39 minutes ago") under the
  headline. Weather: day + temp + one-word condition ("Partly Sunny", "Showers").
- **Navigation labels are single words:** Showcase, Connect, Watch, Listen, News,
  Read, Weather, Shop. (Note: the *menu* uses the activity verb — "Watch" — while the
  *view title* uses the content noun — "Movies".)

---

## VISUAL FOUNDATIONS

- **Color.** Near-black page `rgb(24,28,33)`. Default text and icons are **white**
  because the dominant surface is dark. Exactly one accent — **highlight-blue
  `rgb(31,153,255)`** for primary CTA fills and active fills; **bright-blue
  `rgb(114,217,251)`** for emphasis text, kickers and active links. `text-grey
  rgb(97,98,101)` only for de-emphasized labels. Pure black `rgb(0,0,0)` for the
  weather tile and the slide-out drawer. Never introduce a second hue.
- **Light theme (opt-in).** A `[data-theme="light"]` scope flips the system to a
  cool daytime skin without inverting it: the neutral ramp reverses (tinted
  near-white page `rgb(244,247,250)`, tiles to white, hover/input steps *down*),
  white-alpha text/borders become carbon-alpha, and the accent **deepens**
  (`rgb(20,115,225)`) so it stays legible on white — `--color-white` is left white
  for text on accent fills. Light anchors derive from the **Thales brand palette**
  (Dark Blue `#242A75`, Blue-Grey light `#DDE4EC`, Carbon light `#C2C6C9`). The
  always-black overlays (Tooltip, Toast, Drawer, the overlay Sidebar) and image
  scrims stay dark in both themes. Set `data-theme="light"` on `<html>`, `<body>`,
  or any subtree; every component follows because they all read the semantic
  aliases. Build new components against the aliases (`--bg-page`, `--surface-tile`,
  `--text-primary`, `--on-surface*`, `--border-hairline`, `--accent`) — never a
  hard-coded white — so they theme for free.
- **Type.** Editorial dual-serif + functional sans. **Playfair Display** is reserved
  for **big hero / section H1 only** (700, `-0.03em`) — nothing else. **Noto Serif
  Display** for cinematic tile / card titles (600). **Montserrat** for *everything
  functional* — **navigation**, UI, body, labels and buttons. **Inter** for body on
  light surfaces (`#333`). Serif is never used for nav, UI or body. Body is unusually
  airy (line-height up to 2.0).
- **Responsive type — fluid.** Every `--fs-*` token is a `clamp()` that scales between a
  phone min and the desktop max as the viewport grows `480→1200px` (no per-breakpoint
  overrides). UI/body shrink gently (~0.85× on phone, e.g. 16→14); display/hero shrink
  more steeply (e.g. 60→34) so headlines stay on-screen on a phone. Desktop sizes are
  unchanged. Prefer the tokens over hard-coded `px` so components inherit this scaling.
- **Spacing.** Unit-of-8 scale: 16 / 32 / 48 / 64. Grid gaps are 16px; major blocks
  32px; themed sections 48px; outer gutters up to 64px. The layout breathes.
- **Backgrounds & imagery.** Full-bleed photographic imagery is the hero of every
  surface — movie stills, destination photography, product flat-lays. Tiles are
  **full-bleed images with a dark bottom-up gradient scrim** so white serif titles
  stay legible. No illustrations, no patterns, no textures, no decorative gradients
  beyond the functional scrim. Imagery is rich and saturated (cinematic), not B&W or
  desaturated.
- **Shape — sharp.** Corner radius is **0px everywhere** in this default skin. Cards,
  tiles, panels, inputs and the primary buttons are square. The *only* rounded things
  are genre/topic pills, dot carousel indicators, and toggle switches. **White-label:**
  sharpness is a *skin*, not a law — a branded deployment rounds surfaces and controls by
  overriding two semantic tokens: **`--radius-card`** (tiles, cards, panels, images) and
  **`--radius-control`** (buttons, inputs, selects), both defaulting to 0. Build new
  surfaces/controls with these tokens rather than a hard-coded `0`, and use
  `--radius-pill` for pills/dots — never a literal `999`.
- **Depth — flat.** **No drop shadows.** Elevation is communicated purely by surface
  color contrast (dark base vs. black overlay vs. image) and by the scrims. Don't add
  shadows or glows.
- **Borders.** Hairline `1px` white at ~16% opacity for dividers and secondary-button
  outlines. Inactive genre pills use a hairline outline; the active pill is a solid
  highlight-blue fill.
- **Motion.** Restrained. Links and interactive color changes ease with
  `cubic-bezier(0.44,0,0.56,1)` over ~0.3s. Carousels cross-fade / slide; dots mark
  position. The mobile menu slides in from the left over a black panel. No bounces, no
  springy motion, no infinite decorative loops.
- **Hover / press.** Hover: subtle brightness lift on imagery, underline appears on
  in-body links (color shifts to `#0088ff`), nav item turns bright-blue. Press: solid
  fills darken slightly; no scale/shrink tricks.
- **Transparency & blur.** Used only for scrims and the drawer's dim backdrop (black at
  ~70%). No glassmorphism / frosted blur.
- **Layout rules.** Sticky top **nav bar** (logo / hamburger left, centered view title,
  status icons right: search, Wi-Fi, profile). Drawer adds a flight-tracker progress
  strip (origin → plane → destination, e.g. "LAX ✈ MCO · 3h 28m") at its top. On phone
  the bento collapses to a single column and rows stack vertically.
- **Breakpoints.** Three device tiers. The **design width** is the canvas each tier is
  composed on (`--bp-desktop 1200` / `--bp-tablet 810` / `--bp-phone 390`); the
  **collapse range** is where the layout actually reflows via `@media`, set just below
  each design width so a tier holds its layout until clearly outgrown:
  - **Desktop — ≥ 1101px** (design 1200): full bento, 4-up posters, 3-up plans.
  - **Tablet — 561–1100px** (design 810): posters drop to 3-up, news/bento collapse
    toward 1 column, plans stack at ≤ 810.
  - **Phone — ≤ 560px** (design 390): single column throughout, 2-up posters, slide-out
    drawer nav.

  Type is independent of these thresholds: every `--fs-*` token interpolates over the
  fluid range `480→1200px` — at min ≤ 480px (phone), interpolating through tablet, at
  max ≥ 1200px (desktop). Prefer the fluid tokens over per-breakpoint font overrides.
- **Data, metrics & grids.** Stats are shown as **MetricTile**s — a bright-blue line
  icon, an uppercase label, and a large value on the fluid scale, inside a hairline
  border with a transparent fill (sharp via `--radius-card`). Calmer label-over-value
  facts use **DetailItem** (no icon, no border). **Every** tiled layout — metric rows,
  bento, detail rows, card grids — flows through one primitive, **TileGrid**, whose
  per-tier column counts (`columns` / `tablet` / `phone`) snap at the documented
  1100 / 560px breakpoints. Don't hand-roll `grid-template-columns` + media queries per
  page; reach for `TileGrid` so spacing and reflow stay identical system-wide. For the
  **asymmetric** Showcase bento (hero + promo rail + tile rows), use **BentoGrid** — CSS
  named `grid-template-areas`, authored mobile-first: a single-column stack on phone that
  re-places the same named regions into the richer composition on tablet/desktop. Naming
  the regions once and re-mapping them per tier is what makes a white-label rebrand a
  token-and-imagery swap rather than a re-layout.

---

## BIDIRECTIONALITY (RTL)

The original white-label shipped full **right-to-left** support (Arabic, Hebrew). Not
wired in this reconstruction yet, but it is a first-class goal — **author everything
RTL-ready now** so enabling it later is a flip of `dir="rtl"` on the root, not a rebuild:

- **Lean on logical properties, never physical ones.** Use `margin-inline-start` /
  `padding-inline-end` / `inset-inline-start` / `border-inline-*` and `text-align:start`
  — not `left` / `right` / `margin-left`. The layout then mirrors automatically.
- **Grids already mirror.** CSS grid flows along the inline axis, so both layout
  primitives — **TileGrid** and **BentoGrid** — reorder their columns and named areas
  under `dir="rtl"` with no extra work. Keep using them rather than absolute positioning.
- **Flip directional glyphs, keep the rest.** Chevrons, the plane, progress lines and
  any “next/back” affordance must mirror (e.g. `[dir="rtl"] .chev{transform:scaleX(-1)}`);
  logos, the Wi-Fi glyph and weather artwork must **not**. Mark directional icons so the
  flip is targeted.
- **Numerals & time stay LTR** inside an RTL run (flight codes, clocks, temps) — wrap
  them so they don’t reorder.
- **Mirror, don’t translate, motion.** Slide-in drawers and transitions should reverse
  their inline direction under RTL.

When building any new component, prefer the logical-property form by default — that alone
keeps the system RTL-clean as it grows.

---

## ICONOGRAPHY

- **Style:** thin, single-weight **line icons**, white on the dark base, no fills. They
  sit in the nav bar (search / magnifier, Wi-Fi signal, profile/person) and as small
  affordances (chevrons, the hamburger). The Wi-Fi glyph occasionally renders in the
  bright-blue when active (connectivity status). Icons are quiet and utilitarian —
  imagery does the heavy lifting, not icons. **Directional glyphs** (chevrons, the plane,
  “next/back” affordances) must mirror under RTL — see Bidirectionality; logos, Wi-Fi and
  weather artwork must not.
- **Source:** the original is a Framer prototype with no exported icon font. This system
  standardizes on **Lucide** (https://lucide.dev) — a thin, single-weight, open-source
  line set that matches the original's `search`, `wifi`, `user`, `menu`, `chevron`,
  `plane`, `cloud`, `sun`, `cloud-rain` glyphs. **Substitution flagged:** if the airline
  has a licensed icon set, swap Lucide for it; keep the 1.75px single-weight, no-fill
  treatment. Lucide is linked from CDN in components and UI kits.
- **Logos:** the Thales wordmark ships in `assets/logos/` (white, dark, mono-white). The
  accent dot on the "A" is rendered in highlight-blue. Airline branding replaces the
  Thales mark in white-label deployments.
- **No emoji.** None anywhere. Weather conditions use the **AccuWeather colored icon
  set** (see below). Flight status uses a plane glyph.

### Weather icons (the one colored exception)
- The Weather surface uses the **licensed AccuWeather condition set** — 40 colored,
  filled SVG glyphs (sun/cloud/rain/snow/moon artwork with soft gradients). These are
  the *only* colored, multi-tone icons in the system; everything else stays white
  single-weight line work. **Don't recolor, flatten or restyle them.**
- Glyphs are keyed by AccuWeather **numeric code**: **day** `1–32` (1 Sunny, 3 Partly
  Sunny, 6 Mostly Cloudy, 7 Cloudy, 12 Showers, 15 T-Storms, 18 Rain, 22 Snow, 32
  Windy…) and **night** `33–44` (33 Clear, 35 Partly Cloudy, 38 Mostly Cloudy…). Files
  live in `assets/icons/weather/<code>.svg`.
- Render through **`WeatherGlyph`** (`<WeatherGlyph code={1} />`, add `night` to swap a
  day code for its nocturnal twin) or **`WeatherTile`**. `WEATHER_CODES` exports each
  code's label + line-icon fallback; `nightCode(code)` returns the night equivalent. A
  Lucide line icon shows only if a glyph fails to load.
- Attribution: condition artwork is by **AccuWeather** — logo in
  `assets/logos/accuweather-{light,dark}.svg`. Keep the attribution where the set is
  surfaced prominently.

---

## File index

```
styles.css              ← global entry (consumers link THIS). @import lines only.
tokens/
  fonts.css             ← @import of the four Google Fonts
  colors.css            ← base palette + semantic aliases
  typography.css        ← families, weights, scale, tracking, line-heights
  spacing.css           ← spacing, radius, motion, breakpoints, layout
assets/logos/           ← Thales wordmark (white / dark / mono-white) + AccuWeather
assets/icons/weather/   ← AccuWeather condition set, 40 colored SVGs by code
components/             ← reusable React primitives (core, forms, feedback,
                          surfaces, media, layout, data, domain, navigation)
ui_kits/portal/         ← full-screen click-through recreation of the portal
templates/flight/       ← Flight status page — starting point for telemetry screens
templates/app-shell/    ← App Shell — base page skeleton (header + configurable Sidebar + slot)
templates/browse/       ← Browse — entertainment catalogue (tabs + filters + media grid)
templates/detail/       ← Detail — single-title page (backdrop + poster + metadata)
templates/settings/     ← Settings — account & preferences (card-grouped form fields)
guidelines/             ← foundation specimen cards (Design System tab)
SKILL.md                ← Agent-Skills front-matter for download/reuse
readme.md               ← this file
```

### Components
- `components/core/` — **Button**, **IconButton**, **Icon**, **GenrePill**, **Kicker**,
  **Link**, **Chip**, **Avatar**, **Badge**, **Spinner**
- `components/forms/` — **Input** (the text field), **TextArea**, **Select**,
  **Checkbox**, **Radio** (+ **RadioGroup**), **Toggle**, **Search**, **DatePicker**
- `components/feedback/` — **Alert**, **Toast** (+ **ToastViewport**), **Tooltip**,
  **Popover**, **ProgressBar**, **Skeleton**, **EmptyState**
- `components/surfaces/` — **Card** (neutral container), **Modal**, **Drawer** (generic
  edge sheet — the nav drawer is `SideDrawer`)
- `components/media/` — **ShowcaseTile**, **HeroBanner**, **CarouselDots**
- `components/layout/` — **TileGrid** (uniform equal-column grid) and **BentoGrid**
  (asymmetric named-area grid) — the two responsive layout primitives
- `components/data/` — **MetricTile**, **DetailItem**, **Table**, **DataGrid**
- `components/domain/` — **WeatherTile**, **WeatherGlyph** (+ `WEATHER_CODES`,
  `nightCode`), **FlightTracker** (drawer strip), **FlightProgress** (route hero),
  **NewsItem**, **PlanCard**
- `components/navigation/` — **NavBar** (header), **Sidebar** (the configurable
  nav surface — `variant="rail"` compact icon rail / `variant="overlay"` full-height
  black drawer, with an optional mini `FlightTracker`), **SideDrawer** (the original
  overlay-only drawer; `Sidebar variant="overlay"` supersedes it), **Tabs**,
  **Accordion**, **Breadcrumbs**, **Pagination**, **NavigationMenu** (the rail's
  item list), **FilterPanel** (+ **FilterSection**)

**A note on the one-hue rule for feedback.** The brand has exactly one accent and
**no second hue** — so `Alert` / `Toast` / `Badge` convey status through the **icon and
label** (info / check / alert-triangle), never a red/green/amber fill. Errors and
warnings use a white glyph; info/success use the bright-blue glyph. Keep it monochrome +
blue. Status colours are an opt-in white-label extension, not the default skin.

### UI kit
- `ui_kits/portal/` — interactive Showcase → Movies → Connect/Plans click-through.

### Templates
- `templates/app-shell/` — **App Shell**: the base page skeleton — `NavBar`, a
  configurable `Sidebar` (rail A / overlay B) with an optional `FlightTracker`, and a
  themed content slot. Start every new page here. Sidebar treatment and the flight
  tracker are exposed as Tweaks (the white-label switches).
- `templates/browse/` — **Browse**: entertainment catalogue — `Tabs`, a `HeroBanner`,
  a `FilterPanel` rail, and a responsive `TileGrid` of `ShowcaseTile`s.
- `templates/detail/` — **Detail**: single-title page — backdrop, overlapping poster,
  synopsis, `Badge` meta, a `DetailItem` grid, and a related `ShowcaseTile` row.
- `templates/settings/` — **Settings**: account & preferences — section rail +
  `Card`-grouped fields (`Input`, `Select`, `Toggle`) with an Appearance switch that
  drives the theme.
- `templates/flight/` — **Flight** status page: `FlightProgress` route hero, a 4-up
  `TileGrid` of `MetricTile`s (altitude / speed / distance / arrival), and a `DetailItem`
  row (flight / aircraft / gate / total distance). The starting point for any
  flight-status or live-telemetry screen.

### Building a flight / metrics page
Reuse the pieces — don't re-derive them:
1. **Header** — `NavBar` with the view title.
2. **Hero** — `FlightProgress` for a route; for non-route dashboards lead with the most
   important single number or a short status line instead.
3. **Primary metrics** — 4-up `TileGrid` of `MetricTile`s. Icons stay in the Lucide-style
   line set (bright-blue); values ride the fluid scale; corners follow `--radius-card`.
4. **Secondary facts** — a hairline-bordered strip with a `DetailItem` `TileGrid`
   (right-align the trailing item).
Keep it to **one** accent (bright-blue), sharp surfaces (this skin), and no drop shadows.
The same MetricTile + TileGrid pattern covers weather metrics and connectivity stats —
keep those consistent rather than inventing new tile shapes.

---

## Roadmap (intended, not yet built)

Direction from the project owner — keep these in mind so new work stays compatible:

- **Navigation is data-driven and configurable.** The `Sidebar` ships both white-label
  treatments (compact rail A / full overlay drawer B) behind one `variant` prop, with the
  mini `FlightTracker` an optional item in either. Item lists are data-driven (room for
  grouping / overflow) so more sections don't force a redesign.
- **More layout types.** TileGrid (uniform) and BentoGrid (asymmetric) are the first two
  primitives; expect additional layout patterns. Add them as named, reasoned-about
  primitives in `components/layout/` rather than per-page CSS.
- **Full RTL** (see Bidirectionality above) — author logical-property-first until enabled.
- **White-label `--brand-*` layer** — promote accent hue + surfaces to override tokens so
  a reskin (cf. the Spirit rebrand) is a token + imagery swap. Radius is already there
  (`--radius-card` / `--radius-control`); a `[data-theme="light"]` skin and the
  `Sidebar` A/B treatment switch are the first configurable white-label axes in place.

---

## Quick reference

- **BG** dark `rgb(24,28,33)` · **Accent** blue `rgb(31,153,255)` · **Emphasis**
  `rgb(114,217,251)`.
- **Headlines** Playfair Display · **Tile titles** Noto Serif Display · **UI/body**
  Montserrat · **Light-surface body** Inter.
- **Square corners, no shadows, white text, one bold blue accent.**
