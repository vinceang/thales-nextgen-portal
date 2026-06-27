import React from "react";

/**
 * NewsItem — a row in the headline list: square thumbnail, headline, relative
 * timestamp. Sharp corners, hairline divider handled by the list container.
 */
export function NewsItem({ image, headline, timestamp, lead = false, onClick, style, ...rest }) {
  if (lead) {
    return (
      <div onClick={onClick} style={{ cursor: onClick ? "pointer" : "default", ...style }} {...rest}>
        {image && (
          <img src={image} alt="" style={{ width: "100%", height: 200, objectFit: "cover", display: "block", borderRadius: "var(--radius-card)" }} />
        )}
        <div style={{ fontSize: 12, color: "var(--color-grey)", margin: "14px 0 8px", letterSpacing: "0.03em" }}>
          {timestamp}
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0, color: "var(--text-primary)" }}>
          {headline}
        </h3>
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      style={{ display: "flex", gap: 14, alignItems: "flex-start", cursor: onClick ? "pointer" : "default", ...style }}
      {...rest}
    >
      {image && (
        <img src={image} alt="" style={{ width: 96, height: 64, objectFit: "cover", flex: "none", display: "block", borderRadius: "var(--radius-card)" }} />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 11, color: "var(--color-grey)", letterSpacing: "0.03em" }}>{timestamp}</div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, lineHeight: 1.35, color: "var(--text-primary)" }}>
          {headline}
        </div>
      </div>
    </div>
  );
}
