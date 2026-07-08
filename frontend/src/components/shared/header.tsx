"use client";

import Link from "next/link";
import { useTheme } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            width="22"
            height="22"
            viewBox="0 0 32 32"
            fill="none"
            className="transition-transform group-hover:scale-110"
          >
            <rect width="32" height="32" rx="8" className="fill-primary" />
            <path
              d="M10 22V10h4.5c1.4 0 2.5.35 3.3 1.05.8.7 1.2 1.65 1.2 2.85 0 1.2-.4 2.15-1.2 2.85-.8.7-1.9 1.05-3.3 1.05H13v4.2H10z"
              className="fill-primary-foreground"
            />
          </svg>
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Pronovo
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/assess"
            className={cn(
              "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
              pathname === "/assess"
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            Assess
          </Link>

          <div className="mx-1 h-4 w-px bg-border" />

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
