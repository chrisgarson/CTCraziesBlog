"""Read-only comparison of the authoritative NUM/WebPage spreadsheet with site data."""

from __future__ import annotations

import html
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

import openpyxl


PROJECT = Path("/home/ubuntu/x-post-platform")
SOURCE = Path("/home/ubuntu/upload/AllArticlesListasof080102026.xlsx")
OUTPUT = Path("/home/ubuntu/authoritative_page_order_audit.txt")


def normalize(value: str | None) -> str:
    text = html.unescape(value or "")
    text = text.replace("\\\"", '"').replace("\\'", "'")
    text = unicodedata.normalize("NFKC", text)
    text = text.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    text = text.replace("–", "-").replace("—", "-").replace("…", "...")
    text = " ".join(text.split())
    return text.casefold()


def read_authoritative_mapping() -> tuple[dict[str, tuple[int, int, str]], list[str]]:
    workbook = openpyxl.load_workbook(SOURCE, data_only=True)
    worksheet = workbook.active
    by_headline: dict[str, tuple[int, int, str]] = {}
    problems: list[str] = []

    for row in worksheet.iter_rows(values_only=True):
        if not isinstance(row[0], int):
            continue
        num, page, headline = row[0], row[1], row[2]
        if not isinstance(page, int) or not isinstance(headline, str):
            problems.append(f"Invalid authoritative row: NUM={num}, page={page}, headline={headline!r}")
            continue
        key = normalize(headline)
        if key in by_headline:
            problems.append(f"Duplicate authoritative headline: NUM {num} and NUM {by_headline[key][0]}")
        by_headline[key] = (num, page, headline)
    return by_headline, problems


def read_page_headlines(path: Path) -> list[str]:
    content = path.read_text(encoding="utf-8")
    return re.findall(r'headline="((?:[^"\\]|\\.)*)"', content)


def read_search_entries() -> list[tuple[str, int | None]]:
    content = (PROJECT / "client/src/pages/Search.tsx").read_text(encoding="utf-8")
    array_start = content.find("const articles = [")
    array_end = content.find("\n];", array_start)
    section = content[array_start:array_end]
    entries = []
    for match in re.finditer(r'\{\s*"headline"\s*:\s*"((?:[^"\\]|\\.)*)"(?:(?!\n\s*\{).)*?"page"\s*:\s*(\d+)', section, re.DOTALL):
        entries.append((match.group(1), int(match.group(2))))
    return entries


def main() -> None:
    authoritative, spreadsheet_problems = read_authoritative_mapping()
    page_assignment: dict[str, list[tuple[int, str]]] = defaultdict(list)
    page_counts: dict[int, int] = {}

    home_path = PROJECT / "client/src/pages/Home.tsx"
    for page, path in [(1, home_path), *[(page, PROJECT / f"client/src/pages/Page{page}.tsx") for page in range(2, 71)]]:
        headlines = read_page_headlines(path) if path.exists() else []
        page_counts[page] = len(headlines)
        for headline in headlines:
            page_assignment[normalize(headline)].append((page, headline))

    missing_from_pages = []
    wrong_page_files = []
    duplicate_in_pages = []
    unrecognized_page_headlines = []
    page_move_counts: dict[int, Counter[int]] = defaultdict(Counter)
    for key, (num, expected_page, authoritative_headline) in authoritative.items():
        locations = page_assignment.get(key, [])
        if not locations:
            missing_from_pages.append((num, expected_page, authoritative_headline))
        elif len(locations) > 1:
            duplicate_in_pages.append((num, expected_page, locations))
        elif locations[0][0] != expected_page:
            wrong_page_files.append((num, expected_page, locations[0][0], authoritative_headline))
            page_move_counts[locations[0][0]][expected_page] += 1

    for key, locations in page_assignment.items():
        if key not in authoritative:
            for page, headline in locations:
                unrecognized_page_headlines.append((page, headline))

    search_entries = read_search_entries()
    search_assignment: dict[str, list[int]] = defaultdict(list)
    for headline, page in search_entries:
        search_assignment[normalize(headline)].append(page)

    missing_from_search = []
    wrong_search_pages = []
    duplicate_in_search = []
    for key, (num, expected_page, authoritative_headline) in authoritative.items():
        pages = search_assignment.get(key, [])
        if not pages:
            missing_from_search.append((num, expected_page, authoritative_headline))
        elif len(pages) > 1:
            duplicate_in_search.append((num, expected_page, pages))
        elif pages[0] != expected_page:
            wrong_search_pages.append((num, expected_page, pages[0], authoritative_headline))

    with OUTPUT.open("w", encoding="utf-8") as report:
        report.write("AUTHORITATIVE PAGE ORDER AUDIT\n")
        report.write(f"Authoritative articles: {len(authoritative)}\n")
        report.write(f"Expected pages: 70, expected articles per page: 20\n")
        report.write(f"Spreadsheet validation issues: {len(spreadsheet_problems)}\n")
        for problem in spreadsheet_problems[:20]:
            report.write(f"  - {problem}\n")
        report.write("\nCURRENT PAGE FILES\n")
        report.write(f"Page counts other than 20: {[(page, count) for page, count in page_counts.items() if count != 20]}\n")
        report.write(f"Missing authoritative articles: {len(missing_from_pages)}\n")
        report.write(f"Wrong page-file assignments: {len(wrong_page_files)}\n")
        report.write(f"Duplicate authoritative articles in page files: {len(duplicate_in_pages)}\n")
        report.write(f"Page-file headlines not matched to spreadsheet: {len(unrecognized_page_headlines)}\n")
        for num, expected, actual, headline in wrong_page_files[:30]:
            report.write(f"  WRONG_PAGE_FILE NUM {num}: expected {expected}, found {actual} | {headline}\n")
        for num, expected, headline in missing_from_pages[:30]:
            report.write(f"  MISSING_PAGE_FILE NUM {num}: expected {expected} | {headline}\n")
        report.write("\nCURRENT-PAGE TO AUTHORITATIVE-PAGE DISTRIBUTION\n")
        for current_page in sorted(page_move_counts):
            destinations = ", ".join(
                f"{expected_page} ({count})"
                for expected_page, count in page_move_counts[current_page].most_common()
            )
            report.write(f"  Current page {current_page} -> expected page {destinations}\n")

        report.write("\nCURRENT SEARCH INDEX\n")
        report.write(f"Search entries parsed: {len(search_entries)}\n")
        report.write(f"Missing authoritative articles: {len(missing_from_search)}\n")
        report.write(f"Wrong Search.tsx page assignments: {len(wrong_search_pages)}\n")
        report.write(f"Duplicate authoritative articles in Search.tsx: {len(duplicate_in_search)}\n")
        for num, expected, actual, headline in wrong_search_pages[:30]:
            report.write(f"  WRONG_SEARCH_PAGE NUM {num}: expected {expected}, found {actual} | {headline}\n")
        for num, expected, headline in missing_from_search[:30]:
            report.write(f"  MISSING_SEARCH NUM {num}: expected {expected} | {headline}\n")

        report.write("\nAUTHORITATIVE PAGE DISTRIBUTION\n")
        expected_counts = Counter(page for _, page, _ in authoritative.values())
        report.write(f"Pages other than 20 articles: {[(page, expected_counts[page]) for page in sorted(expected_counts) if expected_counts[page] != 20]}\n")

    print(f"Wrote audit to {OUTPUT}")


if __name__ == "__main__":
    main()
