import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Kicker } from "../core/Kicker.jsx";

/**
 * FlightProgress — the hero route card for a Flight page: big origin / destination
 * codes with city sub-labels, a centered status (EN ROUTE · % complete), a progress
 * line with the plane glyph, and elapsed / remaining beneath. The drawer's small
 * strip is `FlightTracker`; this is the full-size surface.
 *
 * Sharp by default; rounds via the white-label --radius-card token.
 */
const CODE_FS = "clamp(32px, calc(32px + 12 * (100vw - 480px) / 720), 44px)";

export function FlightProgress({
  origin = "LAX",
  originCity = "Los Angeles, CA",
  destination = "MCO",
  destinationCity = "Orlando, FL",
  status = "En Route",
  progress = 0.62,
  elapsed = "2h 09m elapsed",
  remaining = "1h 19m remaining",
  filled = false,
  style,
  ...rest
}) {
  const p = Math.max(0, Math.min(1, progress));
  const pct = Math.round(p * 100);
  return (
    <div
      style={{
        border: "var(--border-width) solid var(--border-hairline)",
        borderRadius: "var(--radius-card)",
        background: filled ? "var(--surface-tile)" : "transparent",
        padding: "clamp(20px, 3.2vw, 36px)",
        ...style,
      }}
      {...rest}
    >
      {/* Codes + centered status */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: CODE_FS, lineHeight: 1, color: "var(--text-primary)" }}>{origin}</div>
          {originCity && <div style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-secondary)", marginTop: 8 }}>{originCity}</div>}
        </div>

        <div style={{ textAlign: "center", paddingTop: 4 }}>
          <Kicker style={{ fontSize: "var(--fs-subscript)" }}>{status}</Kicker>
          <div style={{ fontWeight: 700, fontSize: "var(--fs-body-3)", color: "var(--text-primary)", marginTop: 4 }}>{pct}% complete</div>
        </div>

        <div style={{ minWidth: 0, textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: CODE_FS, lineHeight: 1, color: "var(--text-primary)" }}>{destination}</div>
          {destinationCity && <div style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-secondary)", marginTop: 8 }}>{destinationCity}</div>}
        </div>
      </div>

      {/* Progress line */}
      <div style={{ position: "relative", height: 2, background: "var(--border-hairline)", margin: "28px 0 14px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${p * 100}%`, background: "var(--color-bright-blue)" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, transform: "translate(-50%,-50%)", width: 9, height: 9, borderRadius: "var(--radius-pill)", background: "var(--color-bright-blue)" }} />
        <div style={{ position: "absolute", top: "50%", left: "100%", transform: "translate(-50%,-50%)", width: 9, height: 9, borderRadius: "var(--radius-pill)", background: "var(--color-border-strong)" }} />
        <div style={{ position: "absolute", top: "50%", left: `${p * 100}%`, transform: "translate(-50%,-50%) rotate(45deg)", color: "var(--text-primary)" }}>
          <Icon name="plane" size={20} strokeWidth={1.75} />
        </div>
      </div>

      {/* Elapsed / remaining */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{elapsed}</span>
        <span style={{ color: "var(--text-secondary)" }}>{remaining}</span>
      </div>
    </div>
  );
}
