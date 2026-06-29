import React from "react";
import { HeroBanner } from "./HeroBanner.jsx";
import { CarouselDots } from "./CarouselDots.jsx";
import s from "./HeroCarousel.module.css";

function len(v, d) { const x = v ?? d; return typeof x === "number" ? `${x}px` : x; }

/**
 * HeroCarousel — a stack of HeroBanner slides with CarouselDots. Autoplay is
 * configurable for white-label tenants: `autoPlay` toggles it and `intervalMs`
 * sets the cadence (drive both from your content/config seam). Pauses on
 * hover/focus and when the OS requests reduced motion. Slides crossfade — no
 * looping/bouncing content motion.
 */
export function HeroCarousel({
  slides = [],
  autoPlay = true,
  intervalMs = 6000,
  height = 480,
  onCta,
  className,
  style,
  ...rest
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = usePrefersReducedMotion();
  const count = slides.length;

  // Keep the index in range if the slide set shrinks.
  React.useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  // Advance one slide after intervalMs, unless paused / reduced-motion / single.
  React.useEffect(() => {
    if (!autoPlay || reduce || paused || count < 2) return undefined;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => window.clearTimeout(id);
  }, [autoPlay, reduce, paused, count, index, intervalMs]);

  if (count === 0) return null;

  return (
    <div
      className={className ? `${s.carousel} ${className}` : s.carousel}
      style={{ "--hc-h": len(height, 480), ...style }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      {...rest}
    >
      <div className={s.viewport}>
        {slides.map((sl, i) => (
          <div
            key={sl.id ?? i}
            className={s.slide}
            data-active={i === index ? "true" : undefined}
            aria-hidden={i === index ? undefined : true}
          >
            <HeroBanner
              image={sl.image}
              kicker={sl.kicker}
              title={sl.title}
              ctaLabel={sl.ctaLabel}
              ctaArrow={sl.ctaArrow}
              height="100%"
              onCta={() => onCta && onCta(sl, i)}
            />
          </div>
        ))}
      </div>
      {count > 1 && <CarouselDots className={s.dots} count={count} active={index} onSelect={setIndex} />}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduce;
}
