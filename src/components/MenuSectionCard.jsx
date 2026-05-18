import { FaIceCream, FaMugHot } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { LuCupSoda } from "react-icons/lu";

const sectionIconMap = {
  coffee: FaMugHot,
  cold: FaIceCream,
  dessert: GiCakeSlice,
  tea: LuCupSoda
};

export default function MenuSectionCard({ section, index }) {
  const SectionIcon = sectionIconMap[section.icon] ?? FaMugHot;

  return (
    <section id={section.id} className="menu-card reveal" style={{ animationDelay: `${220 + index * 80}ms` }}>
      <div className="menu-card-title-row">
        <span className="menu-card-icon" aria-hidden="true">
          <SectionIcon />
        </span>
        <h3>{section.title}</h3>
      </div>
      <ul className="menu-items">
        {section.items.map(([name, price]) => (
          <li key={name} className="menu-item-row">
            <span>{name}</span>
            <span className="price-tag">{price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
