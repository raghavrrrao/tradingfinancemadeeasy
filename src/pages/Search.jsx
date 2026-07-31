import DocsSearch from "../components/DocsSearch";
import Seo from "../components/Seo";

export default function Search() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Seo title="Search" description="Search articles, documents, categories, and topics across the portal." />
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-brass">Search</p>
      <h1 className="mb-4 font-display text-4xl text-ink">Find what you need</h1>
      <p className="mb-8 max-w-2xl leading-7 text-ink-soft">
        Search titles, categories, section headings, paragraphs, lists, references, abbreviations, and field numbers.
      </p>
      <DocsSearch autoFocus large className="max-w-3xl" />
    </div>
  );
}
