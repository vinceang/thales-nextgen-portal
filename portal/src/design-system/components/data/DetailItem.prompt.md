A quiet label-over-value pair — no icon, no border — for secondary fact rows.

```jsx
<TileGrid columns={4} phone={2} gap={24}>
  <DetailItem label="Flight"   value="SW 1492" />
  <DetailItem label="Aircraft" value="Boeing 737-800" />
  <DetailItem label="Arrival Gate" value="Terminal B · B14" />
  <DetailItem label="Total Distance" value="1,954 mi" align="right" />
</TileGrid>
```

- Use when a stat needs no icon or emphasis — the calmer sibling of `MetricTile`.
- `align="right"` for the trailing item in a row reads as a clean ledger edge.
