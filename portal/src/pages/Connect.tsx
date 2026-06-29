import { useState } from "react";
import {
  BentoGrid,
  PlanCard,
  Modal,
  Button,
  Breadcrumbs,
  Alert,
  Toast,
  ToastViewport,
} from "../design-system/components";
import { getConnectContent, type PlanContent } from "../content/connect";
import { useI18n } from "../i18n";
import s from "./Connect.module.css";

const TOAST_MS = 4000;

// Render copy with one emphasized phrase bold/full-white. `emphasize` is a
// verbatim substring of `text` (the i18n dictionaries preserve this invariant).
function Emphasize({ text, emphasize, className }: { text: string; emphasize?: string; className?: string }) {
  if (!emphasize || !text.includes(emphasize)) return <p className={className}>{text}</p>;
  const [before, after] = text.split(emphasize);
  return (
    <p className={className}>
      {before}
      <strong className={s.emph}>{emphasize}</strong>
      {after}
    </p>
  );
}

export default function Connect() {
  const { t } = useI18n();
  const { header, plans } = getConnectContent(t);
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

  // Plan grid as a BentoGrid so the phone tier can reverse order (highest-value
  // plan on top) without a media query. Areas are derived from the plan ids.
  const planIds = plans.map((p) => p.id);
  const planCols = planIds.map(() => "1fr").join(" ");

  return (
    <div className={s.page}>
      <Breadcrumbs items={[{ label: t("connect.crumbShowcase"), href: "/" }, { label: t("connect.crumbConnect") }]} className={s.crumbs} />

      {/* Intro — editorial split header, or a status Alert once connected */}
      {connected ? (
        <Alert tone="success" title={t("connect.connectedTitle", { plan: connected.name })} className={s.intro}>
          {t("connect.connectedBody", { plan: connected.name })}
        </Alert>
      ) : (
        <BentoGrid
          gap={40}
          className={s.headerGrid}
          items={{
            title: <h1 className={s.title}>{header.title}</h1>,
            blurb: <Emphasize text={header.text} emphasize={header.emphasize} className={s.blurb} />,
          }}
          phone={{ columns: "1fr", areas: ["title", "blurb"] }}
          tablet={{ columns: "1.2fr 1fr", areas: ["title blurb"] }}
          desktop={{ columns: "1.2fr 1fr", areas: ["title blurb"] }}
        />
      )}

      {/* Plan grid — 3-up on tablet/desktop; on phone it collapses to one column
          in REVERSE order (highest-value plan on top). */}
      <BentoGrid
        gap={16}
        items={Object.fromEntries(
          plans.map((p) => [
            p.id,
            <PlanCard
              name={p.name}
              price={p.price}
              features={p.features}
              recommended={p.recommended}
              badge={p.badge}
              ctaLabel={p.ctaLabel ?? t("connect.buyNow")}
              onSelect={() => setSelected(p)}
              className={s.planFill}
            />,
          ]),
        )}
        phone={{ columns: "1fr", areas: [...planIds].reverse() }}
        tablet={{ columns: planCols, areas: [planIds.join(" ")] }}
        desktop={{ columns: planCols, areas: [planIds.join(" ")] }}
      />

      {/* Purchase confirm */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={t("connect.modalTitle")}
        width={460}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>{t("connect.cancel")}</Button>
            <Button onClick={pay}>{t("connect.payNow")}</Button>
          </>
        }
      >
        <Emphasize
          text={t("connect.modalBody", { plan: selected?.name ?? "", price: selected?.price ?? "" })}
          emphasize={selected?.name}
          className={s.modalP}
        />
        <p className={s.modalFine}>{t("connect.modalFine")}</p>
      </Modal>

      {/* Success notification — one hue: blue check, never a green card */}
      <ToastViewport placement="bottom-center">
        {toast && (
          <Toast tone="success" title={t("connect.toastTitle")} onClose={() => setToast(null)}>
            {t("connect.toastBody", { plan: toast })}
          </Toast>
        )}
      </ToastViewport>
    </div>
  );
}
