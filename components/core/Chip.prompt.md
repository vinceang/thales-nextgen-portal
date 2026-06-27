Compact, sharp-cornered token for an applied filter, selected value, or tag.

```jsx
<Chip selected>Action</Chip>
<Chip onRemove={() => clear('orlando')}>Orlando</Chip>
<Chip leading={<Icon name="wifi" size={14} />}>Connected</Chip>
```

- **Chip vs GenrePill:** `GenrePill` is the ONE rounded shape — use it for the horizontal category/topic filter row (ALL · ACTION · COMEDY). `Chip` is the sharp `--radius-control` token for *applied* filters, selected tokens, and dismissable tags.
- `selected` gives the blue fill; `onRemove` adds a trailing × (mirrors under RTL).
- Keep labels short. Stay monochrome + blue — no extra hues.
