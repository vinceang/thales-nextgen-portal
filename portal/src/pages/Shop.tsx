import { useState } from "react";
import { GenrePill, FadeScroller, Toast, ToastViewport } from "../design-system/components";
import { getShopContent, type ShopProduct } from "../content/shop";
import { ProductCard } from "../components/ProductCard";
import { CheckoutModal } from "../components/CheckoutModal";
import { useI18n } from "../i18n";
import s from "./Shop.module.css";

const TOAST_MS = 4000;

/* Shop — the onboard store. Media-gallery layout (category pills + product grid).
   Products share the base Product type with Wi-Fi plans and reuse the same
   CheckoutModal + PaymentForm — one payment flow across the portal. Data from the
   content/shop.ts seam. Demo only: no order is placed and nothing is charged. */
export default function Shop() {
  const { t } = useI18n();
  const { categories, products } = getShopContent(t);

  const [cat, setCat] = useState("all");
  const visible = cat === "all" ? products : products.filter((p) => p.category === cat);

  const [buying, setBuying] = useState<ShopProduct | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Fires when the payment form's format checks pass (no real order/charge).
  function paid() {
    if (!buying) return;
    setToast(buying.name);
    setBuying(null);
    window.setTimeout(() => setToast(null), TOAST_MS);
  }

  return (
    <div className={s.page}>
      <header className={s.head}>
        <h1 className={s.title}>{t("shop.title")}</h1>
        <p className={s.subtitle}>{t("shop.subtitle")}</p>
      </header>

      <FadeScroller controls className={s.pills}>
        <GenrePill active={cat === "all"} onClick={() => setCat("all")}>
          {t("shop.all")}
        </GenrePill>
        {categories.map((c) => (
          <GenrePill key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
            {c.label}
          </GenrePill>
        ))}
      </FadeScroller>

      <div className={s.grid}>
        {visible.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            name={p.name}
            price={p.price}
            blurb={p.blurb}
            buyLabel={t("shop.buy")}
            onBuy={() => setBuying(p)}
          />
        ))}
      </div>

      <CheckoutModal
        open={!!buying}
        title={t("shop.checkoutTitle")}
        summary={<p className={s.summary}>{t("shop.summary", { name: buying?.name ?? "", price: buying?.price ?? "" })}</p>}
        payLabel={t("connect.payAmount", { price: buying?.price ?? "" })}
        onClose={() => setBuying(null)}
        onPaid={paid}
        t={t}
      />

      <ToastViewport placement="bottom-center">
        {toast && (
          <Toast tone="success" title={t("shop.toastTitle")} onClose={() => setToast(null)}>
            {t("shop.toastBody", { name: toast })}
          </Toast>
        )}
      </ToastViewport>
    </div>
  );
}
