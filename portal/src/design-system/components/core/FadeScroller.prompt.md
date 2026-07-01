Horizontally-scrolling row whose outer items **fade out** at both ends (a CSS mask) with a hidden scrollbar. The reusable edge-fade treatment for **non-tile** scrollers — source logo rails, filter-pill rows. Tile shelves keep using `MediaRail` (arrows + snap); don't fade those.

```jsx
{/* left-aligned source / filter row */}
<FadeScroller center={false} gap={8}>
  {sources.map((s) => <SourceChip key={s.id} … />)}
</FadeScroller>

{/* centered pill row (centers when it fits, scrolls + fades when it overflows) */}
<FadeScroller gap={12}>
  <GenrePill active>All</GenrePill>
  {genres.map((g) => <GenrePill key={g}>{g}</GenrePill>)}
</FadeScroller>
```

- `fade` sets the fade width at each end (default 32). `gap` sets the child gap. `center` centers the track when it fits (default true) — pass `center={false}` to left-align (rails that start at the edge).
- `controls` adds desktop prev/next **arrows** (fade in on hover) — shown only when the row actually overflows; touch devices keep native scroll. Use it for rails that can run off the edge on desktop (e.g. a source rail or a long filter row).
- The track is padded by the fade width so the first/last child can be scrolled fully clear of the fade; at rest the leading fade sits over the empty inset, not the first item.
- Children lay out in a flex track and size themselves (`flex: 0 0 auto`). RTL-safe.
