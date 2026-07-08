import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { logger } from "../utils/logger";
import type { AzureAssessmentResult } from "./azure-speech";
import type { AssessmentScores, AIFeedback } from "../types/assessment";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

/**
 * System prompt that positions Gemini as a pronunciation coach.
 * Structured output format ensures reliable JSON parsing.
 */
const SYSTEM_PROMPT = `You are an expert English pronunciation coach and speech-language pathologist.

You will receive a pronunciation assessment with word-level scores and error types.

Your task is to provide actionable, encouraging feedback.

RULES:
- Be specific: reference exact words from the transcript
- Be encouraging: always mention strengths before improvements
- Be practical: give concrete pronunciation tips (mouth position, tongue placement)
- Never be condescending or overly critical
- Limit to the top 3-5 most impactful improvements
- If the scores are high (>85), focus on advanced refinement tips
- Identify phoneme patterns (e.g., "th" sounds, "r/l" confusion, vowel reduction)

Respond ONLY with valid JSON in this exact structure:
{
  "summary": "2-3 sentence overall assessment",
  "strengths": ["strength 1", "strength 2"],
  "improvements": [
    {
      "word": "the specific word",
      "issue": "what was wrong",
      "suggestion": "how to fix it with a concrete tip"
    }
  ],
  "patterns": ["pattern description 1"],
  "practiceTips": ["actionable tip 1", "actionable tip 2"]
}`;

/**
 * Generates human-readable pronunciation feedback using Gemini 2.5 Flash.
 *
 * Why Gemini Flash over GPT-4o:
 * - 3x faster for short structured outputs
 * - ~10x cheaper per token
 * - Native JSON mode reduces parsing failures
 */
export async function generateFeedback(
  assessment: AzureAssessmentResult,
  scores: AssessmentScores
): Promise<AIFeedback> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3, // Low temp for consistent, factual feedback
      },
    });

    // Build context for the LLM with the most relevant data
    const wordData = assessment.words
      .filter((w) => w.errorType !== "None" || w.accuracyScore < 80)
      .map((w) => ({
        word: w.word,
        score: w.accuracyScore,
        error: w.errorType,
        phonemes: w.phonemes
          .filter((p) => p.accuracyScore < 70)
          .map((p) => ({
            phoneme: p.phoneme,
            score: p.accuracyScore,
          })),
      }));

    const prompt = `
Analyze this pronunciation assessment:

TRANSCRIPT: "${assessment.transcript}"

SCORES:
- Overall: ${scores.overall}/100
- Accuracy: ${scores.accuracy}/100
- Fluency: ${scores.fluency}/100
- Completeness: ${scores.completeness}/100
- Prosody: ${scores.prosody}/100

WORDS NEEDING ATTENTION (scored below 80 or with errors):
${JSON.stringify(wordData, null, 2)}

TOTAL WORDS SPOKEN: ${assessment.words.length}
WORDS WITH ISSUES: ${wordData.length}

Provide detailed pronunciation coaching feedback.`;

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: prompt },
    ]);

    const text = result.response.text();
    const parsed = JSON.parse(text) as AIFeedback;

    // Validate the response has the expected shape
    if (!parsed.summary || !Array.isArray(parsed.strengths)) {
      throw new Error("Invalid feedback structure from LLM");
    }

    return parsed;
  } catch (err) {
    logger.error({ err }, "LLM feedback generation failed, using fallback");
    return generateFallbackFeedback(assessment, scores);
  }
}

/**
 * Deterministic fallback when the LLM is unavailable or returns bad data.
 * Ensures the user always gets some feedback, even without the LLM.
 */
function generateFallbackFeedback(
  assessment: AzureAssessmentResult,
  scores: AssessmentScores
): AIFeedback {
  const mispronounced = assessment.words.filter(
    (w) => w.errorType === "Mispronunciation"
  );
  const lowScoreWords = assessment.words
    .filter((w) => w.accuracyScore < 70)
    .sort((a, b) => a.accuracyScore - b.accuracyScore)
    .slice(0, 5);

  const summary =
    scores.overall >= 85
      ? "Great pronunciation overall! Your speech is clear and well-articulated with room for minor refinement."
      : scores.overall >= 65
        ? "Good effort! Your pronunciation is generally understandable with some areas that could use practice."
        : "Your pronunciation needs some work, but don't worry — consistent practice with the suggestions below will help you improve significantly.";

  const strengths: string[] = [];
  if (scores.fluency >= 75) strengths.push("Good speech rhythm and pacing");
  if (scores.prosody >= 75)
    strengths.push("Natural-sounding intonation patterns");
  if (mispronounced.length < 3)
    strengths.push("Most words pronounced correctly");
  if (strengths.length === 0)
    strengths.push(
      "Willingness to practice — that's the most important factor!"
    );

  const improvements = lowScoreWords.map((w) => ({
    word: w.word,
    issue: `Scored ${w.accuracyScore}/100 — ${w.errorType === "Mispronunciation" ? "mispronounced" : "unclear pronunciation"}`,
    suggestion: `Practice saying "${w.word}" slowly, focusing on each syllable clearly.`,
  }));

  return {
    summary,
    strengths,
    improvements,
    patterns:
      mispronounced.length > 2
        ? ["Multiple mispronunciations detected — focus on slow, deliberate practice"]
        : [],
    practiceTips: [
      "Record yourself reading a passage and compare with a native speaker recording",
      "Practice difficult words in isolation before using them in sentences",
      "Focus on vowel sounds — they carry most of the meaning in English",
    ],
  };
}
