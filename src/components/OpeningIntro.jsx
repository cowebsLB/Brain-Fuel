import { useEffect, useState } from "react";

const SESSION_KEY = "brain_fuel_intro_seen";
const TOTAL_DURATION_MS = 3000;
const SPLIT_START_MS = 1350;

export default function OpeningIntro({ onFinish }) {
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    const splitTimer = window.setTimeout(() => {
      setIsSplitting(true);
    }, SPLIT_START_MS);

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      onFinish();
    }, TOTAL_DURATION_MS);

    return () => {
      window.clearTimeout(splitTimer);
      window.clearTimeout(timer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    onFinish();
  };

  return (
    <div
      className={`opening-intro ${isSplitting ? "is-splitting" : ""}`}
      role="dialog"
      aria-label="Opening animation"
      aria-modal="true"
    >
      <button type="button" className="intro-skip" onClick={handleSkip}>
        Skip
      </button>

      <div className="intro-stage" aria-hidden="true">
        <div className="intro-logo-spin">
          <img src="/assets/logo.avif" alt="" className="intro-logo intro-logo-center" />
        </div>

        <div className="intro-split-line">
          <span className="intro-split-segment intro-split-segment-left" />
          <span className="intro-split-segment intro-split-segment-right" />
        </div>

        <div className="intro-door intro-door-left">
          <img src="/assets/logo.avif" alt="" className="intro-door-logo intro-door-logo-left" />
        </div>
        <div className="intro-door intro-door-right">
          <img src="/assets/logo.avif" alt="" className="intro-door-logo intro-door-logo-right" />
        </div>
      </div>
    </div>
  );
}

export function shouldShowOpeningIntro() {
  if (typeof window === "undefined") {
    return false;
  }

  const forceIntro = new URLSearchParams(window.location.search).get("intro") === "1";
  if (forceIntro) {
    return true;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  return sessionStorage.getItem(SESSION_KEY) !== "1";
}
