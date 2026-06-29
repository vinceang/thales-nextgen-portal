// Lightweight runtime i18n — a React context with a `t()` lookup and `setLocale`.
// No external library: switching locale just re-renders consumers (no reload).
// Choice is persisted to localStorage and mirrored onto <html lang>.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { en, type Dict } from "./locales/en";
import { fr } from "./locales/fr";
import { es } from "./locales/es";

export type Locale = "en" | "fr" | "es";
export const LOCALES: Locale[] = ["en", "fr", "es"];

const DICTS: Record<Locale, Dict> = { en, fr, es };
const STORAGE_KEY = "thales.locale";

/** Translate a dot-path key with optional `{var}` interpolation. */
export type TFunc = (key: string, vars?: Record<string, string | number>) => string;

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TFunc;
}

const I18nContext = createContext<I18nValue | null>(null);

// Walk a dot-path ("connect.header.title") into the dictionary; fall back to the
// key itself if it doesn't resolve to a string (visible-but-harmless in dev).
function resolve(dict: Dict, key: string): string {
  const val = key.split(".").reduce<unknown>(
    (acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined),
    dict,
  );
  return typeof val === "string" ? val : key;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && (LOCALES as string[]).includes(stored) ? (stored as Locale) : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode / storage disabled — locale still works for the session */
    }
  }, []);

  const t = useCallback<TFunc>(
    (key, vars) => interpolate(resolve(DICTS[locale], key), vars),
    [locale],
  );

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
