import "dotenv/config";
import { z } from "zod";

/**
 * Validates all required environment variables at startup.
 * Fails fast with clear error messages rather than crashing mid-request.
 */
const envSchema = z.object({
  AZURE_SPEECH_KEY: z.string().min(1, "Azure Speech key is required"),
  AZURE_SPEECH_REGION: z.string().min(1, "Azure Speech region is required"),
  GEMINI_API_KEY: z.string().min(1, "Gemini API key is required"),
  PORT: z.coerce.number().default(3001),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900_000), // 15 minutes
  RATE_LIMIT_MAX: z.coerce.number().default(20),
  MAX_AUDIO_SIZE_MB: z.coerce.number().default(10),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    for (const issue of result.error.issues) {
      console.error(`   ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnv();
