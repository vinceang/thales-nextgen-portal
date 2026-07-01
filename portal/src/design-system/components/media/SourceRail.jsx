import React from "react";
import { FadeScroller } from "../core/FadeScroller.jsx";
import s from "./SourceRail.module.css";

/**
 * SourceRail — a horizontally-scrollable row of news-source logos (monochrome,
 * `currentColor`). Inactive sources are dimmed; the active one lifts to a solid
 * light chip. Presentational: the consumer owns selection via `active` +
 * `onSelect`. Edge-fade + hidden scrollbar come from FadeScroller.
 */
export function SourceRail({ sources = [], active, onSelect, className, style, ...rest }) {
  return (
    <FadeScroller center={false} controls className={className ? `${s.rail} ${className}` : s.rail} style={style} {...rest}>
      {sources.map((src) => (
        <button
          key={src.id}
          type="button"
          aria-pressed={src.id === active}
          aria-label={src.name}
          title={src.name}
          data-active={src.id === active || undefined}
          onClick={() => onSelect && onSelect(src.id)}
          className={s.item}
        >
          <img src={src.logo} alt="" aria-hidden="true" className={s.logo} />
        </button>
      ))}
    </FadeScroller>
  );
}
