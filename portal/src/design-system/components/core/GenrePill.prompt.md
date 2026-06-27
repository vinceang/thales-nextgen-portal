Rounded category filter chip — the one rounded shape in the system. For movie genres, news topics.

```jsx
<GenrePill active>All</GenrePill>
<GenrePill onClick={() => setGenre("action")}>Action</GenrePill>
```

- `active` = solid highlight-blue fill; inactive = hairline outline.
- Labels render UPPERCASE. Lay them in a horizontally-scrollable flex row with 12–16px gap.
