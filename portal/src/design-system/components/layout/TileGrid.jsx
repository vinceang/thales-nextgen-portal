import React from "react";

/**
 * TileGrid — the system's single responsive grid primitive. Authored MOBILE-FIRST:
 * the base layout is a sensible vertical stack (phone), then columns are ADDED as the
 * viewport grows (min-width at the documented 561 / 1101px breakpoints). Every tiled
 * layout (metric grids, bento rows, detail rows, card grids) flows through this so the
 * reflow behaviour is identical everywhere.
 */
let __tgSeq = 0;

export function TileGrid({
  columns = 4,
  tablet,
  phone = 1,
  gap = 16,
  children,
  style,
  ...rest
}) {
  const [id] = React.useState(() => `tilegrid-${++__tgSeq}`);
  const t = tablet ?? Math.min(Number(columns) || 1, 2);
  // Mobile-first: phone is the base; tablet & desktop add columns upward.
  const css =
    `#${id}{display:grid;gap:${gap}px;grid-template-columns:repeat(${phone},minmax(0,1fr));}` +
    `@media (min-width:561px){#${id}{grid-template-columns:repeat(${t},minmax(0,1fr));}}` +
    `@media (min-width:1101px){#${id}{grid-template-columns:repeat(${columns},minmax(0,1fr));}}`;
  return (
    <>
      <style>{css}</style>
      <div id={id} style={style} {...rest}>
        {children}
      </div>
    </>
  );
}
