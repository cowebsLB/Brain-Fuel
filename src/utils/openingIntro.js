const SESSION_KEY = "brain_fuel_intro_seen";

export function markOpeningIntroSeen() {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.setItem(SESSION_KEY, "1");
}

export function shouldShowOpeningIntro() {
  if (typeof window === "undefined") {
    return false;
  }

  const demoMode = new URLSearchParams(window.location.search).get("demo") === "1";
  if (demoMode) {
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
