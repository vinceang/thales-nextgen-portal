Small sharp status or count label.

```jsx
<Badge tone="accent">NEW</Badge>
<Badge tone="neutral">4K</Badge>
<Badge tone="outline">RATED R</Badge>
<Badge tone="accent">3</Badge>            {/* count */}
<Badge dot tone="accent" />               {/* status dot */}
```

- Tones differ by **fill, not colour family** — `neutral` (surface), `accent` (blue), `outline` (hairline). The system has one hue: do **not** add red/green/amber. Convey error/success through an icon + label (see Alert/Toast), not badge colour.
- Uppercase Montserrat 700, sharp corners (`--radius-control`). `dot` gives a bare 8px indicator (the only rounded form). Keep to 1–2 words / a small count.
