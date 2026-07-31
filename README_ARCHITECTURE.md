# Knowledge Portal: Data-Driven Architecture Documentation

This directory contains a fully data-driven, zero-hardcoding knowledge portal. All content, navigation, search, and features are automatically generated from JSON data files.

## 🎯 Quick Start

**To add a new article:**

1. Add topic to `src/data/categories.js`
2. Add article to `src/data/articles.js`
3. That's it. Everything else updates automatically.

👉 **Start here:** [`QUICKSTART.md`](./QUICKSTART.md) (5 minutes)

---

## 📚 Documentation

Choose the guide that matches your need:

### 1. **[QUICKSTART.md](./QUICKSTART.md)** — Get Started Now
**Read this if:** You want to add an article right now  
**Time:** 5 minutes  
**Contains:**
- Add article in 2 steps
- Article structure examples
- Common scenarios & troubleshooting

### 2. **[DATA_ARCHITECTURE.md](./DATA_ARCHITECTURE.md)** — Complete Reference
**Read this if:** You want to understand the system deeply  
**Time:** 30 minutes  
**Contains:**
- Data file schemas
- How automatic features work
- OCR cleanup rules
- Extension points
- Migration strategy

### 3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Visual Diagrams
**Read this if:** You're a visual learner  
**Time:** 15 minutes  
**Contains:**
- Data flow diagrams
- Component dependency maps
- Feature generation flowcharts
- Extension examples

### 4. **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** — What Changed
**Read this if:** You want to know what was refactored  
**Time:** 10 minutes  
**Contains:**
- All 10 improvements implemented
- Files modified
- Technical details for developers

### 5. **[COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)** — Checksum
**Read this if:** You want verification that everything is done  
**Time:** 5 minutes  
**Contains:**
- Implementation checklist
- Testing checklist
- Success metrics

---

## 🔑 Core Principle

> **Everything comes from data. Add content to the data files. Everything else updates automatically.**

### What You Edit
- `src/data/categories.js` — Topic taxonomy (order = navigation order)
- `src/data/articles.js` — Article content and metadata

### What Updates Automatically
- ✅ Sidebar navigation
- ✅ Search indexing
- ✅ Category pages
- ✅ Previous/Next navigation
- ✅ Related articles
- ✅ Breadcrumbs
- ✅ Homepage latest articles
- ✅ Table of contents

---

## 📁 Project Structure

```
src/
├── data/
│   ├── categories.js          ← ADD TOPICS HERE
│   ├── articles.js            ← ADD ARTICLES HERE
│   └── resources.js           (not affected)
│
├── utils/                     ← NEW (data-driven logic)
│   ├── articleHelpers.js      (search, navigation, related, etc.)
│   └── categoryHelpers.js     (sidebar, categories, etc.)
│
├── pages/
│   ├── Home.jsx               ✅ Updated to use helpers
│   ├── ArticlePage.jsx        ✅ Updated to use helpers
│   ├── CategoryPage.jsx       ✅ Updated to use helpers
│   ├── Search.jsx             ✅ Updated to use helpers
│   └── ...
│
└── components/
    ├── Sidebar.jsx            (already data-driven)
    ├── ArticleBlocks.jsx      (renders any block type)
    └── ...
```

---

## 🚀 Adding Your First Article

### Step 1: Categories
Edit `src/data/categories.js`:
```js
{
  slug: "incoterms",
  topics: [
    { slug: "new-article", title: "New Article Title" },
  ]
}
```

### Step 2: Article
Edit `src/data/articles.js`:
```js
{
  slug: "new-article",
  categorySlug: "incoterms",
  topicSlug: "new-article",
  title: "New Article Title",
  author: "Research Desk",
  updated: "2026-07-12",
  readingTime: 5,
  summary: "One sentence summary",
  sections: [
    {
      heading: "Section Title",
      blocks: [
        { type: "paragraph", text: "..." }
      ]
    }
  ],
  relatedSlugs: [],
  references: []
}
```

### Automatic Updates:
- ✅ Sidebar
- ✅ Search
- ✅ Category page
- ✅ Previous/Next
- ✅ Related articles
- ✅ Homepage
- ✅ Breadcrumbs

---

## 🔍 Key Features

### 1. Search
Full-text search across:
- Titles, summaries, category names
- Section headings, paragraph text
- Lists, tables, references

Usage: `searchArticles(query)` utility

### 2. Navigation
Previous/Next determined by topic order in `categories.js`, not article date.

Usage: `getPrevNextArticles(article)` utility

### 3. Related Articles
Auto-generated with priorities:
1. Explicit relatedSlugs (if any)
2. Same category articles
3. Recent articles

Usage: `getAutoRelatedArticles(article)` utility

### 4. Sidebar
Automatically expanded based on current article category.
No hardcoded links anywhere.

### 5. Homepage
Shows 3 most recently updated articles.
Sorted by `updated` field automatically.

---

## 📊 Utility Functions

### Article Operations (`src/utils/articleHelpers.js`)

| Function | Purpose |
|----------|---------|
| `getAutoRelatedArticles()` | Generate related articles |
| `getPrevNextArticles()` | Get prev/next by topic order |
| `searchArticles()` | Full-text search |
| `getArticlesByCategory()` | Get articles in order |
| `getLatestArticles()` | Sort by date |
| `getArticleSearchText()` | Extract searchable text |
| `getTableOfContents()` | Extract section headings |
| `getArticleBreadcrumbs()` | Generate breadcrumb items |

### Category Operations (`src/utils/categoryHelpers.js`)

| Function | Purpose |
|----------|---------|
| `getNavigationTree()` | Full sidebar structure |
| `getAllCategories()` | All categories |
| `getCategoryWithCount()` | Category + article count |

---

## 📝 Block Types

Every article is composed of blocks:

```js
// Paragraph
{ type: "paragraph", text: "..." }

// List
{ type: "list", items: ["...", "..."] }

// Note (blue callout)
{ type: "note", title: "...", text: "..." }

// Tip (yellow callout)
{ type: "tip", title: "...", text: "..." }

// Table
{ type: "table", headers: ["..."], rows: [["..."]] }
```

---

## ⚠️ Important Rules

### Content Wording
**Do NOT change source wording** when importing content.

✅ Allowed:
- Fix OCR ligatures (Ɵ → ti)
- Merge broken words
- Remove whitespace
- Remove page numbers

❌ Not Allowed:
- Rewrite sentences
- Grammar corrections
- Paraphrasing
- Summarizing

### Metadata
Keep author simple:
```js
author: "Research Desk",     // Just name
updated: "2026-07-12"        // Date only
```

---

## 🔄 Workflow

```
1. Write article content
   ↓
2. Add topic to categories.js
   ↓
3. Add article to articles.js
   ↓
4. Everything updates automatically
   ├── Sidebar
   ├── Search
   ├── Navigation
   ├── Related articles
   ├── Homepage
   └── ...
```

**No component changes needed.**

---

## 🏗️ Architecture Highlights

### Data-Driven
- All content in JSON files
- No hardcoded lists
- Components read utilities, not files directly

### Automatic
- Navigation generated from topic order
- Search indexed from all content
- Related articles by category
- Homepage sorted by date

### Maintainable
- Add articles, not code
- Single source of truth per feature
- Utilities centralized

### Scalable
- Works with 10 articles or 10,000
- No component refactoring as you scale
- CMS-ready architecture

### Future-Proof
- Can migrate to Strapi, Sanity, etc.
- Can add GraphQL layer
- Can add multi-language support
- Components unchanged (only data source)

---

## 🧪 Testing

To verify the system works:

1. Add a new topic to `categories.js`
2. Add a new article to `articles.js`
3. Check:
   - ✅ Appears in sidebar
   - ✅ Appears in category page
   - ✅ Shows in search
   - ✅ Has prev/next (if not first/last)
   - ✅ Has related articles
   - ✅ Shows on homepage (if recent)

---

## 📖 Examples

All data structures and examples are in:
- `src/data/categories.js` — Category examples
- `src/data/articles.js` — Article examples, all block types
- `QUICKSTART.md` — Code snippets
- `DATA_ARCHITECTURE.md` — Comprehensive reference

---

## 🚨 Troubleshooting

### Article doesn't appear in sidebar
→ Check: Is the topic in `categories.js` topics array?

### Search doesn't find an article
→ Full-text search looks in all content. Is the term actually in the article?

### Previous/Next navigation is wrong
→ Order is from `categories.js` topics, not article date. Check topic position.

### Related articles are empty
→ Auto-generated from same category. Are there other articles in the category?

See **[QUICKSTART.md](./QUICKSTART.md)** for more troubleshooting.

---

## 📞 Support

**For quick answers:** Check [QUICKSTART.md](./QUICKSTART.md)  
**For deep understanding:** Read [DATA_ARCHITECTURE.md](./DATA_ARCHITECTURE.md)  
**For visuals:** See [ARCHITECTURE.md](./ARCHITECTURE.md)  
**For technical details:** Review [IMPLEMENTATION.md](./IMPLEMENTATION.md)

---

## ✨ Summary

This project demonstrates a **production-ready, data-driven CMS architecture** with:

- ✅ Zero hardcoding
- ✅ Automatic everything
- ✅ Scalable design
- ✅ Future-proof structure
- ✅ Minimal maintenance

**Start adding articles right now!**  
👉 Open [QUICKSTART.md](./QUICKSTART.md) and add your first article in 5 minutes.
