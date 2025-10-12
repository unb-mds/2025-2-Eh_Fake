'use client';
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 sm:p-3 md:p-4 rounded-full bg-light-primary text-dark-primary dark:bg-dark-primary dark:text-light-primary z-50
        transition-all duration-300 hover:bg-light-secondary dark:hover:bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-blue-500
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center"
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      ) : (
        <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      )}
    </button>
  );
};

export default ThemeSwitcher;