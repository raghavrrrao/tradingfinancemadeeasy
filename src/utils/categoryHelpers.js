/**
 * Category Helper Functions
 * 
 * Centralized utilities for category operations and navigation
 */

import { findCategory, getCategoriesWithArticles } from "../data/categories";
import { getPublishedArticles } from "../data/articles";

const getArticlesByCategory = (categorySlug) =>
  getPublishedArticles().filter(article => article.categorySlug === categorySlug);

/**
 * Get breadcrumb items for category page
 * 
 * @param {string} categorySlug - Category slug
 * @returns {Array} Breadcrumb items
 */
export function getCategoryBreadcrumbs(categorySlug) {
  return [
    { label: "Study Material", to: "/study-material" },
    { label: findCategory(categorySlug)?.title || categorySlug },
  ];
}

/**
 * Get all categories with full metadata
 * 
 * @returns {Array} All categories
 */
export function getAllCategories() {
  return getCategoriesWithArticles();
}

/**
 * Get category with article count
 * 
 * @param {string} categorySlug - Category slug
 * @returns {Object|null} Category with article count
 */
export function getCategoryWithCount(categorySlug) {
  const category = findCategory(categorySlug);
  if (!category) return null;

  const articleCount = getArticlesByCategory(categorySlug).length;
  return {
    ...category,
    articleCount,
  };
}

/**
 * Get all categories with article counts
 * 
 * @returns {Array} Categories with article counts
 */
export function getAllCategoriesWithCounts() {
  return getCategoriesWithArticles().map(cat => ({
    ...cat,
    articleCount: getArticlesByCategory(cat.slug).length,
  }));
}

/**
 * Get navigation structure for sidebar
 * Groups all categories and their articles
 * 
 * @returns {Array} Navigation tree
 */
export function getNavigationTree() {
  return getCategoriesWithArticles().map(category => ({
    slug: category.slug,
    title: category.title,
    icon: category.icon,
    articles: getArticlesByCategory(category.slug).map(article => ({
      slug: article.slug,
      title: article.title,
      article,
    })),
  }));
}
