# October 5, 2026 Live Publication Verification

The October 5 batch was deployed from the validated production build to Cloudflare Pages.

- GitHub production commit: `4b4c91d30ccaab42a8857cde89984e973d463f13`
- Cloudflare Pages deployment: `https://a97abe1e.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home / Page 1 | Live site displays the October 5 batch beginning at **NUM 1700** and continuing through **NUM 1681**. The displayed total is **1,700** articles. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with **NUM 1680**, preserving strict descending order and the 20-articles-per-page boundary. |
| Transparency topic route | `https://www.ctcrazies.com/tag/Transparency` contains exactly the two approved October 5 entries: NUMs **1686** and **1688**, both associated with Page 1. |
| Tanya Chutkan person route | `https://www.ctcrazies.com/tag/Tanya%20Chutkan` contains the approved NUM 1688 Page 1 article. |
| R2 images | The live tag routes render canonical R2 images, including `https://images.ctcrazies.com/article-images/2026-10-05_141729.jpg` and `https://images.ctcrazies.com/article-images/2026-10-05_142053.jpg`. |
| Declined person tags | Michael Jordan, John H. Johnson, and Charles Barkley are not present as tags on the new batch records. |

The verified live site matches the tested, R2-backed October 5 batch.
