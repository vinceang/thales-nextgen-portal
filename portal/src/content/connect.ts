// Connect / Plans page content.
//
// This module is the SEAM a future portal admin tool will populate (see
// docs/adr/0001-bento-cells-config-driven.md). Today it composes the *same shape*
// from the active locale's dictionary via `t()`; later an admin-configured source
// (API / CMS) provides that shape per language, and the page does not change.
// Keep editorial copy in the i18n dictionaries and structure/pricing here — never
// inlined in the page's JSX — so the page stays a pure renderer of content.
import type { TFunc } from "../i18n";

/** A purchasable Wi-Fi pass. Admin-editable per deployment/flight. */
export interface PlanContent {
  /** Stable id (used as React key and the admin record id). */
  id: string;
  name: string;
  /** Display price, e.g. "$6". (Admin sets amount + currency; formatted upstream.) */
  price: string;
  /** Feature lines shown with blue check bullets. */
  features: string[];
  /** Emphasize as the recommended plan (blue bar, star, badge, filled CTA). */
  recommended?: boolean;
  /** Caption above the recommended CTA, e.g. "Best Value!". */
  badge?: string;
  /** CTA label; defaults to "Buy Now". */
  ctaLabel?: string;
}

/** Editorial intro. `emphasize` is a phrase within `text` rendered bold/full-white. */
export interface ConnectHeaderContent {
  title: string;
  text: string;
  emphasize?: string;
}

export interface ConnectContent {
  header: ConnectHeaderContent;
  plans: PlanContent[];
}

/**
 * Build the Connect page content for the active locale. Prices and plan/feature
 * structure live here; localized copy comes from the i18n dictionary via `t`.
 * Swap this for an admin/API source later (e.g. `api.getConnectContent(id, locale)`)
 * — callers and the page component stay unchanged.
 */
export function getConnectContent(t: TFunc): ConnectContent {
  const f = {
    messaging: t("connect.features.messaging"),
    email: t("connect.features.email"),
    browsing: t("connect.features.browsing"),
    streaming: t("connect.features.streaming"),
  };
  return {
    header: {
      title: t("connect.header.title"),
      text: t("connect.header.text"),
      emphasize: t("connect.header.emphasize"),
    },
    plans: [
      { id: "messaging", name: t("connect.plans.messaging"), price: "$2", features: [f.messaging, f.email] },
      { id: "browsing", name: t("connect.plans.browsing"), price: "$4", features: [f.messaging, f.email, f.browsing] },
      {
        id: "streaming",
        name: t("connect.plans.streaming"),
        price: "$6",
        features: [f.messaging, f.email, f.browsing, f.streaming],
        recommended: true,
        badge: t("connect.badge"),
      },
    ],
  };
}
