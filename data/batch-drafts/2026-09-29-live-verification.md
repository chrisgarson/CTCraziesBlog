# September 29, 2026 Live Publication Verification

The September 29 batch was deployed from the validated production build to Cloudflare Pages.

- GitHub production commit: `0888d3f2dd8e480af491b71045397b971f3b47f0`
- Cloudflare Pages deployment: `https://d9fe495b.ctcrazies.pages.dev`
- Public site verified: `https://www.ctcrazies.com/`

## Verified live behavior

| Check | Result |
|---|---|
| Home / Page 1 | Live site displays the new batch beginning at **NUM 1660** and contains the September 29 articles through **NUM 1641**. The displayed total is **1,660** articles. |
| Page 2 boundary | `https://www.ctcrazies.com/page2` begins with **NUM 1640**, preserving strict descending order and the 20-articles-per-page boundary. |
| New person tag | `https://www.ctcrazies.com/tag/Christina%20Hines` displays **1 article**, NUM 1653, with the correct Page 1 association and live R2 image. |
| NUM 1651 correction | The Home page displays the exact authorized headline: `Definitely a Mama's Boy: To Keep Her Boy From Moderating His Radical Democrat-Socialist Views, James Talarico's Mother Plans Physical Move to D.C. To Keep An Eye On Him`. |
| NUM 1647 correction | `https://www.ctcrazies.com/tag/Impeachment` displays the exact authorized headline: `A Vast ‘Stop-Trump’ Oversight Agenda Awaits In 2027 as House Democrats Keep 3rd Impeachment in Play`. Its source link, X-post link, Page 1 association, and R2 image render correctly. |
| R2 images | The live Christina Hines and Impeachment tag-route entries both render their canonical `https://images.ctcrazies.com/article-images/` images. |

The verified live content matches the R2-backed, tested build published from the September 29 batch.
