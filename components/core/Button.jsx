import React from "react";
import s from "./Button.module.css";

/**
 * Button — primary action control.
 * Sharp corners, uppercase Montserrat label. Primary = highlight-blue fill;
 * secondary = transparent with hairline outline. Styling is in Button.module.css
 * (tokens + real :hover/:disabled); variant/size are data-attributes. (ADR 0002.)
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  children,
  className,
  style,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      data-fullwidth={fullWidth || undefined}
      className={className ? `${s.btn} ${className}` : s.btn}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
