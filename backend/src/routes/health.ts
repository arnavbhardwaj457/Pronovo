import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /api/health
 * Returns service health status and dependency readiness.
 * Used by monitoring, load balancers, and the frontend cold-start detector.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: "1.0.0",
    dependencies: {
      azureSpeech: !!process.env.AZURE_SPEECH_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
    },
  });
});

export default router;
