export default function MobileOrderBar({ href }) {
  if (!href) {
    return null;
  }

  return (
    <a href={href} className="mobile-order-bar" target="_blank" rel="noreferrer">
      Order on WhatsApp
    </a>
  );
}
