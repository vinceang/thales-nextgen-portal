import React from "react";
import s from "./MediaCard.module.css";

/**
 * MediaCard — cover image with a title/subtitle caption BELOW it (the music /
 * library card: album + artist, podcast + host, book + author). Sibling to
 * ShowcaseTile, which overlays its caption on the image instead. Cover aspect is
 * configurable (`aspect`, default square 1:1). Generic over content; compose a
 * FavoriteButton over it for a save control.
 */
export function MediaCard({ image, title, subtitle, aspect = "1 / 1", onClick, className, style, ...rest }) {
  return (
    <figure
      className={className ? `${s.card} ${className}` : s.card}
      data-clickable={onClick ? "true" : undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className={s.coverWrap} style={{ "--mc-aspect": aspect }}>
        {image && <img src={image} alt="" className={s.cover} />}
      </div>
      <figcaption className={s.caption}>
        <span className={s.title}>{title}</span>
        {subtitle && <span className={s.subtitle}>{subtitle}</span>}
      </figcaption>
    </figure>
  );
}
