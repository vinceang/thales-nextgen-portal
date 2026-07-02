# Project Status & Session Context

**Living handoff doc — keep it current.** Read this at the start of every session,
then update the relevant sections when you finish work. Goal: a new session can get
oriented from this one file plus the canonical sources it points to.

_Last updated: 2026-07-02 (blog CMS + Studio editor, payment flow + connectivity, Play gallery, Weather; favorites phone list view)_

---

## 1. What this repo is

- The **repo root is the Thales NextGen Portal _design system_** (canonical source of
  truth): `components/` (React `.jsx` modules), `tokens/`, `styles.css`, `assets/`,
  plus handoff docs in `design_handoff_site_build/`.
- The **real app is built in `portal/`** (Vite + React + TS + react-router-dom). The
  design system is **vendored** into `portal/src/design-system/` (a copy of root
  `components/` + `tokens/` + `styles.css`); brand assets live in `portal/public/assets/`.
- Components are used as-is and themed only via tokens — never rebuilt or restyled inline.

## 2. How to run & verify

```bash
cd portal
npm install
npm run dev            # dev server
npm run build          # tsc typecheck + vite build — must stay green
```

Visual verification (the Chrome extension is NOT connected in this environment — use
headless system Chrome instead):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1280,1500 --virtual-time-budget=6000 \
  --screenshot=/tmp/out.png "http://localhost:5173/"
```

Breakpoints to check every page: **desktop ≥1101 / tablet 561–1100 / phone ≤560**
(BentoGrid/TileGrid reflow at 1101 & 561px; several pages also swap grid→list at 560).

⚠️ **Phone screenshots:** Chrome's `--window-size=400,…` one-shot renders WIDER than
asked (~500px innerWidth), so a 390px phone looks clipped when it isn't. For an
accurate mobile viewport, drive Chrome via CDP (`--remote-debugging-port=9222
--remote-allow-origins=*`) and `Emulation.setDeviceMetricsOverride({width:390,…})`
then `Page.captureScreenshot`.

## 3. Workflow & rules (READ BEFORE CODING)

1. **Design System Sync Protocol** (root `CLAUDE.md`): the design system is upstream.
   Do **not** change a design rule, token, or component internal unilaterally. When a
   change is needed, flag it as `PROPOSED RULE CHANGE: [what] → [why]` for the designer
   to ratify upstream.
2. **`DESIGN_CHANGES.md`** (repo root, append-only): log **every** deviation from /
   extension of a CLAUDE.md rule **immediately**, before moving on — even if unsure.
   Format: `### [date] [file]` + `Rule/token changed / Was / Now / Why`.
3. **Keep the two design-system copies in sync.** If you edit a root `components/**`
   file (or its `.d.ts` / `.prompt.md`), copy it into `portal/src/design-system/` and
   update `design_handoff_site_build/COMPONENT_TYPES.md` to match.
4. **ADRs** live in `docs/adr/` — read them; add one for architecturally significant
   decisions.
5. **Git:** branch off `main` per page/feature (`feat/<page>`); commit when asked;
   merge back with `--no-ff`; delete the branch after merge. Commit-message trailers per
   `CLAUDE.md`/harness.
6. **Hard design rules** (from `CLAUDE.md`): tokens only (no hard-coded color/size/
   radius/shadow); one blue accent (status via icon+label); sharp corners, no shadows;
   fixed font roles (Playfair = hero/large tiles, Montserrat = UI + ordinary tiles,
   Noto Serif opt-in); logical CSS props (RTL-safe); compose layout with TileGrid /
   BentoGrid (never hand-rolled grid + media queries).
7. **Content seam (ADR 0001).** Every page's data lives in a typed `src/content/<page>.ts`
   module (never inlined in JSX) — the seam a future data source/CMS populates. Every
   user-facing string goes through i18n (`i18n/locales/{en,fr,es}.ts` + `t()`); post/media
   *content* (titles, bodies) stays verbatim, only chrome is translated.

## 4. Start-of-session checklist

- [ ] Read `CLAUDE.md` (rules may have changed — newest version wins).
- [ ] Read `DESIGN_CHANGES.md` (all prior deviations).
- [ ] Read `docs/adr/` (architecture decisions, esp. ADR 0001).
- [ ] Read this file (status + open items).
- [ ] Read the target page's comp in `design_handoff_site_build/page-comps/NN-*.html`
      (+ screenshot) if one exists before building it.

## 5. Current status

**All primary sections are built and merged to `main`.** The app is a full click-through
prototype. Shop is the only stub.

**Shell / providers:** `NavBar` (Home button; Wi-Fi status icon reflects connectivity
and links to plans), hamburger `SideDrawer` (FlightTracker + data-driven nav), `Footer`,
routed `<Outlet>`. Providers in `main.tsx`: `I18nProvider` → `FavoritesProvider` →
`ConnectivityProvider` → `BrowserRouter`.

**Pages (all DONE unless noted):**
- **Showcase (`/`)** — config-driven `BentoGrid`. Tiles are data (`content/showcase.ts`)
  with a typed `action`: media singles open the `MediaDetailModal`, collections/other
  tiles link to a view; the WeatherTile deep-links to the destination's 5-day forecast
  (`/weather?view=forecast`). Media tiles are favoritable.
- **Connect / Plans (`/connect`)** — plan cards → purchase `Modal` hosting the
  **`PaymentForm`** (Visa/MC, **format-only** validation, brand detect, demo-only —
  charges/stores nothing) → on valid submit sets the `ConnectivityProvider` + success
  `Toast`; header shows the connected `Alert`. `content/connect.ts`.
- **Account (`/account`)** — `Tabs`: Profile (form) · **Favorites** (grouped by kind
  Watch/Listen/Read/Play; **poster grid on desktop, stacked `MediaRow` list on phone**) ·
  **Connectivity** (reflects the active plan: success `Alert` + Plan/Price/Status +
  Disconnect; or a "View Plans" prompt) · Billing (placeholder). `content/account.ts`.
- **Watch / Listen / Read (`/watch` `/listen` `/read`)** — galleries: `HeroCarousel`
  (Watch) / `AlbumHero` (Listen/Read) + `GenrePill` filter + grid/list `ViewToggle` +
  `MediaRail` shelves. Clicking a tile/row opens the shared **`MediaDetailModal`**
  (Watch → Overview|Cast, Listen → Overview|Tracklist, Read → Overview|Details). Hearts
  save to favorites. Content seams `content/{watch,listen,read}.ts` (placeholder now;
  **TMDB / catalogue APIs** later, same shape).
- **News (`/news`)** — source rail + topic tabs + editorial headline list. `content/news.ts`.
- **Weather (`/weather`)** — destination hero + city gallery + °F/°C toggle, and a
  **5-Day Forecast** sub-view (deep-linkable via `?view=forecast`) with Doppler-radar
  still + weather-news. Destination is **Orlando** (matches the flight tracker).
  `content/weather.ts`; AccuWeather `WeatherGlyph` icons.
- **Play (`/play`)** — web/HTML5 **games gallery** (Watch layout, landscape 16:9 cells).
  Clicking a game opens the `MediaDetailModal` (Overview|Details) with a **Play** action
  (gameplay stubbed until titles are licensed). Games are favoritable. `content/play.ts`.
- **Destinations / Travel (`/destinations`, `/travel`)** — one **blog engine**
  parameterized by `section`. `content/blog.ts` is a **portable, CMS-shaped model**:
  each `BlogPost` is metadata + a `body` of typed blocks (paragraph/heading/image/quote/
  list). `BlogIndex` (featured hero + card grid) + `BlogArticle` (`/{section}/:slug`:
  cover hero, byline, tags, block body via **`PostBody`**, more-in footer). Showcase
  tiles deep-link to specific articles.
- **Shop (`/shop`)** — onboard **store**: category-pill filter + responsive product
  grid (`ProductCard`). Products (snacks/comfort/tech/duty-free) share the base
  `Product` type with Wi-Fi plans (`content/commerce.ts`) and **check out through the
  same `CheckoutModal` + `PaymentForm`** — one payment flow across the portal, as in the
  original. Buy → checkout → "Order confirmed" toast. `content/shop.ts`. In the sliding nav.
- **Studio (`/studio`)** — in-app **CMS editor**: a structured block editor over the
  `BlogPost` model with live Preview (same `PostBody`) + a drafts list. Persists to
  `localStorage` via `content/blogStore.ts`; drafts merge over the seed in
  `getPosts`/`getPost`, so new posts appear live in their section. Reached via a "Write a
  post" button on each blog index. (English-only admin tool.)
- **Stubbed:** none — every nav section is built. `StubPage` remains only for the
  not-found (`*`) route.

**App-level state (localStorage, provider pattern):** `FavoritesProvider`
(`thales.favorites`, kinds watch/listen/read/**play**), `ConnectivityProvider`
(`thales.connectivity`, active plan → drives header Wi-Fi icon), blog drafts
(`thales.blog.drafts.v1`), locale (`thales.locale`).

**Notable app components (in `portal/src/components/`, compose DS + tokens):**
`MediaDetailModal` (generic `MediaDetail` shape, reused by all 4 galleries + Showcase —
**candidate to promote into the DS**), `PaymentForm`, `blog/PostBody`, `blog/BlogCard`.

## 6. Design-system additions & deviations (all logged in `DESIGN_CHANGES.md`, await upstream ratification)

- **`Modal`** gained subtle open/close motion (backdrop fade + dialog rise/scale;
  reduced-motion safe; timeout-driven exit).
- **New token `--text-reading`** (both themes) for long-form body — used by `PostBody`;
  candidate DS body-reading color.
- **`Icon`** glyphs added: `play`, `chevron-up` (+ `Icon.d.ts` union kept in sync; the
  `.d.ts` had drifted from `Icon.jsx`).
- **`NavBar`** gained `onWifi` (Wi-Fi icon is now actionable).
- **`Input.d.ts` / `Button.d.ts`** now extend native HTML attributes (components already
  spread `...rest`; types were incomplete — unblocks `form`, `inputMode`, `autoComplete`).
- Earlier, still-app-side: ShowcaseTile prominence fonts + overrides; NavBar Home button;
  SideDrawer footer slot + nav alignment; HeroBanner `ctaArrow`; `HeroCarousel` autoplay
  (proposed motion-rule change); `MediaRail`; `FavoriteButton` + `heart` glyph; CSS-Modules
  migration tokens (`--accent-hover`, `--overlay-backdrop`, `--pad-card-*`).

## 7. Open items / follow-ups

- **Shop cart** — checkout is single-item (mirrors the Wi-Fi flow); a multi-item cart
  is a natural follow-up. Product images are placeholder Unsplash.
- **Blog markdown loader (git-CMS story)** — deliberately deferred (Option A). Author
  `.md` + frontmatter → parse to `BlogBlock[]` behind the same `getPosts`/`getPost` seam;
  complements the Studio (localStorage) editor.
- **Real playback / gameplay** — Watch/Listen/Read/Play "Play" actions are placeholders
  (the seam is ready); wire to TMDB/catalogue + actual HTML5 game embedding later.
- **Promote `MediaDetailModal` into the DS** if the designer ratifies it as a domain
  component; likewise ratify `--text-reading` and the `Modal` animation.
- **Studio scope** — seeded posts are read-only (only localStorage drafts are editable);
  cover-image is URL-only (no upload). Extend if fuller CRUD is wanted.
- **Editorial typography** (needs ratifying): blog uses Playfair for article/section
  titles + subheads + pull-quotes (slightly broader display use than "hero H1 only").
- **Connect card order** (pre-existing): mockups show High-Speed Streaming recommended &
  rightmost, and floated to top on phone; build matches desktop order, not the phone float.
- **PlanCard `box-shadow`** (pre-existing): shipped component contradicts "no shadows";
  left as-is, flag upstream.

## 8. Key files

| Purpose | Path |
|---|---|
| Design rules / project memory | `CLAUDE.md` (root) |
| Deviation log (append-only) | `DESIGN_CHANGES.md` (root) |
| Architecture decisions | `docs/adr/` |
| Component prop types | `design_handoff_site_build/COMPONENT_TYPES.md` |
| Page references (comps) | `design_handoff_site_build/page-comps/` |
| App pages / shell | `portal/src/pages/`, `portal/src/shell/` |
| App state providers | `portal/src/{favorites,connectivity,i18n}/` |
| App feature components | `portal/src/components/` |
| Content seams | `portal/src/content/` |
| Vendored design system | `portal/src/design-system/` |
