# Page Comps — implementation references

Three hi‑fi page comps live in `page-comps/`. Each is a **live render of the real design‑system components** (it loads `_ds_bundle.js` + `styles.css`) with an **Implementation spec** panel on the right. Numbered pins on the page map to numbered spec items.

| # | File | Page | Key components |
|---|---|---|---|
| 01 | `page-comps/01-showcase.html` | Showcase / Home | `NavBar`, `HeroBanner`, `CarouselDots`, `GenrePill`, `TileGrid`, `ShowcaseTile` |
| 02 | `page-comps/02-connect-plans.html` | Connect / Plans | `NavBar`, `Breadcrumbs`, `PlanCard`, `Modal`, `Button` |
| 03 | `page-comps/03-account-settings.html` | Account / Settings | `NavBar`, `Tabs`, `Card`, `Input`, `Select`, `DatePicker`, `TextArea`, `Toggle`, `RadioGroup`, `Checkbox`, `Button` |

Full-page PNG renders of all three (live component output + spec) are in
`page-comps/screenshots/` for quick visual reference without opening a browser — see
`screenshots/README.md`. The `.html` files remain the source of truth.

## How to use these (for Claude Code)
1. **Open each `.html` in a browser** to see the target — it renders the actual components, so it's the source of truth for layout, spacing, and states (not a flat mockup).
2. **Read the spec panel** beside each render. Every numbered pin lists the component, its key props, behavior/states, and the tokens involved. Build the matching React route from that.
3. **Recreate, don't copy.** These comp HTML files are *references*. Implement the page in the app's framework using the **real components** from `components/` (import via `components/index.js`) — do not paste the comp HTML or the annotation chrome (`comp.css`, `.comp-*`, `.pin`, the spec `<aside>`) into the app. Those exist only to document the design.
4. **Honor the system rules** in `CLAUDE.md`: tokens only, one blue accent (status via icon+label), sharp corners, no shadows, fixed typography roles, RTL‑safe.

## Notes
- The comps show the **desktop (1200px)** layout. Responsive behavior is described in each spec ("Tokens & rules" / "Responsive"): `TileGrid` reflows at 1101 / 561px and type scales fluidly — no manual breakpoints.
- Comp 02 shows the purchase `Modal` in its **open** state on purpose (pin 4). In the app it opens from a `PlanCard`'s `onSelect`.
- To render a comp you need `_ds_bundle.js` present (it's at the project root). That bundle is a *viewing* dependency for the comps only — your app imports the component **source** from `components/`, not the bundle.
