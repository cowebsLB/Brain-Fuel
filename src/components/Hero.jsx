export default function Hero() {
  return (
    <section className="hero" aria-labelledby="menu-heading">
      <div className="steam steam-1" aria-hidden="true" />
      <div className="steam steam-2" aria-hidden="true" />
      <h2 id="menu-heading" className="hero-title reveal" style={{ animationDelay: "80ms" }}>
        Menu
      </h2>
      <p className="hero-tagline reveal" style={{ animationDelay: "120ms" }}>
        Fuel your brain, one cup at a time.
      </p>
    </section>
  );
}
