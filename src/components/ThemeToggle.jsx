import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "trade-knowledge-portal-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark") }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default function ThemeToggle() {
  const context = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);
  if (!context) return null;
  const { theme, toggleTheme } = context;
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Toggle light mode" : "Toggle dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle fixed bottom-[84px] right-6 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full focus-ring"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span className="theme-toggle-ripple" key={theme} initial={{ scale: 0.5, opacity: 0.45 }} animate={{ scale: 1.65, opacity: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.55 }}
          animate={{ opacity: 1, rotate: isHovered ? 15 : 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.55 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-xl leading-none"
          aria-hidden="true"
        >
          {isDark ? "☀" : "☾"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
