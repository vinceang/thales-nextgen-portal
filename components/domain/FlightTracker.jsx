import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * FlightTracker — origin → plane → destination progress strip shown at the top
 * of the side drawer. Plane glyph advances along a hairline by `progress`.
 */
export function FlightTracker({
  origin = "LAX",
  destination = "MCO",
  duration = "3h 28m",
  progress = 0.35,
  tone = "dark",
  style,
  ...rest
}) {
  const p = Math.max(0, Math.min(1, progress));
  // "dark" = on the always-black overlay drawer (white-alpha, fixed).
  // "theme" = on a themed surface (page rail) — follows light/dark tokens.
  const c = tone === "theme"
    ? { code: "var(--text-emphasis)", fill: "var(--color-bright-blue)", track: "var(--hairline-track)", sub: "var(--text-secondary)" }
    : { code: "var(--color-bright-blue)", fill: "var(--color-bright-blue)", track: "rgba(255,255,255,0.25)", sub: "rgba(255,255,255,0.55)" };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: c.code, letterSpacing: "0.04em" }}>{origin}</span>
        <div style={{ position: "relative", flex: 1, height: 2, background: c.track }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${p * 100}%`, background: c.fill }} />
          <div style={{ position: "absolute", top: "50%", left: `${p * 100}%`, transform: "translate(-50%,-50%) rotate(45deg)", color: c.fill }}>
            <Icon name="plane" size={16} strokeWidth={1.75} />
          </div>
        </div>
        <span style={{ fontWeight: 700, fontSize: 13, color: c.code, letterSpacing: "0.04em" }}>{destination}</span>
      </div>
      <div style={{ fontSize: 11, color: c.sub, letterSpacing: "0.04em" }}>{duration}</div>
    </div>
  );
}
