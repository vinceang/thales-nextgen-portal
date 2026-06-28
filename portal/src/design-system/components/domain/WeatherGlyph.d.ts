import * as React from "react";
import type { IconName } from "../core/Icon";

/** AccuWeather code → metadata entry. */
export interface WeatherCodeEntry {
  label: string;
  day?: boolean;
  night?: boolean | number;
  both?: boolean;
  fb: IconName;
}

/** The full AccuWeather condition catalog, keyed by numeric code. */
export declare const WEATHER_CODES: Record<number, WeatherCodeEntry>;

/** Resolve a code to its night equivalent (or itself when there is no separate one). */
export declare function nightCode(code: number): number;

export interface WeatherGlyphProps {
  /** AccuWeather icon code, e.g. 1 (Sunny), 3 (Partly Sunny), 12 (Showers), 33 (Clear). */
  code?: number;
  /** Swap a day `code` for its nocturnal variant. */
  night?: boolean;
  /** Folder holding the colored SVGs. Default "assets/icons/weather". */
  base?: string;
  /** File extension. Default "svg". */
  ext?: string;
  /** Explicit image src; overrides `code`/`base` resolution. */
  src?: string;
  /** Line-icon fallback name; defaults to the catalog entry's `fb`. */
  fb?: IconName;
  size?: number;
  /** Fallback line-icon color. */
  color?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** AccuWeather condition icon (colored SVG) with a line-icon fallback. */
export function WeatherGlyph(props: WeatherGlyphProps): JSX.Element;
