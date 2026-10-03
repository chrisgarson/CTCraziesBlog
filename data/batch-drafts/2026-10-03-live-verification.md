# October 3, 2026 Live Publication Verification

The October 3 batch was deployed from the validated production build to Cloudflare Pages.

- GitHub production commit: `74abc4be4f5ba82df3b6d7385575522cf5dc3eb5`
- Cloudflare Pages deployment: `https://d519f534.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home / Page 1 | Live site displays the October 3 batch beginning at **NUM 1680** and continuing through **NUM 1661**. The displayed total is **1,680** articles. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with **NUM 1660**, preserving strict descending order and the 20-articles-per-page boundary. |
| Tag route | `https://www.ctcrazies.com/tag/Brandon%20Johnson` displays the new NUM 1678 article first, with its correct Page 1 association. |
| R2 image | The live NUM 1678 tag-route entry renders its canonical R2 image at `https://images.ctcrazies.com/article-images/2026-10-03_160410.jpg`. |
| Ignored non-tag instruction | The live Don Lemon and Gavin Newsom records do not show an unintended `Trump` tag. |

The verified live site matches the tested, R2-backed October 3 batch.
