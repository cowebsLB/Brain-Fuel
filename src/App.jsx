import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./components/Header";
import MobileOrderBar from "./components/MobileOrderBar";
import Footer from "./components/Footer";
import ScrollStory from "./components/ScrollStory";
import OpeningIntro from "./components/OpeningIntro";
import { callToActions, menuSections } from "./data/menuData";
import { shouldShowOpeningIntro } from "./utils/openingIntro";
import { trackEvent } from "./utils/analytics";

function useActiveSection(sections) {
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && sections.some((section) => section.id === hashId)) {
        return hashId;
      }
    }
    return "intro";
  });

  useEffect(() => {
    const sceneIds = ["intro", ...sections.map((section) => section.id)];
    const scenes = sceneIds
      .map((id) => ({ id, node: document.querySelector(`[data-section-id="${id}"]`) }))
      .filter((entry) => entry.node);

    if (scenes.length === 0) {
      return undefined;
    }

    let frame = null;
    const updateActive = () => {
      frame = null;
      const viewportCenter = (window.innerHeight || 1) * 0.45;
      let closestId = scenes[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      scenes.forEach(({ id, node }) => {
        const rect = node.getBoundingClientRect();
        const sceneCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sceneCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });

      setActive(closestId);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [sections]);

  return active;
}

export default function App() {
  const sections = useMemo(() => menuSections.filter((section) => section?.id && section?.title), []);
  const activeSection = useActiveSection(sections);
  const activeSectionLabel = activeSection === "intro" ? "Intro" : sections.find((section) => section.id === activeSection)?.title ?? "Story";
  const whatsappCta = callToActions.find((cta) => cta.label === "Chat on WhatsApp");
  const whatsappHref = useMemo(() => {
    if (!whatsappCta) {
      return "";
    }
    const starterMessage = "Hi, I'd like to order:";
    const separator = whatsappCta.href.includes("?") ? "&" : "?";
    return `${whatsappCta.href}${separator}text=${encodeURIComponent(starterMessage)}`;
  }, [whatsappCta]);
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
        <ScrollStory sections={sections} whatsappHref={whatsappHref} activeSection={activeSection} />
      </main>
      {whatsappCta ? (
        <a
          href={whatsappHref}
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
      <MobileOrderBar href={whatsappHref} />
    </>
  );
}
