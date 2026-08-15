# TinyURL Batch Output Assessment

TinyURL provides an authorized REST API at `https://api.tinyurl.com`. Its official documentation identifies `POST /create` for one short link and `POST /bulk` for a processing batch. Both require a TinyURL API token using HTTP bearer authentication. A token is created by signing in to TinyURL and visiting its API Settings page; TinyURL states that the token must be kept secret and replaced if it is compromised.

No TinyURL connector is currently configured for this task.

## Recommended safeguarded batch design

1. Preserve the workbook Column E Source URL as the site’s canonical article-image link. Never replace it with a TinyURL value in the article ledger or published pages.
2. After the batch passes normal workbook, image, and tag validation, submit the new batch Source URLs to TinyURL. Use the documented bulk endpoint when supported by the account; otherwise issue one documented `POST /create` request per validated URL.
3. Validate every returned short URL has the expected `tinyurl.com` host and associate it with the article's NUM, verbatim headline, and original Source URL.
4. Write a downloadable UTF-8 text file, for example `2026-08-20-tinyurls.txt`, with one reviewed record per article. A tab-separated format is recommended: `NUM`, `Headline`, `Source URL`, `TinyURL`.
5. Treat any TinyURL failure as a separate batch-output failure. Do not modify the ledger, pages, GitHub source, or production deployment because a shortened-link request fails; report the affected NUMs for retry instead.
6. Store the API token only as a protected secret or approved connector credential, never in the ledger, workbook, script source, text output, Git history, or published website.

## Required user decisions before implementation

The user must decide whether this step should run automatically for every future batch or only when explicitly requested. The user must also provide a TinyURL API token or approve configuring a TinyURL connector. The existing publication workflow remains unchanged until those decisions are made.

## IS.gd alternative assessment

IS.gd documents a public HTTPS API at `https://is.gd/create.php`. It accepts a GET or POST request, requires the long URL parameter to be URL encoded, and can return JSON in the form `{ "shorturl": "https://is.gd/..." }`. The published documentation does not require an API token. It warns that the API is primarily intended for low-volume or end-user applications, allows no more than five simultaneous connections, and applies per-IP rate limits. It requires a client that reaches the rate limit to pause before retrying. These constraints are compatible with a 20-article batch only if requests are sequential or tightly limited, with explicit handling for the documented rate-limit and service errors.

IS.gd can therefore serve as an alternative for the separate downloadable short-link list. However, because its links are created without an account credential, the proposed workflow cannot provide account-level link inventory, authenticated management, or the same credential-controlled operational trace offered by TinyURL. The Source URL in the canonical article ledger must remain unchanged regardless of the selected provider.

## Official sources

- TinyURL OpenAPI documentation: https://api.tinyurl.com/
- TinyURL API feature overview: https://tinyurl.com/app/features/url-shortener-api
- IS.gd Developer Section: https://is.gd/developers.php
- IS.gd URL Shortening API Reference: https://is.gd/apishorteningreference.php
