// openlibrary-snapshot.mjs — build-time Open Library catalogue snapshot for the
// Read page.
//
// Mirrors the TMDB (Watch) and Deezer (Listen) snapshots. Open Library's API is
// fully open — NO key/token/auth, nothing in .env. Each row is one search that
// already returns the rich fields (pages, publisher, language, rating), plus a
// per-book /works fetch for the jacket synopsis. Covers are full-resolution book
// jackets from covers.openlibrary.org. Writes src/content/data/read.json
// (committed). The Read seam reads it and stays synchronous; when empty it falls
// back to the placeholder catalogue, so the app always builds with no network.
//
// Usage:
//   node scripts/openlibrary-snapshot.mjs               # refresh now (fails loudly)
//   node scripts/openlibrary-snapshot.mjs --if-stale    # refresh only if stale; fail-open
//   node scripts/openlibrary-snapshot.mjs --stage       # `git add` the result
//   flags: --max-age-hours=48
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PORTAL_ROOT = dirname(SCRIPT_DIR);
const OUT_FILE = join(PORTAL_ROOT, "src/content/data/read.json");
const OL = "https://openlibrary.org";
const COVERS = "https://covers.openlibrary.org/b/id";
// Open Library etiquette: identify the client (points at the public repo).
const UA = "thales-nextgen-portal-demo/1.0 (https://github.com/vinceang/thales-nextgen-portal)";

const args = process.argv.slice(2);
const IF_STALE = args.includes("--if-stale");
const STAGE = args.includes("--stage");
const maxAgeArg = args.find((a) => a.startsWith("--max-age-hours"));
const MAX_AGE_HOURS = maxAgeArg ? Number(maxAgeArg.split(/[=\s]/)[1] ?? args[args.indexOf(maxAgeArg) + 1]) : 48;

function bail(msg) {
  const softly = IF_STALE;
  console[softly ? "warn" : "error"](`[openlibrary-snapshot] ${msg}`);
  process.exit(softly ? 0 : 1);
}

// ── staleness guard ───────────────────────────────────────────────────────────
if (IF_STALE && existsSync(OUT_FILE)) {
  try {
    const prev = JSON.parse(readFileSync(OUT_FILE, "utf8"));
    if (prev.generatedAt) {
      const ageH = (Date.now() - new Date(prev.generatedAt).getTime()) / 36e5;
      if (ageH < MAX_AGE_HOURS) {
        console.log(`[openlibrary-snapshot] snapshot is fresh (${ageH.toFixed(1)}h < ${MAX_AGE_HOURS}h) — skipping.`);
        process.exit(0);
      }
    }
  } catch {
    /* unreadable — regenerate */
  }
}

// ── client with a gentle shared rate gate (Open Library asks callers to be polite) ─
const MIN_INTERVAL_MS = 110;
let nextSlot = 0;
async function throttle() {
  const now = Date.now();
  const wait = Math.max(0, nextSlot - now);
  nextSlot = Math.max(now, nextSlot) + MIN_INTERVAL_MS;
  if (wait) await new Promise((r) => setTimeout(r, wait));
}
async function api(path, tries = 4) {
  for (let attempt = 1; ; attempt++) {
    await throttle();
    try {
      const res = await fetch(`${OL}${path}`, { headers: { "User-Agent": UA, accept: "application/json" } });
      if (res.status === 429 && attempt < tries) {
        await new Promise((r) => setTimeout(r, 1500 * attempt));
        continue;
      }
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${path}`);
      return await res.json();
    } catch (e) {
      if (attempt < tries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
        continue;
      }
      throw e;
    }
  }
}

async function pool(items, size, fn) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  }
  return out;
}

// ── mapping helpers ───────────────────────────────────────────────────────────
const LANG = {
  eng: "English", spa: "Spanish", fre: "French", fra: "French", ger: "German", deu: "German",
  ita: "Italian", por: "Portuguese", dut: "Dutch", nld: "Dutch", jpn: "Japanese", chi: "Chinese",
  zho: "Chinese", rus: "Russian", pol: "Polish", swe: "Swedish", ara: "Arabic", kor: "Korean",
};
const langName = (code) => LANG[code] || (code ? code.toUpperCase() : "English");
// We query language:eng, but a doc's `language` array lists ALL editions' langs;
// prefer English when present so the detail modal doesn't show a stray edition.
const bookLang = (langs) => ((langs || []).includes("eng") ? "English" : langName(langs?.[0]));

// Deterministic 72–88 fallback score for books with no Open Library rating.
function fallbackScore(key) {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return 72 + (h % 17);
}

// Pick a clean, human genre from Open Library's noisy subject tags. Prefer a
// known genre word; else the first tidy subject; else the row's default.
const GENRE_HINTS = [
  "Fantasy", "Science Fiction", "Romance", "Thriller", "Mystery", "Historical Fiction",
  "Horror", "Biography", "Memoir", "Self-Help", "Business", "Economics", "Poetry",
  "Young Adult", "Adventure", "Crime", "Philosophy", "Psychology", "History",
  "Children's", "Nonfiction", "Fiction",
];
function cleanGenre(subjects, fallback) {
  const subs = subjects || [];
  const lc = subs.map((s) => s.toLowerCase());
  for (const g of GENRE_HINTS) {
    if (lc.some((s) => s.includes(g.toLowerCase()))) return g;
  }
  const nice = subs.find(
    (s) => s.length < 20 && !s.includes(":") && !/\d/.test(s) &&
      !/accessible|daisy|protected|bestseller|large type|ebook|fiction\b/i.test(s),
  );
  return nice ? nice.replace(/\b\w/g, (c) => c.toUpperCase()) : fallback || "Fiction";
}

// One Open Library search doc → a partial ReadBook (synopsis filled later).
function toBook(doc, rowGenre) {
  return {
    workKey: doc.key, // e.g. "/works/OL45804W" — used for the synopsis fetch
    id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown",
    cover: `${COVERS}/${doc.cover_i}-L.jpg`,
    year: doc.first_publish_year || 0,
    genre: rowGenre || cleanGenre(doc.subject, "Fiction"),
    pages: doc.number_of_pages_median || 0,
    publisher: doc.publisher?.[0] ?? "",
    language: bookLang(doc.language),
    score: doc.ratings_average ? Math.max(1, Math.min(100, Math.round(doc.ratings_average * 20))) : fallbackScore(doc.key),
    synopsis: "",
  };
}

const FIELDS = "key,title,author_name,first_publish_year,cover_i,number_of_pages_median,publisher,language,ratings_average,ratings_count,subject";
const search = (q, sort) =>
  `/search.json?q=${encodeURIComponent(q)}&sort=${sort}&limit=40&fields=${FIELDS}`;

// Rows map to the existing GenrePill keys (labels stay in the app via t()).
const ROWS = [
  { key: "newReleases", q: "language:eng first_publish_year:[2019 TO 2026]", sort: "readinglog", genre: null },
  { key: "bestsellers", q: "language:eng", sort: "readinglog", genre: null },
  { key: "fiction", q: "subject:fiction language:eng", sort: "rating", genre: "Fiction" },
  { key: "nonfiction", q: "subject:nonfiction language:eng", sort: "rating", genre: "Nonfiction" },
  { key: "mystery", q: "subject:mystery language:eng", sort: "rating", genre: "Mystery" },
  { key: "kids", q: "subject:juvenile_fiction language:eng", sort: "rating", genre: "Children's" },
];
const ROW_LIMIT = 12;

// Open Library descriptions are user-submitted and messy — strip source-citation
// tails, markdown, HTML, and the "pdf / free download" spam that litters them.
function cleanSynopsis(desc) {
  let s = typeof desc === "string" ? desc : desc?.value || "";
  s = s.split(/\r?\n-{3,}|\r?\n\[source|\(\[source|\r?\n?Contains?:/i)[0]; // citation tails
  s = s.replace(/\[([^\]]+)\]\((?:https?:)?[^)]+\)/g, "$1"); // markdown links → text
  s = s.replace(/<\/?[a-z][^>]*>/gi, ""); // html tags
  s = s.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1"); // md bold/italic
  s = s.replace(/\\+/g, " "); // stray backslashes
  s = s.replace(/\b(?:pdf|epub|mobi|free download|read online|download)\b/gi, "");
  s = s.replace(/\s+/g, " ").trim();
  // A dangling short fragment after the last sentence is usually a title echo — drop it.
  const lastStop = s.lastIndexOf(". ");
  if (lastStop > 80 && s.length - lastStop < 40 && !/[.!?]$/.test(s)) s = s.slice(0, lastStop + 1);
  return s.length > 600 ? s.slice(0, 597).replace(/\s+\S*$/, "") + "…" : s;
}

async function main() {
  // Each row: one search → filter to books with covers → take ROW_LIMIT.
  const rowKeys = {};
  const wanted = new Map(); // workKey → book
  for (const row of ROWS) {
    const data = await api(search(row.q, row.sort));
    const docs = (data.docs ?? [])
      .filter((d) => d.cover_i && d.title && d.author_name?.length)
      .filter((d) => (row.minYear ? (d.first_publish_year || 0) >= row.minYear : true));
    const picked = [];
    for (const d of docs) {
      if (picked.length >= ROW_LIMIT) break;
      const book = toBook(d, row.genre);
      if (!wanted.has(book.workKey)) wanted.set(book.workKey, book);
      picked.push(book.workKey);
    }
    rowKeys[row.key] = picked;
  }

  // Synopsis per unique work (Open Library work record's description).
  await pool([...wanted.values()], 6, async (book) => {
    try {
      const work = await api(`${book.workKey}.json`);
      book.synopsis = cleanSynopsis(work.description);
    } catch (e) {
      console.warn(`[openlibrary-snapshot] no synopsis for ${book.workKey}: ${e.message}`);
    }
    return book;
  });

  // Strip the internal workKey before writing.
  const finalize = (k) => {
    const { workKey, ...rest } = wanted.get(k);
    void workKey;
    return rest;
  };
  const rows = ROWS.map((row) => ({ key: row.key, items: rowKeys[row.key].map(finalize) })).filter((r) => r.items.length);

  // Hero = one pick each from bestsellers / fiction / mystery, for visual variety.
  const heroKeys = [];
  for (const key of ["bestsellers", "fiction", "mystery"]) {
    const pick = (rowKeys[key] ?? []).find((k) => !heroKeys.includes(k));
    if (pick) heroKeys.push(pick);
  }
  const slides = heroKeys.map((k) => {
    const b = wanted.get(k);
    return { id: `rh-${b.id}`, cover: b.cover, title: b.title, author: b.author };
  });

  const snapshot = { generatedAt: new Date().toISOString(), source: "Open Library", hero: { slides }, rows };
  writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`[openlibrary-snapshot] wrote ${rows.length} rows / ${wanted.size} unique books → ${OUT_FILE}`);

  if (STAGE) {
    try {
      execFileSync("git", ["add", OUT_FILE], { stdio: "ignore" });
      console.log("[openlibrary-snapshot] staged read.json");
    } catch {
      /* not fatal */
    }
  }
}

main().catch((e) => bail(`snapshot failed: ${e.message}`));
