import React from "react";

/**
 * Card — neutral content container. Dark raised surface, hairline border, sharp
 * corners (radius-card), flat (NO shadow — depth is surface contrast). Optional
 * title/subtitle header, body, and a footer (actions sit at the inline-end).
 * For image/media tiles use ShowcaseTile; for pricing use PlanCard.
 */
export function Card({ title, subtitle, header, footer, interactive = false, padding = 20, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: "var(--color-surface-2)",
        border: `1px solid ${hover ? "var(--color-border-strong)" : "var(--color-border)"}`,
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        cursor: interactive ? "pointer" : "default",
        transition: "border-color 0.3s var(--ease-smooth)",
        ...style,
      }}
      {...rest}
    >
      {(header || title) && (
        <div style={{ padding, paddingBottom: children || footer ? 0 : padding }}>
          {header || (
            <>
              <div style={{ fontFamily: "var(--font-tile)", fontWeight: 600, fontSize: "var(--fs-h3)", color: "var(--text-primary)" }}>{title}</div>
              {subtitle && <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>{subtitle}</div>}
            </>
          )}
        </div>
      )}
      {children && (
        <div style={{ padding, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--on-surface-2)" }}>
          {children}
        </div>
      )}
      {footer && (
        <div style={{ padding, paddingTop: 0, display: "flex", gap: 12, justifyContent: "flex-end", alignItems: "center" }}>
          {footer}
        </div>
      )}
    </div>
  );
}
