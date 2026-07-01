import React from "react";
import { Kicker } from "../core/Kicker.jsx";
import { Button } from "../core/Button.jsx";
import s from "./AlbumHero.module.css";

function len(v, d) { const x = v ?? d; return typeof x === "number" ? `${x}px` : x; }

/**
 * AlbumHero — a "now featured" media hero. The same cover is shown crisp at its
 * natural aspect and again as a heavily-blurred, full-bleed background "aura"; a
 * dark gradient over the aura keeps the light text (kicker / title / subtitle)
 * legible. Cover aspect + width are configurable so it works for square album
 * art (default) or portrait book covers (`aspect="2 / 3"`). Designed to be
 * dropped into HeroCarousel via its `renderSlide`.
 */
export function AlbumHero({ cover, kicker, title, subtitle, ctaLabel, onCta, height = 440, aspect = "1 / 1", coverWidth, className, style, ...rest }) {
  const vars = { "--ah-h": len(height, 440), "--ah-cover-aspect": aspect };
  if (coverWidth) vars["--ah-cover-w"] = coverWidth;
  return (
    <div className={className ? `${s.hero} ${className}` : s.hero} style={{ ...vars, ...style }} {...rest}>
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
