import React from "react";
import s from "./NewsItem.module.css";

/**
 * NewsItem — a news headline row (or a large lead story): thumbnail, headline,
 * relative timestamp. `lead` = stacked layout with a Playfair headline.
 */
export function NewsItem({ image, headline, timestamp, lead = false, onClick, className, style, ...rest }) {
  if (lead) {
    return (
      <div onClick={onClick} data-clickable={onClick ? "true" : undefined} className={className ? `${s.lead} ${className}` : s.lead} style={style} {...rest}>
        {image && <img src={image} alt="" className={s.leadImg} />}
        <div className={s.leadTime}>{timestamp}</div>
        <h3 className={s.leadHead}>{headline}</h3>
      </div>
    );
  }
  return (
    <div onClick={onClick} data-clickable={onClick ? "true" : undefined} className={className ? `${s.row} ${className}` : s.row} style={style} {...rest}>
      {image && <img src={image} alt="" className={s.rowImg} />}
      <div className={s.rowBody}>
        <div className={s.rowTime}>{timestamp}</div>
        <div className={s.rowHead}>{headline}</div>
      </div>
    </div>
  );
}
