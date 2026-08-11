import json
from pathlib import Path

namespace = {}
exec(Path("apply_topic_tag_cleanup.py").read_text(encoding="utf-8"), namespace)
mapping = namespace["read_mapping"]()

search = Path("client/src/pages/Search.tsx").read_text(encoding="utf-8")
page_files = [Path("client/src/pages/Home.tsx"), *sorted(Path("client/src/pages").glob("Page*.tsx"))]
pages = "\n".join(path.read_text(encoding="utf-8") for path in page_files)

remaining_search = [tag for tag in mapping if f'"{tag}"' in search]
remaining_pages = [tag for tag in mapping if f'"{tag}"' in pages]

for index_path in [
    Path("client/src/data/tag-index.json"),
    Path("client/public/tag-index.json"),
]:
    data = json.loads(index_path.read_text(encoding="utf-8"))
    person_count = sum(entry["type"] == "person" for entry in data.values())
    topic_count = sum(entry["type"] == "topic" for entry in data.values())
    print(f"{index_path}: {len(data)} total / {person_count} person / {topic_count} topic")

print("Retired tags still quoted in Search.tsx:", remaining_search)
print("Retired tags still quoted in page files:", remaining_pages)

if remaining_search or remaining_pages:
    raise SystemExit(1)

print("Topic tag cleanup validation passed.")
