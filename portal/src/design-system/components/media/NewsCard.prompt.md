A **secondary news story** — image, relative timestamp, and title. In a grid (via `TileGrid`) it's a vertical card with the image on top; on phone it flips to an **image-left list row** (title above the timestamp), matching the mobile news feed.

```jsx
<TileGrid columns={4} tablet={3} phone={1} gap={24}>
  {stories.map((a) => (
    <NewsCard key={a.id} image={a.image} timeAgo={a.timeAgo} title={a.title} onClick={() => open(a)} />
  ))}
</TileGrid>
```

- Title is Montserrat (an ordinary gallery/feed title, not a hero) — the Playfair face is reserved for `NewsHero`.
- Timestamp is muted. Sharp image, no radius, no shadow.
- For the page's lead story use `NewsHero`; for image-over-title bento cells use `ShowcaseTile`.
