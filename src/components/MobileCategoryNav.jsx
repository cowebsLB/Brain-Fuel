export default function MobileCategoryNav({ sections, activeId }) {
  return (
    <nav className="mobile-nav" aria-label="Menu categories">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`category-tab ${activeId === section.id ? "active" : ""}`}
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}