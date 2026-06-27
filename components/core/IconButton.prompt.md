Borderless white line-icon button for the nav bar (search / Wi-Fi / profile) and small controls.

```jsx
<IconButton label="Search"><SearchSvg /></IconButton>
<IconButton label="Wi-Fi" active><WifiSvg /></IconButton>
```

- Pass the icon SVG as children (Lucide glyphs match the system).
- `active` turns the glyph bright-blue — used for live connectivity status.
- No background, no border; hover dims to 70% opacity.
