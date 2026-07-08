import type { ConfidenceBand } from "../types/assessment";

/** Maps a 0-100 score to a confidence band */
export function getConfidenceBand(score: number): ConfidenceBand {
  if (score >= 90) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "needs_work";
  return "poor";
}

/** Clamps a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Rounds a number to specified decimal places */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
