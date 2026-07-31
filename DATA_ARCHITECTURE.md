# Data-Driven Architecture

This project is built entirely on a data-driven architecture. All content, navigation, and features are automatically generated from the source data files.

## Core Principle

**Add content only to the data files. Everything else updates automatically.**

### Adding a New Article

1. **Add topic to `src/data/categories.js`**
   ```js
   {
     slug: "incoterms",
     topics: [
       { slug: "new-topic", title: "New Article Title" },
       // ... existing topics
     ]
   }
   ```

2. **Add article to `src/data/articles.js`**
   ```js
   {
     slug: "new-topic",
     categorySlug: "incoterms",
     topicSlug: "new-topic",
     title: "New Article Title",
     author: "Research Desk",
     updated: "2026-07-12",
     readingTime: 5,
     summary: "One sentence summary",
     sections: [
       {
         heading: "Section Title",
         blocks: [
           { type: "paragraph", text: "..." },
           { type: "list", items: ["...", "..."] },
           { type: "note", title: "...", text: "..." },
         ]
       }
     ],
     relatedSlugs: [], // Leave empty; auto-populated
     references: []
   }
   ```

That's it. Everything else updates automatically:
- ✅ Sidebar navigation
- ✅ Category pages
- ✅ Search indexing
- ✅ Related articles
- ✅ Previous/Next navigation
- ✅ Homepage "Latest" section
- ✅ Breadcrumbs
- ✅ Table of contents

## Data Files

### `src/data/categories.js`

Defines the category and topic taxonomy. Topics are rendered in the order they appear.

```js
{
  slug: "incoterms",           // URL slug
  code: "INCO",                // Display code
  title: "Incoterms",          // Category name
  description: "...",          // Category description
  icon: "anchor",              // Icon name (from Icon.jsx)
  topics: [
    { slug: "exw-ex-works", title: "EXW – Ex Works" },
    { slug: "fob-explained", title: "FOB Explained" }
  ]
}
```

**Topic Order Determines Navigation**
The order of topics in a category determines Previous/Next article navigation and the sidebar menu order.

### `src/data/articles.js`

Contains the full article content and metadata.

```js
{
  slug: "article-slug",                    // Unique identifier, matches topic slug
  categorySlug: "category",                // Which category this belongs to
  topicSlug: "article-slug",               // Same as slug (for consistency)
  title: "Article Title",                  // Display title
  author: "Research Desk",                 // Author name (simple, no email/bio)
  updated: "2026-07-12",                   // Last update date (YYYY-MM-DD)
  readingTime: 5,                          // Estimated minutes to read (min 3)
  summary: "One sentence description",     // Metadata only, exempt from no-paraphrase rule
  sections: [
    {
      heading: "Section Title",
      blocks: [
        // See Block Types below
      ]
    }
  ],
  relatedSlugs: [],                        // Optional: explicit related article slugs
  references: [                            // Optional: external references
    { label: "Reference Title", href: "https://..." }
  ]
}
```

### Block Types

Articles are composed of reusable block types:

```js
// Paragraph
{ type: "paragraph", text: "Full paragraph text..." }

// List
{ type: "list", items: ["Item 1", "Item 2", "Item 3"] }

// Note (aside/callout)
{ type: "note", title: "Important", text: "Note text..." }

// Tip (practical guidance)
{ type: "tip", title: "Pro Tip", text: "Tip text..." }

// Table
{ 
  type: "table", 
  headers: ["Column 1", "Column 2"],
  rows: [
    ["Row 1 Col 1", "Row 1 Col 2"],
    ["Row 2 Col 1", "Row 2 Col 2"]
  ]
}
```

## Automatic Features

### 1. Navigation

**Sidebar** — Automatically generated from `categories.js`. Expands categories to show topics.

**Previous/Next** — Determined by topic order in `categories.js`, not arbitrary article ordering.

**Breadcrumbs** — Automatically generated for every page.

### 2. Search

**Full-text indexing** — Searches across:
- Article titles
- Summaries
- Category names
- Section headings
- Paragraph text
- List items
- Table content
- Reference labels

No manual search configuration required.

### 3. Related Articles

**Automatic generation** — Prioritizes:
1. Articles in the same category (by topic order)
2. Explicitly linked articles (via `relatedSlugs`)
3. Other recent articles

The `relatedSlugs` array is optional. If empty, related articles are generated automatically.

### 4. Homepage

**Latest articles** — Automatically displays the 3 most recently updated articles.

Sorted by the `updated` field in descending order.

### 5. Category Pages

**Article list** — Shows all articles in a category, in topic order.

### 6. Table of Contents

**Auto-generated** — For every article based on `sections` headings.

## Helper Utilities

All dynamic logic is centralized in utility functions:

### `src/utils/articleHelpers.js`

- `getAutoRelatedArticles(article, limit)` — Generate related articles
- `getPrevNextArticles(article)` — Get previous/next by topic order
- `searchArticles(query)` — Full-text search
- `getArticlesByCategory(categorySlug)` — Get articles in topic order
- `getLatestArticles(limit)` — Get most recently updated articles
- `getArticleBreadcrumbs(article)` — Get breadcrumb items
- `getTableOfContents(article)` — Extract section headings
- `getArticleSearchText(article)` — Extract all searchable text

### `src/utils/categoryHelpers.js`

- `getNavigationTree()` — Full navigation structure
- `getAllCategories()` — All categories
- `getCategoryWithCount(categorySlug)` — Category with article count
- `getNavigationTree()` — Navigation tree for sidebar

## OCR Cleanup Rules

**Allowed:**
- Fix OCR ligature issues (Ɵ → ti)
- Merge words broken by OCR line breaks
- Remove duplicate whitespace
- Remove repeated page headers/footers
- Remove page numbers

**Not allowed:**
- Rewriting sentences
- Correcting grammar
- Summarizing
- Simplifying
- Adding explanations
- Reordering information
- Removing genuine content

Source document wording must remain unchanged.

## File Structure

```
src/
├── data/
│   ├── categories.js       # Category & topic taxonomy
│   ├── articles.js         # Article content (automatically organized)
│   └── resources.js        # Downloadable documents
├── utils/
│   ├── articleHelpers.js   # Article operations
│   └── categoryHelpers.js  # Category operations
├── pages/
│   ├── Home.jsx            # Auto: latest articles
│   ├── ArticlePage.jsx     # Auto: prev/next, related, TOC
│   ├── CategoryPage.jsx    # Auto: article list in order
│   ├── Search.jsx          # Auto: full-text search
│   └── ...
├── components/
│   ├── Sidebar.jsx         # Auto: from categories.js
│   ├── ArticleCard.jsx
│   ├── RelatedArticles.jsx
│   └── ...
└── App.jsx                 # Routes (no hardcoded lists)
```

## Long-Term Vision

This architecture ensures:

✅ **Data-driven** — Content lives in JSON, not React code  
✅ **Maintainable** — Add content, not code  
✅ **Scalable** — Add 100 articles without changing a component  
✅ **Consistent** — All navigation and search work automatically  
✅ **Flexible** — Easy to reorganize categories or reorder topics  

The project can be migrated to a headless CMS or GraphQL API in the future without changing a single component, because all components depend only on the data utilities, not the data files themselves.
