import React from "react";
import { Kicker } from "../core/Kicker.jsx";
import { Button } from "../core/Button.jsx";

/**
 * HeroBanner — large editorial promo (the Showcase "Connect" hero): full-bleed
 * image, Playfair headline, kicker, and a primary CTA.
 */
export function HeroBanner({
  image,
  kicker,
  title,
  ctaLabel,
  onCta,
  height = 420,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-2)",
        ...style,
      }}
      {...rest}
    >
      {image && (
        <img
          src={image}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-full)" }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 36,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {kicker && <Kicker>{kicker}</Kicker>}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              color: "var(--color-white)",
              maxWidth: 620,
            }}
          >
            {title}
          </h2>
        </div>
        {ctaLabel && (
          <Button variant="primary" size="lg" onClick={onCta}>
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
