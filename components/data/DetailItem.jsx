import React from "react";
import s from "./DetailItem.module.css";

/**
 * DetailItem — quiet label-over-value spec pair (no icon, no border). Group in a
 * TileGrid for secondary fact rows.
 */
export function DetailItem({ label, value, align = "left", className, style, ...rest }) {
  return (
    <div
      className={className ? `${s.item} ${className}` : s.item}
      data-align={align !== "left" ? align : undefined}
      style={style}
      {...rest}
    >
      <div className={s.label}>{label}</div>
      <div className={s.value}>{value}</div>
    </div>
  );
}
