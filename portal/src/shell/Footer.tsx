import { useI18n } from "../i18n";
import s from "./Footer.module.css";

// Footer furniture — quiet, centered, token-driven. Links go bright-blue on hover
// (the system's one-accent hover convention) — real CSS :hover. Labels are i18n
// keys resolved at render so the footer re-localizes with the rest of the app.
const LINKS = [
  { key: "terms", href: "#" },
  { key: "privacy", href: "#" },
  { key: "legal", href: "#" },
  { key: "contact", href: "#" },
];

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <img src="/assets/logos/thales-white.svg" alt="Thales" className={s.logo} />

      <nav className={s.links}>
        {LINKS.map((l) => (
          <a key={l.key} href={l.href} className={s.link}>{t(`footer.${l.key}`)}</a>
        ))}
      </nav>

      <p className={s.copy}>{t("footer.copyright", { year })}</p>
    </footer>
  );
}
