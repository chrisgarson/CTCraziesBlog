# October 9, 2026 Twenty-Article Batch — Live Verification

The reviewed October 9 batch was deployed from the tested production build.

- GitHub batch commit: `3edf20fb5d7fcc2c14f5ad7873f0a888aab54ebb`
- Cloudflare Pages deployment: `https://cf40ae33.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home page | Reports **1,740** total articles and shows the new Page 1 sequence beginning with NUM **1740** and ending with NUM **1721**. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with NUM **1720**, titled “Texas Democrat James Talarico's Disturbing Record on Police Defunding Is Spotlighted by CNN.” |
| R2 image delivery | The canonical first new image, `https://images.ctcrazies.com/article-images/2026-10-09_164143.jpg`, loads directly in the browser at **802×453**. The Home page displays it as NUM 1740’s clickable image with the correct original source link. |
| Islam-Muslims tag | `https://www.ctcrazies.com/tag/Islam-Muslims` reports **56 articles** and its newest two records are the approved NUM **1722** and NUM **1739** associations. |
| Culture War tag | `https://www.ctcrazies.com/tag/Culture%20War` reports **162 articles** and includes NUM **1735**, “Democrats Plan To Obliterate Every State's Abortion Restrictions on Recommendations of AOC Memo.” |
| Abortion handling | **Abortion** remains an existing keyword of the **Culture War** topic; no independent Abortion tag was created. |
| Approved exception | NUM **1722** is live with the user-approved five tags: Abdul El-Sayed, Michigan, National Security, Terrorism, and Islam-Muslims. |

The live site matches the user-authoritative tag-review DOCX, canonical ledger, R2 upload receipt, and completed publication gates.
