# October 12, 2026 Twenty-Article Batch — Live Verification

The reviewed October 12 batch was deployed from the tested production build.

- GitHub batch commit: `3bde4eb6f4bdaedbeb1c20a232e2228e37bcd2a6`
- Cloudflare Pages deployment: `https://d0c7a2ae.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home page | Reports **1,760** total articles and shows the new Page 1 sequence beginning with NUM **1760** and ending with NUM **1741**. |
| Approved five-tag record | NUM **1760** is live with the approved five tags: James Talarico, Texas, Education Policy, Christianity, and Left-Wing. The post-apply and generated-search integrity checks also verified the approved five-tag exceptions for NUMs **1758** and **1742**. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with NUM **1740**, titled “It's Now 13 Days & People Are Starting To Ask 'Where in the World Is Beta-Democrat James Talarico?'” |
| R2 image delivery | The canonical first new image, `https://images.ctcrazies.com/article-images/2026-10-12_140319.jpg`, loads directly in the browser at **769×435**. The Home page displays it as NUM 1760’s clickable image with the correct source link. |
| Stefany Shaheen person tag | `https://www.ctcrazies.com/tag/Stefany%20Shaheen` reports **1 article**: NUM **1756**, “New Hampshire's Tax & Spend Democrat Stefany Shaheen Wants To Roll Back Trump's Tax Breaks for Families,” with Page 1 association. |
| Typed tag index | Stefany Shaheen is classified as a **person** in both synchronized typed tag-index copies. |

The live site matches the user-authoritative tag-review DOCX, canonical ledger, R2 upload receipt, and completed publication gates.
