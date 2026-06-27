import * as React from "react";

/**
 * Sticky top bar: hamburger + logo, centered title, search / Wi-Fi / profile icons.
 */
export interface NavBarProps {
  /** Centered view title (e.g. "Showcase", "Movies"). */
  title?: React.ReactNode;
  /** Logo image URL shown beside the hamburger. */
  logo?: string;
  onMenu?: () => void;
  /** Wi-Fi glyph active (bright-blue) when connected. */
  wifiActive?: boolean;
  onSearch?: () => void;
  onProfile?: () => void;
  style?: React.CSSProperties;
}

export function NavBar(props: NavBarProps): JSX.Element;
