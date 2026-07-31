# Trade Knowledge Portal

A static, client-only documentation-style website for organizing international trade
research: Incoterms, UCP 600, Letters of Credit, and Trade Finance study material.

Built with React, Vite, Tailwind CSS v4, React Router, and Framer Motion. No backend,
no database, no authentication — all content lives in `src/data/*.js`.

## Getting started

```bash
npm install
npm run dev        # start the dev server
npm run build       # production build → dist/
npm run preview     # preview the production build locally
```

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, Sidebar, cards, TOC, breadcrumbs...
  layouts/      RootLayout (nav/footer shell) and StudyLayout (sidebar + content)
  pages/        One file per route
  data/         categories.js, articles.js, resources.js — all site content
  index.css     Design tokens (colors, fonts) and global styles
public/
  resources/    Sample downloadable documents referenced by data/resources.js
```

## Adding content

- **New article**: add an entry to `src/data/articles.js` and make sure its
  `topicSlug` matches a topic listed under the right category in
  `src/data/categories.js`.
- **New category**: add an entry to `src/data/categories.js` with a `topics` array;
  give it an `icon` name that exists in `src/components/Icon.jsx`.
- **New downloadable resource**: add an entry to `src/data/resources.js` and drop the
  file in `public/resources/`.

No component changes are needed for new content — everything is data-driven.

## Deployment

`npm run build` produces a fully static `dist/` folder. It can be hosted on any static
host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.). If you deploy to a path
other than the domain root, or to a host without SPA fallback, configure your host to
serve `index.html` for unknown paths (React Router handles the rest client-side).

## Design

Aesthetic direction: a "trade ledger / customs manifest" motif — hairline rules,
stamp-style tags, perforated card edges — using Fraunces (display), IBM Plex Sans
(body), and IBM Plex Mono (metadata/labels) on a cool paper-grey background with
brass and verdigris accents.
"# tradingfinancemadeeasy" 
