import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY", "")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

with open("models.txt", "w", encoding="utf-8") as f:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            f.write(m.name + "\n")
