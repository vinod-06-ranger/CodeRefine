import json
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

# NOTE: Replace "YOUR_API_KEY" with your actual Gemini API key before running.
genai.configure(api_key="AIzaSyAL3LB_A5wgD0OcY5vY0Vr2y6EhNnyKXQ8")
model = genai.GenerativeModel("gemini-2.5-flash")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "CodeRefine backend running"}

@app.post("/review")
async def review_code(request: Request):
    try:
        data = await request.json()
    except:
        return {"feedback": "No JSON body received"}

    code = data.get("code")
    language = data.get("language", "Unknown")

    if not code:
        return {"feedback": "No code provided"}

    prompt = f"""
Analyze this code written in {language}.

1. Detect if the language is correct
2. Tell if the code is correct or incorrect
3. Explain the errors
4. Provide corrected code

Code:
{code}
"""
    try:
        response = model.generate_content(prompt)
        return {"feedback": response.text}
    except Exception as e:
        return {"feedback": str(e)}

@app.post("/debug")
async def debug_code(request: Request):
    try:
        data = await request.json()
        code = data.get("code")
        language = data.get("language", "Python")
        if not code: return {"feedback": "No code provided"}
        
        prompt = f"Analyze this {language} code for bugs. Provide a mock traceback error if there's a runtime issue, followed by a [CodeRefine AI Suggestion] explaining how to fix it with the specific line number.\n\nCode:\n{code}"
        response = model.generate_content(prompt)
        return {"feedback": response.text}
    except Exception as e:
        return {"feedback": str(e)}

@app.post("/compile")
async def compile_code(request: Request):
    try:
        data = await request.json()
        code = data.get("code")
        language = data.get("language", "Python")
        if not code: return {"feedback": "No code provided"}
        
        prompt = f"Act as a {language} compiler/interpreter. Run this code and provide ONLY the standard output or standard error terminal trace. Do not include markdown formatting, just the raw output text.\n\nCode:\n{code}"
        response = model.generate_content(prompt)
        return {"feedback": response.text.replace("```text", "").replace("```", "").strip()}
    except Exception as e:
        return {"feedback": str(e)}

@app.post("/performance")
async def optimize_code(request: Request):
    try:
        data = await request.json()
        code = data.get("code")
        language = data.get("language", "Python")
        if not code: return {"time": "N/A", "space": "N/A", "score": 0, "suggestion": "No code provided"}
        
        prompt = f"Analyze this {language} code's performance. Respond ONLY with a valid JSON strictly following this schema: {{\"time\": \"string (e.g. O(N))\", \"space\": \"string (e.g. O(1))\", \"score\": integer from 0-100, \"suggestion\": \"string (1-2 sentences on how to optimize)\"}}. \n\nCode:\n{code}"
        response = model.generate_content(prompt)
        
        # Parse the JSON string from Gemini (strip markdown if present)
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        try:
            perf_data = json.loads(response_text)
            return perf_data
        except:
            return {"time": "O(?)", "space": "O(?)", "score": 50, "suggestion": response.text}
            
    except Exception as e:
        return {"time": "Error", "space": "Error", "score": 0, "suggestion": str(e)}

@app.post("/rewrite")
async def rewrite_code(request: Request):
    try:
        data = await request.json()
        code = data.get("code")
        language = data.get("language", "Python")
        if not code: return {"feedback": "No code provided"}
        
        prompt = f"Rewrite and refactor this legacy {language} code into modern, clean standards. Apply best practices for {language}. Output ONLY the refactored code without conversational text.\n\nCode:\n{code}"
        response = model.generate_content(prompt)
        return {"feedback": response.text.replace("```" + language.lower(), "").replace("```", "").strip()}
    except Exception as e:
        return {"feedback": str(e)}