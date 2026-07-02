// Blog content — the local "CMS" seam (ADR 0001) powering the editorial sections
// (Destinations, Travel).
//
// The content model is deliberately CMS-shaped: each post is METADATA + a BODY
// made of typed BLOCKS (a portable rich-text model, like Contentful/Sanity's
// "portable text" or markdown frontmatter + AST). A future headless CMS or a
// local markdown loader would return this exact shape, so wiring one up means
// replacing the body of getPosts/getPost — no page or component changes.
//
// Post copy (titles, body) is authored content and stays verbatim across locales;
// only surrounding chrome (labels, section titles) is i18n, resolved in the pages.
import type { TFunc } from "../i18n";
import { loadDrafts } from "./blogStore";

/** Which editorial section a post belongs to (also its route base). */
export type BlogSection = "destinations" | "travel";

/** A portable body block. New block types slot in here + in PostBody's renderer. */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export interface BlogAuthor {
  name: string;
  role?: string;
  /** Profile photo (initials avatar shown until one exists). */
  avatar?: string;
}

export interface BlogPost {
  /** URL slug — unique within a section (`/{section}/{slug}`). */
  slug: string;
  section: BlogSection;
  title: string;
  /** One-line deck shown on cards and under the hero. */
  excerpt: string;
  /** Landscape cover (16:9). */
  cover: string;
  author: BlogAuthor;
  /** Display date (a CMS would send ISO; formatting is the render layer's job). */
  date: string;
  /** e.g. "7 min read". */
  readTime: string;
  tags: string[];
  /** Marks the lead story for the section index hero. */
  featured?: boolean;
  body: BlogBlock[];
}

// Placeholder imagery (Unsplash) — reuses ids proven to load elsewhere. A real
// CMS supplies its own assets.
const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

// Seeded posts (the "published" catalogue). Author-created drafts from the
// Studio (localStorage) are merged on top by the getters below.
const SEED: BlogPost[] = [
  // ── Destinations ─────────────────────────────────────────────────────────
  {
    slug: "orlando-epcot",
    section: "destinations",
    title: "Orlando's Best: A Day at Epcot",
    excerpt: "How to see the best of Epcot in a single day — from the first monorail to the last firework.",
    cover: img("1597466599360-3b9775841aec"),
    author: { name: "Marisol Vega", role: "Travel Editor" },
    date: "June 24, 2026",
    readTime: "7 min read",
    tags: ["Orlando", "Theme Parks", "Family"],
    featured: true,
    body: [
      { type: "paragraph", text: "Epcot is two parks in one: a love letter to human ingenuity up front, and a whistle-stop tour of the world out back. Try to do everything and you'll do nothing well. The trick is to pick a rhythm and let the park set the pace." },
      { type: "heading", text: "Morning: World Celebration" },
      { type: "paragraph", text: "Arrive before the gates open. The early monorail is half-empty and the light on Spaceship Earth is worth the alarm. Ride it first — the queue triples by ten — then drift toward the pavilions while the crowds are still finding their coffee." },
      { type: "image", src: img("1414235077428-338989a2e8c0", 1000), caption: "The World Showcase lagoon just after opening, before the tour groups arrive." },
      { type: "heading", text: "Afternoon: Around the World" },
      { type: "paragraph", text: "The World Showcase is best walked slowly and eaten through. Skip a sit-down lunch in favour of a progressive one: a pastry in France, a pretzel in Germany, sushi in Japan. Pace the snacks and you'll still have room for dinner." },
      { type: "list", items: ["Book the 11:00 lunch window if you want one proper meal", "Ride Frozen Ever After in the afternoon lull", "Stake out a lagoon-side spot 45 minutes before the show"] },
      { type: "quote", text: "You don't visit Epcot so much as graze it — one country, one small wonder at a time.", cite: "Marisol Vega" },
      { type: "paragraph", text: "End on the water. The nighttime spectacular is the one moment the whole park stops moving at once, and there's no bad seat if you claim it early. Then walk out with the crowd, tired and a little dazzled — which is rather the point." },
    ],
  },
  {
    slug: "48-hours-melbourne",
    section: "destinations",
    title: "48 Hours in Melbourne",
    excerpt: "Laneway coffee, rooftop bars, and the best flat white you'll have all year — a weekend, done right.",
    cover: img("1514395462725-fb4566210144"),
    author: { name: "Tomas Berg", role: "Contributor" },
    date: "May 30, 2026",
    readTime: "6 min read",
    tags: ["Melbourne", "City Guide", "Food"],
    body: [
      { type: "paragraph", text: "Melbourne hides its best self down alleys. The grand boulevards are handsome enough, but the city really lives in its laneways — narrow, graffitied, and stitched with tiny bars and cafés that don't bother with signage." },
      { type: "heading", text: "Day one: the grid" },
      { type: "paragraph", text: "Start with coffee, because Melbourne demands it. The city arguably invented the flat white, and it will not let you forget it. Wander Hosier Lane for the street art, then lose an hour in the State Library's domed reading room." },
      { type: "image", src: img("1493225457124-a3eb161ffa5f", 1000), caption: "A typical laneway café — no sign, no fuss, excellent coffee." },
      { type: "heading", text: "Day two: the bay" },
      { type: "paragraph", text: "Take the tram to St Kilda for the pier, the penguins at dusk, and a slice of something at the old cake shops on Acland Street. Come back into the city for a rooftop bar as the lights come up." },
      { type: "list", items: ["Ride the free City Circle tram to get your bearings", "Book nothing before 9am — the city sleeps in", "Carry a jacket; four seasons in one day is not a joke here"] },
      { type: "paragraph", text: "Two days barely scratches it, but Melbourne rewards the unhurried. Leave the itinerary loose and follow the smell of coffee." },
    ],
  },
  {
    slug: "tokyo-after-dark",
    section: "destinations",
    title: "Tokyo After Dark",
    excerpt: "The city changes at night. A guide to neon, noodles, and the quiet corners in between.",
    cover: img("1470225620780-dba8ba36b745"),
    author: { name: "Nadia Okafor", role: "Contributor" },
    date: "April 12, 2026",
    readTime: "8 min read",
    tags: ["Tokyo", "Nightlife", "Food"],
    body: [
      { type: "paragraph", text: "Daytime Tokyo is orderly and immense. Nighttime Tokyo is something else — smaller, warmer, lit in every colour, and best explored one narrow street at a time." },
      { type: "heading", text: "Start in the glow" },
      { type: "paragraph", text: "Shinjuku's back alleys are the obvious opening act, and they earn it: lantern-lit yokocho barely wide enough for two, each stool a different kitchen. Order what the person next to you is having." },
      { type: "image", src: img("1489599849927-2ee91cede3ba", 1000), caption: "Golden hour bleeds straight into neon in the city's older quarters." },
      { type: "quote", text: "The best meals in Tokyo have six seats and no menu you can read.", cite: "Nadia Okafor" },
      { type: "heading", text: "End in the quiet" },
      { type: "paragraph", text: "When the neon gets to be too much, slip toward the river or a late-night garden. The city keeps a surprising amount of stillness in reserve, if you know where to step off the main drag." },
      { type: "list", items: ["Carry cash — the best places don't take cards", "Last trains run around midnight; plan the walk home", "A 7-Eleven egg sandwich at 2am is a genuine delicacy"] },
    ],
  },
  // ── Travel ────────────────────────────────────────────────────────────────
  {
    slug: "exploring-england",
    section: "travel",
    title: "Exploring England by Rail",
    excerpt: "Skip the motorway. The best of England unfolds from a train window, teacup in hand.",
    cover: img("1454496522488-7a8e488e8606"),
    author: { name: "Eli Ashwood", role: "Travel Editor" },
    date: "June 8, 2026",
    readTime: "9 min read",
    tags: ["England", "Rail", "Slow Travel"],
    featured: true,
    body: [
      { type: "paragraph", text: "There's a particular pleasure to seeing a country at the speed of a train: fast enough to cover ground, slow enough to watch it change. England, small and stitched with track, was practically made for it." },
      { type: "heading", text: "The classic line" },
      { type: "paragraph", text: "Start in London and point yourself northwest. Within an hour the city gives way to hedgerows, then hills, then the improbable green of the Lake District. Bring a book you won't read; the window is better." },
      { type: "image", src: img("1500530855697-b586d89ba3ee", 1000), caption: "The countryside opens up within the first hour out of the city." },
      { type: "heading", text: "How to do it well" },
      { type: "list", items: ["Book off-peak fares in advance for the best prices", "A railcard pays for itself in two or three journeys", "Reserve a seat on the left heading north for the coast", "Pack light — you'll be carrying it up station stairs"] },
      { type: "quote", text: "The motorway gets you there. The railway lets you arrive.", cite: "Eli Ashwood" },
      { type: "paragraph", text: "Trains turn the journey into part of the holiday rather than the toll you pay for it. Book the window seat, buy the overpriced tea, and let the country slide past." },
    ],
  },
  {
    slug: "carry-on-mastery",
    section: "travel",
    title: "Packing Light: Carry-On Mastery",
    excerpt: "Everything you need for a week, nothing you don't — and never a checked bag again.",
    cover: img("1483985988355-763728e1935b"),
    author: { name: "Lena Cross", role: "Contributor" },
    date: "May 2, 2026",
    readTime: "5 min read",
    tags: ["Packing", "Tips"],
    body: [
      { type: "paragraph", text: "The checked bag is a tax on your time — at the desk, at the carousel, at the mercy of a baggage system that loses a few million a year. Learn to live out of a carry-on and you buy back hours on every trip." },
      { type: "heading", text: "Choose a palette" },
      { type: "paragraph", text: "The single biggest lever is colour. Pick three that all go together and everything you pack becomes an outfit. Suddenly five pieces cover a week." },
      { type: "list", items: ["Roll, don't fold — it saves space and creases less", "One pair of shoes worn, one packed, no more", "Solid toiletries skip the liquids limit entirely", "Pack a thin day bag that folds into itself"] },
      { type: "quote", text: "You will never once wish you'd brought more. You will often wish you'd brought less.", cite: "Lena Cross" },
      { type: "paragraph", text: "Lay out everything you think you need, then take half of it away. Do that twice and you'll have a bag you can lift over your head and a trip you can move through freely." },
    ],
  },
  {
    slug: "art-of-the-layover",
    section: "travel",
    title: "The Art of the Layover",
    excerpt: "A long connection isn't dead time. With a little planning it's a bonus city, or a proper rest.",
    cover: img("1556745757-8d76bdb6984b"),
    author: { name: "Cole Rutherford", role: "Contributor" },
    date: "March 19, 2026",
    readTime: "6 min read",
    tags: ["Airports", "Tips"],
    body: [
      { type: "paragraph", text: "Most travellers treat the layover as punishment. The seasoned ones treat it as an opportunity — for a nap, a lounge, a shower, or if the numbers work, a few hours in a city they'd never otherwise see." },
      { type: "heading", text: "The six-hour rule" },
      { type: "paragraph", text: "Under four hours, stay airside and rest. Over six, and in many cities you can clear immigration, ride the train downtown, see one thing well, and be back with margin to spare." },
      { type: "image", src: img("1470225620780-dba8ba36b745", 1000), caption: "A long connection is only dead time if you let it be." },
      { type: "list", items: ["Know the visa rules before you leave the airport", "Travel with only your carry-on so you can move fast", "Set two alarms and pad the return by an hour"] },
      { type: "paragraph", text: "Handled well, the layover stops being the worst part of the journey and becomes a small, unexpected chapter of it." },
    ],
  },
];

// Drafts + seed for a section, with drafts taking precedence on slug collisions.
function allInSection(section: BlogSection): BlogPost[] {
  const drafts = loadDrafts().filter((p) => p.section === section);
  const draftSlugs = new Set(drafts.map((p) => p.slug));
  const seed = SEED.filter((p) => p.section === section && !draftSlugs.has(p.slug));
  return [...drafts, ...seed];
}

/** All posts in a section (featured first; author drafts ahead of seed). */
export function getPosts(section: BlogSection): BlogPost[] {
  return allInSection(section).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

/** A single post by section + slug — a matching draft wins over the seed. */
export function getPost(section: BlogSection, slug: string): BlogPost | undefined {
  return allInSection(section).find((p) => p.slug === slug);
}

/** Section chrome (title + subtitle) — the only i18n bit; posts stay verbatim. */
export function getSectionMeta(section: BlogSection, t: TFunc) {
  return { title: t(`blog.sections.${section}.title`), subtitle: t(`blog.sections.${section}.subtitle`) };
}
