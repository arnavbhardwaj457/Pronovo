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
    // Create object URL for audio playback
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(file));
  }, [audioUrl]);

  const handleAnalyze = useCallback(() => {
    if (audioFile) {
      assess(audioFile);
    }
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Pronunciation Assessment
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload a 30–45 second English audio recording for detailed pronunciation analysis.
        </p>
      </div>

      {/* Privacy notice */}
      <div className="mb-6 flex items-center gap-2 rounded-lg border border-border/40 bg-card/30 px-4 py-3 text-xs text-muted-foreground">
        <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <span>
          By uploading, you consent to audio processing. Your recording is analyzed in-memory and{" "}
          <strong className="text-foreground">never stored</strong>. DPDP Act compliant.
        </span>
      </div>

      {/* Main content area */}
      {!stage && !result && (
        <div className="space-y-6">
          <UploadZone
            onFileSelect={handleFileSelect}
            disabled={isProcessing}
          />

          {/* Audio preview + Analyze button */}
          {audioFile && audioUrl && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-xl border border-border/50 bg-card/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{audioFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(audioFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <audio
                  src={audioUrl}
                  controls
                  className="w-full h-10 [&::-webkit-media-controls-panel]:bg-card"
                />
              </div>

              <button
                onClick={handleAnalyze}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110"
              >
                Analyze Pronunciation
              </button>
            </div>
          )}
        </div>
      )}

      {/* Processing state */}
      {isProcessing && stage && (
        <Processing stage={stage} />
      )}

      {/* Error state */}
      {stage === "error" && error && (
        <div className="py-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Assessment Failed</h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <button
              onClick={handleReset}
              className="mt-6 rounded-lg border border-border/50 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Reset button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Assessment Results</h2>
              {result.metadata.audioDurationMs > 0 && (
                <p className="text-xs text-muted-foreground">
                  Duration: {formatDuration(result.metadata.audioDurationMs)} ·{" "}
                  {result.words.length} words analyzed
                </p>
              )}
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg border border-border/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              New Assessment
            </button>
          </div>

          {/* Audio playback */}
          {audioUrl && (
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <audio
                src={audioUrl}
                controls
                className="w-full h-10 [&::-webkit-media-controls-panel]:bg-card"
              />
            </div>
          )}

          {/* Score overview */}
          <div className="rounded-2xl border border-border/50 bg-card/30 p-6">
            <ScoreOverview scores={result.scores} />
          </div>

          {/* Transcript */}
          <Transcript words={result.words} />

          {/* AI Feedback */}
          <div className="rounded-2xl border border-border/50 bg-card/30 p-6">
            <AIFeedbackPanel feedback={result.feedback} />
          </div>
        </div>
      )}
    </div>
  );
}
