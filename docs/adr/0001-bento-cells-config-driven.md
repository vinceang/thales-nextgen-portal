# 0001 — Bento/tile cells are configuration-driven content slots

- **Status:** Accepted (admin tooling deferred)
- **Date:** 2026-06-27
- **Deciders:** Project owner (designer), app build
- **Related:** `DESIGN_CHANGES.md` (Showcase v2 entries); design-system roadmap
  ("Navigation is data-driven and configurable"; "the configurable bento hub")

## Context

Portal pages (Showcase first, then Connect, Watch, Listen, News, Weather,
Account) are composed as **named regions** in a `BentoGrid` / `TileGrid`, where
each region renders a media cell (`ShowcaseTile`, `HeroBanner`, `WeatherTile`, …).

Today every cell's content — content type, title, kicker, CTA label, CTA
destination, image — is **hard-coded as sample data** in the page component
(e.g. `Showcase.tsx`'s `HERO` / `TILES` / `KICKER_CTA`). That is fine for
building and reviewing layouts, but the product intent is that a **non-engineer
(operations / an airline's content team) configures what goes into each cell**
through an admin tool, per deployment and over time — consistent with the
white-label, "configurable bento hub" design.

We are about to build the layouts for every portal page. We want those layouts
to be shaped correctly for that future now, **without** building the admin UI or
a backend yet (explicitly out of scope for this phase).

## Decision

1. **Separate layout from content.**
   - *Layout* (which named regions exist and where they sit per breakpoint) is
     authored in code via `BentoGrid` / `TileGrid` area maps. It is a developer
     concern and changes rarely.
   - *Content* (what fills each region) is **data** conforming to a cell schema.
     An admin tool will produce this data later; until then, a local sample
     module stands in for it.

2. **Adopt a cell content schema** (illustrative, not final):

   ```ts
   type ContentType =
     | "connect" | "watch" | "listen" | "read" | "play"
     | "destination" | "travel" | "shop" | "weather";

   interface CellContent {
     region: string;          // bento area name: "hero" | "r1" | "sq" | "wx" | …
     contentType: ContentType;
     title: string;
     image?: string;          // or a media ref the admin tool resolves
     kicker?: string;         // defaults from contentType
     cta?: { label: string; route: string }; // defaults from contentType
   }
   ```

3. **`contentType` is the source of truth for kicker + CTA defaults.** A single
   centralized map (already prototyped as `KICKER_CTA` in `Showcase.tsx`)
   resolves `contentType → { kicker, cta.label, cta.route }`, with per-cell
   overrides allowed. This keeps "Watch → /watch", "Listen → /listen", etc.
   consistent everywhere and admin-editable in one place.

4. **Pages render from `CellContent[]`, keyed by region.** The page builds its
   `items` map by looking up each region's content; components stay pure
   (props in, no embedded copy). No page hard-codes editorial strings inside a
   component.

5. **Defer the admin tool and persistence.** No admin UI, API, schema
   validation, or storage is built now. Sample data is the seam where the admin
   tool will plug in. We will revisit persistence/validation in a later ADR.

## Consequences

**Positive**
- Layouts built this phase are already "admin-ready": swapping content is a data
  change, not a code change — the white-label goal.
- One place (`contentType` map) governs kicker/CTA semantics across all pages.
- Pages and tile components stay presentational and testable.

**Costs / trade-offs**
- Requires discipline now: keep sample content in a data array per page, not
  inlined in JSX, even though it's "just sample data."
- The admin assigns content to **fixed, code-defined regions**; admins cannot
  (yet) restructure the grid itself. Making *layout templates* configurable is a
  larger, separate decision — out of scope here (candidate for a future ADR).
- A real schema, validation, media handling, and i18n/RTL copy concerns are
  deferred and will need their own design.

## Status of implementation

Not wired. This ADR records the direction so page-layout work proceeds with
content modeled as data. `Showcase.tsx` already approximates the target shape
(`HERO`, `TILES`, `KICKER_CTA`); aligning it (and each new page) to an explicit
`CellContent[]` is a low-risk follow-up, to be scheduled when we start the admin
tool — not before.
