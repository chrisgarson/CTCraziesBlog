#!/usr/bin/env python3.11
"""
batch_process.py — Permanent reusable batch processor for CT Crazies website.

Usage:
    python3.11 batch_process.py <zip_or_xlsx_path> <batch_date> <articles_json>

Arguments:
    zip_or_xlsx_path  : Path to the zip file or xlsx file for the batch
    batch_date        : Human-readable date string, e.g. "June 3, 2026"
    articles_json     : Path to a JSON file containing the 20 articles with tags

The articles JSON file must be an array of 20 objects in display order (top to bottom),
each with these keys:
    num         : int   — article number (e.g. 1000)
    headline    : str   — exact X-Post Headline from spreadsheet (Col B), verbatim
    tinyUrl     : str   — Tiny URL (Col E)
    imageName   : str   — image filename (Col F)
    xPostUrl    : str   — X Post URL (Col H)
    imageUrl    : str   — S3 URL returned by manus-upload-file --webdev
    tags        : list  — list of tag strings (approved tags only)

This script:
  1. Renames the current Home.tsx → Page2.tsx (shifting all existing pages by +1)
  2. Renames Page2.tsx → Page3.tsx, Page3.tsx → Page4.tsx, ... PageN.tsx → Page(N+1).tsx
  3. Updates all page numbers inside renamed files
  4. Builds a new Home.tsx from the 20 articles
  5. Prepends 20 new entries to Search.tsx (with correct commas)
  6. Updates page numbers for all previously-page-1 entries in Search.tsx to page 2
  7. Runs rebuild_search.py --rebuild to validate and rebuild tag-index

Encoding rules (THE canonical standard — never deviate):
  - JSX attribute (page files): double-quoted, with " → &quot; and & → &amp; inside
  - JSON string (Search.tsx): plain text, with " → \" (JSON escape), & stays as &
  - The validation script normalizes both via html.unescape() before comparing
"""

import sys, os, re, json, shutil, subprocess
from datetime import datetime

PROJECT = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(PROJECT, 'client/src/pages')
HOME = os.path.join(PAGES_DIR, 'Home.tsx')
SEARCH = os.path.join(PAGES_DIR, 'Search.tsx')

# ─────────────────────────────────────────────
# ENCODING HELPERS
# ─────────────────────────────────────────────

def jsx_attr(headline: str) -> str:
    """
    Encode a headline for use inside a JSX double-quoted attribute value.
    Rules:
      - & → &amp;
      - " → &quot;
      - Single quotes are fine as-is inside double-quoted attributes
    Returns the encoded string (does NOT include surrounding quotes).
    """
    s = headline.replace('&', '&amp;')
    s = s.replace('"', '&quot;')
    return s


def json_str(headline: str) -> str:
    """
    Encode a headline for use inside a JSON double-quoted string value.
    Rules:
      - " → \" (JSON escape)
      - \\ → \\\\ (escape backslashes)
      - & stays as & (plain ampersand — valid JSON, html.unescape will normalize)
      - Single quotes are fine as-is
    Returns the encoded string (does NOT include surrounding quotes).
    """
    s = headline.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    return s


# ─────────────────────────────────────────────
# PAGE FILE HELPERS
# ─────────────────────────────────────────────

def get_existing_pages():
    """Return sorted list of (page_num, filepath) for all current page files."""
    files = []
    for f in os.listdir(PAGES_DIR):
        if f == 'Home.tsx':
            files.append((1, os.path.join(PAGES_DIR, f)))
        elif re.match(r'Page(\d+)\.tsx$', f):
            n = int(re.match(r'Page(\d+)\.tsx$', f).group(1))
            files.append((n, os.path.join(PAGES_DIR, f)))
    return sorted(files, reverse=True)  # reverse so we rename highest first


def shift_pages(new_total_pages: int):
    """
    Rename Home.tsx → Page2.tsx, Page2.tsx → Page3.tsx, etc.
    Also updates the currentPage and totalPages props inside each renamed file.
    """
    pages = get_existing_pages()  # sorted descending
    for page_num, filepath in pages:
        new_num = page_num + 1
        if page_num == 1:
            new_name = 'Page2.tsx'
        else:
            new_name = f'Page{new_num}.tsx'
        new_path = os.path.join(PAGES_DIR, new_name)
        # Update currentPage and totalPages inside the file
        content = open(filepath, encoding='utf-8').read()
        # Replace currentPage={N} with currentPage={N+1}
        content = re.sub(
            r'currentPage=\{' + str(page_num) + r'\}',
            f'currentPage={{{new_num}}}',
            content
        )
        # Update totalPages to the new total
        content = re.sub(
            r'totalPages=\{\d+\}',
            f'totalPages={{{new_total_pages}}}',
            content
        )
        # Replace export default function Home() with Page2
        if page_num == 1:
            content = content.replace('export default function Home()', f'export default function Page2()')
        with open(new_path, 'w', encoding='utf-8') as f:
            f.write(content)
        # Remove old file if it's being renamed (not overwriting)
        if filepath != new_path:
            os.remove(filepath)
    print(f"  Shifted {len(pages)} page files (pages 1–{len(pages)} → 2–{len(pages)+1})")


def build_home(articles: list, batch_date: str, total_articles: int, total_pages: int) -> str:
    """
    Build the new Home.tsx content from the 20 articles.
    articles: list of dicts with headline, tinyUrl, xPostUrl, imageUrl, tags
    """
    lines = [
        "import ArticleBlock from '../components/ArticleBlock';",
        "import PageHeader from '../components/PageHeader';",
        "import Pagination from '../components/Pagination';",
        "export default function Home() {",
        "  return (",
        '    <div className="max-w-4xl mx-auto px-4 py-8">',
        "      <PageHeader />",
        '      <div className="space-y-12">',
    ]
    for art in articles:
        h = jsx_attr(art['headline'])
        tags_jsx = ', '.join(f'"{t}"' for t in art['tags'])
        lines.append(f'      <ArticleBlock')
        lines.append(f'        headline="{h}"')
        lines.append(f'        tinyUrl="{art["tinyUrl"]}"')
        lines.append(f'        xPostUrl="{art["xPostUrl"]}"')
        # Convert full S3 domain URL to relative path (required for deployment)
        img_src = art['imageUrl']
        if 'manus-storage/' in img_src:
            img_src = '/manus-storage/' + img_src.split('manus-storage/')[-1]
        lines.append(f'        imageSrc="{img_src}"')
        lines.append(f'        tags={{[{tags_jsx}]}}')
        lines.append(f'      />')
    lines += [
        "      </div>",
        f"      <Pagination currentPage={{1}} totalPages={{{total_pages}}} />",
        "      {/* SITE STATS — auto-updated by batch_process.py. DO NOT edit manually. */}",
        f'      <p className="text-sm text-gray-500 mt-2" style={{{{fontFamily: \'Roboto Slab, serif\'}}}}>',
        f'        Last updated: <strong style={{{{ color: \'#555\' }}}}>{batch_date}</strong> &nbsp;|&nbsp; Total articles: <strong style={{{{ color: \'#555\' }}}}>{total_articles}</strong>',
        "      </p>",
        "    </div>",
        "  );",
        "}",
    ]
    return '\n'.join(lines) + '\n'


# ─────────────────────────────────────────────
# SEARCH.TSX HELPERS
# ─────────────────────────────────────────────

def build_search_entries(articles: list, batch_date: str) -> str:
    """
    Build the 20 new Search.tsx JSON entries for the new batch (page 1).
    Returns a string of comma-separated objects ready to prepend to the array.
    Each entry ends with a comma so the existing entries follow cleanly.
    """
    entries = []
    for art in articles:
        h = json_str(art['headline'])
        tags_json = ', '.join(f'"{t}"' for t in art['tags'])
        entry = (
            '  {\n'
            f'    "headline": "{h}",\n'
            f'    "tinyUrl": "{art["tinyUrl"]}",\n'
            f'    "xPostUrl": "{art["xPostUrl"]}",\n'
            f'    "imageUrl": "{art["imageUrl"]}",\n'
            f'    "tags": [{tags_json}],\n'
            f'    "page": 1,\n'
            f'    "batchDate": "{batch_date}"\n'
            '  }'
        )
        entries.append(entry)
    # Join with commas and add trailing comma after the last entry
    return ',\n'.join(entries) + ','


def update_search(articles: list, batch_date: str):
    """
    Prepend 20 new entries to Search.tsx and increment page numbers for
    all previously-page-1 entries to page 2.
    Also increments ALL other page numbers by 1 (page N → page N+1).
    """
    content = open(SEARCH, encoding='utf-8').read()

    # Step 1: Increment ALL existing page numbers by 1 (highest first to avoid double-increment)
    # Find all "page": N occurrences and increment
    def increment_page(m):
        n = int(m.group(1))
        return f'"page": {n + 1}'
    content = re.sub(r'"page":\s*(\d+)', increment_page, content)

    # Step 2: Build new entries string
    new_entries = build_search_entries(articles, batch_date)

    # Step 3: Insert after "const articles = [\n"
    marker = 'const articles = [\n'
    idx = content.find(marker)
    if idx == -1:
        raise ValueError("Could not find 'const articles = [' in Search.tsx")
    insert_pos = idx + len(marker)
    content = content[:insert_pos] + new_entries + '\n' + content[insert_pos:]

    with open(SEARCH, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  Search.tsx: prepended 20 new entries, incremented all existing page numbers")


def update_app_routes(new_total_pages: int):
    """
    Regenerate App.tsx with import and Route entries for all pages up to new_total_pages.
    Preserves the Search and TagResults routes at the end.
    """
    APP = os.path.join(PROJECT, 'client/src/App.tsx')

    imports = ['import { Switch, Route } from "wouter";']
    imports.append('import Home from "./pages/Home";')
    for n in range(2, new_total_pages + 1):
        imports.append(f'import Page{n} from "./pages/Page{n}";')
    imports.append('import Search from "./pages/Search";')
    imports.append('import TagResults from "./pages/TagResults";')
    imports.append('import TagsIndex from "./pages/TagsIndex";')

    routes = ['        <Route path="/" component={Home} />']
    for n in range(2, new_total_pages + 1):
        routes.append(f'        <Route path="/page{n}" component={{Page{n}}} />')
    routes.append('        <Route path="/search" component={Search} />')
    routes.append('        <Route path="/tags" component={TagsIndex} />')
    routes.append('        <Route path="/tag/:tag" component={TagResults} />')

    content = '\n'.join(imports) + '\n'
    content += 'function App() {\n'
    content += '  return (\n'
    content += '    <>\n'
    content += '      <Switch>\n'
    content += '\n'.join(routes) + '\n'
    content += '      </Switch>\n'
    content += '    </>\n'
    content += '  );\n'
    content += '}\n'
    content += 'export default App;\n'

    with open(APP, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  App.tsx updated: routes registered for pages 1–{new_total_pages}')


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

def main():
    if len(sys.argv) < 3:
        print("Usage: python3.11 batch_process.py <batch_date> <articles_json>")
        print("  batch_date    : e.g. 'June 3, 2026'")
        print("  articles_json : path to JSON file with 20 article objects")
        sys.exit(1)

    batch_date = sys.argv[1]
    articles_json_path = sys.argv[2]

    # Load articles
    with open(articles_json_path, encoding='utf-8') as f:
        articles = json.load(f)

    if len(articles) != 20:
        print(f"ERROR: Expected 20 articles, got {len(articles)}")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"BATCH PROCESSOR — {batch_date}")
    print(f"{'='*60}")

    # Count current pages
    current_pages = get_existing_pages()
    new_total_pages = len(current_pages) + 1
    new_total_articles = len(current_pages) * 20 + 20

    print(f"\n[STEP 1] Shifting {len(current_pages)} existing pages...")
    shift_pages(new_total_pages)

    print(f"\n[STEP 2] Building new Home.tsx ({len(articles)} articles)...")
    home_content = build_home(articles, batch_date, new_total_articles, new_total_pages)
    with open(HOME, 'w', encoding='utf-8') as f:
        f.write(home_content)
    print(f"  Home.tsx written ({new_total_articles} total articles, {new_total_pages} total pages)")

    print(f"\n[STEP 2b] Updating App.tsx routes...")
    update_app_routes(new_total_pages)

    print(f"\n[STEP 3] Updating Search.tsx...")
    update_search(articles, batch_date)

    print(f"\n[STEP 4] Running validation and rebuilding tag-index...")
    result = subprocess.run(
        ['python3.11', 'rebuild_search.py', '--rebuild'],
        cwd=PROJECT,
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.returncode != 0:
        print("VALIDATION ERRORS:")
        print(result.stderr)
        sys.exit(1)

    # Sync tag-index to public folder
    src = os.path.join(PROJECT, 'client/src/data/tag-index.json')
    dst = os.path.join(PROJECT, 'client/public/tag-index.json')
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print("  tag-index.json synced to public/")

    print(f"\n{'='*60}")
    print(f"BATCH COMPLETE — {new_total_articles} articles, {new_total_pages} pages")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    main()
