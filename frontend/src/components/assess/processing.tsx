"use client";

import { cn } from "@/lib/utils";
import type { ProcessingStage } from "@/types/assessment";

interface ProcessingProps {
  stage: ProcessingStage;
}

const stages: { key: ProcessingStage; label: string }[] = [
  { key: "uploading", label: "Uploading audio" },
  { key: "analyzing", label: "Analyzing speech patterns" },
  { key: "scoring", label: "Computing scores" },
  { key: "generating", label: "Generating feedback" },
];

export function Processing({ stage }: ProcessingProps) {
  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-xs">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative h-10 w-10">
            <svg className="h-10 w-10 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-border" />
              <path
                d="M12 2a10 10 0 019.95 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
          </div>
        </div>

        <p className="text-center text-[13px] font-medium mb-1">
          Processing your audio
        </p>
        <p className="text-center text-[11px] text-muted-foreground mb-8">
          This typically takes 15–25 seconds
        </p>

        {/* Progress steps */}
        <div className="space-y-1">
          {stages.map((s, i) => {
            const isActive = s.key === stage;
            const isComplete = i < currentIndex;

            return (
              <div
                key={s.key}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-[12px] transition-all duration-300",
                  isActive && "bg-primary/5 text-foreground font-medium",
                  isComplete && "text-muted-foreground",
                  !isActive && !isComplete && "text-muted-foreground/40"
                )}
              >
                {/* Icon */}
                <div className="shrink-0">
                  {isComplete ? (
                    <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                    </svg>
                  ) : isActive ? (
                    <div className="h-3.5 w-3.5 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                  ) : (
                    <div className="h-3.5 w-3.5 flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                </div>
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
