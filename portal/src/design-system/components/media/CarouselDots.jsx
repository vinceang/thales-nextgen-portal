import React from "react";
import s from "./CarouselDots.module.css";

/**
 * CarouselDots — dot position indicators for the hero / movie carousel. Active
 * dot elongates and goes highlight-blue.
 */
export function CarouselDots({ count, active = 0, onSelect, className, style, ...rest }) {
  return (
    <div className={className ? `${s.dots} ${className}` : s.dots} style={style} {...rest}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          className={s.dot}
          data-active={i === active ? "true" : undefined}
          onClick={() => onSelect && onSelect(i)}
        />
      ))}
    </div>
  );
}
