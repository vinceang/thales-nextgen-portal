import React from "react";
import s from "./MediaRow.module.css";

/**
 * MediaRow — a horizontal list row for gallery LIST mode: a thumbnail (aspect
 * configurable) + title/subtitle/meta, with optional trailing content (e.g. a
 * FavoriteButton). Sibling to MediaCard (which stacks its caption below a
 * cover). Presentational; `onClick` opens the item.
 */
export function MediaRow({ image, aspect = "1 / 1", title, subtitle, meta, trailing, onClick, className, style, ...rest }) {
  return (
    <div
      className={className ? `${s.row} ${className}` : s.row}
      data-clickable={onClick ? "true" : undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className={s.thumb} style={{ "--row-aspect": aspect }}>
        {image && <img src={image} alt="" className={s.img} />}
      </div>
      <div className={s.body}>
        <span className={s.title}>{title}</span>
        {subtitle && <span className={s.subtitle}>{subtitle}</span>}
        {meta && <span className={s.meta}>{meta}</span>}
      </div>
      {trailing && <div className={s.trailing}>{trailing}</div>}
    </div>
  );
}
