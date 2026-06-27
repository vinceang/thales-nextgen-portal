import React from "react";

/**
 * ProgressBar — determinate or indeterminate. A hairline track with a
 * highlight-blue fill (sharp via radius-control). Indeterminate uses the
 * `ds-indeterminate` keyframe sweep. RTL-safe: the fill grows from inset-inline.
 */
export function ProgressBar({ value, max = 100, indeterminate = false, label, showValue = false, height = 6, style, ...rest }) {
  const pct = indeterminate ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ width: "100%", ...style }} {...rest}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, fontFamily: "var(--font-sans)", fontSize: 13 }}>
          {label && <span style={{ color: "var(--on-surface-2)" }}>{label}</span>}
          {showValue && !indeterminate && <span style={{ marginInlineStart: "auto", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ position: "relative", width: "100%", height, background: "var(--color-surface-3)", borderRadius: "var(--radius-control)", overflow: "hidden" }}
      >
        <div
          style={
            indeterminate
              ? { position: "absolute", top: 0, height: "100%", background: "var(--color-highlight-blue)", borderRadius: "var(--radius-control)", animation: "ds-indeterminate 1.3s var(--ease-smooth) infinite" }
              : { height: "100%", width: `${pct}%`, background: "var(--color-highlight-blue)", borderRadius: "var(--radius-control)", transition: "width 0.4s var(--ease-smooth)" }
          }
        />
      </div>
    </div>
  );
}
