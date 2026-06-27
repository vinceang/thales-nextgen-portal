import * as React from "react";
import type { IconName } from "../core/Icon";

export interface WeatherTileProps {
  date?: string;
  city?: string;
  /** AccuWeather icon code (1=Sunny, 3=Partly Sunny, 33=Clear…). */
  code?: number;
  /** Render the nocturnal variant of `code`. */
  night?: boolean;
  /** Folder holding the colored SVGs. Default "assets/icons/weather". */
  base?: string;
  /** Line-icon fallback name (sun / cloud / cloud-sun / cloud-rain). */
  fb?: IconName;
  /** Explicit image src; overrides `code`/`base`. */
  iconSrc?: string;
  /** Temperature value, e.g. "79.5°". */
  temp?: string;
  /** Unit letter, "F" or "C". */
  unit?: string;
  condition?: string;
  linkLabel?: string;
  onLink?: () => void;
  style?: React.CSSProperties;
}

/** Pure-black weather dashboard module: date, city, icon, temperature, forecast link. */
export function WeatherTile(props: WeatherTileProps): JSX.Element;
