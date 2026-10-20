# October 20, 2026 — NUM 388 Roy Cooper → Josh Stein Tag Correction: Live Verification

The user-authorized historical tag correction was deployed from the tested production build.

- GitHub correction commit: `27becc5df5bf40be3253f3b79cf6f9269fb7095f`
- Cloudflare Pages deployment: `https://0a2bde7c.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Josh Stein person route | `https://www.ctcrazies.com/tag/Josh%20Stein` reports **1 article**: NUM **388**, “North Carolina's Democrat Governor Goes Full-Pander To Please Islamicists.” It links to the retained X-post URL, the retained `https://tinyurl.com/bd4buwya` legacy source URL, the retained canonical R2 image, and Page **70**. |
| Roy Cooper person route | `https://www.ctcrazies.com/tag/Roy%20Cooper` reports **6 articles**. The corrected NUM 388 headline is absent, so the other six Roy Cooper associations remain and only the specified one was removed. |
| Corrected association | NUM 388 is live under the newly declared **Josh Stein** person tag. Its three retained tags are **Islam-Muslims**, **North Carolina**, and **Politics**. |
| Ordering and count | The Home page remains at **1,780 articles** and starts with the current NUM **1780** article. The tag-only correction did not affect article count, Home order, page boundaries, or pagination. |

## Pre-deployment controls completed

- Canonical ledger scope verification: exactly NUM 388’s tag array changed, and only the `Josh Stein` person metadata entry was added.
- `verify_safe_site.py`: passed — 1,780 articles, 89 pages, 363 tags.
- Python unit tests: passed — 26 tests.
- Frontend tests: passed — 7 files / 10 tests.
- TypeScript validation: passed.
- Production build: passed.
- Generated Page 70, deferred search index, and both typed tag-index copies were verified to contain Josh Stein for NUM 388 and no Roy Cooper association for that article.

No headline, NUM, page assignment, source URL, X-post URL, image URL, image content, or unrelated tag association was changed.
