import React from "react";
import s from "./ProgressBar.module.css";

/**
 * ProgressBar — determinate or indeterminate. Hairline track, highlight-blue
 * fill. RTL-safe: the fill grows from the inline-start.
 */
export function ProgressBar({ value, max = 100, indeterminate = false, label, showValue = false, height = 6, className, style, ...rest }) {
  const pct = indeterminate ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      {(label || showValue) && (
        <div className={s.head}>
          {label && <span className={s.label}>{label}</span>}
          {showValue && !indeterminate && <span className={s.value}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={s.track}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ "--pb-h": `${height}px` }}
      >
        <div className={s.fill} data-indeterminate={indeterminate || undefined} style={{ "--pb-pct": `${pct}%` }} />
      </div>
    </div>
  );
}
