Date field with a pop-down calendar — travel date, booking, billing.

```jsx
<DatePicker label="Departure" value={date} onChange={setDate} />
```

- A trigger field (matches `Input`: dark fill, sharp corners, blue focus, trailing calendar glyph) opens a flat calendar **panel** below it — no drop shadow, dark `surface-2`, hairline border.
- Selected day = highlight-blue fill; today = hairline ring; hover = `surface-3`. Month chevrons mirror under RTL; the panel anchors with logical `inset-inline-start`.
- Dates render LTR even inside an RTL run. Closes on outside click or selection. For a date *range*, compose two pickers.
