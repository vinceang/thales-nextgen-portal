import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * PlanCard — Wi-Fi pricing card. The recommended plan gets a SOLID highlight-blue
 * top bar, a star before its name, a "Best Value!" caption and a filled CTA;
 * standard plans get a DASHED blue top accent and a muted outlined CTA.
 */
export function PlanCard({
  name,
  price,
  features = [],
  recommended = false,
  badge = "Best Value!",
  ctaLabel = "Buy Now",
  onSelect,
  className,
  style,
  ...rest
}) {
  const topBar = recommended
    ? { background: "var(--color-highlight-blue)" }
    : { background: "repeating-linear-gradient(90deg, rgba(31,153,255,0.55) 0 26px, transparent 26px 40px)" };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        background: "linear-gradient(180deg, rgba(36,42,50,0.55) 0%, rgba(12,15,18,0.9) 100%)",
        boxShadow: "0 30px 50px -30px rgba(0,0,0,0.7)",
        minWidth: 220,
        ...style,
      }}
      {...rest}
    >
      {/* Top accent — solid (recommended) or dashed (standard) */}
      <div className="plan-topbar" style={{ height: 6, ...topBar }} />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "32px 28px 28px" }}>
        {/* Name */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {recommended && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-bright-blue)" aria-hidden="true">
              <path d="m12 2 2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
            </svg>
          )}
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)", textAlign: "center" }}>
            {name}
          </span>
        </div>

        {/* Price — centered, light weight */}
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 60, color: "var(--text-primary)", textAlign: "center", margin: "18px 0 28px", letterSpacing: "0.01em", lineHeight: 1 }}>
          {price}
        </div>

        {/* Features — blue check-circle bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ flex: "none", width: 22, height: 22, borderRadius: "var(--radius-pill)", background: "var(--color-highlight-blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <Icon name="check" size={13} strokeWidth={3} />
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 16, color: "var(--text-primary)" }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, minHeight: 28 }} />

        {/* Best Value caption (recommended only) */}
        {recommended && badge && (
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--color-bright-blue)", textAlign: "center", marginBottom: 14 }}>
            {badge}
          </div>
        )}

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
