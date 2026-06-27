// PortalApp — nav bar + drawer wiring all screens together.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { NavBar, SideDrawer } = DS;

  // nav key -> { title, render }
  const ROUTES = {
    Showcase: { title: "Showcase", render: (d, go) => <window.ShowcaseScreen data={d} onOpenPlans={() => go("Connect")} /> },
    Connect:  { title: "Connect",  render: (d) => <ConnectFlow data={d} /> },
    Watch:    { title: "Movies",   render: (d) => <window.MoviesScreen data={d} /> },
    News:     { title: "News",     render: (d) => <window.NewsScreen data={d} /> },
    Weather:  { title: "Weather",  render: (d) => <window.WeatherScreen data={d} /> },
  };

  // Connect = Plans -> Payment -> confirmation
  function ConnectFlow({ data }) {
    const [step, setStep] = React.useState("plans");
    const [plan, setPlan] = React.useState(null);

    if (step === "payment") {
      return <window.PaymentScreen data={data} plan={plan} onDone={() => setStep("done")} />;
    }
    if (step === "done") {
      return (
        <div style={{ maxWidth: 520, margin: "80px auto", padding: 24, textAlign: "center" }}>
          <div style={{ color: "var(--color-highlight-blue)", display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <window.ThalesNextGenPortalDesignSystem_87a801.Icon name="wifi" size={56} strokeWidth={1.5} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 10px" }}>You're Connected</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 28px" }}>
            {(plan && plan.name) || "Your"} plan is active for this flight. Enjoy the journey.
          </p>
          <window.ThalesNextGenPortalDesignSystem_87a801.Button variant="secondary" onClick={() => setStep("plans")}>Back to Plans</window.ThalesNextGenPortalDesignSystem_87a801.Button>
        </div>
      );
    }
    return <window.PlansScreen data={data} onBuy={(p) => { setPlan(p); setStep("payment"); }} />;
  }

  function Placeholder({ label }) {
    return (
      <div style={{ maxWidth: 700, margin: "100px auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", color: "var(--color-bright-blue)", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 14px" }}>
          Configurable Section
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
          The {label} section is a white-label content slot — airlines populate it from
          their CMS. It inherits the same tiles, type, and palette as the rest of the portal.
        </p>
      </div>
    );
  }

  function PortalApp() {
    const d = window.PORTAL_DATA;
    const [route, setRoute] = React.useState("Showcase");
    const [menuOpen, setMenuOpen] = React.useState(false);

    const go = (k) => { setRoute(k); setMenuOpen(false); };
    const current = ROUTES[route];
    const title = current ? current.title : route;

    return (
      <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 20, borderBottom: "1px solid var(--color-border)" }}>
          <NavBar
            title={title}
            logo="../../assets/logos/thales-white.svg"
            wifiActive
            onMenu={() => setMenuOpen(true)}
          />
        </div>

        <main style={{ paddingBottom: 64 }}>
          {current ? current.render(d, go) : <Placeholder label={route} />}
        </main>

        <SideDrawer
          open={menuOpen}
          items={d.nav}
          active={route}
          flight={d.flight}
          onSelect={go}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    );
  }

  window.PortalApp = PortalApp;
})();
