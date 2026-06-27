Instant on/off switch for a single setting (Wi-Fi auto-reconnect, °F/°C, captions).

```jsx
<Toggle checked={autoReconnect} onChange={setAutoReconnect} label="Auto-reconnect" />
```

- One of the few rounded shapes (pill track + round white knob). On = highlight-blue track; off = dark `surface-3`.
- Use a Toggle for a setting that applies immediately. For a yes/no inside a form that's submitted later, use `Checkbox`; for one-of-many, use `Radio`.
- The knob slides along the inline axis, so it mirrors correctly under RTL. Don't add a second hue or a glow.
