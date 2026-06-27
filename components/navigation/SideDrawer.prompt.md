Full-height black slide-out menu. Flight tracker on top, large Montserrat nav items, dimmed backdrop.

```jsx
<SideDrawer
  open={menuOpen}
  flight={{ origin: "LAX", destination: "MCO", duration: "3h 28m", progress: 0.4 }}
  items={["Showcase","Connect","Watch","Listen","News","Read","Weather","Shop"]}
  active="Showcase"
  onSelect={go}
  onClose={() => setMenuOpen(false)}
/>
```

- Items are single words in Montserrat 700; the active item is bright-blue.
- Slides in from the left over a black panel; backdrop click closes.
