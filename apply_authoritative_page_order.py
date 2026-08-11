"""Restore page order from AllArticlesListasof080102026.xlsx.

Default mode validates the plan only. Use --apply to write the page files,
Search.tsx page fields, and both tag-index.json copies.
"""

from __future__ import annotations

import html
import json
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

import openpyxl

from plan_page_order_repair import (
    PROJECT,
    SOURCE,
    comparison_key,
    get_attribute,
    normalize,
    read_authoritative,
    read_page_blocks,
)


APPLY = "--apply" in sys.argv
SEARCH_FILE = PROJECT / "client/src/pages/Search.tsx"
INDEX_PATHS = [
    PROJECT / "client/src/data/tag-index.json",
    PROJECT / "client/public/tag-index.json",
]
REPORT = Path("/home/ubuntu/authoritative_page_order_apply_report.txt")

# Both are already present in the current source, but their page-file headline
# strings cannot be matched automatically to Column C. URLs make the identity exact.
URL_OVERRIDES = {
    "https://tinyurl.com/2rjm8pf4": 1320,
    "https://tinyurl.com/mutsh9e2": 956,
}


def resolve_page_blocks() -> list[dict]:
    authoritative = read_authoritative()
    page_blocks = read_page_blocks()
    author_by_key = {normalize(article["headline"]): article for article in authoritative}
    unused = {article["num"]: article for article in authoritative}
    matched: list[dict] = []
    unmatched: list[dict] = []

    for block in page_blocks:
        article = author_by_key.get(normalize(block["headline"]))
        if article and article["num"] in unused:
            matched.append({**block, **article, "match_method": "exact"})
            del unused[article["num"]]
        else:
            unmatched.append(block)

    for block in unmatched:
        override_num = URL_OVERRIDES.get(block.get("tinyUrl") or "")
        if override_num is not None:
            article = unused.pop(override_num)
            matched.append({**block, **article, "match_method": "url_override"})
            continue

        source = comparison_key(block["headline"])
        candidates = sorted(
            (
                (SequenceMatcher(None, source, comparison_key(article["headline"])).ratio(), article)
                for article in unused.values()
            ),
            key=lambda item: item[0],
            reverse=True,
        )
        score, article = candidates[0]
        next_score = candidates[1][0] if len(candidates) > 1 else 0.0
        if score < 0.78 or score - next_score < 0.06:
            raise ValueError(
                f"Cannot safely reconcile page {block['current_page']} position {block['sequence']}: "
                f"{block['headline']!r}; best score={score:.4f}, next={next_score:.4f}"
            )
        del unused[article["num"]]
        matched.append({**block, **article, "match_method": f"fuzzy:{score:.4f}"})

    if unused or len(matched) != 1400:
        raise ValueError(f"Reconciliation incomplete: matched={len(matched)}, unmatched NUMs={sorted(unused)}")
    return matched


def find_search_records() -> dict[str, dict]:
    content = SEARCH_FILE.read_text(encoding="utf-8")
    start = content.find("const articles = [")
    end = content.find("\n];", start)
    section = content[start:end]
    records: dict[str, dict] = {}
    for block in re.findall(r"\{.*?\n  \}", section, re.DOTALL):
        tiny_url_match = re.search(r'"tinyUrl"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
        if not tiny_url_match:
            continue
        tiny_url = tiny_url_match.group(1)
        headline_match = re.search(r'"headline"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
        xpost_match = re.search(r'"xPostUrl"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
        image_match = re.search(r'"imageUrl"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
        tags_match = re.search(r'"tags"\s*:\s*\[([^\]]*)\]', block, re.DOTALL)
        records[tiny_url] = {
            "headline": headline_match.group(1) if headline_match else "",
            "xPostUrl": xpost_match.group(1) if xpost_match else "",
            "imageUrl": image_match.group(1) if image_match else "",
            "tags": json.loads(f"[{tags_match.group(1)}]") if tags_match else [],
        }
    return records


def render_repaired_block(article: dict, search_records: dict[str, dict]) -> str:
    """Use original JSX unchanged except for the one malformed legacy block."""
    if article.get("tinyUrl") != "https://tinyurl.com/2rjm8pf4":
        return article["block"].strip()

    record = search_records[article["tinyUrl"]]
    headline = html.escape(record["headline"], quote=True)
    tags = json.dumps(record["tags"], ensure_ascii=False)
    return (
        "<ArticleBlock\n"
        f'  headline="{headline}"\n'
        f'  tinyUrl="{article["tinyUrl"]}"\n'
        f'  xPostUrl="{record["xPostUrl"]}"\n'
        f'  imageSrc="{record["imageUrl"]}"\n'
        f"  tags={{{tags}}}\n"
        "/>"
    )


def replace_article_blocks(content: str, articles: list[dict]) -> str:
    matches = list(re.finditer(r"\s*<ArticleBlock\b.*?/>", content, re.DOTALL))
    if len(matches) != 20:
        raise ValueError(f"Expected 20 ArticleBlock entries; found {len(matches)}")
    rendered = "\n".join(
        "      " + render_repaired_block(article, SEARCH_RECORDS).replace("\n", "\n      ")
        for article in articles
    )
    return content[: matches[0].start()] + "\n" + rendered + content[matches[-1].end() :]


def update_search_pages(target_by_tiny: dict[str, int], target_by_xpost: dict[str, int]) -> tuple[str, int]:
    content = SEARCH_FILE.read_text(encoding="utf-8")
    start = content.find("const articles = [")
    end = content.find("\n];", start)
    prefix, section, suffix = content[:start], content[start:end], content[end:]
    blocks = list(re.finditer(r"\{.*?\n  \}", section, re.DOTALL))
    replacements = []
    for match in blocks:
        block = match.group(0)
        tiny_match = re.search(r'"tinyUrl"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
        xpost_match = re.search(r'"xPostUrl"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
        target = None
        if tiny_match:
            target = target_by_tiny.get(tiny_match.group(1))
        if target is None and xpost_match:
            target = target_by_xpost.get(xpost_match.group(1))
        if target is None:
            continue
        updated = re.sub(r'("page"\s*:\s*)\d+', rf'\g<1>{target}', block, count=1)
        replacements.append((match.start(), match.end(), updated))

    if len(replacements) != 1400:
        raise ValueError(f"Could not map all Search.tsx articles; mapped {len(replacements)}")
    for start_index, end_index, updated in reversed(replacements):
        section = section[:start_index] + updated + section[end_index:]
    return prefix + section + suffix, len(replacements)


def update_tag_indexes(target_by_tiny: dict[str, int], target_by_xpost: dict[str, int]) -> tuple[list[dict], int]:
    results = []
    for index_path in INDEX_PATHS:
        index = json.loads(index_path.read_text(encoding="utf-8"))
        updated_count = 0
        for entry in index.values():
            for article in entry.get("articles", []):
                target = target_by_tiny.get(article.get("tinyUrl") or "")
                if target is None:
                    target = target_by_xpost.get(article.get("xPostUrl") or "")
                if target is None:
                    raise ValueError(f"Tag-index article could not be mapped: {article.get('headline')}")
                if article.get("page") != target:
                    article["page"] = target
                    updated_count += 1
            entry["articles"].sort(
                key=lambda article: (article.get("page") or 9999, article.get("batchDate") or "")
            )
        results.append({"path": index_path, "index": index, "updated_count": updated_count})
    return results, sum(item["updated_count"] for item in results)


def main() -> None:
    global SEARCH_RECORDS
    reconciled = resolve_page_blocks()
    SEARCH_RECORDS = find_search_records()
    target_by_page = {page: [] for page in range(1, 71)}
    target_by_tiny: dict[str, int] = {}
    target_by_xpost: dict[str, int] = {}

    for article in reconciled:
        target_by_page[article["page"]].append(article)
        if article.get("tinyUrl"):
            target_by_tiny[article["tinyUrl"]] = article["page"]
        if article.get("xPostUrl"):
            target_by_xpost[article["xPostUrl"]] = article["page"]
    for page, articles in target_by_page.items():
        articles.sort(key=lambda article: article["num"], reverse=True)
        if len(articles) != 20:
            raise ValueError(f"Target page {page} has {len(articles)} articles, not 20")

    updated_search, search_updates = update_search_pages(target_by_tiny, target_by_xpost)
    updated_indexes, tag_page_updates = update_tag_indexes(target_by_tiny, target_by_xpost)

    file_changes = []
    for page in range(1, 71):
        path = PROJECT / "client/src/pages/Home.tsx" if page == 1 else PROJECT / f"client/src/pages/Page{page}.tsx"
        original = path.read_text(encoding="utf-8")
        updated = replace_article_blocks(original, target_by_page[page])
        if page != 1:
            updated = re.sub(r"currentPage=\{\d+\}", f"currentPage={{{page}}}", updated)
            updated = re.sub(r"totalPages=\{\d+\}", "totalPages={70}", updated)
        file_changes.append({"path": path, "content": updated})

    report_lines = [
        "AUTHORITATIVE PAGE ORDER REPAIR",
        f"Mode: {'APPLY' if APPLY else 'DRY RUN'}",
        f"Reconciled page blocks: {len(reconciled)}",
        f"Match methods: exact={sum(a['match_method'] == 'exact' for a in reconciled)}, "
        f"fuzzy={sum(a['match_method'].startswith('fuzzy') for a in reconciled)}, "
        f"URL override={sum(a['match_method'] == 'url_override' for a in reconciled)}",
        "Target page counts: " + ", ".join(f"{page}:{len(articles)}" for page, articles in target_by_page.items()),
        f"Search.tsx page fields mapped: {search_updates}",
        f"Tag-index article page fields updated: {tag_page_updates}",
    ]

    if APPLY:
        for change in file_changes:
            change["path"].write_text(change["content"], encoding="utf-8")
        SEARCH_FILE.write_text(updated_search, encoding="utf-8")
        for result in updated_indexes:
            result["path"].write_text(json.dumps(result["index"], indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        report_lines.append("Changes written to all 70 page files, Search.tsx, and both tag-index.json copies.")
    else:
        report_lines.append("Dry run passed. No files were changed.")

    REPORT.write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print("\n".join(report_lines))


if __name__ == "__main__":
    main()
