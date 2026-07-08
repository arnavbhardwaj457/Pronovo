"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AIFeedback } from "@/types/assessment";

interface AIFeedbackPanelProps {
  feedback: AIFeedback;
}

export function AIFeedbackPanel({ feedback }: AIFeedbackPanelProps) {
  const [open, setOpen] = useState<string | null>("improvements");

  const sections = [
    {
      key: "improvements",
      title: "Areas to improve",
      count: feedback.improvements.length,
      content: (
        <div className="space-y-2">
          {feedback.improvements.length === 0 ? (
            <p className="text-[12px] text-muted-foreground">No significant issues detected.</p>
          ) : (
            feedback.improvements.map((item, i) => (
              <div key={i} className="rounded-md border border-border bg-background p-3">
                <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[11px] font-mono font-semibold text-rose-600 dark:text-rose-400">
                  {item.word}
                </span>
                <p className="mt-1.5 text-[12px] text-muted-foreground">{item.issue}</p>
                <p className="mt-1 text-[12px] text-primary font-medium">{item.suggestion}</p>
              </div>
            ))
          )}
        </div>
      ),
    },
    {
      key: "strengths",
      title: "Strengths",
      count: feedback.strengths.length,
      content: (
        <ul className="space-y-1.5">
          {feedback.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground">
              <svg className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "tips",
      title: "Practice tips",
      count: feedback.practiceTips.length,
      content: (
        <ol className="space-y-1.5 list-none">
          {feedback.practiceTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground">
              <span className="shrink-0 text-primary font-semibold text-[11px] mt-px">{i + 1}.</span>
              {tip}
            </li>
          ))}
        </ol>
      ),
    },
  ];

  if (feedback.patterns.length > 0) {
    sections.push({
      key: "patterns",
      title: "Patterns",
      count: feedback.patterns.length,
      content: (
        <ul className="space-y-1.5">
          {feedback.patterns.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground">
              <span className="shrink-0 text-amber-500 mt-px">—</span>
              {p}
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold">AI Feedback</h3>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            Gemini
          </span>
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
          {feedback.summary}
        </p>
      </div>

      {/* Accordion sections */}
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {sections.map((s) => (
          <div key={s.key}>
            <button
              onClick={() => setOpen(open === s.key ? null : s.key)}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left hover:bg-accent/40 transition-colors"
            >
              <span className="flex items-center gap-2 text-[12px] font-medium">
                {s.title}
                {s.count > 0 && (
                  <span className="rounded-full bg-accent px-1.5 py-px text-[10px] text-muted-foreground tabular-nums">
                    {s.count}
                  </span>
                )}
              </span>
              <svg
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                  open === s.key && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {open === s.key && (
              <div className="px-3.5 pb-3.5 animate-fade-up">
                {s.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
