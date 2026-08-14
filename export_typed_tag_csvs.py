"""Export the typed CTCrazies tag index into separate person and topic CSV files."""

import csv
import json
from pathlib import Path


PROJECT = Path(__file__).resolve().parent
INDEX = PROJECT / "client" / "src" / "data" / "tag-index.json"


def export(output_dir: Path) -> tuple[Path, Path, int, int]:
    data = json.loads(INDEX.read_text(encoding="utf-8"))
    groups = {"person": [], "topic": []}
    for tag, entry in data.items():
        tag_type = entry.get("type")
        if tag_type not in groups:
            raise ValueError(f"Tag {tag!r} has an invalid type: {tag_type!r}")
        groups[tag_type].append({
            "Tag": tag,
            "Type": tag_type,
            "Article Count": len(entry.get("articles", [])),
            "Keywords": "; ".join(entry.get("keywords", [])),
        })

    output_dir.mkdir(parents=True, exist_ok=True)
    paths = {
        "person": output_dir / "ctcrazies_person_tags_2026-08-11.csv",
        "topic": output_dir / "ctcrazies_topic_tags_2026-08-11.csv",
    }
    for tag_type, path in paths.items():
        with path.open("w", newline="", encoding="utf-8-sig") as handle:
            writer = csv.DictWriter(handle, fieldnames=["Tag", "Type", "Article Count", "Keywords"])
            writer.writeheader()
            writer.writerows(sorted(groups[tag_type], key=lambda item: item["Tag"].casefold()))
    return paths["person"], paths["topic"], len(groups["person"]), len(groups["topic"])


def export_topic_tags_with_keywords(output_dir: Path) -> tuple[Path, int]:
    data = json.loads(INDEX.read_text(encoding="utf-8"))
    rows = []
    for tag, entry in data.items():
        if entry.get("type") != "topic":
            continue
        keywords = entry.get("keywords", [])
        if keywords:
            rows.append({"Topic Tag": tag, "Keywords": "; ".join(keywords)})

    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / "ctcrazies_topic_tags_with_keywords_2026-08-13.csv"
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=["Topic Tag", "Keywords"])
        writer.writeheader()
        writer.writerows(sorted(rows, key=lambda item: item["Topic Tag"].casefold()))
    return path, len(rows)


if __name__ == "__main__":
    person, topic, person_count, topic_count = export(Path("/home/ubuntu"))
    topic_keywords, topic_keywords_count = export_topic_tags_with_keywords(Path("/home/ubuntu"))
    print(f"Person tags: {person_count} → {person}")
    print(f"Topic tags: {topic_count} → {topic}")
    print(f"Topic tags with keywords: {topic_keywords_count} → {topic_keywords}")
