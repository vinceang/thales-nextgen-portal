// Connectivity — the passenger's active Wi-Fi session (demo).
//
// A tiny context (same shape/persistence pattern as FavoritesProvider) holding
// the purchased plan. The header Wi-Fi icon reads `connected` (off until a plan
// is bought); the Connect page sets it after the payment flow. Persisted to
// localStorage so the "connected" state survives reloads, like a real pass would
// survive reconnections. No real network/session — purely presentational.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface ConnectedPlan {
  id: string;
  name: string;
  price: string;
}

interface ConnectivityValue {
  plan: ConnectedPlan | null;
  connected: boolean;
  connect: (plan: ConnectedPlan) => void;
  disconnect: () => void;
}

const ConnectivityContext = createContext<ConnectivityValue | null>(null);
const STORAGE_KEY = "thales.connectivity";

function load(): ConnectedPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConnectedPlan) : null;
  } catch {
    return null;
  }
}

export function ConnectivityProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<ConnectedPlan | null>(load);

  useEffect(() => {
    try {
      if (plan) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage disabled — connectivity still works for the session */
    }
  }, [plan]);

  const connect = useCallback((p: ConnectedPlan) => setPlan(p), []);
  const disconnect = useCallback(() => setPlan(null), []);

  const value = useMemo<ConnectivityValue>(
    () => ({ plan, connected: !!plan, connect, disconnect }),
    [plan, connect, disconnect],
  );

  return <ConnectivityContext.Provider value={value}>{children}</ConnectivityContext.Provider>;
}

export function useConnectivity(): ConnectivityValue {
  const ctx = useContext(ConnectivityContext);
  if (!ctx) throw new Error("useConnectivity must be used within a ConnectivityProvider");
  return ctx;
}
