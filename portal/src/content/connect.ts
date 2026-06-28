// Connect / Plans page content.
//
// This module is the SEAM a future portal admin tool will populate (see
// docs/adr/0001-bento-cells-config-driven.md). Today it returns static sample
// data; later an admin-configured source (API / CMS) provides the *same shape*,
// and the page component does not change. Keep all editorial copy, pricing, and
// plan structure here — never inlined in the page's JSX — so the page stays a
// pure renderer of admin-managed content.

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

// --- Static sample (stand-in for the admin tool's output) -------------------
export const connectContent: ConnectContent = {
  header: {
    title: "The Fastest Wi-Fi in the Sky",
    text:
      "Please choose from the Wi-Fi plans below. We highly recommend the " +
      "High-Speed Streaming plan, which offers internet speeds of up to 300 Mbps.",
    emphasize: "High-Speed Streaming",
  },
  plans: [
    { id: "messaging", name: "Messaging", price: "$2", features: ["Messaging", "E-mail"] },
    { id: "browsing", name: "Browsing", price: "$4", features: ["Messaging", "E-mail", "Basic Browsing"] },
    {
      id: "streaming",
      name: "High-Speed Streaming",
      price: "$6",
      features: ["Messaging", "E-mail", "Basic Browsing", "Streaming"],
      recommended: true,
      badge: "Best Value!",
    },
  ],
};

/**
 * Fetch the Connect page content. Swap this implementation for an admin/API
 * source later (e.g. `return api.getConnectContent(deploymentId)`) — callers and
 * the page component stay unchanged.
 */
export function getConnectContent(): ConnectContent {
  return connectContent;
}
