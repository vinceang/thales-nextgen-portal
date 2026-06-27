Edge sheet for secondary tasks beside the main view (filters, cart, item details).

```jsx
<Drawer open={open} onClose={close} side="end" title="Filters"
  footer={<Button fullWidth onClick={apply}>Show 24 Results</Button>}>
  {/* FilterPanel, etc. */}
</Drawer>
```

- Slides in from a screen edge over the 70% **black** backdrop; panel sits on the black overlay tone, hairline divider lines, flat (no shadow).
- `side` `start`/`end` follow the inline axis so the panel and its slide direction mirror under RTL; `bottom` for a mobile sheet. Esc / backdrop close.
- **Drawer vs SideDrawer:** `SideDrawer` is the portal's primary navigation drawer (flight tracker + menu). Use this generic `Drawer` for everything else.
