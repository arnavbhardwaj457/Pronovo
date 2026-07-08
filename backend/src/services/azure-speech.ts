import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { env } from "../config/env";
import { logger } from "../utils/logger";
import { getConfidenceBand } from "../utils/audio";
import type { WordAssessment, PhonemeScore } from "../types/assessment";

/** Raw result from Azure before composite scoring */
export interface AzureAssessmentResult {
  transcript: string;
  words: WordAssessment[];
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  prosodyScore: number;
  audioDurationMs: number;
}

/**
 * Performs pronunciation assessment using Azure Speech SDK.
 *
 * Uses "unscripted" mode — the user doesn't need to provide reference text.
 * Azure will transcribe AND score pronunciation simultaneously.
 *
 * Key config: Phoneme-level granularity with prosody assessment enabled.
 */
export async function assessPronunciation(
  audioBuffer: Buffer,
  mimeType: string
): Promise<AzureAssessmentResult> {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    env.AZURE_SPEECH_KEY,
    env.AZURE_SPEECH_REGION
  );
  speechConfig.speechRecognitionLanguage = "en-US";

  // Create audio config from the in-memory buffer
  const format = getAudioFormat(mimeType);
  const pushStream = sdk.AudioInputStream.createPushStream(format);
  pushStream.write(
    audioBuffer.buffer.slice(
      audioBuffer.byteOffset,
      audioBuffer.byteOffset + audioBuffer.byteLength
    ) as ArrayBuffer
  );
  pushStream.close();
  const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

  // Configure pronunciation assessment (unscripted mode)
  const pronConfig = new sdk.PronunciationAssessmentConfig(
    "",
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true // enable miscue detection
  );
  pronConfig.enableProsodyAssessment = true;

  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  pronConfig.applyTo(recognizer);

  return new Promise<AzureAssessmentResult>((resolve, reject) => {
    const allWords: WordAssessment[] = [];
    const transcriptParts: string[] = [];
    let totalAccuracy = 0;
    let totalFluency = 0;
    let totalCompleteness = 0;
    let totalProsody = 0;
    let segmentCount = 0;
    let totalDurationMs = 0;

    // Handle continuous recognition results (for audio > 15 seconds)
    recognizer.recognized = (_sender, event) => {
      if (
        event.result.reason === sdk.ResultReason.RecognizedSpeech &&
        event.result.text
      ) {
        const pronResult =
          sdk.PronunciationAssessmentResult.fromResult(event.result);

        transcriptParts.push(event.result.text);

        // Extract segment-level scores
        totalAccuracy += pronResult.accuracyScore || 0;
        totalFluency += pronResult.fluencyScore || 0;
        totalCompleteness += pronResult.completenessScore || 0;
        totalProsody += pronResult.prosodyScore || 0;
        segmentCount++;

        // Extract word-level details from the detailed JSON
        const detailJson = event.result.properties.getProperty(
          sdk.PropertyId.SpeechServiceResponse_JsonResult
        );

        if (detailJson) {
          try {
            const detail = JSON.parse(detailJson);
            const nBest = detail?.NBest?.[0];
            if (nBest?.Words) {
              for (const w of nBest.Words) {
                const phonemes: PhonemeScore[] = (
                  w.Phonemes || []
                ).map(
                  (p: {
                    Phoneme: string;
                    PronunciationAssessment?: { AccuracyScore: number };
                    NBestPhonemes?: Array<{
                      Phoneme: string;
                      Score: number;
                    }>;
                  }) => ({
                    phoneme: p.Phoneme,
                    accuracyScore:
                      p.PronunciationAssessment?.AccuracyScore ?? 0,
                    nbestPhonemes: p.NBestPhonemes?.map(
                      (np: { Phoneme: string; Score: number }) => ({
                        phoneme: np.Phoneme,
                        score: np.Score,
                      })
                    ),
                  })
                );

                const wordScore =
                  w.PronunciationAssessment?.AccuracyScore ?? 0;
                const errorType =
                  w.PronunciationAssessment?.ErrorType || "None";

                allWords.push({
                  word: w.Word,
                  accuracyScore: wordScore,
                  errorType,
                  confidence: getConfidenceBand(wordScore),
                  phonemes,
                  offset: w.Offset ? w.Offset / 10000 : undefined, // Convert 100ns units to ms
                  duration: w.Duration ? w.Duration / 10000 : undefined,
                });

                totalDurationMs = Math.max(
                  totalDurationMs,
                  ((w.Offset || 0) + (w.Duration || 0)) / 10000
                );
              }
            }
          } catch (parseErr) {
            logger.warn({ parseErr }, "Failed to parse Azure detail JSON");
          }
        }
      }
    };

    recognizer.canceled = (_sender, event) => {
      if (event.reason === sdk.CancellationReason.Error) {
        logger.error(
          { errorCode: event.errorCode, errorDetails: event.errorDetails },
          "Azure Speech recognition cancelled with error"
        );
        reject(
          new Error(
            `Azure Speech error: ${event.errorDetails || "Unknown error"}`
          )
        );
      }
      recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.sessionStopped = () => {
      recognizer.stopContinuousRecognitionAsync(
        () => {
          recognizer.close();

          if (segmentCount === 0) {
            reject(
              new Error(
                "No speech detected in the audio. Please ensure the recording contains clear English speech."
              )
            );
            return;
          }

          resolve({
            transcript: transcriptParts.join(" "),
            words: allWords,
            accuracyScore: totalAccuracy / segmentCount,
            fluencyScore: totalFluency / segmentCount,
            completenessScore: totalCompleteness / segmentCount,
            prosodyScore: totalProsody / segmentCount,
            audioDurationMs: totalDurationMs,
          });
        },
        (err) => {
          recognizer.close();
          reject(err);
        }
      );
    };

    // Start continuous recognition to handle full 30-45s audio
    recognizer.startContinuousRecognitionAsync(
      () => {
        logger.debug("Azure Speech continuous recognition started");
      },
      (err) => {
        recognizer.close();
        reject(
          new Error(`Failed to start Azure Speech recognition: ${err}`)
        );
      }
    );
  });
}

/**
 * Returns the appropriate AudioStreamFormat for the given MIME type.
 * Defaults to WAV format if type is unknown — Azure handles most formats.
 */
function getAudioFormat(
  mimeType: string
): sdk.AudioStreamFormat | undefined {
  // For WAV files, Azure auto-detects the format from headers
  if (
    mimeType.includes("wav") ||
    mimeType.includes("wave")
  ) {
    return undefined; // Let Azure auto-detect WAV format
  }

  // For compressed formats, use the default which works with most audio
  return undefined;
}
