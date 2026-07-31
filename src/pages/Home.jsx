import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import Seo from "../components/Seo";
import ArticleCard from "../components/ArticleCard";
import { getCategoriesWithArticles } from "../data/categories";
import { getPublishedArticles } from "../data/articles";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );

const latestFirst = (articles) => [...articles].sort((a, b) => b.updated.localeCompare(a.updated));

const features = [
  ["layers", "Structured documentation", "Clear article hierarchy for focused reference."],
  ["compass", "Easy navigation", "Browse the published collection by category."],
  ["search", "Searchable knowledge base", "Find relevant material without leaving the portal."],
  ["book", "Optimized for study", "A calm reading environment with useful article context."],
];

export default function Home() {
  const categories = getCategoriesWithArticles();
  const articles = getPublishedArticles();
  const latestArticles = latestFirst(articles).slice(0, 6);
  const primaryCategory = categories[0];
  const lastUpdated = latestArticles[0]?.updated;

  return (
    <div>
      <Seo title="Home" description="Professional reference library for Incoterms and international trade documentation." />

      <section className="grain border-b hairline">
        <div className="docs-container grid gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:py-24">
          <div>
            <span className="manifest-tag mb-6 inline-block">Knowledge Portal</span>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.06] text-ink sm:text-5xl md:text-6xl">
              Trade <span className="text-verdigris">Knowledge Portal</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Professional reference library for Incoterms and international trade documentation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {primaryCategory && <Link to={`/study-material/${primaryCategory.slug}`} className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 font-medium text-paper transition-colors hover:bg-verdigris focus-ring">Browse Articles <Icon name="arrow-right" className="h-4 w-4" /></Link>}
              <Link to="/search" className="inline-flex items-center gap-2 rounded-sm border hairline bg-paper-raised px-5 py-3 font-medium text-ink transition-colors hover:border-verdigris hover:text-verdigris focus-ring"><Icon name="search" className="h-4 w-4" /> Search Documentation</Link>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border hairline bg-rule shadow-sm">
            <div className="bg-paper-raised p-4 sm:p-5"><dt className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Articles</dt><dd className="mt-2 font-display text-2xl text-ink">{articles.length}</dd></div>
            <div className="bg-paper-raised p-4 sm:p-5"><dt className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Categories</dt><dd className="mt-2 font-display text-2xl text-ink">{categories.length}</dd></div>
            <div className="bg-paper-raised p-4 sm:p-5"><dt className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Last updated</dt><dd className="mt-2 text-sm font-medium leading-5 text-ink">{lastUpdated ? formatDate(lastUpdated) : "—"}</dd></div>
          </dl>
        </div>
      </section>

      <section className="docs-container px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-brass">Portal overview</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Documentation designed for dependable reference.</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">The Trade Knowledge Portal is a structured documentation platform designed to simplify the study of Incoterms and international trade documentation. Articles are organized for quick navigation, professional reference, and academic learning.</p>
        </div>
      </section>

      <section className="border-y hairline bg-paper-raised">
        <div className="docs-container px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-[11px] uppercase tracking-widest text-brass">Recently updated</p><h2 className="mt-2 font-display text-3xl text-ink">Featured articles</h2></div>{primaryCategory && <Link to={`/study-material/${primaryCategory.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-verdigris hover:text-ink focus-ring">View all articles <Icon name="arrow-right" className="h-4 w-4" /></Link>}</div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latestArticles.map((article, index) => <motion.div key={article.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.35, delay: index * 0.04 }}><ArticleCard article={article} /></motion.div>)}</div>
        </div>
      </section>

      <section className="docs-container px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-brass">Built for clarity</p><h2 className="mt-2 font-display text-3xl text-ink">Why this portal</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(([icon, title, text]) => <div key={title} className="rounded-md border hairline bg-paper-raised p-5 transition duration-200 hover:-translate-y-1 hover:border-verdigris/60 hover:shadow-md"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-brass"><Icon name={icon} className="h-5 w-5" /></div><h3 className="mt-5 font-display text-lg text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p></div>)}</div>
      </section>

      <section className="border-t hairline bg-ink text-paper"><div className="docs-container grid gap-8 px-4 py-14 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-paper/15 bg-verdigris font-display text-2xl" aria-label="Anup Parikh profile mark">AP</div><div><p className="font-mono text-[11px] uppercase tracking-widest text-brass-soft">About the author</p><h2 className="mt-3 font-display text-3xl">Anup Parikh</h2><p className="mt-2 font-medium text-brass-soft">Trade Finance &amp; Foreign Exchange Professional</p><p className="mt-3 max-w-2xl leading-relaxed text-paper/75">An experienced industry professional whose published research forms the basis of this documentation portal.</p></div><Link to="/about" className="inline-flex w-fit items-center gap-2 rounded-sm border border-paper/30 px-5 py-3 font-medium transition-colors hover:border-brass-soft hover:text-brass-soft focus-ring">Learn more <Icon name="arrow-right" className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
