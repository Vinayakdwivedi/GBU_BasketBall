# fix_encoding.py
import json

try:
    with open('datadump.json', 'r', encoding='windows-1252') as f:
        content = f.read()

    with open('datadump.json', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Encoding fixed to UTF-8 successfully.")
except Exception as e:
    print(f"Error: {e}")
