// PlansScreen — editorial header + Wi-Fi plan cards → payment.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { PlanCard } = DS;

  function PlansScreen({ data, onBuy }) {
    const h = data.plansHeader;
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 64px" }}>
        {/* Editorial split header */}
        <div className="plans-head" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "start", marginBottom: 48 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 60, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", margin: 0 }}>
            {h.title}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.82)", margin: "8px 0 0" }}>
            {h.blurb[0]}<strong style={{ fontWeight: 700, color: "#fff" }}>{h.blurb[1]}</strong>{h.blurb[2]}
          </p>
        </div>

        {/* Plan cards */}
        <div className="plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
          {data.plans.map((p) => (
            <div key={p.name} className={p.recommended ? "plan-wrap plan-wrap-rec" : "plan-wrap"} style={{ display: "flex" }}>
              <PlanCard
                name={p.name} price={p.price} features={p.features}
                recommended={p.recommended} badge={p.badge} ctaLabel={p.cta}
                onSelect={() => onBuy(p)} style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.PlansScreen = PlansScreen;
})();
