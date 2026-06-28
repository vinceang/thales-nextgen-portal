import s from "./Footer.module.css";

// Footer furniture — quiet, centered, token-driven. Links go bright-blue on hover
// (the system's one-accent hover convention) — real CSS :hover.
const LINKS = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Legal", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <img src="/assets/logos/thales-white.svg" alt="Thales" className={s.logo} />

      <nav className={s.links}>
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} className={s.link}>{l.label}</a>
        ))}
      </nav>

      <p className={s.copy}>© {year} Thales Group. All rights reserved.</p>
    </footer>
  );
}
