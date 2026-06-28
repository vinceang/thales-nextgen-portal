import React from "react";
import s from "./Kicker.module.css";

/**
 * Kicker — short ALL-CAPS bright-blue label that sits above a serif tile title.
 * Names the action: CONNECT / WATCH / LISTEN / PLAY / READ / DESTINATION.
 */
export function Kicker({ underline = false, children, className, style, ...rest }) {
  return (
    <span
      data-underline={underline || undefined}
      className={className ? `${s.kicker} ${className}` : s.kicker}
      style={style}
      {...rest}
    >
      {children}
    </span>
  );
}
