import { useEffect, useRef } from "react";

export default function ParallaxSeparator({ image, label }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return undefined;
    }

    let frame = null;
    const update = () => {
      frame = null;
      if (!rootRef.current) {
        return;
      }
      const rect = rootRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const offset = (clamped - 0.5) * 60;
      rootRef.current.style.backgroundPosition = `center calc(50% + ${offset.toFixed(2)}px)`;
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
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

  return (
    <div
      className="parallax-section"
      ref={rootRef}
      role="presentation"
      aria-hidden="true"
      style={{
        backgroundImage:
          `image-set(url("${image.avif}") type("image/avif"), url("${image.webp}") type("image/webp"), url("${image.png}") type("image/png"))`
      }}
    >
      <div className="parallax-overlay" />
      <p className="parallax-label">{label}</p>
    </div>
  );
}
