import { Kicker, Card, Badge } from "../design-system/components";
import { useI18n } from "../i18n";
import s from "./About.module.css";

/* About — the maker page. Bio header + discipline cards, adapted from the maker's
   Sojurno About page and rebuilt with DS components + tokens (no Tailwind). Copy
   is translatable via about.* (en/es/fr). */

// Maker portrait from public/; falls back to a neutral portrait if missing.
const PORTRAIT = "/maker.jpg";
const PORTRAIT_FALLBACK = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80";

const DISCIPLINES = [
  { title: "about.uxTitle", body: "about.uxBody", tags: ["about.tagInteraction", "about.tagSystems", "about.tagResearch", "about.tagFigma"] },
  { title: "about.engineeringTitle", body: "about.engineeringBody", tags: ["about.tagReact", "about.tagCssModules", "about.tagA11y", "about.tagTokens"] },
  { title: "about.systemsTitle", body: "about.systemsBody", tags: ["about.tagSystems", "about.tagTokens", "about.tagFigma", "about.tagWhitelabel"] },
  { title: "about.productTitle", body: "about.productBody", tags: ["about.tagStrategy", "about.tagPositioning", "about.tagBrand", "about.tagLaunch"] },
] as const;

export default function About() {
  const { t } = useI18n();

  return (
    <div className={s.page}>
      <header className={s.head}>
        <img
          className={s.portrait}
          src={PORTRAIT}
          alt={t("about.portraitAlt")}
          width={128}
          height={128}
          onError={(e) => {
            if (e.currentTarget.src !== PORTRAIT_FALLBACK) e.currentTarget.src = PORTRAIT_FALLBACK;
          }}
        />
        <div>
          <Kicker style={{ fontSize: 12 }}>{t("about.eyebrow")}</Kicker>
          <h1 className={s.title}>{t("about.heading")}</h1>
          <p className={s.bio}>{t("about.bio")}</p>
        </div>
      </header>

      <div className={s.grid}>
        {DISCIPLINES.map((d) => (
          <Card key={d.title} padding={28}>
            <h2 className={s.cardTitle}>{t(d.title)}</h2>
            <p className={s.cardBody}>{t(d.body)}</p>
            <div className={s.tags}>
              {d.tags.map((tag) => (
                <Badge key={tag}>{t(tag)}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <p className={s.note}>{t("about.note")}</p>
    </div>
  );
}
