The single responsive grid primitive — route every tiled layout (metric grids, bento rows, detail rows) through it so breakpoint behaviour is identical everywhere.

```jsx
<TileGrid columns={4} phone={1} gap={16}>
  <MetricTile … /> <MetricTile … /> <MetricTile … /> <MetricTile … />
</TileGrid>
```

- `columns` / `tablet` / `phone` set the count per device tier. Authored **mobile-first**: phone is the base stack and columns are *added* upward at the documented **561 / 1101px** breakpoints (matches the Breakpoints guideline).
- `tablet` defaults to `min(columns, 2)`; `phone` defaults to `1`.
- Children are any tiles — `MetricTile`, `ShowcaseTile`, `DetailItem`, `PlanCard`. Don't hand-roll `grid-template-columns` + media queries per page; use this so the system stays consistent.
