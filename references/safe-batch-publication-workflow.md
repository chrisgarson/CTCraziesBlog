# Safe CTCrazies Batch Publication Workflow

> **This is the only supported workflow for future CTCrazies publication.** Do not run `batch_process.py`, `gen_pages_template.py`, `rebuild_search.py`, or `rebuild_tag_index.py`; each is intentionally retired because it can violate descending NUM order or regress the typed tag index.

## Non-negotiable site rule

The visitor-facing site is always in strictly descending NUM order. Home is Page 1 and contains the newest 20 articles. Page 2 contains the next 20 articles, continuing until the oldest 20 articles appear on the final page. Every page contains exactly 20 articles.

## Workbook contract

The current CTC Info workbook uses Row 1 blank, Row 2 mandatory instructions, Row 3 blank, Row 4 headers, and Row 5 onward article rows. Column B is NUM for order validation; Column D is the exact X-Post Headline; Column E is the clickable image/source URL; Column F is ImageName; and Column G is the clickable headline X-Post URL.

New spreadsheets do not need a Tiny URL column. Older articles that already have TinyURL-domain links retain those exact historic source links in the canonical ledger and during future rebuilds.

## Required sequence

Create a non-publishing draft from the incoming workbook and image folder:

```bash
python3 safe_batch.py prepare <CTC-Info.xlsx> <images-directory> <draft.json>
```

Review the exact Column D headlines and obtain approval for any new topic tags. Add the approved tags to the draft JSON, then commit the batch images to `article-images/` so their GitHub CDN URLs are available.

Validate the tagged draft against the canonical ledger and original workbook:

```bash
python3 safe_batch.py validate "<batch date>" <draft.json> --xlsx <CTC-Info.xlsx>
```

Apply only after validation succeeds:

```bash
python3 safe_batch.py apply "<batch date>" <draft.json> --xlsx <CTC-Info.xlsx>
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
