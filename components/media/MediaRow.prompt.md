Horizontal **list-mode row** for a gallery — a thumbnail + title/subtitle/meta, with optional trailing content. The list counterpart to `MediaCard` / `ShowcaseTile`; pair it with `ViewToggle` (grid ↔ list).

```jsx
{rows.map((r) => (
  <section key={r.key}>
    <h3>{r.label}</h3>
    {r.items.map((a) => (
      <MediaRow key={a.id} image={a.cover} aspect="1 / 1" title={a.title} subtitle={a.artist}
        trailing={<FavoriteButton active={isFavorite(a.id)} onChange={() => toggle(a)} />}
        onClick={() => open(a)} />
    ))}
  </section>
))}
```

- `aspect` matches the item's cover shape — `1 / 1` album art, `2 / 3` book/poster, `16 / 10` news. The thumbnail is a fixed height; its width follows the aspect, so rows stay a uniform height.
- `meta` is a third muted line (e.g. a timestamp). `trailing` holds a control like `FavoriteButton`.
- Rows carry a hairline bottom divider. Sharp, flat, no shadow.
