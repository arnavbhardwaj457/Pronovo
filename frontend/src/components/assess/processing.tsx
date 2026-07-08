"use client";

import { cn } from "@/lib/utils";
import type { ProcessingStage } from "@/types/assessment";

interface ProcessingProps {
  stage: ProcessingStage;
}

const stages: {
  key: ProcessingStage;
  label: string;
  description: string;
}[] = [
  {
    key: "uploading",
    label: "Uploading",
    description: "Sending your audio to the analysis server...",
  },
  {
    key: "analyzing",
    label: "Analyzing Speech",
    description: "Azure Speech AI is processing your pronunciation...",
  },
  {
    key: "scoring",
    label: "Scoring",
    description: "Calculating accuracy, fluency, and prosody scores...",
  },
  {
    key: "generating",
    label: "Generating Feedback",
    description: "AI is creating personalized coaching suggestions...",
  },
];

export function Processing({ stage }: ProcessingProps) {
  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <div className="mx-auto max-w-md py-12">
      <div className="text-center mb-10">
        {/* Animated pulse */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-violet-500/20 animate-ping" />
          <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg className="h-5 w-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold">Analyzing your pronunciation</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This typically takes 10-20 seconds
        </p>
      </div>

      {/* Stage list */}
      <div className="space-y-3">
        {stages.map((s, index) => {
          const isActive = s.key === stage;
          const isComplete = index < currentIndex;

          return (
            <div
              key={s.key}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500",
                isActive
                  ? "border-violet-500/30 bg-violet-500/5"
                  : isComplete
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-border/30 opacity-40"
              )}
            >
              {/* Status indicator */}
              <div className="shrink-0">
                {isComplete ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20">
                    <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/30">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className={cn(
                  "text-sm font-medium",
                  isComplete && "text-emerald-400"
                )}>
                  {s.label}
                </p>
                {isActive && (
                  <p className="text-xs text-muted-foreground mt-0.5 animate-in fade-in duration-500">
                    {s.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
