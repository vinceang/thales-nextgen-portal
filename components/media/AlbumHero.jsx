import React from "react";
import { Kicker } from "../core/Kicker.jsx";
import { Button } from "../core/Button.jsx";
import s from "./AlbumHero.module.css";

function len(v, d) { const x = v ?? d; return typeof x === "number" ? `${x}px` : x; }

/**
 * AlbumHero — a "now featured" music hero. The same square cover is shown crisp
 * at 1:1 and again as a heavily-blurred, full-bleed background "aura"; a dark
 * gradient over the aura keeps the light text (kicker / title / subtitle) legible.
 * Designed to be dropped into HeroCarousel via its `renderSlide`.
 */
export function AlbumHero({ cover, kicker, title, subtitle, ctaLabel, onCta, height = 440, className, style, ...rest }) {
  return (
    <div className={className ? `${s.hero} ${className}` : s.hero} style={{ "--ah-h": len(height, 440), ...style }} {...rest}>
      {cover && <img src={cover} alt="" aria-hidden="true" className={s.bg} />}
      <div className={s.overlay} />
      <div className={s.content}>
        {cover && <img src={cover} alt="" className={s.cover} />}
        <div className={s.text}>
          {kicker && <Kicker>{kicker}</Kicker>}
          <h2 className={s.title}>{title}</h2>
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          {ctaLabel && (
            <div className={s.cta}>
              <Button variant="primary" size="lg" onClick={onCta}>{ctaLabel}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
