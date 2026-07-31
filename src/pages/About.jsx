import Icon from "../components/Icon";
import Seo from "../components/Seo";

const expertise = [
  "Trade Finance", "Letters of Credit", "Import & Export Documentation", "Bank Guarantees",
  "Foreign Exchange Operations", "Treasury Management", "SWIFT Messaging", "Forex Risk Management",
  "Working Capital Management", "Remittances", "Banking Compliance", "Asset & Liability Management",
  "Credit Control", "Budgeting & Forecasting", "International Trade Documentation",
];

const contributions = [
  "Led trade finance, treasury, and foreign exchange operations.",
  "Managed inward and outward remittances, import bills, export bills, and bank guarantees.",
  "Negotiated letter of credit documentation and managed buyers credit documentation.",
  "Worked extensively with SWIFT, RTGS, NEFT, FFMC, and banking operations.",
  "Managed RBI and FEMA compliance, compliance reporting, and auditor coordination.",
  "Created standard operating procedures and led anti-money laundering implementation.",
  "Managed treasury cash flow, prepaid card reconciliation, and MIS reporting.",
  "Supported sales pipeline, business growth, and market development initiatives.",
];

const certifications = [
  { abbreviation: "CDCS", name: "Certified Documentary Credit Specialist", issuer: "IFS University, UK", year: "2015" },
  { abbreviation: "CSDG", name: "Certified Specialist in Demand Guarantees", issuer: "IFS University, UK", year: "2016" },
];

const softSkills = ["Communicator", "Innovator", "Problem Solver", "Collaborator", "Empathetic"];

export default function About() {
  return (
    <div className="animate-fade-in">
      <Seo title="About" description="Professional profile of Anup Parikh, trade finance and foreign exchange professional." />

      <section className="border-b hairline grain">
        <div className="docs-container grid gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-paper-raised bg-verdigris font-display text-4xl text-paper shadow-md" aria-label="Anup Parikh profile mark">AP</div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-brass">About the author</p>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Anup Parikh</h1>
            <p className="mt-3 text-lg font-medium text-verdigris">Trade Finance &amp; Foreign Exchange Professional</p>
            <p className="mt-4 max-w-3xl leading-8 text-ink-soft">A trade finance and foreign exchange professional with more than 20 years of experience across trade finance, treasury operations, foreign exchange management, remittances, banking compliance, and international trade documentation. His published research forms the basis of this documentation portal.</p>
          </div>
        </div>
      </section>

      <div className="docs-container px-4 py-16 sm:px-6 sm:py-20">
        <section className="border-b hairline pb-14">
          <p className="font-mono text-[11px] uppercase tracking-widest text-brass">Professional profile</p>
          <h2 className="mt-3 font-display text-3xl text-ink">Professional summary</h2>
          <p className="mt-5 max-w-4xl leading-8 text-ink-soft">Professional experience includes trade finance, foreign exchange and treasury operations, credit control, working capital management, banking compliance, risk management, and international and domestic trade procedures. Areas of practice include letters of credit, bank guarantees, import and export documentation, SWIFT operations, treasury and cash management, forex hedging, FX risk management, RBI compliance, and FEMA compliance.</p>
        </section>

        <section className="py-14">
          <p className="font-mono text-[11px] uppercase tracking-widest text-brass">Areas of expertise</p>
          <h2 className="mt-3 font-display text-3xl text-ink">Professional areas of focus</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => <article key={item} className="flex items-center gap-3 rounded-md border hairline bg-paper-raised px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-verdigris/60 hover:shadow-sm"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-brass"><Icon name={index % 3 === 0 ? "anchor" : index % 3 === 1 ? "scroll" : "landmark"} className="h-4 w-4" /></span><h3 className="text-sm font-medium text-ink">{item}</h3></article>)}
          </div>
        </section>

        <section className="border-t hairline py-14">
          <p className="font-mono text-[11px] uppercase tracking-widest text-brass">Professional experience</p>
          <h2 className="mt-3 font-display text-3xl text-ink">Career timeline</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="rounded-md border hairline bg-paper-raised p-6"><p className="font-mono text-[11px] uppercase tracking-widest text-brass">January 1999 — March 2018</p><h3 className="mt-4 font-display text-2xl text-ink">Business Head</h3><p className="mt-2 text-sm text-ink-soft">Linea Travels Pvt. Ltd. · Mumbai</p></div>
            <ul className="grid gap-3 sm:grid-cols-2">{contributions.map((item) => <li key={item} className="relative border-l-2 border-brass/50 pl-4 text-sm leading-6 text-ink-soft">{item}</li>)}</ul>
          </div>
        </section>

        <section className="grid gap-12 border-t hairline py-14 lg:grid-cols-2">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-brass">Education</p><h2 className="mt-3 font-display text-3xl text-ink">Academic qualification</h2><div className="mt-7 rounded-md border hairline bg-paper-raised p-6"><p className="font-mono text-xs text-brass">1999</p><h3 className="mt-3 font-display text-xl text-ink">Bachelor of Commerce</h3><p className="mt-2 text-sm text-ink-soft">University of Mumbai</p></div></div>
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-brass">Professional certifications</p><h2 className="mt-3 font-display text-3xl text-ink">Completed certifications</h2><div className="mt-7 space-y-3">{certifications.map((certification) => <article key={certification.abbreviation} className="flex gap-4 rounded-md border hairline bg-paper-raised p-5"><span className="font-mono text-sm font-medium text-brass">{certification.abbreviation}</span><div><h3 className="font-medium text-ink">{certification.name}</h3><p className="mt-1 text-sm text-ink-soft">{certification.issuer} · Completed {certification.year}</p></div></article>)}</div></div>
        </section>

        <section className="grid gap-12 border-t hairline py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-brass">Research &amp; publications</p><h2 className="mt-3 font-display text-3xl text-ink">Published work</h2><article className="mt-7 rounded-md border hairline bg-paper-raised p-6"><p className="font-mono text-[11px] uppercase tracking-widest text-brass">LinkedIn · multipart analytical series</p><h3 className="mt-3 font-display text-2xl text-ink">Is Indian Railway Headed the Air India Way</h3><p className="mt-3 leading-7 text-ink-soft">A three-article analytical series discussing Indian Railway revenue deficits and suggestions for improving revenue generation.</p></article></div>
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-brass">Soft skills</p><h2 className="mt-3 font-display text-3xl text-ink">Working approach</h2><ul className="mt-7 flex flex-wrap gap-2">{softSkills.map((skill) => <li key={skill} className="rounded-full border hairline bg-paper-raised px-3 py-2 text-sm text-ink-soft">{skill}</li>)}</ul></div>
        </section>
      </div>
    </div>
  );
}
