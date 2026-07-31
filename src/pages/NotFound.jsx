import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-32 text-center">
      <Seo title="Page Not Found" description="The page you're looking for could not be found." />
      <span className="manifest-tag mb-6 inline-block">404</span>
      <h1 className="font-display text-3xl text-ink mb-3">Manifest entry not found</h1>
      <p className="text-ink-soft leading-relaxed mb-8">
        The page you're looking for isn't in the archive. It may have moved, or the
        reference was mistyped.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-sm font-medium hover:bg-verdigris transition-colors focus-ring"
      >
        <Icon name="arrow-left" className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
