import { useI18n, LOCALES, type Locale } from "../i18n";
import s from "./LanguageSelector.module.css";

// Compact segmented control (EN · FR · ES) for the SideDrawer footer, left-aligned
// with the main nav items. Active locale fills bright-blue; switching is instant
// (context re-render, no reload).
const LABELS: Record<Locale, string> = { en: "EN", fr: "FR", es: "ES" };

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className={s.seg} role="group" aria-label={t("common.language")}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          className={s.btn}
          data-active={l === locale ? "true" : undefined}
          aria-pressed={l === locale}
          onClick={() => setLocale(l)}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
