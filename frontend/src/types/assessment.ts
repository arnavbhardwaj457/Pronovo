/** Confidence band derived from a 0-100 score */
export type ConfidenceBand = "excellent" | "good" | "needs_work" | "poor";

/** Error type detected for a given word */
export type WordErrorType =
  | "None"
  | "Mispronunciation"
  | "Omission"
  | "Insertion"
  | "UnexpectedBreak"
  | "MissingBreak"
  | "Monotone";

/** Individual phoneme assessment */
export interface PhonemeScore {
  phoneme: string;
  accuracyScore: number;
  nbestPhonemes?: Array<{
    phoneme: string;
    score: number;
  }>;
}

/** Word-level assessment result */
export interface WordAssessment {
  word: string;
  accuracyScore: number;
  errorType: WordErrorType;
  confidence: ConfidenceBand;
  phonemes: PhonemeScore[];
  offset?: number;
  duration?: number;
}

/** Top-level scoring metrics */
export interface AssessmentScores {
  overall: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  prosody: number;
}

/** LLM-generated feedback */
export interface AIFeedback {
  summary: string;
  strengths: string[];
  improvements: Array<{
    word: string;
    issue: string;
    suggestion: string;
  }>;
  patterns: string[];
  practiceTips: string[];
}

/** Complete assessment response from the API */
export interface AssessmentResult {
  scores: AssessmentScores;
  words: WordAssessment[];
  transcript: string;
  feedback: AIFeedback;
  metadata: {
    audioDurationMs: number;
    processedAt: string;
    modelVersion: string;
  };
}

/** API error response */
export interface ApiError {
  error: string;
  code: string;
  details?: string;
}

/** Assessment processing stage for the progress UI */
export type ProcessingStage =
  | "uploading"
  | "analyzing"
  | "scoring"
  | "generating"
  | "complete"
  | "error";
