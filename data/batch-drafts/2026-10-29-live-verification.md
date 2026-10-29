# October 29, 2026 Twenty-Article Batch — Live Verification

- GitHub production commit: `372912b40bc2e421d6857340c898ffd045b70b1b`
- Cloudflare Pages deployment: `https://ed49d4a6.ctcrazies.pages.dev`
- Verified custom domain: `https://www.ctcrazies.com`
- Release cache-buster used for CTCrazies pages: `release=2026-10-29-372912b`

## Publication results

- Home page loads the 20 October 29 articles in strict descending NUM order, from NUM 1860 through NUM 1841.
- Home page DOM audit found 20 X-post cards, 20 source-article links, and 20 R2 article images; all 20 R2 images reported loaded dimensions.
- The Home page first headline is NUM 1860: `New York Times Report Casts Doubt on Democrat-Socialist James Talarico's Origin Story About Teaching History`.
- The Home page last headline is NUM 1841: `Charity Tied to Muslim-Democrat Abdul El-Sayed's Father Sent Funds to Iraq's Saddam Hussein, Resulting in FBI & Military Raids`.
- Home page tag controls include Lakesha Womack and the approved five-tag sets checked for NUM 1855 and NUM 1853.
- No `Saddam Hussein` tag control is rendered on Home. The name remains only in the authorized NUM 1841 headline.
- Page 2 begins with NUM 1840 and ends with NUM 1821. Its DOM audit found 20 X-post cards and 20 loaded R2 article images.
- The live `Lakesha Womack` tag route displays exactly one article: NUM 1848, `North Carolina Democrat Congressional Candidate Lakesha Womack Served Felony Summons During Campaign Stop Event`, with the expected source link and R2 image.
- The deployed `tag-index.json` returned HTTP 200, contains 370 tags, contains `Lakesha Womack` as a `person` tag with the NUM 1848 article, and does not contain `Saddam Hussein`.
- Direct public retrieval of `https://images.ctcrazies.com/article-images/2026-10-29_152025.jpg` succeeded; the browser reported a 723 × 479 image.

## Release gates completed before publication

- `verify_safe_site.py`: passed — 1,860 articles, 93 pages, 370 tags.
- Python unit tests: 26 passed.
- Project tests: 12 passed across 8 files.
- TypeScript check: passed.
- Production build: passed.
- R2 batch upload receipt validation: 20 unique uploaded objects with matching local byte sizes/SHA-256 values and successful public range retrievals.
