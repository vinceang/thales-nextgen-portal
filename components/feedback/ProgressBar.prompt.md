Determinate or indeterminate progress (download, plan usage, upload).

```jsx
<ProgressBar value={68} label="Data used" showValue />
<ProgressBar indeterminate label="Connecting…" />
```

- Hairline `surface-3` track with one highlight-blue fill, sharp corners. The fill grows from the inline-start, so it mirrors under RTL.
- Use determinate when you know the amount; `indeterminate` (sweeping sliver) when you don't — and prefer `Spinner` for tiny inline waits.
- Note this is the generic bar; the route/flight progress hero is the separate domain `FlightProgress`.
