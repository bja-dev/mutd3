import csv
import json
from pathlib import Path

# takes csv, convert to json - NOTE: might not convert cleanly but we will see
INPUT_DIR = Path("./data")
OUTPUT_DIR = Path("./client/public/data")

for csv_path in INPUT_DIR.rglob("*.csv"):
    # retains subdirectories
    rel_path = csv_path.relative_to(INPUT_DIR)
    json_path = (OUTPUT_DIR / rel_path).with_suffix(".json")
    json_path.parent.mkdir(parents=True, exist_ok=True)

    with open(csv_path, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = list(csv_reader)

    with open(json_path, mode='w') as json_file:
        json.dump(data, json_file, indent=4)
