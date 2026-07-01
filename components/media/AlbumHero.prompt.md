Media "now featured" hero. The cover is shown crisp at its natural aspect **and** again as a heavily-blurred, full-bleed background "aura"; a dark gradient over it keeps the light kicker/title/subtitle legible. Cover aspect + width are configurable: square album art by default, or portrait book covers via `aspect="2 / 3"` (narrow the crisp cover with `coverWidth` so a tall cover doesn't overflow — it's also height-capped to the padded hero).

```jsx
{/* on its own */}
<AlbumHero cover={cover} kicker="Listen" title="Album Title" subtitle="Artist Name" ctaLabel="Play" onCta={play} />

{/* in a carousel — reuse HeroCarousel's autoplay/dots via renderSlide */}
<HeroCarousel
  slides={albums}
  renderSlide={(a) => (
    <AlbumHero cover={a.cover} kicker="Listen" title={a.title} subtitle={a.artist}
      ctaLabel="Play" onCta={() => play(a)} height="100%" />
  )}
/>
```

```jsx
{/* portrait book cover — Read gallery */}
<AlbumHero cover={b.cover} aspect="2 / 3" coverWidth="clamp(100px, 26%, 220px)"
  kicker="Read" title={b.title} subtitle={b.author} ctaLabel="Read Now" onCta={open} height="100%" />
```

- The cover doubles as the background (blurred + scaled + darkened) — pass one image. Title is Playfair (hero face); kicker is the bright-blue `Kicker`; subtitle is muted Montserrat.
- For an editorial photo hero with the headline over a full-bleed backdrop use `HeroBanner`; use `AlbumHero` when the feature art is a discrete cover (album/podcast/book) and should read as an aura.
