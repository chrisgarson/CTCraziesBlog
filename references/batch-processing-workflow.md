# Batch Processing Workflow for CTCrazies.com

**MANDATORY:** Read this entire document at the start of every new article batch and every rebuild before taking any action.

---

## CRITICAL: Page Ordering Convention

> **The website is in descending NUM order. The Home page (Page 1) always shows the 20 most recent articles (highest NUMs). Clicking "Next" from the Home page takes the visitor to Page 2 (the next 20 newest articles). Clicking "Oldest" takes the visitor to the last page (currently Page 70), which shows the oldest articles (NUM 20–1). This convention must NEVER be violated.**

Specifically:
- **Page 1 (Home):** Newest 20 articles — highest NUM batch
- **Page 2:** Second-newest 20 articles
- **Page 3:** Third-newest 20 articles
- ...continuing in descending order...
- **Page 70 (current last page):** Oldest 20 articles — NUM 20–1

When a new batch is added, **all existing article pages shift toward higher page numbers** so that the previous Home articles become Page 2, the previous Page 2 articles become Page 3, and so on through the previous oldest page, which becomes the new last page. The new batch becomes the Home page. This shift is mandatory; appending a separate new batch page without shifting existing content breaks descending NUM order.

---

## Deployment Pipeline

Publishing to ctcrazies.com is accomplished exclusively through:
1. **This Manus AI interface** — for processing batches and making fixes
2. **Personal GitHub account** (`chrisgarson/CTCraziesBlog`) — for source code storage
3. **Personal Cloudflare account** — for deployment via `wrangler pages deploy`

**The Manus checkpoint/publish system is NOT used and must NOT be touched.** Deploy exclusively via:
```
CLOUDFLARE_API_TOKEN=<token> pnpm exec wrangler pages deploy dist/public --project-name=ctcrazies --branch=main --commit-dirty=true
```

---

## Image Hosting

All article images are hosted via the **GitHub CDN** (jsDelivr):
```
https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/<filename>
```
Images are committed to the `article-images/` folder in the GitHub repo (force-added since the folder is in .gitignore).

**Do NOT use `manus-upload-file --webdev` or S3 for article images.**

---

## Current CTC Info XLSX Layout

The workbook layout is fixed: **Row 1 blank; Row 2 mandatory instruction note; Row 3 blank; Row 4 headers; Row 5 onward article data.** The processing code must read the Row 2 note, require Row 4 headers, and never treat Rows 1–3 as article rows.

| Column | Field | Usage |
|--------|-------|-------|
| A | DateCaptrd | Reference only |
| B | Num | Reference and mandatory descending-order validation only |
| C | WebPage# | Reference only for audits/rebuilds |
| D | X-Post Headline | **Use verbatim, no modifications whatsoever** |
| E | Source URL | Clickable image/source link (`sourceUrl`; stored in the legacy-compatible `tinyUrl` UI field) |
| F | Image Name | Image filename |
| G | X-Post Url | Headline text link (xPostUrl field) |

No future spreadsheet needs a Tiny URL column. Earlier pages may retain TinyURL-domain values as historic source links, and a rebuild must preserve those existing values unchanged.

---

## Tagging Rules

- If a headline includes a person's **first and last name**, create a full-name tag if one does not already exist — no approval needed
- For **new non-person tags**: first check if the concept is already covered by an existing tag's keywords, then seek the site owner's approval before creating
- Tag classifications are stored in `tag-index.json` with a `"type"` field: `"person"` or `"topic"`
- The definitive person tag list is in `references/person-tags-list.md` (or the most recent `CTCPersonTags*.xlsx` uploaded by the site owner)

---

## Step-by-Step Batch Processing Sequence

### Step 1 — Extract and read the spreadsheet
- Unzip the batch file
- Read the `.xlsx` using Row 4 headers and columns D, E, F, G (see column mapping above)
- Confirm the total article count (typically 20, sometimes 40)
- Note the highest existing NUM from the current site — new articles start from NUM+1

### Step 2 — Upload images to GitHub CDN
- Copy all batch images to `article-images/` folder in the project
- Force-add and commit to GitHub: `git add -f article-images/ && git commit && git push user_github main`
- Image URL format: `https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/<filename>`

### Step 3 — Review and confirm tags
- Present all proposed tags to the site owner before writing any files
- Wait for approval/corrections before proceeding
- For 40-article batches, the site owner may provide a separate tags XLSX

### Step 4 — Shift all existing pages before creating the new Home page
- For a **20-article batch**, shift every existing page by one: Home (Page 1) → Page 2, Page 2 → Page 3, and so on through the current last page, which becomes the new last page.
- For a **40-article batch**, shift every existing page by two: Home (Page 1) → Page 3, Page 2 → Page 4, and so on through the current last page, which becomes two pages later.
- Rename page files **from the highest page number downward** to avoid overwriting their contents.
- Update each shifted file's `currentPage={N}` and `totalPages={N}` values to match its new visitor-facing page number.
- Update `App.tsx` imports and routes so every shifted page file is registered at its matching `/pageN` route.
- The new Home.tsx is created in Step 5 from the incoming batch. It is always `currentPage={1}`.

### Step 5 — Update Home.tsx
- Replace all 20 article entries with the new batch articles
- Articles in **descending NUM order** (highest NUM first)
- Update `totalPages={N}` to new total
- Update the "Last updated" date
- Update the total article count

### Step 6 — Update App.tsx
- Update imports and routes for every shifted page file
- Route format: `<Route path="/pageN" component={PageN} />`

### Step 7 — Update totalPages on all existing pages
- All existing page files must show the new `totalPages={N}`
- Use a sed/script pass to update all files at once

### Step 8 — Update Search.tsx
- Append all new articles to the articles array in Search.tsx
- Set `"page": 1` for all new articles (they are on the home page)
- Use the JSON format: `{ "headline": "...", "tinyUrl": "...", "xPostUrl": "...", "imageUrl": "...", "tags": [...], "page": 1, "batchDate": "..." }`
- Increment every existing article's page number by the number of inserted 20-article pages (one for a 20-article batch; two for a 40-article batch) so search and tag results remain aligned with the shifted page files.

### Step 9 — Rebuild tag-index.json
- Run `python3 /home/ubuntu/rebuild_tag_index_v2.py`
- This script reads page numbers from page files (ground truth) and writes both:
  - `client/src/data/tag-index.json` (used by JS bundle)
  - `client/public/tag-index.json` (served as static file by tag results page)
- Both files MUST be updated — updating only one will cause tag page to show wrong page numbers

### Step 10 — Build and verify
- Run `pnpm run build` from project root
- Confirm build succeeds with no errors
- Verify new page file is referenced in the bundle

### Step 11 — Commit to GitHub and deploy to Cloudflare
- `git add client/src/pages/ client/public/tag-index.json && git commit -m "..." && git push user_github main`
- Deploy: `CLOUDFLARE_API_TOKEN=<token> pnpm exec wrangler pages deploy dist/public --project-name=ctcrazies --branch=main --commit-dirty=true`
- Also copy updated tag-index.json to dist/public/ before deploying: `cp client/public/tag-index.json dist/public/tag-index.json`

### Step 12 — Verify live site
- Confirm the live site bundle name has changed (new hash)
- Confirm the home page shows the new articles in correct descending NUM order
- Confirm the new page is accessible at `/pageN`
- Confirm tag search results show correct page numbers

---

## Critical Rules

1. **Descending NUM order always.** Highest NUM = newest = top of home page. Lowest NUM = oldest = bottom of last page.
2. **New articles go on the home page and all existing content shifts to higher page numbers.** Existing page files must be renamed/renumbered to reflect their new visitor-facing position; never append a batch independently at the end.
3. **Use Column B headlines verbatim.** No modifications, no paraphrasing, no shortening.
4. **Both tag-index.json copies must be updated.** `client/src/data/` AND `client/public/` — always both.
5. **Deploy via Cloudflare wrangler only.** Never use Manus checkpoint or publish system.
6. **Seek approval for new non-person tags.** Person name tags are auto-created; topic tags require owner approval.
7. **Do not change any formatting** unless explicitly requested by the site owner.
8. **Verify the sequence is correct before reporting completion.** Check actual file content, not assumptions.
