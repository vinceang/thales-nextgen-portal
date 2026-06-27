The signature bento cell: full-bleed image, dark bottom scrim, bright-blue kicker, title.

```jsx
{/* Ordinary gallery tile → Montserrat by default */}
<ShowcaseTile image={src} kicker="Watch" title="Squid Game" height={220} />

{/* Large featured / hero tile → Playfair by default (size crosses the threshold) */}
<ShowcaseTile image={src} kicker="Destination" title="Orlando's Best: Epcot" titleSize={40} height={420} />

{/* Explicit per-tile font overrides */}
<ShowcaseTile image={src} kicker="Listen" title="Billie Eilish" titleFont="tile" kickerFont="sans" />
```

- **Title font is prominence-driven by default.** A tile clearly larger than its
  neighbours (heuristic: `titleSize ≥ 30` or `height ≥ 300`) renders in Playfair
  (`display`); every other tile renders in Montserrat (`sans`). Noto Serif is **not**
  the default anymore — it is opt-in via `titleFont="tile"`.
- **Override per tile** with `titleFont` / `kickerFont` (font role: `"display"` |
  `"sans"` | `"tile"`) or `titleStyle` / `kickerStyle` (arbitrary style). The kicker
  stays Montserrat unless `kickerFont` / `kickerStyle` says otherwise.
- `font` (alias for `titleFont`) and `serif` (true → tile, false → sans) are legacy;
  prefer `titleFont`.
- Scale `titleSize` and `height` by the tile's prominence in the bento grid — that
  same prominence is what selects Playfair vs Montserrat.
- Compose into a CSS grid with 16px gaps; spans create the bento rhythm.
