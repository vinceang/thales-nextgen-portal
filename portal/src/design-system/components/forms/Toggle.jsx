import React from "react";

/**
 * Toggle — on/off switch. One of the system's few rounded shapes (pill track +
 * round knob). On = highlight-blue track, knob slid to the inline-end; off =
 * surface fill. RTL-safe: the knob travels along the inline axis. Optional
 * label sits after the switch.
 */
export function Toggle({ checked = false, onChange, disabled = false, label, size = 26, children, style, ...rest }) {
  const w = size * 1.8;
  const knob = size - 6;
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
      {...rest}
    >
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          position: "relative",
          flex: "none",
          width: w,
          height: size,
          borderRadius: "var(--radius-pill)",
          background: checked ? "var(--color-highlight-blue)" : "var(--color-surface-3)",
          border: checked ? "1px solid var(--color-highlight-blue)" : "1px solid var(--color-border-strong)",
          transition: "background 0.25s var(--ease-smooth), border-color 0.25s var(--ease-smooth)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            insetInlineStart: 2,
            transform: `translateY(-50%) translateX(${checked ? w - knob - 6 : 0}px)`,
            width: knob,
            height: knob,
            borderRadius: "var(--radius-pill)",
            background: "var(--color-white)",
            transition: "transform 0.25s var(--ease-smooth)",
          }}
        />
      </span>
      {(label || children) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--on-surface)" }}>{label || children}</span>
      )}
    </label>
  );
}
