Text hyperlink. Two roles: an inline body link and a standalone action link.

```jsx
<p>Read our <Link href="/terms">Terms of Use</Link> before connecting.</p>
<Link variant="standalone" arrow href="/weather">5-Day Forecast</Link>
```

- `variant`: `inline` (bright-blue, underline + shift to link-blue on hover — use inside body copy) | `standalone` (uppercase Montserrat 700, white→bright-blue on hover — use as a section "view all" / "forecast" affordance).
- `arrow` adds a trailing chevron; it mirrors automatically under RTL.
- Never use a serif for links. Keep standalone labels 1–3 words. Don't introduce any colour other than the blue accent.
