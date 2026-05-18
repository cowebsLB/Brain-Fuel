export function trackEvent(eventName, payload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
    return;
  }

  if (window.plausible) {
    window.plausible(eventName, { props: payload });
    return;
  }

  if (window.fathom && typeof window.fathom.trackEvent === "function") {
    window.fathom.trackEvent(eventName, payload);
  }
}