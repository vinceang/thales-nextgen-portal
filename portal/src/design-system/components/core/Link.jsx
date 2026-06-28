import React from "react";
import { Icon } from "./Icon.jsx";
import s from "./Link.module.css";

/**
 * Link — text hyperlink. `inline` = bright-blue body link (underline on hover);
 * `standalone` = uppercase Montserrat action link with optional trailing chevron
 * (mirrors under RTL via the Icon name). States are real CSS (was JS).
 */
export function Link({ href = "#", variant = "inline", arrow = false, external = false, children, className, style, ...rest }) {
  const standalone = variant === "standalone";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      data-variant={variant}
      data-arrow={arrow || undefined}
      className={className ? `${s.link} ${className}` : s.link}
      style={style}
      {...rest}
    >
      {children}
      {arrow && <Icon name="chevron-right" size={standalone ? 16 : 15} strokeWidth={2.2} />}
    </a>
  );
}
