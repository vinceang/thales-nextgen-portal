Two-option **segmented control** for switching a gallery between **grid** and **list** layouts. Presentational — you own `value` + `onChange`. Sits top-right of a gallery, by the filter row.

```jsx
const [view, setView] = useState("grid");

<ViewToggle value={view} onChange={setView}
  gridLabel={t("common.viewGrid")} listLabel={t("common.viewList")} />

{view === "grid"
  ? rows.map((r) => <MediaRail title={r.label}>{tiles}</MediaRail>)
  : rows.map((r) => <section><h3>{r.label}</h3>{r.items.map((i) => <MediaRow … />)}</section>)}
```

- The selected segment is an inverted fill (`--text-primary` / `--bg-page`) — theme-safe, and deliberately **not** the accent hue, so it doesn't compete with the blue filter pills.
- Pass localized `gridLabel` / `listLabel` for the aria-label + tooltip. Sharp, hairline container, no shadow.
- Pair grid mode with `MediaRail` / `TileGrid` tiles and list mode with `MediaRow` rows.
