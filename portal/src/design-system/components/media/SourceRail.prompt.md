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

- Feed **monochrome** SVGs that paint with `currentColor` — the rail tints them (dim inactive, dark-on-light when active). Don't pass full-colour brand logos.
- Selection is shown by the light chip fill, not a hue (one-accent rule); the chip is sharp (radius 0).
- `active` / `onSelect` are yours to wire to page state (which source's feed to show).
