import React from "react";

/**
 * Kicker — short ALL-CAPS bright-blue label that sits above a serif tile title.
 * Names the action: CONNECT / WATCH / LISTEN / PLAY / READ / DESTINATION.
 */
export function Kicker({ underline = false, children, style, ...rest }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--color-bright-blue)",
        textDecoration: underline ? "underline" : "none",
        textUnderlineOffset: 3,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
