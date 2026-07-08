import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

const ALLOWED_MIME_TYPES = [
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
  "audio/x-flac",
];

const ALLOWED_EXTENSIONS = [
  ".wav",
  ".mp3",
  ".m4a",
  ".webm",
  ".ogg",
  ".flac",
  ".mpeg",
];

/**
 * Multer configured for in-memory storage (DPDP: no disk writes).
 * Files are held in buffer during processing and garbage collected after response.
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.MAX_AUDIO_SIZE_MB * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const ext = file.originalname
      .toLowerCase()
      .slice(file.originalname.lastIndexOf("."));

    if (
      ALLOWED_MIME_TYPES.includes(file.mimetype) ||
      ALLOWED_EXTENSIONS.includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Unsupported audio format: ${file.mimetype}. Supported: WAV, MP3, M4A, WebM, OGG, FLAC`
        )
      );
    }
  },
});

/**
 * Validates the uploaded audio file exists and meets basic requirements.
 */
export function validateAudioUpload(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.file) {
    res.status(400).json({
      error: "No audio file provided",
      code: "MISSING_AUDIO",
      details: "Upload an audio file using the 'audio' form field",
    });
    return;
  }

  // Minimum file size check (likely corrupt or empty if < 1KB)
  if (req.file.size < 1024) {
    res.status(400).json({
      error: "Audio file is too small (likely corrupt or empty)",
      code: "INVALID_AUDIO",
      details: "Minimum file size: 1KB",
    });
    return;
  }

  next();
}
