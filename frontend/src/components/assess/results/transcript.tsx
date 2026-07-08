"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SCORE_COLORS } from "@/lib/constants";
import type { WordAssessment, ConfidenceBand } from "@/types/assessment";
import { WordDetail } from "./word-detail";

interface TranscriptProps {
  words: WordAssessment[];
}

const wordColorMap: Record<ConfidenceBand, string> = {
  excellent: "text-emerald-400 hover:bg-emerald-400/10",
  good: "text-sky-400 hover:bg-sky-400/10",
  needs_work: "text-amber-400 hover:bg-amber-400/10",
  poor: "text-rose-400 hover:bg-rose-400/10",
};

const wordUnderlineMap: Record<ConfidenceBand, string> = {
  excellent: "",
  good: "",
  needs_work: "underline decoration-amber-400/30 decoration-wavy underline-offset-4",
  poor: "underline decoration-rose-400/50 decoration-wavy underline-offset-4",
};

export function Transcript({ words }: TranscriptProps) {
  const [selectedWord, setSelectedWord] = useState<WordAssessment | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Interactive Transcript</h3>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> 90+
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-sky-400" /> 70-89
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> 50-69
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-400" /> &lt;50
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 p-4 sm:p-6">
        <div className="flex flex-wrap gap-x-1 gap-y-2 leading-relaxed">
          {words.map((word, index) => (
            <button
              key={`${word.word}-${index}`}
              onClick={() =>
                setSelectedWord(selectedWord?.word === word.word && selectedWord?.offset === word.offset ? null : word)
              }
              className={cn(
                "rounded-md px-1 py-0.5 text-sm sm:text-base font-medium transition-all cursor-pointer",
                wordColorMap[word.confidence],
                wordUnderlineMap[word.confidence],
                selectedWord?.word === word.word &&
                  selectedWord?.offset === word.offset &&
                  "ring-2 ring-violet-500/50 bg-violet-500/10"
              )}
              title={`${word.word}: ${Math.round(word.accuracyScore)}/100`}
            >
              {word.word}
            </button>
          ))}
        </div>
      </div>

      {/* Word detail panel */}
      {selectedWord && (
        <WordDetail
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
}
