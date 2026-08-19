import { useParams, Navigate, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import TableOfContents from "../components/TableOfContents";
import ArticleBlocks from "../components/ArticleBlocks";
import RelatedArticles from "../components/RelatedArticles";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import { findCategory } from "../data/categories";
import { findPublishedArticle } from "../data/articles";
import {
  getPrevNextArticles,
  getAutoRelatedArticles,
} from "../utils/articleHelpers";
import { slugify } from "../utils/slugify";

export default function ArticlePage() {
  const { categorySlug, articleSlug } = useParams();
  const article = findPublishedArticle(articleSlug);
  const category = findCategory(categorySlug);

  if (!article || !category || article.categorySlug !== categorySlug) {
    return <Navigate to="/study-material" replace />;
  }

  // Get navigation based on article order from articles.js
  const { prev, next } = getPrevNextArticles(article);
  
  // Get related articles automatically
  const related = getAutoRelatedArticles(article, 3);

  const handlePrint = () => window.print();

  return (
    <div className="print-article-page animate-fade-in xl:grid xl:grid-cols-[minmax(0,980px)_250px] xl:gap-10 2xl:grid-cols-[minmax(0,1040px)_260px]">
      <Seo title={article.title} description={article.summary} />
      <article className="printable-article min-w-0">
        <Breadcrumb
          items={[
            { label: "Study Material", to: "/study-material" },
            { label: category.title, to: `/study-material/${category.slug}` },
            { label: article.title },
          ]}
        />

        <span className="manifest-tag mb-4 inline-block">{category.code}</span>
        <h1 className="mb-4 max-w-5xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          {article.title}
        </h1>

        <div className="article-meta mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b hairline pb-6 text-xs text-ink-soft">
          <span>By {article.author}</span>
          <span className="text-ink-soft/40">·</span>
          <span>Last updated {article.updated}</span>
          <span className="text-ink-soft/40">·</span>
          <span className="article-reading-time flex items-center gap-1">
            <Icon name="clock" className="w-3.5 h-3.5" />
            {article.readingTime} min read
          </span>
        </div>

        <div className="print-exclude mb-8 xl:hidden">
          <TableOfContents sections={article.sections} collapsible />
        </div>

        {article.sections.map((section, i) => (
          <section key={i} id={slugify(section.heading)} className="scroll-mt-28 mb-12">
            <h2 className="mb-5 font-display text-2xl text-ink sm:text-3xl">{section.heading}</h2>
            <ArticleBlocks blocks={section.blocks} />
          </section>
        ))}

        {article.references?.length > 0 && (
          <section className="mb-10 border-t hairline pt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/60 mb-3">
              References
            </p>
            <ul className="space-y-1.5">
              {article.references.map((ref, i) => (
                <li key={i} className="text-sm text-ink-soft">
                  {ref.href ? (
                    <a href={ref.href} target="_blank" rel="noopener noreferrer" className="hover:text-verdigris underline decoration-rule underline-offset-2">
                      {ref.label}
                    </a>
                  ) : (
                    ref.label
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Action buttons */}
        <div className="print-exclude flex flex-wrap gap-3 py-6 border-y hairline mb-10 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 text-sm font-medium border hairline px-4 py-2 rounded-sm text-ink hover:border-verdigris hover:text-verdigris transition-colors focus-ring"
          >
            <Icon name="print" className="w-4 h-4" />
            Print Article
          </button>
          <Link
            to={`/study-material/${category.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors ml-auto focus-ring"
          >
            <Icon name="arrow-left" className="w-4 h-4" />
            Back to {category.title}
          </Link>
        </div>

        {/* Prev / Next */}
        <div className="print-exclude grid sm:grid-cols-2 gap-4 mb-10">
          {prev ? (
            <Link
              to={`/study-material/${category.slug}/${prev.slug}`}
              className="border hairline rounded-md p-4 hover:border-verdigris/60 transition-colors group focus-ring"
            >
              <p className="text-xs text-ink-soft flex items-center gap-1 mb-1">
                <Icon name="arrow-left" className="w-3.5 h-3.5" />
                Previous
              </p>
              <p className="font-display text-ink group-hover:text-verdigris transition-colors">{prev.title}</p>
            </Link>
          ) : <div />}
          {next && (
            <Link
              to={`/study-material/${category.slug}/${next.slug}`}
              className="border hairline rounded-md p-4 text-right hover:border-verdigris/60 transition-colors group focus-ring"
            >
              <p className="text-xs text-ink-soft flex items-center justify-end gap-1 mb-1">
                Next
                <Icon name="arrow-right" className="w-3.5 h-3.5" />
              </p>
              <p className="font-display text-ink group-hover:text-verdigris transition-colors">{next.title}</p>
            </Link>
          )}
        </div>

        <RelatedArticles articles={related} />
      </article>

      {/* Right sidebar: TOC */}
      <aside className="hidden xl:block print:hidden">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <TableOfContents sections={article.sections} />
        </div>
      </aside>
    </div>
  );
}
