# October 17, 2026 Twenty-Article Batch — Live Verification

The user-reviewed October 17 batch was deployed from the tested production build.

- GitHub batch commit: `214d8bb5bc9ae660650e0c5a8a117624f107e981`
- Cloudflare Pages deployment: `https://0fe8082a.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Authorized internal input repairs

The source ZIP and original workbook were preserved. The batch used only these user-authorized working-copy repairs:

1. `To Info.xlsx!B4`: blank → `NUM`.
2. NUM 1762 local image filename: `2026-10-17_085823.jpg.jpg` → `2026-10-17_085823.jpg`; the file checksum was verified unchanged before R2 upload.

No article headline, source URL, X-post URL, image content, NUM, or order was changed by these repairs.

## Verified live behavior

| Check | Result |
|---|---|
| Home page | Reports **1,780** total articles and shows the new Page 1 sequence beginning with NUM **1780** and ending with NUM **1761**. |
| Home images and source links | A completed-browser-DOM check confirmed **20** loaded article images (all with nonzero natural dimensions) and the corresponding original source links for the new Page 1 batch. |
| Approved five-tag record | NUM **1777** is live with the approved five tags: David Crowley, Wisconsin, Healthcare Policy, Transparency, and Communism-Socialism. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with NUM **1760**, “School Vouchers Are a Talarico Target As Texas Senate Candidate Claims They Are Part of 'Christian Nationalist' Movement.” |
| Representative tag route | `https://www.ctcrazies.com/tag/David%20Crowley` reports **6 articles** and begins with the new NUM **1777** Page 1 article. |
| NUM 1762 canonical R2 image | `https://images.ctcrazies.com/article-images/2026-10-17_085823.jpg` loads directly in the browser at **1760×1120**. This is the canonical image URL referenced by NUM 1762 after the authorized local filename repair. |
| R2 pre-apply verification | The R2 receipt matched all **20** local image checksums, byte sizes, filenames, and canonical URLs. All 20 public image URLs returned successful range responses before application. |

The live site matches the user-authoritative tag-review DOCX, the final tag plan, the canonical ledger, the R2 upload receipt, and all completed publication gates.
