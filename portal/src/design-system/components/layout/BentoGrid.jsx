import React from "react";
import s from "./BentoGrid.module.css";

/** One tier's areas → a grid-template-areas string ("a b" "c d"). */
function areasTpl(cfg) {
  return cfg ? cfg.areas.map((r) => `"${r}"`).join(" ") : undefined;
}

/**
 * BentoGrid — asymmetric named-area grid, mobile-first. Name regions once (the
 * keys of `items`), then re-place them per tier. Per-tier templates flow in as CSS
 * custom properties (static @media in the module) — no runtime <style> injection.
 */
export function BentoGrid({ items = {}, phone, tablet, desktop, gap = 16, children, className, style, ...rest }) {
  const base = phone || tablet || desktop;
  const t = tablet || base;
  const d = desktop || tablet || base;
  return (
    <div
      className={className ? `${s.grid} ${className}` : s.grid}
      style={{
        "--bg-gap": `${gap}px`,
        "--bg-cols-phone": base?.columns,
        "--bg-areas-phone": areasTpl(base),
        "--bg-rows-phone": base?.rows,
        "--bg-cols-tablet": t?.columns,
        "--bg-areas-tablet": areasTpl(t),
        "--bg-rows-tablet": t?.rows,
        "--bg-cols-desktop": d?.columns,
        "--bg-areas-desktop": areasTpl(d),
        "--bg-rows-desktop": d?.rows,
        ...style,
      }}
      {...rest}
    >
      {Object.keys(items).map((k) => (
        <div key={k} className={s.cell} style={{ "--bg-area": k }}>
          {items[k]}
        </div>
      ))}
      {children}
    </div>
  );
}
