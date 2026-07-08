"use client";

import Link from "next/link";
import { useTheme } from "./theme-toggle";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
            P
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Pronovo
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/assess"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Assess
          </Link>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
