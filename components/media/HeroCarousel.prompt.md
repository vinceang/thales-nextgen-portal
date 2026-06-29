Auto-advancing hero — a stack of HeroBanner slides with CarouselDots. The Watch/Showcase marquee. Autoplay is white-label configurable (toggle + cadence); slides crossfade.

```jsx
<HeroCarousel
  slides={featured}              /* [{ id, image, kicker, title, ctaLabel }] */
  autoPlay={config.autoPlay}     /* tenant-configurable */
  intervalMs={config.intervalMs} /* tenant-configurable, default 6000 */
  height={480}
  onCta={(slide) => playOrUpsell(slide)}
/>
```

- Drive `autoPlay` / `intervalMs` from your content/config seam so a tenant can slow, speed up, or disable rotation without a code change.
- Autoplay pauses on hover/focus and is **disabled entirely under `prefers-reduced-motion`** (accessibility + the system's restrained-motion stance). Dots and manual selection always work.
- Each slide forwards straight to `HeroBanner` (image, kicker, Playfair title, CTA). The crossfade is a one-shot opacity transition — nothing loops or bounces.
- For a single, static promo use `HeroBanner` directly; use the carousel only when there are multiple featured items.
