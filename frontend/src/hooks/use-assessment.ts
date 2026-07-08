"use client";

import { useState, useCallback } from "react";
import { apiClient, ApiClientError } from "@/lib/api";
import type {
  AssessmentResult,
  ProcessingStage,
} from "@/types/assessment";

interface UseAssessmentReturn {
  /** Current processing stage */
  stage: ProcessingStage | null;
  /** Assessment result when complete */
  result: AssessmentResult | null;
  /** Error message if something went wrong */
  error: string | null;
  /** Whether an assessment is in progress */
  isProcessing: boolean;
  /** Submit audio for assessment */
  assess: (file: File) => Promise<void>;
  /** Reset state for a new assessment */
  reset: () => void;
}

/**
 * Custom hook managing the full assessment lifecycle.
 * Handles stage transitions, error recovery, and result state.
 */
export function useAssessment(): UseAssessmentReturn {
  const [stage, setStage] = useState<ProcessingStage | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const assess = useCallback(async (file: File) => {
    setError(null);
    setResult(null);

    try {
      // Stage 1: Uploading
      setStage("uploading");

      // Simulate staged progress since the API is a single request
      const stageTimer = startStageSimulation(setStage);

      const assessment = await apiClient.assessPronunciation(file);

      clearInterval(stageTimer);
      setStage("complete");
      setResult(assessment);
    } catch (err) {
      setStage("error");

      if (err instanceof ApiClientError) {
        setError(err.message);
      } else if (err instanceof Error) {
        // Friendly messages for common network errors
        if (err.name === "TimeoutError" || err.message.includes("timeout")) {
          setError(
            "The request timed out. The server might be waking up — please try again in 30 seconds."
          );
        } else if (err.message.includes("Failed to fetch")) {
          setError(
            "Cannot connect to the server. It may be starting up — please try again in a moment."
          );
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }, []);

  const reset = useCallback(() => {
    setStage(null);
    setResult(null);
    setError(null);
  }, []);

  return {
    stage,
    result,
    error,
    isProcessing: stage !== null && stage !== "complete" && stage !== "error",
    assess,
    reset,
  };
}

/**
 * Simulates stage transitions while the single API request is processing.
 * This gives the user visual feedback that work is happening.
 * Stages progress at realistic intervals based on typical processing times.
 */
function startStageSimulation(
  setStage: (stage: ProcessingStage) => void
): ReturnType<typeof setInterval> {
  const stages: { stage: ProcessingStage; delay: number }[] = [
    { stage: "analyzing", delay: 2000 },
    { stage: "scoring", delay: 6000 },
    { stage: "generating", delay: 10000 },
  ];

  let index = 0;
  const timer = setInterval(() => {
    if (index < stages.length) {
      setStage(stages[index].stage);
      index++;
    } else {
      clearInterval(timer);
    }
  }, 3000);

  return timer;
}
