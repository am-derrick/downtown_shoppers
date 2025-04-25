import subprocess
from llm_backends import query_agent

def get_files():
    res = subprocess.run(
        ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
        capture_output=True, text=True
    )
    return [file for file in res.stdout.strip('\n') if file.endswith('.py')]

def run_checks():
    staged_files = get_files()
    for filepath in staged_files:
        with open(filepath, 'r') as file:
            content = file.read()

        response = query_agent(filepath, content)

        if response.get("violation"):
            print(f"\n❌ Issue in {filepath}: {response['message']}")
            exit(1)

    print("✅ AI checks passed. You're good to go!")

if __name__ == "__main__":
    run_checks()