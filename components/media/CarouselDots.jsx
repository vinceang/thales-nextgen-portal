import React from "react";

/**
 * CarouselDots — position indicators for the hero / movie carousel.
 * Active dot = highlight-blue; inactive = translucent white. Rounded (a control).
 */
export function CarouselDots({ count, active = 0, onSelect, style, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", ...style }} {...rest}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect && onSelect(i)}
          style={{
            width: i === active ? 22 : 8,
            height: 8,
            borderRadius: "var(--radius-pill)",
            border: "none",
            padding: 0,
            cursor: "pointer",
            background: i === active ? "var(--color-highlight-blue)" : "rgba(255,255,255,0.45)",
            transition: "all 0.3s var(--ease-smooth)",
          }}
        />
      ))}
    </div>
  );
}
