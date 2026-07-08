import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { errorHandler } from "./middleware/error-handler";
import healthRouter from "./routes/health";
import assessRouter from "./routes/assess";

const app = express();

// --- Security Middleware ---
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((o) => o.trim()),
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86400, // 24 hours preflight cache
  })
);

// Trust proxy for rate limiter IP detection on Render
app.set("trust proxy", 1);

// JSON body parser (for non-multipart requests)
app.use(express.json({ limit: "1mb" }));

// --- Request Logging ---
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        durationMs: Date.now() - start,
      },
      "Request completed"
    );
  });
  next();
});

// --- Routes ---
app.get("/", (_req, res) => {
  res.json({
    name: "Pronovo API",
    description: "Pronunciation assessment service",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      assess: "POST /api/assess",
    },
  });
});

app.use("/api/health", healthRouter);
app.use("/api/assess", assessRouter);

// --- Error Handling ---
app.use(errorHandler);

// --- Start Server ---
app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      env: env.NODE_ENV,
      corsOrigin: env.CORS_ORIGIN,
    },
    `🚀 Pronovo API running on port ${env.PORT}`
  );
});

export default app;
