Multi-line text field — feedback, special requests, notes.

```jsx
<TextArea label="Tell us about your trip" placeholder="Optional" rows={5}
  value={notes} onChange={e => setNotes(e.target.value)} maxLength={280} />
```

- Matches `Input` exactly (dark `surface-3` fill, sharp `--radius-control`, grey placeholder, 1px highlight-blue focus). Vertically resizable.
- `maxLength` adds a tabular `N/max` counter; `helper` adds a muted hint line. The counter sits at the inline-end so it mirrors under RTL.
- Keep the airy line-height; don't shrink below the body size.
