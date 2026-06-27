Wi-Fi pricing card. Recommended plan: solid blue top bar, star, "Best Value!" caption, filled CTA.
Standard plans: dashed blue top accent, muted outlined CTA.

```jsx
<PlanCard name="High-Speed Streaming" price="$6" recommended
  features={["Messaging","E-mail","Basic Browsing","Streaming"]}
  ctaLabel="Buy Now" onSelect={pick} />
<PlanCard name="Browsing" price="$4"
  features={["Messaging","E-mail","Basic Browsing"]} ctaLabel="Buy Now" />
```

- Lay 3 across in an equal grid. Only one card should be `recommended`.
- Price is centered and light-weight; features use blue check-circle bullets.
- On mobile, move the recommended card to the top (via grid `order`).
