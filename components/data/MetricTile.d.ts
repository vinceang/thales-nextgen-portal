import * as React from "react";
import { IconName } from "../core/Icon";

/**
 * A single stat tile — line icon, uppercase label, large value. Hairline border,
 * transparent fill, sharp by default (rounds via --radius-card). Group in a TileGrid.
 */
export interface MetricTileProps {
  /** Icon name (from the Icon set) or a custom node. */
  icon?: IconName | React.ReactNode;
  /** Uppercase label, e.g. "Altitude". */
  label: React.ReactNode;
  /** Large primary value, e.g. "37,000 ft". */
  value: React.ReactNode;
  /** Optional small sub-line under the value. */
  sub?: React.ReactNode;
  /** Icon color. Default bright-blue. */
  iconColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MetricTile(props: MetricTileProps): JSX.Element;
