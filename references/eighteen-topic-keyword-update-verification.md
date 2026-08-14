# Eighteen Topic-Tag Keyword Update Verification

The preview tag index at deployment `446abfb6` displayed **320 active tags** and included the newly created `Assassination` and `Non-Profit` topic tags. The first production `/tags` page load still displayed **318 active tags** without these two tags, indicating that its runtime tag-index response requires a cache-fresh verification before final confirmation.
