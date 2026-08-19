/**
 * Article Helper Functions
 * 
 * Centralized utilities for data-driven article operations:
 * - Automatic related articles generation
 * - Navigation (previous/next by article order)
 * - Full-text search indexing
 * - Article metadata and filtering
 */

import { findPublishedArticle, getPublishedArticles } from "../data/articles";
import { findCategory } from "../data/categories";

/**
 * Generate related articles automatically
 * Priority:
 * 1. Same category
 * 2. Articles already linked in relatedSlugs
 * 
 * @param {Object} article - Article object
 * @param {number} limit - Max number of related articles to return
 * @returns {Array} Related article objects
 */
export function getAutoRelatedArticles(article, limit = 3) {
  if (!article) return [];

  const related = new Set();
  
  // Priority 1: Explicit relatedSlugs
  (article.relatedSlugs || []).forEach(slug => {
    const a = findPublishedArticle(slug);
    if (a && a.slug !== article.slug && related.size < limit) {
      related.add(a);
    }
  });

  // Priority 2: Same category, different article
  if (related.size < limit) {
    const sameCategory = getPublishedArticles().filter(
      a => a.categorySlug === article.categorySlug && 
           a.slug !== article.slug &&
           !related.has(a)
    );
    sameCategory.slice(0, limit - related.size).forEach(a => related.add(a));
  }

  return Array.from(related);
}

/**
 * Get previous/next articles based on their order in articles.js
 * 
 * @param {Object} article - Current article
 * @returns {Object} { prev, next } article objects or null
 */
export function getPrevNextArticles(article) {
  if (!article) return { prev: null, next: null };

  const categoryArticles = getArticlesByCategory(article.categorySlug);
  const articleIndex = categoryArticles.findIndex(a => a.slug === article.slug);
  if (articleIndex === -1) return { prev: null, next: null };

  return {
    prev: articleIndex > 0 ? categoryArticles[articleIndex - 1] : null,
    next: articleIndex < categoryArticles.length - 1 ? categoryArticles[articleIndex + 1] : null,
  };
}

/**
 * Extract all searchable text from an article
 * Used for full-text indexing
 * 
 * @param {Object} article - Article object
 * @returns {string} Combined searchable text
 */
export function getArticleSearchText(article) {
  if (!article) return "";

  const parts = [
    article.title,
    article.summary,
    article.author,
    article.categorySlug,
  ];

  // Add section headings and all block text
  (article.sections || []).forEach(section => {
    parts.push(section.heading);
    (section.blocks || []).forEach(block => {
      if (block.text) parts.push(block.text);
      if (block.title) parts.push(block.title);
      if (block.items) parts.push(block.items.join(" "));
      if (block.headers) parts.push(block.headers.join(" "));
      if (block.rows) parts.push(block.rows.flat().join(" "));
    });
  });

  // Add references
  (article.references || []).forEach(ref => {
    parts.push(ref.label);
  });

  return parts.join(" ");
}

/**
 * Search articles with full-text indexing
 * Searches across titles, summaries, all section headings, paragraph text, etc.
 * 
 * @param {string} query - Search query (lowercased automatically)
 * @returns {Array} Matching article objects
 */
export function searchArticles(query) {
  if (!query) return [];

  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getPublishedArticles().filter(article => {
    const searchText = getArticleSearchText(article).toLowerCase();
    return searchText.includes(q);
  });
}

/**
 * Get all articles in a category, in the order defined by articles.js
 * 
 * @param {string} categorySlug - Category slug
 * @returns {Array} Ordered article objects
 */
export function getArticlesByCategory(categorySlug) {
  return getPublishedArticles().filter(article => article.categorySlug === categorySlug);
}

/**
 * Get latest articles by update date
 * 
 * @param {number} limit - Number of articles to return
 * @returns {Array} Recently updated articles
 */
export function getLatestArticles(limit = 10) {
  return [...getPublishedArticles()]
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .slice(0, limit);
}

/**
 * Get article by slug
 * 
 * @param {string} slug - Article slug
 * @returns {Object|null} Article object or null
 */
export function getArticle(slug) {
  return findPublishedArticle(slug);
}

/**
 * Get all articles
 * 
 * @returns {Array} All articles
 */
export function getAllArticles() {
  return getPublishedArticles();
}

/**
 * Get word count of an article
 * Used to calculate reading time
 * 
 * @param {Object} article - Article object
 * @returns {number} Approximate word count
 */
export function getArticleWordCount(article) {
  if (!article) return 0;

  let count = 0;
  (article.sections || []).forEach(section => {
    count += section.heading.split(/\s+/).length;
    (section.blocks || []).forEach(block => {
      if (block.text) count += block.text.split(/\s+/).length;
      if (block.title) count += block.title.split(/\s+/).length;
      if (block.items) count += block.items.join(" ").split(/\s+/).length;
      if (block.headers) count += block.headers.join(" ").split(/\s+/).length;
      if (block.rows) count += block.rows.flat().join(" ").split(/\s+/).length;
    });
  });

  return count;
}

/**
 * Calculate reading time
 * 
 * @param {Object} article - Article object
 * @param {number} wordsPerMinute - Assumption (default 200)
 * @returns {number} Reading time in minutes (minimum 3)
 */
export function calculateReadingTime(article, wordsPerMinute = 200) {
  const wordCount = getArticleWordCount(article);
  return Math.max(3, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Get table of contents from article sections
 * 
 * @param {Object} article - Article object
 * @returns {Array} Array of { heading, id } objects
 */
export function getTableOfContents(article) {
  if (!article || !article.sections) return [];

  return article.sections.map(section => ({
    heading: section.heading,
    id: section.heading
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-"),
  }));
}

/**
 * Breadcrumb items for article
 * 
 * @param {Object} article - Article object
 * @returns {Array} Breadcrumb items
 */
export function getArticleBreadcrumbs(article) {
  if (!article) return [];

  const category = findCategory(article.categorySlug);
  const categoryTitle = category?.title || article.categorySlug;

  return [
    { label: "Study Material", to: "/study-material" },
    { label: categoryTitle, to: `/study-material/${article.categorySlug}` },
    { label: article.title },
  ];
}
