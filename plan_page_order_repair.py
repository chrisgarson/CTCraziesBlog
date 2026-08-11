"""Read-only reconciliation of page blocks to the authoritative NUM-to-WebPage list."""

from __future__ import annotations

import html
import json
import re
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

import openpyxl


PROJECT = Path("/home/ubuntu/x-post-platform")
SOURCE = Path("/home/ubuntu/upload/AllArticlesListasof080102026.xlsx")
OUTPUT = Path("/home/ubuntu/page_order_repair_plan.json")
REPORT = Path("/home/ubuntu/page_order_repair_plan.txt")


def normalize(value: str | None) -> str:
    text = html.unescape(value or "")
    text = text.replace("\\\"", '"').replace("\\'", "'")
    text = unicodedata.normalize("NFKC", text)
    text = text.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    text = text.replace("–", "-").replace("—", "-").replace("…", "...")
    return " ".join(text.split()).casefold()


def comparison_key(value: str | None) -> str:
    return re.sub(r"[^a-z0-9]+", "", normalize(value))


def read_authoritative() -> list[dict]:
    workbook = openpyxl.load_workbook(SOURCE, data_only=True)
    worksheet = workbook.active
    articles = []
    for row in worksheet.iter_rows(values_only=True):
        if isinstance(row[0], int) and isinstance(row[1], int) and isinstance(row[2], str):
            articles.append({"num": row[0], "page": row[1], "headline": row[2]})
    if len(articles) != 1400:
        raise ValueError(f"Expected 1,400 authoritative articles; found {len(articles)}")
    return articles


def get_attribute(block: str, name: str) -> str | None:
    match = re.search(rf'{name}="((?:[^"\\]|\\.)*)"', block, re.DOTALL)
    return match.group(1) if match else None


def read_page_blocks() -> list[dict]:
    articles = []
    files = [(1, PROJECT / "client/src/pages/Home.tsx")] + [
        (page, PROJECT / f"client/src/pages/Page{page}.tsx") for page in range(2, 71)
    ]
    for current_page, path in files:
        content = path.read_text(encoding="utf-8")
        blocks = re.findall(r"\s*<ArticleBlock\b.*?/>", content, re.DOTALL)
        if len(blocks) != 20:
            raise ValueError(f"{path.name}: expected 20 ArticleBlock entries; found {len(blocks)}")
        for sequence, block in enumerate(blocks, start=1):
            headline = get_attribute(block, "headline")
            if not headline:
                raise ValueError(f"{path.name}, position {sequence}: missing headline")
            articles.append(
                {
                    "current_page": current_page,
                    "sequence": sequence,
                    "headline": headline,
                    "block": block,
                    "tinyUrl": get_attribute(block, "tinyUrl"),
                    "xPostUrl": get_attribute(block, "xPostUrl"),
                }
            )
    return articles


def reconcile(authoritative: list[dict], page_blocks: list[dict]) -> tuple[list[dict], list[dict]]:
    author_by_key = {normalize(article["headline"]): article for article in authoritative}
    unused_authoritative = {article["num"]: article for article in authoritative}
    resolved = []
    unmatched_current = []

    for page_block in page_blocks:
        direct = author_by_key.get(normalize(page_block["headline"]))
        if direct and direct["num"] in unused_authoritative:
            resolved.append({**page_block, **direct, "method": "exact", "score": 1.0})
            del unused_authoritative[direct["num"]]
        else:
            unmatched_current.append(page_block)

    remaining = list(unused_authoritative.values())
    unresolved = []
    for page_block in unmatched_current:
        source_key = comparison_key(page_block["headline"])
        ranked = sorted(
            (
                (
                    SequenceMatcher(None, source_key, comparison_key(candidate["headline"])).ratio(),
                    candidate,
                )
                for candidate in remaining
            ),
            key=lambda item: item[0],
            reverse=True,
        )
        best_score, best = ranked[0]
        next_score = ranked[1][0] if len(ranked) > 1 else 0.0
        # Accept only a clear, strong fuzzy identity match.
        if best_score >= 0.78 and best_score - next_score >= 0.06:
            resolved.append({**page_block, **best, "method": "fuzzy", "score": round(best_score, 4)})
            remaining.remove(best)
        else:
            unresolved_entry = {
                **page_block,
                "best_candidate": best,
                "best_score": round(best_score, 4),
                "next_score": round(next_score, 4),
            }
            unresolved.append(unresolved_entry)

    return resolved, unresolved


def main() -> None:
    authoritative = read_authoritative()
    page_blocks = read_page_blocks()
    resolved, unresolved = reconcile(authoritative, page_blocks)
    resolved.sort(key=lambda article: article["num"], reverse=True)

    expected_numbers = {article["num"] for article in authoritative}
    resolved_numbers = {article["num"] for article in resolved}
    missing_numbers = sorted(expected_numbers - resolved_numbers, reverse=True)

    plan = {
        "resolved": [
            {
                "num": article["num"],
                "target_page": article["page"],
                "current_page": article["current_page"],
                "sequence": article["sequence"],
                "headline": article["headline"],
                "current_headline": article["headline"],
                "tinyUrl": article["tinyUrl"],
                "xPostUrl": article["xPostUrl"],
                "method": article["method"],
                "score": article["score"],
            }
            for article in resolved
        ],
        "unresolved": [
            {
                "current_page": article["current_page"],
                "sequence": article["sequence"],
                "headline": article["headline"],
                "best_candidate": article.get("best_candidate"),
                "best_score": article.get("best_score"),
                "next_score": article.get("next_score"),
            }
            for article in unresolved
        ],
        "missing_authoritative_nums": missing_numbers,
    }
    OUTPUT.write_text(json.dumps(plan, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    with REPORT.open("w", encoding="utf-8") as report:
        report.write("PAGE ORDER REPAIR RECONCILIATION\n")
        report.write(f"Current page blocks: {len(page_blocks)}\n")
        report.write(f"Resolved: {len(resolved)}\n")
        report.write(f"  Exact headline matches: {sum(a['method'] == 'exact' for a in resolved)}\n")
        report.write(f"  Fuzzy headline matches: {sum(a['method'] == 'fuzzy' for a in resolved)}\n")
        report.write(f"Unresolved current page blocks: {len(unresolved)}\n")
        report.write(f"Unmatched authoritative NUMs: {len(missing_numbers)}\n")
        for article in unresolved[:100]:
            candidate = article.get("best_candidate") or {}
            report.write(
                f"UNRESOLVED page {article['current_page']} position {article['sequence']}: {article['headline']}\n"
                f"  candidate NUM {candidate.get('num')} page {candidate.get('page')} score {article.get('best_score')} / next {article.get('next_score')}: {candidate.get('headline')}\n"
            )

    print(f"Wrote {OUTPUT} and {REPORT}")
    print(f"Resolved {len(resolved)} of {len(page_blocks)} article blocks; unresolved {len(unresolved)}")


if __name__ == "__main__":
    main()
