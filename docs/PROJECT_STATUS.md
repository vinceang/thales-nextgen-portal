# Project Status & Session Context

**Living handoff doc — keep it current.** Read this at the start of every session,
then update the relevant sections when you finish work. Goal: a new session can get
oriented from this one file plus the canonical sources it points to.

_Last updated: 2026-06-28 (i18n / language switcher — EN·FR·ES)_

---

## 1. What this repo is

- The **repo root is the Thales NextGen Portal _design system_** (canonical source of
  truth): `components/` (51 React `.jsx` modules), `tokens/`, `styles.css`, `assets/`,
  plus handoff docs in `design_handoff_site_build/`.
- The **real app is built in `portal/`** (Vite + React + TS + react-router-dom). The
  design system is **vendored** into `portal/src/design-system/` (a copy of root
  `components/` + `tokens/` + `styles.css`); brand assets live in `portal/public/assets/`.
- Components are used as-is and themed only via tokens — never rebuilt or restyled inline.

## 2. How to run & verify

```bash
cd portal
npm install
npm run dev            # dev server (this session used --port 5188)
npm run build          # tsc typecheck + vite build — must stay green
```

Visual verification (the Chrome extension is NOT connected in this environment — use
headless system Chrome instead):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1280,1500 --virtual-time-budget=6000 \
  --screenshot=/tmp/out.png "http://localhost:5188/"
```

Breakpoints to check every page: **desktop ≥1101 / tablet 561–1100 / phone ≤560**
(BentoGrid/TileGrid reflow at 1101 & 561px).

⚠️ **Phone screenshots:** Chrome's `--window-size=400,…` one-shot renders WIDER than
asked (~500px innerWidth), so a 390px phone looks clipped when it isn't. For an
accurate mobile viewport, drive Chrome via CDP (`--remote-debugging-port=9222
--remote-allow-origins=*`) and `Emulation.setDeviceMetricsOverride({width:390,…})`
then `Page.captureScreenshot`. (websocket-client + a short python script; verified the
Connect page this way.)

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

## 4. Start-of-session checklist

- [ ] Read `CLAUDE.md` (rules may have changed — newest version wins).
- [ ] Read `DESIGN_CHANGES.md` (all prior deviations).
- [ ] Read `docs/adr/` (architecture decisions, esp. ADR 0001).
- [ ] Read this file (status + open items).
- [ ] Read the target page's comp in `design_handoff_site_build/page-comps/NN-*.html`
      (+ screenshot) before building it.

## 5. Current status

**On `main`:**
- App scaffold + shell: `NavBar` (with built-in Home button), hamburger `SideDrawer`
  (FlightTracker, nav left-aligned to origin code), `Footer`, routed `<Outlet>`. Nav is
  data-driven from `src/shell/navItems.ts`.
- **Showcase (`/`) — DONE (v2).** One `BentoGrid` (hero + r1/r2 rail · four tiles ·
  feature + WeatherTile · four tiles); reference `ui_kits/portal/ShowcaseScreen.jsx`.
  Verified desktop/tablet/phone, uniform 16px gaps.
- **Connect / Plans (`/connect`) — DONE.** Branch `feat/connect-plans` (not yet merged).
  Breadcrumbs + editorial split header (BentoGrid) + 3 `PlanCard`s (`TileGrid` 3-up,
  stacks on phone) → purchase `Modal` → success `Toast` + `Alert` (header swaps to the
  Alert once connected). Content is in `src/content/connect.ts` (admin-tool seam, ADR 0001).
- Routes still **stubbed** (`StubPage`): `/watch` `/listen` `/news` `/weather` `/account`.

**Design-system refinements made & logged** (see `DESIGN_CHANGES.md`; flagged for
upstream ratification): ShowcaseTile prominence-driven fonts + `titleFont`/`kickerFont`/
`titleStyle`/`kickerStyle` overrides + weight 600; `NavBar` Home button + Icon `home`
glyph + `onHome`; SideDrawer nav alignment; `HeroBanner` `ctaArrow`; `height: number|string`
on ShowcaseTile/HeroBanner.

**CSS Modules migration — COMPLETE (branch `feat/css-modules-styling`, not yet merged).**
Per ADR 0002, all 52 components + app shell/pages are now inline-style-free: styling in
`Name.module.css` consuming tokens, real pseudo-class states, `data-*` variants, dynamic
values via CSS custom properties. New tokens: `--accent-hover`, `--overlay-backdrop`,
`--pad-card-block/inline`. Every component now accepts `className`. When building NEW
components/pages, author `Name.module.css` from the start — never inline styles.

**i18n / language switcher — DONE (branch `feat/i18n-language-switcher`, not yet merged).**
Lightweight custom React context (`portal/src/i18n/`): `I18nProvider` + `useI18n().t()`,
typed dictionaries `locales/{en,fr,es}.ts` (`en` is the `Dict` contract — missing keys in
fr/es fail `tsc`), `{var}` interpolation, localStorage (`thales.locale`) + `<html lang>`
sync, runtime switch (no reload). Segmented **EN · FR · ES** selector
(`shell/LanguageSelector`) lives in a NEW SideDrawer `footer` slot (DS extension — synced
to both copies + `.d.ts`/`.prompt.md`/COMPONENT_TYPES, logged in DESIGN_CHANGES). Translated:
nav, search placeholder, footer, Showcase (hero/tiles/categories/weather), Connect
(header/plans/features/modal/toast/alert). `content/connect.ts` now takes `t` and composes
the same `ConnectContent` shape per locale. **When building NEW pages: put every user-facing
string in `i18n/locales/en.ts` (+ fr/es) and read via `t()` — never hard-code copy.** Verified
via headless-Chrome CDP: EN↔FR switch flips nav/pages, persists, sets `lang`.

## 6. Build order (one page per session)

`01 Showcase ✓` → `02 Connect/Plans ✓` → `i18n / language switcher ✓` →
**`03 Account/Settings` (NEXT, comp 03)** → `Watch / Listen / News` → `Weather`.
Comps + specs: `design_handoff_site_build/page-comps/`.

Per **ADR 0001**, model each page's content as a typed **content module** in
`src/content/<page>.ts` (not inlined in JSX) — the seam a future admin tool populates.
`Connect` follows this (`src/content/connect.ts`, `getConnectContent()`); do the same for
new pages.

## 7. Open items / flags

- **Phone feature-title clipping:** Showcase `ep` tile uses `titleSize={44}`
  ("Orlando's Best: Epcot") which crowds/clips at phone width. Options: fluid `clamp()`
  or smaller phone value. Awaiting decision (logged as a proposed change).
- **Admin tool for bento cells:** deferred (ADR 0001). Follow-up: refactor `Showcase.tsx`
  to an explicit `CellContent[]` shape as the pattern for other pages.
- **Upstream ratification:** the design-system refinements in §5 are app-side until the
  designer syncs them into the canonical design system.
- **Connect — recommended card position:** the written page spec said "middle card
  recommended," but all three provided mockups show **High-Speed Streaming recommended &
  rightmost** ($2 / $4 / $6). Built to match the mockups; flip the data order if "middle"
  was intended.
- **Connect — phone card order:** the phone mockup floats the recommended card to the
  **top**; the build stacks in source order (Messaging, Browsing, High-Speed). Reorder
  needs per-breakpoint ordering (not built — would need CSS `order` or a phone-only sort).
- **PlanCard shadow:** the shipped `components/domain/PlanCard.jsx` has a baked-in
  `box-shadow`, which contradicts the system's "no shadows" rule. Left as-is (used the
  component unmodified); flag to the designer to remove upstream.

## 8. Key files

| Purpose | Path |
|---|---|
| Design rules / project memory | `CLAUDE.md` (root) |
| Deviation log (append-only) | `DESIGN_CHANGES.md` (root) |
| Architecture decisions | `docs/adr/` |
| Component prop types | `design_handoff_site_build/COMPONENT_TYPES.md` |
| Page references (comps) | `design_handoff_site_build/page-comps/` |
| App pages / shell | `portal/src/pages/`, `portal/src/shell/` |
| Vendored design system | `portal/src/design-system/` |
