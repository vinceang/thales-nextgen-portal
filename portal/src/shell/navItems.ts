// Data-driven nav. The SideDrawer and routes are both built from this list,
// so adding a section is a one-line change here — never hard-coded markup.
export interface NavItem {
  key: string;
  label: string;
  path: string;
}

export const NAV: NavItem[] = [
  { key: "showcase", label: "Showcase", path: "/" },
  { key: "connect", label: "Connect", path: "/connect" },
  { key: "watch", label: "Watch", path: "/watch" },
  { key: "listen", label: "Listen", path: "/listen" },
  { key: "read", label: "Read", path: "/read" },
  { key: "play", label: "Play", path: "/play" },
  { key: "shop", label: "Shop", path: "/shop" },
  { key: "news", label: "News", path: "/news" },
  { key: "weather", label: "Weather", path: "/weather" },
  { key: "account", label: "Account", path: "/account" },
];
