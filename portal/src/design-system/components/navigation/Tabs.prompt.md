Switch between peer views in one surface (News topics, account sections, Watch/Listen).

```jsx
<Tabs value={tab} onChange={setTab}
  tabs={[{value:'world',label:'World'},{value:'business',label:'Business'},{value:'tech',label:'Tech'}]} />
```

- Montserrat labels on a hairline baseline; the active tab is bright-blue with a 2px highlight-blue underline. Scrolls horizontally when it overflows (phone).
- Use for in-page section switching. For UPPERCASE genre/topic *filtering* of a list use the rounded `GenrePill` row instead; for top-level app destinations use `NavBar` / `NavigationMenu`.
- Flows along the inline axis, so it mirrors under RTL with no change.
