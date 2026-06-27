Interactive table for larger, working data sets — admin/ops views, usage logs.

```jsx
<DataGrid rowKey="id" selectable selected={sel} onSelectedChange={setSel}
  columns={[
    { key: "title", header: "Title" },
    { key: "genre", header: "Genre" },
    { key: "plays", header: "Plays", align: "end" },
    { key: "rating", header: "Rating", render: r => <Badge tone="outline">{r.rating}</Badge> },
  ]}
  rows={catalogue} />
```

- Builds on `Table`'s flat sharp look and adds **click-to-sort** heads (active head bright-blue with a direction chevron), optional **row selection** (leading `Checkbox`, selected rows on `surface-2`), and a **sticky header**.
- Sorting is internal by default; supply `sortValue` for custom keys. Right-align numeric columns. For a simple read-only table use `Table`.
