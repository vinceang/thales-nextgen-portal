Inline, in-context status banner (connection lost, payment confirmed, weak signal).

```jsx
<Alert tone="success" title="You're connected">Full-flight Wi-Fi is active until landing.</Alert>
<Alert tone="warning" title="Weak signal" onClose={dismiss}>Speeds may drop over open water.</Alert>
```

- **One hue.** Status is conveyed by the leading icon — `info`/`success` use the bright-blue glyph, `warning`/`error` use a white glyph. Never introduce red/green/amber.
- Flat treatment: dark `surface-2`, hairline border, **no** left accent bar, no shadow. Title in white, body in muted white.
- Use `Alert` for in-page, persistent context; use `Toast` for transient, floating confirmations.
