A single stat: line icon, uppercase label, big value. Hairline border + transparent fill, sharp corners (rounds via the white-label `--radius-card` token). Value rides the fluid scale.

```jsx
<TileGrid columns={4} phone={1}>
  <MetricTile icon="mountain"    label="Altitude"        value="37,000 ft" />
  <MetricTile icon="gauge"       label="Ground Speed"    value="561 mph" />
  <MetricTile icon="navigation"  label="Distance Left"   value="742 mi" />
  <MetricTile icon="clock"       label="Arrival (Local)" value="6:42 PM" />
</TileGrid>
```

- `icon` takes an Icon name (bright-blue, 1.75px line) or a custom node. Keep to the Lucide-style set — don't mix in a second icon language.
- Reuse for any metrics surface (flight, weather, connectivity stats) so dashboards stay consistent. Always lay them out with `TileGrid`, never a bespoke grid.
- For label-over-value pairs *without* an icon or border (spec rows), use `DetailItem` instead.
