Search field — the nav-bar search overlay and any list / poster / news filter.

```jsx
<Search value={q} onChange={setQ} onSubmit={run} placeholder="Search movies, news, destinations" />
<Search size="lg" autoFocus />   {/* nav-bar search overlay */}
```

- Leading magnifier (the nav `search` glyph), flush dark `surface-3` fill, sharp corners, 1px highlight-blue focus border. A clear `×` appears once there's a query.
- `size="lg"` for the full-width search overlay opened from the nav bar; `md` inline.
- Icons use logical insets so the whole field mirrors cleanly under RTL.
