Sticky portal top bar: hamburger + logo left, centered view title, search/Wi-Fi/profile right.

```jsx
<NavBar title="Showcase" logo="/assets/logos/thales-white.svg"
  wifiActive onMenu={open} onSearch={search} />
```

- The menu uses activity verbs; the title uses the content noun ("Watch" menu → "Movies" title).
- `wifiActive` turns the Wi-Fi glyph bright-blue. White icons, no fill.
