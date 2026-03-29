# CodeRefine[README.md](https://github.com/user-attachments/files/26330617/README.md)
# CodeRefine 🔍

> Paste your code. Get it reviewed, debugged, compiled, optimized, and rewritten — powered by Gemini AI.

CodeRefine is an AI-powered web app that acts as your personal code assistant. It analyzes your code across multiple dimensions and explains everything in plain, simple language — no confusing jargon.

---

## ✨ Features

| Feature | What it does |
|--------|--------------|
| 🔎 **Code Review** | Detects if the language is correct, checks for errors, explains them clearly, and provides corrected code |
| 🐛 **Debug Mode** | Finds runtime bugs, generates a mock traceback, and gives a fix suggestion with the exact line number |
| ▶️ **Compile / Run** | Simulates running your code and shows the expected terminal output or error — like a real compiler |
| 📊 **Performance Analysis** | Gives Time & Space complexity (Big O), a performance score (0–100), and optimization suggestions |
| ✏️ **Code Rewriter** | Refactors your legacy or messy code into clean, modern best practices for that language |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python, FastAPI |
| AI Engine | Google Gemini 2.5 Flash (`google-generativeai`) |
| Frontend | React + Vite |
| API Communication | REST (JSON) |
| CORS | Enabled for all origins |

---

## 📡 API Endpoints

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — confirms backend is running |
| `POST` | `/review` | Full code review with error detection and correction |
| `POST` | `/debug` | Bug analysis with traceback simulation and fix suggestions |
| `POST` | `/compile` | Simulates code execution and returns terminal output |
| `POST` | `/performance` | Returns time complexity, space complexity, score, and suggestions |
| `POST` | `/rewrite` | Refactors code into modern, clean standards |

### Request Body (for all POST endpoints)

```json
{
  "code": "your code here",
  "language": "Python"
}
```

### Example Response — `/performance`

```json
{
  "time": "O(N)",
  "space": "O(1)",
  "score": 72,
  "suggestion": "Consider using a hash map to reduce time complexity."
}
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js (v18+) for the frontend
- A valid **Google Gemini API Key**

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/code-refine.git
cd code-refine/backend

# Install dependencies
pip install fastapi uvicorn google-generativeai

# Add your Gemini API key in main.py
# genai.configure(api_key="YOUR_API_KEY")

# Run the server
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
code-refine/
├── backend/
│   └── main.py          # FastAPI backend with all AI endpoints
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

---

## ⚠️ Important Note

> **Never expose your API key publicly.**
> Before pushing to GitHub, move your Gemini API key to an `.env` file and add `.env` to `.gitignore`.

```bash
# .env
GEMINI_API_KEY=your_actual_key_here
```

---

## 🔮 Future Plans

- [ ] User authentication and saved history
- [ ] Support for more languages (Java, C++, JavaScript, etc.)
- [ ] Side-by-side diff view for rewritten code
- [ ] VS Code extension
- [ ] Dark / Light mode toggle
- [ ] Rate limiting and usage tracking

---

## 🙌 Author

Made by **Vinod** — B.Tech CSE Student, Hyderabad

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
