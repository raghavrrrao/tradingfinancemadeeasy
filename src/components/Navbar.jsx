import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DocsSearch from "./DocsSearch";
import Icon from "./Icon";
import { getCategoriesWithArticles } from "../data/categories";

const navLink =
  "px-1 py-2 text-sm tracking-wide transition-colors border-b-2 border-transparent hover:text-ink";

export default function Navbar() {
  const categories = getCategoriesWithArticles();
  const [open, setOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStudyOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-paper-raised/95 backdrop-blur">
      <div className="docs-container px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-sm focus-ring">
            <span className="manifest-tag !transform-none !rotate-0">ITKP</span>
            <span className="hidden font-display text-lg font-semibold text-ink sm:inline">
              Trade Knowledge Portal
            </span>
          </Link>

          <nav className="hidden items-center gap-6 font-body lg:flex">
            <NavLink to="/" end className={({ isActive }) => `${navLink} ${isActive ? "border-brass text-ink" : "text-ink-soft"}`}>
              Home
            </NavLink>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setStudyOpen((value) => !value)}
                className={`${navLink} flex items-center gap-1 rounded-sm text-ink-soft focus-ring`}
                aria-expanded={studyOpen}
              >
                Study Material
                <Icon name="chevron-down" className={`h-3.5 w-3.5 transition-transform ${studyOpen ? "rotate-180" : ""}`} />
              </button>
              {studyOpen && <StudyMegaMenu onNavigate={() => setStudyOpen(false)} />}
            </div>

            <NavLink to="/about" className={({ isActive }) => `${navLink} ${isActive ? "border-brass text-ink" : "text-ink-soft"}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${navLink} ${isActive ? "border-brass text-ink" : "text-ink-soft"}`}>
              Contact
            </NavLink>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <DocsSearch className="hidden w-full max-w-sm md:block" />
            <button
              type="button"
              className="rounded-sm p-2 text-ink focus-ring lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t hairline bg-paper-raised lg:hidden">
          <div className="docs-container flex flex-col gap-1 px-4 py-4 sm:px-6">
            <DocsSearch className="mb-2" onNavigate={() => setOpen(false)} />
            <MobileLink to="/" label="Home" onClick={() => setOpen(false)} />
            <div className="py-1">
              <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
                Study Material
              </p>
              {categories.map((category) => (
                <MobileLink
                  key={category.slug}
                  to={`/study-material/${category.slug}`}
                  label={category.title}
                  onClick={() => setOpen(false)}
                  indent
                />
              ))}
            </div>
            <MobileLink to="/about" label="About" onClick={() => setOpen(false)} />
            <MobileLink to="/contact" label="Contact" onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

function StudyMegaMenu({ onNavigate }) {
  const categories = getCategoriesWithArticles();

  return (
    <div className="absolute left-1/2 mt-3 w-[520px] -translate-x-1/2 rounded-lg border hairline bg-paper-raised p-3 shadow-xl shadow-ink/10 animate-pop">
      <div className="grid gap-2">
        {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/study-material/${category.slug}`}
              onClick={onNavigate}
              className="group flex items-center justify-between gap-5 rounded-md border border-transparent px-4 py-3 hover:border-rule hover:bg-paper focus-ring"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border hairline bg-paper text-brass">
                  <Icon name={category.icon} className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-ink">{category.title}</span>
                  <span className="mt-0.5 block text-xs text-ink-soft">{category.articleCount} Articles</span>
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-verdigris">
                Browse
                <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({ to, label, onClick, indent }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block rounded-sm px-3 py-2.5 text-sm focus-ring ${indent ? "pl-6 text-ink-soft" : "text-ink"} ${
          isActive ? "bg-paper text-ink" : "hover:bg-paper"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
