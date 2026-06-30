import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

client = OpenAI(
    base_url = "https://openrouter.ai/api/v1",
    api_key = os.getenv("OPENROUTER_API_KEY")
)

class PostRequest(BaseModel):
    topic: str

@app.post("/generate-post")
def generate_post(request: PostRequest):
    response = client.chat.completions.create(
        model = "anthropic/claude-haiku-4-5",
        max_tokens = 500,
        messages = [
            {"role": "system", "content": "You are a social media expert. Generate engaging social media posts."},
            {"role": "user", "content": f"Write a professional LinkedIn post about: {request.topic}"}
        ]
    )
    
    return {"post": response.choices[0].message.content}