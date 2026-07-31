import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-soft">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevron-right" className="w-3 h-3 text-ink-soft/50" />}
            {item.to ? (
              <Link to={item.to} className="hover:text-verdigris transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
