First-choice action button: uppercase Montserrat label, sharp corners, one bright-blue fill.

```jsx
<Button variant="primary" size="md" onClick={connect}>View Plans</Button>
<Button variant="secondary">5-Day Forecast</Button>
```

- `variant`: `primary` (highlight-blue fill, white label — the single most important action) | `secondary` (transparent, hairline outline).
- `size`: `sm` | `md` | `lg`. `fullWidth` stretches to the container (used in plan cards / payment).
- Labels are uppercased automatically; keep them 1–3 words.
