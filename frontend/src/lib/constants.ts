export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/** Supported audio formats for upload */
export const ACCEPTED_AUDIO_TYPES = [
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/mp3",
  "audio/mpeg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/webm",
  "audio/ogg",
  "audio/flac",
] as const;

/** Human-readable list of accepted extensions */
export const ACCEPTED_EXTENSIONS = ".wav, .mp3, .m4a, .webm, .ogg, .flac";

/** Maximum audio file size in bytes (10MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Maximum audio file size human-readable */
export const MAX_FILE_SIZE_LABEL = "10MB";

/** Score thresholds for color coding */
export const SCORE_THRESHOLDS = {
  excellent: 90,
  good: 70,
  needs_work: 50,
} as const;

/** Score colors mapped to Tailwind classes */
export const SCORE_COLORS = {
  excellent: "text-emerald-400",
  good: "text-sky-400",
  needs_work: "text-amber-400",
  poor: "text-rose-400",
} as const;

export const SCORE_BG_COLORS = {
  excellent: "bg-emerald-400/10 border-emerald-400/20",
  good: "bg-sky-400/10 border-sky-400/20",
  needs_work: "bg-amber-400/10 border-amber-400/20",
  poor: "bg-rose-400/10 border-rose-400/20",
} as const;
