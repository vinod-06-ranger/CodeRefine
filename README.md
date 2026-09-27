# CodeRefine 🔍

**CodeRefine** is an AI-powered developer tool that uses Google Gemini to analyze source code and provide feedback for code review, debugging, performance analysis, and refactoring.

The project combines a **React-based frontend** with a **FastAPI backend** and uses REST/JSON communication between the client and server.

> **Project status:** This is a student/learning project and is still under development.

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Code Review** | Analyzes submitted code, identifies potential issues, explains them, and suggests corrected code |
| 🐛 **Debug Assistant** | Uses Gemini to analyze code for possible bugs and provide debugging suggestions |
| 📊 **Performance Analysis** | Estimates time and space complexity and provides optimization suggestions |
| ✏️ **Code Rewriter** | Uses AI to refactor code into cleaner and more modern form |
| ▶️ **Output Simulation** | Uses an LLM prompt to simulate expected program output or an error trace |

## 🏗️ How It Works

```
User submits code
        ↓
React frontend
        ↓
REST / JSON request
        ↓
FastAPI backend
        ↓
Google Gemini API
        ↓
AI-generated analysis
        ↓
JSON response
        ↓
Frontend displays the result
```

## 🛠️ Tech Stack

### Frontend
- React
- JSX
- CSS
- React Router

### Backend
- Python
- FastAPI
- Uvicorn
- REST API
- CORS

### AI
- Google Gemini API
- Gemini 2.5 Flash

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend health check |
| POST | `/review` | Code review and correction suggestions |
| POST | `/debug` | Bug analysis and debugging suggestions |
| POST | `/compile` | AI-based output/error simulation |
| POST | `/performance` | Complexity and optimization analysis |
| POST | `/rewrite` | AI-based code refactoring |

### Request Format

```json
{
  "code": "your code here",
  "language": "Python"
}
```

### Example Performance Response

```json
{
  "time": "O(N)",
  "space": "O(1)",
  "score": 72,
  "suggestion": "Consider using a hash map to reduce time complexity."
}
```

## 📁 Current Repository Structure

```
CodeRefine/
├── main.py
├── App.jsx
├── App.css
├── main.jsx
├── index.css
└── README.md
```

> The repository is currently being reorganized into a cleaner frontend/backend structure. The React entry point references additional application components and pages that are part of the planned frontend structure.

## 🚀 Backend Setup

### Prerequisites

- Python 3.9+
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/vinod-06-ranger/CodeRefine.git
cd CodeRefine
```

### 2. Install backend dependencies

```bash
pip install fastapi uvicorn google-generativeai
```

### 3. Configure the Gemini API key

Do **not** commit your real API key to GitHub.

The backend should be configured with your Gemini API key through a secure environment variable or local configuration.

For local development, never replace the placeholder in the repository with a real key before committing.

### 4. Start the backend

```bash
uvicorn main:app --reload
```

The API will be available at:

```
http://localhost:8000
```

## ⚠️ Important Security Note

**Never expose your Gemini API key in source code or commit it to GitHub.**

If a key has previously been exposed, revoke it and create a new one.

For a production-ready implementation, the API key should be loaded from an environment variable and the `.env` file should be excluded through `.gitignore`.

## 🎯 What I Learned

This project explores:

- Building REST APIs with FastAPI
- Connecting a React frontend to a Python backend
- Working with JSON request/response data
- Integrating generative AI into an application
- Designing prompts for different developer-assistance tasks
- Returning structured AI-generated results
- Handling API errors and invalid requests
- Thinking about time and space complexity
- Refactoring and improving code with AI assistance

## 🔮 Future Improvements

- [ ] Complete and reorganize the React frontend
- [ ] Add proper frontend package configuration
- [ ] Move Gemini credentials fully to environment variables
- [ ] Add authentication and user accounts
- [ ] Add persistent analysis history
- [ ] Add support for more programming languages
- [ ] Add side-by-side code diff visualization
- [ ] Add automated backend tests
- [ ] Add rate limiting
- [ ] Add safer execution through a sandbox instead of AI-based output simulation
- [ ] Add deployment documentation
- [ ] Build a VS Code extension

## 👨‍💻 Author

**Vinod Kumar**  
B.Tech Computer Science Engineering Student

## 📄 License

This project is available for educational and portfolio purposes.
