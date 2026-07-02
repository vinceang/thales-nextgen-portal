// Info / legal pages content (footer links: Terms, Privacy, Legal, Contact).
//
// These are editorial "document" pages — same portable block model as the blog
// (content/blog.ts), minus imagery, so they read consistently with the content
// pages. Unlike blog posts (verbatim across locales), this copy IS translatable:
// the structure lives here and every string resolves through the i18n dictionary
// (info.*), so the pages re-localize with the rest of the app. Placeholder copy —
// clearly a demo prototype, not a real legal agreement.
import type { TFunc } from "../i18n";
import type { BlogBlock } from "./blog";

export type InfoKey = "terms" | "privacy" | "legal" | "contact";

export interface InfoContent {
  /** Small overline (e.g. "Legal" / "Support"). */
  kicker: string;
  title: string;
  /** "Last updated …" line. */
  updated: string;
  /** Body blocks (paragraph / heading / list — no images). */
  blocks: BlogBlock[];
}

export function getInfoContent(key: InfoKey, t: TFunc): InfoContent {
  const p = (k: string): BlogBlock => ({ type: "paragraph", text: t(k) });
  const h = (k: string): BlogBlock => ({ type: "heading", text: t(k) });
  const updated = t("info.updated");

  switch (key) {
    case "terms":
      return {
        kicker: t("info.kickerLegal"),
        title: t("footer.terms"),
        updated,
        blocks: [
          p("info.terms.intro"),
          h("info.terms.s1h"), p("info.terms.s1p"),
          h("info.terms.s2h"), p("info.terms.s2p"),
          h("info.terms.s3h"), p("info.terms.s3p"),
        ],
      };
    case "privacy":
      return {
        kicker: t("info.kickerLegal"),
        title: t("footer.privacy"),
        updated,
        blocks: [
          p("info.privacy.intro"),
          h("info.privacy.s1h"), p("info.privacy.s1p"),
          h("info.privacy.s2h"), p("info.privacy.s2p"),
          h("info.privacy.s3h"), p("info.privacy.s3p"),
        ],
      };
    case "legal":
      return {
        kicker: t("info.kickerLegal"),
        title: t("footer.legal"),
        updated,
        blocks: [
          p("info.legal.intro"),
          h("info.legal.s1h"), p("info.legal.s1p"),
          h("info.legal.s2h"), p("info.legal.s2p"),
          h("info.legal.s3h"), p("info.legal.s3p"),
        ],
      };
    case "contact":
      return {
        kicker: t("info.kickerContact"),
        title: t("footer.contact"),
        updated,
        blocks: [
          p("info.contact.intro"),
          h("info.contact.s1h"),
          { type: "list", items: [t("info.contact.email"), t("info.contact.phone"), t("info.contact.hours")] },
          h("info.contact.s2h"), p("info.contact.s2p"),
        ],
      };
  }
}
