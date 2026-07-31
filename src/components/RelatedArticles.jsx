import ArticleCard from "./ArticleCard";

export default function RelatedArticles({ articles }) {
  if (!articles?.length) return null;
  return (
    <div className="print-exclude">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/60 mb-3">
        Related Articles
      </p>
      <div className="space-y-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} compact />
        ))}
      </div>
    </div>
  );
}
