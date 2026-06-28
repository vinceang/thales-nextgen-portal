import React from "react";
import s from "./Tabs.module.css";

/**
 * Tabs — horizontal view switcher. Active tab is bright-blue with a highlight-blue
 * underline (real :hover). Data-driven; scrolls when it overflows.
 */
export function Tabs({ tabs = [], value, onChange, className, style, ...rest }) {
  return (
    <div role="tablist" className={className ? `${s.tablist} ${className}` : s.tablist} style={style} {...rest}>
      {tabs.map((t) => {
        const val = typeof t === "string" ? t : t.value;
        const lbl = typeof t === "string" ? t : t.label;
        const active = value === val;
        return (
          <button
            key={val}
            role="tab"
            aria-selected={active}
            className={s.tab}
            data-active={active ? "true" : undefined}
            onClick={() => onChange && onChange(val)}
          >
            {lbl}
            <span className={s.underline} />
          </button>
        );
      })}
    </div>
  );
}
