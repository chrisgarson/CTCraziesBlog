# Deferred Search-Index Design

## Purpose

The searchable 1,500-article record set is currently embedded in `Search.tsx`. Although the Search route is already lazy-loaded, this makes its JavaScript module 625.94 KB before transfer compression. The optimized design will retain every current search field and matching rule but move the generated record set to `client/public/search-index.json`, which the Search route fetches only when a visitor opens `/search`.

## Canonical generation and verification path

| Component | Current responsibility | Deferred-index responsibility |
|---|---|---|
| `data/article-ledger.json` | Canonical articles, order, links, tags, pages, and batch dates | Unchanged source of truth. |
| `safe_batch.py` | Generates pages, `Search.tsx`, routes, and tag indexes | Also generates `client/public/search-index.json`; reads that index for search-record verification, with an inline-array fallback only for historical recovery. |
| `client/src/pages/Search.tsx` | Contains both search behavior and all article records | Retains only search behavior and fetches `/search-index.json` at route load. |
| `verify_safe_site.py` | Checks search identities and page assignments | Continues the same checks through `safe_batch.search_records`, which reads the public index. |
| `/search` visitor route | Performs identical Fuse.js headline search | Shows a brief loading/error state only while the static index is retrieved. |

## Compatibility boundary

The historic scripts that directly rewrite or regex-parse the inline `Search.tsx` array (`batch_process.py`, `gen_pages_template.py`, `rebuild_search.py`, `rebuild_tag_index.py`, and the one-off order/topic repair utilities) are explicitly retired by the authoritative publication workflow. They are not part of future batch processing and will not be used to modify the deferred index. The canonical `safe_batch.py` remains the only supported writer.

> No article headline, source URL, X-post URL, image URL, page assignment, tag, or search-match rule is changed by this delivery refactor.

## Local verification record

The local `/search?q=Alexander%20Vindman` route fetched the generated public index and returned the existing single Alexander Vindman result, its source link, X-post link, August 20 date, and Page 1 destination. This confirms that a direct query URL preserves the established visitor behavior after the data was removed from the JavaScript route chunk.

Browser resource timing confirmed a successful request for `search-index.json`; the route’s browser console was otherwise clean.

## Measured result

The compiled Search route decreased from 625.94 KB before transfer compression to 27.30 KB (8.54 KB gzip). The same 1,500 canonical records are delivered as a 742,479-byte `search-index.json` asset (155,730 bytes gzip) only after a visitor opens the Search route. The production build completed without the previous large-chunk warning.

## Live verification record

After Cloudflare Pages deployment, the live direct-query route returned the Alexander Vindman result with the same source link, X-post link, Page 1 destination, and batch date. Browser resource timing confirmed the live site retrieved `https://www.ctcrazies.com/search-index.json` successfully.
