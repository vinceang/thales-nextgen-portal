import React from "react";

/**
 * BentoGrid — an asymmetric layout primitive built on CSS named grid-template-areas.
 * Authored MOBILE-FIRST: a `phone` layout is the base (usually a single-column stack),
 * and `tablet` / `desktop` layouts re-place the SAME named areas into richer asymmetric
 * compositions at the documented 561 / 1101px breakpoints.
 *
 * You name regions once (the keys of `items`) and describe where they sit per tier as
 * rows of area names — so the layout reads like a little ASCII map you can reason about.
 *
 *   <BentoGrid
 *     items={{ hero:<…/>, promoA:<…/>, promoB:<…/>, a:<…/>, b:<…/> }}
 *     phone={{   columns:"1fr",            areas:["hero","promoA","promoB","a","b"] }}
 *     tablet={{  columns:"1fr 1fr",        areas:["hero hero","promoA promoB","a b"] }}
 *     desktop={{ columns:"2fr 1fr 1fr",    areas:["hero hero promoA","hero hero promoB","a a b"] }}
 *   />
 *
 * Every area in a tier must be a filled rectangle (the CSS grid-template-areas rule).
 */
let __bgSeq = 0;

function blockCss(cfg) {
  const tmpl = cfg.areas.map((r) => `"${r}"`).join(" ");
  let s = `grid-template-areas:${tmpl};`;
  if (cfg.columns) s += `grid-template-columns:${cfg.columns};`;
  if (cfg.rows) s += `grid-template-rows:${cfg.rows};`;
  return s;
}

export function BentoGrid({ items = {}, phone, tablet, desktop, gap = 16, children, style, ...rest }) {
  const [id] = React.useState(() => `bento-${++__bgSeq}`);
  const base = phone || tablet || desktop;
  let css = `#${id}{display:grid;gap:${gap}px;${base ? blockCss(base) : ""}}`;
  if (tablet) css += `@media (min-width:561px){#${id}{${blockCss(tablet)}}}`;
  if (desktop) css += `@media (min-width:1101px){#${id}{${blockCss(desktop)}}}`;
  return (
    <>
      <style>{css}</style>
      <div id={id} style={style} {...rest}>
        {Object.keys(items).map((k) => (
          <div key={k} style={{ gridArea: k, minWidth: 0, minHeight: 0 }}>
            {items[k]}
          </div>
        ))}
        {children}
      </div>
    </>
  );
}
