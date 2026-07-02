// Shop (onboard store) page content.
//
// The SEAM a future store service populates (ADR 0001). Products share the base
// `Product` type with Wi-Fi plans (content/commerce.ts) and check out through the
// same CheckoutModal + PaymentForm — mirroring the original portal, where plans
// and store products descended from one class and shared one payment flow. Static
// placeholder catalogue today (invented items, Unsplash art). Product names stay
// verbatim across locales; only chrome (category labels, buttons) is i18n.
import type { TFunc } from "../i18n";
import type { Product } from "./commerce";

export interface ShopProduct extends Product {
  /** Square (1:1) product image. */
  image: string;
  /** Category key — also the filter-pill value. */
  category: string;
  /** Short one-line description. */
  blurb: string;
}

export interface ShopCategory {
  key: string;
  label: string;
}

export interface ShopContent {
  categories: ShopCategory[];
  products: ShopProduct[];
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`;

// Invented catalogue — placeholder stand-ins for a real onboard store.
const PRODUCTS: ShopProduct[] = [
  { id: "trail-mix", name: "Trail Mix", price: "$4.50", category: "snacks", image: img("1599599810769-bcde5a160d32"), blurb: "Roasted nuts, seeds, and dried fruit." },
  { id: "dark-chocolate", name: "Dark Chocolate Bar", price: "$3.50", category: "snacks", image: img("1511381939415-e44015466834"), blurb: "70% cocoa, single-origin." },
  { id: "sparkling-water", name: "Sparkling Water", price: "$2.50", category: "snacks", image: img("1602143407151-7111542de6e8"), blurb: "Chilled, lightly carbonated." },
  { id: "neck-pillow", name: "Memory-Foam Neck Pillow", price: "$19.99", category: "comfort", image: img("1520006403909-838d6b92c22e"), blurb: "Contoured support for long-haul rest." },
  { id: "travel-blanket", name: "Travel Blanket", price: "$24.99", category: "comfort", image: img("1522771739844-6a9f6d5f14af"), blurb: "Soft, packable, and warm." },
  { id: "sleep-kit", name: "Sleep Mask & Earplugs", price: "$12.99", category: "comfort", image: img("1541781774459-bb2af2f05b55"), blurb: "Block out light and cabin noise." },
  { id: "headphones", name: "Wireless Headphones", price: "$89.99", category: "tech", image: img("1505740420928-5e560c06d30e"), blurb: "Over-ear, active noise cancelling." },
  { id: "power-bank", name: "USB-C Power Bank", price: "$39.99", category: "tech", image: img("1609091839311-d5365f9ff1c5"), blurb: "10,000 mAh, fast-charge ready." },
  { id: "sunglasses", name: "Aviator Sunglasses", price: "$129.00", category: "dutyfree", image: img("1511499767150-a48a237f0083"), blurb: "Polarized, UV400 lenses." },
  { id: "eau-de-parfum", name: "Signature Eau de Parfum", price: "$95.00", category: "dutyfree", image: img("1541643600914-78b084683601"), blurb: "50ml — warm amber and citrus." },
];

export function getShopContent(t: TFunc): ShopContent {
  return {
    categories: [
      { key: "snacks", label: t("shop.categories.snacks") },
      { key: "comfort", label: t("shop.categories.comfort") },
      { key: "tech", label: t("shop.categories.tech") },
      { key: "dutyfree", label: t("shop.categories.dutyfree") },
    ],
    products: PRODUCTS,
  };
}
