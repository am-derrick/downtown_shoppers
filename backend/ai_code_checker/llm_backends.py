import os
import json
from openai import OpenAI
import anthropic
from google import genai

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
claude_client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def query_agent(filename, file_content):
    print(f"🚀 Running query_agent on: {filename}")

    prompt = f"""
You are a code review assistant. Analyse the following file for:
If this file is a Python file and does not contain or is not accompanied by unit tests, mark "violation": true.
If any hardcoded numbers or configuration-like values are detected that are not clearly constants or environment-driven, mark "violation": true.

Filename: {filename}
Code:
\"\"\"
{file_content}
\"\"\"

Respond with a JSON object like:
{{"violation": true/false, "message": "If any issue found, describe it here."}}
"""
    choice = os.getenv("LLM_CHOICE") # Use env var and store your choices as either Claude, Openai or Gemini

    if not choice:
        choice = "Claude"

    if choice == "Claude":
        completion = claude_client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        content = completion.content

    elif choice == "Openai":
        completion = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
        )
        content = content = completion.choices[0].message.content

    else: #assume Gemini
        completion = gemini_client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                {"role": "user", "parts": [{"text": prompt}]}
            ]
        )
        content = completion.candidates[0].content.parts[0].text

    try:
        print("📨 Raw LLM Message:\n", content)
        return json.loads(content)
    except Exception as e:
        print("❌ Failed to parse LLM output", e)
        return {"violation": True, "message": "Could not parse model output."}
