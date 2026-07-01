The News page's **featured story** — a large image beside a date, a Playfair headline, and a relative timestamp. Two columns on desktop/tablet; stacks (image on top) on phone.

```jsx
<NewsHero
  image={lead.image}
  date="Aug 3, 2024"
  title="Trinity Rodman's extra-time stunner sends USWNT to final four"
  timeAgo="an hour ago"
  onClick={() => open(lead)}
/>
```

- The headline is the Playfair **display** face (this is a hero); date + timestamp are muted Montserrat.
- For an editorial promo with the headline **over** a full-bleed image use `HeroBanner`; use `NewsHero` when the image and headline sit side-by-side on the page surface.
