import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { slugify } from "../utils/slugify";

// Nearest ancestor that actually scrolls. Returns null for the in-flow mobile
// table of contents, so auto-follow never scrolls the page itself.
const getScrollParent = (node) => {
  let el = node?.parentElement;
  while (el && el !== document.body) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) return el;
    el = el.parentElement;
  }
  return null;
};

export default function TableOfContents({ sections, collapsible = false }) {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(!collapsible);
  const listRef = useRef(null);

  useEffect(() => {
    const ids = sections.map((s) => slugify(s.heading));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // Keep the active entry inside view of the scrollable rail, moving it the
  // smallest distance needed. Runs only when the active section changes.
  useEffect(() => {
    if (!activeId) return;
    const list = listRef.current;
    const index = sections.findIndex((s) => slugify(s.heading) === activeId);
    const link = index === -1 ? null : list?.children[index];
    if (!link) return;

    const container = getScrollParent(list);
    if (!container) return;

    const containerBox = container.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    let delta = 0;
    if (linkBox.top < containerBox.top) delta = linkBox.top - containerBox.top;
    else if (linkBox.bottom > containerBox.bottom) delta = linkBox.bottom - containerBox.bottom;
    if (!delta) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({ top: container.scrollTop + delta, behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeId, sections]);

  if (!sections?.length) return null;

  return (
    <div className="rounded-lg border hairline bg-paper-raised p-4 xl:border-0 xl:bg-transparent xl:p-0">
      <button
        type="button"
        onClick={() => collapsible && setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left font-mono text-[11px] uppercase tracking-widest text-ink-soft/60 focus-ring"
        aria-expanded={open}
      >
        On This Page
        {collapsible && (
          <Icon name="chevron-down" className={`h-3.5 w-3.5 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>
      {open && <ul ref={listRef} className="mt-3 space-y-1.5 border-l hairline">
        {sections.map((s) => {
          const id = slugify(s.heading);
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block pl-3 -ml-px border-l-2 py-0.5 text-sm transition-colors focus-ring ${
                  active
                    ? "border-verdigris text-verdigris font-medium"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {s.heading}
              </a>
            </li>
          );
        })}
      </ul>}
    </div>
  );
}
