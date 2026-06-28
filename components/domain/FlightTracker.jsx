import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./FlightTracker.module.css";

/**
 * FlightTracker — origin → plane → destination strip for the drawer header.
 * Plane advances via --ft-pct. `tone` dark (black overlay) | theme (page surface).
 */
export function FlightTracker({ origin = "LAX", destination = "MCO", duration = "3h 28m", progress = 0.35, tone = "dark", className, style, ...rest }) {
  const p = Math.max(0, Math.min(1, progress));
  return (
    <div
      className={className ? `${s.tracker} ${className}` : s.tracker}
      data-tone={tone}
      style={{ "--ft-pct": `${p * 100}%`, ...style }}
      {...rest}
    >
      <div className={s.row}>
        <span className={s.code}>{origin}</span>
        <div className={s.line}>
          <div className={s.fill} />
          <div className={s.plane}><Icon name="plane" size={16} strokeWidth={1.75} /></div>
        </div>
        <span className={s.code}>{destination}</span>
      </div>
      <div className={s.sub}>{duration}</div>
    </div>
  );
}
