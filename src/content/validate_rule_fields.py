# for custom rule field validations

import os

RULES_DIR = "rules/"

found_ids: list[int] = []
files = os.listdir(RULES_DIR)
for file in files:
    if not file.endswith(".mdx"):
        continue
    with open(RULES_DIR + file, encoding="utf-8") as f:
        filename = file[:-4].lower()
        lines = f.read().splitlines()
        if not lines[-1].startswith("- ") and not lines[-1].endswith("."):
            print("Missing period at end of file: " + file)
        for line in lines:
            if line.startswith("id:"):
                _, id_string = line.split("id:")
                rule_id = int(id_string.strip())
                found_ids.append(rule_id)
            if line.startswith("name:"):
                _, name_string = line.split("name:")
                rule_name = name_string.strip().lower().replace(" ", "-")
                if rule_name != filename:
                    print(f"Name mismatch: {filename} =/= {rule_name}")

for i in range(1, len(found_ids) + 1):
    if i not in found_ids:
        print(f"Missing ID: {i}")

if len(found_ids) > len(set(found_ids)):
    print("Found dupe IDs:")
    # duplicate ids: 9, 15, 32, 63, 158, 166
    for rule_id in found_ids:
        if found_ids.count(rule_id) > 1:
            print(f"  {rule_id}")
