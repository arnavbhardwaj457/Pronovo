"use client";

import { cn, getScoreLabel } from "@/lib/utils";
import { SCORE_COLORS, SCORE_BG_COLORS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import type { WordAssessment } from "@/types/assessment";

interface WordDetailProps {
  word: WordAssessment;
  onClose: () => void;
}

const errorTypeLabels: Record<string, { label: string; color: string }> = {
  None: { label: "Correct", color: "bg-emerald-500/20 text-emerald-400" },
  Mispronunciation: { label: "Mispronounced", color: "bg-rose-500/20 text-rose-400" },
  Omission: { label: "Omitted", color: "bg-amber-500/20 text-amber-400" },
  Insertion: { label: "Inserted", color: "bg-sky-500/20 text-sky-400" },
  UnexpectedBreak: { label: "Unexpected Break", color: "bg-amber-500/20 text-amber-400" },
  MissingBreak: { label: "Missing Break", color: "bg-amber-500/20 text-amber-400" },
  Monotone: { label: "Monotone", color: "bg-purple-500/20 text-purple-400" },
};

export function WordDetail({ word, onClose }: WordDetailProps) {
  const errorInfo = errorTypeLabels[word.errorType] || errorTypeLabels.None;

  return (
    <div className="animate-in slide-in-from-top-2 fade-in duration-300 rounded-xl border border-violet-500/20 bg-card/80 backdrop-blur-sm p-4 sm:p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold">&ldquo;{word.word}&rdquo;</h4>
            <Badge className={cn("text-[10px] font-medium border-0", errorInfo.color)}>
              {errorInfo.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("text-2xl font-bold", SCORE_COLORS[word.confidence])}>
              {Math.round(word.accuracyScore)}
            </span>
            <span className="text-xs text-muted-foreground">/ 100</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className={cn("text-xs font-medium", SCORE_COLORS[word.confidence])}>
              {getScoreLabel(word.confidence)}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors"
          aria-label="Close word detail"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Phoneme breakdown */}
      {word.phonemes.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Phoneme Breakdown
          </p>
          <div className="flex flex-wrap gap-2">
            {word.phonemes.map((phoneme, i) => {
              const band =
                phoneme.accuracyScore >= 90
                  ? "excellent"
                  : phoneme.accuracyScore >= 70
                    ? "good"
                    : phoneme.accuracyScore >= 50
                      ? "needs_work"
                      : "poor";
              return (
                <div
                  key={`${phoneme.phoneme}-${i}`}
                  className={cn(
                    "flex flex-col items-center rounded-lg border px-3 py-2 min-w-[48px]",
                    SCORE_BG_COLORS[band as keyof typeof SCORE_BG_COLORS]
                  )}
                >
                  <span className="text-sm font-mono font-bold">
                    {phoneme.phoneme}
                  </span>
                  <span className={cn("text-[10px] font-semibold mt-0.5", SCORE_COLORS[band as keyof typeof SCORE_COLORS])}>
                    {Math.round(phoneme.accuracyScore)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
