import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { findCategory, getCategoriesWithArticles } from "../data/categories";
import { getArticleSearchText } from "../utils/articleHelpers";
import { getPublishedArticles } from "../data/articles";

const normalize = (value) => value.toLowerCase();

function getSnippet(article, query) {
  const q = normalize(query);
  const section = article.sections?.find((s) => normalize(s.heading).includes(q));
  if (section) return section.heading;

  const paragraph = article.sections
    ?.flatMap((s) => s.blocks || [])
    .find((block) => normalize(block.text || block.items?.join(" ") || "").includes(q));

  if (paragraph?.text) return paragraph.text.slice(0, 96);
  if (paragraph?.items) return paragraph.items[0]?.slice(0, 96);
  return article.summary;
}

export default function DocsSearch({
  autoFocus = false,
  className = "",
  inputClassName = "",
  onNavigate,
  large = false,
}) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    const articles = getPublishedArticles();
    const categories = getCategoriesWithArticles();

    const articleResults = articles
      .filter((article) => normalize(getArticleSearchText(article)).includes(q))
      .map((article) => ({
        type: "article",
        slug: article.slug,
        title: article.title,
        eyebrow: findCategory(article.categorySlug)?.title || article.categorySlug,
        detail: getSnippet(article, q),
        to: `/study-material/${article.categorySlug}/${article.slug}`,
      }));

    const categoryResults = categories
      .filter((category) => normalize(`${category.title} ${category.description} ${category.code}`).includes(q))
      .map((category) => ({
        type: "category",
        slug: category.slug,
        title: category.title,
        eyebrow: `${category.articleCount} Articles`,
        detail: category.description,
        to: `/study-material/${category.slug}`,
      }));

    return [...articleResults, ...categoryResults].slice(0, 8);
  }, [query]);

  const showDropdown = open && query.trim().length > 0;

  const goToResult = (result) => {
    if (!result) return;
    navigate(result.to);
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    onNavigate?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!showDropdown || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      goToResult(results[activeIndex]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Icon
        name="search"
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60 ${large ? "w-5 h-5" : "w-4 h-4"}`}
      />
      <input
        ref={inputRef}
        autoFocus={autoFocus}
        type="search"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search docs..."
        aria-label="Search documentation"
        aria-expanded={showDropdown}
        aria-controls="docs-search-results"
        className={`w-full bg-paper border hairline rounded-md pl-10 pr-3 text-sm text-ink placeholder:text-ink-soft/50 focus-ring focus:border-verdigris ${
          large ? "py-3.5 text-base" : "py-2"
        } ${inputClassName}`}
      />

      {showDropdown && (
        <div
          id="docs-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-[80] mt-2 overflow-hidden rounded-md border hairline bg-paper-raised shadow-xl shadow-ink/10 animate-pop"
        >
          {results.length === 0 ? (
            <div className="px-4 py-5 text-sm text-ink-soft">No matching articles.</div>
          ) : (
            <ul className="max-h-[min(70vh,420px)] overflow-y-auto py-1">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.slug}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={activeIndex === index}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => goToResult(result)}
                    className={`w-full px-4 py-3 text-left transition-colors focus-ring ${
                      activeIndex === index ? "bg-verdigris/8" : "hover:bg-paper"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{result.title}</p>
                        <p className="mt-0.5 text-xs font-mono uppercase tracking-wide text-brass">
                          {result.eyebrow}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-ink-soft">{result.detail}</p>
                      </div>
                      <Icon name="arrow-right" className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-soft" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
