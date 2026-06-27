// Portal content data (white-label sample content).
// Imagery uses Unsplash; in production these come from the airline's CMS.
(function () {
  const img = (id, w = 800) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

  window.PORTAL_DATA = {
    flight: { origin: "LAX", destination: "MCO", duration: "3h 28m", progress: 0.42 },

    nav: ["Showcase", "Connect", "Watch", "Listen", "News", "Read", "Weather", "Shop"],

    // AccuWeather icon codes (see accuweather.com weather-icons). `code` resolves
    // to the colored SVG at assets/icons/weather/<code>.svg; `fb` is the line-icon
    // fallback shown only if that SVG fails to load.
    weather: {
      date: "Tue, Jul 4", city: "Orlando", code: 1, fb: "sun",
      temp: "79.5°", unit: "F", condition: "Sunny",

      // Landing hero = the passenger's destination city.
      hero: {
        city: "Melbourne", code: 14, fb: "cloud-rain", condition: "Partly Sunny Showers",
        tempC: "38.5°", tempF: "101.3°", img: "https://picsum.photos/seed/melbourne-wx/1600/900",
      },

      // City gallery shown on the Weather landing page.
      cities: [
        { name: "Melbourne",    code: 14, fb: "cloud-rain", cond: "Partly Sunny w/ Showers", c: "19.5° / 10.5°", f: "67.1° / 50.9°", img: "https://picsum.photos/seed/melbourne/500/700" },
        { name: "Delhi",        code: 2,  fb: "sun",         cond: "Mostly Sunny",            c: "34.0° / 27.5°", f: "93.2° / 81.5°", img: "https://picsum.photos/seed/delhi/500/700" },
        { name: "Shanghai",     code: 3,  fb: "cloud-sun",   cond: "Partly Sunny",            c: "29.0° / 23.0°", f: "84.2° / 73.4°", img: "https://picsum.photos/seed/shanghai/500/700" },
        { name: "Sao Paulo",    code: 4,  fb: "cloud-sun",   cond: "Intermittent Clouds",     c: "22.5° / 15.0°", f: "72.5° / 59.0°", img: "https://picsum.photos/seed/saopaulo/500/700" },
        { name: "Mexico City",  code: 5,  fb: "sun",         cond: "Hazy Sunshine",           c: "24.0° / 12.5°", f: "75.2° / 54.5°", img: "https://picsum.photos/seed/mexicocity/500/700" },
        { name: "Cairo",        code: 6,  fb: "cloud",       cond: "Mostly Cloudy",           c: "33.5° / 22.0°", f: "92.3° / 71.6°", img: "https://picsum.photos/seed/cairo/500/700" },
        { name: "Dhaka",        code: 7,  fb: "cloud",       cond: "Cloudy",                  c: "31.0° / 26.0°", f: "87.8° / 78.8°", img: "https://picsum.photos/seed/dhaka/500/700" },
        { name: "Mumbai",       code: 8,  fb: "cloud",       cond: "Dreary (Overcast)",       c: "30.0° / 26.5°", f: "86.0° / 79.7°", img: "https://picsum.photos/seed/mumbai/500/700" },
        { name: "Beijing",      code: 11, fb: "cloud",       cond: "Fog",                     c: "28.5° / 18.0°", f: "83.3° / 64.4°", img: "https://picsum.photos/seed/beijing/500/700" },
        { name: "Osaka",        code: 12, fb: "cloud-rain",  cond: "Showers",                 c: "26.0° / 21.5°", f: "78.8° / 70.7°", img: "https://picsum.photos/seed/osaka/500/700" },
        { name: "Karachi",      code: 13, fb: "cloud-rain",  cond: "Mostly Cloudy w/ Showers", c: "32.0° / 27.0°", f: "89.6° / 80.6°", img: "https://picsum.photos/seed/karachi/500/700" },
        { name: "Chongqing",    code: 14, fb: "cloud-rain",  cond: "Partly Sunny w/ Showers", c: "27.5° / 22.0°", f: "81.5° / 71.6°", img: "https://picsum.photos/seed/chongqing/500/700" },
        { name: "Buenos Aires", code: 15, fb: "cloud-rain",  cond: "T-Storms",                c: "16.0° / 9.0°",  f: "60.8° / 48.2°", img: "https://picsum.photos/seed/buenosaires/500/700" },
        { name: "Istanbul",     code: 16, fb: "cloud-rain",  cond: "Mostly Cloudy w/ T-Storms", c: "23.0° / 16.5°", f: "73.4° / 61.7°", img: "https://picsum.photos/seed/istanbul/500/700" },
        { name: "Kolkata",      code: 17, fb: "cloud-rain",  cond: "Partly Sunny w/ T-Storms", c: "33.0° / 27.5°", f: "91.4° / 81.5°", img: "https://picsum.photos/seed/kolkata/500/700" },
      ],

      forecast: [
        { day: "Tue, Jul 4", code: 1,  fb: "sun",       temp: "79.5° F", cond: "Sunny" },
        { day: "Wed, Jul 5", code: 6,  fb: "cloud",     temp: "74.5° F", cond: "Mostly Cloudy" },
        { day: "Thu, Jul 7", code: 3,  fb: "cloud-sun", temp: "80.1° F", cond: "Partly Sunny" },
        { day: "Fri, Jul 8", code: 12, fb: "cloud-rain", temp: "72° F",  cond: "Showers" },
        { day: "Sat, Jul 9", code: 7,  fb: "cloud",     temp: "73.5° F", cond: "Cloudy" },
      ],
      news: [
        { headline: "Severe storms rock Plains, Midwest with 5-inch hail and 95-mph winds", time: "11 minutes ago", img: img("1605727216801-e27ce1d0cc28", 200) },
        { headline: "Tropical rainstorm in Caribbean to impact Florida, may strengthen", time: "7 hours ago", img: img("1561553543-e4c7b608b98d", 200) },
        { headline: "Fall forecast: Warm autumn to fuel 'second summer' across the US", time: "2 days ago", img: img("1507783548227-544c3b8fc065", 200) },
      ],
    },

    showcase: {
      hero: { kicker: "Connect", title: "High Speed Internet for $9.99", cta: "View Plans",
              img: img("1556745757-8d76bdb6984b", 1100) },
      tiles: [
        { id: "young-sheldon", kicker: "Watch", title: "Young Sheldon", img: img("1522869635100-9f4c5e86aa37", 700) },
        { id: "squid", kicker: "Watch", title: "Squid Game", img: img("1626814026160-2237a95fc5a0", 700) },
        { id: "red-moon", kicker: "Listen", title: "Red Moon In Venus", img: img("1470225620780-dba8ba36b745", 700) },
        { id: "games", kicker: "Play", title: "Game Collection", img: img("1542751371-adc38448a05e", 700) },
        { id: "epcot", kicker: "Destination", title: "Orlando's Best: Epcot", big: true, img: img("1597466599360-3b9775841aec", 1100) },
        { id: "england", kicker: "Travel", title: "Explore England's Mountains", wide: true, img: img("1454496522488-7a8e488e8606", 1100) },
        { id: "duty-free", kicker: "Shop", title: "Duty-Free Collection", img: img("1596462502278-27bfdc403348", 700) },
        { id: "fall-guy", kicker: "Watch", title: "The Fall Guy", img: img("1489599849927-2ee91cede3ba", 700) },
        { id: "ebooks", kicker: "Read", title: "E-Book Collection", img: img("1481627834876-b7833e8f5570", 700) },
        { id: "dining", kicker: "Destination", title: "Top 10 Dining in Orlando", img: img("1414235077428-338989a2e8c0", 700) },
        { id: "billie", kicker: "Listen", title: "Billie Eilish", img: img("1493225457124-a3eb161ffa5f", 700) },
      ],
    },

    movies: {
      genres: ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Foreign", "Adventure", "Documentary"],
      hero: { title: "Deadpool & Wolverine", meta: "Rated R   Action, Comedy, Science Fiction",
              img: img("1518709268805-4e9042af9f23", 1100) },
      grid: [
        { title: "Deadpool & Wolverine", genre: "Action", img: img("1635805737707-575885ab0820", 500) },
        { title: "Kingdom of the Planet of the Apes", genre: "Sci-Fi", img: img("1500530855697-b586d89ba3ee", 500) },
        { title: "The Ministry of Ungentlemanly Warfare", genre: "Action", img: img("1547700055-b61cacebece9", 500) },
        { title: "The Garfield Movie", genre: "Comedy", img: img("1574375927938-d5a98e8ffe85", 500) },
        { title: "Furiosa: A Mad Max Saga", genre: "Action", img: img("1518562180175-34a163b1a9a6", 500) },
        { title: "My Spy: The Eternal City", genre: "Comedy", img: img("1502136969935-8d8eef54d77b", 500) },
        { title: "The Convert", genre: "Drama", img: img("1485846234645-a62644f84728", 500) },
        { title: "3 Days in Malay", genre: "Action", img: img("1542204165-65bf26472b9b", 500) },
        { title: "Out of Exile", genre: "Action", img: img("1536440136628-849c177e76a1", 500) },
        { title: "Godzilla x Kong: The New Empire", genre: "Sci-Fi", img: img("1478720568477-152d9b164e26", 500) },
        { title: "The Last Kumite", genre: "Action", img: img("1574267432553-4b4628081c31", 500) },
        { title: "A Quiet Place: Part II", genre: "Drama", img: img("1574169208507-84376144848b", 500) },
        { title: "Thor", genre: "Adventure", img: img("1608889175123-8ee362201f81", 500) },
        { title: "Alien: Romulus", genre: "Sci-Fi", img: img("1531306728370-e2ebd9d7bb99", 500) },
        { title: "The Inheritance", genre: "Drama", img: img("1518929458119-e5bf444c30f4", 500) },
      ],
    },

    news: {
      sources: ["ABC News", "BBC", "CBC", "The Guardian", "CBS News", "Reuters"],
      topics: ["All", "World", "Politics", "Business", "Technology", "Sports", "Entertainment"],
      lead: { headline: "Trinity Rodman's extra-time stunner sends USWNT to final four at Paris Olympics",
              time: "an hour ago", img: img("1551958219-acbc608c6377", 900) },
      items: [
        { headline: "Paris 2024 Olympics medal table", time: "6 minutes ago", img: img("1461896836934-ffe607ba8211", 200) },
        { headline: "Simone Biles wins gold in vault, Evenepoel doubles up in cycling road race", time: "8 minutes ago", img: img("1571019613454-1cb2f99b2d8b", 200) },
        { headline: "Charity removes promo video featuring Southport murder accused", time: "36 minutes ago", img: img("1495020689067-958852a7765e", 200) },
        { headline: "Jack Robinson forced to change board design before Olympic surfing finals", time: "39 minutes ago", img: img("1502680390469-be75c86b636f", 200) },
        { headline: "The way, the truth and the Olympic record: how God struck gold in Paris", time: "an hour ago", img: img("1431324155629-1a6deb1dec8d", 200) },
        { headline: "Is the dream of nuclear fusion dead? The reactor at the heart of a row", time: "an hour ago", img: img("1518770660439-4636190af475", 200) },
      ],
    },

    plansHeader: {
      title: "The Fastest Wi-Fi in the Sky",
      blurb: ["Please choose from the Wi-Fi plans below. We highly recommend the ", "High-Speed Streaming", " plan, which offers internet speeds of up to 300 Mbps."],
    },

    plans: [
      { name: "Messaging", price: "$2",
        features: ["Messaging", "E-mail"], cta: "Buy Now" },
      { name: "Browsing", price: "$4",
        features: ["Messaging", "E-mail", "Basic Browsing"], cta: "Buy Now" },
      { name: "High-Speed Streaming", price: "$6", recommended: true, badge: "Best Value!",
        features: ["Messaging", "E-mail", "Basic Browsing", "Streaming"], cta: "Buy Now" },
    ],

    payment: {
      methods: ["Credit Card", "Apple Pay", "Google Pay"],
      brands: ["AMEX", "DISCOVER", "VISA", "MasterCard", "PayPal"],
      countries: ["United States", "Canada", "United Kingdom", "Australia", "France", "Germany", "Japan"],
    },
  };
})();
