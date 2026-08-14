# Eighteen Topic-Tag Keyword Update Verification

The preview tag index at deployment `446abfb6` displayed **320 active tags** and included the newly created `Assassination` and `Non-Profit` topic tags. The first production `/tags` page load still displayed **318 active tags** without these two tags because the page fetched a cached static tag index.

The tag browser was updated to request `/tag-index.json` with `cache: 'no-store'` in both `TagsIndex.tsx` and `TagResults.tsx`. The final preview deployment `19670d27` and the refreshed production `/tags` page both displayed **320 active tags**, including `Assassination` and `Non-Profit`. The cache-fresh production JSON independently confirmed both tags as type `topic`, with 8 and 3 supplied keywords respectively.
