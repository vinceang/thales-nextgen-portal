Brief label explaining an icon-only control (nav-bar Wi-Fi / search / profile glyphs).

```jsx
<Tooltip label="Wi-Fi settings"><IconButton label="Wi-Fi"><Icon name="wifi" /></IconButton></Tooltip>
```

- Reveals on hover **and** keyboard focus. Black bubble, white Montserrat, sharp corners, flat — no shadow, no arrow ornament.
- Wrap exactly one element. Keep the label to a few words; for anything richer (links, multiple lines) use `Popover`.
- `placement` `start`/`end` follow the inline axis, so they mirror under RTL.
