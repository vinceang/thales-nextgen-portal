import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * MetricTile — a single stat: line icon, uppercase label, large value, optional
 * sub-line. Hairline border on a transparent fill, sharp by default (rounds via
 * the white-label --radius-card token). The value rides the fluid type scale.
 *
 * Compose several inside a <TileGrid> for a metrics row.
 */
export function MetricTile({
  icon,
  label,
  value,
  sub,
  iconColor = "var(--color-bright-blue)",
  style,
  ...rest
}) {
  return (
    <div
      style={{
        border: "var(--border-width) solid var(--border-hairline)",
        borderRadius: "var(--radius-card)",
        background: "transparent",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minWidth: 0,
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <div style={{ color: iconColor, height: 22 }}>
          {typeof icon === "string" ? <Icon name={icon} size={22} /> : icon}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "var(--fs-subscript)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "var(--fs-h2)",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
        {sub && (
          <div style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-secondary)" }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
