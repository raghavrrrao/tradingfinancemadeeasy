# Quick Start Guide: Data-Driven Architecture

## The Golden Rule

**Everything comes from data. Add content to the data files. Everything else updates automatically.**

---

## Adding a New Article (5 Minutes)

### Step 1: Add Topic to Categories

Edit `src/data/categories.js`:

```js
{
  slug: "incoterms",
  topics: [
    { slug: "incoterms-overview", title: "Incoterms 2020: An Overview" },
    { slug: "exw-ex-works", title: "EXW – Ex Works (Named Place of Delivery)" },
    { slug: "exw-vs-fob", title: "EXW vs FOB: Choosing the Right Term" },
    { slug: "my-new-topic", title: "My New Article Title" },  // ← ADD HERE
    { slug: "cif-explained", title: "CIF Explained: Cost, Insurance & Freight" },
  ],
}
```

**Order matters.** The order in this list determines sidebar and Previous/Next navigation.

### Step 2: Add Article to Articles

Edit `src/data/articles.js`:

```js
{
  slug: "my-new-topic",                          // Matches topic slug
  categorySlug: "incoterms",                     // Which category
  topicSlug: "my-new-topic",                     // Same as slug
  title: "My New Article Title",
  author: "Research Desk",
  updated: "2026-07-12",                         // Today's date
  readingTime: 5,                                // Minutes (estimate: words / 200)
  summary: "Brief one-sentence summary.",        // Metadata only
  sections: [
    {
      heading: "First Section",
      blocks: [
        { type: "paragraph", text: "..." },
        { type: "paragraph", text: "..." },
      ]
    },
    {
      heading: "Another Section",
      blocks: [
        { type: "list", items: ["Item 1", "Item 2"] },
      ]
    }
  ],
  relatedSlugs: [],                              // Leave empty, auto-generated
  references: [],                                // Optional external links
}
```

### Step 3: Done ✅

All of these **automatically update**:
- ✅ Sidebar navigation
- ✅ Category pages
- ✅ Search indexing
- ✅ Related articles
- ✅ Previous/Next navigation
- ✅ Homepage (if recent)
- ✅ Breadcrumbs

**No component changes needed.**

---

## Article Structure

### Sections

Articles are divided into sections. You can have any number:

```js
sections: [
  { heading: "Introduction", blocks: [...] },
  { heading: "Definition", blocks: [...] },
  { heading: "How It Works", blocks: [...] },
  { heading: "Examples", blocks: [...] },
  { heading: "Common Issues", blocks: [...] },
  // Add as many as needed
]
```

### Block Types

Each section contains blocks. Common types:

```js
// Paragraph text
{ type: "paragraph", text: "Full paragraph text goes here." }

// Bullet list
{ type: "list", items: ["Item 1", "Item 2", "Item 3"] }

// Important note (blue callout)
{ type: "note", title: "Important", text: "Note text here." }

// Practical tip (yellow callout)
{ type: "tip", title: "Pro Tip", text: "Tip text here." }

// Table
{
  type: "table",
  headers: ["Column 1", "Column 2", "Column 3"],
  rows: [
    ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
    ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"]
  ]
}
```

---

## Important Rules

### Content Wording

**Do NOT change the source wording when importing content:**

✅ **Allowed:**
- Fix OCR ligature issues (Ɵ → ti, Ō → O)
- Merge words broken across lines
- Remove duplicate whitespace
- Remove page numbers
- Remove repeated headers/footers

❌ **NOT Allowed:**
- Rewriting sentences
- Grammar corrections
- Paraphrasing
- Summarizing
- Simplifying
- Adding explanations
- Reordering information

### Article Metadata

Keep author metadata simple:

```js
author: "Research Desk",           // Just the name, no email/bio
updated: "2026-07-12",             // YYYY-MM-DD format
```

This is a knowledge base, not a blog.

### Related Articles

Leave `relatedSlugs` empty:

```js
relatedSlugs: [],  // ← Auto-generated based on category
```

The system automatically finds related articles by:
1. Same category (first priority)
2. Recent articles
3. User-defined links (if any)

---

## File Structure

```
src/
├── data/
│   ├── categories.js              ← ADD TOPICS HERE
│   ├── articles.js                ← ADD ARTICLES HERE
│   └── resources.js               (not relevant)
├── utils/
│   ├── articleHelpers.js          (auto-generated navigation, search, etc.)
│   └── categoryHelpers.js         (auto-generated sidebar)
├── pages/
│   ├── Home.jsx                   (auto: latest articles)
│   ├── ArticlePage.jsx            (auto: prev/next, related)
│   ├── CategoryPage.jsx           (auto: article list)
│   ├── Search.jsx                 (auto: full-text search)
│   └── ...
└── components/
    ├── Sidebar.jsx                (auto: from categories)
    └── ...
```

**Only edit:** `src/data/categories.js` and `src/data/articles.js`

**Everything else is automatic.**

---

## Common Scenarios

### I want to reorder articles in a category

Edit `src/data/categories.js` and change the order of topics:

```js
topics: [
  { slug: "first-article", title: "..." },    // Will be 1st
  { slug: "second-article", title: "..." },   // Will be 2nd
  { slug: "third-article", title: "..." },    // Will be 3rd
]
```

Previous/Next navigation updates automatically.

### I want to add a note/tip to an article

Add a block:

```js
sections: [
  {
    heading: "Some Section",
    blocks: [
      { type: "paragraph", text: "..." },
      { type: "note", title: "Important", text: "Important note." },
      { type: "paragraph", text: "..." }
    ]
  }
]
```

### I want to link to another article

Use links in paragraph text:

```js
{ 
  type: "paragraph", 
  text: "See the article on [Incoterms](/study-material/incoterms/incoterms-overview) for more details." 
}
```

### I want to remove an article

1. Delete the topic from `categories.js`
2. Delete the article from `articles.js`

Sidebar, search, and navigation update automatically.

### I want to hide an article but keep it in the system

Comment it out in `articles.js` (keep the code, but don't export it).

Or create a separate `articles-draft.js` file and only import published articles.

---

## Features That Work Automatically

| Feature | What It Does | Where It's Used |
|---------|-------------|-----------------|
| **Sidebar** | Shows categories and topics in order | Every page (right side) |
| **Search** | Full-text search across all content | `/search` page |
| **Category Pages** | Lists all articles in a category | `/study-material/category-name` |
| **Previous/Next** | Navigate between articles by topic order | Bottom of each article |
| **Related Articles** | Shows 3 related articles | Right sidebar on article |
| **Breadcrumbs** | Shows navigation path | Top of every page |
| **Homepage Latest** | Shows 3 newest articles | Homepage |
| **Table of Contents** | Links to article sections | Right sidebar on article |

---

## Under the Hood (For Developers)

These utility functions handle all the magic:

**Article utilities** (`src/utils/articleHelpers.js`):
- `getAutoRelatedArticles()` → Find related articles
- `getPrevNextArticles()` → Previous/Next by topic order
- `searchArticles()` → Full-text search
- `getArticlesByCategory()` → Articles in order
- `getLatestArticles()` → Sort by date
- `getTableOfContents()` → Extract sections

**Category utilities** (`src/utils/categoryHelpers.js`):
- `getNavigationTree()` → Sidebar structure
- `getAllCategories()` → All categories
- `getCategoryWithCount()` → Count articles per category

---

## Design Principles

This architecture follows these principles:

1. **Data-driven** — Content lives in JSON, not code
2. **Maintainable** — Add articles, not code
3. **Scalable** — Works with 10 or 1000 articles
4. **Consistent** — All navigation works the same way
5. **Flexible** — Easy to reorganize or migrate
6. **Future-proof** — Can migrate to CMS without changing components

---

## Troubleshooting

### New article doesn't appear in sidebar
- Check: Is the topic slug in `categories.js` topics array?
- Check: Does the article slug match the topic slug?

### Search doesn't find an article
- Full-text search looks in: titles, summaries, sections, paragraph text, lists, tables
- Check: Is the search term actually in the article content?

### Previous/Next navigation is wrong
- Order is determined by topics in `categories.js`, not article add date
- Check: Is the article in the right position in the topics array?

### Related articles are empty
- Related articles are auto-generated from same category first
- Check: Are there other articles in the same category?

---

## Next Steps

1. **Read** `DATA_ARCHITECTURE.md` for comprehensive documentation
2. **Read** `IMPLEMENTATION.md` for what was changed
3. **Add** your first article using this Quick Start
4. **Verify** everything updates automatically
5. **Scale** to 100+ articles without code changes

---

**Questions?** Check `DATA_ARCHITECTURE.md` or look at existing articles for examples.

The best way to learn is to add an article and see how everything updates automatically. ✨
