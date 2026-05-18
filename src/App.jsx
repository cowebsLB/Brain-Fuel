import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSectionCard from "./components/MenuSectionCard";
import MobileCategoryNav from "./components/MobileCategoryNav";
import Footer from "./components/Footer";
import ParallaxSeparator from "./components/ParallaxSeparator";
import OpeningIntro, { shouldShowOpeningIntro } from "./components/OpeningIntro";
import { callToActions, menuSections } from "./data/menuData";
import { trackEvent } from "./utils/analytics";

function useActiveSection(sections) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers = [];
    sections.forEach((section) => {
      const node = document.querySelector(`[data-section-id="${section.id}"]`);
      if (!node) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(section.id);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-18% 0px -55% 0px" }
      );
      observer.observe(node);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return active;
}

export default function App() {
  const sections = useMemo(() => menuSections, []);
  const activeSection = useActiveSection(sections);
  const activeSectionLabel = sections.find((section) => section.id === activeSection)?.title ?? "Menu";
  const whatsappCta = callToActions.find((cta) => cta.label === "Chat on WhatsApp");
  const [showIntro, setShowIntro] = useState(() => shouldShowOpeningIntro());

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <>
      {showIntro ? <OpeningIntro onFinish={() => setShowIntro(false)} /> : null}
      <Header activeSectionLabel={activeSectionLabel} />
      <main>
        <div className="container main-content">
          <Hero />
          {sections.map((section, index) => (
            <div key={section.id} className="menu-block" data-section-id={section.id}>
              <ParallaxSeparator image={section.separatorImage} label={section.separatorLabel} />
              <MenuSectionCard section={section} index={index} />
            </div>
          ))}
        </div>
      </main>
      {whatsappCta ? (
        <a
          href={whatsappCta.href}
          className="whatsapp-fab"
          aria-label="Chat on WhatsApp"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("cta_click", { channel: "whatsapp", location: "floating" })}
        >
          <FaWhatsapp aria-hidden="true" />
        </a>
      ) : null}
      <Footer ctas={callToActions} />
      <MobileCategoryNav sections={sections} activeId={activeSection} />
    </>
  );
}
