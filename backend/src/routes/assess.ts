import { Router } from "express";
import { upload, validateAudioUpload } from "../middleware/validators";
import { asyncHandler } from "../middleware/error-handler";
import { apiRateLimiter } from "../middleware/rate-limiter";
import { assessPronunciation } from "../services/azure-speech";
import { calculateScores } from "../services/score-calculator";
import { generateFeedback } from "../services/llm-feedback";
import { logger } from "../utils/logger";
import type { AssessmentResult } from "../types/assessment";

const router = Router();

/**
 * POST /api/assess
 * Main assessment endpoint. Accepts audio file, returns pronunciation assessment.
 *
 * Flow: Upload → Validate → Azure Speech → Score → LLM Feedback → Response
 * Audio is processed entirely in-memory (DPDP compliant).
 */
router.post(
  "/",
  apiRateLimiter,
  upload.single("audio"),
  validateAudioUpload,
  asyncHandler(async (req, res) => {
    const file = req.file!;
    const startTime = Date.now();

    logger.info(
      {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
      "Processing audio assessment"
    );

    // Step 1: Get raw pronunciation assessment from Azure
    const rawAssessment = await assessPronunciation(file.buffer, file.mimetype);

    // Step 2: Calculate composite scores
    const scores = calculateScores(rawAssessment);

    // Step 3: Generate AI feedback using LLM
    const feedback = await generateFeedback(rawAssessment, scores);

    const result: AssessmentResult = {
      scores,
      words: rawAssessment.words,
      transcript: rawAssessment.transcript,
      feedback,
      metadata: {
        audioDurationMs: rawAssessment.audioDurationMs,
        processedAt: new Date().toISOString(),
        modelVersion: "1.0.0",
      },
    };

    const processingTime = Date.now() - startTime;
    logger.info(
      { processingTimeMs: processingTime, overallScore: scores.overall },
      "Assessment completed"
    );

    res.json(result);
  })
);

export default router;
