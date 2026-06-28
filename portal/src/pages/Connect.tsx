import { useState } from "react";
import {
  BentoGrid,
  TileGrid,
  PlanCard,
  Modal,
  Button,
  Breadcrumbs,
  Alert,
  Toast,
  ToastViewport,
} from "../design-system/components";
import { getConnectContent, type PlanContent } from "../content/connect";

const TOAST_MS = 4000;

// Render an editorial blurb with one emphasized phrase bold/full-white. Admin
// supplies `text` + the `emphasize` substring (see content/connect.ts).
function Blurb({ text, emphasize }: { text: string; emphasize?: string }) {
  const style = {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "var(--fs-body)",
    lineHeight: 1.7,
    color: "var(--on-surface-2)",
    margin: 0,
  } as const;
  if (!emphasize || !text.includes(emphasize)) return <p style={style}>{text}</p>;
  const [before, after] = text.split(emphasize);
  return (
    <p style={style}>
      {before}
      <strong style={{ fontWeight: 700, color: "var(--color-white)" }}>{emphasize}</strong>
      {after}
    </p>
  );
}

export default function Connect() {
  const { header, plans } = getConnectContent();
  const [selected, setSelected] = useState<PlanContent | null>(null); // plan in the purchase modal
  const [connected, setConnected] = useState<PlanContent | null>(null); // active pass after pay
  const [toast, setToast] = useState<string | null>(null);

  function pay() {
    if (!selected) return;
    setConnected(selected);
    setToast(selected.name);
    setSelected(null);
    window.setTimeout(() => setToast(null), TOAST_MS);
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 64px" }}>
      <Breadcrumbs
        items={[{ label: "Showcase", href: "/" }, { label: "Connect" }]}
        style={{ marginBottom: "var(--space-md)" }}
      />

      {/* Intro — editorial split header, or a status Alert once connected */}
      {connected ? (
        <Alert
          tone="success"
          title={`You're connected — ${connected.name}`}
          style={{ marginBottom: "var(--space-xl)" }}
        >
          Your {connected.name} pass is active for the rest of this flight, across reconnections.
        </Alert>
      ) : (
        <BentoGrid
          gap={40}
          style={{ marginBottom: "var(--space-xl)", alignItems: "start" }}
          items={{
            title: (
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--fs-h1)",
                  letterSpacing: "var(--tracking-headline)",
                  lineHeight: 1.05,
                  color: "var(--color-white)",
                  margin: 0,
                }}
              >
                {header.title}
              </h1>
            ),
            blurb: <Blurb text={header.text} emphasize={header.emphasize} />,
          }}
          phone={{ columns: "1fr", areas: ["title", "blurb"] }}
          tablet={{ columns: "1.2fr 1fr", areas: ["title blurb"] }}
          desktop={{ columns: "1.2fr 1fr", areas: ["title blurb"] }}
        />
      )}

      {/* Plan grid — equal heights via the grid's stretch; 3-up, stacks to 1 on phone */}
      <TileGrid columns={3} tablet={3} phone={1} gap={16}>
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            name={p.name}
            price={p.price}
            features={p.features}
            recommended={p.recommended}
            badge={p.badge}
            ctaLabel={p.ctaLabel ?? "Buy Now"}
            onSelect={() => setSelected(p)}
            style={{ width: "100%" }}
          />
        ))}
      </TileGrid>

      {/* Purchase confirm */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Confirm Purchase"
        width={460}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button onClick={pay}>Pay Now</Button>
          </>
        }
      >
        <p style={{ margin: "0 0 12px" }}>
          You're buying the{" "}
          <strong style={{ color: "var(--color-white)" }}>{selected?.name}</strong> pass ({selected?.price}) for this flight.
        </p>
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "var(--fs-body-2)" }}>
          Charged once to the card ending 4242. Access stays active until landing, across reconnections.
        </p>
      </Modal>

      {/* Success notification — one hue: blue check, never a green card */}
      <ToastViewport placement="bottom-center">
        {toast && (
          <Toast tone="success" title="Payment confirmed" onClose={() => setToast(null)}>
            Your {toast} pass is active. Enjoy the flight.
          </Toast>
        )}
      </ToastViewport>
    </div>
  );
}
