#!/usr/bin/env python3.11
"""
batch_process.py — Permanent reusable batch processor for CT Crazies website.

Usage:
    python3.11 batch_process.py <batch_date> <articles_json> [--dry-run]

Arguments:
    batch_date        : Human-readable date string, e.g. "June 3, 2026"
    articles_json     : Path to a JSON file containing the 20 articles with tags
    --dry-run         : Validate and preview all changes without writing any files
                        or pushing to GitHub/Cloudflare. Safe to run at any time.

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
  1. [PRE-FLIGHT] Validates all 20 articles before touching any files
  2. [SNAPSHOT]   Backs up all files that will be modified (for atomic rollback)
  3. Uploads all 20 images to GitHub article-images/ folder via GitHub Contents API
  4. Renames the current Home.tsx → Page2.tsx (shifting all existing pages by +1)
  5. Renames Page2.tsx → Page3.tsx, ... PageN.tsx → Page(N+1).tsx
  6. Updates all page numbers inside renamed files
  7. Builds a new Home.tsx from the 20 articles (using jsDelivr CDN image URLs)
  8. Prepends 20 new entries to Search.tsx (with correct commas)
  9. Updates page numbers for all previously-page-1 entries in Search.tsx to page 2
 10. Runs rebuild_search.py --rebuild to validate and rebuild tag-index
 11. Pushes all changed page files + tag-index to GitHub via Contents API
 12. Runs pnpm build + wrangler deploy to Cloudflare Pages
 13. [POST-DEPLOY] Verifies the live site reflects the new batch date

Encoding rules (THE canonical standard — never deviate):
  - JSX attribute (page files): double-quoted, with " → &quot; and & → &amp; inside
  - JSON string (Search.tsx): plain text, with " → \" (JSON escape), & stays as &
  - The validation script normalizes both via html.unescape() before comparing

Reliability features:
  - Pre-flight validation: all checks run before any file is modified
  - Atomic rollback: any failure after snapshot restores all files to pre-batch state
  - Dry-run mode: --dry-run flag previews everything without side effects
  - Post-deploy verification: fetches live site to confirm deployment succeeded
  - Idempotent image uploads: skips images already present on GitHub
  - GitHub Contents API: no git pack files — immune to sandbox corruption
  - Batch run log: timestamped log written to ~/batch_logs/ for every run
"""

import sys, os, re, json, shutil, subprocess, base64, time, tempfile, copy, datetime
from pathlib import Path
import requests

PROJECT = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(PROJECT, 'client/src/pages')
HOME = os.path.join(PAGES_DIR, 'Home.tsx')
SEARCH = os.path.join(PAGES_DIR, 'Search.tsx')
TAG_INDEX_SRC = os.path.join(PROJECT, 'client/src/data/tag-index.json')
TAG_INDEX_PUB = os.path.join(PROJECT, 'client/public/tag-index.json')

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
LIVE_SITE_URL = "https://www.ctcrazies.com"
BATCH_LOGS_DIR = os.path.expanduser("~/batch_logs")


# ─────────────────────────────────────────────
# BATCH RUN LOGGER
# ─────────────────────────────────────────────

class BatchLogger:
    """
    Writes a timestamped log file for every batch run.
    Log files are stored in ~/batch_logs/YYYY-MM-DD_HHMMSS.log
    Each log captures: batch date, all steps, image CDN URLs, success/failure.
    """

    def __init__(self, batch_date: str, dry_run: bool = False):
        os.makedirs(BATCH_LOGS_DIR, exist_ok=True)
        ts = datetime.datetime.now().strftime('%Y-%m-%d_%H%M%S')
        suffix = '_dry-run' if dry_run else ''
        self.log_path = os.path.join(BATCH_LOGS_DIR, f'{ts}{suffix}.log')
        self.dry_run = dry_run
        self._lines = []
        self._start = time.time()
        self._write(f"CT Crazies Batch Run Log")
        self._write(f"Batch date  : {batch_date}")
        self._write(f"Started     : {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        self._write(f"Dry-run     : {dry_run}")
        self._write(f"{'='*60}")

    def _write(self, line: str):
        ts = datetime.datetime.now().strftime('%H:%M:%S')
        entry = f"[{ts}] {line}"
        self._lines.append(entry)
        # Also mirror to file immediately so partial logs are preserved on crash
        with open(self.log_path, 'a', encoding='utf-8') as f:
            f.write(entry + '\n')

    def log(self, message: str):
        """Log an informational message."""
        self._write(message)

    def log_article(self, idx: int, num: int, headline: str, cdn_url: str):
        """Log a single article's image upload result."""
        self._write(f"  [{idx:02d}/20] num={num} | {os.path.basename(cdn_url)} | {cdn_url}")

    def finish(self, success: bool, total_articles: int, total_pages: int):
        """Write the final summary line."""
        elapsed = int(time.time() - self._start)
        self._write(f"{'='*60}")
        status = 'SUCCESS' if success else 'FAILED'
        self._write(f"Result      : {status}")
        if success:
            self._write(f"Articles    : {total_articles}")
            self._write(f"Pages       : {total_pages}")
        self._write(f"Duration    : {elapsed}s")
        self._write(f"Log file    : {self.log_path}")
        print(f"  Batch log written: {self.log_path}")


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


def github_file_exists(github_path: str) -> bool:
    """Check if a file already exists on GitHub."""
    return github_get_file_sha(github_path) is not None


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


def github_upload_image(image_path: str, dry_run: bool = False) -> str:
    """
    Upload an image file to GitHub article-images/ folder (idempotent — skips if exists).
    Returns the jsDelivr CDN URL for use in page files.
    Raises RuntimeError if upload fails.
    """
    filename = os.path.basename(image_path)
    github_path = f"article-images/{filename}"
    cdn_url = f"{JSDELIVR_BASE}/{filename}"

    if dry_run:
        return cdn_url

    # Idempotent: skip upload if image already exists on GitHub
    if github_file_exists(github_path):
        return cdn_url

    commit_msg = f"Add article image: {filename}"
    success = github_put_file(github_path, image_path, commit_msg)
    if not success:
        raise RuntimeError(f"Failed to upload image {filename} to GitHub")

    return cdn_url


# ─────────────────────────────────────────────
# PRE-FLIGHT VALIDATION
# ─────────────────────────────────────────────

def load_approved_tags() -> set:
    """Load the set of approved tags from the tag-index."""
    if not os.path.exists(TAG_INDEX_SRC):
        return set()
    with open(TAG_INDEX_SRC, encoding='utf-8') as f:
        data = json.load(f)
    return set(data.keys())


def preflight_validate(articles: list, approved_tags: set) -> list:
    """
    Run all pre-flight checks before any files are modified.
    Returns a list of error strings. Empty list means all checks passed.
    Checks:
      - Exactly 20 articles
      - All required fields present and non-empty
      - imagePath exists on local filesystem
      - All tags are from the approved list
      - No duplicate image filenames within the batch
      - No duplicate article numbers within the batch
      - URLs look like valid URLs (start with http)
    """
    errors = []

    if len(articles) != 20:
        errors.append(f"Expected 20 articles, got {len(articles)}")
        return errors  # Can't continue other checks meaningfully

    required_fields = ['num', 'headline', 'tinyUrl', 'imageName', 'xPostUrl', 'imagePath', 'tags']
    seen_nums = set()
    seen_images = set()

    for i, art in enumerate(articles):
        idx = i + 1  # 1-based for error messages

        # Required fields
        for field in required_fields:
            if field not in art:
                errors.append(f"Article {idx}: missing field '{field}'")
            elif field != 'tags' and not str(art[field]).strip():
                errors.append(f"Article {idx}: field '{field}' is empty")

        if 'num' in art:
            if art['num'] in seen_nums:
                errors.append(f"Article {idx}: duplicate num {art['num']}")
            seen_nums.add(art['num'])

        # Image file exists
        if 'imagePath' in art:
            if not os.path.exists(art['imagePath']):
                errors.append(f"Article {idx} (num {art.get('num')}): image file not found: {art['imagePath']}")
            img_name = os.path.basename(art.get('imagePath', ''))
            if img_name in seen_images:
                errors.append(f"Article {idx}: duplicate image filename '{img_name}'")
            seen_images.add(img_name)

        # URL format checks
        for url_field in ['tinyUrl', 'xPostUrl']:
            if url_field in art and art[url_field]:
                if not str(art[url_field]).startswith('http'):
                    errors.append(f"Article {idx} (num {art.get('num')}): '{url_field}' does not start with http: {art[url_field][:60]}")

        # Tags validation
        if 'tags' in art:
            if not isinstance(art['tags'], list):
                errors.append(f"Article {idx}: 'tags' must be a list")
            elif len(art['tags']) == 0:
                errors.append(f"Article {idx} (num {art.get('num')}): has no tags")
            else:
                for tag in art['tags']:
                    if approved_tags and tag not in approved_tags:
                        errors.append(f"Article {idx} (num {art.get('num')}): unapproved tag '{tag}'")

        # Headline not empty
        if 'headline' in art and not art['headline'].strip():
            errors.append(f"Article {idx}: headline is blank")

    return errors


# ─────────────────────────────────────────────
# ATOMIC ROLLBACK — SNAPSHOT & RESTORE
# ─────────────────────────────────────────────

class BatchSnapshot:
    """
    Captures a snapshot of all files that will be modified by the batch.
    Call restore() on any failure to return the project to its pre-batch state.
    """

    def __init__(self, pages_dir: str, project_dir: str):
        self.pages_dir = pages_dir
        self.project_dir = project_dir
        self._snapshot_dir = None
        self._file_map = {}  # local_path → snapshot_path

    def capture(self):
        """Snapshot all page files, Search.tsx, App.tsx, and tag-index files."""
        self._snapshot_dir = tempfile.mkdtemp(prefix='ctcrazies_snapshot_')
        files_to_snap = []

        # All page files
        for f in os.listdir(self.pages_dir):
            if f == 'Home.tsx' or re.match(r'Page\d+\.tsx$', f):
                files_to_snap.append(os.path.join(self.pages_dir, f))

        # Search.tsx
        files_to_snap.append(os.path.join(self.pages_dir, 'Search.tsx'))

        # App.tsx
        files_to_snap.append(os.path.join(self.project_dir, 'client/src/App.tsx'))

        # Tag index
        for p in [TAG_INDEX_SRC, TAG_INDEX_PUB]:
            if os.path.exists(p):
                files_to_snap.append(p)

        for src in files_to_snap:
            if os.path.exists(src):
                rel = os.path.relpath(src, self.project_dir)
                snap_path = os.path.join(self._snapshot_dir, rel.replace(os.sep, '__'))
                shutil.copy2(src, snap_path)
                self._file_map[src] = snap_path

        print(f"  Snapshot captured: {len(self._file_map)} files backed up")
        return self

    def restore(self):
        """Restore all snapshotted files to their pre-batch state."""
        if not self._snapshot_dir:
            print("  No snapshot to restore.")
            return

        restored = 0
        for original_path, snap_path in self._file_map.items():
            try:
                os.makedirs(os.path.dirname(original_path), exist_ok=True)
                shutil.copy2(snap_path, original_path)
                restored += 1
            except Exception as e:
                print(f"  WARNING: Could not restore {original_path}: {e}")

        # Remove any new page files that were created during the failed batch
        for f in os.listdir(self.pages_dir):
            full = os.path.join(self.pages_dir, f)
            if full not in self._file_map and (f == 'Home.tsx' or re.match(r'Page\d+\.tsx$', f)):
                try:
                    os.remove(full)
                except Exception:
                    pass

        print(f"  ROLLBACK COMPLETE: {restored} files restored to pre-batch state")
        self._cleanup()

    def cleanup(self):
        """Remove snapshot directory after successful batch."""
        self._cleanup()

    def _cleanup(self):
        if self._snapshot_dir and os.path.exists(self._snapshot_dir):
            shutil.rmtree(self._snapshot_dir, ignore_errors=True)
            self._snapshot_dir = None


# ─────────────────────────────────────────────
# ENCODING HELPERS
# ─────────────────────────────────────────────

def jsx_attr(headline: str) -> str:
    """Encode a headline for use inside a JSX double-quoted attribute value."""
    s = headline.replace('&', '&amp;')
    s = s.replace('"', '&quot;')
    return s


def json_str(headline: str) -> str:
    """Encode a headline for use inside a JSON double-quoted string value."""
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
    return sorted(files, reverse=True)


def shift_pages(new_total_pages: int, dry_run: bool = False):
    """Rename Home.tsx → Page2.tsx, Page2.tsx → Page3.tsx, etc."""
    pages = get_existing_pages()
    if dry_run:
        print(f"  [DRY-RUN] Would shift {len(pages)} pages: 1→2, 2→3, ... {len(pages)}→{len(pages)+1}")
        return
    for page_num, filepath in pages:
        new_num = page_num + 1
        new_name = 'Page2.tsx' if page_num == 1 else f'Page{new_num}.tsx'
        new_path = os.path.join(PAGES_DIR, new_name)
        content = open(filepath, encoding='utf-8').read()
        content = re.sub(r'currentPage=\{' + str(page_num) + r'\}', f'currentPage={{{new_num}}}', content)
        content = re.sub(r'totalPages=\{\d+\}', f'totalPages={{{new_total_pages}}}', content)
        if page_num == 1:
            content = content.replace('export default function Home()', 'export default function Page2()')
        with open(new_path, 'w', encoding='utf-8') as f:
            f.write(content)
        if filepath != new_path:
            os.remove(filepath)
    print(f"  Shifted {len(pages)} page files (pages 1–{len(pages)} → 2–{len(pages)+1})")


def build_home(articles: list, batch_date: str, total_articles: int, total_pages: int) -> str:
    """Build the new Home.tsx content from the 20 articles."""
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
    """Build the 20 new Search.tsx JSON entries for the new batch (page 1)."""
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
    return ',\n'.join(entries) + ','


def update_search(articles: list, batch_date: str, dry_run: bool = False):
    """Prepend 20 new entries to Search.tsx and increment all page numbers."""
    content = open(SEARCH, encoding='utf-8').read()

    def increment_page(m):
        n = int(m.group(1))
        return f'"page": {n + 1}'
    content = re.sub(r'"page":\s*(\d+)', increment_page, content)

    new_entries = build_search_entries(articles, batch_date)
    marker = 'const articles = [\n'
    idx = content.find(marker)
    if idx == -1:
        raise ValueError("Could not find 'const articles = [' in Search.tsx")
    insert_pos = idx + len(marker)
    content = content[:insert_pos] + new_entries + '\n' + content[insert_pos:]

    if dry_run:
        print(f"  [DRY-RUN] Would prepend 20 entries to Search.tsx and increment all page numbers")
        return

    with open(SEARCH, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  Search.tsx: prepended 20 new entries, incremented all existing page numbers")


def update_app_routes(new_total_pages: int, dry_run: bool = False):
    """Regenerate App.tsx with import and Route entries for all pages."""
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
    content += 'function App() {\n  return (\n    <>\n      <Switch>\n'
    content += '\n'.join(routes) + '\n'
    content += '      </Switch>\n    </>\n  );\n}\nexport default App;\n'

    if dry_run:
        print(f"  [DRY-RUN] Would update App.tsx with routes for pages 1–{new_total_pages}")
        return

    with open(APP, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  App.tsx updated: routes registered for pages 1–{new_total_pages}')


# ─────────────────────────────────────────────
# ARTICLE COUNT INTEGRITY CHECK
# ─────────────────────────────────────────────

def count_articles_in_page(filepath: str) -> int:
    """
    Count the number of ArticleBlock components in a page file.
    Returns the count, or -1 if the file cannot be read.
    """
    try:
        content = open(filepath, encoding='utf-8').read()
        return len(re.findall(r'<ArticleBlock', content))
    except Exception:
        return -1


def verify_article_counts(total_pages: int, dry_run: bool = False) -> list:
    """
    Check every page file and confirm each has exactly 20 ArticleBlock components.
    Returns a list of error strings for any page that fails.
    An empty list means all pages are intact.
    """
    errors = []

    # Check Home.tsx (page 1)
    pages_to_check = [(1, HOME)]
    for n in range(2, total_pages + 1):
        pages_to_check.append((n, os.path.join(PAGES_DIR, f'Page{n}.tsx')))

    if dry_run:
        print(f"  [DRY-RUN] Would verify article counts in {len(pages_to_check)} page files")
        return []

    print(f"  Checking article counts in {len(pages_to_check)} page files...")
    for page_num, filepath in pages_to_check:
        if not os.path.exists(filepath):
            errors.append(f"Page {page_num}: file not found — {filepath}")
            continue
        count = count_articles_in_page(filepath)
        if count != 20:
            label = 'Home.tsx' if page_num == 1 else f'Page{page_num}.tsx'
            errors.append(
                f"Page {page_num} ({label}): expected 20 articles, found {count} "
                f"— file may be truncated or corrupted"
            )

    if errors:
        print(f"  ✗ Article count check FAILED: {len(errors)} page(s) with wrong count")
        for e in errors:
            print(f"    • {e}")
    else:
        print(f"  ✓ All {len(pages_to_check)} pages have exactly 20 articles")

    return errors


# ─────────────────────────────────────────────
# GITHUB DEPLOY HELPERS
# ─────────────────────────────────────────────

def github_push_page_files(new_total_pages: int, batch_date: str, dry_run: bool = False) -> bool:
    """Push all changed page files and supporting files to GitHub via Contents API."""
    commit_msg = f"Batch update: {batch_date} — {new_total_pages} total pages"

    files_to_push = [(HOME, "client/src/pages/Home.tsx")]
    for n in range(2, new_total_pages + 1):
        local = os.path.join(PAGES_DIR, f'Page{n}.tsx')
        if os.path.exists(local):
            files_to_push.append((local, f"client/src/pages/Page{n}.tsx"))
    files_to_push.append((SEARCH, "client/src/pages/Search.tsx"))
    files_to_push.append((os.path.join(PROJECT, 'client/src/App.tsx'), "client/src/App.tsx"))
    if os.path.exists(TAG_INDEX_SRC):
        files_to_push.append((TAG_INDEX_SRC, "client/src/data/tag-index.json"))
    if os.path.exists(TAG_INDEX_PUB):
        files_to_push.append((TAG_INDEX_PUB, "client/public/tag-index.json"))

    total = len(files_to_push)

    if dry_run:
        print(f"  [DRY-RUN] Would push {total} files to GitHub via Contents API")
        return True

    print(f"  Pushing {total} files to GitHub via Contents API...")
    failed = []
    for i, (local_path, github_path) in enumerate(files_to_push):
        success = github_put_file(github_path, local_path, commit_msg)
        if success:
            if i < 3 or (i + 1) % 20 == 0 or i == total - 1:
                print(f"    [{i+1}/{total}] ✓ {github_path}")
        else:
            print(f"    [{i+1}/{total}] ✗ FAILED: {github_path}")
            failed.append(github_path)
        time.sleep(0.2)

    if failed:
        print(f"\n  WARNING: {len(failed)} files failed to push:")
        for f in failed:
            print(f"    {f}")
        return False

    print(f"  ✓ All {total} files pushed to GitHub successfully")
    return True


def deploy_to_cloudflare(dry_run: bool = False) -> bool:
    """Build the site and deploy to Cloudflare Pages via Wrangler."""
    if dry_run:
        print("  [DRY-RUN] Would run: pnpm build && wrangler pages deploy dist/public")
        return True

    print("  Running pnpm build...")
    result = subprocess.run(['pnpm', 'build'], cwd=PROJECT, capture_output=True, text=True)
    if result.returncode != 0:
        print("  BUILD FAILED:")
        print(result.stderr[-800:])
        return False
    print("  ✓ Build complete")

    print("  Deploying to Cloudflare Pages...")
    env = os.environ.copy()
    env['CLOUDFLARE_API_TOKEN'] = CLOUDFLARE_API_TOKEN
    result = subprocess.run(
        ['pnpm', 'exec', 'wrangler', 'pages', 'deploy', 'dist/public',
         '--project-name=ctcrazies', '--branch=main', '--commit-dirty=true'],
        cwd=PROJECT, capture_output=True, text=True, env=env
    )
    if result.returncode != 0:
        print("  DEPLOY FAILED:")
        print(result.stderr[-800:])
        return False

    url_match = re.search(r'https://\S+\.ctcrazies\.pages\.dev', result.stdout + result.stderr)
    if url_match:
        print(f"  ✓ Deployed: {url_match.group(0)}")
    else:
        print("  ✓ Deployment complete")
    return True


# ─────────────────────────────────────────────
# POST-DEPLOY VERIFICATION
# ─────────────────────────────────────────────

def verify_live_site(batch_date: str, max_wait: int = 120) -> bool:
    """
    Fetch the live site and verify the new batch date appears in the response.
    Retries for up to max_wait seconds to allow for CDN propagation.
    Returns True if verified, False if not found within timeout.
    """
    print(f"  Verifying live site at {LIVE_SITE_URL}...")
    deadline = time.time() + max_wait
    attempt = 0

    while time.time() < deadline:
        attempt += 1
        try:
            r = requests.get(LIVE_SITE_URL, timeout=15)
            if r.status_code == 200:
                if batch_date in r.text:
                    print(f"  ✓ Live site verified: batch date '{batch_date}' found (attempt {attempt})")
                    return True
                else:
                    elapsed = int(time.time() - (deadline - max_wait))
                    print(f"  Waiting for CDN propagation... ({elapsed}s elapsed, attempt {attempt})")
            else:
                print(f"  Site returned HTTP {r.status_code} (attempt {attempt})")
        except requests.exceptions.RequestException as e:
            print(f"  Fetch error (attempt {attempt}): {e}")

        if time.time() < deadline:
            time.sleep(15)

    print(f"  ✗ VERIFICATION FAILED: batch date '{batch_date}' not found on live site after {max_wait}s")
    print(f"    The deployment may have succeeded but CDN propagation is slow.")
    print(f"    Check {LIVE_SITE_URL} manually in a few minutes.")
    return False


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

def main():
    dry_run = '--dry-run' in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith('--')]

    if len(args) < 2:
        print("Usage: python3.11 batch_process.py <batch_date> <articles_json> [--dry-run]")
        print("  batch_date    : e.g. 'June 3, 2026'")
        print("  articles_json : path to JSON file with 20 article objects")
        print("  --dry-run     : validate and preview without making any changes")
        sys.exit(1)

    batch_date = args[0]
    articles_json_path = args[1]

    if dry_run:
        print(f"\n{'='*60}")
        print(f"DRY-RUN MODE — No files will be modified")
        print(f"{'='*60}")

    print(f"\n{'='*60}")
    print(f"BATCH PROCESSOR — {batch_date}")
    print(f"{'='*60}")

    # ── Initialize logger ─────────────────────────────────────────────────────
    logger = BatchLogger(batch_date, dry_run=dry_run)
    logger.log(f"Articles JSON: {articles_json_path}")

    # ── Load articles ─────────────────────────────────────────────────────────
    with open(articles_json_path, encoding='utf-8') as f:
        articles = json.load(f)

    # ── PRE-FLIGHT VALIDATION ─────────────────────────────────────────────────
    print(f"\n[PRE-FLIGHT] Validating {len(articles)} articles...")
    approved_tags = load_approved_tags()
    if approved_tags:
        print(f"  Loaded {len(approved_tags)} approved tags")
    else:
        print(f"  WARNING: Could not load approved tags — tag validation skipped")

    errors = preflight_validate(articles, approved_tags)

    if errors:
        print(f"\n  ✗ PRE-FLIGHT FAILED — {len(errors)} error(s) found:")
        for err in errors:
            print(f"    • {err}")
        print(f"\n  No files were modified. Fix the errors above and re-run.")
        sys.exit(1)

    print(f"  ✓ All {len(articles)} articles passed validation")
    logger.log(f"Pre-flight validation: PASSED ({len(articles)} articles)")

    if dry_run:
        print(f"\n  Dry-run article preview:")
        for i, art in enumerate(articles):
            print(f"    {i+1:2d}. [{art['num']}] {art['headline'][:70]}...")
            print(f"        Tags: {', '.join(art['tags'])}")
            print(f"        Image: {os.path.basename(art['imagePath'])}")

    # ── Count current pages ───────────────────────────────────────────────────
    current_pages = get_existing_pages()
    new_total_pages = len(current_pages) + 1
    new_total_articles = len(current_pages) * 20 + 20
    print(f"\n  Current: {len(current_pages)} pages, {len(current_pages)*20} articles")
    print(f"  After batch: {new_total_pages} pages, {new_total_articles} articles")

    if dry_run:
        logger.log(f"Current pages: {len(current_pages)}, new total: {new_total_pages}")
        # Run remaining steps in preview mode
        print(f"\n[STEP 1] Image uploads (dry-run):")
        for i, art in enumerate(articles):
            filename = os.path.basename(art['imagePath'])
            cdn_url = f"{JSDELIVR_BASE}/{filename}"
            print(f"  [{i+1}/20] Would upload {filename} → {cdn_url}")

        print(f"\n[STEP 2] Page shifts (dry-run):")
        shift_pages(new_total_pages, dry_run=True)

        print(f"\n[STEP 3] Home.tsx (dry-run):")
        print(f"  Would build Home.tsx with {len(articles)} articles, batch date '{batch_date}'")

        print(f"\n[STEP 3b] App.tsx (dry-run):")
        update_app_routes(new_total_pages, dry_run=True)

        print(f"\n[STEP 4] Search.tsx (dry-run):")
        update_search(articles, batch_date, dry_run=True)

        print(f"\n[STEP 6] GitHub push (dry-run):")
        github_push_page_files(new_total_pages, batch_date, dry_run=True)

        print(f"\n[STEP 7] Cloudflare deploy (dry-run):")
        deploy_to_cloudflare(dry_run=True)

        logger.finish(success=True, total_articles=new_total_articles, total_pages=new_total_pages)
        print(f"\n{'='*60}")
        print(f"DRY-RUN COMPLETE — No changes made")
        print(f"Run without --dry-run to execute the batch")
        print(f"{'='*60}\n")
        return

    # ── SNAPSHOT (for atomic rollback) ────────────────────────────────────────
    print(f"\n[SNAPSHOT] Backing up files for atomic rollback...")
    snapshot = BatchSnapshot(PAGES_DIR, PROJECT)
    snapshot.capture()

    try:
        # ── STEP 1: Upload images to GitHub ──────────────────────────────────
        print(f"\n[STEP 1] Uploading 20 images to GitHub article-images/ via API...")
        logger.log("STEP 1: Uploading images to GitHub")
        for i, art in enumerate(articles):
            cdn_url = github_upload_image(art['imagePath'])
            articles[i]['imageUrl'] = cdn_url
            filename = os.path.basename(art['imagePath'])
            print(f"  [{i+1}/20] ✓ {filename}")
            logger.log_article(i+1, art.get('num', '?'), art['headline'], cdn_url)
            time.sleep(0.3)

        # ── STEP 2: Shift existing pages ─────────────────────────────────────
        print(f"\n[STEP 2] Shifting {len(current_pages)} existing pages...")
        logger.log(f"STEP 2: Shifting {len(current_pages)} pages → new total {new_total_pages}")
        shift_pages(new_total_pages)

        # ── STEP 3: Build new Home.tsx ────────────────────────────────────────
        print(f"\n[STEP 3] Building new Home.tsx ({len(articles)} articles)...")
        home_content = build_home(articles, batch_date, new_total_articles, new_total_pages)
        with open(HOME, 'w', encoding='utf-8') as f:
            f.write(home_content)
        print(f"  Home.tsx written ({new_total_articles} total articles, {new_total_pages} total pages)")

        # ── STEP 3b: Update App.tsx routes ───────────────────────────────────
        print(f"\n[STEP 3b] Updating App.tsx routes...")
        update_app_routes(new_total_pages)

        # ── STEP 4: Update Search.tsx ─────────────────────────────────────────
        print(f"\n[STEP 4] Updating Search.tsx...")
        update_search(articles, batch_date)

        # ── STEP 5: Validate and rebuild tag-index ────────────────────────────
        print(f"\n[STEP 5] Running validation and rebuilding tag-index...")
        result = subprocess.run(
            ['python3.11', 'rebuild_search.py', '--rebuild'],
            cwd=PROJECT, capture_output=True, text=True
        )
        print(result.stdout)
        if result.returncode != 0:
            print("VALIDATION ERRORS:")
            print(result.stderr)
            raise RuntimeError("rebuild_search.py validation failed")

        if os.path.exists(TAG_INDEX_SRC):
            shutil.copy2(TAG_INDEX_SRC, TAG_INDEX_PUB)
            print("  tag-index.json synced to public/")

        # ── STEP 5b: Article count integrity check ───────────────────────────────────
        print(f"\n[STEP 5b] Verifying article counts in all {new_total_pages} page files...")
        logger.log(f"STEP 5b: Article count integrity check ({new_total_pages} pages)")
        count_errors = verify_article_counts(new_total_pages)
        if count_errors:
            logger.log(f"STEP 5b: FAILED — {len(count_errors)} page(s) with wrong article count")
            raise RuntimeError(
                f"Article count integrity check failed: {len(count_errors)} page(s) have wrong count. "
                f"First error: {count_errors[0]}"
            )
        logger.log(f"STEP 5b: PASSED — all {new_total_pages} pages have exactly 20 articles")

        # ── STEP 6: Push all page files to GitHub via API ─────────────────────
        print(f"\n[STEP 6] Pushing page files to GitHub via Contents API...")
        github_ok = github_push_page_files(new_total_pages, batch_date)
        if not github_ok:
            raise RuntimeError("GitHub push failed — one or more files could not be uploaded")

        # ── STEP 7: Build and deploy to Cloudflare Pages ──────────────────────
        print(f"\n[STEP 7] Building and deploying to Cloudflare Pages...")
        logger.log("STEP 7: Building and deploying to Cloudflare Pages")
        cf_ok = deploy_to_cloudflare()
        if not cf_ok:
            raise RuntimeError("Cloudflare deployment failed")
        logger.log("STEP 7: Cloudflare deployment complete")

        # ── STEP 8: Post-deploy verification ──────────────────────────────────
        print(f"\n[STEP 8] Verifying live site...")
        logger.log("STEP 8: Post-deploy verification")
        verify_live_site(batch_date)

    except Exception as e:
        print(f"\n{'!'*60}")
        print(f"BATCH FAILED: {e}")
        print(f"ROLLING BACK all file changes...")
        print(f"{'!'*60}")
        logger.log(f"BATCH FAILED: {e}")
        logger.log("ROLLBACK initiated")
        logger.finish(success=False, total_articles=0, total_pages=0)
        snapshot.restore()
        print(f"\nThe project has been restored to its pre-batch state.")
        print(f"Fix the issue above and re-run the batch.")
        sys.exit(1)

    # ── SUCCESS ───────────────────────────────────────────────────────────────
    snapshot.cleanup()
    logger.log(f"All steps completed successfully")
    logger.finish(success=True, total_articles=new_total_articles, total_pages=new_total_pages)

    print(f"\n{'='*60}")
    print(f"BATCH COMPLETE — {new_total_articles} articles, {new_total_pages} pages")
    print(f"Live at: {LIVE_SITE_URL}")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    main()
