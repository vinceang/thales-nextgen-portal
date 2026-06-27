Static, readable data table — itinerary legs, billing history, plan comparison.

```jsx
<Table rowKey="id"
  columns={[
    { key: "leg", header: "Flight" },
    { key: "from", header: "From" },
    { key: "to", header: "To" },
    { key: "miles", header: "Miles", align: "end" },
  ]}
  rows={legs} />
```

- UPPERCASE Montserrat heads on a strong hairline baseline; hairline row dividers; **no zebra fill**, no shadow — depth is contrast, hover lifts a row to `surface-2`.
- Right-align numeric columns (`align:"end"`, tabular figures) so they mirror correctly under RTL. Use `render` for cells that need a `Badge`/`Link`/icon.
- Reach for `DataGrid` once you need sorting, row selection, or many rows.
