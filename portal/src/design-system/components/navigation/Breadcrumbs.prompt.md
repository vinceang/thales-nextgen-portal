Hierarchical trail showing where the passenger is (Shop → Duty Free → Fragrance).

```jsx
<Breadcrumbs items={[
  { label: "Shop", href: "/shop" },
  { label: "Duty Free", href: "/shop/duty-free" },
  { label: "Fragrance" },           // current — no href
]} />
```

- Muted ancestor links (hover → bright-blue), a faint chevron separator, and a plain white current page (last item, no link).
- The chevron is marked `data-chevron` so it mirrors under RTL (`[dir=rtl] [data-chevron]{transform:scaleX(-1)}`). Keep labels to the real page titles; don't truncate the trail unless it overflows.
