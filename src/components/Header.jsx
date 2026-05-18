export default function Header({ activeSectionLabel }) {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.avif`;

  return (
    <header className="site-header reveal" style={{ animationDelay: "20ms" }}>
      <div className="container header-row">
        <div className="brand-lockup">
          <img src={logoSrc} alt="Brain Fuel logo" className="brand-logo" />
          <h1 className="brand-title">BRAIN FUEL</h1>
        </div>
        <span className="active-section-chip" aria-live="polite">
          {activeSectionLabel}
        </span>
      </div>
    </header>
  );
}
