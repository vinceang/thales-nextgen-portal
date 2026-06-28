import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./MetricTile.module.css";

/**
 * MetricTile — a single stat: line icon, uppercase label, large value, optional
 * sub-line. Hairline border, transparent fill, sharp. Group in a TileGrid.
 * Icon colour flows through the --mt-icon-color custom property.
 */
export function MetricTile({ icon, label, value, sub, iconColor = "var(--color-bright-blue)", className, style, ...rest }) {
  return (
    <div className={className ? `${s.tile} ${className}` : s.tile} style={{ "--mt-icon-color": iconColor, ...style }} {...rest}>
      {icon && <div className={s.icon}>{typeof icon === "string" ? <Icon name={icon} size={22} /> : icon}</div>}
      <div className={s.meta}>
        <div className={s.label}>{label}</div>
        <div className={s.value}>{value}</div>
        {sub && <div className={s.sub}>{sub}</div>}
      </div>
    </div>
  );
}
