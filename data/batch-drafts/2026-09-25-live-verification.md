# September 25, 2026 Live Publication Verification

The September 25, 2026 batch containing NUMs 1621–1640 was published from GitHub commit `0a475cfb8079b987e92f0ade50fbcb6b7315d4f5` and deployed to the Cloudflare Pages `main` branch. The Cloudflare deployment completed successfully at `https://3fb4797f.ctcrazies.pages.dev`.

## Pre-publication controls

The returned DOCX was treated as the user-authoritative tag plan. It approved the new `Delia Ramirez` person tag, the new `Alaska` topic tag, and a five-tag exception for NUM 1630. It also explicitly authorized a replacement headline for NUM 1625. The controlled corrected-workbook validation copy differs from the supplied workbook only in NUM 1625’s Column D headline; all other workbook cells were confirmed unchanged.

All 20 batch images were uploaded and checksum-validated in Cloudflare R2 before the batch was applied. The receipt is retained at `data/batch-drafts/2026-09-25-final-r2-upload-receipt.json`. A public HTTP header check for the supplied PNG image at `https://images.ctcrazies.com/article-images/2026-09-25_144820.png` returned `HTTP/2 200` with `content-type: image/png`.

The required controls completed successfully: `verify_safe_site.py`, Python unit tests, `pnpm test` (7 test files and 10 tests), `pnpm exec tsc --noEmit`, and `pnpm run build`. The post-application ledger contains 1,640 articles across 82 pages, with all generated pages containing exactly 20 articles in descending NUM order. Both typed tag-index JSON copies were confirmed identical.

## Live-site checks

| Check | Result |
|---|---|
| Home / Page 1 | Confirmed the first article is NUM 1640: “Texas Democrat-Socialist, James Talarico, Has a Favorite Drag Queen, Who Happens To Really, Really Like Children.” The supplied R2 image rendered. |
| Page 2 boundary | Confirmed `https://www.ctcrazies.com/page2` begins with NUM 1620, immediately following the new NUM 1621–1640 Home-page batch. |
| New person tag | Confirmed `https://www.ctcrazies.com/tag/Delia%20Ramirez` lists one Page 1 article (NUM 1633) with the correct X-post URL, source URL, and R2 image. |
| New topic tag | Confirmed `https://www.ctcrazies.com/tag/Alaska` lists one Page 1 article (NUM 1626) with its R2 image. |
| NUM 1625 correction | Confirmed `https://www.ctcrazies.com/tag/U.S.%20Constitution` leads with the exact authorized headline: “Robert F. Kennedy Jr. States That Democrats Have 'Obliterated Bill of Rights' of JFK's America.” Its existing metadata and R2 image rendered. |

No ZIP package, original workbook, controlled validation-workbook copy, article image, or temporary draft/review-generation file was committed to GitHub.
