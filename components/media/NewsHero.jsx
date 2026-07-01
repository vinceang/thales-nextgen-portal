import React from "react";
import s from "./NewsHero.module.css";

/**
 * NewsHero — the News page's featured story: a large image beside a date kicker,
 * a Playfair headline, and a relative timestamp. Two columns on desktop/tablet,
 * stacked on phone. Presentational; `onClick` opens the story.
 */
export function NewsHero({ image, date, title, timeAgo, onClick, className, style, ...rest }) {
  return (
    <article
      className={className ? `${s.hero} ${className}` : s.hero}
      data-clickable={onClick ? "true" : undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className={s.media}>{image && <img src={image} alt="" className={s.img} />}</div>
      <div className={s.body}>
        {date && <span className={s.date}>{date}</span>}
        <h2 className={s.title}>{title}</h2>
        {timeAgo && <span className={s.time}>{timeAgo}</span>}
      </div>
    </article>
  );
}
