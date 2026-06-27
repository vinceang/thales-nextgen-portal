import { useState } from "react";

// Footer furniture — quiet, centered, token-driven. Links sit muted and turn
// bright-blue on hover (the system's one-accent hover convention).
const LINKS = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Legal", href: "#" },
  { label: "Contact", href: "#" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: hover ? "var(--color-bright-blue)" : "var(--text-secondary)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "color var(--dur-link) var(--ease-smooth)",
      }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderBlockStart: "1px solid var(--color-border)",
        marginBlockStart: "var(--space-xl)",
        padding: "var(--space-lg) var(--space-lg) var(--space-xl)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-sm)",
        textAlign: "center",
      }}
    >
      <img src="/assets/logos/thales-white.svg" alt="Thales" style={{ height: 16 }} />

      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 18px",
        }}
      >
        {LINKS.map((l) => (
          <FooterLink key={l.label} {...l} />
        ))}
      </nav>

      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-subscript)",
          color: "var(--text-secondary)",
          letterSpacing: "0.02em",
        }}
      >
        © {year} Thales Group. All rights reserved.
      </p>
    </footer>
  );
}
