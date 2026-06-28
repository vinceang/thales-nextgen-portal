import React from "react";
import s from "./FilterPanel.module.css";

/**
 * FilterPanel — container for filter groups. Header with title + "Clear all"
 * (real :hover); holds FilterSections.
 */
export function FilterPanel({ title = "Filters", activeCount = 0, onClear, children, className, style, ...rest }) {
  return (
    <div className={className ? `${s.panel} ${className}` : s.panel} style={style} {...rest}>
      <div className={s.head}>
        <span className={s.title}>{title}</span>
        {activeCount > 0 && <span className={s.count}>{activeCount}</span>}
        {onClear && <button type="button" className={s.clear} onClick={onClear}>Clear all</button>}
      </div>
      {children}
    </div>
  );
}

/** FilterSection — one labelled group within a FilterPanel (hairline rule + label). */
export function FilterSection({ label, children, className, style, ...rest }) {
  return (
    <div className={className ? `${s.section} ${className}` : s.section} style={style} {...rest}>
      {label && <div className={s.sectionLabel}>{label}</div>}
      <div className={s.sectionBody}>{children}</div>
    </div>
  );
}
