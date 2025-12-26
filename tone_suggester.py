import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(override=True)

client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=os.getenv("GITHUB_TOKEN"),
)

def get_tone_config(tone: str) -> dict:
    """Returns specialized persona and examples for each tone."""
    configs = {
        "polite": {
            "persona": "an empathetic mentor who uses warm, supportive language and gentle requests.",
            "examples": "Original: 'Fix the bug.' -> Refined: 'Would you mind taking a look at this bug when you have a moment? I'd really appreciate your help.'\nOriginal: 'I'm busy.' -> Refined: 'I'd love to help, but my schedule is currently quite full. Could we check back later?'"
        },
        "formal": {
            "persona": "a seasoned Executive Communications Director who prioritizes diplomacy, clarity, and professional structure.",
            "examples": "Original: 'I can't come.' -> Refined: 'Please accept my apologies, as I will be unable to attend the scheduled meeting due to a prior commitment.'\nOriginal: 'What do you want?' -> Refined: 'Could you please clarify the specific requirements or objectives you have in mind for this project?'"
        },
        "casual": {
            "persona": "a friendly colleague who uses natural speech, contractions, and a relaxed, approachable vibe.",
            "examples": "Original: 'I am finished.' -> Refined: 'All done! Just wrapped that up.'\nOriginal: 'Hello, how are you?' -> Refined: 'Hey! Hope you're having a good day.'"
        }
    }
    return configs.get(tone.lower(), configs["polite"])

def suggested_sentences(input_text: str, tone: str) -> str:
    config = get_tone_config(tone)
    
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    f"You are 'Echo', a sophisticated message refiner. Act as {config['persona']} "
                    "Your goal is to 'Garnish' the user's message—preserving their core intent and personal voice while adjusting the tone. "
                    "RULES: 1. DO NOT use generic AI words like 'delve', 'tapestry', or 'navigate'. "
                    "2. Vary sentence lengths for natural rhythm. "
                    "3. Use natural contractions (don't, it's) unless the tone is formal. "
                    "4. Output ONLY the refined text. No introductory filler like 'Here is your rewrite'."
                    "CRITICAL RULE: Never use em dashes (—). If a sentence requires a break or side thought, use commas, parentheses, or start a new sentence. Maintain a natural, human-like rhythm without relying on stylized punctuation"
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Follow this style logic:\n{config['examples']}\n\n"
                    f"Now, refine this message into a {tone} tone while keeping it personalized: '{input_text}'"
                ),
            },
        ],
        model=os.getenv("GITHUB_MODEL", "gpt-4.1"),
        temperature=0.4 # Slightly higher for more 'human' variation
    )
    return response.choices[0].message.content