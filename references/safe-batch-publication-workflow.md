# Safe CTCrazies Batch Publication Workflow

> **This is the only supported workflow for future CTCrazies publication.** Do not run `batch_process.py`, `gen_pages_template.py`, `rebuild_search.py`, or `rebuild_tag_index.py`; each is intentionally retired because it can violate descending NUM order or regress the typed tag index.

## Non-negotiable site rule

The visitor-facing site is always in strictly descending NUM order. Home is Page 1 and contains the newest 20 articles. Page 2 contains the next 20 articles, continuing until the oldest 20 articles appear on the final page. Every page contains exactly 20 articles.

## Workbook contract

The current CTC Info workbook uses Row 1 blank, Row 2 mandatory instructions, Row 3 blank, Row 4 headers, and Row 5 onward article rows. Column B is NUM for order validation; Column D is the exact X-Post Headline; Column E is the clickable image/source URL; Column F is ImageName; and Column G is the clickable headline X-Post URL.

New spreadsheets do not need a Tiny URL column. Older articles that already have TinyURL-domain links retain those exact historic source links in the canonical ledger and during future rebuilds.

## Required sequence

Create a non-publishing draft from the incoming workbook and image folder. The ingestion step accepts images placed directly in the supplied directory or in one uniquely identifiable nested subdirectory, but rejects ambiguous duplicate filenames:

```bash
python3 safe_batch.py prepare <CTC-Info.xlsx> <images-directory> <draft.json>
```

Review the exact Column D headlines and proposed tags through an editable DOCX review document. The document must contain a three-column table with **NUM**, the **exact Column D X-Post Headline**, and **Proposed Tags**. The user may edit the tag cells directly and upload the edited DOCX; that uploaded document is the authority for the final reviewed tag plan. Transfer the edited tags into the final plan without changing any headline, source URL, image name, or X-post URL. A user-provided five- or six-tag row is explicit approval for that row's documented exception; record five-tag NUMs in `allowFiveTagNums` and six-tag NUMs in `allowSixTagNums`. Obtain approval before any new topic tag is declared; full-name person tags follow the established person-tag rule.

All new batch images are stored in the `ctcrazies-article-images` Cloudflare R2 bucket and publicly served from `https://images.ctcrazies.com/article-images/`. Do **not** copy new batch images to `article-images/` or commit them to GitHub. After the final tag plan has been applied to the draft, run the R2 upload command before `apply`. It uploads each locally verified image with checksum validation and produces a local receipt; `apply` is prohibited until that command succeeds for every batch image.

```bash
python3 safe_batch.py apply-tag-plan <draft.json> <approved-tag-plan.json> <final.json>
python3 safe_batch.py validate "<batch date>" <final.json> --xlsx <CTC-Info.xlsx>
python3 safe_batch.py upload-images-r2 <final.json> --xlsx <CTC-Info.xlsx>
```

Validate the tagged draft against the canonical ledger and original workbook:

```bash
python3 safe_batch.py validate "<batch date>" <draft.json> --xlsx <CTC-Info.xlsx>
```

Apply only after validation succeeds:

```bash
python3 safe_batch.py apply "<batch date>" <final.json> --xlsx <CTC-Info.xlsx>
python3 verify_safe_site.py
pnpm run build
```

The validator rejects a batch that is not a positive multiple of 20, whose NUMs are not exactly contiguous after the current maximum NUM, whose headlines or Column E Source URLs differ from the workbook, whose images are absent, or whose tags lack prior approval.

The apply step recalculates every visitor-facing page from descending NUM order. The shift equals `incoming article count ÷ 20`: a 20-article batch shifts existing content by one page; a 40-article batch shifts it by two pages.

`verify_safe_site.py` is a publication gate. It must pass before GitHub commit or Cloudflare deployment. It verifies page sizes and order, Search page assignments, both typed tag-index copies, retained tag metadata/keywords, and all page/tag routes.

## Title-plus-surname person-tag rule

When a headline identifies a person by an office title plus surname—such as `Senator Klobuchar` or `Governor Newsom`—assign the existing canonical full-name person tag when the intended person is clear from the headline context. Do not create a separate title-form tag. If the identity is genuinely uncertain, request user clarification before assigning a person tag.

## Post-publication sampled headline-audit policy

When an authoritative complete-list workbook is supplied after publication, perform the reproducible spreadsheet-to-live-site sampling audit and report all NUM, page, and headline findings. Review headline differences **one title at a time**, not as an aggregate sample percentage. Ignore differences limited to punctuation, quotation-mark or apostrophe style, spacing, capitalization, and other minor wording variations that do not make the two titles clearly poor matches.

Flag a title for user review only when the workbook and live versions are clearly not a good match—generally when substantive additions, omissions, or replacements appear to exceed roughly 10% of that individual title. This is a review flag, not an automatic correction rule: no headline change is made unless the user separately directs it.
