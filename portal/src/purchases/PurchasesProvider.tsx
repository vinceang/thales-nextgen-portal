// Purchases — the passenger's order history (demo).
//
// Same context/persistence pattern as FavoritesProvider and ConnectivityProvider:
// records live in React state, persisted to localStorage (per-device, no account
// sync). Both checkout flows — Wi-Fi plans (Connect) and store items (Shop) —
// share one CheckoutModal, so both call `record()` on a successful (format-only)
// payment. The Account "Purchases" tab reads this list. Order ids and timestamps
// are generated client-side here; a real backend would return them from the
// order API. Demo only — nothing is charged or stored server-side.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/** Which checkout produced the order (drives the label + thumbnail treatment). */
export type PurchaseKind = "plan" | "shop";

export interface PurchaseRecord {
  /** Human-facing order id, e.g. "TN-8F3A21". */
  orderId: string;
  kind: PurchaseKind;
  name: string;
  price: string;
  /** Square product image (Shop items only; plans have none). */
  image?: string;
  /** Epoch ms the order was placed. */
  at: number;
}

/** What a caller supplies; the id + timestamp are minted here. */
export type NewPurchase = Omit<PurchaseRecord, "orderId" | "at">;

interface PurchasesValue {
  purchases: PurchaseRecord[];
  /** Append an order (newest first); returns the minted record. */
  record: (p: NewPurchase) => PurchaseRecord;
  clear: () => void;
}

const PurchasesContext = createContext<PurchasesValue | null>(null);
const STORAGE_KEY = "thales.purchases";

// TN-XXXXXX — six uppercase base36 chars. Cosmetic (no checksum); the backend
// would own the real order id.
function mintOrderId(): string {
  let body = "";
  for (let i = 0; i < 6; i++) {
    body += Math.floor(Math.random() * 36).toString(36).toUpperCase();
  }
  return `TN-${body}`;
}

function load(): PurchaseRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PurchaseRecord[]) : [];
  } catch {
    return [];
  }
}

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    } catch {
      /* storage disabled — purchases still work for the session */
    }
  }, [purchases]);

  const record = useCallback((p: NewPurchase) => {
    const entry: PurchaseRecord = { ...p, orderId: mintOrderId(), at: Date.now() };
    setPurchases((cur) => [entry, ...cur]);
    return entry;
  }, []);

  const clear = useCallback(() => setPurchases([]), []);

  const value = useMemo<PurchasesValue>(
    () => ({ purchases, record, clear }),
    [purchases, record, clear],
  );

  return <PurchasesContext.Provider value={value}>{children}</PurchasesContext.Provider>;
}

export function usePurchases(): PurchasesValue {
  const ctx = useContext(PurchasesContext);
  if (!ctx) throw new Error("usePurchases must be used within a PurchasesProvider");
  return ctx;
}
