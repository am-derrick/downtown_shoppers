import subprocess
import os
from llm_backends import query_agent

DEFAULT_IGNORED_FILES = [
    ".aiignore",
    ".gitignore",
    ".editorconfig",
    ".prettierignore",
]

def load_ignored_list(filepath=".aiignore"):
    ignore_list = DEFAULT_IGNORED_FILES.copy()
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    ignore_list.append(line)
    return ignore_list

def get_staged_files():
    result = subprocess.run(
        ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
        capture_output=True, text=True
    )
    files = result.stdout.strip().split('\n')
    return [f for f in files if f.endswith('.py') and os.path.exists(f)]

def is_ignored(filepath, ignore_list):
    for ignored in ignore_list:
        if filepath.startswith(ignored):
            return True
    return False

def run():
    print("⚙️  AI Code Checker starting...")

    ignore_list = load_ignored_list()
    staged_files = get_staged_files()

    if not staged_files:
        print("📭 No staged Python files to check.")
        return

    for filepath in staged_files:
        if is_ignored(filepath, ignore_list):
            print(f"⏭️ Skipping ignored file: {filepath}")
            continue

        print(f"📂 Checking {filepath}...")
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        result = query_agent(filepath, content)
        print("🔍 Agent result:", result)

        if result.get("violation", False):
            print("❌ AI Agent flagged an issue!")
            print("📣 Message:", result.get("message", "No message provided."))
            exit(1)

    print("✅ AI Code Checker passed!")

if __name__ == "__main__":
    run()