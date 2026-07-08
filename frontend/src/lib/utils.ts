import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ConfidenceBand } from "@/types/assessment"
import { SCORE_THRESHOLDS } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formats bytes to human-readable string */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Formats milliseconds to mm:ss */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Maps a numeric score to a confidence band */
export function getScoreBand(score: number): ConfidenceBand {
  if (score >= SCORE_THRESHOLDS.excellent) return "excellent";
  if (score >= SCORE_THRESHOLDS.good) return "good";
  if (score >= SCORE_THRESHOLDS.needs_work) return "needs_work";
  return "poor";
}

/** Maps a confidence band to a human label */
export function getScoreLabel(band: ConfidenceBand): string {
  const labels: Record<ConfidenceBand, string> = {
    excellent: "Excellent",
    good: "Good",
    needs_work: "Needs Work",
    poor: "Poor",
  };
  return labels[band];
}
