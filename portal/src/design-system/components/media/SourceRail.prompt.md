Horizontally-scrollable row of **news-source logos** (monochrome, `currentColor`). Inactive sources are dimmed; the active one lifts to a solid **light chip**. Presentational — the consumer owns selection. Wraps `FadeScroller`, so the outer logos fade at both ends.

```jsx
<SourceRail
  sources={[
    { id: "bbc", name: "BBC", logo: "/assets/logos/news/bbc.svg" },
    { id: "cnn", name: "CNN", logo: "/assets/logos/news/cnn.svg" },
    …
  ]}
  active={source}
  onSelect={setSource}
/>
```

- Feed **monochrome** SVGs (single-tone on transparent). The rail tints them to a **silhouette** with a CSS `filter` — foreground when inactive (white in dark mode, dark in light mode), inverted on the active chip. (img-embedded SVGs ignore `color`/`currentColor`, so a filter is used, not the token directly.) Full-colour logos get flattened to a silhouette — prefer monochrome.
- Selection is shown by the light chip fill, not a hue (one-accent rule); the chip is rounded (`--radius-chip`).
- `active` / `onSelect` are yours to wire to page state (which source's feed to show).
