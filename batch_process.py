#!/usr/bin/env python3.11
"""
batch_process.py — Permanent reusable batch processor for CT Crazies website.

Usage:
    python3.11 batch_process.py <batch_date> <articles_json>

Arguments:
    batch_date        : Human-readable date string, e.g. "June 3, 2026"
    articles_json     : Path to a JSON file containing the 20 articles with tags

The articles JSON file must be an array of 20 objects in display order (top to bottom),
each with these keys:
    num         : int   — article number (e.g. 1000)
    headline    : str   — exact X-Post Headline from spreadsheet (Col B), verbatim
    tinyUrl     : str   — Tiny URL (Col E)
    imageName   : str   — image filename (Col F)
    xPostUrl    : str   — X Post URL (Col H)
    imagePath   : str   — local filesystem path to the image file
    tags        : list  — list of tag strings (approved tags only)

This script:
  1. Uploads all 20 images to GitHub article-images/ folder via GitHub Contents API
  2. Renames the current Home.tsx → Page2.tsx (shifting all existing pages by +1)
  3. Renames Page2.tsx → Page3.tsx, Page3.tsx → Page4.tsx, ... PageN.tsx → Page(N+1).tsx
  4. Updates all page numbers inside renamed files
  5. Builds a new Home.tsx from the 20 articles (using jsDelivr CDN image URLs)
  6. Prepends 20 new entries to Search.tsx (with correct commas)
  7. Updates page numbers for all previously-page-1 entries in Search.tsx to page 2
  8. Runs rebuild_search.py --rebuild to validate and rebuild tag-index
  9. Pushes all changed page files + tag-index to GitHub via Contents API
 10. Runs pnpm build + wrangler deploy to Cloudflare Pages

Encoding rules (THE canonical standard — never deviate):
  - JSX attribute (page files): double-quoted, with " → &quot; and & → &amp; inside
  - JSON string (Search.tsx): plain text, with " → \" (JSON escape), & stays as &
  - The validation script normalizes both via html.unescape() before comparing

GitHub API notes:
  - Uses GitHub Contents API (PUT /repos/:owner/:repo/contents/:path)
  - No git pack files involved — immune to sandbox git corruption
  - Rate limit: 5000 requests/hour (well within limits for 20-article batches)
"""

import sys, os, re, json, shutil, subprocess, base64, time
from pathlib import Path
import requests

PROJECT = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(PROJECT, 'client/src/pages')
HOME = os.path.join(PAGES_DIR, 'Home.tsx')
SEARCH = os.path.join(PAGES_DIR, 'Search.tsx')

# ─────────────────────────────────────────────
# GITHUB API CONFIGURATION
# ─────────────────────────────────────────────

GITHUB_TOKEN = os.environ.get("CTCRAZIES_GITHUB_TOKEN", "")
GITHUB_REPO = "chrisgarson/CTCraziesBlog"
GITHUB_BRANCH = "main"
GITHUB_API_BASE = f"https://api.github.com/repos/{GITHUB_REPO}"
GITHUB_HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
}
JSDELIVR_BASE = f"https://cdn.jsdelivr.net/gh/{GITHUB_REPO}@{GITHUB_BRANCH}/article-images"

CLOUDFLARE_API_TOKEN = os.environ.get("CTCRAZIES_CF_TOKEN", "")


# ─────────────────────────────────────────────
# GITHUB API HELPERS
# ─────────────────────────────────────────────

def github_get_file_sha(github_path: str) -> str | None:
    """Get the current SHA of a file on GitHub (needed for updates). Returns None if new."""
    r = requests.get(
        f"{GITHUB_API_BASE}/contents/{github_path}",
        headers=GITHUB_HEADERS,
        params={"ref": GITHUB_BRANCH},
        timeout=15
    )
    if r.status_code == 200:
        return r.json().get("sha")
    return None


def github_put_file(github_path: str, local_path: str, commit_message: str, retries: int = 3) -> bool:
    """
    Upload or update a single file on GitHub via Contents API.
    Returns True on success, False on failure.
    Never uses git pack files — immune to sandbox corruption.
    """
    content_bytes = Path(local_path).read_bytes()
    content_b64 = base64.b64encode(content_bytes).decode("utf-8")

    payload = {
        "message": commit_message,
        "content": content_b64,
        "branch": GITHUB_BRANCH,
    }

    for attempt in range(retries):
        # Get current SHA (needed for updates, not creates)
        file_sha = github_get_file_sha(github_path)
        if file_sha:
            payload["sha"] = file_sha

        try:
            r = requests.put(
                f"{GITHUB_API_BASE}/contents/{github_path}",
                headers=GITHUB_HEADERS,
                json=payload,
                timeout=30
            )
            if r.status_code in (200, 201):
                return True
            elif r.status_code == 422 and attempt < retries - 1:
                # SHA mismatch — refetch and retry
                time.sleep(2)
                continue
            elif r.status_code in (500, 502, 503) and attempt < retries - 1:
                time.sleep(3 * (attempt + 1))
                continue
            else:
                print(f"    GitHub API error {r.status_code}: {r.text[:120]}")
                return False
        except requests.exceptions.Timeout:
            if attempt < retries - 1:
                time.sleep(5)
            else:
                print(f"    GitHub API timeout for {github_path}")
                return False

    return False


def github_upload_image(image_path: str) -> str:
    """
    Upload an image file to GitHub article-images/ folder.
    Returns the jsDelivr CDN URL for use in page files.
    Raises RuntimeError if upload fails.
    """
    filename = os.path.basename(image_path)
    github_path = f"article-images/{filename}"
    commit_msg = f"Add article image: {filename}"

    success = github_put_file(github_path, image_path, commit_msg)
    if not success:
        raise RuntimeError(f"Failed to upload image {filename} to GitHub")

    cdn_url = f"{JSDELIVR_BASE}/{filename}"
    return cdn_url


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
    articles: list of dicts with headline, tinyUrl, xPostUrl, imageUrl (jsDelivr CDN URL), tags
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
        # imageUrl is already a full jsDelivr CDN URL — use as-is
        lines.append(f'        imageSrc="{art["imageUrl"]}"')
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
# GITHUB DEPLOY HELPERS
# ─────────────────────────────────────────────

def github_push_page_files(new_total_pages: int, batch_date: str):
    """
    Push all changed page files and supporting files to GitHub via Contents API.
    This replaces 'git push' entirely — no git pack files involved.
    """
    commit_msg = f"Batch update: {batch_date} — {new_total_pages} total pages"

    files_to_push = []

    # All page files (Home + Page2 through PageN)
    files_to_push.append((
        HOME,
        "client/src/pages/Home.tsx"
    ))
    for n in range(2, new_total_pages + 1):
        local = os.path.join(PAGES_DIR, f'Page{n}.tsx')
        if os.path.exists(local):
            files_to_push.append((local, f"client/src/pages/Page{n}.tsx"))

    # Search.tsx
    files_to_push.append((SEARCH, "client/src/pages/Search.tsx"))

    # App.tsx
    app_path = os.path.join(PROJECT, 'client/src/App.tsx')
    files_to_push.append((app_path, "client/src/App.tsx"))

    # Tag index files
    tag_src = os.path.join(PROJECT, 'client/src/data/tag-index.json')
    tag_pub = os.path.join(PROJECT, 'client/public/tag-index.json')
    if os.path.exists(tag_src):
        files_to_push.append((tag_src, "client/src/data/tag-index.json"))
    if os.path.exists(tag_pub):
        files_to_push.append((tag_pub, "client/public/tag-index.json"))

    total = len(files_to_push)
    print(f"  Pushing {total} files to GitHub via Contents API...")
    failed = []

    for i, (local_path, github_path) in enumerate(files_to_push):
        success = github_put_file(github_path, local_path, commit_msg)
        if success:
            if i < 3 or (i + 1) % 20 == 0:
                print(f"    [{i+1}/{total}] ✓ {github_path}")
        else:
            print(f"    [{i+1}/{total}] ✗ FAILED: {github_path}")
            failed.append(github_path)
        # Small delay to respect rate limits
        time.sleep(0.2)

    if failed:
        print(f"\n  WARNING: {len(failed)} files failed to push:")
        for f in failed:
            print(f"    {f}")
        return False

    print(f"  ✓ All {total} files pushed to GitHub successfully")
    return True


def deploy_to_cloudflare():
    """
    Build the site and deploy to Cloudflare Pages via Wrangler.
    """
    print("  Running pnpm build...")
    result = subprocess.run(
        ['pnpm', 'build'],
        cwd=PROJECT,
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print("  BUILD FAILED:")
        print(result.stderr[-500:])
        return False
    print("  ✓ Build complete")

    print("  Deploying to Cloudflare Pages...")
    env = os.environ.copy()
    env['CLOUDFLARE_API_TOKEN'] = CLOUDFLARE_API_TOKEN
    result = subprocess.run(
        ['pnpm', 'exec', 'wrangler', 'pages', 'deploy', 'dist/public',
         '--project-name=ctcrazies', '--branch=main', '--commit-dirty=true'],
        cwd=PROJECT,
        capture_output=True, text=True,
        env=env
    )
    if result.returncode != 0:
        print("  DEPLOY FAILED:")
        print(result.stderr[-500:])
        return False

    # Extract deployment URL from output
    url_match = re.search(r'https://\S+\.ctcrazies\.pages\.dev', result.stdout + result.stderr)
    if url_match:
        print(f"  ✓ Deployed: {url_match.group(0)}")
    else:
        print("  ✓ Deployment complete")
    return True


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

def main():
    if len(sys.argv) < 3:
        print("Usage: python3.11 batch_process.py <batch_date> <articles_json>")
        print("  batch_date    : e.g. 'June 3, 2026'")
        print("  articles_json : path to JSON file with 20 article objects")
        print("")
        print("Each article in the JSON must have: num, headline, tinyUrl, imageName,")
        print("  xPostUrl, imagePath (local file path to image), tags")
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

    # ── STEP 1: Upload images to GitHub ──────────────────────────────────────
    print(f"\n[STEP 1] Uploading 20 images to GitHub article-images/ via API...")
    for i, art in enumerate(articles):
        img_path = art.get('imagePath', '')
        if not img_path or not os.path.exists(img_path):
            print(f"  ERROR: Image file not found for article {art.get('num')}: {img_path}")
            sys.exit(1)
        cdn_url = github_upload_image(img_path)
        articles[i]['imageUrl'] = cdn_url
        print(f"  [{i+1}/20] ✓ {os.path.basename(img_path)} → jsDelivr CDN")
        time.sleep(0.3)  # Respect GitHub rate limits

    # ── STEP 2: Shift existing pages ─────────────────────────────────────────
    print(f"\n[STEP 2] Shifting {len(current_pages)} existing pages...")
    shift_pages(new_total_pages)

    # ── STEP 3: Build new Home.tsx ────────────────────────────────────────────
    print(f"\n[STEP 3] Building new Home.tsx ({len(articles)} articles)...")
    home_content = build_home(articles, batch_date, new_total_articles, new_total_pages)
    with open(HOME, 'w', encoding='utf-8') as f:
        f.write(home_content)
    print(f"  Home.tsx written ({new_total_articles} total articles, {new_total_pages} total pages)")

    # ── STEP 3b: Update App.tsx routes ───────────────────────────────────────
    print(f"\n[STEP 3b] Updating App.tsx routes...")
    update_app_routes(new_total_pages)

    # ── STEP 4: Update Search.tsx ─────────────────────────────────────────────
    print(f"\n[STEP 4] Updating Search.tsx...")
    update_search(articles, batch_date)

    # ── STEP 5: Validate and rebuild tag-index ────────────────────────────────
    print(f"\n[STEP 5] Running validation and rebuilding tag-index...")
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

    # ── STEP 6: Push all page files to GitHub via API ─────────────────────────
    print(f"\n[STEP 6] Pushing page files to GitHub via Contents API...")
    github_ok = github_push_page_files(new_total_pages, batch_date)
    if not github_ok:
        print("\nWARNING: Some files failed to push to GitHub.")
        print("The site can still be deployed to Cloudflare, but GitHub may be out of sync.")

    # ── STEP 7: Build and deploy to Cloudflare Pages ──────────────────────────
    print(f"\n[STEP 7] Building and deploying to Cloudflare Pages...")
    cf_ok = deploy_to_cloudflare()
    if not cf_ok:
        print("\nERROR: Cloudflare deployment failed. Check build errors above.")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"BATCH COMPLETE — {new_total_articles} articles, {new_total_pages} pages")
    print(f"Live at: https://www.ctcrazies.com")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    main()
