Data-driven vertical destination list — the contents of the slide-out drawer / a sidebar.

```jsx
<NavigationMenu value={view} onSelect={setView} items={[
  { label: "Showcase", icon: "menu" },
  { label: "Watch", icon: "eye" },
  { label: "News", icon: "info", badge: 3 },
  { label: "Weather", icon: "cloud-sun" },
]} />

{/* grouped */}
<NavigationMenu items={[{ label:"Entertainment", items:[…] }, { label:"Connectivity", items:[…] }]} />
```

- Built to **grow**: pass a flat list or grouped sections — adding destinations never forces a redesign (per the roadmap). Active item is bright-blue with a 2px inline-start rule; optional leading line icon + trailing count.
- Use inside `SideDrawer` / a sidebar. The single-word label convention from the portal nav applies. Mirrors under RTL via logical insets.
