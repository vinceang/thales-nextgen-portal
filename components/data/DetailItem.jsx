import React from "react";

/**
 * DetailItem — a quiet label-over-value spec pair (no icon, no border). Used for
 * secondary fact rows (Flight · Aircraft · Gate · Total distance). Lay several
 * out in a <TileGrid>.
 */
export function DetailItem({ label, value, align = "left", style, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        textAlign: align,
        alignItems: align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
        minWidth: 0,
        ...style,
      }}
      {...rest}
    >
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
          fontWeight: 600,
          fontSize: "var(--fs-body)",
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
