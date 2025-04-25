import os
from openai import OpenAI

OpenAI.api_key = os.getenv("OPEN_API_KEY")
client = OpenAI.api_key

def query_agent(filename, file_content):
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

    print("💬 Prompt Sent:\n", prompt)
    print("📨 LLM Response:\n", completion)

    try:
        return eval(completion['choices'][0]['message']['content'])
    except:
        return {"violation": True, "message": "Could not parse model output."}
