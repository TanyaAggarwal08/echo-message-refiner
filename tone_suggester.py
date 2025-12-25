import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(override=True)

client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=os.getenv("GITHUB_TOKEN"),
)
def suggested_sentences(input_text: str, tone: str) -> str:
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content":"You are a professional text rewriter. Your ONLY job is to rewrite the user's text into the requested tone. Do not engage in conversation. Do not say. 'Here is your rewrite'. Just provide the rewritten text itself.",
            },
            {
                "role": "user",
                "content": f"Rewrite the following text in a {tone} tone: '{input_text}'",
            },
        ],
        model=os.getenv("GITHUB_MODEL", "gpt-4.1"),
        temperature=0.3
    )
    return response.choices[0].message.content
