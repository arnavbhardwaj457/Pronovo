"use client";

import { useCallback, useState } from "react";
import { UploadZone } from "@/components/assess/upload-zone";
import { Processing } from "@/components/assess/processing";
import { ScoreOverview } from "@/components/assess/results/score-overview";
import { Transcript } from "@/components/assess/results/transcript";
import { AIFeedbackPanel } from "@/components/assess/results/ai-feedback";
import { useAssessment } from "@/hooks/use-assessment";
import { formatDuration } from "@/lib/utils";

export default function AssessPage() {
  const { stage, result, error, isProcessing, assess, reset } =
    useAssessment();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setAudioFile(file);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(file));
  }, [audioUrl]);

  const handleAnalyze = useCallback(() => {
    if (audioFile) assess(audioFile);
  }, [audioFile, assess]);

  const handleReset = useCallback(() => {
    reset();
    setAudioFile(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  }, [reset, audioUrl]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Pronunciation Assessment
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Upload a 30–45 second English recording for detailed analysis.
        </p>
      </div>

      {/* Privacy notice — minimal */}
      <div className="mb-6 rounded-lg border border-border bg-card px-4 py-2.5 text-[12px] text-muted-foreground flex items-center gap-2">
        <svg className="h-3.5 w-3.5 shrink-0 text-emerald-500" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M8 1a3.5 3.5 0 00-3.5 3.5V7A1.5 1.5 0 003 8.5v5A1.5 1.5 0 004.5 15h7a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 0011.5 7V4.5A3.5 3.5 0 008 1zm2 6V4.5a2 2 0 10-4 0V7h4z" clipRule="evenodd" />
        </svg>
        Audio is processed in-memory and <strong className="text-foreground font-medium">never stored</strong>.
      </div>

      {/* Upload state */}
      {!stage && !result && (
        <div className="space-y-5">
          <UploadZone onFileSelect={handleFileSelect} disabled={isProcessing} />

          {audioFile && audioUrl && (
            <div className="space-y-3 animate-fade-up">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium truncate">{audioFile.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {(audioFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setAudioFile(null);
                      if (audioUrl) URL.revokeObjectURL(audioUrl);
                      setAudioUrl(null);
                    }}
                    className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    aria-label="Remove file"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <audio
                  src={audioUrl}
                  controls
                  className="w-full h-8"
                />
              </div>

              <button
                onClick={handleAnalyze}
                className="w-full h-10 rounded-lg bg-primary text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.99]"
              >
                Analyze pronunciation
              </button>
            </div>
          )}
        </div>
      )}

      {/* Processing */}
      {isProcessing && stage && <Processing stage={stage} />}

      {/* Error */}
      {stage === "error" && error && (
        <div className="py-10 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-[15px] font-semibold">Something went wrong</h3>
          <p className="mt-1.5 text-[13px] text-muted-foreground max-w-sm mx-auto">{error}</p>
          <button
            onClick={handleReset}
            className="mt-5 h-9 rounded-lg border border-border px-5 text-[13px] font-medium transition-colors hover:bg-accent"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-up">
          {/* Results header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">Results</h2>
              {result.metadata.audioDurationMs > 0 && (
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {formatDuration(result.metadata.audioDurationMs)} · {result.words.length} words
                </p>
              )}
            </div>
            <button
              onClick={handleReset}
              className="h-8 rounded-md border border-border px-3 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              New assessment
            </button>
          </div>

          {/* Audio playback */}
          {audioUrl && (
            <div className="rounded-lg border border-border bg-card p-3">
              <audio src={audioUrl} controls className="w-full h-8" />
            </div>
          )}

          {/* Scores */}
          <div className="rounded-xl border border-border bg-card p-5">
            <ScoreOverview scores={result.scores} />
          </div>

          {/* Transcript */}
          <Transcript words={result.words} />

          {/* AI Feedback */}
          <div className="rounded-xl border border-border bg-card p-5">
            <AIFeedbackPanel feedback={result.feedback} />
          </div>
        </div>
      )}
    </div>
  );
}
