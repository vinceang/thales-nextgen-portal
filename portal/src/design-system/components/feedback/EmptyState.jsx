import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./EmptyState.module.css";

/**
 * EmptyState — centered placeholder for a view with no content yet: a quiet line
 * icon in a hairline ring, a serif title, a muted message, an optional action.
 */
export function EmptyState({ icon = "inbox", title, message, action, className, style, ...rest }) {
  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      <span className={s.ring}><Icon name={icon} size={28} strokeWidth={1.5} /></span>
      {title && <div className={s.title}>{title}</div>}
      {message && <div className={s.message}>{message}</div>}
      {action && <div className={s.action}>{action}</div>}
    </div>
  );
}
