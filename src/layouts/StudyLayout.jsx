import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Icon from "../components/Icon";

export default function StudyLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="docs-container px-4 py-8 sm:px-6">
      <button
        onClick={() => setMobileOpen((o) => !o)}
        className="lg:hidden mb-5 inline-flex items-center gap-2 text-sm font-medium border hairline px-3.5 py-2 rounded-sm focus-ring"
        aria-expanded={mobileOpen}
      >
        <Icon name="layers" className="w-4 h-4" />
        {mobileOpen ? "Hide categories" : "Browse categories"}
      </button>

      <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 xl:gap-10">
        <aside className={`${mobileOpen ? "block" : "hidden"} lg:block mb-8 lg:mb-0`}>
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
