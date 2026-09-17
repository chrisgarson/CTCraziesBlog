# September 17, 2026 Live Publication Verification

The September 17, 2026 batch containing NUMs 1601–1620 was published from GitHub commit `c49c3c4027940cc0d1332a56918683f58814e1ed` and deployed to the Cloudflare Pages `main` branch. The Cloudflare deployment completed successfully at `https://01ba9824.ctcrazies.pages.dev`.

## Pre-publication controls

The prepared batch contained 20 articles with a contiguous NUM range from 1601 through 1620. The user-authoritative returned DOCX was checked against the immutable draft NUM sequence and verbatim workbook Column D headlines. All typed tags were valid existing tags. The direct user clarification replaced undeclared `Trump` with the existing `Trump-Derangement` topic tag for NUM 1610. The returned DOCX explicitly approved five tags for NUMs 1607 and 1602.

All 20 verified JPEG files were uploaded to Cloudflare R2 before batch application. The receipt is retained at `data/batch-drafts/2026-09-17-final-r2-upload-receipt.json`. A public HTTP header check for `https://images.ctcrazies.com/article-images/2026-09-17_090104.jpg` returned `HTTP/2 200` with `content-type: image/jpeg`.

The required controls completed successfully: `verify_safe_site.py`, Python unit tests, `pnpm test` (7 test files and 10 tests), `pnpm exec tsc --noEmit`, and `pnpm run build`. The post-application ledger contains 1,620 articles across 81 pages, with all generated pages containing exactly 20 articles in descending NUM order. Both typed tag-index JSON copies were confirmed identical.

## Live-site checks

| Check | Result |
|---|---|
| Home / Page 1 | Confirmed the first article is NUM 1620: “Democrat-Socialist James Talarico Does Alfred E. Newman Impersonation: What, Me Lie?” Its R2 image and reviewed tags rendered. |
| Page 2 boundary | Confirmed `https://www.ctcrazies.com/page2` begins with NUM 1600, immediately following the new NUM 1601–1620 Home-page batch. |
| Updated tag route | Confirmed `https://www.ctcrazies.com/tag/Trump-Derangement` lists 24 matching articles and leads with NUM 1610: “Hakeem Jeffries Refuses to Rule Out 3rd Trump Impeachment if House Controlled by Democrats.” Its R2 image rendered. |
| Image delivery | Browser rendering and the independent R2 header check both confirmed public image delivery from `images.ctcrazies.com`. |

No batch images, workbook, ZIP package, extracted drafts, or temporary review-generation files were committed to GitHub.
