"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AIFeedback } from "@/types/assessment";

interface AIFeedbackPanelProps {
  feedback: AIFeedback;
}

export function AIFeedbackPanel({ feedback }: AIFeedbackPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("improvements");

  const sections = [
    {
      key: "improvements",
      title: "Areas to Improve",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          {feedback.improvements.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border/30 bg-card/30 p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded bg-rose-500/10 px-2 py-0.5 text-xs font-mono font-semibold text-rose-400">
                  {item.word}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{item.issue}</p>
              <p className="mt-1.5 text-xs font-medium text-violet-400">
                💡 {item.suggestion}
              </p>
            </div>
          ))}
          {feedback.improvements.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No significant pronunciation issues detected. Great job!
            </p>
          )}
        </div>
      ),
    },
    {
      key: "strengths",
      title: "Your Strengths",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
      content: (
        <ul className="space-y-2">
          {feedback.strengths.map((strength, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-0.5 text-emerald-400">✓</span>
              {strength}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "tips",
      title: "Practice Tips",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      content: (
        <ul className="space-y-2">
          {feedback.practiceTips.map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-0.5 shrink-0 text-violet-400">{i + 1}.</span>
              {tip}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  // Only show patterns section if there are patterns
  if (feedback.patterns.length > 0) {
    sections.push({
      key: "patterns",
      title: "Identified Patterns",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      content: (
        <ul className="space-y-2">
          {feedback.patterns.map((pattern, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-0.5 text-amber-400">⚠</span>
              {pattern}
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            AI Coaching Feedback
          </span>
          <span className="rounded bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-400">
            Gemini
          </span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {feedback.summary}
        </p>
      </div>

      {/* Collapsible sections */}
      <div className="space-y-2">
        {sections.map((section) => (
          <div
            key={section.key}
            className="rounded-xl border border-border/40 overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.key ? null : section.key
                )
              }
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="text-muted-foreground">{section.icon}</span>
                {section.title}
              </span>
              <svg
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  expandedSection === section.key && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {expandedSection === section.key && (
              <div className="px-4 pb-4 animate-in slide-in-from-top-1 fade-in duration-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
