#!/usr/bin/env python3.11
"""
rebuild_search.py — Validation and Search Index Integrity Tool
==============================================================
Run this script after EVERY batch to validate and rebuild Search.tsx and tag-index.json.

Checks performed:
  1. Article count: every page file has exactly 20 articles
  2. Page continuity: no missing page numbers between 1 and N
  3. Search.tsx completeness: every page file article appears in Search.tsx
  4. Search.tsx page numbers: Search.tsx page numbers match actual page files
  5. Total count consistency: Search.tsx total == sum of all page file articles
  6. Search.tsx page count: each page has exactly 20 articles in Search.tsx

If ANY check fails, the script prints a detailed error report and exits with code 1.
A non-zero exit code BLOCKS publishing — do not publish until all checks pass.

Usage:
  python3.11 rebuild_search.py           # validate only
  python3.11 rebuild_search.py --rebuild # validate AND rebuild tag-index.json from scratch
"""

import re, html, json, os, sys
from collections import Counter, defaultdict

PAGES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'client/src/pages')
SEARCH_FILE = os.path.join(PAGES_DIR, 'Search.tsx')
TAG_INDEX_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'client/src/data/tag-index.json')

REBUILD_MODE = '--rebuild' in sys.argv

# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────

def get_page_files():
    """Return sorted list of (page_num, filename) for all page files."""
    files = []
    for f in os.listdir(PAGES_DIR):
        if f == 'Home.tsx':
            files.append((1, f))
        elif re.match(r'Page(\d+)\.tsx', f):
            n = int(re.match(r'Page(\d+)\.tsx', f).group(1))
            files.append((n, f))
    return sorted(files)

def extract_articles_from_file(filepath):
    """Extract all ArticleBlock entries from a page file. Returns list of dicts."""
    content = open(filepath, encoding='utf-8').read()
    articles = []
    blocks = re.findall(
        r'<ArticleBlock\b[^>]*?headline="([^"]*)"[^>]*?tinyUrl="([^"]*)"[^>]*?xPostUrl="([^"]*)"[^>]*?imageSrc="([^"]*)"[^>]*?tags=\{\[([^\]]*)\]\}',
        content, re.DOTALL
    )
    for headline, tiny, xpost, img, tags_raw in blocks:
        tags = re.findall(r'"([^"]+)"', tags_raw)
        # Normalize: decode HTML entities, collapse multiple spaces
        h = html.unescape(headline)
        h = re.sub(r'  +', ' ', h)
        articles.append({
            'headline': h,
            'tinyUrl': tiny,
            'xPostUrl': xpost,
            'imageUrl': img,
            'tags': tags,
        })
    return articles

def extract_search_articles():
    """
    Extract all articles from Search.tsx.
    Handles two formats:
      - New format: headline, tinyUrl, xPostUrl, imageUrl, tags, page, batchDate
      - Old format: headline, tinyUrl, xPostUrl, page, batchDate (no imageUrl/tags)
    Returns list of dicts with at minimum: headline, tinyUrl, xPostUrl, page, batchDate
    """
    content = open(SEARCH_FILE, encoding='utf-8').read()
    articles = []

    # Use a broad pattern: find each { ... } block in the articles array
    # Split on top-level objects by finding { ... } blocks
    # Strategy: find all "page": N occurrences and extract surrounding object
    
    # Find all object boundaries by scanning for opening { before each "headline"
    # More robust: use the fact that each entry starts with { and ends with }
    # and contains "page": N
    
    # Extract using a pattern that captures the essential fields regardless of order
    # Match objects that have at minimum headline + page + batchDate
    obj_pattern = re.compile(
        r'\{\s*"headline":\s*"((?:[^"\\]|\\.)*)"\s*,'  # headline (required)
        r'(?:.*?)'                                        # any fields in between
        r'"page":\s*(\d+)\s*,'                           # page (required)
        r'\s*"batchDate":\s*"([^"]*)"'                   # batchDate (required)
        r'\s*\}',
        re.DOTALL
    )
    
    for m in obj_pattern.finditer(content):
        raw_headline = m.group(1)
        page = int(m.group(2))
        batch_date = m.group(3)
        
        # Unescape JSON string escapes
        headline = raw_headline.replace('\\"', '"').replace("\\'"  , "'").replace('\\\\', '\\')
        # Decode \uXXXX sequences stored as literal backslash-u (e.g. \u2014 = em-dash)
        headline = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), headline)
        headline = html.unescape(headline)
        # Normalize multiple spaces to single space
        headline = re.sub(r'  +', ' ', headline)
        
        articles.append({
            'headline': headline,
            'page': page,
            'batchDate': batch_date,
        })
    
    return articles

# ─────────────────────────────────────────────
# VALIDATION CHECKS
# ─────────────────────────────────────────────

def run_validation():
    errors = []

    page_files = get_page_files()
    if not page_files:
        errors.append("FATAL: No page files found in " + PAGES_DIR)
        return errors, {}, [], 0

    total_pages = max(p for p, _ in page_files)
    print(f"Found {len(page_files)} page files (pages 1–{total_pages})")

    # ── CHECK 1: Every page file has exactly 20 articles ──
    print("\n[CHECK 1] Article count per page file...")
    file_articles = {}  # page_num -> list of article dicts
    for page_num, fname in page_files:
        filepath = os.path.join(PAGES_DIR, fname)
        articles = extract_articles_from_file(filepath)
        file_articles[page_num] = articles
        if len(articles) != 20:
            errors.append(f"  FAIL Page {page_num} ({fname}): {len(articles)} articles (expected 20)")
    ok_count = sum(1 for pg, _ in page_files if len(file_articles[pg]) == 20)
    print(f"  {ok_count}/{len(page_files)} pages have exactly 20 articles")

    # ── CHECK 2: No missing page numbers ──
    print("\n[CHECK 2] Page number continuity...")
    present_pages = set(p for p, _ in page_files)
    missing_pages = [p for p in range(1, total_pages + 1) if p not in present_pages]
    if missing_pages:
        errors.append(f"  FAIL Missing page files: {missing_pages}")
    else:
        print(f"  OK: Pages 1–{total_pages} all present")

    # ── CHECK 3 & 4: Search.tsx completeness and page number accuracy ──
    print("\n[CHECK 3 & 4] Search.tsx completeness and page number accuracy...")
    search_articles = extract_search_articles()
    search_total = len(search_articles)
    file_total = sum(len(arts) for arts in file_articles.values())

    print(f"  Page files total: {file_total} articles")
    print(f"  Search.tsx total: {search_total} articles")

    # Build Search.tsx lookup: normalized headline -> page
    search_by_headline = {}
    for art in search_articles:
        key = art['headline'].lower().strip()
        search_by_headline[key] = art['page']

    missing_from_search = []
    wrong_page_in_search = []
    for page_num, fname in page_files:
        for art in file_articles[page_num]:
            key = art['headline'].lower().strip()
            if key not in search_by_headline:
                missing_from_search.append((page_num, art['headline'][:70]))
            elif search_by_headline[key] != page_num:
                wrong_page_in_search.append((
                    page_num,
                    search_by_headline[key],
                    art['headline'][:70]
                ))

    if missing_from_search:
        errors.append(f"  FAIL {len(missing_from_search)} articles missing from Search.tsx:")
        for pg, h in missing_from_search[:10]:
            errors.append(f"    Page {pg}: {h}")
        if len(missing_from_search) > 10:
            errors.append(f"    ... and {len(missing_from_search) - 10} more")
    else:
        print(f"  OK: All {file_total} page file articles found in Search.tsx")

    if wrong_page_in_search:
        errors.append(f"  FAIL {len(wrong_page_in_search)} articles have wrong page number in Search.tsx:")
        for file_pg, search_pg, h in wrong_page_in_search[:10]:
            errors.append(f"    File=Page{file_pg} but Search says page={search_pg}: {h}")
        if len(wrong_page_in_search) > 10:
            errors.append(f"    ... and {len(wrong_page_in_search) - 10} more")
    else:
        print(f"  OK: All Search.tsx page numbers match actual page files")

    # ── CHECK 5: Total count consistency ──
    print("\n[CHECK 5] Total article count consistency...")
    if search_total != file_total:
        errors.append(f"  FAIL Total mismatch: page files={file_total}, Search.tsx={search_total}")
    else:
        print(f"  OK: Both page files and Search.tsx have {file_total} articles")

    # ── CHECK 6: Search.tsx articles per page ──
    print("\n[CHECK 6] Search.tsx articles per page...")
    search_page_counts = Counter(art['page'] for art in search_articles)
    bad_search_pages = [(p, c) for p, c in sorted(search_page_counts.items()) if c != 20]
    missing_search_pages = [p for p in range(1, total_pages + 1) if p not in search_page_counts]
    if bad_search_pages:
        errors.append(f"  FAIL Search.tsx pages with != 20 articles: {bad_search_pages}")
    if missing_search_pages:
        errors.append(f"  FAIL Search.tsx missing page numbers: {missing_search_pages}")
    if not bad_search_pages and not missing_search_pages:
        print(f"  OK: All {total_pages} pages have exactly 20 articles in Search.tsx")

    return errors, file_articles, search_articles, total_pages

# ─────────────────────────────────────────────
# TAG-INDEX REBUILD
# ─────────────────────────────────────────────

def rebuild_tag_index(file_articles, search_articles, total_pages):
    """Rebuild tag-index.json from scratch using page file data."""
    print("\n[REBUILD] Rebuilding tag-index.json from scratch...")

    # Build batchDate lookup from Search.tsx (page -> batchDate)
    batch_dates = {}
    for art in search_articles:
        if art['page'] not in batch_dates:
            batch_dates[art['page']] = art.get('batchDate', '')

    tag_index = defaultdict(list)
    total_articles = 0
    total_tag_uses = 0

    for page_num in sorted(file_articles.keys()):
        batch_date = batch_dates.get(page_num, '')
        for art in file_articles[page_num]:
            article_entry = {
                'headline': art['headline'],
                'tinyUrl': art['tinyUrl'],
                'xPostUrl': art['xPostUrl'],
                'imageUrl': art['imageUrl'],
                'tags': art['tags'],
                'page': page_num,
                'batchDate': batch_date,
            }
            for tag in art['tags']:
                tag_index[tag].append(article_entry)
                total_tag_uses += 1
            total_articles += 1

    # Sort alphabetically
    tag_index_sorted = dict(sorted(tag_index.items(), key=lambda x: x[0].lower()))

    os.makedirs(os.path.dirname(TAG_INDEX_FILE), exist_ok=True)
    with open(TAG_INDEX_FILE, 'w', encoding='utf-8') as f:
        json.dump(tag_index_sorted, f, ensure_ascii=False, separators=(',', ':'))

    print(f"  tag-index.json rebuilt:")
    print(f"    Total articles indexed: {total_articles}")
    print(f"    Unique tags: {len(tag_index_sorted)}")
    print(f"    Total tag uses: {total_tag_uses}")
    return total_articles, len(tag_index_sorted)

# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

if __name__ == '__main__':
    print("=" * 60)
    print("SEARCH INDEX & TAG DATABASE VALIDATION")
    print("=" * 60)

    errors, file_articles, search_articles, total_pages = run_validation()

    print("\n" + "=" * 60)
    if errors:
        print(f"VALIDATION FAILED — {len(errors)} error(s) found:")
        for e in errors:
            print(e)
        print("\nDO NOT PUBLISH until all errors are resolved.")
        print("=" * 60)
        sys.exit(1)
    else:
        print("VALIDATION PASSED — all checks OK")
        if REBUILD_MODE:
            total_arts, unique_tags = rebuild_tag_index(file_articles, search_articles, total_pages)
            print(f"\nTag-index rebuilt: {total_arts} articles, {unique_tags} unique tags")
        else:
            print("\nRun with --rebuild to also rebuild tag-index.json from scratch.")
        print("=" * 60)
        sys.exit(0)
