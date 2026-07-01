// English — the reference dictionary. `Dict = typeof en` is the contract every
// other locale must satisfy (see fr.ts / es.ts), so a missing or misspelled key
// fails at compile time. Add new UI copy here first, then mirror it in fr/es.
//
// Note: no `as const` on purpose — we want value types widened to `string` so
// translations are free to differ; the OBJECT SHAPE is what's enforced.
export const en = {
  nav: {
    showcase: "Showcase",
    connect: "Connect",
    watch: "Watch",
    listen: "Listen",
    read: "Read",
    news: "News",
    weather: "Weather",
    account: "Account",
  },
  common: {
    searchPlaceholder: "Search movies, music, destinations…",
    language: "Language",
  },
  // Tile kickers / section labels, keyed by category.
  categories: {
    watch: "Watch",
    listen: "Listen",
    play: "Play",
    destination: "Destination",
    travel: "Travel",
    shop: "Shop",
    read: "Read",
    connect: "Connect",
  },
  showcase: {
    hero: {
      title: "High-Speed Wi-Fi for the Whole Flight",
      cta: "View Plans",
    },
    // Tile titles keyed by tile id. Proper nouns stay verbatim across locales.
    tiles: {
      "young-sheldon": "Young Sheldon",
      billie: "Billie Eilish",
      squid: "Squid Game",
      "red-moon": "Red Moon In Venus",
      games: "Arcade Classics",
      dining: "Top 10 Dining",
      epcot: "Orlando's Best: Epcot",
      england: "Explore England",
      "duty-free": "Duty-Free Picks",
      "fall-guy": "The Fall Guy",
      ebooks: "Bestselling eBooks",
    },
    weather: {
      date: "Tue, Jul 4",
      city: "Orlando",
      condition: "Partly Sunny",
      linkLabel: "5-Day Forecast",
    },
  },
  connect: {
    crumbShowcase: "Showcase",
    crumbConnect: "Connect",
    header: {
      title: "The Fastest Wi-Fi in the Sky",
      // `emphasize` must remain a verbatim substring of `text` in every locale.
      text:
        "Please choose from the Wi-Fi plans below. We highly recommend the " +
        "High-Speed Streaming plan, which offers internet speeds of up to 300 Mbps.",
      emphasize: "High-Speed Streaming",
    },
    plans: {
      messaging: "Messaging",
      browsing: "Browsing",
      streaming: "High-Speed Streaming",
    },
    features: {
      messaging: "Messaging",
      email: "E-mail",
      browsing: "Basic Browsing",
      streaming: "Streaming",
    },
    badge: "Best Value!",
    buyNow: "Buy Now",
    connectedTitle: "You're connected — {plan}",
    connectedBody: "Your {plan} pass is active for the rest of this flight, across reconnections.",
    modalTitle: "Confirm Purchase",
    cancel: "Cancel",
    payNow: "Pay Now",
    // `{plan}` is interpolated and then bolded (it's a substring of the result).
    modalBody: "You're buying the {plan} pass ({price}) for this flight.",
    modalFine: "Charged once to the card ending 4242. Access stays active until landing, across reconnections.",
    toastTitle: "Payment confirmed",
    toastBody: "Your {plan} pass is active. Enjoy the flight.",
  },
  account: {
    tabs: {
      profile: "Profile",
      favorites: "Favorites",
      connectivity: "Connectivity",
      billing: "Billing",
    },
    profile: {
      title: "Profile",
      subtitle: "Shown to crew for personalized service",
      fullName: "Full name",
      fullNamePlaceholder: "Your name",
      country: "Billing country",
      countryPlaceholder: "Select country…",
      dob: "Date of birth",
      dobPlaceholder: "Select date",
      loyalty: "Loyalty number",
      loyaltyPlaceholder: "TN-000000",
      notes: "Travel notes",
      notesPlaceholder: "Dietary needs, accessibility, requests…",
    },
    countries: {
      us: "United States",
      ca: "Canada",
      uk: "United Kingdom",
      au: "Australia",
    },
    preferences: {
      title: "Preferences",
      autoReconnect: "Auto-reconnect on signal drop",
      captions: "Show captions by default",
      units: "Temperature units",
      fahrenheit: "Fahrenheit",
      celsius: "Celsius",
      emailUpdates: "E-mail me trip updates and offers",
    },
    cancel: "Cancel",
    save: "Save Changes",
    savedTitle: "Settings saved",
    savedBody: "Your preferences have been updated.",
    comingSoon: "This section isn't configured yet.",
    demoNote: "Demo prototype — your settings and favorites are saved on this device only.",
  },
  favorites: {
    add: "Add to favorites",
    remove: "Remove from favorites",
    empty: "No saved titles yet.",
  },
  watch: {
    featured: "Featured",
    play: "Play",
    all: "All",
    rows: {
      trending: "Trending Now",
      newReleases: "New Releases",
      action: "Action",
      comedy: "Comedy",
      scifi: "Sci-Fi",
      drama: "Drama",
      documentary: "Documentaries",
    },
  },
  listen: {
    play: "Play",
    all: "All",
    rows: {
      newReleases: "New Releases",
      topCharts: "Top Charts",
      pop: "Pop",
      hiphop: "Hip-Hop",
      rock: "Rock",
      chill: "Chill",
    },
  },
  read: {
    readNow: "Read Now",
    all: "All",
    rows: {
      newReleases: "New Releases",
      bestsellers: "Bestsellers",
      fiction: "Fiction",
      nonfiction: "Nonfiction",
      mystery: "Mystery",
      kids: "Kids",
    },
  },
  news: {
    categories: {
      all: "All",
      world: "World",
      politics: "Politics",
      business: "Business",
      technology: "Technology",
      sports: "Sports",
      entertainment: "Entertainment",
      health: "Health",
    },
  },
  footer: {
    terms: "Terms of Service",
    privacy: "Privacy",
    legal: "Legal",
    contact: "Contact",
    copyright: "© {year} Thales Group. All rights reserved.",
  },
};

export type Dict = typeof en;
