# Architecture Diagram

## Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    SOURCE DATA FILES                         │
└──────────────────────────────────────────────────────────────┘

  ┌─────────────────────┐          ┌─────────────────────┐
  │  categories.js      │          │   articles.js       │
  │                     │          │                     │
  │ • slug              │          │ • slug              │
  │ • title             │          │ • categorySlug      │
  │ • topics[]          │          │ • sections[]        │
  │   - slug            │          │ • updated (date)    │
  │   - title           │          │ • relatedSlugs[]    │
  └──────────┬──────────┘          └──────────┬──────────┘
             │                                 │
             └────────────────┬────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  UTILITY LAYER     │
                    │  (articleHelpers   │
                    │  categoryHelpers)  │
                    └────────┬───────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │                    │                    │
        │                    │                    │
   ┌────▼─────┐      ┌───────▼────┐    ┌────────▼──────┐
   │  ROUTES   │      │ COMPONENTS │    │  PAGES        │
   │           │      │            │    │               │
   │ • /       │      │ • Sidebar  │    │ • Home        │
   │ • /cat/X  │      │ • Cards    │    │ • Category    │
   │ • /article│      │ • ToC      │    │ • Article     │
   │ • /search │      │ • Blocks   │    │ • Search      │
   └───────────┘      └────────────┘    └───────────────┘
```

## Automatic Features Map

```
┌───────────────────────────────────────────────────────────────┐
│                    AUTOMATIC FEATURES                         │
└───────────────────────────────────────────────────────────────┘

SIDEBAR
├─ getNavigationTree()          → Reads categories.js
└─ Expands/collapses topics     → Interactive navigation

SEARCH
├─ searchArticles()             → Full-text indexing
├─ getArticleSearchText()       → Extract all searchable text
└─ Searches: titles, summaries, sections, paragraphs, lists, tables

CATEGORY PAGE
├─ getArticlesByCategory()      → Get articles in topic order
└─ Displays in sidebar order    → Predictable sequence

ARTICLE PAGE
├─ getPrevNextArticles()        → Navigate by topic order (not date)
├─ getAutoRelatedArticles()     → Smart related articles
│  ├─ Priority 1: Same category
│  ├─ Priority 2: Explicit links (relatedSlugs)
│  └─ Priority 3: Recent articles
├─ getTableOfContents()        → Extract section headings
└─ getArticleBreadcrumbs()     → Auto breadcrumbs

HOMEPAGE
├─ getLatestArticles()         → Sort by updated date
└─ Show 3 most recent          → Auto homepage

SEARCH INDEXING
├─ Article titles
├─ Summaries
├─ Section headings
├─ Paragraph text
├─ List items
├─ Table content
└─ Reference labels
```

## Component Dependency Graph

```
App.jsx
├── RootLayout
│   ├── Navbar
│   │   └── (hardcoded links)
│   ├── Sidebar
│   │   └── getNavigationTree()        ← DATA-DRIVEN
│   └── Routes
│       ├── Home
│       │   └── getLatestArticles()    ← DATA-DRIVEN
│       │
│       ├── CategoryPage
│       │   ├── getArticlesByCategory()← DATA-DRIVEN
│       │   └── ArticleCard (repeated)
│       │
│       ├── ArticlePage
│       │   ├── getPrevNextArticles()  ← DATA-DRIVEN
│       │   ├── getAutoRelatedArticles()← DATA-DRIVEN
│       │   ├── ArticleBlocks
│       │   │   ├── Paragraph
│       │   │   ├── List
│       │   │   ├── Note
│       │   │   ├── Tip
│       │   │   └── Table
│       │   └── RelatedArticles
│       │
│       ├── Search
│       │   └── searchArticles()       ← DATA-DRIVEN
│       │
│       └── Resources
│           └── (static, not affected)
```

## Data Flow: Adding a New Article

```
STEP 1: Edit categories.js
┌─────────────────────────────┐
│ Add topic to topics array    │
│ { slug, title }              │
└──────────────┬───────────────┘
               │
               ▼
STEP 2: Edit articles.js
┌─────────────────────────────┐
│ Add article object           │
│ { slug, sections, etc }      │
└──────────────┬───────────────┘
               │
               ▼
AUTOMATIC UPDATES
┌──────────────────────────────────────────┐
│ ✅ Sidebar shows new topic               │
│ ✅ Category page lists article           │
│ ✅ Search indexes article content        │
│ ✅ Article appears in Previous/Next      │
│ ✅ Related articles generated            │
│ ✅ Homepage shows if recent              │
│ ✅ Breadcrumbs work correctly            │
└──────────────────────────────────────────┘
```

## Article Structure: Sections → Blocks

```
Article
├── Section 1 (heading: "Introduction")
│   ├── Block 1 (type: paragraph, text: "...")
│   ├── Block 2 (type: list, items: [...])
│   └── Block 3 (type: note, title: "...", text: "...")
│
├── Section 2 (heading: "Definition")
│   ├── Block 1 (type: paragraph, text: "...")
│   └── Block 2 (type: table, headers: [...], rows: [...])
│
├── Section 3 (heading: "Examples")
│   ├── Block 1 (type: list, items: [...])
│   └── Block 2 (type: paragraph, text: "...")
│
└── Section N
    ├── Block 1 (any type)
    └── Block N (any type)
```

## Navigation: Topic Order Determines Sequence

```
categories.js
└── incoterms
    ├── topic: "incoterms-overview"
    │   └── Article 1
    │       └── Previous: none, Next: Article 2
    │
    ├── topic: "exw-ex-works"
    │   └── Article 2
    │       └── Previous: Article 1, Next: Article 3
    │
    ├── topic: "exw-vs-fob"
    │   └── Article 3
    │       └── Previous: Article 2, Next: Article 4
    │
    └── topic: "cif-explained"
        └── Article 4
            └── Previous: Article 3, Next: none
```

**Topic order in categories.js determines navigation order.**

## Utility Function Hierarchy

```
articleHelpers.js
├── getAutoRelatedArticles()
│   └── Depends: findArticle()
├── getPrevNextArticles()
│   └── Depends: findCategory(), findArticle()
├── getArticleSearchText()
│   └── Pure extraction
├── searchArticles()
│   └── Depends: getArticleSearchText()
├── getArticlesByCategory()
│   └── Depends: findCategory(), findArticle()
├── getLatestArticles()
│   └── Pure sorting
├── getTableOfContents()
│   └── Pure extraction
└── getArticleBreadcrumbs()
    └── Depends: findCategory()

categoryHelpers.js
├── getNavigationTree()
│   └── Depends: findArticle()
├── getCategoryWithCount()
│   └── Depends: findArticle()
└── getAllCategoriesWithCounts()
    └── Depends: getCategoryWithCount()
```

## Extensibility: Future Features (No Code Changes)

Add to article schema → Automatic everywhere:

```
// Future enhancement: Tags
articles: [
  {
    ...existing fields...,
    tags: ["trade-finance", "risk-management"]
  }
]
// Result: Filter by tags, tag pages, tag clouds all auto-generated

// Future enhancement: Multiple authors
articles: [
  {
    ...existing fields...,
    authors: [
      { name: "Alice", email: "alice@" },
      { name: "Bob", email: "bob@" }
    ]
  }
]
// Result: Author pages, author bios all auto-generated

// Future enhancement: Series/chapters
articles: [
  {
    ...existing fields...,
    series: "Incoterms Deep Dive",
    chapterNumber: 1
  }
]
// Result: Series navigation, chapter ordering all auto-generated
```

## CMS Migration Path (Hypothetical Future)

```
CURRENT (File-Based)
articles.js → articleHelpers.js → Components

FUTURE (Headless CMS)
CMS API → Database Query → (same articleHelpers.js) → Components
                                    ↑
                          No component changes needed!
                          Only data source changes.
```

Because components depend on **utilities**, not **data files**, the entire stack can be replaced without touching React code.

---

## Summary

✅ **Data-driven** — Two JSON files, no hardcoding  
✅ **Automatic** — Navigation, search, related articles all generated  
✅ **Extensible** — Add fields to data, features auto-generated  
✅ **Future-proof** — CMS-ready, no component dependencies on data structure  
✅ **Maintainable** — Add articles, not code  
✅ **Scalable** — Works with 10 or 10,000 articles  
