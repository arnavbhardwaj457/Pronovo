# Pronovo — AI Pronunciation Assessment Platform

<div align="center">

# 🎙️ Pronovo

**Upload. Analyze. Improve.**

An AI-powered pronunciation assessment platform that delivers phoneme-level speech analysis, detailed scoring, and personalized coaching using **Azure Speech AI** and **Google Gemini**.

<p>

[![Live Demo](https://img.shields.io/badge/Live-Demo-4CAF50?style=for-the-badge)](https://pronovo-inky.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</p>

### 🌐 Live Demo

**https://pronovo-inky.vercel.app/**

</div>

---

# ✨ Features

### 🎯 AI Pronunciation Assessment

- Phoneme-level pronunciation analysis
- Word-level pronunciation scoring
- Real-time pronunciation feedback
- Multi-dimensional speech evaluation

### 📊 Comprehensive Scoring

Pronovo evaluates pronunciation across multiple dimensions:

- Accuracy
- Fluency
- Completeness
- Prosody
- Overall weighted score

### 🤖 AI-Powered Feedback

Google Gemini analyzes the speech assessment and provides:

- Personalized improvement tips
- Common pronunciation mistakes
- Strengths
- Weaknesses
- Practice recommendations

### 📝 Interactive Transcript

- Color-coded transcript
- Clickable words
- Phoneme breakdown
- Individual pronunciation scores

### 🔒 Privacy First

- Audio processed completely in memory
- No audio storage
- No database required
- DPDP-compliant architecture
- HTTPS everywhere

### 🎨 Modern User Experience

- Responsive design
- Dark / Light mode
- Smooth animations
- Accessible UI
- Mobile-friendly

---

# 🏗️ System Architecture

```text
                    User
                      │
                      ▼
        ┌────────────────────────┐
        │  Next.js Frontend      │
        │  Hosted on Vercel      │
        └───────────┬────────────┘
                    │ HTTPS
                    ▼
        ┌────────────────────────┐
        │ Express.js Backend     │
        │ Hosted on Render       │
        └───────────┬────────────┘
                    │
        ┌───────────┴────────────┐
        ▼                        ▼
 Azure Speech SDK          Google Gemini
 Pronunciation AI          AI Feedback
```

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| Backend | Express.js 5 |
| Language | TypeScript |
| Speech Engine | Azure Speech SDK |
| AI Feedback | Google Gemini 2.5 Flash |
| Hosting | Vercel + Render |

---

# 📁 Project Structure

```text
Pronovo
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── lib
│   │   └── types
│   └── ...
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   └── ...
│
└── docs
```

---

# 🚀 Live Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Speech Processing | Azure Speech |
| AI Analysis | Google Gemini |

### Live Application

https://pronovo-inky.vercel.app/

---

# 🚀 Getting Started

## Prerequisites

- Node.js 20+
- Azure Speech Service
- Google Gemini API Key

---

## Clone Repository

```bash
git clone https://github.com/arnavbhardwaj457/Pronovo.git

cd Pronovo
```

---

# Backend Setup

```bash
cd backend

npm install

cp .env.example .env
```

Add:

```env
AZURE_SPEECH_KEY=your_key
AZURE_SPEECH_REGION=centralindia
GEMINI_API_KEY=your_key

PORT=3001

CORS_ORIGIN=http://localhost:3000
```

Run

```bash
npm run dev
```

Backend runs on

```
http://localhost:3001
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Environment Variables

## Backend

```env
AZURE_SPEECH_KEY=

AZURE_SPEECH_REGION=centralindia

GEMINI_API_KEY=

PORT=3001

CORS_ORIGIN=http://localhost:3000
```

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production:

```env
NEXT_PUBLIC_API_URL=https://pronovo-api.onrender.com
```

---

# API Endpoints

## Health Check

```http
GET /api/health
```

Response

```json
{
  "status": "healthy"
}
```

---

## Pronunciation Assessment

```http
POST /api/assess
```

Upload an audio file using multipart/form-data.

Returns

- Overall Score
- Accuracy
- Fluency
- Completeness
- Prosody
- Transcript
- Word Analysis
- AI Feedback

---

# Privacy & Security

Pronovo is designed with privacy in mind.

✅ Audio processed entirely in memory

✅ No audio files stored

✅ No database required

✅ HTTPS enabled

✅ Azure Central India deployment

✅ DPDP-compliant architecture

---

# Performance

- ⚡ Server-side rendering with Next.js
- ⚡ Optimized TypeScript backend
- ⚡ In-memory audio processing
- ⚡ Automatic deployments with GitHub
- ⚡ Global CDN via Vercel

---

# Future Improvements

- User authentication
- Progress tracking dashboard
- Pronunciation history
- Multi-language support
- Speaking exercises
- Downloadable assessment reports

---

# License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

Made with ❤️ using **Next.js**, **TypeScript**, **Azure Speech AI**, and **Google Gemini**

</div>
