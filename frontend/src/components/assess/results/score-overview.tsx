"use client";

import { cn, getScoreBand, getScoreLabel } from "@/lib/utils";
import { SCORE_COLORS, SCORE_BG_COLORS } from "@/lib/constants";
import type { AssessmentScores } from "@/types/assessment";

interface ScoreOverviewProps {
  scores: AssessmentScores;
}

export function ScoreOverview({ scores }: ScoreOverviewProps) {
  const band = getScoreBand(scores.overall);

  const metrics = [
    { label: "Accuracy", value: scores.accuracy, description: "Phoneme correctness" },
    { label: "Fluency", value: scores.fluency, description: "Speech rhythm & pace" },
    { label: "Completeness", value: scores.completeness, description: "Words articulated" },
    { label: "Prosody", value: scores.prosody, description: "Intonation & stress" },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="flex flex-col items-center py-6">
        <div className="relative flex h-36 w-36 items-center justify-center">
          {/* Background ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(scores.overall / 100) * 402} 402`}
              className={cn(
                "transition-all duration-1000 ease-out",
                band === "excellent"
                  ? "stroke-emerald-400"
                  : band === "good"
                    ? "stroke-sky-400"
                    : band === "needs_work"
                      ? "stroke-amber-400"
                      : "stroke-rose-400"
              )}
            />
          </svg>
          <div className="text-center">
            <span className={cn("text-4xl font-bold", SCORE_COLORS[band])}>
              {Math.round(scores.overall)}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {getScoreLabel(band)}
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => {
          const metricBand = getScoreBand(metric.value);
          return (
            <div
              key={metric.label}
              className={cn(
                "rounded-xl border p-4 transition-all",
                SCORE_BG_COLORS[metricBand]
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.label}
                </span>
                <span className={cn("text-lg font-bold", SCORE_COLORS[metricBand])}>
                  {Math.round(metric.value)}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    metricBand === "excellent"
                      ? "bg-emerald-400"
                      : metricBand === "good"
                        ? "bg-sky-400"
                        : metricBand === "needs_work"
                          ? "bg-amber-400"
                          : "bg-rose-400"
                  )}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground/60">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
