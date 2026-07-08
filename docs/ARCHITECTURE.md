# Architecture Document

## System Overview

Pronovo is a pronunciation assessment platform built as a **two-service architecture**: a Next.js frontend deployed on Vercel and an Express.js backend deployed on Render.

### Why Two Services?

Audio pronunciation assessment requires **15-25 seconds of server-side processing** (Azure Speech SDK continuous recognition + LLM feedback generation). Vercel's serverless functions have a 10-second timeout on the free tier. Separating the backend onto Render provides:

1. **Long-running request support** — No serverless timeout constraints
2. **Independent scaling** — Backend can scale separately from the frontend CDN
3. **Cost efficiency** — Render's free tier gives 750 compute hours vs. Vercel's limited function invocations

## Data Flow

```
User → Upload Audio File (multipart/form-data)
  → Express Backend receives file in memory (multer memoryStorage)
  → Rate limiter checks IP-based limits
  → Audio validator checks format, size, minimum size
  → Azure Speech SDK (continuous recognition mode)
    → Pronunciation assessment at phoneme granularity
    → Prosody assessment enabled
    → Returns: word scores, phoneme scores, fluency, completeness, prosody
  → Score Calculator
    → Weighted composite: 35% accuracy + 25% fluency + 20% completeness + 20% prosody
    → Word confidence bands: excellent/good/needs_work/poor
  → Gemini 2.5 Flash (LLM feedback)
    → Structured JSON prompt with word-level data
    → Returns: summary, strengths, improvements, patterns, practice tips
    → Falls back to deterministic feedback if LLM fails
  → JSON response to frontend
  → Audio buffer garbage collected (zero retention)
```

## Key Architectural Decisions

### 1. In-Memory Audio Processing (DPDP Compliance)
Audio files are held in Node.js Buffer objects during processing and are never written to disk, databases, or object storage. This eliminates the data retention surface entirely — after the HTTP response is sent, the buffer is eligible for garbage collection.

### 2. Unscripted Assessment Mode
Azure Speech SDK supports both "scripted" (reference text required) and "unscripted" (no reference text) modes. We use **unscripted mode** because:
- Users don't need to read a specific passage
- Azure performs both transcription and pronunciation scoring simultaneously
- More natural user experience

### 3. Continuous Recognition
For 30-45 second audio, Azure segments the audio into multiple recognition events. The backend aggregates scores across segments by averaging, which provides a more robust overall score than single-utterance assessment.

### 4. LLM with Deterministic Fallback
The Gemini integration has a full fallback path. If the LLM fails (rate limit, timeout, bad JSON), the system generates deterministic feedback based on the Azure scores alone. Users always receive feedback.

### 5. No Database, No Authentication
This is a deliberate architectural choice:
- **No accounts** = no PII storage = minimal DPDP scope
- **No history** = no retention obligations = simpler compliance
- The tradeoff is that users can't track progress over time (documented as a future improvement)

## Security

| Concern | Mitigation |
|---|---|
| API key exhaustion | Rate limiter: 20 requests per 15 minutes per IP |
| File upload attacks | Multer: 10MB limit, MIME type + extension validation, memory storage only |
| CORS | Restricted to the frontend domain only |
| Secrets | Environment variables, never committed to version control |
| XSS | Helmet security headers, React's built-in XSS protection |
| Stack trace leaks | Error handler strips details in production mode |

## Cost Analysis (Monthly)

| Service | Free Tier | Projected Cost |
|---|---|---|
| Vercel (frontend) | 100GB bandwidth | $0 |
| Render (backend) | 750 hours | $0 |
| Azure Speech | 5 hours/month | $0 (demo usage) |
| Gemini 2.5 Flash | Generous free tier | $0 (demo usage) |
| **Total** | | **$0** |

For production scale (1000 users/day):
- Azure: ~$30/month (estimated 30 audio hours)
- Gemini: ~$5/month (short structured outputs)
- Render Pro: $7/month (always-on, no cold starts)
- **Total: ~$42/month**
