import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";
import s from "./PlanCard.module.css";

/**
 * PlanCard — Wi-Fi pricing card. Recommended = solid highlight-blue top bar, a
 * star, a "Best Value!" caption and a filled CTA; standard = dashed blue accent
 * and a muted outlined CTA. Sharp, flat (no shadow — ADR 0002). Padding via the
 * responsive --pad-card-* tokens.
 */
export function PlanCard({ name, price, features = [], recommended = false, badge = "Best Value!", ctaLabel = "Buy Now", onSelect, className, style, ...rest }) {
  return (
    <div
      className={className ? `${s.card} ${className}` : s.card}
      data-recommended={recommended || undefined}
      style={style}
      {...rest}
    >
      <div className={s.topbar} />
      <div className={s.inner}>
        <div className={s.name}>
          {recommended && (
            <svg className={s.star} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="m12 2 2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
            </svg>
          )}
          <span className={s.nameText}>{name}</span>
        </div>
        <div className={s.price}>{price}</div>
        <div className={s.features}>
          {features.map((f, i) => (
            <div key={i} className={s.feature}>
              <span className={s.check}><Icon name="check" size={13} strokeWidth={3} /></span>
              <span className={s.featureText}>{f}</span>
            </div>
          ))}
        </div>
        <div className={s.spacer} />
        {recommended && badge && <div className={s.badge}>{badge}</div>}
        <Button
          variant={recommended ? "primary" : "secondary"}
          fullWidth
          onClick={onSelect}
          style={recommended ? undefined : { color: "var(--color-grey)", borderColor: "var(--color-grey)" }}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
