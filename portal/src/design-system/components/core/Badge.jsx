import React from "react";

/**
 * Badge — small sharp status / count label. Stays monochrome + blue (the brand
 * has exactly one hue): tones differ by FILL not colour family. `dot` renders a
 * tiny standalone indicator; a numeric child becomes a count pill-less tag.
 * Status meaning is carried by an accompanying icon/label, never by red/green.
 */
export function Badge({
  tone = "neutral",
  dot = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: { background: "var(--color-surface-3)", color: "var(--on-surface)", border: "1px solid transparent" },
    accent:  { background: "var(--color-highlight-blue)", color: "var(--color-white)", border: "1px solid var(--color-highlight-blue)" },
    outline: { background: "transparent", color: "var(--on-surface)", border: "1px solid var(--color-border-strong)" },
  };

  if (dot) {
    return (
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "var(--radius-pill)",
          background: tone === "neutral" ? "var(--color-grey)" : "var(--color-highlight-blue)",
          ...style,
        }}
        {...rest}
      />
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        lineHeight: 1,
        minWidth: 20,
        paddingBlock: 5,
        paddingInline: 8,
        borderRadius: "var(--radius-control)",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
