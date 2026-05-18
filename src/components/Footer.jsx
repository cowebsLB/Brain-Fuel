import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTiktok } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const iconMap = {
  "Find us on Maps": FaMapMarkerAlt,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Call: FaPhoneAlt
};

export default function Footer({ ctas }) {
  const openingHours = [
    { day: "Mon-Sat", hours: "10 AM-10 PM" },
    { day: "Sunday", hours: "5-11 PM" }
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-card">
          <h2>BRAIN FUEL</h2>
          <p className="footer-subtitle">Visit, follow, or message us directly.</p>

          <div className="hours-list compact" aria-label="Opening hours">
            {openingHours.map((entry) => (
              <div key={entry.day} className="hours-row">
                <span className="hours-day">{entry.day}</span>
                <span className="hours-time">{entry.hours}</span>
              </div>
            ))}
          </div>

          <div className="footer-cta-row">
            {ctas
              .filter((cta) => cta.label !== "Chat on WhatsApp")
              .map((cta) => {
                const Icon = iconMap[cta.label];
                if (!Icon) {
                  return null;
                }

                const isPhone = cta.label === "Call";
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className="icon-cta-button"
                    aria-label={cta.label}
                    title={cta.label}
                    target={isPhone ? undefined : "_blank"}
                    rel={isPhone ? undefined : "noreferrer"}
                    onClick={() => trackEvent("cta_click", { channel: cta.label.toLowerCase(), location: "footer" })}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </footer>
  );
}