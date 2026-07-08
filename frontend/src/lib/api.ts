import { API_URL } from "./constants";
import type { AssessmentResult, ApiError } from "@/types/assessment";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Submits audio for pronunciation assessment.
   * Uses multipart/form-data for the file upload.
   * Includes retry logic with exponential backoff.
   */
  async assessPronunciation(
    audioFile: File,
    onProgress?: (stage: string) => void
  ): Promise<AssessmentResult> {
    const formData = new FormData();
    formData.append("audio", audioFile);

    onProgress?.("uploading");

    const result = await this.fetchWithRetry<AssessmentResult>(
      "/api/assess",
      {
        method: "POST",
        body: formData,
        // Don't set Content-Type — browser sets multipart boundary automatically
      },
      2 // max retries
    );

    return result;
  }

  /** Health check — used to detect cold starts */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/api/health`, {
        signal: AbortSignal.timeout(5000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Fetch wrapper with retry logic and structured error handling.
   * Retries on 5xx and network errors. Never retries 4xx (client errors).
   */
  private async fetchWithRetry<T>(
    endpoint: string,
    options: RequestInit,
    maxRetries: number
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          signal: AbortSignal.timeout(120_000), // 2 min timeout for audio processing
        });

        if (!response.ok) {
          const errorBody = (await response
            .json()
            .catch(() => null)) as ApiError | null;

          // Don't retry client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            throw new ApiClientError(
              errorBody?.error || `Request failed: ${response.statusText}`,
              errorBody?.code || "CLIENT_ERROR",
              response.status
            );
          }

          // Retry server errors (5xx)
          throw new Error(
            errorBody?.error || `Server error: ${response.status}`
          );
        }

        return (await response.json()) as T;
      } catch (err) {
        lastError = err as Error;

        // Don't retry client errors
        if (err instanceof ApiClientError) {
          throw err;
        }

        // Retry with exponential backoff
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw (
      lastError ||
      new Error("Request failed after retries")
    );
  }
}

/** Custom error class for API client errors with status code */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export const apiClient = new ApiClient(API_URL);
