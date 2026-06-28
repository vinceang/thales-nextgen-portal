import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavBar, SideDrawer, Search } from "../design-system/components";
import { NAV } from "./navItems";
import Footer from "./Footer";
import s from "./AppShell.module.css";

/**
 * App shell — sticky NavBar (header) + hamburger-toggled SideDrawer (slide-out
 * nav with the FlightTracker at its top) + a routed content slot. Nav items and
 * the page title are data-driven from NAV.
 */
export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const current = NAV.find((n) => n.path === location.pathname) ?? NAV[0];

  function go(key: string) {
    const item = NAV.find((n) => n.key === key);
    if (item) navigate(item.path);
    setDrawerOpen(false);
  }

  return (
    <div className={s.shell}>
      <NavBar
        title={current.label}
        wifiActive
        onMenu={() => setDrawerOpen(true)}
        onHome={() => navigate("/")}
        onSearch={() => setSearchOpen((v) => !v)}
        onProfile={() => navigate("/account")}
        className={s.nav}
      />

      {searchOpen && (
        <div className={s.searchBar}>
          <Search
            size="lg"
            autoFocus
            value={query}
            placeholder="Search movies, music, destinations…"
            onChange={(v: string) => setQuery(v)}
            onSubmit={() => setSearchOpen(false)}
          />
        </div>
      )}

      <SideDrawer
        open={drawerOpen}
        items={NAV.map((n) => ({ key: n.key, label: n.label }))}
        active={current.key}
        flight={{ origin: "LAX", destination: "MCO", duration: "3h 28m", progress: 0.42 }}
        onSelect={go}
        onClose={() => setDrawerOpen(false)}
      />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
