Auto-advancing hero — a stack of HeroBanner slides with CarouselDots and prev/next arrows. The Watch/Showcase marquee. Autoplay is white-label configurable (toggle + cadence); slides crossfade.

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
- Autoplay pauses on hover/focus and is **disabled entirely under `prefers-reduced-motion`** (accessibility + the system's restrained-motion stance). Dots, arrows, and manual selection always work.
- Prev/next **arrows** (with multiple slides) fade in on hover/focus and step the slide with wraparound; they're hidden on touch, where dots/swipe are the affordance — matching the MediaRail / FadeScroller arrow treatment.
- Each slide forwards straight to `HeroBanner` (image, kicker, Playfair title, CTA). The crossfade is a one-shot opacity transition — nothing loops or bounces.
- For a single, static promo use `HeroBanner` directly; use the carousel only when there are multiple featured items.
- Pass `renderSlide={(slide, i) => …}` to render a custom slide visual (e.g. `AlbumHero` for music) while keeping the autoplay/dots/crossfade machinery. The default rendering (HeroBanner) is used when `renderSlide` is omitted.
