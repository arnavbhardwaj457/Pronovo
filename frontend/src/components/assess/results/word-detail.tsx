"use client";

import { cn, getScoreBand, getScoreLabel } from "@/lib/utils";
import type { WordAssessment } from "@/types/assessment";

interface WordDetailProps {
  word: WordAssessment;
  onClose: () => void;
}

const errorLabels: Record<string, { label: string; style: string }> = {
  None: { label: "Correct", style: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Mispronunciation: { label: "Mispronounced", style: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  Omission: { label: "Omitted", style: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  Insertion: { label: "Inserted", style: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  UnexpectedBreak: { label: "Break", style: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  MissingBreak: { label: "Missing break", style: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  Monotone: { label: "Monotone", style: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
};

const phonemeBandColors = {
  excellent: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  good: "border-sky-500/20 bg-sky-500/5 text-sky-600 dark:text-sky-400",
  needs_work: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  poor: "border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-400",
};

export function WordDetail({ word, onClose }: WordDetailProps) {
  const info = errorLabels[word.errorType] || errorLabels.None;
  const band = getScoreBand(word.accuracyScore);

  return (
    <div className="animate-fade-up rounded-lg border border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base font-bold">&ldquo;{word.word}&rdquo;</span>
            <span className={cn("rounded px-1.5 py-px text-[10px] font-semibold", info.style)}>
              {info.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px]">
            <span className="font-bold tabular-nums">{Math.round(word.accuracyScore)}</span>
            <span className="text-muted-foreground">/100 · {getScoreLabel(band)}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-muted-foreground hover:bg-accent transition-colors"
          aria-label="Close"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Phonemes */}
      {word.phonemes.length > 0 && (
        <div>
          <p className="text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Phonemes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {word.phonemes.map((p, i) => {
              const b = getScoreBand(p.accuracyScore);
              return (
                <div
                  key={`${p.phoneme}-${i}`}
                  className={cn(
                    "flex flex-col items-center rounded-md border px-2.5 py-1.5 min-w-[40px]",
                    phonemeBandColors[b]
                  )}
                >
                  <span className="text-[13px] font-mono font-bold">{p.phoneme}</span>
                  <span className="text-[9px] font-semibold mt-0.5 opacity-70">
                    {Math.round(p.accuracyScore)}
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
