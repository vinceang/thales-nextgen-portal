import React from "react";
import s from "./TileGrid.module.css";

/**
 * TileGrid — the system's single responsive grid primitive. Mobile-first: phone
 * is the base stack; tablet/desktop add columns at the 561 / 1101px breakpoints.
 * Per-tier column templates are passed as CSS custom properties (static @media in
 * the module) — no runtime <style> injection.
 */
export function TileGrid({ columns = 4, tablet, phone = 1, gap = 16, children, className, style, ...rest }) {
  const t = tablet ?? Math.min(Number(columns) || 1, 2);
  const cols = (n) => `repeat(${n}, minmax(0, 1fr))`;
  return (
    <div
      className={className ? `${s.grid} ${className}` : s.grid}
      style={{
        "--tg-gap": `${gap}px`,
        "--tg-cols-phone": cols(phone),
        "--tg-cols-tablet": cols(t),
        "--tg-cols-desktop": cols(columns),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
