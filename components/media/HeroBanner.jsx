import React from "react";
import { Kicker } from "../core/Kicker.jsx";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";
import s from "./HeroBanner.module.css";

function len(v, d) { const x = v ?? d; return typeof x === "number" ? `${x}px` : x; }

/**
 * HeroBanner — large editorial promo: full-bleed image, scrim, Playfair headline,
 * kicker, primary CTA. Set `ctaArrow` to append a trailing chevron (Link arrow).
 */
export function HeroBanner({ image, kicker, title, ctaLabel, ctaArrow = false, onCta, height = 420, className, style, ...rest }) {
  return (
    <div className={className ? `${s.hero} ${className}` : s.hero} style={{ "--hb-h": len(height, 420), ...style }} {...rest}>
      {image && <img src={image} alt="" className={s.img} />}
      <div className={s.scrim} />
      <div className={s.content}>
        <div className={s.text}>
          {kicker && <Kicker>{kicker}</Kicker>}
          <h2 className={s.title}>{title}</h2>
        </div>
        {ctaLabel && (
          <Button variant="primary" size="lg" onClick={onCta}>
            {ctaLabel}
            {ctaArrow && <Icon name="chevron-right" size={18} strokeWidth={2.2} />}
          </Button>
        )}
      </div>
    </div>
  );
}
