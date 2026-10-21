# October 21, 2026 Twenty-Article Batch — Live Verification

The user-reviewed October 21 batch was deployed from the tested production build.

- GitHub batch commit: `e2c2884a0d2c98778f35dd7524d75b25274266cf`
- Cloudflare Pages deployment: `https://8427940a.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home page | Reports **1,800** total articles, last updated **2026-10-21**, and begins with NUM **1800**, “Family's Muslim Brotherhood History Haunts Democrat-Socialist Abdul El-Sayed as He Compares Himself to JFK.” |
| Home images and source links | A completed-browser-DOM check confirmed exactly **20** new R2 image elements. Their filenames match the expected NUM 1800→1781 sequence, each loaded with nonzero natural dimensions, and the checked original source URLs for NUMs 1800, 1799, and 1798 are present. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with the former Home lead article, NUM **1780**, “Marxist Muslim-Democrat Abdul El-Sayed Trashed Police as ‘a Military That Could Have Its Way With Us,’ He Called To Disarm Them.” |
| Approved five-tag NUM 1790 | `https://www.ctcrazies.com/tag/Israel-Jews` includes the new Page 1 article “October 7 Tragedy Inspired Sister of Michigan's Muslim-Democrat Abdul El-Sayed To Write Book That Fantasizes About the Final Intifada,” confirming the reviewed Israel-Jews association. |
| Approved five-tag NUM 1786 | `https://www.ctcrazies.com/tag/Angie%20Nixon` reports **7 articles** and begins with the new Page 1 article “Hate & Violence Is in Their DNA: Former Democrat-Socialist Congressional Candidate Arrested for Threatening People Who Don’t Vote for Dem Angie Nixon.” |
| Representative R2 image | `https://images.ctcrazies.com/article-images/2026-10-21_155248.jpg` is publicly available and renders at **860×489**. |
| R2 pre-apply verification | The R2 receipt matched all **20** local image checksums, byte sizes, filenames, and canonical URLs. All 20 public image URLs returned successful HTTP 206 range responses before application. |

## Publication controls completed

- User-authoritative DOCX validation: 20 exact NUM/headline rows; no new tags; no duplicate tags; two explicit five-tag exceptions (NUMs **1790** and **1786**).
- Batch validation: passed — 20 contiguous NUMs, 1781–1800, producing 1,800 articles and 90 pages.
- `verify_safe_site.py`: passed — 1,800 articles, 90 pages, 363 tags.
- Python unit tests: passed — 26 tests.
- Frontend tests: passed — 7 files / 10 tests.
- TypeScript validation and production build: passed.
- Search index and both typed tag-index copies were verified synchronized to the canonical ledger.

The live site matches the user-reviewed DOCX, approved tag plan, canonical ledger, R2 upload receipt, and completed publication gates.
