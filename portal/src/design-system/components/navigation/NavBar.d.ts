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
  /** Click handler for the standard Home button (shown to the right of the hamburger). */
  onHome?: () => void;
  /** Wi-Fi glyph active (bright-blue) when connected. */
  wifiActive?: boolean;
  /** Click handler for the Wi-Fi status icon (e.g. open the plans page). */
  onWifi?: () => void;
  onSearch?: () => void;
  onProfile?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function NavBar(props: NavBarProps): JSX.Element;
