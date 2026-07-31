import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Icon from "./Icon";
import { getCategoriesWithArticles } from "../data/categories";
import { getArticlesByCategory } from "../utils/articleHelpers";

export default function Sidebar({ onNavigate }) {
  const { categorySlug } = useParams();
  const categories = getCategoriesWithArticles();
  const [expanded, setExpanded] = useState(() =>
    new Set(categorySlug ? [categorySlug] : categories[0] ? [categories[0].slug] : [])
  );

  const toggle = (slug) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <nav aria-label="Study material categories" className="rounded-lg border hairline bg-paper-raised p-3 text-sm shadow-sm shadow-ink/5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
      <p className="mb-3 px-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft/60">
        Knowledge Base
      </p>
      <ul className="space-y-1">
        {categories.map((cat) => {
          const isExpanded = expanded.has(cat.slug);
          const categoryArticles = getArticlesByCategory(cat.slug);
          return (
            <li key={cat.slug}>
              <button
                onClick={() => toggle(cat.slug)}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left hover:bg-paper-raised focus-ring"
                aria-expanded={isExpanded}
              >
                <span className="flex items-center gap-2 font-medium text-ink">
                  <Icon name={cat.icon} className="h-4 w-4 text-brass" strokeWidth={1.5} />
                  {cat.title}
                  <span className="text-ink-soft font-normal">({categoryArticles.length})</span>
                </span>
                <Icon
                  name="chevron-right"
                  className={`h-3.5 w-3.5 text-ink-soft transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                />
              </button>
              {isExpanded && (
                <ul className="ml-4 mb-2 mt-1 max-h-[520px] space-y-0.5 overflow-hidden border-l hairline pl-3 transition-all duration-200">
                  {categoryArticles.map((article) => (
                    <li key={article.slug}>
                      <NavLink
                        to={`/study-material/${cat.slug}/${article.slug}`}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          `block rounded-md px-2 py-1.5 transition-colors focus-ring ${
                            isActive
                              ? "bg-verdigris/8 font-medium text-verdigris"
                              : "text-ink-soft hover:text-ink"
                          }`
                        }
                      >
                        {article.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
