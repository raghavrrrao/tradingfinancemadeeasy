import { useEffect } from "react";

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · Trade Knowledge Portal`
      : "Trade Knowledge Portal";
    document.title = fullTitle;

    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
  }, [title, description]);

  return null;
}
