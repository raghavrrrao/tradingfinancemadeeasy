import { Link } from "react-router-dom";
import Icon from "./Icon";
import { findCategory } from "../data/categories";

export default function ArticleCard({ article, compact = false }) {
  const category = findCategory(article.categorySlug);
  return (
    <Link
      to={`/study-material/${article.categorySlug}/${article.slug}`}
      className={`group block rounded-md border hairline bg-paper-raised hover:border-verdigris/60 hover:bg-paper transition-all duration-200 focus-ring ${
        compact ? "p-3.5" : "p-4"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
          {category?.code}
        </span>
        <span className="text-ink-soft/40">/</span>
        <span className="flex items-center gap-1 text-xs text-ink-soft">
          <Icon name="clock" className="h-3.5 w-3.5" />
          {article.readingTime} min read
        </span>
      </div>
      <h3 className={`mb-1.5 text-ink transition-colors group-hover:text-verdigris ${compact ? "text-sm font-medium" : "text-base font-semibold"}`}>
        {article.title}
      </h3>
      {!compact && (
        <p className="line-clamp-2 text-sm leading-6 text-ink-soft">{article.summary}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft/70">
        <span>Updated {article.updated}</span>
        <span>{article.author}</span>
      </div>
    </Link>
  );
}
