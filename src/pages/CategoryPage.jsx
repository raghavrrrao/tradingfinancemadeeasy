import { useParams, Navigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import ArticleCard from "../components/ArticleCard";
import { findCategory } from "../data/categories";
import { getArticlesByCategory } from "../utils/articleHelpers";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = findCategory(categorySlug);

  if (!category) return <Navigate to="/study-material" replace />;

  // Get articles in article-data order
  const categoryArticles = getArticlesByCategory(categorySlug);

  return (
    <div className="animate-fade-in">
      <Seo title={category.title} description={category.description} />
      <Breadcrumb
        items={[
          { label: "Study Material", to: "/study-material" },
          { label: category.title },
        ]}
      />

      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border hairline bg-paper-raised text-brass">
          <Icon name={category.icon} className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <span className="manifest-tag">{category.code}</span>
      </div>
      <div className="mb-9 flex flex-col gap-3 border-b hairline pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-3 font-display text-4xl text-ink">{category.title}</h1>
          <p className="max-w-3xl leading-7 text-ink-soft">{category.description}</p>
        </div>
        <div className="rounded-md border hairline bg-paper-raised px-3 py-2 text-sm text-ink-soft">
          <span className="font-medium text-ink">{categoryArticles.length}</span> articles
        </div>
      </div>

      <div className="grid gap-3">
        {categoryArticles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>

      {categoryArticles.length === 0 && (
        <p className="text-ink-soft text-sm">Articles for this category are being compiled.</p>
      )}
    </div>
  );
}
