import type { AzureAssessmentResult } from "./azure-speech";
import type { AssessmentScores } from "../types/assessment";
import { roundTo, clamp } from "../utils/audio";

/**
 * Scoring Weights:
 *   Accuracy:     35% — Core pronunciation correctness (most important)
 *   Fluency:      25% — Speech rhythm, pace, pausing
 *   Completeness: 20% — Whether all content was articulated
 *   Prosody:      20% — Intonation naturalness, stress patterns
 *
 * These weights are based on linguistic research that ranks accuracy
 * as the primary factor in intelligibility, followed by fluency.
 */
const WEIGHTS = {
  accuracy: 0.35,
  fluency: 0.25,
  completeness: 0.2,
  prosody: 0.2,
} as const;

/**
 * Calculates composite pronunciation scores from Azure's raw assessment.
 * All scores are clamped to [0, 100] and rounded to 1 decimal place.
 */
export function calculateScores(
  raw: AzureAssessmentResult
): AssessmentScores {
  const accuracy = clamp(roundTo(raw.accuracyScore, 1), 0, 100);
  const fluency = clamp(roundTo(raw.fluencyScore, 1), 0, 100);
  const completeness = clamp(roundTo(raw.completenessScore, 1), 0, 100);
  const prosody = clamp(roundTo(raw.prosodyScore, 1), 0, 100);

  const overall = roundTo(
    WEIGHTS.accuracy * accuracy +
      WEIGHTS.fluency * fluency +
      WEIGHTS.completeness * completeness +
      WEIGHTS.prosody * prosody,
    1
  );

  return {
    overall: clamp(overall, 0, 100),
    accuracy,
    fluency,
    completeness,
    prosody,
  };
}
