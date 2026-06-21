# Outside The Narrative - X-Post Website TODO

## Completed Features
- [x] Set up website structure with 3 pages (20 posts per page)
- [x] Add "Outside The Narrative" title in Dancing Script cursive font, maroon color (#800000)
- [x] Process all 60 posts from 7 groups (Original + Groups 1-6)
- [x] Crop all 60 images with standard 175px top / 0px bottom
- [x] Create Home page (Page 1) with posts 60-41
- [x] Create Page 2 with posts 40-21
- [x] Create Page 3 with posts 20-1
- [x] Add pagination navigation on all pages
- [x] Make images clickable linking to article URLs (tinyurl)
- [x] Add X-Post links to original X/Twitter posts
- [x] Add Google Fonts (Dancing Script) to index.html
- [x] Configure routing for all 3 pages in App.tsx
- [x] Restore website after sandbox reset using all zip files

## Website Structure
- **Page 1 (Home)**: Posts 60-41 (newest 20 posts)
- **Page 2**: Posts 40-21 (middle 20 posts)
- **Page 3**: Posts 20-1 (oldest 20 posts)

## Image Cropping Standard
- Top crop: 175px (removes X interface elements)
- Bottom crop: 0px (preserves article image with attribution)
- All images saved as: post{number}_clean.jpg

## Post Groups Processed
1. Original group: Posts 1-2
2. Group 1: Posts 3-12
3. Group 2: Posts 13-22
4. Group 3: Posts 23-32
5. Group 4: Posts 33-42
6. Group 5: Posts 43-52
7. Group 6: Posts 53-60

## Future Additions
- [ ] Add new posts in batches of 20 (one full page at a time)
- [ ] Apply same 175px/0px cropping standard to all future posts
- [ ] Update pagination when adding new pages


## Image Sizing Corrections (Current Tasks)
- [x] Test crop values (140px, 145px, 160px, 165px) to find optimal setting
- [x] Re-crop all 60 images with correct crop value (140px for Original/Group1, 165px for Group2-6)
- [x] Remove max-width constraint from image CSS (removed max-w-2xl)
- [x] Verify images match yesterday's wider appearance
- [x] Update IMAGE_CROPPING_INSTRUCTIONS.md with final crop values used


## Experiment: Smaller Headlines for Group 7
- [x] Change Group 7 posts (61-80) to text-2xl headline size
- [x] Keep posts 1-60 unchanged with text-4xl
- [x] Test visual appearance
- [x] Save checkpoint for comparison


## Re-crop Group 7 Images for text-2xl Headlines
- [x] Test crop values to optimize for text-2xl headline layout
- [x] Re-crop all 20 Group 7 images with 165px crop value
- [x] Verify visual balance improved for multi-line headlines
- [x] Save checkpoint with optimized images


## Group 8 Processing (Posts 81-100)
- [x] Extract Group 8 zip file
- [x] Crop 20 images with 165px top crop
- [x] Extract post data from Excel file
- [x] Combine with existing 80 posts data
- [x] Repaginate: Page 1 (100-81), Page 2 (80-61), Page 3 (60-41), Page 4 (40-21), Page 5 (20-1)
- [x] Update all pagination links
- [x] Use text-2xl headlines for Group 8 posts
- [ ] User to identify posts with interface remnants
- [ ] Perform surgical fixes if needed
- [x] Save checkpoint


## Group 8 NUM-to-ImageName Mismatch Fix
- [x] Investigate root cause of mismatch (bug: used row index instead of NUM column value)
- [x] Regenerate all_posts_data.json with correct NUM-to-ImageName mapping (already correct)
- [x] Re-crop all 20 Group 8 images with correct assignments
- [x] Verify all posts display correct image-headline pairs
- [x] Save checkpoint with corrected mapping


## Investigate Groups 1-7 for Potential Mismatch Bug
- [ ] Check if Groups 1-7 Excel files have NUM in sequential row order
- [ ] If NUM is NOT sequential, verify current images match correct NUM-to-ImageName pairs
- [ ] Identify which groups (if any) need reprocessing
- [ ] Report findings to user


## Group 9 Processing (Posts 101-120)
- [x] Extract Group 9 zip file
- [x] Crop 20 images with 165px top crop using CORRECTED script (NUM from column A)
- [x] Extract post data from Excel file
- [x] Combine with existing 100 posts data
- [x] Repaginate: Page 1 (120-101), Page 2 (100-81), Page 3 (80-61), Page 4 (60-41), Page 5 (40-21), Page 6 (20-1)
- [x] Update all pagination links
- [x] Use text-2xl headlines for Group 9 posts
- [x] Verify no NUM-to-ImageName mismatch errors (Post 120 verified correct)
- [x] Save checkpoint


## Post 108 Surgical Crop Fix
- [x] Test crop values (170px, 175px, 180px, 185px, 190px, 195px) on post 108 image
- [x] Apply optimal crop (195px) to remove X interface remnants
- [x] Replace post108_clean.jpg with fixed version
- [x] Verify fix on Page 1 (confirmed clean - no tinyurl/hashtag visible)
- [x] Save checkpoint


## Fix Broken Article URL for AOC Post on Page 2
- [x] Locate AOC post ("NY's leading ditz, Democrat AOC...") in all_posts_data.json
- [x] Identify post number (Post 85)
- [x] Update article URL from broken link to https://dailycaller.com/2026/02/16/aoc-venezuela-equator-tedx-tu-berlin/
- [x] Regenerate Page 2 with corrected URL
- [x] Verify link works correctly (https:// prefix added)
- [x] Save checkpoint


## Fix Page 1 (Home.tsx) Broken URLs
- [x] Investigate why all article URLs return 404 errors on Page 1
- [x] Investigate why all X-Post URLs are incorrect on Page 1
- [x] Compare Page 1 (broken) with Page 2 (working) to identify the issue
- [x] Fix article URLs for posts 101-120 in Home.tsx
- [x] Fix X-Post URLs for posts 101-120 in Home.tsx
- [x] Verify all links work correctly
- [x] Save checkpoint


## Fix Broken TinyURL Links on Pages 4, 5, and 6
- [x] Investigate why posts 1-60 article URLs now return TinyURL 404 errors
- [x] Compare current all_posts_data.json with yesterday's working version
- [x] Restore correct article URLs for posts 1-60
- [x] Regenerate Page3.tsx, Page4.tsx, Page5.tsx, Page6.tsx with corrected URLs
- [x] Verify article links work correctly on all affected pages
- [x] Save checkpoint


## Recreate Page 3 with New Group 7 Data
- [x] Extract new Group 7 zip file (Group7InfoimagesX-posts02202026.zip)
- [x] Crop all 20 Group 7 images with 165px top crop
- [x] Extract correct data from Excel (Columns A, B, E, F, H)
- [x] Fix malformed TinyURL in Post 79 (add https:// prefix)
- [x] Update only posts 61-80 in all_posts_data.json
- [x] Regenerate ONLY Page3.tsx (do not touch other pages)
- [x] Verify X-Post links work correctly
- [x] Verify image-headline matches are correct
- [x] Save checkpoint


## Fix Page 3 Formatting to Match Other Pages
- [x] Read Page2.tsx to understand the correct layout structure
- [x] Identify formatting differences between Page 3 and other pages
- [x] Regenerate Page3.tsx with correct layout (headline above card, not inside)
- [x] Verify Page 3 visually matches Page 2 layout
- [x] Save checkpoint


## Fix Page 3 Image-Headline Mismatches (CRITICAL)
- [x] Verify all_posts_data.json posts 61-80 have correct Group 7 image filenames (post61_clean.jpg through post80_clean.jpg)
- [x] Check that image files exist in /home/ubuntu/x-post-platform/client/public/images/
- [x] Regenerate Page3.tsx with BOTH correct Group 7 data AND correct Page2-style formatting
- [x] Manually verify at least 3 posts have correct image-headline matches
- [x] Save checkpoint


## Fix Page 4 Broken X-Post Links
- [x] Extract correct X-Post URLs from Combined20InfoImagesFrm4-5-6.zip Excel Column H
- [x] Update only X-Post URLs in all_posts_data.json for posts 41-60
- [x] Regenerate Page4.tsx with corrected X-Post links (keep current formatting)
- [x] Verify at least 2 X-Post links work correctly
- [x] Save checkpoint


## Fix Missing Images on Page 4
- [x] Crop all 20 images from Combined20InfoImagesFrm4-5-6.zip with 165px top crop
- [x] Copy cropped images to /home/ubuntu/x-post-platform/client/public/images/
- [x] Verify images display correctly on Page 4
- [x] Save checkpoint


## Fix Page 4 Image Filenames in Data
- [x] Update image_name field for posts 41-60 in all_posts_data.json to use post{N}_clean.jpg format
- [x] Regenerate Page4.tsx with correct image filenames
- [x] Verify images display correctly on Page 4
- [x] Save checkpoint


## Fix Page 4 Image Order (CRITICAL - Images Reversed)
- [x] Extract ImageName from Excel Column F for each post 41-60
- [x] Match Excel ImageName to actual image files in zip folder
- [x] Recrop images using correct Excel ImageName mapping
- [x] Verify image-headline matches are correct (first image should match first headline)
- [x] Save checkpoint


## Fix Page 5 Broken X-Post Links
- [x] Extract correct X-Post URLs from Combined20InfoImagesFrm4-3-2.zip Excel Column H
- [x] Update only X-Post URLs in all_posts_data.json for posts 21-40
- [x] Regenerate Page5.tsx with corrected X-Post links (keep current formatting, headlines, images)
- [x] Verify at least 2 X-Post links work correctly
- [x] Save checkpoint


## Fix Page 5 Formatting (Remove Unauthorized Green Borders)
- [x] Read Page2.tsx to understand correct layout structure
- [x] Regenerate Page5.tsx with correct formatting (no green borders, headline above image)
- [x] Keep corrected X-Post links from previous fix
- [x] Crop and copy all 20 Page 5 images to project directory
- [x] Verify Page 5 matches Page 2 layout
- [x] Save checkpoint


## Fix Page 6 Broken X-Post Links
- [x] Extract correct X-Post URLs from Page6Group20Infoimages.zip Excel Column H
- [x] Map Excel rows to correct post numbers (handle 0.9 and 0.8 mapping to posts 2 and 1)
- [x] Update only X-Post URLs in all_posts_data.json for posts 1-20 (18 posts total: 1-10, 13-20)
- [x] Regenerate Page6.tsx with corrected X-Post links (keep current formatting, headlines, images)
- [x] Verify at least 2 X-Post links work correctly (Post 20 verified)
- [x] Save checkpoint


## Fix Missing Images on Page 6
- [x] Extract ImageName from Excel Column F for posts 1-20 (18 posts: 1-10, 13-20)
- [x] Crop all Page 6 images with 165px top crop using correct Excel ImageName mapping
- [x] Copy cropped images to /home/ubuntu/x-post-platform/client/public/images/
- [x] Verify images display correctly on Page 6
- [x] Save checkpoint


## Fix Page 6 Image Filenames in Page6.tsx
- [x] Regenerate Page6.tsx with correct cleaned image filenames (post{N}_clean.jpg)
- [x] Verify images display correctly on Page 6
- [x] Save checkpoint


## Fix Page 6 Formatting to Match Pages 1-5 (Remove White Card Borders)
- [x] Read Page5.tsx to understand correct formatting structure
- [x] Regenerate Page6.tsx with correct formatting (no white cards, headline above image, source below in gray)
- [x] Verify Page 6 matches Pages 1-5 formatting exactly
- [x] Save checkpoint


## Completely Rebuild Page 6 Using New Data (Page6bGroup20Infoimages.zip)
- [x] Extract new zip file
- [x] Extract post data from Excel (Columns A, B, E, F, H)
- [x] Crop all Page 6 images with 165px top crop using correct Excel mapping
- [x] Regenerate Page6.tsx with correct data and Page 5 formatting
- [x] Verify Page 6 displays correctly
- [x] Save checkpoint


## Process New Batch (OTNInfoImages022226.zip) - Create New Page 1
- [x] Extract new zip file and examine contents
- [x] Extract post data from Excel (Columns A, B, E, F, H)
- [x] Crop all 20 images with 165px top crop using Column F (ImageName) mapping
- [x] Read current Home.tsx to capture formatting template
- [x] Shift existing pages down: Page1→Page2, Page2→Page3, Page3→Page4, Page4→Page5, Page5→Page6, Page6→Page7
- [x] Create new Home.tsx with new 20 posts using template formatting
- [x] Update navigation links on all 7 pages
- [x] Verify new Page 1 displays correctly
- [x] Save checkpoint


## Correct Post 124 (17th Post on Page 1) with New Information and Image
- [x] Extract correct Post 124 data from Correctedinfo124thpost.xlsx
- [x] Crop new image (2026-02-22_104426.jpg) with 165px top crop
- [x] Update Post 124 in Home.tsx with correct headline, article URL, X-Post URL, and image
- [x] Verify Post 124 displays correctly on Page 1
- [x] Save checkpoint


## Process New Batch (OTNInfoImages022426.zip) - Create New Page 1
- [x] Extract new zip file and examine contents
- [x] Extract post data from Excel (Columns A, B, E, F, H)
- [x] Crop all 20 images with 165px top crop using Column F (ImageName) mapping
- [x] Read current Home.tsx to capture formatting template
- [x] Shift existing pages down: Page1→Page2, Page2→Page3, Page3→Page4, Page4→Page5, Page5→Page6, Page6→Page7, Page7→Page8
- [x] Create new Home.tsx with new 20 posts using template formatting
- [x] Update navigation links on all 8 pages
- [x] Verify new Page 1 displays correctly
- [x] Save checkpoint


## Process New Batch (OTNInfoImages022426b.zip) - Create New Page 1
- [x] Extract new zip file and examine contents
- [x] Extract post data from Excel (Columns A, B, E, F, H)
- [x] Crop all 20 images with 165px top crop using Column F (ImageName) mapping
- [x] Read current Home.tsx to capture formatting template
- [x] Shift existing pages down: Page1→Page2, Page2→Page3, Page3→Page4, Page4→Page5, Page5→Page6, Page6→Page7, Page7→Page8, Page8→Page9
- [x] Create new Home.tsx with new 20 posts using template formatting
- [x] Update navigation links on all 9 pages
- [x] Verify new Page 1 displays correctly
- [x] Save checkpoint


## Fix Page 1 to Include All 20 Posts (180-161)
- [x] Re-extract Excel data to include Post 161 (missing from initial extraction)
- [x] Regenerate Home.tsx with all 20 posts (180-161)
- [x] Verify all 20 posts display correctly
- [x] Save checkpoint


## Fix Post 162 Headline - Remove 'http://' Artifact
- [x] Remove 'http://' from end of Post 162 headline in Home.tsx
- [x] Save checkpoint


## Process New Batch (OTNInfoImages022626.zip) - Create New Page 1
- [x] Extract new zip file and examine contents
- [x] Extract post data from Excel (Rows 2-21, Columns A, B, E, F, H)
- [x] Crop all 20 images with 165px top crop using Column F (ImageName) mapping
- [x] Read current Home.tsx to capture formatting template
- [x] Shift existing pages down: Page1→Page2, Page2→Page3, Page3→Page4, Page4→Page5, Page5→Page6, Page6→Page7, Page7→Page8, Page8→Page9, Page9→Page10
- [x] Create new Home.tsx with new 20 posts using template formatting
- [x] Update navigation links on all 10 pages
- [x] Verify new Page 1 displays correctly
- [x] Save checkpoint


## Fix Two Headline Errors on Page 1
- [x] Find post with image 2026-02-27_064852.jpg and remove `\"` from headline
- [x] Find post with image 2026-02-27_065105.jpg and change "prinicpal" to "principle"
- [x] Save checkpoint

## Fix Non-Clickable 'Newest Posts' Link on All Pages
- [x] Fix 'Newest Posts' link on Pages 2-10 to navigate to Home page
- [x] Save checkpoint

## Test Roboto Slab Bold 700 Font on Page 1 Title
- [x] Add Roboto Slab font import to index.html
- [x] Update Home.tsx title to use Roboto Slab Bold 700 at 80px
- [x] Save checkpoint

## Add 1-Line Subtitle Below Title on Page 1
- [x] Add subtitle in Dancing Script font below title in Home.tsx, sized to fit 1 line
- [x] Save checkpoint

## Update Subtitle Text on Page 1
- [x] Change subtitle to "Articles that legacy journalism ignores & hides."
- [x] Save checkpoint

## Resize Subtitle on Page 1 to Span from 's' in Outside to 't' in Narrative
- [x] Calculate font size so subtitle spans slightly less than full title width
- [x] Update Home.tsx subtitle font size
- [x] Save checkpoint

## Apply Roboto Slab Bold 700 Title to Pages 2-10 (No Subtitle)
- [x] Update title font on Pages 2-10 to Roboto Slab Bold 700 at 80px maroon
- [x] Save checkpoint

## Change Blog Title to 'Curating The Crazies'
- [x] Change title from 'Outside The Narrative' to 'Curating The Crazies' on all 14 pages (Home + Pages 2-14)
- [x] Update subtitle on Page 1 (Home.tsx) if it references the old title (subtitle unchanged)
- [x] Save checkpoint

## Process New Batch (CTCInfoImages03242026.zip) - Create New Page 1 (Posts 300-281)
- [ ] Extract zip and read Excel data for posts 300-281
- [ ] Copy 20 pre-cropped images to public/images as post{N}_clean.jpg
- [ ] Shift existing pages down by 1 (Page 1→2 through Page 14→15), update navigation to 15 pages
- [ ] Create new Home.tsx with posts 300-281, Roboto Slab title + Dancing Script subtitle
- [ ] Update App.tsx routes for all 15 pages
- [ ] Verify all 15 pages pass checks
- [ ] Save checkpoint

## Process New Batch (CTCInfoImages03252026.zip) - Create New Pages 1-4 (Posts 380-301)
- [x] Upload 80 new images (posts 301-380) to CDN
- [x] Generate Page1-Page4 from new batch (posts 380-301, 20 per page)
- [x] Rename existing Page1-Page15 to Page5-Page19
- [x] Update all pagination totalPages from 15 to 19
- [x] Update App.tsx routes for all 19 pages
- [x] Verify all 19 pages display correctly
- [x] Save checkpoint

## Search Feature (Option D - Fuse.js + Header Icon + /search page)
- [x] Install fuse.js dependency
- [x] Build article search index (all 380 posts)
- [x] Create /search page with results UI
- [x] Add search icon to page headers (all 19 pages + Home)
- [x] Add Search link to Pagination component
- [x] Register /search route in App.tsx
- [x] Save checkpoint

## Batch 7 (CTCImages04032026 - Posts 461-500)
- [ ] Upload 40 new images (posts 461-500) to CDN
- [ ] Generate Page1-Page2 from new batch (posts 500-461, 20 per page)
- [ ] Rename existing Page1-Page23 to Page3-Page25
- [ ] Update all pagination totalPages from 23 to 25
- [ ] Update App.tsx routes for all 25 pages
- [ ] Rebuild search index with all 500 articles
- [ ] Save checkpoint


## Validation Integration (Completed)
- [x] Created rebuild_search.py with per-page PASS/FAIL validation (exits code 1 if any page < 20 articles, does NOT overwrite Search.tsx on failure)
- [x] Created gen_pages_template.py (committed to repo) — includes subprocess call to rebuild_search.py as mandatory final step of every batch
- [x] Tested FAIL path: correctly caught Page5 at 19 articles and blocked Search.tsx write
- [x] Tested PASS path: all 30 pages at 20 articles, Search.tsx written with 600 articles

## Batch Processing Instructions (Standing)
- For each new batch: copy gen_pages_template.py to /home/ubuntu/gen_pages.py, fill in BATCH CONFIGURATION, run python3.11 /home/ubuntu/gen_pages.py
- rebuild_search.py runs automatically as the last step
- If validation FAILS: site is still publishable (pages written, search index unchanged); fix missing article then re-run rebuild_search.py before next batch
- If validation PASSES: Search.tsx updated with full article index; proceed to checkpoint and publish


## STANDING CONSTRAINTS — DO NOT CHANGE (enforced since Batch 1)

### Page Ordering Rule
- New batch articles ALWAYS go on the Home page first (newest articles on Home page).
- All existing pages shift BACK by N pages (where N = batch_size / 20).
- NEVER append new articles to the end of the page list.
- This rule applies regardless of batch size (20, 40, 60, 80, or any multiple of 20 articles).
- Implemented in gen_pages_template.py via shift_pages() — do not bypass this function.

### CDN Image Upload Rule
- Always upload images using plain `manus-upload-file` (WITHOUT the --webdev flag).
- The --webdev flag returns /manus-storage/ paths that break image display in the Management UI preview.
- Plain manus-upload-file returns full https://files.manuscdn.com/... URLs that work everywhere.

### Article Count Per Page
- Every page must have exactly 20 articles.
- rebuild_search.py enforces this — it will not update Search.tsx if any page has fewer than 20.

### Image Upload Method
- After uploading, save all filename→URL mappings to /tmp/batch_cdn_map.txt for use by the generation script.
- Use the one-by-one upload loop (upload_batch_get_urls.sh pattern) to capture each URL reliably.


## Batch Script Automation Improvements (April 22, 2026)
- [x] Automate App.tsx route registration in gen_pages_template.py (update_app_tsx function — eliminates double-brace bug)
- [x] Automate totalPages patching across all existing page files in gen_pages_template.py (patch_total_pages function)
- [x] Ensure gen_pages_template.py uses PageHeader component on Home page (not inline header)
- [x] Ensure gen_pages_template.py uses correct CDN_BASE URL (files.manuscdn.com)
- [x] Ensure gen_pages_template.py uses flexible column header matching for Excel files
