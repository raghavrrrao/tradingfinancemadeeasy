import { Link } from "react-router-dom";
import Icon from "./Icon";
import { getArticlesByCategory } from "../utils/articleHelpers";

export default function CategoryCard({ category }) {
  const articleCount = getArticlesByCategory(category.slug).length;

  return (
    <Link
      to={`/study-material/${category.slug}`}
      className="group relative flex flex-col bg-paper-raised border hairline rounded-md p-5 perforated hover:border-verdigris/60 hover:bg-paper transition-all duration-200 focus-ring"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-md bg-paper border hairline flex items-center justify-center text-brass group-hover:border-brass transition-colors">
          <Icon name={category.icon} className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <span className="manifest-tag">{category.code}</span>
      </div>

      <h3 className="text-lg font-semibold text-ink mb-2">{category.title}</h3>
      <p className="text-sm text-ink-soft leading-6 mb-5 flex-1">{category.description}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-soft/70 font-mono text-xs">
          {articleCount} {articleCount === 1 ? "article" : "articles"}
        </span>
        <span className="inline-flex items-center gap-1 text-verdigris font-medium group-hover:gap-2 transition-all">
          View
          <Icon name="arrow-right" className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
