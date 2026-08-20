# Pre-Restoration Performance and Cleanup Plan

## Scope and safeguards

This maintenance pass preserves the published article ledger, exact headlines, source links, X-post links, typed tags, descending NUM order, page assignments, and R2 image URLs. It does not change article content. Every proposed change must pass the existing batch, R2, tag-index, build, and live-route checks before publication.

## Measured baseline

The August 20 production build emitted a single primary JavaScript bundle of **2,029,916 bytes** before transfer compression and approximately **479 KB** after gzip compression. The immediate cause is structural: `App.tsx` statically imports all 75 generated article-page components, the 750,615-byte Search component, and tag routes. Consequently, the browser downloads code and the 1,500-record search dataset even when a visitor opens only the home page.

The typed tag index is intentionally delivered as a separate 1,910,960-byte JSON resource and is already fetched only by tag-related routes. It is not the cause of the first-page JavaScript warning. The project also retained 163 legacy article images, approximately 17.3 MB, in `client/public`, alongside the required Apple touch icon; no active article source reference was found during the initial inventory. These legacy files increased deployment storage and upload work but were not downloaded by a normal home-page visitor.

| Priority | Improvement | Expected effect | Risk control | Decision |
|---|---|---|---|---|
| 1 | Convert non-home routes to React lazy imports with a small loading fallback, and remove unused tRPC/React Query providers from the static public entry module. | Removes the 74 generated secondary pages, Search, tag-route code, and unused data-client code from the initial Home bundle. Search data downloads only when `/search` is opened. | Preserve Home as an eager import; test Home, Page 2, Search, Tags, and a tag-result route. | Implement now. |
| 2 | Retain tag-index JSON as route-fetched data. | Avoids moving a 1.9 MB index into the initial bundle. | Validate `/tags` and a tag result after the route split. | Retain current design. |
| 3 | Audit legacy `client/public` image files for external/direct-link dependencies before removal. | Could reduce deployment storage and artifact size by approximately 17.3 MB. | Do not delete during this pass without an explicit dependency review and user authorization. | Document only. |
| 4 | Continue the now-added nested image-folder and six-tag-exception safeguards. | Prevents repetition of two batch-processing interruptions. | Covered by Python regression tests. | Completed in the August 20 batch. |

The pre-removal audit found that 19 legacy local filenames still appear in source only as canonical R2 object names for Page 74 and Search results; none is requested from the local public directory. The remaining 144 article files have no active source mention. The cleanup removes only those redundant local article copies, preserves the Apple touch icon, and adds a regression check that canonical article image delivery relies exclusively on R2.

> The targeted route split is a delivery optimization, not a content rewrite. A visitor opening the home page receives only the home-page code first; the relevant route code is fetched when that route is visited.

## Local route-validation record

The optimized development site loaded the Home route with the existing NUM 1500 article, its R2-hosted image, page navigation, and approved tags unchanged. A direct visit to the deferred Page 2 route loaded its code successfully and displayed the existing first Page 2 article, confirming that the route split preserves the descending article sequence and R2 image presentation.

The deferred Search route successfully returned the Alexander Vindman article with its existing Page 1 link and August 20 date. The deferred typed tag-result route also loaded the same article, its R2 image, source link, and Page 1 destination. These route checks confirm that the optimization does not alter search results, tag-index delivery, or article-route links.

The separately deferred browse-tags route loaded the full typed index and displayed 327 active tags, including the new Alexander Vindman, Angie Nixon, and Manny Rutinel tags. This confirms that all three non-home dynamic route classes—Search, a tag result, and the tag browser—remain operational.

The browser console was empty after exercising Home, Page 2, Search, tag-result, and browse-tags routes in the optimized development site.

Following the Cloudflare Pages release, the live Home route retained NUM 1500, its R2 image, approved tags, and the 1,500-article status line. The live deferred Search route returned the approved Alexander Vindman result with its existing Page 1 link. These production checks match the local route-validation results.

After the redundant local-image cleanup release, live Page 74 loaded the older canonical R2 image URLs (including `post40_clean.jpg`, `post39_clean.jpg`, and `post38_clean.jpg`) with non-zero dimensions. This confirms that the previously duplicated local image files were not part of live article delivery.
