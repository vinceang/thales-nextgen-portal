Cover image with a title/subtitle caption **below** it — the music/library card (album + artist, podcast + host, book + author). Sibling to `ShowcaseTile`, which overlays its caption on the image instead.

```jsx
<MediaCard image={cover} title="Album Title" subtitle="Artist Name" />

{/* portrait book cover */}
<MediaCard image={jacket} title="Book Title" subtitle="Author" aspect="2 / 3" />
```

- Cover aspect is configurable via `aspect` (default square `1 / 1`); title in Montserrat 700, subtitle muted. Both truncate to one line.
- Sharp, flat — depth from surface contrast, no shadow. For an image tile with the caption *over* the art use `ShowcaseTile`; for pricing use `PlanCard`.
- Compose a `FavoriteButton` absolutely over the cover for a save control (the card's top sits at the cover's top, so `top:8; inset-inline-end:8` lands on the cover corner).
