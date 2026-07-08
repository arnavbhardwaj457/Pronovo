"use client";

import { useState } from "react";
import { cn, getScoreBand } from "@/lib/utils";
import type { WordAssessment, ConfidenceBand } from "@/types/assessment";
import { WordDetail } from "./word-detail";

interface TranscriptProps {
  words: WordAssessment[];
}

const wordColors: Record<ConfidenceBand, string> = {
  excellent: "text-emerald-600 dark:text-emerald-400",
  good: "text-sky-600 dark:text-sky-400",
  needs_work: "text-amber-600 dark:text-amber-400 decoration-amber-400/40 underline decoration-wavy underline-offset-[5px]",
  poor: "text-rose-600 dark:text-rose-400 decoration-rose-400/50 underline decoration-wavy underline-offset-[5px]",
};

export function Transcript({ words }: TranscriptProps) {
  const [selectedWord, setSelectedWord] = useState<WordAssessment | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold">Transcript</h3>
        <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground">
          {(["excellent", "good", "needs_work", "poor"] as const).map((b) => (
            <span key={b} className="flex items-center gap-1">
              <span className={cn("h-1.5 w-1.5 rounded-full", {
                "bg-emerald-500": b === "excellent",
                "bg-sky-500": b === "good",
                "bg-amber-500": b === "needs_work",
                "bg-rose-500": b === "poor",
              })} />
              {b === "excellent" ? "90+" : b === "good" ? "70–89" : b === "needs_work" ? "50–69" : "<50"}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap gap-x-1 gap-y-1.5 leading-relaxed">
          {words.map((word, i) => (
            <button
              key={`${word.word}-${i}`}
              onClick={() =>
                setSelectedWord(
                  selectedWord?.word === word.word && selectedWord?.offset === word.offset
                    ? null
                    : word
                )
              }
              className={cn(
                "rounded px-0.5 py-px text-[14px] font-medium transition-all cursor-pointer hover:bg-accent",
                wordColors[word.confidence],
                selectedWord?.word === word.word &&
                  selectedWord?.offset === word.offset &&
                  "ring-1.5 ring-primary/40 bg-primary/5"
              )}
            >
              {word.word}
            </button>
          ))}
        </div>
      </div>

      {selectedWord && (
        <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  );
}
