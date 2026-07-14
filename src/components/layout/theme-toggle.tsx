"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themeStorageKey = "pec-theme";

const applyTheme = (dark: boolean) => {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.classList.toggle("dark", dark);
};

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDark(dark);
    applyTheme(dark);
  }, []);

  const toggleTheme = () => {
    const dark = !isDark;

    setIsDark(dark);
    applyTheme(dark);
    window.localStorage.setItem(themeStorageKey, dark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-10 place-items-center rounded-full border border-[rgba(255,255,255,0.24)] text-white transition hover:border-[rgba(255,255,255,0.56)] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
      aria-label={isDark ? "Use light mode" : "Use dark mode"}
      title={isDark ? "Use light mode" : "Use dark mode"}
    >
      {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  );
}
