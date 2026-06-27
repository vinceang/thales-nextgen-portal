Page through a long set of results (movie catalogue, news archive, store).

```jsx
<Pagination page={page} total={12} onChange={setPage} />
```

- Sharp square cells; current page = highlight-blue fill, others hairline-outlined. Prev/next chevrons mirror under RTL and disable at the ends.
- Long ranges auto-collapse with ellipses around the current page. For continuous feeds, prefer infinite-scroll / a "Load more" `Button`; reserve pagination for browsable, countable sets.
