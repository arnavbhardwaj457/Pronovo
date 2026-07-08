/** Confidence band derived from a 0-100 score */
export type ConfidenceBand = "excellent" | "good" | "needs_work" | "poor";

/** Error type detected by Azure Speech for a given word */
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
  /** IPA symbol if available */
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
  /** Offset in milliseconds from audio start */
  offset?: number;
  /** Duration in milliseconds */
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

/** Complete assessment response */
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
