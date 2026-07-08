import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ApiError } from "../types/assessment";

/**
 * Express global error handler.
 * Catches all unhandled errors and returns structured JSON responses.
 * Never leaks stack traces to clients in production.
 */
export function errorHandler(
  err: Error & { status?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";

  logger.error({ err, status, code }, "Unhandled error");

  const response: ApiError = {
    error: status === 500 ? "An unexpected error occurred" : err.message,
    code,
    details:
      process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(status).json(response);
}

/**
 * Wraps async route handlers to catch promise rejections.
 * Eliminates the need for try-catch in every route.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
