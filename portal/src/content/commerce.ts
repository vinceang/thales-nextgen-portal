// Shared commerce primitives.
//
// In the original portal, Wi-Fi plans and Shop products descended from one
// `Product` class and shared a single payment flow. We mirror that here: both
// `PlanContent` (content/connect.ts) and `ShopProduct` (content/shop.ts) extend
// this base, and both check out through the same `CheckoutModal` + `PaymentForm`.
export interface Product {
  /** Stable id (React key + record id). */
  id: string;
  name: string;
  /** Display price, e.g. "$6" / "$3.50". (Amount + currency formatted upstream.) */
  price: string;
}
