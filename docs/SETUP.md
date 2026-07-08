# Local Development Setup

## Prerequisites

- **Node.js 20+** ([Download](https://nodejs.org))
- **Azure Speech Service key** ([Create free](https://azure.microsoft.com/en-us/products/ai-services/ai-speech))
- **Google Gemini API key** ([Create free](https://aistudio.google.com/apikey))

## Setup Steps

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pronovo.git
cd pronovo
```

### 2. Backend setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` and fill in your API keys:
```
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=centralindia
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
# Server starts on http://localhost:3001
```

### 3. Frontend setup

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
# App starts on http://localhost:3000
```

### 4. Test

1. Open http://localhost:3000
2. Navigate to "Assess"
3. Upload a 30-45 second English audio recording
4. Wait for results (~15-25 seconds)

## Troubleshooting

| Issue | Solution |
|---|---|
| `AZURE_SPEECH_KEY is required` | Ensure `.env` file exists in `backend/` with valid keys |
| `CORS error in browser` | Check `CORS_ORIGIN` in `.env` matches `http://localhost:3000` |
| `No speech detected` | Ensure audio contains clear English speech, not silence |
| `Rate limit exceeded` | Wait 15 minutes or increase `RATE_LIMIT_MAX` in `.env` |
| `Timeout errors` | Audio processing takes 15-25s; ensure backend is running |

## Available Scripts

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload (tsx) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run typecheck` | Type check without building |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Create production build |
| `npm start` | Run production build locally |
| `npm run lint` | Run ESLint |
