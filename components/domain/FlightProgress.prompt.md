The full-size flight route hero (the drawer's compact version is `FlightTracker`): big airport codes + cities, a centered status + % complete, a progress line with the plane glyph, and elapsed / remaining beneath.

```jsx
<FlightProgress
  origin="LAX" originCity="Los Angeles, CA"
  destination="MCO" destinationCity="Orlando, FL"
  status="En Route" progress={0.62}
  elapsed="2h 09m elapsed" remaining="1h 19m remaining" />
```

- Codes are large **Montserrat** (sans) — Playfair stays reserved for editorial heroes.
- The plane glyph is rotated to fly horizontally along the line; the endpoint dots use the bright-blue (origin, reached) and a faint dot (destination, pending).
- Pair it above a `TileGrid` of `MetricTile`s (altitude / speed / distance / arrival) and a `DetailItem` row for the full Flight page.
- Hairline panel by default; pass `filled` for a raised surface-2 card.
