# Deployment Guide

## Frontend — Vercel

### Steps

1. Push the `frontend/` directory to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://pronovo-api.onrender.com` (your Render backend URL)
5. Deploy

### Notes
- Vercel auto-detects Next.js and handles all build configuration
- Custom domain can be added via Vercel dashboard
- Preview deployments are created automatically for pull requests

---

## Backend — Render

### Steps

1. Push the `backend/` directory to a GitHub repository
2. Go to [render.com](https://render.com) and create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Add environment variables:
   - `AZURE_SPEECH_KEY` = your Azure Speech subscription key
   - `AZURE_SPEECH_REGION` = `centralindia`
   - `GEMINI_API_KEY` = your Gemini API key
   - `PORT` = `3001`
   - `CORS_ORIGIN` = `https://pronovo.vercel.app` (your Vercel frontend URL)
   - `NODE_ENV` = `production`
6. Deploy

### Important: Cold Starts
Render free tier spins down services after 15 minutes of inactivity. The first request after spin-down takes 30-60 seconds. The frontend handles this with user-friendly messaging.

### Important: Timeouts
Render free tier has a 30-second request timeout by default. Audio processing typically completes in 15-25 seconds, which fits within this limit. If you encounter timeouts, consider upgrading to the paid tier ($7/month) which allows configurable timeouts.

---

## Azure Speech Service Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new **Speech Service** resource
3. Choose:
   - **Region**: Central India (for DPDP compliance)
   - **Pricing Tier**: F0 (Free — 5 hours/month)
4. Copy the **Key** and **Region** to your backend environment variables

---

## Google Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a new API key
3. Copy the key to your backend environment variables

---

## CORS Configuration

The backend's CORS origin must exactly match your frontend URL:
- Include the protocol (`https://`)
- Do NOT include a trailing slash
- For multiple origins, comma-separate them in the `CORS_ORIGIN` env var

---

## Verification Checklist

After deployment:

- [ ] Frontend loads at Vercel URL
- [ ] `/assess` page renders upload zone
- [ ] Backend health check responds: `GET {backend-url}/api/health`
- [ ] Upload a test audio file — receive assessment results
- [ ] HTTPS is active on both frontend and backend
- [ ] Dark mode / light mode toggle works
- [ ] Error states display correctly (try uploading a non-audio file)
