Heart "save to favorites" toggle for media tiles (Watch / Listen / Read). Presentational — the consumer owns the saved state.

```jsx
<div style={{ position: "relative" }}>
  <ShowcaseTile image={poster} title={title} height={270} />
  <FavoriteButton
    active={isFavorite(id)}
    onChange={() => toggle({ id, kind: "watch", title, image: poster })}
    label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
    style={{ position: "absolute", top: 8, insetInlineEnd: 8 }}
  />
</div>
```

- Active = the heart fills **bright-blue** (the system's one accent — status/save is never red/green). Inactive = white outline.
- Sits in a translucent dark **circle** (44px at the default 20px heart) so it reads over bright posters — circular is the sanctioned radius exception; flat, no shadow. Stops click propagation, so it can overlay a clickable tile without triggering the tile.
- Pass a state-dependent `label` for the aria-label/tooltip ("Add to favorites" / "Remove from favorites"). Wire `active`/`onChange` to your favorites store (e.g. a FavoritesProvider context).
