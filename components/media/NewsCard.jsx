import React from "react";
import s from "./NewsCard.module.css";

/**
 * NewsCard — a secondary news story: image, relative timestamp, and title. In a
 * grid it's a vertical card (image on top); on phone it flips to an image-left
 * list row (title above the timestamp). Presentational; `onClick` opens the story.
 */
export function NewsCard({ image, timeAgo, title, onClick, className, style, ...rest }) {
  return (
    <article
      className={className ? `${s.card} ${className}` : s.card}
      data-clickable={onClick ? "true" : undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className={s.media}>{image && <img src={image} alt="" className={s.img} />}</div>
      <div className={s.body}>
        {timeAgo && <span className={s.time}>{timeAgo}</span>}
        <h3 className={s.title}>{title}</h3>
      </div>
    </article>
  );
}
