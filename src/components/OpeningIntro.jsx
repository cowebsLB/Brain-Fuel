import { useEffect, useState } from "react";
import { markOpeningIntroSeen } from "../utils/openingIntro";

const TOTAL_DURATION_MS = 2200;
const SPLIT_START_MS = 900;

export default function OpeningIntro({ onFinish }) {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.avif`;
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    const splitTimer = window.setTimeout(() => {
      setIsSplitting(true);
    }, SPLIT_START_MS);

    const timer = window.setTimeout(() => {
      markOpeningIntroSeen();
      onFinish();
    }, TOTAL_DURATION_MS);

    return () => {
      window.clearTimeout(splitTimer);
      window.clearTimeout(timer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    markOpeningIntroSeen();
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
          <img src={logoSrc} alt="" className="intro-logo intro-logo-center" />
        </div>

        <div className="intro-split-line">
          <span className="intro-split-segment intro-split-segment-left" />
          <span className="intro-split-segment intro-split-segment-right" />
        </div>

        <div className="intro-door intro-door-left">
          <img src={logoSrc} alt="" className="intro-door-logo intro-door-logo-left" />
        </div>
        <div className="intro-door intro-door-right">
          <img src={logoSrc} alt="" className="intro-door-logo intro-door-logo-right" />
        </div>
      </div>
    </div>
  );
}
