# Project Status & Session Context

**Living handoff doc — keep it current.** Read this at the start of every session,
then update the relevant sections when you finish work. Goal: a new session can get
oriented from this one file plus the canonical sources it points to.

_Last updated: 2026-06-27_

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
- Routes **stubbed** (`StubPage`): `/connect` `/watch` `/listen` `/news` `/weather`
  `/account`.

**Design-system refinements made & logged** (see `DESIGN_CHANGES.md`; flagged for
upstream ratification): ShowcaseTile prominence-driven fonts + `titleFont`/`kickerFont`/
`titleStyle`/`kickerStyle` overrides + weight 600; `NavBar` Home button + Icon `home`
glyph + `onHome`; SideDrawer nav alignment; `HeroBanner` `ctaArrow`; `height: number|string`
on ShowcaseTile/HeroBanner.

## 6. Build order (one page per session)

`01 Showcase ✓` → **`02 Connect/Plans` (NEXT)** → `03 Account/Settings` →
`Watch / Listen / News` → `Weather`. Comps + specs: `design_handoff_site_build/page-comps/`.

Per **ADR 0001**, model each page's cell content as a **data array** (not inlined in
JSX) so a future admin tool can populate cells; `contentType` drives kicker/CTA defaults.

## 7. Open items / flags

- **Phone feature-title clipping:** Showcase `ep` tile uses `titleSize={44}`
  ("Orlando's Best: Epcot") which crowds/clips at phone width. Options: fluid `clamp()`
  or smaller phone value. Awaiting decision (logged as a proposed change).
- **Admin tool for bento cells:** deferred (ADR 0001). Follow-up: refactor `Showcase.tsx`
  to an explicit `CellContent[]` shape as the pattern for other pages.
- **Upstream ratification:** the design-system refinements in §5 are app-side until the
  designer syncs them into the canonical design system.

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
