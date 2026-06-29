Horizontally-scrolling "shelf" of media tiles — the streaming gallery row (Watch / Listen / News). Heading on top, tiles scroll along the inline axis with snap; desktop gets prev/next arrows that fade in on hover.

```jsx
<MediaRail title="Trending Now">
  {movies.map((m) => (
    <div key={m.id} style={{ width: 180 }}>
      <ShowcaseTile image={m.poster} title={m.title} kicker="Watch" height={270} />
    </div>
  ))}
</MediaRail>
```

- Generic over the tile — pass any fixed-width children (ShowcaseTile posters, NewsItem cards). The rail owns the scroll container, scroll-snap, hidden scrollbar, and arrows; children carry their own width.
- Scrollbar is hidden by design; the arrows (fine-pointer only) and drag/swipe are the affordance. On touch the arrows are hidden.
- RTL-safe: scrolls along the inline axis; arrows use logical insets. Sharp, flat — no shadow.
- `action` renders at the inline-end of the heading (e.g. a "See all" Link). `gap` sets the inter-tile spacing (default 16).
