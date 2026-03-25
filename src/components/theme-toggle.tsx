"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center rounded-full",
        "border border-border-color hover:border-border-brand",
        "bg-surface hover:bg-surface-brand",
        "transition-all duration-300"
      )}
      aria-label="Toggle theme"
    >
      <div
        className="transition-transform duration-500"
        style={{ transform: isDark ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-[var(--primary-40)]" />
        ) : (
          <Moon className="w-4 h-4 text-[var(--primary-60)]" />
        )}
      </div>
    </button>
  );
}
