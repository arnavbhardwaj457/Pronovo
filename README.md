# Pronovo — AI Pronunciation Assessment Platform

<div align="center">

**Upload. Analyze. Improve.**

A production-grade pronunciation assessment web application that provides phoneme-level feedback on English speech using Azure Speech AI and Google Gemini.

[Live Demo](https://pronovo.vercel.app) · [Architecture](./docs/ARCHITECTURE.md) · [API Docs](./docs/API.md)

</div>

---

## ✨ Features

- **Phoneme-Level Analysis** — Every sound individually scored using Azure Speech SDK's pronunciation assessment engine
- **Multi-Dimensional Scoring** — Accuracy, Fluency, Completeness, and Prosody scores with weighted composite
- **AI-Powered Coaching** — Personalized feedback from Google Gemini identifying patterns, strengths, and actionable improvement tips
- **Interactive Transcript** — Color-coded word display with clickable phoneme breakdowns
- **Privacy-First Architecture** — Audio processed in-memory, zero data retention, DPDP Act compliant
- **Modern UI** — Dark mode, responsive design, smooth animations, accessible components

## 🏗️ Architecture

```
┌─────────────────────┐     ┌─────────────────────────────────────┐
│   Next.js 15        │     │   Express.js API (Render)           │
│   Frontend (Vercel) │────▶│                                     │
│                     │     │   Upload → Validate → Azure Speech  │
│   - Landing Page    │     │   → Score Calculator → Gemini LLM   │
│   - Upload Zone     │     │   → Response                        │
│   - Results View    │     │                                     │
└─────────────────────┘     └──────────┬───────────┬──────────────┘
                                       │           │
                              ┌────────▼──┐  ┌─────▼────────┐
                              │ Azure     │  │ Google       │
                              │ Speech    │  │ Gemini 2.5   │
                              │ SDK       │  │ Flash        │
                              └───────────┘  └──────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 15 (App Router) | SSR for SEO, Server Components, Vercel-native |
| Styling | Tailwind CSS 4 + shadcn/ui | Component ownership, accessible primitives |
| Backend | Express.js 5 + TypeScript | Lightweight, handles long-running audio processing |
| Speech | Azure Speech SDK | Only API with native phoneme-level pronunciation scoring |
| AI Feedback | Google Gemini 2.5 Flash | Fastest, cheapest structured JSON output |
| Hosting | Vercel (frontend) + Render (backend) | Free tier, global CDN, auto-deploy |

## 📁 Project Structure

```
Pronovo/
├── frontend/          # Next.js 15 application
│   ├── src/
│   │   ├── app/       # App Router pages (landing, assess)
│   │   ├── components/# UI components (upload, results, shared)
│   │   ├── hooks/     # Custom hooks (useAssessment)
│   │   ├── lib/       # API client, utilities, constants
│   │   └── types/     # TypeScript types
│   └── ...
├── backend/           # Express.js API
│   ├── src/
│   │   ├── routes/    # API endpoints (assess, health)
│   │   ├── services/  # Azure Speech, Score Calculator, LLM
│   │   ├── middleware/ # Rate limiting, validation, errors
│   │   ├── config/    # Environment validation
│   │   └── utils/     # Logger, helpers
│   └── ...
└── docs/              # Architecture, API, DPDP compliance
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Azure Speech Service subscription key ([Get one free](https://azure.microsoft.com/en-us/products/ai-services/ai-speech))
- Google Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### Setup

```bash
# Clone
git clone https://github.com/yourusername/pronovo.git
cd pronovo

# Backend
cd backend
cp .env.example .env    # Fill in your API keys
npm install
npm run dev             # Starts on :3001

# Frontend (new terminal)
cd frontend
npm install
npm run dev             # Starts on :3000
```

### Environment Variables

**Backend** (`.env`):
```
AZURE_SPEECH_KEY=your_key
AZURE_SPEECH_REGION=centralindia
GEMINI_API_KEY=your_key
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## 🔒 Privacy & DPDP Compliance

- Audio is processed entirely **in-memory** — never written to disk or database
- Zero data retention — buffers are garbage collected after response
- HTTPS in transit via Vercel and Render
- Azure region set to `centralindia` for data residency
- Explicit consent required before upload
- Full compliance document: [DPDP_COMPLIANCE.md](./docs/DPDP_COMPLIANCE.md)

## 📄 License

MIT
