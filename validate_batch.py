#!/usr/bin/env python3
"""
validate_batch.py — Standalone batch JSON validation script for CT Crazies.

Usage:
    python3 validate_batch.py <articles_json> [<source_xlsx>]

    articles_json : path to JSON file with 20 article objects
    source_xlsx   : (optional but strongly recommended) path to the source XLSX
                    file. When provided, every headline in the JSON is verified
                    against Column D of the current CTC Info XLSX by NUM. Any mismatch blocks
                    the batch — this prevents hallucinated or truncated headlines
                    from reaching the site.

Runs all data quality checks on a batch JSON file and reports any errors.
This is run automatically by batch_process.py before any files are modified,
but can also be run independently to check a batch file at any time.

Checks performed:
  - Exactly 20 articles present
  - All required fields present and non-empty
  - imagePath exists on local filesystem
  - All tags are from the approved list (no new tags created)
  - No news source included as a tag
  - 2-4 tags per article
  - No duplicate article numbers within the batch
  - No duplicate image filenames within the batch
  - URLs start with http
  - Headlines are not blank
  - imageName matches the basename of imagePath
  - [XLSX cross-check] Every headline matches Column D of the source XLSX exactly
    (requires source_xlsx argument; blocks batch on any mismatch)

Exit codes:
  0 = all checks passed
  1 = one or more errors found
  2 = usage error (wrong arguments)
"""

import sys, os, json
from pathlib import Path

PROJECT = os.path.dirname(os.path.abspath(__file__))
TAG_INDEX_SRC = os.path.join(PROJECT, 'client/src/data/tag-index.json')

# Known news sources that should never appear as tags
KNOWN_NEWS_SOURCES = {
    'CNN', 'Fox News', 'MSNBC', 'NBC', 'ABC', 'CBS', 'BBC', 'Reuters',
    'Associated Press', 'AP', 'New York Times', 'Washington Post', 'Politico',
    'The Hill', 'Axios', 'NPR', 'USA Today', 'Newsweek', 'Time', 'Forbes',
    'Bloomberg', 'Wall Street Journal', 'WSJ', 'Guardian', 'Breitbart',
    'Daily Wire', 'Daily Caller', 'The Federalist', 'Epoch Times',
    'Just The News', 'Gateway Pundit', 'Zero Hedge', 'Substack',
    'Mailgun', 'Paylinks',
}


def load_approved_tags() -> set:
    """Load the set of approved tags from the tag-index."""
    if not os.path.exists(TAG_INDEX_SRC):
        print(f"  WARNING: tag-index not found at {TAG_INDEX_SRC} — tag validation skipped")
        return set()
    with open(TAG_INDEX_SRC, encoding='utf-8') as f:
        data = json.load(f)
    return set(data.keys())


def normalize_headline(s: str) -> str:
    """
    Normalize a headline string for comparison purposes.
    Handles common Excel auto-formatting artifacts:
      - Non-breaking spaces (\xa0) -> regular space
      - Smart/curly single quotes (\u2018, \u2019) -> straight apostrophe
      - Smart/curly double quotes (\u201c, \u201d) -> straight double quote
      - En dash (\u2013) and em dash (\u2014) -> hyphen
    This prevents false positives when Excel auto-formats punctuation.
    NOTE: Normalization is used ONLY for comparison — the original text is
    shown in error messages so the user sees the actual XLSX content.
    """
    if not s:
        return ''
    s = s.strip()
    s = s.replace('\xa0', ' ')           # non-breaking space
    s = s.replace('\u2018', "'")          # left single quotation mark
    s = s.replace('\u2019', "'")          # right single quotation mark / apostrophe
    s = s.replace('\u201c', '"')          # left double quotation mark
    s = s.replace('\u201d', '"')          # right double quotation mark
    s = s.replace('\u2013', '-')          # en dash
    s = s.replace('\u2014', '-')          # em dash
    return s


def load_xlsx_articles(xlsx_path: str) -> list[dict]:
    """
    Read the current CTC Info layout (headers Row 4, data Row 5 onward).
    Returns the authoritative NUM/headline/source-link records.
    """
    from ctc_info_xlsx import read_ctc_info_workbook
    articles, _ = read_ctc_info_workbook(xlsx_path)
    return articles


def xlsx_cross_check(articles: list, xlsx_path: str) -> list:
    """
    Cross-check every headline and source URL in JSON against the current CTC
    Info XLSX.  Articles are matched by NUM, never by incidental row position.
    Returns a list of error strings; empty list means all headlines match.
    """
    errors = []

    try:
        xlsx_articles = load_xlsx_articles(xlsx_path)
    except Exception as e:
        errors.append(f"XLSX cross-check: could not read '{xlsx_path}': {e}")
        return errors

    xlsx_by_num = {article['num']: article for article in xlsx_articles}
    if len(xlsx_articles) != len(articles):
        errors.append(
            f"XLSX cross-check: XLSX has {len(xlsx_articles)} data rows "
            f"but JSON has {len(articles)} articles — counts must match"
        )

    for i, article in enumerate(articles):
        num = article.get('num', f'#{i+1}')
        xlsx_article = xlsx_by_num.get(num)
        if not xlsx_article:
            errors.append(f"XLSX cross-check: NUM {num} is absent from source XLSX")
            continue
        json_headline_raw = str(article.get('headline', ''))
        xlsx_headline_raw = str(xlsx_article['headline'])

        # Normalize both sides to avoid false positives from Excel formatting
        json_norm = normalize_headline(json_headline_raw)
        xlsx_norm = normalize_headline(xlsx_headline_raw)

        if json_norm != xlsx_norm:
            errors.append(
                f"XLSX cross-check — num {num}: headline mismatch\n"
                f"     JSON:  \"{json_headline_raw}\"\n"
                f"     XLSX:  \"{xlsx_headline_raw}\""
            )

        json_source = str(article.get('sourceUrl') or article.get('tinyUrl') or '')
        if json_source != str(xlsx_article['sourceUrl']):
            errors.append(
                f"XLSX cross-check — num {num}: Source URL mismatch\n"
                f"     JSON:  \"{json_source}\"\n"
                f"     XLSX:  \"{xlsx_article['sourceUrl']}\""
            )

    return errors


def validate(articles: list, approved_tags: set) -> tuple[list, list]:
    """
    Validate all articles. Returns (errors, warnings).
    Errors block the batch. Warnings are informational only.
    """
    errors = []
    warnings = []

    # ── Article count ─────────────────────────────────────────────────────────
    if len(articles) != 20:
        errors.append(f"Expected exactly 20 articles, got {len(articles)}")
        if len(articles) == 0:
            return errors, warnings  # Nothing else to check

    required_fields = ['num', 'headline', 'imageName', 'xPostUrl', 'imagePath', 'tags']
    seen_nums = set()
    seen_images = set()

    for i, art in enumerate(articles):
        idx = i + 1  # 1-based for readability

        if not art.get('sourceUrl') and art.get('tinyUrl'):
            art['sourceUrl'] = art['tinyUrl']
        if not art.get('tinyUrl') and art.get('sourceUrl'):
            art['tinyUrl'] = art['sourceUrl']

        # ── Required fields ───────────────────────────────────────────────────
        for field in required_fields:
            if field not in art:
                errors.append(f"Article {idx}: missing required field '{field}'")
            elif field != 'tags' and not str(art[field]).strip():
                errors.append(f"Article {idx} (num {art.get('num', '?')}): field '{field}' is empty")

        num = art.get('num', f'#{idx}')

        # ── Duplicate num ─────────────────────────────────────────────────────
        if 'num' in art:
            if art['num'] in seen_nums:
                errors.append(f"Article {idx}: duplicate 'num' value {art['num']}")
            seen_nums.add(art['num'])

        # ── Image file exists on disk ─────────────────────────────────────────
        if 'imagePath' in art:
            img_path = art['imagePath']
            if not os.path.exists(img_path):
                errors.append(f"Article {idx} (num {num}): image file not found: {img_path}")
            else:
                # Check imageName matches imagePath basename
                if 'imageName' in art:
                    expected_name = os.path.basename(img_path)
                    if art['imageName'] != expected_name:
                        warnings.append(
                            f"Article {idx} (num {num}): imageName '{art['imageName']}' "
                            f"does not match imagePath basename '{expected_name}'"
                        )

            # Duplicate image filename check
            img_name = os.path.basename(img_path)
            if img_name in seen_images:
                errors.append(f"Article {idx} (num {num}): duplicate image filename '{img_name}'")
            seen_images.add(img_name)

        # ── URL format ────────────────────────────────────────────────────────
        for url_field in ['sourceUrl', 'tinyUrl', 'xPostUrl']:
            if url_field in art and art[url_field]:
                val = str(art[url_field])
                if not val.startswith('http'):
                    errors.append(
                        f"Article {idx} (num {num}): '{url_field}' must start with http — got: {val[:80]}"
                    )

        # ── Tags ──────────────────────────────────────────────────────────────
        if 'tags' in art:
            tags = art['tags']

            if not isinstance(tags, list):
                errors.append(f"Article {idx} (num {num}): 'tags' must be a list, got {type(tags).__name__}")
            else:
                # 2-4 tags allowed
                if not (2 <= len(tags) <= 4):
                    errors.append(
                        f"Article {idx} (num {num}): expected 2-4 tags, got {len(tags)}: {tags}"
                    )

                for tag in tags:
                    # No news sources as tags
                    if tag in KNOWN_NEWS_SOURCES:
                        errors.append(
                            f"Article {idx} (num {num}): tag '{tag}' is a news source — "
                            f"news sources must not be used as tags"
                        )

                    # Only approved tags
                    if approved_tags and tag not in approved_tags:
                        errors.append(
                            f"Article {idx} (num {num}): unapproved tag '{tag}' — "
                            f"only existing approved tags may be used"
                        )

                # Duplicate tags within same article
                if len(tags) != len(set(tags)):
                    dupes = [t for t in tags if tags.count(t) > 1]
                    errors.append(f"Article {idx} (num {num}): duplicate tags within article: {dupes}")

        # ── Headline not blank ────────────────────────────────────────────────
        if 'headline' in art and not str(art.get('headline', '')).strip():
            errors.append(f"Article {idx} (num {num}): headline is blank")

    return errors, warnings


def print_report(articles: list, errors: list, warnings: list, json_path: str, xlsx_path: str = None):
    """Print a formatted validation report."""
    print(f"\n{'='*60}")
    print(f"BATCH VALIDATION REPORT")
    print(f"File: {json_path}")
    if xlsx_path:
        print(f"XLSX: {xlsx_path}")
    print(f"Articles: {len(articles)}")
    print(f"{'='*60}")

    if not errors and not warnings:
        print(f"\n✓ ALL CHECKS PASSED — batch is ready to process\n")
        return

    if warnings:
        print(f"\n⚠  {len(warnings)} WARNING(S):")
        for w in warnings:
            print(f"   • {w}")

    if errors:
        print(f"\n✗  {len(errors)} ERROR(S) — batch cannot proceed until fixed:")
        for e in errors:
            print(f"   • {e}")
        print()
    else:
        print(f"\n✓ No errors — batch is ready to process (review warnings above)\n")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 validate_batch.py <articles_json> [<source_xlsx>]")
        print("  articles_json : path to JSON file with 20 article objects")
        print("  source_xlsx   : (recommended) path to source XLSX for headline cross-check")
        sys.exit(2)

    json_path = sys.argv[1]
    xlsx_path = sys.argv[2] if len(sys.argv) >= 3 else None

    if not os.path.exists(json_path):
        print(f"Error: file not found: {json_path}")
        sys.exit(2)

    if xlsx_path and not os.path.exists(xlsx_path):
        print(f"Error: XLSX file not found: {xlsx_path}")
        sys.exit(2)

    with open(json_path, encoding='utf-8') as f:
        articles = json.load(f)

    approved_tags = load_approved_tags()
    if approved_tags:
        print(f"Loaded {len(approved_tags)} approved tags from tag-index")

    errors, warnings = validate(articles, approved_tags)

    # ── XLSX cross-check (blocks batch on any mismatch) ───────────────────────
    if xlsx_path:
        print(f"Running XLSX headline cross-check against: {os.path.basename(xlsx_path)}")
        xlsx_errors = xlsx_cross_check(articles, xlsx_path)
        if xlsx_errors:
            errors.extend(xlsx_errors)
            print(f"  ✗ {len(xlsx_errors)} headline mismatch(es) found")
        else:
            print(f"  ✓ All {len(articles)} headlines match XLSX source")
    else:
        print("  ⚠  WARNING: No XLSX provided — headline cross-check skipped.")
        print("              Always pass the source XLSX to catch hallucinated headlines.")

    print_report(articles, errors, warnings, json_path, xlsx_path)

    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
