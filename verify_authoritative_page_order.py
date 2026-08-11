"""Verify the applied authoritative NUM-to-WebPage repair without making changes."""

from __future__ import annotations

import json
from pathlib import Path

from apply_authoritative_page_order import (
    INDEX_PATHS,
    PROJECT,
    SEARCH_FILE,
    resolve_page_blocks,
    update_search_pages,
)


REPORT = Path("/home/ubuntu/authoritative_page_order_verification.txt")


def main() -> None:
    articles = resolve_page_blocks()
    page_counts = {page: 0 for page in range(1, 71)}
    wrong_page_blocks = []
    target_by_tiny = {}
    target_by_xpost = {}

    for article in articles:
        page_counts[article["current_page"]] += 1
        if article["current_page"] != article["page"]:
            wrong_page_blocks.append(article)
        if article.get("tinyUrl"):
            target_by_tiny[article["tinyUrl"]] = article["page"]
        if article.get("xPostUrl"):
            target_by_xpost[article["xPostUrl"]] = article["page"]

    original_search = SEARCH_FILE.read_text(encoding="utf-8")
    expected_search, mapped_search = update_search_pages(target_by_tiny, target_by_xpost)
    search_matches = original_search == expected_search

    tag_index_errors = []
    tag_index_counts = []
    for index_path in INDEX_PATHS:
        index = json.loads(index_path.read_text(encoding="utf-8"))
        article_associations = 0
        for tag, entry in index.items():
            for article in entry.get("articles", []):
                article_associations += 1
                target = target_by_tiny.get(article.get("tinyUrl") or "")
                if target is None:
                    target = target_by_xpost.get(article.get("xPostUrl") or "")
                if target is None or article.get("page") != target:
                    tag_index_errors.append((str(index_path), tag, article.get("headline"), article.get("page"), target))
        tag_index_counts.append((str(index_path), len(index), article_associations))

    page_ranges = {
        page: sorted((article["num"] for article in articles if article["current_page"] == page), reverse=True)
        for page in range(1, 71)
    }
    range_errors = [
        (page, numbers)
        for page, numbers in page_ranges.items()
        if numbers != list(
            range(1400 - (page - 1) * 20, 1400 - (page - 1) * 20 - 20, -1)
        )
    ]

    lines = [
        "AUTHORITATIVE PAGE ORDER VERIFICATION",
        f"Reconciled articles: {len(articles)}",
        f"Pages with non-20 count: {[(page, count) for page, count in page_counts.items() if count != 20]}",
        f"Page blocks on wrong authoritative page: {len(wrong_page_blocks)}",
        f"Page NUM-range errors: {len(range_errors)}",
        f"Search.tsx entries mapped: {mapped_search}",
        f"Search.tsx exactly matches authoritative page mapping: {search_matches}",
        f"Tag-index page-link errors: {len(tag_index_errors)}",
    ]
    for index_path, tag_count, associations in tag_index_counts:
        lines.append(f"{index_path}: {tag_count} tags / {associations} article-tag associations")
    lines.append(f"Page 1 NUM range: {page_ranges[1][0]}-{page_ranges[1][-1]}")
    lines.append(f"Page 2 NUM range: {page_ranges[2][0]}-{page_ranges[2][-1]}")
    lines.append(f"Page 70 NUM range: {page_ranges[70][0]}-{page_ranges[70][-1]}")

    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))

    if wrong_page_blocks or range_errors or not search_matches or tag_index_errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
