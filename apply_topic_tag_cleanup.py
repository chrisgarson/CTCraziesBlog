"""Apply the approved Topic Tag Cleanup Part B mapping.

Default mode is a dry run. Add --apply to write changes.

The script updates article tag arrays in Search.tsx and all page files, moves
tag-index article associations from each retired source tag to its destination
tag, stores the retired source tag in the destination's `keywords` metadata,
and writes both tag-index.json copies.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import openpyxl


PROJECT = Path("/home/ubuntu/x-post-platform")
MAPPING_FILE = Path("/home/ubuntu/upload/CTCTagCleanupPartB08112026.xlsx")
SEARCH_FILE = PROJECT / "client/src/pages/Search.tsx"
PAGES_DIRECTORY = PROJECT / "client/src/pages"
INDEX_PATHS = [
    PROJECT / "client/src/data/tag-index.json",
    PROJECT / "client/public/tag-index.json",
]
APPLY = "--apply" in sys.argv


def read_mapping() -> dict[str, str]:
    workbook = openpyxl.load_workbook(MAPPING_FILE, data_only=True)
    worksheet = workbook.active
    mapping: dict[str, str] = {}

    for row in worksheet.iter_rows(values_only=True):
        source_tag = row[1] if len(row) > 1 else None
        target_tag = row[2] if len(row) > 2 else None
        if not source_tag or not target_tag or source_tag == "Moved/Deleted Topic Tags":
            continue
        source = str(source_tag).strip()
        target = str(target_tag).strip()
        if source in mapping:
            raise ValueError(f"Duplicate source tag in spreadsheet: {source}")
        mapping[source] = target

    if len(mapping) != 61:
        raise ValueError(f"Expected 61 approved mappings; found {len(mapping)}")
    return mapping


def transform_tag_list(tags: list[str], mapping: dict[str, str]) -> list[str]:
    """Replace retired tags with their root tag and remove duplicate tags."""
    transformed: list[str] = []
    for tag in tags:
        replacement = mapping.get(tag, tag)
        if replacement not in transformed:
            transformed.append(replacement)
    return transformed


def replace_json_tag_arrays(content: str, mapping: dict[str, str]) -> tuple[str, int]:
    """Update `"tags": [...]` arrays in Search.tsx."""
    replacements = 0

    def replacement(match: re.Match[str]) -> str:
        nonlocal replacements
        prefix, raw_tags = match.group(1), match.group(2)
        tags = json.loads(f"[{raw_tags}]")
        transformed = transform_tag_list(tags, mapping)
        if transformed != tags:
            replacements += 1
        return f"{prefix}{json.dumps(transformed, ensure_ascii=False)}"

    updated = re.sub(r'("tags"\s*:\s*)\[([^\]]*)\]', replacement, content)
    return updated, replacements


def replace_jsx_tag_arrays(content: str, mapping: dict[str, str]) -> tuple[str, int]:
    """Update `tags={[...]}` arrays in Home.tsx and Page*.tsx files."""
    replacements = 0

    def replacement(match: re.Match[str]) -> str:
        nonlocal replacements
        prefix, raw_tags, suffix = match.group(1), match.group(2), match.group(3)
        tags = json.loads(f"[{raw_tags}]")
        transformed = transform_tag_list(tags, mapping)
        if transformed != tags:
            replacements += 1
        return f"{prefix}{json.dumps(transformed, ensure_ascii=False)}{suffix}"

    updated = re.sub(r"(tags=\{)\[([^\]]*)\](\})", replacement, content)
    return updated, replacements


def article_key(article: dict) -> tuple[str, str, str]:
    return (
        str(article.get("tinyUrl") or ""),
        str(article.get("xPostUrl") or ""),
        str(article.get("headline") or ""),
    )


def merge_articles(existing: list[dict], moved: list[dict]) -> list[dict]:
    seen: set[tuple[str, str, str]] = set()
    merged: list[dict] = []
    for article in existing + moved:
        key = article_key(article)
        if key not in seen:
            seen.add(key)
            merged.append(article)
    return sorted(merged, key=lambda article: (article.get("page") or 9999, article.get("batchDate") or ""))


def update_index(index: dict[str, dict], mapping: dict[str, str]) -> tuple[dict[str, dict], int]:
    """Move associations and preserve retired labels as destination keywords."""
    updated = {tag: dict(entry) for tag, entry in index.items()}
    moved_associations = 0

    for source, target in mapping.items():
        source_entry = updated.get(source)
        target_entry = updated.get(target)
        if source_entry is None:
            raise ValueError(f"Source tag missing from index: {source}")
        if target_entry is None:
            raise ValueError(f"Destination tag missing from index: {target}")
        if source_entry.get("type") != "topic" or target_entry.get("type") != "topic":
            raise ValueError(f"Both tags must be topic tags: {source} -> {target}")

        source_articles = list(source_entry.get("articles", []))
        target_articles = list(target_entry.get("articles", []))
        moved_associations += len(source_articles)
        target_entry["articles"] = merge_articles(target_articles, source_articles)
        keywords = list(target_entry.get("keywords", []))
        if source not in keywords:
            keywords.append(source)
        target_entry["keywords"] = sorted(keywords, key=str.casefold)
        updated[target] = target_entry
        del updated[source]

    return dict(sorted(updated.items(), key=lambda item: item[0].casefold())), moved_associations


def main() -> None:
    mapping = read_mapping()
    with INDEX_PATHS[0].open(encoding="utf-8") as index_file:
        canonical_index = json.load(index_file)

    updated_index, moved_associations = update_index(canonical_index, mapping)
    topic_count = sum(1 for entry in updated_index.values() if entry.get("type") == "topic")
    person_count = sum(1 for entry in updated_index.values() if entry.get("type") == "person")

    search_content = SEARCH_FILE.read_text(encoding="utf-8")
    updated_search, search_arrays_changed = replace_json_tag_arrays(search_content, mapping)

    page_results: dict[Path, tuple[str, int]] = {}
    total_page_arrays_changed = 0
    for page_file in sorted(PAGES_DIRECTORY.glob("*.tsx")):
        if page_file.name not in {"Home.tsx"} and not re.fullmatch(r"Page\d+\.tsx", page_file.name):
            continue
        original = page_file.read_text(encoding="utf-8")
        updated, changed = replace_jsx_tag_arrays(original, mapping)
        page_results[page_file] = (updated, changed)
        total_page_arrays_changed += changed

    retired_still_active = sorted(set(mapping) & set(updated_index))
    missing_keywords = [source for source, target in mapping.items() if source not in updated_index[target].get("keywords", [])]

    print(f"Mode: {'APPLY' if APPLY else 'DRY RUN'}")
    print(f"Mappings: {len(mapping)}")
    print(f"Search.tsx article arrays changed: {search_arrays_changed}")
    print(f"Page-file article arrays changed: {total_page_arrays_changed}")
    print(f"Article-tag associations moved: {moved_associations}")
    print(f"Final tags: {len(updated_index)} total; {person_count} person; {topic_count} topic")
    print(f"Retired tags still active: {retired_still_active}")
    print(f"Retired tags missing as destination keywords: {missing_keywords}")

    if retired_still_active or missing_keywords or topic_count != 148 or person_count != 167:
        raise ValueError("Post-transformation validation failed")

    if not APPLY:
        print("Dry run passed. No files were changed.")
        return

    SEARCH_FILE.write_text(updated_search, encoding="utf-8")
    for page_file, (updated, _) in page_results.items():
        page_file.write_text(updated, encoding="utf-8")
    for index_path in INDEX_PATHS:
        index_path.write_text(json.dumps(updated_index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("Changes written to Search.tsx, all page files, and both tag-index.json copies.")


if __name__ == "__main__":
    main()
