import os
import openai

openai.api_key = os.getenv("OPEN_API_KEY")

def query_agent(filename, file_content):
    prompt = f"""
You are a code review assistant. Analyse the following file for:
- hardcoded numbers or secrets that should be config/databases-driven
- Deviations from documented architecture (ADR)
- Obvious security risks (e.g., SQL injection, exposed keys)

Filename: {filename}
Code:
\"\"\"
{file_content}
\"\"\"

Respond with a JSON object like:
{{"violation": true/false, "message": "If any issue found, describe it here."}}
"""
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )

    try:
        return eval(completion['choices'][0]['message']['content'])
    except:
        return {"violation": True, "message": "Could not parse model output."}