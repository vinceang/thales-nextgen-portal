import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * Chip — a compact, SHARP token (radius-control) for an applied filter,
 * selected value or tag. Distinct from GenrePill, which is the ONE rounded
 * shape used for category filters. A chip can be selected (blue fill) and/or
 * dismissable (trailing × that mirrors position under RTL via logical props).
 */
export function Chip({
  selected = false,
  onRemove,
  onClick,
  leading,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1,
        paddingBlock: 8,
        paddingInline: 14,
        borderRadius: "var(--radius-control)",
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
        transition: "all var(--dur-link) var(--ease-smooth)",
        background: selected
          ? "var(--color-highlight-blue)"
          : hover && onClick
          ? "var(--color-surface-3)"
          : "transparent",
        color: selected ? "var(--color-white)" : "var(--on-surface)",
        border: selected
          ? "1px solid var(--color-highlight-blue)"
          : "1px solid var(--color-border-strong)",
        ...style,
      }}
      {...rest}
    >
      {leading && <span style={{ display: "inline-flex", marginInlineStart: -2 }}>{leading}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            padding: 0,
            marginInlineEnd: -4,
            cursor: "pointer",
            color: "inherit",
            opacity: 0.7,
          }}
        >
          <Icon name="x" size={14} strokeWidth={2.2} />
        </button>
      )}
    </span>
  );
}
