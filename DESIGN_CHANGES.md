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

### 2026-06-28 components/navigation/SideDrawer.jsx (+ .d.ts, .module.css, .prompt.md)
**Rule/token changed:** Component API — SideDrawer slots.
**Was:** SideDrawer rendered a flight tracker head + a nav list only; no slot for extra controls.
**Now:** Added an optional `footer` prop (ReactNode) rendered in a `.footer` block pinned to the bottom of the panel (`margin-block-start: auto`). Content left-aligns with the nav items (`margin-inline-start: var(--nav-inset)`) and sits under a hairline divider (`border-block-start: var(--border-width) solid var(--border-hairline)`). When omitted the drawer is unchanged. Synced to both the canonical `components/` copy and the vendored `portal/src/design-system/` copy; `.d.ts`, `.prompt.md`, and `COMPONENT_TYPES.md` updated.
**Follow-up (symmetric insets):** the panel's interior was inset `--nav-inset` on the inline-start but only 28px on the inline-end, so the flight tracker (MCO) and the footer hairline sat tight to the right edge while the left had a wide gutter. Set the inline-end inset to `var(--nav-inset)` too — `.head` (`padding-inline-end`), `.nav` (`padding-inline-end`), and `.footer` (`margin-inline-end`) — so the tracker, nav, and hairline are evenly margined left/right. The close button still sits in the 20px start gutter (head `padding-inline-start: 20px`).
**Why:** The app needs a persistent language selector at the bottom of the left nav (designer's i18n mockup). A generic `footer` slot keeps the drawer composable rather than hard-coding a language control into the component.

---

### 2026-06-28 portal/src/i18n/* — runtime localization (EN / FR / ES)
**Rule/token changed:** App architecture — adds a localization layer (no design-rule change; app-only, no design-system component internals touched).
**Was:** All UI copy was hard-coded English in the shell, pages, and `content/connect.ts`.
**Now:** Lightweight custom React context (`I18nProvider` + `useI18n().t()`), typed dictionaries (`en` is the contract; `fr`/`es` typed as `Dict` so missing keys fail at compile time), `{var}` interpolation, localStorage persistence (`thales.locale`), and `<html lang>` sync. Locale switches at runtime (context re-render, no reload). A segmented **EN · FR · ES** selector (`shell/LanguageSelector`) lives in the new SideDrawer `footer` slot — active locale fills `--color-bright-blue`. Translated: nav, search placeholder, footer, Showcase (hero/tiles/categories/weather), and Connect (header/plans/features/modal/toast/alert). `content/connect.ts` now composes its shape from `t()` (the admin seam still returns the same `ConnectContent` shape, now per-locale). Proper nouns (Young Sheldon, Squid Game, etc.) intentionally kept verbatim across locales; `emphasize` strings are verbatim substrings of their `text` in every locale so the bold span keeps working.
**Why:** Designer asked for language selection (EN/FR/ES) switchable from the left navigation before building further pages. Lightweight context chosen over react-i18next (smaller, no dependency; supports runtime switching).

---

### 2026-06-28 portal/src/pages/Account.tsx (+ content/account.ts) — Account / Settings (comp 03)
**Rule/token changed:** Page build — content modeling (ADR 0001), layout (no media query), plus two behaviors not specced in comp 03.
**Was:** `/account` was a `StubPage`. Comp 03 specs only the **Profile** tab (Tabs · Profile Card · Preferences Card · actions row) and leaves Connectivity/Billing as empty tabs; the comp hard-codes field layout with a fixed `grid-template-columns: 1fr 1fr` and gives Cancel no behavior.
**Now:** Built the page composing DS components (Tabs, Card, Input, Select, DatePicker, TextArea, Toggle, RadioGroup, Checkbox, Button, Toast). Deviations, all app-side (no component internals touched):
- **Content seam (ADR 0001):** tab list + Select/Radio option sets live in `content/account.ts` (`getAccountContent(t)`), labels composed from i18n; stable `value`s are locale-independent. Field labels/placeholders read via `t()` in the page. Added an `account` block to en/fr/es (incl. a localized DatePicker placeholder).
- **Responsive field grid:** the two-column rows use `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` so they collapse to one column on phone **without a media query** (honors the "no hand-rolled grid + media queries" rule; BentoGrid is overkill for a form row).
- **Connectivity / Billing tabs:** not specced — render a placeholder `Card` ("This section isn't configured yet.") so the tabs aren't blank. Replace when those sections are designed.
- **Cancel:** restores the form to its sample defaults (comp left it unhandled) — the conventional meaning of Cancel in a settings form.
**Why:** Build the Account/Settings page (next in the build order). Flagging the placeholder tabs + Cancel behavior + auto-fit grid for designer ratification.

---

### 2026-06-29 components/media/MediaRail.* + HeroCarousel.* — two NEW design-system components
**Rule/token changed:** Component inventory — adds `MediaRail` and `HeroCarousel`.
**Was:** The system had `HeroBanner` (single promo), `CarouselDots` (just the indicator), `GenrePill`, and `ShowcaseTile`, but no horizontal "shelf" container and no multi-slide hero — the streaming-gallery pattern (Watch/Listen/News) had no home.
**Now:** Added two components (authored in the canonical `components/media/` and synced to the vendored `portal/src/design-system/` copy; both have `.jsx` + `.module.css` + `.d.ts` + `.prompt.md`, are exported from both barrels, and are documented in `COMPONENT_TYPES.md`):
- **`MediaRail`** — labelled, horizontally-scrolling row of tiles (hidden scrollbar, scroll-snap, desktop prev/next arrows that fade in on hover, hidden on touch). Generic over the tile; children carry their own width. RTL-safe (inline-axis scroll, logical arrow insets). Sharp, flat, token-driven. Requested by the designer for Watch and (upcoming) News/Listen.
- **`HeroCarousel`** — auto-advancing stack of `HeroBanner` slides with `CarouselDots`; one-shot crossfade between slides. Autoplay is **configurable** (`autoPlay`, `intervalMs`) so white-label tenants can retune or disable rotation from the content/config seam.
**Why:** Designer asked to build these as real, reusable DS components (not page-level one-offs) for the media-gallery pages.

---

### 2026-06-29 PROPOSED RULE CHANGE — auto-advancing hero vs. the motion rule
**Rule/token changed:** Motion — CLAUDE.md says "nothing bouncy or **looping** on content."
**Was:** No moving/auto-rotating content anywhere; all motion was state-driven (hover, link).
**Now:** `HeroCarousel` **auto-advances** its slides on a timer (default 6s) — chosen by the designer for a Netflix-style marquee. It's restrained: a slow opacity crossfade (no slide/zoom/bounce), it **pauses on hover/focus**, and it is **fully disabled under `prefers-reduced-motion`**. Autoplay is opt-out per tenant (`autoPlay={false}`).
**PROPOSED RULE CHANGE:** amend the motion rule to allow a *single, slow, pause-on-interaction, reduced-motion-respecting* hero auto-advance — i.e. "nothing bouncy or looping on content **except an opt-out hero carousel that crossfades, pauses on hover/focus, and honors prefers-reduced-motion**." Flagged for the designer to ratify upstream.
**Why:** Designer explicitly chose auto-advance for the Watch hero and asked that it be configurable for white-label tenants.

---

### 2026-06-29 portal/src/pages/Watch.tsx (+ content/watch.ts) — Watch (media gallery)
**Rule/token changed:** Page build — no comp exists for Watch; built from the designer's verbal direction.
**Was:** `/watch` was a `StubPage`. There is **no `page-comps/04-watch.html`** — comps only cover 01–03.
**Now:** Built a streaming media-gallery page composing `HeroCarousel` (configurable autoplay) + a scrollable `GenrePill` filter row + a vertical stack of `MediaRail` shelves of **portrait (2:3) `ShowcaseTile` posters**. GenrePills **filter** the shelves ("All" + one per category). Content is the `content/watch.ts` seam (ADR 0001) — a placeholder Unsplash catalogue today, the **TMDB** integration returns the same shape later. Localized: hero kicker/CTA, genre/row labels, "All" (movie titles stay verbatim). Poster tiles + the hero CTA are non-interactive placeholders (hero CTA routes to /connect as an upsell) — detail/playback routing arrives with TMDB.
**Why:** Next page in the build order; designer gave direction (hero carousel → genre pills → scrollable category rows, Netflix/Prime/Disney+ style) in lieu of a comp. Verified desktop/phone, EN; autoplay advance + pill filtering confirmed.

---

### 2026-06-29 components/core/FavoriteButton.* + Icon `heart` glyph — NEW component + glyph
**Rule/token changed:** Component inventory + Icon glyph set.
**Was:** No "save"/favorite control and no `heart` glyph in the Icon set.
**Now:** Added a `heart` glyph to `Icon` (both copies + the `IconName` union) and a new **`FavoriteButton`** component (canonical `components/core/` + vendored copy; `.jsx`/`.module.css`/`.d.ts`/`.prompt.md`; both barrels; `COMPONENT_TYPES.md`). It's a presentational heart toggle (`active` + `onChange`): active fills the heart **bright-blue** (the one accent — deliberately **not** red, per the one-hue/status-via-icon rule), square/sharp/flat with a semi-opaque dark chip for legibility over posters, and it stops click propagation so it can overlay a clickable tile. Active fill is done in CSS (`fill: var(--color-bright-blue)`), which overrides the Icon's `fill="none"` attribute.
**Why:** Designer asked for a heart "save to favorites" control on media tiles. Built as a reusable DS component (Watch now; Listen/Read later).

---

### 2026-06-29 portal/src/favorites/* + Account "Favorites" tab — favorites feature (app-level)
**Rule/token changed:** App architecture — adds a shared favorites store + a new Account tab (no design-system internals touched).
**Was:** No way to save titles; Account had three tabs (Profile · Connectivity · Billing).
**Now:** Added an app-level `FavoritesProvider` context (`portal/src/favorites/`) — `toggle`/`isFavorite`/`remove`/`byKind`, persisted to `localStorage` (`thales.favorites`). It snapshots `{ id, kind, title, image }` so the Account view renders without re-fetching (a **demo** shortcut — the file documents in detail how to back it with the account API and hydrate from the catalogue). `FavoriteButton`s overlay the Watch posters and sync app-wide. Account gains a **Favorites** tab (now Profile · Favorites · Connectivity · Billing) that lists saved titles **sectioned by kind: Watch / Listen / Read** (Listen/Read empty until those surfaces ship), each with an un-favorite heart. Added a prototype disclaimer line under the Account tabs ("Demo prototype — your settings and favorites are saved on this device only."). New i18n: `account.tabs.favorites`, `account.demoNote`, and a `favorites` block (add/remove/empty) in en/fr/es; section labels reuse `categories.{watch,listen,read}`.
**Why:** Designer asked for a heart-save-to-favorites feature collected under the user account, categorized Watch/Listen/Read, persisted (localStorage acceptable) with clear notes on full wiring and a demo/prototype disclaimer on the account page.

---

### 2026-07-01 components/core/FavoriteButton.module.css — removed backdrop chip
**Rule/token changed:** Component styling — FavoriteButton no longer renders a background chip.
**Was:** The heart sat on a semi-opaque dark chip (`background: var(--overlay-backdrop)`, `:hover` → `--color-black`) intended to keep it legible over bright poster art. Over dark art the chip read as a visible translucent box in the tile corner.
**Now:** Background is `transparent` (both canonical + vendored copies); the padded tap target is kept but invisible, so the white heart sits directly on the art. Removed the now-unused `:hover` background rule and its transition. Active fill (bright-blue) and the not-active hover color unchanged.
**Why:** Designer flagged the visible transparent box behind the heart on media tiles and asked to remove it. Trade-off: no chip means slightly less contrast over very bright art (still per the no-shadow rule — no drop-shadow substitute added).

### 2026-07-01 FavoriteButton scrim + AlbumHero aspect + NEW Read page
**Rule/token changed:** New token `--scrim-radial`; AlbumHero gains `aspect`/`coverWidth` props; new app page `/read` + nav item.
**Was:** FavoriteButton had no backdrop (chip removed earlier) → low contrast over bright art. AlbumHero cover was hard-coded square (`aspect-ratio: 1 / 1`, width clamp). No Read surface — `/read` didn't exist and wasn't in the nav.
**Now:**
- Added `--scrim-radial` (a `radial-gradient` fading to transparent) to `tokens/colors.css` (both copies) and use it as a soft `::before` glow behind the heart in `FavoriteButton.module.css` — legibility over bright art without the visible box (still no `box-shadow`).
- `AlbumHero` cover aspect + width are now token-driven via new `aspect` (default "1 / 1") and `coverWidth` props; `.cover` also gains a `max-height` cap so a tall portrait cover can't overflow the padded hero. Square album art is unchanged (defaults preserved). Updated jsx/module.css/d.ts/prompt.md (both copies).
- Built the **Read** library gallery (`portal/src/pages/Read.tsx` + `.module.css`, `portal/src/content/read.ts`) — mirrors Listen but with portrait (2:3) book covers: AlbumHero hero (portrait cover + aura, height 480) via HeroCarousel, GenrePill category filter, MediaRail shelves of `MediaCard` (cover + title/author), hearts save with `kind="read"` (Account → Favorites → Read section, already present). Placeholder Unsplash portrait catalogue behind the same content seam (ADR 0001). Added `/read` route (App.tsx) + nav item after Listen (navItems.ts) + i18n (`nav.read`, `read` block: readNow/all/rows) in en/fr/es.
**Why:** Designer asked for a subtle gradient behind the heart (in place of the removed chip) and a Read section "like Listen but with book covers / different aspect ratio," including the nav entry. Book cards + hero CTA are non-interactive placeholders (reading/detail routing arrives with a real catalogue); hero CTA routes to /connect as an upsell, mirroring Watch/Listen.

### 2026-07-01 FavoriteButton → translucent circle (supersedes the radial scrim)
**Rule/token changed:** FavoriteButton chrome; removes the `--scrim-radial` token added earlier the same day.
**Was:** The heart sat on a transparent button with a soft `--scrim-radial` glow behind it (the earlier attempt to replace the removed square chip).
**Now:** The heart sits in a **translucent dark circle** — `background: var(--overlay-backdrop)`, `border-radius: 50%`, sized `calc(--fav-size + 24px)` = **44px** at the default 20px heart (~12px padding all round). Circular is the sanctioned radius exception (dots/pills/toggles); still flat, no shadow. Removed the `::before` scrim and the now-unused `--scrim-radial` token from both `tokens/colors.css` copies. Updated `.module.css` + `.prompt.md` (both copies).
**Why:** Designer preferred a clean translucent circle over the diffuse glow; 44px is a standard tap target. Legibility over bright art now comes from the circle fill (same `--overlay-backdrop` the old square chip used) rather than a gradient.

### 2026-07-01 FavoriteButton circle — final shipped values (supersedes the entry above)
**Rule/token changed:** FavoriteButton default size + circle diameter + fill; new `--overlay-backdrop-soft` token.
**Was:** The entry above landed the translucent circle at `--overlay-backdrop` (rgba 0,0,0,0.7), `calc(--fav-size + 24px)` = 44px, 20px heart.
**Now (iterated to designer preference over several passes):**
- Default heart `size` **20 → 16** (`FavoriteButton.jsx`, both copies).
- Circle diameter `calc(--fav-size + 24px)` **→ `+ 20px`** = **36px** at the default heart (~10px padding each side).
- Circle fill **→ `#00000050`** via a new token **`--overlay-backdrop-soft`** (added to both `tokens/colors.css`), replacing the reuse of `--overlay-backdrop`. (Note: `#00000050` is ~31% alpha, not 50% — used verbatim as specified.)
- Updated `.d.ts` / `.module.css` / `.prompt.md` (both copies) and `design_handoff_site_build/COMPONENT_TYPES.md` (FavoriteButton size default; also added the previously-undocumented `AlbumHero` + `MediaCard` entries).
**Why:** Designer refined the control after seeing it live — smaller heart, tighter circle, lighter fill. Circular remains the sanctioned radius exception; still flat, no shadow, one accent.

> **Carry-back to the canonical design-system project** (per CLAUDE.md sync protocol): FavoriteButton restyle (36px translucent circle, size 16, `--overlay-backdrop-soft` = `#00000050`); AlbumHero new `aspect` / `coverWidth` props; new `--overlay-backdrop-soft` token. Applied here in the app repo; not yet mirrored upstream.

### 2026-07-01 News page + FadeScroller / SourceRail / NewsHero / NewsCard + edge-fade retrofit
**Rule/token changed:** New components + a reusable horizontal-scroll treatment (edge-fade); new app page `/news`.
**Was:** `/news` was a `StubPage`. Horizontal scrollers for non-tile rows (the Watch/Listen/Read genre pills) had a hidden scrollbar but **no edge fade**. No source-logo rail, no side-by-side news hero, no news grid card.
**Now:** Built the News page from three Framer mockups (desktop/tablet/phone; no page-comp exists). New design-system components (canonical + vendored, `.jsx`/`.module.css`/`.d.ts`/`.prompt.md`, both barrels, COMPONENT_TYPES.md):
- **FadeScroller** (core) — horizontal scroller with an **edge-fade mask** (outer items fade at both ends) + hidden scrollbar; `fade`/`gap`/`center` props. The reusable "fade" treatment for **non-tile** scrollers.
- **SourceRail** (media) — scrollable monochrome source logos (`currentColor`); dim inactive, active = solid light chip; wraps FadeScroller.
- **NewsHero** (media) — featured story: image + date + Playfair headline + timestamp; two columns on desktop/tablet, stacks on phone.
- **NewsCard** (media) — secondary story: vertical card in a grid, flips to an image-left row on phone.
- Page: `portal/src/pages/News.tsx` (+ css), `content/news.ts` seam (mock sources/categories/stories; a news aggregator returns the same shape later), 14 monochrome logos in `public/assets/logos/news/`, `/news` route, and `news.categories.*` i18n (en/fr/es). Category filters the grid; **source selection is visual-only** for now.
- **Retrofit:** Watch/Listen/Read genre-pill rows now use `<FadeScroller>` (replacing local `.pills`/`.pillsTrack` scroller CSS) so all non-tile scrollers share the edge-fade. Tile shelves (MediaRail) are deliberately unchanged.
**Why:** Designer asked for the News page per the mockups, plus the missing edge-fade on horizontal (non-tile) scrollers. Categories reuse `GenrePill` (rounded) for consistency with the sibling media pages — a deliberate deviation from the mockup's sharp rectangular chips (designer's call).

> **FLAG — component overlap for the design system to reconcile:** the existing (but **unused**) `domain/NewsItem` also renders a lead story + headline rows, but only in a *stacked* lead / *row* form — it can't produce the mockup's side-by-side hero or vertical-card grid, hence NewsHero/NewsCard. The design system should decide whether to deprecate `NewsItem`, or keep it for compact list contexts (e.g. a "more headlines" sidebar).
> **FLAG — sharp source chip:** the active `SourceRail` chip is a **sharp** light square (per the no-round rule), where the mockup shows rounded corners. Kept sharp for DS consistency; revisit if the designer wants it rounded.
> **Carry-back:** all of the above (4 new components + the FadeScroller retrofit) applies in the app repo; mirror to the canonical design-system project.

### 2026-07-01 SourceRail — white inactive logos, rounded chip, theme-safe (supersedes the sharp-chip flag)
**Rule/token changed:** New `--radius-chip` token; SourceRail switched to theme-flipping semantic tokens.
**Was:** Inactive logos were dimmed `--on-surface-2`; the active chip was a **sharp** `--color-white` square with a `--color-black` logo (flagged as a deviation from the rounded mockup, and hardcoded to dark-mode colors).
**Now:**
- Inactive logos use `--text-primary` at 0.8 opacity → **white in dark mode**, carbon in light mode (per the designer's "white when inactive").
- The active chip is **rounded** via a new `--radius-chip: 12px` token (both `tokens/spacing.css` copies) — a deliberate rounded exception to the sharp default, at the designer's request.
- The active chip is now an **inverted** surface (`background: var(--text-primary)`, `color: var(--bg-page)`) instead of hardcoded white/black, so it flips correctly when **light mode** lands (white chip + dark logo in dark; dark chip + light logo in light).
**Why:** Designer asked for white inactive logos + a rounded container, and flagged that dark/light mode is coming — so the component was moved off `--color-white`/`--color-black` onto semantic tokens that theme. Resolves the earlier "sharp source chip" flag.

### 2026-07-01 SourceRail — logos tinted via CSS filter (fix), larger
**Rule/token changed:** SourceRail logo rendering; no token change.
**Was:** Logos were `<img src=…svg>` relying on `color: var(--text-primary)` (currentColor) to go white — but img-embedded SVGs are isolated documents that ignore the parent's `color`, so they rendered in their own default black (near-invisible on the dark page). Logo height 22px.
**Now:** Tint the logos with a **CSS `filter`** silhouette: inactive `brightness(0) invert(1)` (white in dark mode), active `brightness(0)` (dark on the light chip). Light theme flips both via `:global([data-theme="light"])`. Bumped logo height 22 → **30px** and rail height 64 → 72px (designer: "bigger"). Theme-safe without relying on currentColor.
**Why:** The white-inactive-logos change didn't actually render (currentColor doesn't cross the `<img>` boundary); filter is the correct tint for img-embedded monochrome SVGs. Designer also asked for larger logos.

### 2026-07-01 FadeScroller — scroll fix + optional desktop arrow controls
**Rule/token changed:** FadeScroller (fix + new `controls` prop). No token change.
**Was:** The track had `max-width: 100%`, which clamped it to the scroller width so an overflowing row never scrolled on desktop (it worked on touch via native scroll, but the hidden scrollbar left no mouse affordance). No arrow controls.
**Now:**
- **Fix:** removed `max-width: 100%` from the track — `width: max-content` now lets it overflow and scroll, while `margin-inline: auto` still centers it when it fits.
- **New `controls` prop:** opt-in desktop prev/next arrows (IconButton + chevrons), positioned like MediaRail's — they **fade in on hover**, are hidden on touch (`@media (hover: none)`), and only render when the row actually overflows (ResizeObserver checks `scrollWidth > clientWidth`). Wired on `SourceRail` and the News category row.
**Why:** Designer reported the source rail scrolled on phone but had no way to scroll on desktop, and suggested a hover arrow. Matches the MediaRail arrow affordance for consistency.

### 2026-07-01 Pill rails — desktop hover arrows everywhere
**Rule/token changed:** Usage — enabled FadeScroller `controls` on all filter/pill rails.
**Was:** Only SourceRail + the News category row had the desktop hover arrows; the Watch/Listen/Read genre-pill rows had none.
**Now:** Added `controls` to the genre-pill FadeScroller on Watch, Listen, and Read. Arrows still only appear when a row overflows (fade in on hover, hidden on touch), so centered rows that fit are unchanged.
**Why:** Designer asked for the arrow treatment on the pill rails everywhere, for a consistent horizontal-scroll affordance across the app.

### 2026-07-01 HeroCarousel — prev/next hover arrows
**Rule/token changed:** HeroCarousel gains prev/next arrows (no new prop, no token change).
**Was:** The hero carousel navigated only via CarouselDots + autoplay — no arrow controls.
**Now:** Added prev/next arrows (IconButton + chevrons) that step the slide with wraparound; they **fade in on hover/focus** and are **hidden on touch** (`@media (hover: none)`), matching the MediaRail / FadeScroller arrow treatment. Shown only with multiple slides; autoplay still pauses on hover. Both DS copies + prompt updated.
**Why:** Designer asked for the hover-arrow affordance on the hero carousel too, for consistency across all the app's horizontal/slide navigators.

### 2026-07-01 Grid/list view toggle on all galleries + ViewToggle / MediaRow
**Rule/token changed:** New components (ViewToggle, MediaRow) + two Icon glyphs (grid, list); galleries gain a view toggle.
**Was:** Watch/Listen/Read showed genre shelves (MediaRail tiles) only; News showed a TileGrid of cards only. No list view, no grid/list control.
**Now:** Added a **grid/list toggle** to every gallery (Watch, Listen, Read, News), top-right above the collection. New design-system pieces (canonical + vendored, docs, barrels, COMPONENT_TYPES):
- **ViewToggle** (core) — two-option segmented control (grid | list); selected segment is an inverted `--text-primary`/`--bg-page` fill (theme-safe, deliberately not the accent hue). `gridLabel`/`listLabel` are i18n'd (`common.viewGrid`/`viewList`, en/fr/es).
- **MediaRow** (media) — list-mode row: fixed-height thumbnail (aspect-driven width) + title/subtitle/meta + optional trailing (e.g. FavoriteButton), hairline divider.
- Added `grid` + `list` glyphs to the Icon set (both copies).
- **List mode** keeps the genre/category **sections** (heading + a vertical row list) on the media galleries; News (a flat filtered grid) becomes a flat row list. Heroes stay in both modes. Row aspect matches each surface: 1:1 Listen, 2:3 Watch/Read posters, 16:10 News.
**Why:** Designer asked for a grid/list toggle on the galleries; sections-as-row-lists chosen (over a flat list) to mirror the grid structure. Toggle state is per-page/session (not persisted) for now.

### 2026-07-01 News category pills centered + Card title → Montserrat h3
**Rule/token changed:** News category-row alignment; Card title element + font (brings Card in line with the typography rule).
**Was:** News category pills were left-aligned (`center={false}`). The Card component rendered its `title` as a `<div>` in `--font-tile` (Noto Serif Display) — a generic (non-heading) element in a serif face, which conflicts with "Serif never for nav/UI/body" and "Noto Serif is opt-in only".
**Now:**
- News category FadeScroller is **centered** (default), matching the media galleries' pill rows.
- Card `title` is a semantic **`<h3>`** in **Montserrat** (`--font-sans`, `margin: 0`, same `--fs-h3` size). Affects all Card usages (all in Account — settings/UI contexts), fixing the Account section titles ("Preferences", etc.) the designer flagged. Both DS copies synced.
**Why:** Designer asked to center the News category group and to make the Account section titles H3s in Montserrat. The Card change aligns the component with the design system's own typography rule (UI/card titles are sans, serif is opt-in) and improves heading semantics.

### 2026-07-01 Docs: purge "serif card title" inconsistencies
**Rule/token changed:** Documentation only — align Card/Kicker/typography guidance with the code (Card title is now Montserrat h3).
**Was:** Several docs still implied card titles are serif: `Card.d.ts` ("Serif title"), `Kicker.d.ts`/`.module.css` ("above a serif tile/card title"), `tokens/typography.css` + `design_handoff_site_build/README.md` ("Noto Serif = tile / card titles"), and the COMPONENT_TYPES Kicker note.
**Now:** Updated all of them to state that `--font-tile` (Noto Serif) is **opt-in for media-tile / hero titles only — not cards, not the default tile**, and that a Card `title` is an `<h3>` in Montserrat. Added an explicit title-font bullet to `Card.prompt.md`. Both DS copies synced.
**Why:** Follow-up to the Card title fix — the guidance contradicted the corrected code and the "serif never for UI" typography rule.

> **FLAG — EmptyState title:** `EmptyState.module.css` `.title` still uses `--font-tile` (Noto Serif) for what is a UI/empty-state heading — the same inconsistency Card had. Left as-is (not in scope, and an empty-state heading is a plausible "soft editorial" exception), but flagging for the design system to decide whether it should also be Montserrat.

### 2026-07-01 EmptyState title → Montserrat (resolves the flag above)
**Rule/token changed:** EmptyState title font.
**Was:** `EmptyState.module.css` `.title` used `--font-tile` (Noto Serif) — the same serif-for-UI inconsistency Card had.
**Now:** Title uses `--font-sans` (Montserrat). Kept the element a `<div>` (not an `<h3>`) since EmptyState nests in arbitrary contexts and shouldn't force a heading into the outline. Updated the jsx doc comment + prompt ("serif" → "Montserrat"). Both DS copies synced.
**Why:** Designer confirmed EmptyState should follow the same rule — serif never for UI titles.

### 2026-07-01 Account demo note → Alert (info)
**Rule/token changed:** App-level — Account uses the DS `Alert` for the prototype disclaimer (no new component; no DS change).
**Was:** The "Demo prototype — settings saved on this device only" line was a bespoke muted `<p className={s.demoNote}>`.
**Now:** Rendered as `<Alert tone="info">` — the established note/callout pattern (leading info glyph in bright-blue per the one-hue rule, dark surface-2, hairline border, flat). Slimmed `.demoNote` to just a bottom margin.
**Why:** Designer wanted the demo note given a proper note/alert treatment via an established UI class — the DS already has `Alert` for exactly this, so no new component was needed.

---

### 2026-07-01 Weather page destination → Orlando
**Rule/token changed:** App-level content (`portal/src/content/weather.ts`) — no DS change.
**Was:** Weather hero destination was Melbourne (from the comps), with an Australia-themed 5-day forecast + weather news.
**Now:** Hero is Orlando, FL to match the flight-tracker/Showcase destination (same Epcot image + "Partly Sunny, 79.5° F" as the Showcase weather tile); forecast + news retuned to Central Florida so the forecast sub-view reads coherently.
**Why:** Designer asked the weather destination to match the flight destination. Melbourne stays as the first gallery card; only the hero/forecast/news changed.

---

### 2026-07-01 Icon catalog — added `play` glyph
**Rule/token changed:** `design-system/components/core/Icon.jsx` + `Icon.d.ts` — added `play` to the line-icon set (Lucide-equivalent triangle `points="6 3 20 12 6 21 6 3"`).
**Was:** No play glyph existed in the Icon catalog.
**Now:** `<Icon name="play" />` available; used by the media-detail "Play Trailer" action.
**Why:** Needed a play affordance for media playback controls. Additive to the catalog (no existing glyph changed); the `Icon.d.ts` union was also out of sync with `Icon.jsx` (missing several existing glyphs) — only `play` was added here, the broader drift is noted for the designer.

---

### 2026-07-01 New app component — MediaDetailModal (`portal/src/components/MediaDetailModal.tsx`)
**Rule/token changed:** New composed feature component (app-level, not a DS primitive). Composes DS `Modal`, `Tabs`, `Button`, `FavoriteButton`, `Icon` + tokens only.
**Was:** Media tiles (Watch) were non-interactive; no detail view existed.
**Now:** Clicking a poster/row opens a TMDB-style detail overlay: poster + metadata (certification box, release date · genres · runtime), a circular **user-score ring**, Play Trailer + favorite actions, and an **Overview | Cast** tab set. Two columns on desktop, stacked on mobile. New `components/` folder created for shared app-level feature components (siblings to `pages/` and `shell/`).
**Why:** Designer asked for a media-details modal (movies/TV first, other media types to follow) with an Overview | Cast tabbed treatment. Notable on-system deviations from the TMDB reference: score ring uses the single blue accent (not TMDB's green/amber), and there is no blurred backdrop image (system rule: no frosted blur, depth via surface contrast). Built on a generic `MediaDetail` shape so Listen/Read can reuse it. Watch content (`content/watch.ts`) extended with placeholder detail + cast metadata behind the TMDB seam. **Candidate to promote into the DS as a domain component if ratified.**

---

### 2026-07-01 MediaDetailModal extended to Listen + Read (music / books)
**Rule/token changed:** App-level — same `MediaDetailModal` now drives all three galleries; no DS primitive changed.
**Was:** The detail modal was Watch-only (Overview | Cast); Listen/Read tiles were non-interactive.
**Now:** The modal's `MediaDetail` shape was generalized (poster aspect, `subtitle` for artist/author, a `facts[]` meta line, a `primaryActionLabel`/icon, and a single type-specific second tab). Second tab is chosen by the data present: **Cast** (film/TV), **Tracklist** (music, 1:1 cover + numbered rows), or **Details** (books, label/value rows). Listen (`content/listen.ts`) and Read (`content/read.ts`) content extended with placeholder detail + tracklist / publication metadata behind their seams; each page maps its item into `MediaDetail`. Read's primary action reuses the existing `eye` glyph ("Read Now"); music/film use `play`.
**Why:** Designer asked to extend the detail modal to Listen/Read. One component, three mappings — keeps the pattern consistent and DRY.

---

### 2026-07-01 Modal — open/close animation (`design-system/components/surfaces/Modal.jsx` + `.module.css`)
**Rule/token changed:** `Modal` gained enter/exit motion; affects every modal (Connect purchase confirm + the media-detail modal).
**Was:** Modal mounted/unmounted instantly on `open` (no transition).
**Now:** Backdrop fades and the dialog rises + scales (10px / 0.98→1) on open, and reverses on close; the panel stays mounted through a ~220 ms exit (timeout-driven so it also tears down when animations are off). Uses `--ease-smooth`; durations are literal ms (200–220) — **no motion-duration token existed for this**, a candidate token for the DS. Disabled under `prefers-reduced-motion`.
**Why:** Designer asked for animation on modal open/close. Kept subtle and on-system (short, eased, no bounce, respects reduced-motion) per the motion rules in CLAUDE.md.

---

### 2026-07-01 Showcase bento tiles made config-driven + wired (`portal/src/content/showcase.ts`, `pages/Showcase.tsx`)
**Rule/token changed:** App-level architecture — tiles now carry a typed `action`; no DS primitive changed. Fulfils the "tiles must be configurable" requirement.
**Was:** Showcase tiles were decorative (no click wiring except the hero → Connect and the weather tile → /weather landing).
**Now:** Tile behaviour is data in `content/showcase.ts`: each tile has `action: { kind: "modal", detail } | { kind: "link", to }`. Media singles (Young Sheldon, Squid Game, The Fall Guy → Overview|Cast; Red Moon In Venus → Overview|Tracklist) open the `MediaDetailModal`; collections/other tiles link to a view (billie→/listen, ebooks→/read, games→/play, dining+epcot→/destinations, england→/travel, duty-free→/shop). The weather panel deep-links to the destination's 5-day forecast (`/weather?view=forecast`); `Weather` reads that param to open the forecast sub-view directly. Modal media tiles are favoritable (kind from the tile).
**Why:** Designer asked that tiles know their type and launch the corresponding detail modal or view, with weather going straight to the destination forecast. Detail payloads are placeholder stand-ins behind the same content seam as the section pages.

---

### 2026-07-01 New routes + Play nav section (`App.tsx`, `shell/navItems.ts`)
**Rule/token changed:** Added a **Play** primary nav section and four stub routes; nav bar gains one item.
**Was:** Nav = Showcase · Connect · Watch · Listen · Read · News · Weather · Account. No /play, /destinations, /travel, /shop routes.
**Now:** Added **Play** to the nav (between Read and News) → `/play` (StubPage: "Web & HTML5 games"), plus tile-reached stubs `/destinations`, `/travel`, `/shop`. i18n `nav.play` + labels added in en/es/fr.
**Why:** Designer noted the original Thales portal offered a Play/games section (HTML/web games); added it as a real section now with a stub page (games gallery to follow). Destination/travel/shop are placeholder stubs pending real views. **Flag:** adding Play to the top nav is a visible IA change — confirm placement/labeling.

---

### 2026-07-01 Play games gallery built (`portal/src/pages/Play.tsx`, `content/play.ts`)
**Rule/token changed:** App-level page — mirrors the Watch/Listen/Read gallery pattern; no DS primitive changed. `/play` route now renders the gallery (was a StubPage).
**Was:** `/play` was a placeholder StubPage.
**Now:** A games gallery: auto-advancing `HeroCarousel`, genre-pill filter, grid/list `ViewToggle`, and category shelves of **landscape (16:9)** game cells (`ShowcaseTile`). Clicking a game (or the hero CTA) opens the shared `MediaDetailModal` in **Overview | Details** form (Details = Developer / Players / Controls / Category) with a **Play** primary action. Content + placeholder catalogue in `content/play.ts` behind the games-service seam; `play.*` i18n added (en/es/fr).
**Why:** Designer asked to build the Play games gallery. Reuses the established gallery + detail-modal patterns. **Notes:** (1) actual gameplay is stubbed — the Play button is the launch seam until titles are licensed; (2) games are **not favoritable** yet — `FavoriteKind` is watch/listen/read only, so adding a "play" kind (+ an Account → Favorites shelf) is a follow-up; (3) game art is placeholder Unsplash reused from other pools.

---

### 2026-07-01 Games are favoritable (`FavoritesProvider`, `Play`, `Account`)
**Rule/token changed:** App-level — `FavoriteKind` gains `"play"`; no DS primitive changed. Supersedes note (2) on the Play-gallery entry above.
**Was:** Favorites covered watch/listen/read; Play tiles had no save control.
**Now:** `FavoriteKind = "watch" | "listen" | "read" | "play"`. Play grid tiles + list rows carry a `FavoriteButton`, and the game detail modal's heart is wired. Account → Favorites gains a **Play** shelf automatically (added `"play"` to `FAV_KINDS`; the card title reuses the existing `categories.play` label).
**Why:** Designer asked that games be favoritable. Same one-hue heart + `useFavorites` pattern as the other galleries. Minor: the shared Account favorites grid uses portrait cells, so landscape game art crops there (same as square album art already does).

---

### 2026-07-01 Destinations + Travel built as a blog engine with a local-CMS content model
**Rule/token changed:** New editorial pages + a portable content model + two app components; no DS primitive changed. `/destinations` and `/travel` were StubPages.
**Was:** Destination/Travel showcase tiles linked to placeholder StubPages.
**Now:** Both are one **blog engine** parameterized by `section`:
- `content/blog.ts` — the local "CMS" seam: each `BlogPost` is metadata + a `body` of typed **blocks** (`paragraph | heading | image | quote | list`), i.e. a portable rich-text model. `getPosts(section)` / `getPost(section, slug)` are the swap points for a real headless CMS or markdown loader. Seeded with 3 Destinations + 3 Travel posts (original placeholder copy).
- `components/blog/PostBody.tsx` — the block renderer (CMS rendering primitive); `components/blog/BlogCard.tsx` — editorial index card.
- `pages/BlogIndex.tsx` (featured lead hero + card grid) and `pages/BlogArticle.tsx` (cover hero, byline w/ initials avatar, tag `Badge`s, `PostBody`, "more in section" via `NewsItem`), on slug routes `/{section}` and `/{section}/:slug`.
- Showcase tiles deep-link to specific articles (epcot → `/destinations/orlando-epcot`, england → `/travel/exploring-england`); dining → `/destinations`. `blog.*` i18n (section titles/subtitles, "More in", not-found) in en/es/fr.
**Why:** Designer wanted Destinations/Travel as blog-type pages architected for a future local CMS. **Typography note (needs ratifying):** long-form body is Montserrat (serif stays out of body per the rules), but article/section titles + subheads + pull-quotes use **Playfair** (display) for editorial voice — a slightly broader use of the display face than "hero H1 / featured tiles." Sections are **not** in the top nav (reached via Showcase tiles), matching how Shop is handled. Post copy/imagery is placeholder behind the CMS seam.

---

### 2026-07-01 In-app blog CMS — Studio editor + localStorage store (`pages/Studio.tsx`, `content/blogStore.ts`)
**Rule/token changed:** New authoring surface (app-level) composing DS form controls (`Input`, `TextArea`, `Select`, `Checkbox`, `Button`, `Card`, `Badge`, `Icon`) + tokens; no DS primitive changed. Adds `/studio` route.
**Was:** Blog content was TS-seeded only; no way to author in-app.
**Now:** A **structured block editor** at `/studio`: post metadata + a body built from typed blocks (add / reorder / delete heading·paragraph·quote·list·image), a live **Preview** rendered through the same `PostBody`, and a **drafts list** (edit/delete). Posts persist to `localStorage` via `content/blogStore.ts` and are merged into `getPosts`/`getPost` (drafts win on slug), so a new post appears immediately in its section + at `/{section}/{slug}`. Reached via a **"Write a post"** button on each blog index (`blog.newPost`, i18n en/es/fr).
**Why:** Designer chose the block-editor approach (our content model is typed blocks, so editing `BlogBlock[]` directly avoids a markdown parser / heavyweight RTE and best showcases the portable-block architecture — a portfolio piece). **Notes:** (1) Studio UI copy is intentionally **English-only** — an admin/author tool, not a passenger-facing screen; only the public "Write a post" button is localized. (2) Only drafts (localStorage) are editable; seeded posts are read-only. (3) The **markdown file loader (Option A)** was deliberately not built — a clean follow-up for the git-CMS story. (4) `Icon.d.ts` gained `chevron-up` (present in `Icon.jsx`, missing from the type union — the drift noted earlier).

---

### 2026-07-01 New token `--text-reading` for long-form body (`tokens/colors.css`)
**Rule/token changed:** Added a semantic text color token in both themes; used by the blog `PostBody`.
**Was:** Long-form article body + list items used `--text-secondary` (the muted grey meant for captions/meta) — too low-contrast for sustained reading on the dark surface (designer flagged it as too dark).
**Now:** New `--text-reading` — dark theme `rgb(206,213,221)` (softer than pure-white `--text-primary`, far higher contrast than secondary), light theme `rgb(58,68,79)`. `PostBody` paragraphs + list items now use it; captions/quote-attribution stay `--text-secondary`.
**Why:** Body copy needs a dedicated reading color between primary and secondary; added as a token (not an inline value) per the tokens rule so the whole system can reuse it for any long-form text. **Candidate for the DS** as the standard body-reading color.
