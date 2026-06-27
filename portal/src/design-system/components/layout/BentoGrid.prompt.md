Asymmetric layouts via CSS **named grid-template-areas**, mobile-first. Name each region once (the keys of `items`), then describe where it sits per tier as rows of area names — the layout reads like an ASCII map you can reason about. Use it for the Showcase bento and any hero-plus-rail composition; use **TileGrid** for uniform equal-column grids.

```jsx
<BentoGrid
  gap={16}
  items={{ hero:<HeroBanner …/>, promoA:<ShowcaseTile …/>, promoB:<ShowcaseTile …/>, a:<ShowcaseTile …/>, b:<ShowcaseTile …/> }}
  phone={{   columns:"1fr",         areas:["hero","promoA","promoB","a","b"] }}
  tablet={{  columns:"1fr 1fr",     areas:["hero hero","promoA promoB","a b"] }}
  desktop={{ columns:"2fr 1fr 1fr", areas:["hero hero promoA","hero hero promoB","a a b"] }}
/>
```

- **Mobile-first:** `phone` is the base stack; `tablet` / `desktop` re-place the same areas at the documented 561 / 1101px breakpoints.
- Every area in a tier must form a filled rectangle (CSS rule). Omit a tier to inherit the smaller one.
- This is the white-label backbone: a rebrand keeps the area names and tile components, swaps only tokens/imagery (see the Spirit skin).
