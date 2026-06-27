import React from "react";

/**
 * Tooltip — small label revealed on hover / focus of its single child. Black
 * bubble, white Montserrat, sharp corners (radius-control), flat (no shadow).
 * `placement` top|bottom|start|end is RTL-aware (start/end follow the inline
 * axis). Wrap exactly one focusable/hoverable element.
 */
export function Tooltip({ label, placement = "top", children, style, ...rest }) {
  const [show, setShow] = React.useState(false);

  const pos = {
    top:    { bottom: "calc(100% + 8px)", insetInlineStart: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", insetInlineStart: "50%", transform: "translateX(-50%)" },
    start:  { insetInlineEnd: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    end:    { insetInlineStart: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  }[placement];

  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocusCapture={() => setShow(true)}
      onBlurCapture={() => setShow(false)}
      {...rest}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{
            position: "absolute", zIndex: 100, ...pos, whiteSpace: "nowrap", pointerEvents: "none",
            background: "var(--color-black)", color: "var(--color-white)",
            border: "1px solid var(--color-border-strong)", borderRadius: "var(--radius-control)",
            padding: "7px 11px", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
