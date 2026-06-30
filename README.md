# Digital FTE Agent 🤖

An AI-powered LinkedIn Post Generator built with Next.js and FastAPI.

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI
- **AI:** Claude AI via OpenRouter

## Features

- Generate professional LinkedIn posts from any topic
- Clean and responsive UI
- Copy generated post with one click

## Setup

### Backend
cd backend
uv venv
uv add fastapi uvicorn openai python-dotenv
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## Environment Variables
Create `.env` file in backend folder:
OPENROUTER_API_KEY=your_key_here