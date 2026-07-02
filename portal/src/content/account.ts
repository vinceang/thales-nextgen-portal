// Account / Settings page content.
//
// Like content/connect.ts, this is the SEAM a future portal admin tool will
// populate (ADR 0001). It returns the page's *structured* options — section
// tabs and the select choices — with localized labels composed from the active
// locale's dictionary via `t`. Stable `value`s are locale-independent (used as
// form state + the admin record id); only the `label` is translated. Field
// labels/placeholders themselves are read directly in the page via `t()`.
import type { TFunc } from "../i18n";

/** A `{ value, label }` choice for Tabs / Select / RadioGroup. */
export interface Choice {
  value: string;
  label: string;
}

export interface AccountContent {
  tabs: Choice[];
  countries: Choice[];
  units: Choice[];
}

export function getAccountContent(t: TFunc): AccountContent {
  return {
    tabs: [
      { value: "profile", label: t("account.tabs.profile") },
      { value: "favorites", label: t("account.tabs.favorites") },
      { value: "connectivity", label: t("account.tabs.connectivity") },
      { value: "purchases", label: t("account.tabs.purchases") },
    ],
    countries: [
      { value: "us", label: t("account.countries.us") },
      { value: "ca", label: t("account.countries.ca") },
      { value: "uk", label: t("account.countries.uk") },
      { value: "au", label: t("account.countries.au") },
    ],
    units: [
      { value: "fahrenheit", label: t("account.preferences.fahrenheit") },
      { value: "celsius", label: t("account.preferences.celsius") },
    ],
  };
}
