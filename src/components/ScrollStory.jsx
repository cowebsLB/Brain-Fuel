import { useEffect, useRef } from "react";

function getSceneProgress(element) {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const travel = rect.height - vh;
  if (travel <= 0) {
    return rect.top <= 0 ? 1 : 0;
  }
  const raw = -rect.top / travel;
  return Math.max(0, Math.min(1, raw));
}

export default function ScrollStory({ sections, whatsappHref, activeSection }) {
  const safeSections = Array.isArray(sections) ? sections : [];
  const rootRef = useRef(null);
  const introFrameRef = useRef(null);
  const hottiesFrameRef = useRef(null);
  const introSequenceFramesRef = useRef([]);
  const hottiesSequenceFramesRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const frameCount = isMobile ? 24 : 48;
    const width = isMobile ? 960 : 1280;
    const height = isMobile ? 540 : 720;
    const quality = isMobile ? 0.76 : 0.86;
    const introImage = new Image();
    introImage.src = `${import.meta.env.BASE_URL}assets/intro-cinematic-bg.png`;
    const hotImage = new Image();
    hotImage.src = `${import.meta.env.BASE_URL}assets/separator-hotties.png`;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const drawIntroFrame = (progress) => {
      context.clearRect(0, 0, width, height);

      if (introImage.complete) {
        context.globalAlpha = 0.96;
        context.drawImage(introImage, 0, 0, width, height);
      } else {
        const g = context.createLinearGradient(0, 0, width, height);
        g.addColorStop(0, "#24170f");
        g.addColorStop(0.55, "#120b08");
        g.addColorStop(1, "#0e0907");
        context.fillStyle = g;
        context.fillRect(0, 0, width, height);
      }

      const glow = context.createRadialGradient(
        width * (0.24 + progress * 0.22),
        height * (0.44 - progress * 0.08),
        30,
        width * 0.45,
        height * 0.42,
        420
      );
      glow.addColorStop(0, "rgba(255,182,146,0.55)");
      glow.addColorStop(1, "rgba(255,182,146,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const ringCount = 5;
      for (let i = 0; i < ringCount; i += 1) {
        const base = 80 + i * 65 + progress * 52;
        context.strokeStyle = `rgba(255, 182, 146, ${0.15 - i * 0.02})`;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(width * 0.78, height * 0.34, base, 0, Math.PI * 2);
        context.stroke();
      }

      const sweepX = width * (-0.18 + progress * 1.25);
      const sweep = context.createLinearGradient(sweepX - 220, 0, sweepX + 220, 0);
      sweep.addColorStop(0, "rgba(255,182,146,0)");
      sweep.addColorStop(0.5, "rgba(255,182,146,0.23)");
      sweep.addColorStop(1, "rgba(255,182,146,0)");
      context.fillStyle = sweep;
      context.fillRect(0, 0, width, height);

      const steamColumns = 4;
      for (let i = 0; i < steamColumns; i += 1) {
        const baseX = width * (0.2 + i * 0.18);
        const drift = Math.sin((progress * Math.PI * 2) + i * 0.8) * 26;
        const alpha = 0.12 + i * 0.02;
        context.strokeStyle = `rgba(255, 220, 200, ${alpha})`;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(baseX + drift, height * 0.9);
        context.bezierCurveTo(
          baseX - 30 + drift,
          height * 0.72,
          baseX + 28 - drift,
          height * 0.52,
          baseX + drift,
          height * 0.24
        );
        context.stroke();
      }
    };
    const drawHottiesFrame = (progress) => {
      context.clearRect(0, 0, width, height);

      if (hotImage.complete) {
        context.globalAlpha = 0.92;
        context.drawImage(hotImage, 0, 0, width, height);
      } else {
        context.fillStyle = "#1d120d";
        context.fillRect(0, 0, width, height);
      }

      const shade = context.createLinearGradient(0, 0, 0, height);
      shade.addColorStop(0, "rgba(14,9,7,0.35)");
      shade.addColorStop(1, "rgba(14,9,7,0.8)");
      context.fillStyle = shade;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(width * 0.5, height * 0.52);
      context.scale(1 + progress * 0.08, 1 + progress * 0.08);
      context.rotate((progress - 0.5) * 0.06);
      context.translate(-width * 0.5, -height * 0.52);
      context.strokeStyle = `rgba(255, 182, 146, ${0.28 + progress * 0.22})`;
      context.lineWidth = 2;
      context.strokeRect(width * 0.08, height * 0.15, width * 0.84, height * 0.7);
      context.restore();
    };

    const buildFrames = (drawFn, targetRef, imageRef) => {
      const built = [];
      for (let i = 0; i < frameCount; i += 1) {
        const progress = i / (frameCount - 1);
        drawFn(progress);
        built.push(canvas.toDataURL("image/webp", quality));
      }
      targetRef.current = built;
      if (imageRef.current && built.length > 0) {
        imageRef.current.src = built[0];
      }
    };
    const maybeBuild = () => {
      buildFrames(drawIntroFrame, introSequenceFramesRef, introFrameRef);
      if (hotImage.complete) {
        buildFrames(drawHottiesFrame, hottiesSequenceFramesRef, hottiesFrameRef);
      }
    };
    hotImage.onload = maybeBuild;
    introImage.onload = maybeBuild;
    if (hotImage.complete || introImage.complete) {
      maybeBuild();
    } else {
      buildFrames(drawIntroFrame, introSequenceFramesRef, introFrameRef);
    }

    return () => {
      introSequenceFramesRef.current = [];
      hottiesSequenceFramesRef.current = [];
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !rootRef.current) {
      return undefined;
    }

    const scenes = Array.from(rootRef.current.querySelectorAll("[data-scene]"));
    let frame = null;
    const root = rootRef.current;

    const tick = () => {
      frame = null;
      const doc = document.documentElement;
      const travel = Math.max(1, doc.scrollHeight - window.innerHeight);
      const globalProgress = window.scrollY / travel;
      root.style.setProperty("--story-global-progress", String(Math.max(0, Math.min(1, globalProgress))));

      scenes.forEach((scene) => {
        const progress = getSceneProgress(scene);
        const visualProgress = Math.max(0, Math.min(1, (progress - 0.06) / 0.52));
        scene.style.setProperty("--scene-progress", progress.toFixed(4));
        scene.style.setProperty("--scene-visual-progress", visualProgress.toFixed(4));
        const sceneId = scene.dataset.sectionId || "";
        const sequenceLength = sceneId === "intro" ? introSequenceFramesRef.current.length : hottiesSequenceFramesRef.current.length;
        const frameIndex =
          sequenceLength > 0 ? Math.round(visualProgress * (sequenceLength - 1)) : Math.round(visualProgress * 47);
        scene.setAttribute("data-frame", String(frameIndex));
        scene.setAttribute("data-phase", frameIndex < 6 ? "early" : frameIndex < 18 ? "mid" : "late");

        if (sceneId === "intro" && introFrameRef.current) {
          const sequence = introSequenceFramesRef.current;
          if (sequence.length > 0) {
            introFrameRef.current.src = sequence[Math.min(frameIndex, sequence.length - 1)];
          }
        }

        if (sceneId === "hotties" && hottiesFrameRef.current) {
          const sequence = hottiesSequenceFramesRef.current;
          if (sequence.length > 0) {
            hottiesFrameRef.current.src = sequence[Math.min(frameIndex, sequence.length - 1)];
          }
        }
      });
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return undefined;
    }

    const root = rootRef.current;
    let raf = null;
    let targetX = 0.5;
    let targetY = 0.35;
    let currentX = 0.5;
    let currentY = 0.35;

    const animate = () => {
      raf = null;
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      root.style.setProperty("--pointer-x", currentX.toFixed(4));
      root.style.setProperty("--pointer-y", currentY.toFixed(4));
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    const onMove = (event) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetX = Math.max(0, Math.min(1, event.clientX / w));
      targetY = Math.max(0, Math.min(1, event.clientY / h));
      if (!raf) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <div className="story-root" ref={rootRef}>
      <div className="story-cinematic-layer" aria-hidden="true" />
      <div className="story-ambient-orb story-ambient-orb-a" aria-hidden="true" />
      <div className="story-ambient-orb story-ambient-orb-b" aria-hidden="true" />

      <aside className="story-progress" aria-label="Story progress">
        <a
          href="#intro"
          className={`story-progress-dot ${activeSection === "intro" ? "is-active" : ""}`}
          aria-label="Intro"
          title="Intro"
          aria-current={activeSection === "intro" ? "step" : undefined}
        />
        {safeSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`story-progress-dot ${activeSection === section.id ? "is-active" : ""}`}
            aria-label={section.title}
            title={section.title}
            aria-current={activeSection === section.id ? "step" : undefined}
          />
        ))}
      </aside>

      <section id="intro" className="story-scene story-scene-intro" data-scene data-section-id="intro">
        <img className="story-sequence-frame" ref={introFrameRef} alt="" aria-hidden="true" />
        <div className="story-sticky">
          <p className="story-kicker">Brain Fuel Coffee Shop</p>
          <h2 className="story-title story-line-a">Coffee That Keeps You Moving</h2>
          <p className="story-copy story-line-b">Specialty coffee, desserts, and quick pickup in Mar Roukoz, Dekwaneh.</p>
          {whatsappHref ? (
            <a href={whatsappHref} className="story-cta story-line-c" target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          ) : (
            <span className="story-cta story-cta-muted story-line-c" aria-hidden="true">
              WhatsApp unavailable
            </span>
          )}
          <span className="story-scroll-cue" aria-hidden="true">
            Scroll to explore
          </span>
        </div>
      </section>

      {safeSections.length === 0 ? (
        <section className="story-scene story-scene-menu story-scene-empty" data-scene data-section-id="menu-empty">
          <div className="story-bg story-bg-fallback" aria-hidden="true" />
          <div className="story-sticky">
            <p className="story-kicker">Menu Update</p>
            <h3 className="story-title">Menu is being refreshed</h3>
            <p className="story-copy">Please check back shortly for the latest items and pricing.</p>
          </div>
        </section>
      ) : null}

      {safeSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="story-scene story-scene-menu"
          data-scene
          data-section-id={section.id}
        >
          {section.id === "hotties" ? (
            <img className="story-sequence-frame story-sequence-frame-menu" ref={hottiesFrameRef} alt="" aria-hidden="true" />
          ) : section.separatorImage?.avif || section.separatorImage?.webp || section.separatorImage?.png ? (
            <div
              className="story-bg"
              style={{
                backgroundImage: `image-set(url("${section.separatorImage.avif}") type("image/avif"), url("${section.separatorImage.webp}") type("image/webp"), url("${section.separatorImage.png}") type("image/png"))`
              }}
              aria-hidden="true"
            />
          ) : (
            <div className="story-bg story-bg-fallback" aria-hidden="true" />
          )}
          <div className="story-sticky">
            <p className="story-kicker story-line-a">{section.separatorLabel || "Signature Selection"}</p>
            <h3 className="story-title story-line-b">{section.title}</h3>
            <ul className="story-menu-list">
              {(Array.isArray(section.items) && section.items.length > 0 ? section.items : [["Menu updates coming soon", ""]]).map(
                ([name, price], itemIndex) => (
                <li key={name} className="story-menu-item story-line-c" style={{ "--item-index": itemIndex }}>
                  <span>{name}</span>
                  <span className="price-tag">{price}</span>
                </li>
                )
              )}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
