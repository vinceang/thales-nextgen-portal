Neutral content container — settings groups, summaries, any boxed block of UI.

```jsx
<Card title="Trip Summary" subtitle="LAX → MCO"
  footer={<Button>View Details</Button>}>
  Your streaming pass is active for the full flight.
</Card>
```

- Dark raised `surface-2`, hairline border, sharp `--radius-card`, **flat** — depth comes from surface contrast, never a shadow. Footer actions align to the inline-end (mirrors under RTL).
- `title` renders as an **`<h3>` in Montserrat** (the UI face) — a Card is UI, so its title is sans, never serif. Serif (`--font-tile`) is reserved for media-tile / hero titles (`ShowcaseTile`, `AlbumHero`, `NewsHero`).
- This is the generic container. For a full-bleed **image** tile use `ShowcaseTile`; for a **pricing** card use `PlanCard`; for a metric use `MetricTile`. `interactive` lifts the border when the whole card is clickable.
