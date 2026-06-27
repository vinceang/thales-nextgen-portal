// PaymentScreen — plan summary band + payment method tabs + card form.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { Icon, Input, Select, Checkbox, Button } = DS;

  function Check({ label }) {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ flex: "none", width: 22, height: 22, borderRadius: 999, background: "var(--color-highlight-blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <Icon name="check" size={13} strokeWidth={3} />
        </span>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{label}</span>
      </div>
    );
  }

  function Help() {
    return (
      <span style={{ flex: "none", width: 26, height: 26, borderRadius: 999, background: "var(--color-bright-blue)", color: "#0b2233", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>?</span>
    );
  }

  function PaymentScreen({ data, plan, onDone }) {
    const p = plan || data.plans.find((x) => x.recommended);
    const pay = data.payment;
    const [method, setMethod] = React.useState(pay.methods[0]);
    const [agree, setAgree] = React.useState(false);
    const [showCard, setShowCard] = React.useState(false);
    const [country, setCountry] = React.useState("");

    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px 80px" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 30, color: "#fff", textAlign: "center", margin: "0 0 10px" }}>
          Wi-Fi Plan Purchase
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", textAlign: "center", margin: "0 0 24px" }}>
          You are purchasing the following wi-fi plan:
        </p>

        {/* Summary band — thin bright-blue rules top & bottom */}
        <div style={{ borderTop: "1px solid var(--color-bright-blue)", borderBottom: "1px solid var(--color-bright-blue)", padding: "26px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center", marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-bright-blue)"><path d="m12 2 2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" /></svg>
              <span style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>{p.name}</span>
            </div>
            <div style={{ fontWeight: 300, fontSize: 48, color: "#fff", marginTop: 6 }}>{p.price}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {p.features.map((f) => <Check key={f} label={f} />)}
          </div>
        </div>

        {/* Payment method tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 36 }}>
          {pay.methods.map((m) => {
            const active = method === m;
            return (
              <button key={m} onClick={() => setMethod(m)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "0 0 10px", borderBottom: active ? "2px solid var(--color-bright-blue)" : "2px solid transparent" }}>
                <span style={{ height: 34, display: "flex", alignItems: "center", color: active ? "var(--color-highlight-blue)" : "rgba(255,255,255,0.55)" }}>
                  {m === "Credit Card" ? <Icon name="credit-card" size={32} strokeWidth={2} /> : <span style={{ fontWeight: 700, fontSize: 16 }}>{m}</span>}
                </span>
                <span style={{ fontSize: 15, fontWeight: 500, color: active ? "#fff" : "rgba(255,255,255,0.55)" }}>{m}</span>
              </button>
            );
          })}
        </div>

        {method !== "Credit Card" ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
            Continue with {method} to complete your purchase.
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <Button variant="primary" onClick={() => onDone(p)} style={{ minWidth: 300 }}>Pay {p.price}</Button>
            </div>
          </div>
        ) : (
          <>
            {/* Card brand chips */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 34 }}>
              {pay.brands.map((b) => (
                <span key={b} style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.02em", background: "#fff", color: "#1a3c6e", padding: "8px 12px", borderRadius: 4, fontFamily: "var(--font-sans)" }}>{b}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <Input label="Credit Card Number" type={showCard ? "text" : "password"} placeholder="" />
                <a onClick={() => setShowCard((s) => !s)} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 10, color: "var(--color-bright-blue)", fontSize: 14, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>
                  <Icon name="eye" size={16} /> {showCard ? "Hide" : "Show"} credit card number
                </a>
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, flex: 1 }}>
                  <Input label="Month" placeholder="MM" />
                  <Input label="Year" placeholder="YY" />
                  <Input label="CVV" placeholder="" />
                </div>
                <div style={{ paddingBottom: 13 }}><Help /></div>
              </div>

              <Input label="Name as it appears on the card" placeholder="Jane Smith" />
              <Input label="Email" type="email" placeholder="jane@framer.com" />
              <Input label="Address line 1" placeholder="" />
              <Input label="Address line 2" placeholder="" />

              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <Select label="Billing Country" placeholder="Select Billing Country..." options={pay.countries} value={country} onChange={(e) => setCountry(e.target.value)} style={{ flex: 1 }} />
                <div style={{ paddingBottom: 13 }}><Help /></div>
              </div>
              <Input label="City" placeholder="" />

              <div style={{ height: 1, background: "var(--color-border)", margin: "10px 0 4px" }} />

              <Checkbox checked={agree} onChange={setAgree}>
                I have read and agree to the <a href="#" style={{ color: "var(--color-bright-blue)" }}>Terms of Use</a> and <a href="#" style={{ color: "var(--color-bright-blue)" }}>Privacy Notice</a>.
              </Checkbox>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                <Button variant="primary" disabled={!agree} onClick={() => onDone(p)} style={{ minWidth: 320 }}>Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  window.PaymentScreen = PaymentScreen;
})();
