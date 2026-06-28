# CLAUDE.md — Thales NextGen Portal

Project memory for Claude Code. Read `README.md` and `design-system/DESIGN_SYSTEM_NOTES.md` first.

## What this is
A React build of the **Thales NextGen In‑Flight Wi‑Fi Portal**, assembled on top of a complete in‑house design system. The component source, tokens, and assets live at the **project root** (`components/`, `tokens/`, `styles.css`, `assets/`) — copy those into the app. The components are real React ES modules styled with **CSS Modules that consume CSS custom‑property tokens** — **no Tailwind, no CSS‑in‑JS library**. (The system originally shipped with inline `style` objects; it is being migrated to CSS Modules — see `docs/adr/0002-styling-css-modules-tokens.md`. Components not yet converted may still use inline styles.)

Target page layouts are documented as live, annotated comps in `design_handoff_site_build/page-comps/` (see `PAGE_COMPS.md`). Build pages to match them — **recreate** in the app, never paste the comp HTML or its annotation chrome.

## Hard rules — do not violate
- **Use the design system. Do not invent UI.** Build pages by composing components from `components/` (import via the barrel `components/index.js`). Before using a component, read its `.prompt.md`; prop types are in `design_handoff_site_build/COMPONENT_TYPES.md`.
- **All visual values come from tokens.** Never hard‑code a color, font, size, radius, or shadow. Use `var(--token)`. If you need a value that doesn't exist, add a token in `design-system/tokens/`, don't inline it.
- **Style with CSS Modules, not inline styles (ADR 0002).** Each component is `Name.jsx` + `Name.module.css` consuming `var(--token)`. States are real pseudo‑classes (`:hover`/`:focus-visible`/`:disabled`); variants/sizes are `data-*` attributes; *dynamic* per‑instance values (height, %, grid areas) pass through CSS custom properties via a minimal `style={{ "--x": v }}` — the only sanctioned `style` use besides consumer overrides. New components follow this; convert any inline‑styled component you touch.
- **One accent hue, no second hue.** Status (Alert/Toast/Badge) is shown by icon + label, never red/green/amber.
- **Sharp by default, no shadows.** Radius is 0 except pills/dots/toggles; depth is surface contrast. Don't add `box-shadow`.
- **Typography roles.** Playfair = hero H1 **and large featured / hero tiles**; Montserrat = all UI/body/buttons **and ordinary gallery tile titles**; Inter = body on light surfaces. Noto Serif is opt-in only (no longer the tile default). Serif never for nav/UI/body.
  - **Tile titles are prominence-driven (rule).** `ShowcaseTile` chooses its title font by size: a tile clearly larger than its neighbours (default heuristic `titleSize ≥ 30` or `height ≥ 300`) renders in Playfair (`display`); every other tile renders in Montserrat (`sans`). Override per tile with `titleFont` / `kickerFont` (font role) or `titleStyle` / `kickerStyle`. Don't pass `font="tile"` (Noto Serif) unless you specifically want serif.
- **Don't edit component internals to change the theme.** Re‑skin only by overriding token values (white‑label system).

## Setup
- Stack: Vite + React + TypeScript. Copy the project‑root `components/`, `tokens/`, `styles.css`, `assets/` into the app. `import "./design-system/styles.css"` once in `main.tsx` (loads fonts + all tokens). Set `html,body,#root { background: var(--bg-page); color: var(--text-primary); }`.
- Components are `.jsx`; set `allowJs: true`. Types come from sibling `.d.ts`.
- Put `assets/` under `public/`; pass asset paths to components as props (they don't hard‑code URLs).

## Conventions
- Single‑word nav labels; UPPERCASE button labels (tracking 0.04em).
- Layout with flex/grid + `gap`; the system is RTL‑authored (logical properties) — preserve that.
- Motion: `--ease-smooth`, `--dur-link`; nothing bouncy or looping on content.

## Design System Sync Protocol

The canonical source of truth for all design decisions, tokens, rules, and
component specs is the **Thales NextGen Portal Design System** project (the
repo you cloned from). It is NOT this app repo.

### Rules for this build:

1. **Never unilaterally change a design rule.** If something in CLAUDE.md,
   tokens/, or the component spec doesn't work for a use case, STOP and flag
   it — describe the conflict clearly. Do not silently work around it.

2. **When a rule needs to change**, document the proposed change in a comment
   or summary at the end of your response: "PROPOSED RULE CHANGE: [what] →
   [why]". The human will take that back to the design system project to make
   it official, then update this repo's files.

3. **Before starting any new page or feature**, re-read:
   - `CLAUDE.md` (this file — rules may have been updated since last session)
   - The relevant page comp in `design_handoff_site_build/page-comps/`
   - `design_handoff_site_build/README.md` if you haven't read it this session

4. **If this file has changed since your last session**, treat the new version
   as the only truth — prior session context does not override it.