import React from "react";
import s from "./Card.module.css";

/**
 * Card — neutral content container. Dark raised surface, hairline border, sharp,
 * flat. Real :hover border lift when `interactive`. Inner padding via --card-pad.
 */
export function Card({ title, subtitle, header, footer, interactive = false, padding = 20, children, className, style, ...rest }) {
  return (
    <div
      data-interactive={interactive || undefined}
      className={className ? `${s.card} ${className}` : s.card}
      style={{ "--card-pad": `${padding}px`, ...style }}
      {...rest}
    >
      {(header || title) && (
        <div className={s.header} data-flush={children || footer ? "true" : undefined}>
          {header || (
            <>
              <h3 className={s.title}>{title}</h3>
              {subtitle && <div className={s.subtitle}>{subtitle}</div>}
            </>
          )}
        </div>
      )}
      {children && <div className={s.body}>{children}</div>}
      {footer && <div className={s.footer}>{footer}</div>}
    </div>
  );
}
