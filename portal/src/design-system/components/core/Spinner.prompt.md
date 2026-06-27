Indeterminate loading ring for in-flight async waits (connecting, loading posters).

```jsx
<Spinner />
<Spinner size={20} label="Connecting…" />
```

- A faint hairline track with one rotating highlight-blue arc — single accent, no glow, no second hue.
- Use for short, indeterminate waits; for known progress use `ProgressBar`, for content placeholders use `Skeleton`.
- The ring is one of the few rounded forms (it is a loader, not a surface). Respects `prefers-reduced-motion` at the page level.
