The signature bento cell: full-bleed image, dark bottom scrim, bright-blue kicker, serif title.

```jsx
<ShowcaseTile image={src} kicker="Watch" title="Squid Game" height={220} />
<ShowcaseTile image={src} kicker="Destination" title="Orlando's Best: Epcot" titleSize={40} height={420} font="display" />
```

- `font` picks the title family: `"tile"` (default — Noto Serif Display 600), `"sans"` (Montserrat 700), or `"display"` (Playfair 700). **Reserve `"display"` for hero-level tiles only** — supporting bento tiles should stay on `"tile"` or `"sans"`.
- `serif` is the legacy boolean (true → tile, false → sans); prefer `font`.
- Scale `titleSize` and `height` by the tile's prominence in the bento grid.
- Compose into a CSS grid with 16px gaps; spans create the bento rhythm.
