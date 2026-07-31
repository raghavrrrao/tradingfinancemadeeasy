import Seo from "../components/Seo";

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Seo title="Contact" description="Contact information for the Trade Knowledge Portal." />
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-brass">Contact</p>
      <h1 className="mb-4 font-display text-3xl text-ink sm:text-4xl">Portal information</h1>
      <div className="rounded-md border hairline bg-paper-raised p-6">
        <p className="leading-relaxed text-ink-soft">No public contact details have been provided for this portal.</p>
      </div>
    </div>
  );
}
