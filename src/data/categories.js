import { getPublishedArticles } from "./articles";

// Optional category metadata. Published categories are derived from articles.js.
export const categoryMetadata = [
  {
    slug: "incoterms",
    code: "INCO",
    title: "Incoterms",
    description:
      "The ICC's standard trade terms defining buyer and seller obligations for delivery, risk, and cost.",
    icon: "anchor",
  },
  {
    slug: "ucp-600",
    title: "UCP 600",
  },
];

const titleFromSlug = (slug) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.toUpperCase() === word ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const codeFromTitle = (title) =>
  title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();

const buildCategory = (slug) => {
  const metadata = categoryMetadata.find((category) => category.slug === slug);
  const title = metadata?.title || titleFromSlug(slug);
  const categoryArticles = getPublishedArticles().filter((article) => article.categorySlug === slug);

  return {
    slug,
    code: metadata?.code || codeFromTitle(title),
    title,
    description: metadata?.description || `Study material and reference notes for ${title}.`,
    icon: metadata?.icon || "book",
    articleCount: categoryArticles.length,
    articles: categoryArticles,
  };
};

// Display order for categories; unlisted categories follow in articles.js order.
const categoryOrder = ["incoterms", "documentary-credits", "ucp-600"];

const categoryRank = (slug) => {
  const index = categoryOrder.indexOf(slug);
  return index === -1 ? categoryOrder.length : index;
};

export const getCategoriesWithArticles = () => {
  const slugs = [...new Set(getPublishedArticles().map((article) => article.categorySlug).filter(Boolean))];
  return slugs.sort((a, b) => categoryRank(a) - categoryRank(b)).map(buildCategory);
};

export const categories = getCategoriesWithArticles();

export const findCategory = (slug) =>
  getCategoriesWithArticles().find((category) => category.slug === slug) || null;
