import rateLimit from "express-rate-limit";
import { env } from "../config/env";

/**
 * IP-based rate limiter to prevent API key exhaustion.
 * Default: 20 requests per 15-minute window.
 * Uses the built-in key generator which handles IPv6 correctly.
 */
export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
    code: "RATE_LIMIT_EXCEEDED",
  },
  // Default keyGenerator uses req.ip which respects trust proxy settings
});
