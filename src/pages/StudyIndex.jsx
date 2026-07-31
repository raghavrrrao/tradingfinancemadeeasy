import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Seo from "../components/Seo";
import { getCategoriesWithArticles } from "../data/categories";
import { getArticlesByCategory } from "../utils/articleHelpers";

export default function StudyIndex() {
  const categories = getCategoriesWithArticles();
  return (
    <div className="animate-fade-in">
      <Seo
        title="Study Material"
        description="Browse the currently published study material in the knowledge base."
      />
      <p className="font-mono text-[11px] uppercase tracking-widest text-brass mb-2">
        Study Material
      </p>
      <h1 className="font-display text-4xl text-ink mb-3">The full archive</h1>
      <p className="text-ink-soft leading-7 max-w-3xl mb-10">
        Pick a category from the sidebar, or jump straight into a topic below. Every
        article includes a table of contents, estimated reading time, and links to
        related material.
      </p>

      <div className="space-y-8">
        {categories.map((cat) => {
          const categoryArticles = getArticlesByCategory(cat.slug);

          return (
          <div key={cat.slug} className="border hairline rounded-lg p-5 bg-paper-raised">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-paper border hairline flex items-center justify-center text-brass">
                  <Icon name={cat.icon} className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-lg text-ink">{cat.title}</h2>
              </div>
              <span className="manifest-tag">{cat.code}</span>
            </div>
            <ul className="grid gap-2">
              {categoryArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      to={`/study-material/${cat.slug}/${article.slug}`}
                      className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-sm text-sm text-ink-soft hover:text-ink hover:bg-paper transition-colors focus-ring group"
                    >
                      {article.title}
                      <Icon name="arrow-right" className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          );
        })}
      </div>
    </div>
  );
}
