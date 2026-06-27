// NewsScreen — source logos, topic tabs, lead story + headline list.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { NewsItem, GenrePill } = DS;

  function NewsScreen({ data }) {
    const n = data.news;
    const [topic, setTopic] = React.useState("All");

    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        {/* Source row */}
        <div style={{ display: "flex", gap: 28, justifyContent: "center", alignItems: "center", flexWrap: "wrap", padding: "8px 0 22px", borderBottom: "1px solid var(--color-border)" }}>
          {n.sources.map((s) => (
            <span key={s} style={{ fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>{s}</span>
          ))}
        </div>

        {/* Topic tabs */}
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "22px 0", scrollbarWidth: "none" }}>
          {n.topics.map((t) => (
            <GenrePill key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</GenrePill>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "start" }} className="news-cols">
          <NewsItem lead image={n.lead.img} headline={n.lead.headline} timestamp={n.lead.time} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {n.items.map((it, i) => (
              <React.Fragment key={i}>
                <NewsItem image={it.img} headline={it.headline} timestamp={it.time} />
                {i < n.items.length - 1 && <div style={{ height: 1, background: "var(--color-border)", margin: "16px 0" }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  window.NewsScreen = NewsScreen;
})();
