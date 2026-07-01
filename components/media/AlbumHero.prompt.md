Music "now featured" hero. The square cover is shown crisp at 1:1 **and** again as a heavily-blurred, full-bleed background "aura"; a dark gradient over it keeps the light kicker/title/subtitle legible.

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

- The cover doubles as the background (blurred + scaled + darkened) — pass one square image. Title is Playfair (hero face); kicker is the bright-blue `Kicker`; subtitle is muted Montserrat.
- For an editorial photo hero with the headline over a full-bleed backdrop use `HeroBanner`; use `AlbumHero` when the feature art is square (album/podcast) and should read as an aura.
