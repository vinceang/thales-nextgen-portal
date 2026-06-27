// MoviesScreen — hero carousel, genre pill filter, poster grid.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { GenrePill, CarouselDots, TileGrid } = DS;

  function MoviesScreen({ data }) {
    const m = data.movies;
    const [genre, setGenre] = React.useState("All");
    const [slide, setSlide] = React.useState(0);
    const grid = genre === "All" ? m.grid : m.grid.filter((x) => x.genre === genre);

    return (
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: 16 }}>
        {/* Hero */}
        <div style={{ position: "relative", height: 460, overflow: "hidden", background: "var(--color-surface-2)" }}>
          <img src={m.hero.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "var(--scrim-full)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 28, textAlign: "center" }}>
            <h1 style={{ fontFamily: "var(--font-tile)", fontWeight: 600, fontSize: 52, letterSpacing: "-0.03em", margin: 0, color: "#fff" }}>
              {m.hero.title}
            </h1>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginTop: 8, letterSpacing: "0.02em" }}>
              {m.hero.meta}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
              <CarouselDots count={6} active={slide} onSelect={setSlide} />
            </div>
          </div>
        </div>

        {/* Genre filter */}
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "22px 0", scrollbarWidth: "none" }}>
          {m.genres.map((g) => (
            <GenrePill key={g} active={genre === g} onClick={() => setGenre(g)}>{g}</GenrePill>
          ))}
        </div>

        {/* Poster grid */}
        <TileGrid columns={5} tablet={3} phone={2} gap={16}>
          {grid.map((p, i) => (
            <div key={i} style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", aspectRatio: "2 / 3", overflow: "hidden", background: "var(--color-surface-2)" }}>
                <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s var(--ease-smooth)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginTop: 10, lineHeight: 1.3 }}>{p.title}</div>
            </div>
          ))}
        </TileGrid>
      </div>
    );
  }

  window.MoviesScreen = MoviesScreen;
})();
