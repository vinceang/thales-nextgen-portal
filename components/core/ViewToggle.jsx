import React from "react";
import { Icon } from "./Icon.jsx";
import s from "./ViewToggle.module.css";

/**
 * ViewToggle — a two-option segmented control for switching a gallery between
 * grid and list layouts. Presentational: the consumer owns `value` + `onChange`.
 * Sharp, flat; the selected segment is an inverted fill (theme-safe), not a hue.
 */
export function ViewToggle({ value = "grid", onChange, gridLabel = "Grid view", listLabel = "List view", className, style, ...rest }) {
  const options = [
    { v: "grid", icon: "grid", label: gridLabel },
    { v: "list", icon: "list", label: listLabel },
  ];
  return (
    <div role="group" className={className ? `${s.group} ${className}` : s.group} style={style} {...rest}>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={value === o.v}
          aria-label={o.label}
          title={o.label}
          data-active={value === o.v || undefined}
          onClick={() => onChange && onChange(o.v)}
          className={s.seg}
        >
          <Icon name={o.icon} size={18} />
        </button>
      ))}
    </div>
  );
}
