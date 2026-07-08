# API Documentation

## Base URL

- **Development**: `http://localhost:3001`
- **Production**: `https://pronovo-api.onrender.com`

---

## Endpoints

### GET /api/health

Returns service health status and dependency readiness.

**Response** `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2026-07-08T12:00:00.000Z",
  "uptime": 3600.5,
  "version": "1.0.0",
  "dependencies": {
    "azureSpeech": true,
    "gemini": true
  }
}
```

---

### POST /api/assess

Upload an audio file for pronunciation assessment.

**Request**
- Content-Type: `multipart/form-data`
- Field: `audio` (File)
- Supported formats: WAV, MP3, M4A, WebM, OGG, FLAC
- Max file size: 10MB
- Recommended duration: 30-45 seconds

**Response** `200 OK`
```json
{
  "scores": {
    "overall": 78.5,
    "accuracy": 82.3,
    "fluency": 75.0,
    "completeness": 90.0,
    "prosody": 65.2
  },
  "words": [
    {
      "word": "pronunciation",
      "accuracyScore": 65.0,
      "errorType": "Mispronunciation",
      "confidence": "needs_work",
      "phonemes": [
        {
          "phoneme": "p",
          "accuracyScore": 95.0
        },
        {
          "phoneme": "r",
          "accuracyScore": 45.0,
          "nbestPhonemes": [
            { "phoneme": "r", "score": 45.0 },
            { "phoneme": "w", "score": 30.0 }
          ]
        }
      ],
      "offset": 1200,
      "duration": 800
    }
  ],
  "transcript": "The quick brown fox jumps over the lazy dog",
  "feedback": {
    "summary": "Good pronunciation overall with some areas for improvement...",
    "strengths": [
      "Clear vowel sounds",
      "Good speech rhythm"
    ],
    "improvements": [
      {
        "word": "pronunciation",
        "issue": "The 'r' sound was substituted",
        "suggestion": "Curl your tongue tip slightly..."
      }
    ],
    "patterns": [
      "Consistent difficulty with 'r' sounds"
    ],
    "practiceTips": [
      "Practice minimal pairs: right/light, red/led"
    ]
  },
  "metadata": {
    "audioDurationMs": 32500,
    "processedAt": "2026-07-08T12:00:15.000Z",
    "modelVersion": "1.0.0"
  }
}
```

**Error Responses**

`400 Bad Request` — Invalid input
```json
{
  "error": "No audio file provided",
  "code": "MISSING_AUDIO",
  "details": "Upload an audio file using the 'audio' form field"
}
```

`429 Too Many Requests` — Rate limit exceeded
```json
{
  "error": "Too many requests. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

`500 Internal Server Error` — Server error
```json
{
  "error": "An unexpected error occurred",
  "code": "INTERNAL_ERROR"
}
```

---

## Rate Limiting

- **Window**: 15 minutes
- **Max requests**: 20 per IP
- **Headers**: Uses `RateLimit-*` headers (draft-7 standard)

## Types

See `backend/src/types/assessment.ts` for full TypeScript type definitions.
