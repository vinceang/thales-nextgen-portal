import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * Link — text hyperlink. In-body links sit in bright-blue and gain an
 * underline + shift to link-blue on hover. The `standalone` variant is an
 * uppercase Montserrat action link ("5-DAY FORECAST", "VIEW ALL") with an
 * optional trailing chevron. RTL-safe: the chevron mirrors via the Icon name.
 */
export function Link({
  href = "#",
  variant = "inline",
  arrow = false,
  external = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const standalone = variant === "standalone";

  const base = standalone
    ? {
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "var(--fs-button)",
        letterSpacing: "var(--tracking-button)",
        textTransform: "uppercase",
        color: hover ? "var(--color-bright-blue)" : "var(--color-white)",
        textDecoration: "none",
      }
    : {
        fontFamily: "inherit",
        color: hover ? "var(--color-link-blue)" : "var(--color-bright-blue)",
        textDecoration: hover ? "underline" : "none",
        textUnderlineOffset: 3,
      };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: arrow ? "inline-flex" : "inline",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        transition: "color var(--dur-link) var(--ease-smooth)",
        ...base,
        ...style,
      }}
      {...rest}
    >
      {children}
      {arrow && <Icon name="chevron-right" size={standalone ? 16 : 15} strokeWidth={2.2} />}
    </a>
  );
}
