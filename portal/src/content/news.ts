// News page content.
//
// The SEAM a future data source populates (ADR 0001) — a news-aggregator service
// will later return this same shape (sources + categorised stories). Static
// placeholder catalogue today (monochrome source logos in public/, Unsplash
// imagery). Story headlines/timestamps stay verbatim across locales; only chrome
// (category labels) is i18n. Source selection is visual-only for now (the mock
// feed isn't per-source); wiring it to re-fetch is a page-level change later.
import type { TFunc } from "../i18n";

export interface NewsSourceItem {
  /** Stable id (selection key). */
  id: string;
  name: string;
  /** Monochrome (currentColor) logo URL, served from public/. */
  logo: string;
}

export interface NewsCategory {
  /** Filter key — also the GenrePill value. */
  key: string;
  label: string;
}

export interface NewsStory {
  id: string;
  title: string;
  image: string;
  /** Relative timestamp (localized by the real service later). */
  timeAgo: string;
  /** Category key (matches a NewsCategory.key, "all" excluded). */
  category: string;
}

export interface NewsHeroStory {
  id: string;
  title: string;
  image: string;
  date: string;
  timeAgo: string;
  category: string;
}

export interface NewsContent {
  sources: NewsSourceItem[];
  categories: NewsCategory[];
  hero: NewsHeroStory;
  stories: NewsStory[];
}

const logo = (file: string) => `/assets/logos/news/${file}.svg`;

// Monochrome source logos shipped in public/assets/logos/news/ (the 14 in the
// pack). A real aggregator would return its own source list + logos.
const SOURCES: NewsSourceItem[] = [
  { id: "cnn", name: "CNN", logo: logo("cnn") },
  { id: "nyt", name: "The New York Times", logo: logo("new-york-times") },
  { id: "guardian", name: "The Guardian", logo: logo("the-guardian") },
  { id: "washington-post", name: "The Washington Post", logo: logo("washington-post") },
  { id: "nbc-news", name: "NBC News", logo: logo("nbc-news") },
  { id: "cbs-news", name: "CBS News", logo: logo("cbs-news") },
  { id: "axios", name: "Axios", logo: logo("axios") },
  { id: "vox", name: "Vox", logo: logo("vox") },
  { id: "techcrunch", name: "TechCrunch", logo: logo("techcrunch") },
  { id: "ars-technica", name: "Ars Technica", logo: logo("ars-technica") },
  { id: "cnet", name: "CNET", logo: logo("cnet") },
  { id: "buzzfeed", name: "BuzzFeed", logo: logo("buzzfeed") },
  { id: "us-news", name: "U.S. News", logo: logo("us-news") },
  { id: "irish-times", name: "The Irish Times", logo: logo("irish-times") },
];

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=520&fit=crop&q=80`;

// Invented headlines — placeholder stand-ins for a real feed. Category keys drive
// the GenrePill filter (must match a NewsCategory.key below).
const STORIES: NewsStory[] = [
  { id: "n1", title: "Coastal cities weigh new flood defenses as storm season nears", image: img("1493225457124-a3eb161ffa5f"), timeAgo: "2 minutes ago", category: "world" },
  { id: "n2", title: "Central banks signal a slower path on interest rate cuts", image: img("1470225620780-dba8ba36b745"), timeAgo: "6 minutes ago", category: "business" },
  { id: "n3", title: "Parliament debates sweeping data-privacy overhaul", image: img("1511671782779-c97d3d27a1d4"), timeAgo: "8 minutes ago", category: "politics" },
  { id: "n4", title: "Researchers unveil a faster, cheaper battery chemistry", image: img("1465847899084-d164df4dedc6"), timeAgo: "12 minutes ago", category: "technology" },
  { id: "n5", title: "Underdogs stun favorites in a late semifinal thriller", image: img("1461896836934-ffe607ba8211"), timeAgo: "18 minutes ago", category: "sports" },
  { id: "n6", title: "Streaming giants chase live sports rights in bidding war", image: img("1489599849927-2ee91cede3ba"), timeAgo: "24 minutes ago", category: "entertainment" },
  { id: "n7", title: "New guidelines reshape how clinics screen for heart risk", image: img("1519494026892-80bbd2d6fd0d"), timeAgo: "32 minutes ago", category: "health" },
  { id: "n8", title: "Aid convoys reach remote regions after weeks of delay", image: img("1507838153414-b4b713384a76"), timeAgo: "41 minutes ago", category: "world" },
  { id: "n9", title: "Startup valuations cool as investors demand a path to profit", image: img("1496293455970-f8581aae0e3b"), timeAgo: "52 minutes ago", category: "business" },
  { id: "n10", title: "Chipmakers race to secure next-generation fabrication", image: img("1518770660439-4636190af475"), timeAgo: "an hour ago", category: "technology" },
  { id: "n11", title: "Marathon record falls on a cool, fast morning", image: img("1517649763962-0c623066013b"), timeAgo: "an hour ago", category: "sports" },
  { id: "n12", title: "Film festival lineup leans into first-time directors", image: img("1489599849927-2ee91cede3ba"), timeAgo: "2 hours ago", category: "entertainment" },
];

export function getNewsContent(t: TFunc): NewsContent {
  return {
    sources: SOURCES,
    categories: [
      { key: "all", label: t("news.categories.all") },
      { key: "world", label: t("news.categories.world") },
      { key: "politics", label: t("news.categories.politics") },
      { key: "business", label: t("news.categories.business") },
      { key: "technology", label: t("news.categories.technology") },
      { key: "sports", label: t("news.categories.sports") },
      { key: "entertainment", label: t("news.categories.entertainment") },
      { key: "health", label: t("news.categories.health") },
    ],
    hero: {
      id: "hero",
      title: "Extra-time stunner sends the home side to the final four",
      image: img("1552667466-07770ae110d0"),
      date: "Aug 3, 2024",
      timeAgo: "an hour ago",
      category: "sports",
    },
    stories: STORIES,
  };
}
