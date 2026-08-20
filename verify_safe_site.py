"""Publication-blocking verification for the safe CTCrazies batch workflow."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from safe_batch import APP, ARTICLES_PER_PAGE, LEDGER, TAG_PUBLIC, TAG_SRC, article_key, build_tag_index, current_page_articles, load_ledger, page_path, search_records


def app_registers_page(app: str, page: int) -> bool:
    eager_import = rf'import\s+Page{page}\s+from\s+["\']\./pages/Page{page}["\'];'
    lazy_import = rf'const\s+Page{page}\s+=\s+lazy\(\(\)\s*=>\s*import\(["\']\./pages/Page{page}["\']\)\);'
    route = rf'<Route\s+path=["\']/page{page}["\']\s+component=\{{Page{page}\}}\s*/>'
    return bool(re.search(eager_import, app) or re.search(lazy_import, app)) and bool(re.search(route, app))


def verify(project: Path, ledger_path: Path) -> list[str]:
    ledger = load_ledger(ledger_path)
    expected = ledger["articles"]
    errors: list[str] = []
    total_pages = len(expected) // ARTICLES_PER_PAGE
    expected_keys = [article_key(article) for article in expected]
    if len(expected_keys) != len(set(expected_keys)):
        errors.append("Canonical ledger contains duplicate source/X-post article identities")

    actual = current_page_articles(project)
    actual_keys = [article_key(article) for article in actual]
    if len(actual) != len(expected):
        errors.append(f"Page files contain {len(actual)} articles; ledger contains {len(expected)}")
    if actual_keys != expected_keys:
        for index, (found, expected_key) in enumerate(zip(actual_keys, expected_keys), start=1):
            if found != expected_key:
                page = (index - 1) // ARTICLES_PER_PAGE + 1
                errors.append(
                    f"Descending NUM/page order fails at visitor Page {page}, position {(index - 1) % ARTICLES_PER_PAGE + 1} "
                    f"(found={found!r}, expected={expected_key!r})"
                )
                break
        if len(actual_keys) != len(expected_keys):
            errors.append("Page article identities do not match the ledger")

    for page in range(1, total_pages + 1):
        content = page_path(page, project / "client" / "src" / "pages").read_text(encoding="utf-8")
        if f"currentPage={{{page}}}" not in content:
            errors.append(f"Page {page} has an incorrect currentPage value")
        if f"totalPages={{{total_pages}}}" not in content:
            errors.append(f"Page {page} has an incorrect totalPages value")

    search = search_records(project)
    if len(search) != len(expected):
        errors.append(f"Search.tsx has {len(search)} unique article records; ledger has {len(expected)}")
    for article in expected:
        record = search.get(article_key(article))
        if not record:
            errors.append(f"Search.tsx is missing NUM {article['num']}")
            continue
        if record["page"] != article["page"]:
            errors.append(f"Search.tsx has NUM {article['num']} on Page {record['page']}; expected Page {article['page']}")
            break

    src = json.loads((project / "client" / "src" / "data" / "tag-index.json").read_text(encoding="utf-8"))
    public = json.loads((project / "client" / "public" / "tag-index.json").read_text(encoding="utf-8"))
    if src != public:
        errors.append("The source and public tag-index.json files differ")
    expected_index = build_tag_index(ledger)
    if set(src) != set(expected_index):
        errors.append("Tag index tag names do not match the canonical ledger metadata")
    else:
        for tag, expected_entry in expected_index.items():
            actual_entry = src[tag]
            if actual_entry.get("type") != expected_entry.get("type"):
                errors.append(f"Tag {tag!r} has an incorrect type classification")
                break
            if actual_entry.get("keywords", []) != expected_entry.get("keywords", []):
                errors.append(f"Tag {tag!r} has different retained keywords than the canonical ledger")
                break
            expected_pages = {article_key(article): article["page"] for article in expected_entry["articles"]}
            actual_pages = {article_key(article): article.get("page") for article in actual_entry.get("articles", [])}
            if actual_pages != expected_pages:
                missing = sorted(set(expected_pages) - set(actual_pages))
                extra = sorted(set(actual_pages) - set(expected_pages))
                wrong = sorted(key for key in set(actual_pages) & set(expected_pages) if actual_pages[key] != expected_pages[key])
                sample = (missing or extra or wrong)[0]
                errors.append(
                    f"Tag {tag!r} has article/page links that differ from the canonical ledger "
                    f"(missing={len(missing)}, extra={len(extra)}, wrong_page={len(wrong)}, sample={sample!r})"
                )
                break

    app = (project / "client" / "src" / "App.tsx").read_text(encoding="utf-8")
    for page in range(2, total_pages + 1):
        if not app_registers_page(app, page):
            errors.append(f"App.tsx does not register visitor Page {page}")
            break
    for route in ('<Route path="/tags" component={TagsIndex} />', '<Route path="/tag/:tag" component={TagResults} />'):
        if route not in app:
            errors.append("App.tsx is missing a required tag route")

    return errors


def main() -> None:
    project = Path(__file__).resolve().parent
    ledger = Path(sys.argv[1]) if len(sys.argv) > 1 else project / "data" / "article-ledger.json"
    errors = verify(project, ledger)
    if errors:
        print("SAFE SITE VERIFICATION FAILED")
        for error in errors:
            print(f"- {error}")
        sys.exit(1)
    data = load_ledger(ledger)
    print(f"SAFE SITE VERIFICATION PASSED — {len(data['articles'])} articles, {len(data['articles']) // ARTICLES_PER_PAGE} pages, {len(data['tagMetadata'])} tags")


if __name__ == "__main__":
    main()
