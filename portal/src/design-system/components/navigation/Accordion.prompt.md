Stacked collapsible sections — FAQs, plan details, layered settings.

```jsx
<Accordion defaultOpen={[0]} items={[
  { title: "What speeds can I expect?", content: "Up to 15 Mbps over land…" },
  { title: "Does my pass cover the full flight?", content: "Yes, until landing." },
]} />
```

- Hairline-separated rows; Montserrat title with a chevron that rotates on open (the chevron turns bright-blue when expanded). Flat, dark, no shadow.
- Single-open by default; `multiple` allows several. For top-level navigation use `NavigationMenu`; for peer views use `Tabs`.
