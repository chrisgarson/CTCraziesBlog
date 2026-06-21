# Batch Processing Workflow

**MANDATORY:** Read this document at the start of every new article batch before taking any action.

This is the agreed-upon, non-negotiable workflow for processing each new batch of articles submitted by the site owner. Do not deviate from this sequence.

---

## Overview

Each batch consists of a zip file containing:
- One `.xlsx` spreadsheet with columns: NUM, X-Post Headline (Col B), Source Headline (Col C), Tiny URL, ImageName, X-Post URL
- One folder of `.jpg` image files (one per article)

The **NUM column** defines the article order on the website. New articles always become the updated **home page** (page 1). All existing pages shift forward by one.

---

## Step-by-Step Sequence

### Step 0 — Ask the site owner which tagging method to use

Immediately after the zip file is uploaded and before any other processing, present the following three options to the site owner and wait for their selection:

> **Tagging preference for this batch — please choose one:**
>
> **Option A — Content-based:** Visit each article URL, read the full article content, and generate 4 tags from the content. Fall back to headlines only if the URL is completely inaccessible (404, hard paywall, site block). Slowest; highest credit cost; most accurate tags.
>
> **Option B — Dual headline:** Generate 4 tags from both the X-Post Headline (Col B) and Source Headline (Col C) in the spreadsheet. No browser visits required. Fast; low credit cost; good tag quality.
>
> **Option C — X-Post headline only:** Generate 4 tags from the X-Post Headline (Col B) alone. No browser visits required. Fastest; lowest credit cost.

Do not proceed to Step 1 until the site owner has selected an option.

---

### Step 1 — Extract and read the spreadsheet
- Unzip the batch file
- Read the `.xlsx` to extract all rows: NUM, X-Post Headline, Tiny URL, ImageName, X-Post URL
- Confirm the total article count (typically 20)

### Step 2 — Upload all images to S3
- Upload every image in the batch to S3 using `manus-upload-file --webdev`
- Capture the returned `/manus-storage/filename.jpg` path for each image
- Build a mapping of ImageName → S3 path for use in page generation

### Step 3 — Generate tags (see tagging-rules.md)

Apply the method chosen by the site owner in Step 0:

- **Option A (Content-based):** For each article, visit its Tiny URL in the browser and read the full article content. Generate 4 tags from the content using the LLM. Fall back to the headline only if the URL is completely inaccessible (404, hard paywall, site block). If the LLM API fails, **stop and resolve the issue** — do not silently skip tagging.
- **Option B (Dual headline):** For each article, generate 4 tags from both the X-Post Headline (Col B) and Source Headline (Col C) using the LLM. No browser visits required.
- **Option C (X-Post headline only):** For each article, generate 4 tags from the X-Post Headline (Col B) alone using the LLM. No browser visits required.

For all options: use existing root tags from tag-index.json wherever possible; create new tags only when no existing tag fits.

### Step 4 — Shift all existing pages forward by one
- Home.tsx (page 1) → Page2.tsx (page 2)
- Page2.tsx (page 2) → Page3.tsx (page 3)
- ... and so on through the last existing page
- Rename files **in reverse order** (highest page number first) to avoid overwriting
- Update `currentPage={N}` in each shifted file to match its new page number
- Remove the site stats block (Last updated / Total articles) from the file that was previously Home.tsx — it belongs only on the new Home.tsx

### Step 5 — Build the new Home.tsx
- Use the exact same JSX structure as the previous Home.tsx:
  - `import ArticleBlock`, `PageHeader`, `Pagination`
  - `<div className="max-w-4xl mx-auto px-4 py-8">`
  - `<PageHeader />` (includes "Curating The Crazies" title and Trump quote)
  - `<div className="space-y-12">` wrapping all ArticleBlock entries
  - `<Pagination currentPage={1} totalPages={N} />`
  - Site stats block: Last updated date and total article count
- List articles in **reverse NUM order** (highest NUM first = most recent article at top)
- Each ArticleBlock must have: `headline`, `tinyUrl`, `xPostUrl`, `imageSrc`, `tags`

### Step 6 — Update App.tsx
- Verify all page routes are registered (page2 through pageN)
- Add any new page route if the total page count increased

### Step 7 — Update totalPages on all pages
- All pages (Home through last page) must show `totalPages={N}` where N is the new total
- Use a sed/script pass to update all files at once

### Step 8 — Update Search.tsx
- Append all new articles to the articles array in Search.tsx
- Set `"page": 1` for all new articles (they are on the home page)
- Ensure all previously shifted articles have their page numbers incremented by 1

### Step 9 — Run validation and rebuild indexes
- Run `python3.11 rebuild_search.py --rebuild` from the project root
- This script performs ALL of the following checks automatically:
  1. Every page file has exactly 20 articles
  2. Page numbers are continuous (no gaps)
  3. All page file articles are present in Search.tsx with correct page numbers
  4. Total article count is consistent across page files and Search.tsx
  5. Every page in Search.tsx has exactly 20 articles
- If the script reports **VALIDATION PASSED**, it also rebuilds tag-index.json from scratch
- If the script reports **VALIDATION FAILED**, **stop immediately** and fix the reported errors before proceeding
- Do NOT save a checkpoint or publish if validation fails

### Step 10 — Verify before saving checkpoint
- Confirm `rebuild_search.py --rebuild` completed with VALIDATION PASSED
- Confirm Home.tsx has the correct number of articles (20) with `currentPage={1}`
- Confirm the previously-Home page is now Page2 with `currentPage={2}`
- Confirm the last page has `currentPage={N}` matching the total page count
- Confirm all routes in App.tsx are present from page2 through pageN

### Step 11 — Save checkpoint and report
- Save checkpoint with a descriptive message
- Report to the user: articles added, page count, tag count, and any articles where headline fallback was used for tagging

---

## Critical Rules

1. **New articles always go on the home page.** Never append a new page without shifting existing pages forward first.
2. **Never skip the page shift.** Every existing page must move forward by one when a new batch is added.
3. **The site stats block (Last updated / Total articles) appears only on Home.tsx.** Remove it from any page that was previously Home.tsx after the shift.
4. **Do not change any formatting** unless explicitly requested by the site owner.
5. **Verify the sequence is correct before reporting completion.** Check actual file content, not assumptions.
