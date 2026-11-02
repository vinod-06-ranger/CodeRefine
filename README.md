# CodeRefine 🔍

**CodeRefine** is an AI-powered developer tool that uses Google Gemini to analyze source code and provide real-time feedback for code review, debugging, performance analysis, syntax compilation output simulation, and refactoring.

The project combines a modern **React (Vite + Tailwind CSS) frontend** with a robust **FastAPI backend** using REST APIs for seamless communication.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Code Review & Analyzer** | Analyzes submitted code, identifies potential issues, explains bugs, and suggests corrected code. |
| 🐛 **Interactive Debugger** | Analyzes code for runtime bugs, generates simulated tracebacks, and provides line-by-line fix suggestions. |
| 📊 **Performance Profiler** | Estimates time and space complexity ($O(N)$, $O(1)$, etc.) and provides a performance score with optimization tips. |
| ✏️ **Code Rewriter** | Refactors legacy or messy code into clean, modern, and idiomatic standards. |
| ▶️ **Output & Error Simulator** | Simulates standard program execution output or compiler error traces. |

---

## 🏗️ Architecture

```
┌───────────────────────────────────────┐
│     CodeRefine React Frontend         │
│  (Vite + React Router + Tailwind CSS) │
└──────────────────┬────────────────────┘
                   │  HTTP / JSON
                   ▼
┌───────────────────────────────────────┐
│       FastAPI Python Backend          │
│        (Uvicorn + REST APIs)          │
└──────────────────┬────────────────────┘
                   │  Gemini SDK
                   ▼
┌───────────────────────────────────────┐
│       Google Gemini 2.5 Flash         │
│          (Generative AI)              │
└───────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
CodeRefine/
├── backend/
│   ├── main.py              # FastAPI application & Gemini API routes
│   ├── test_models.py       # Script to list available Gemini models
│   ├── models.txt           # Cache of verified Gemini models
│   ├── requirements.txt     # Python backend dependencies
│   ├── .env.example         # Template for environment variables
│   └── .env                 # Local secrets (git-ignored)
├── frontend/
│   ├── public/              # Static public assets
│   ├── src/
│   │   ├── assets/          # Component assets
│   │   ├── components/      # Reusable UI components (Navbar, etc.)
│   │   ├── pages/           # Application views (Analyzer, Debugger, Compiler, etc.)
│   │   ├── App.jsx          # Main application & routing setup
│   │   ├── App.css          # App styling
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Tailwind directives and global styles
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies and scripts
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── postcss.config.js    # PostCSS configuration
├── .gitignore               # Root git ignore rules
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+**
- **Node.js 18+** and **npm**
- **Google Gemini API Key** ([Get an API key here](https://aistudio.google.com/app/apikey))

---

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv .venv
   .venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and enter your Gemini API key:
     ```env
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

5. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend API will run at: `http://localhost:8000`

---

### 2. Frontend Setup

1. Open another terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check endpoint |
| `POST` | `/review` | Analyzes code for syntax, semantic errors, and corrections |
| `POST` | `/debug` | Debugs code and outputs mock tracebacks with actionable fixes |
| `POST` | `/compile` | Simulates program execution standard output / error trace |
| `POST` | `/performance` | Returns structured JSON with time/space complexity, score, and tips |
| `POST` | `/rewrite` | Refactors code into clean, modern standards |

---

## 🔒 Security Best Practices

- Never commit `.env` files or API keys to GitHub.
- Keep your keys safe using environment variables managed by `python-dotenv`.
- If an API key is ever exposed, revoke it immediately via [Google AI Studio](https://aistudio.google.com/).

---

## 👨‍💻 Author

**Vinod Kumar**  
GitHub: [@vinod-06-ranger](https://github.com/vinod-06-ranger)

