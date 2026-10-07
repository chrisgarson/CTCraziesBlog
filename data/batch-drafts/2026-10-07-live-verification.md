# October 7, 2026 Live Publication Verification

The October 7 batch was deployed from the validated production build to Cloudflare Pages.

- GitHub production commit: `f40df96b33f59310010c88602c008f4a9cc58efb`
- Cloudflare Pages deployment: `https://37ab7974.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home / Page 1 | Live site displays the October 7 batch beginning at **NUM 1720** and continuing through **NUM 1701**. The displayed total is **1,720** articles. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with **NUM 1700**, preserving strict descending order and the 20-articles-per-page boundary. |
| Biden Administration topic route | `https://www.ctcrazies.com/tag/Biden%20Administration` reports **24 articles**: the existing 19 historical articles plus only the five reviewed October 7 assignments (NUMs **1713, 1708, 1707, 1706, and 1701**). |
| Debra Messing person route | `https://www.ctcrazies.com/tag/Debra%20Messing` contains the approved NUM 1716 Page 1 article. |
| Susie Wiles person route | `https://www.ctcrazies.com/tag/Susie%20Wiles` contains the approved NUM 1701 Page 1 article. |
| R2 images | The verified routes render canonical R2 images, including `https://images.ctcrazies.com/article-images/2026-10-07_142201.jpg`, `https://images.ctcrazies.com/article-images/2026-10-07_144101.jpg`, and `https://images.ctcrazies.com/article-images/2026-10-07_140611.jpg`. |
| Five-tag exception | NUM 1701 displays its user-approved five tags, including Biden Administration and Susie Wiles. |

The verified live site matches the tested, R2-backed October 7 batch.
