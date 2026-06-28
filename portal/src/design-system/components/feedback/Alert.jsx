import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Alert.module.css";

const ICONS = { info: "info", success: "check-circle", warning: "alert-triangle", error: "alert-circle" };

/**
 * Alert — inline status banner. The system has ONE hue, so status is carried by
 * the ICON (info/check/alert), never a red/green fill. Flat, hairline, no shadow.
 */
export function Alert({ tone = "info", title, onClose, children, className, style, ...rest }) {
  const blue = tone === "info" || tone === "success";
  return (
    <div
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
      data-blue={blue || undefined}
      className={className ? `${s.alert} ${className}` : s.alert}
      style={style}
      {...rest}
    >
      <span className={s.icon}><Icon name={ICONS[tone]} size={20} /></span>
      <div className={s.body}>
        {title && <div className={s.title}>{title}</div>}
        {children && <div className={s.message}>{children}</div>}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" className={s.close} onClick={onClose}>
          <Icon name="x" size={16} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}
