# October 25, 2026 Batch Live Verification

## Published batch

- Canonical GitHub release commit: `a09360ab906305828855e5aa45ef53019b76dfe5`
- Batch: 20 articles, NUMs 1801–1820
- Canonical article total after application: 1,820
- Generated pages after application: 91
- Typed tags after application: 367
- New reviewed person tags: Louise Lucas, Dana Bash, Hillary Clinton, and Al Sharpton
- User-authorized five-tag assignments: NUMs 1817, 1810, and 1802
- Source workbook: `CTCInfo10252026b.xlsx` (the corrected workbook)
- Cloudflare Pages deployment: `https://3ff5c580.ctcrazies.pages.dev`

## Pre-publication checks

- The user-returned DOCX preserved every NUM and every corrected workbook Column D headline exactly.
- All 20 final tag lists matched the user-authoritative returned DOCX.
- Both typed tag-index copies were synchronized.
- All 20 R2 upload receipt records matched their local image byte sizes and SHA-256 checksums.
- All 20 canonical public R2 image URLs returned image bytes successfully.
- `verify_safe_site.py`: passed — 1,820 articles, 91 pages, 367 tags.
- Python unit tests: passed — 26 tests.
- Vitest: passed — 8 files, 12 tests.
- TypeScript check: passed.
- Production build: passed.

## Live production checks

- **Home / Page 1:** exactly 20 October 25 articles render in descending order from NUM 1820 through NUM 1801.
- **Home cards:** all 20 expected R2 image elements are present and fully loaded. Each headline, user-approved tag list, and source URL matches the deployed search-index record.
- **Page 2 boundary:** exactly 20 articles render in descending order from NUM 1800 through NUM 1781; the first Page 2 image is loaded.
- **New person tag route:** `/tag/Louise%20Lucas` displays one article, the correct NUM 1818 headline, its R2 image, and its original source link.
- **All Tags page:** displays 367 active tags. Its 367 visible numerical counts each match the deployed `tag-index.json`; Louise Lucas, Dana Bash, Hillary Clinton, and Al Sharpton each display `(1)`.
- **Direct R2 check:** `https://images.ctcrazies.com/article-images/2026-10-25_104029.jpg` opens successfully as an 862×489 image.

## Source-link audit note

A preliminary live-card audit used manually transcribed expected URLs and reported mismatches for NUMs 1809–1801. Direct comparison showed those manual comparison values were incorrect. The corrected workbook, canonical ledger, generated Home page, deployed search index, and rendered live image-card links agree for all 20 October 25 articles. No production source-link defect was found.
