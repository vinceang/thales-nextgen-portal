Group several filter controls for refining a catalogue (Movies, News, Shop).

```jsx
<FilterPanel activeCount={2} onClear={reset}>
  <FilterSection label="Genre">
    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
      {genres.map(g => <GenrePill key={g} active={sel.has(g)} onClick={() => toggle(g)}>{g}</GenrePill>)}
    </div>
  </FilterSection>
  <FilterSection label="Rating">
    <Checkbox checked={r.g} onChange={...}>Rated G</Checkbox>
    <Checkbox checked={r.pg} onChange={...}>Rated PG</Checkbox>
  </FilterSection>
</FilterPanel>
```

- A structural shell only — it brings the title, an applied-count, a "Clear all" link, and hairline-separated `FilterSection`s. Drop the system's own controls (`GenrePill`, `Checkbox`, `Chip`, `DatePicker`) inside.
- Inline it in a sidebar on desktop; place it inside a `Drawer` (`side="end"`) on phone with an "Apply" `Button` in the drawer footer. Flat, dark, one accent.
