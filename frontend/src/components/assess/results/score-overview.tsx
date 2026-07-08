"use client";

import { cn, getScoreBand, getScoreLabel } from "@/lib/utils";

import type { AssessmentScores } from "@/types/assessment";

interface ScoreOverviewProps {
  scores: AssessmentScores;
}

const bandColors = {
  excellent: "text-emerald-500",
  good: "text-sky-500",
  needs_work: "text-amber-500",
  poor: "text-rose-500",
} as const;

const bandBarColors = {
  excellent: "bg-emerald-500",
  good: "bg-sky-500",
  needs_work: "bg-amber-500",
  poor: "bg-rose-500",
} as const;

export function ScoreOverview({ scores }: ScoreOverviewProps) {
  const band = getScoreBand(scores.overall);

  const metrics = [
    { key: "accuracy", label: "Accuracy", value: scores.accuracy },
    { key: "fluency", label: "Fluency", value: scores.fluency },
    { key: "completeness", label: "Completeness", value: scores.completeness },
    { key: "prosody", label: "Prosody", value: scores.prosody },
  ];

  return (
    <div className="space-y-6">
      {/* Overall score — big number, no ring chart gimmick */}
      <div className="text-center py-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2">
          Overall Score
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className={cn("text-5xl font-bold tabular-nums animate-count", bandColors[band])}>
            {Math.round(scores.overall)}
          </span>
          <span className="text-lg text-muted-foreground/50 font-medium">/100</span>
        </div>
        <span className={cn("mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", bandColors[band], `bg-current/10`)}>
          {getScoreLabel(band)}
        </span>
      </div>

      {/* Metric bars */}
      <div className="space-y-3">
        {metrics.map((metric) => {
          const b = getScoreBand(metric.value);
          return (
            <div key={metric.key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] text-muted-foreground">{metric.label}</span>
                <span className={cn("text-[12px] font-semibold tabular-nums", bandColors[b])}>
                  {Math.round(metric.value)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700 ease-out", bandBarColors[b])}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
