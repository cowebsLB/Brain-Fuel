const defaultPicks = [
  { name: "Spanish Latte", price: "$4", tag: "Popular" },
  { name: "Caramel Frappe", price: "$4.5", tag: "Chilled" },
  { name: "Tiramisu", price: "$4", tag: "Sweet" },
  { name: "Cappuccino", price: "$4", tag: "Classic" },
  { name: "Strawberry Milkshake", price: "$4", tag: "Refreshing" },
  { name: "Croissants", price: "$3", tag: "Snack" }
];

export default function TopPicks({ picks = defaultPicks }) {
  return (
    <section className="top-picks reveal" style={{ animationDelay: "200ms" }} aria-labelledby="top-picks-heading">
      <div className="menu-card-title-row">
        <h3 id="top-picks-heading">Top Picks</h3>
      </div>
      <ul className="menu-items">
        {picks.map((pick) => (
          <li key={pick.name} className="menu-item-row">
            <span>
              {pick.name}
              <small className="pick-tag">{pick.tag}</small>
            </span>
            <span className="price-tag">{pick.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
