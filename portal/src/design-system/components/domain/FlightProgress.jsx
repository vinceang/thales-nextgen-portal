import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Kicker } from "../core/Kicker.jsx";
import s from "./FlightProgress.module.css";

/**
 * FlightProgress — hero route card: origin/destination codes, centered status,
 * a progress line with the plane (positioned via --fp-pct), elapsed/remaining.
 */
export function FlightProgress({
  origin = "LAX", originCity = "Los Angeles, CA",
  destination = "MCO", destinationCity = "Orlando, FL",
  status = "En Route", progress = 0.62,
  elapsed = "2h 09m elapsed", remaining = "1h 19m remaining",
  filled = false, className, style, ...rest
}) {
  const p = Math.max(0, Math.min(1, progress));
  const pct = Math.round(p * 100);
  return (
    <div
      className={className ? `${s.card} ${className}` : s.card}
      data-filled={filled || undefined}
      style={{ "--fp-pct": `${p * 100}%`, ...style }}
      {...rest}
    >
      <div className={s.codes}>
        <div className={s.col}>
          <div className={s.code}>{origin}</div>
          {originCity && <div className={s.city}>{originCity}</div>}
        </div>
        <div className={s.status}>
          <Kicker style={{ fontSize: "var(--fs-subscript)" }}>{status}</Kicker>
          <div className={s.pct}>{pct}% complete</div>
        </div>
        <div className={s.col} data-end="true">
          <div className={s.code}>{destination}</div>
          {destinationCity && <div className={s.city}>{destinationCity}</div>}
        </div>
      </div>
      <div className={s.line}>
        <div className={s.fill} />
        <div className={`${s.dot} ${s.dotStart}`} />
        <div className={`${s.dot} ${s.dotEnd}`} />
        <div className={s.plane}><Icon name="plane" size={20} strokeWidth={1.75} /></div>
      </div>
      <div className={s.foot}>
        <span className={s.elapsed}>{elapsed}</span>
        <span className={s.remaining}>{remaining}</span>
      </div>
    </div>
  );
}
