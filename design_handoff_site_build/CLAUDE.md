# CLAUDE.md — Thales NextGen Portal

Project memory for Claude Code. Read `README.md` and `design-system/DESIGN_SYSTEM_NOTES.md` first.

## What this is
A React build of the **Thales NextGen In‑Flight Wi‑Fi Portal**, assembled on top of a complete in‑house design system. The component source, tokens, and assets live at the **project root** (`components/`, `tokens/`, `styles.css`, `assets/`) — copy those into the app. The components are real React ES modules styled with inline styles + CSS custom properties — **no Tailwind, no CSS‑in‑JS library**.

Target page layouts are documented as live, annotated comps in `design_handoff_site_build/page-comps/` (see `PAGE_COMPS.md`). Build pages to match them — **recreate** in the app, never paste the comp HTML or its annotation chrome.

## Hard rules — do not violate
- **Use the design system. Do not invent UI.** Build pages by composing components from `components/` (import via the barrel `components/index.js`). Before using a component, read its `.prompt.md`; prop types are in `design_handoff_site_build/COMPONENT_TYPES.md`.
- **All visual values come from tokens.** Never hard‑code a color, font, size, radius, or shadow. Use `var(--token)`. If you need a value that doesn't exist, add a token in `design-system/tokens/`, don't inline it.
- **One accent hue, no second hue.** Status (Alert/Toast/Badge) is shown by icon + label, never red/green/amber.
- **Sharp by default, no shadows.** Radius is 0 except pills/dots/toggles; depth is surface contrast. Don't add `box-shadow`.
- **Typography roles are fixed.** Playfair = hero H1 only; Noto Serif = tile/card titles; Montserrat = all UI/body/buttons; Inter = body on light surfaces. Serif never for nav/UI/body.
- **Don't edit component internals to change the theme.** Re‑skin only by overriding token values (white‑label system).

## Setup
- Stack: Vite + React + TypeScript. Copy the project‑root `components/`, `tokens/`, `styles.css`, `assets/` into the app. `import "./design-system/styles.css"` once in `main.tsx` (loads fonts + all tokens). Set `html,body,#root { background: var(--bg-page); color: var(--text-primary); }`.
- Components are `.jsx`; set `allowJs: true`. Types come from sibling `.d.ts`.
- Put `assets/` under `public/`; pass asset paths to components as props (they don't hard‑code URLs).

## Conventions
- Single‑word nav labels; UPPERCASE button labels (tracking 0.04em).
- Layout with flex/grid + `gap`; the system is RTL‑authored (logical properties) — preserve that.
- Motion: `--ease-smooth`, `--dur-link`; nothing bouncy or looping on content.
