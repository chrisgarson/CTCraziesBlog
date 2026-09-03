# NUM 1560 Image Replacement — September 3, 2026

## Scope

Only the image displayed for NUM 1560 was corrected. The article headline, source URL, X-post URL, tags, batch date, page assignment, and ordering were not changed.

## Authoritative replacement

| Field | Value |
|---|---|
| Article NUM | 1560 |
| Existing R2 object key | `article-images/2026-09-03_111425.jpg` |
| Corrected supplied file | `2026-09-03_145510.jpg` |
| Replacement byte size | 744,187 |
| Replacement SHA-256 | `f67794c810a21a33d71825335414d4e75779b43f596c8faa044158cd3508c92d` |
| Published image reference | `https://images.ctcrazies.com/article-images/2026-09-03_111425.jpg?revision=f67794c810a21a33` |

The canonical R2 object was overwritten using the established authenticated R2 uploader. The content-derived query parameter is limited to NUM 1560’s image reference and ensures browsers request the corrected object instead of retaining their previously cached image.

## Pre-publication verification

The replacement object was retrieved from the public R2 domain at both the versioned and unversioned URL. Both responses had the expected JPEG content type, 744,187-byte length, and SHA-256 checksum. Focused replacement-guard tests, the canonical site publication gate, R2 image-reference regression test, TypeScript validation, and production build passed before deployment.

## Live verification

After the Cloudflare Pages deployment, the live Home page was checked. NUM 1560 remained the first article with the unchanged headline, source link, X-post link, and four approved tags. Its image reference includes the content-derived revision query, and the page rendered the corrected supplied image from the R2 public image domain.
