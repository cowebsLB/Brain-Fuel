export default function Hero({ whatsappHref }) {
  return (
    <section className="hero" aria-labelledby="menu-heading">
      <div className="steam steam-1" aria-hidden="true" />
      <div className="steam steam-2" aria-hidden="true" />
      <h2 id="menu-heading" className="hero-title reveal" style={{ animationDelay: "80ms" }}>
        Menu
      </h2>
      <p className="hero-tagline reveal" style={{ animationDelay: "120ms" }}>
        Specialty coffee, desserts, and quick pickup.
      </p>
      <p className="hero-meta reveal" style={{ animationDelay: "160ms" }}>
        Mar Roukoz, Dekwaneh. Open daily.
      </p>
      {whatsappHref ? (
        <a
          href={whatsappHref}
          className="hero-cta reveal"
          style={{ animationDelay: "200ms" }}
          target="_blank"
          rel="noreferrer"
        >
          Order on WhatsApp
        </a>
      ) : null}
    </section>
  );
}
