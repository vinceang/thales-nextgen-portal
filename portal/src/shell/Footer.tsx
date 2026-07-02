import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import s from "./Footer.module.css";

// Footer furniture — quiet, centered, token-driven. Links go bright-blue on hover
// (the system's one-accent hover convention) — real CSS :hover. Labels are i18n
// keys resolved at render so the footer re-localizes with the rest of the app.
// Each link routes to its info page (client-side).
const LINKS = [
  { key: "terms", to: "/terms" },
  { key: "privacy", to: "/privacy" },
  { key: "legal", to: "/legal" },
  { key: "contact", to: "/contact" },
];

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <img src="/assets/logos/thales-white.svg" alt="Thales" className={s.logo} />

      <nav className={s.links}>
        {LINKS.map((l) => (
          <Link key={l.key} to={l.to} className={s.link}>{t(`footer.${l.key}`)}</Link>
        ))}
      </nav>

      <p className={s.copy}>{t("footer.copyright", { year })}</p>
    </footer>
  );
}
