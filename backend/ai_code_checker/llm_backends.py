import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def query_agent(filename, file_content):
    print(f"🚀 Running query_agent on: {filename}")

    prompt = f"""
You are a code review assistant. Analyse the following file for:
- hardcoded numbers or secrets that should be config/databases-driven
- Deviations from documented architecture (ADR)
- Obvious security risks (e.g., SQL injection, exposed keys)
- Check for unit tests for each python file.

Filename: {filename}
Code:
\"\"\"
{file_content}
\"\"\"

Respond with a JSON object like:
{{"violation": true/false, "message": "If any issue found, describe it here."}}
"""
    completion = client.chat.completion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )

    try:
        content = completion.choices[0].message.content
        print("📨 Raw LLM Message:\n", content)
        return json.loads(content)
    except Exception as e:
        print("❌ Failed to parse LLM output", e)
        return {"violation": True, "message": "Could not parse model output."}
