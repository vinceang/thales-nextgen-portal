// Favorites — shared "saved titles" state for the whole app.
//
// ┌─ PROTOTYPE NOTE ──────────────────────────────────────────────────────────┐
// │ This is a DEMO store: favorites live in React state and are persisted to   │
// │ localStorage (per-device, no account sync). We also snapshot the title +   │
// │ image so the Account "Favorites" view can render without re-fetching.      │
// │                                                                            │
// │ TO FULLY WIRE THIS UP (production):                                        │
// │  1. Back it with the user account: on sign-in, GET /me/favorites; replace  │
// │     the localStorage read in `load()` with that call (and keep localStorage│
// │     as an offline cache / optimistic layer).                               │
// │  2. On toggle, POST/DELETE /me/favorites/{id} (optimistic update here,     │
// │     reconcile on response). Debounce / queue while offline.                │
// │  3. Store only { id, kind } server-side; hydrate title/image from the      │
// │     catalogue (TMDB etc.) at render time instead of snapshotting them.     │
// │  4. Swap the module-level functions below for an injected client so tests  │
// │     and tenants can provide their own backend.                            │
// └────────────────────────────────────────────────────────────────────────────┘
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/** The media surfaces a favorite can come from. */
export type FavoriteKind = "watch" | "listen" | "read" | "play";

export interface FavoriteItem {
  /** Stable id (catalogue / future TMDB id). */
  id: string;
  kind: FavoriteKind;
  /** Snapshot for demo rendering — drop once items are hydrated from the API. */
  title: string;
  image: string;
}

interface FavoritesValue {
  favorites: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  /** Add if absent, remove if present. */
  toggle: (item: FavoriteItem) => void;
  remove: (id: string) => void;
  byKind: (kind: FavoriteKind) => FavoriteItem[];
}

const FavoritesContext = createContext<FavoritesValue | null>(null);
const STORAGE_KEY = "thales.favorites";

// --- Persistence (the demo seam — replace with API calls per the note above) ---
function load(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: FavoriteItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage disabled — favorites still work for the session */
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(load);

  // Persist on every change. (Production: also push to the account API.)
  useEffect(() => {
    save(favorites);
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites]);

  const toggle = useCallback((item: FavoriteItem) => {
    setFavorites((cur) =>
      cur.some((f) => f.id === item.id) ? cur.filter((f) => f.id !== item.id) : [item, ...cur],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((cur) => cur.filter((f) => f.id !== id));
  }, []);

  const byKind = useCallback((kind: FavoriteKind) => favorites.filter((f) => f.kind === kind), [favorites]);

  const value = useMemo<FavoritesValue>(
    () => ({ favorites, isFavorite, toggle, remove, byKind }),
    [favorites, isFavorite, toggle, remove, byKind],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
