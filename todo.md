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

## Topic Tag Cleanup — Part B (August 11, 2026)
- [x] Review and validate the user-provided 61-topic-tag cleanup mapping before implementation
- [x] Apply the approved topic-tag consolidations to both tag-index.json copies and article data
- [x] Rebuild, deploy, and verify the reduced topic-tag index

## Authoritative NUM-to-Page Order Correction (August 11, 2026)
- [x] Validate every current article against the user-provided NUM, headline, and WebPage mapping
- [x] Correct page files, Search.tsx, and both tag-index.json copies to the authoritative mapping
- [x] Build, deploy, and verify descending NUM order and matching page links

## Page Rendering Repairs (August 11, 2026)
- [x] Diagnose and repair the incorrect Page 5 rendering without changing article content or order
- [x] Diagnose and repair Page 69 images that render vertically cut in half
- [x] Build, deploy, and verify Pages 5 and 69

## Descending NUM Order Safeguard Audit (August 11, 2026)
- [x] Audit batch page-generation logic for paths that can break descending NUM order
- [x] Audit Search and tag-index rebuild logic for stale or incorrect page-link assignments
- [x] Define the required pre-deployment ordering validations and failure conditions
- [x] Implement approved permanent safeguards before the next batch

## Unified Safe Batch Publication System (August 11, 2026)
- [x] Create the canonical repository-tracked article ledger from the current 1,400 articles
- [x] Build a 20/40+/N-page batch processor for the current CTC Info workbook layout
- [x] Generate pages, Search.tsx, and both typed tag indexes from the canonical ledger
- [x] Add publication-blocking integrity tests for descending NUM order and page-link consistency
- [x] Retire the superseded processing scripts and document the supported workflow
- [x] Test the workflow against the current site and supplied workbook sample

## New Batch XLSX Layout Assessment (August 11, 2026)
- [x] Inspect the new spreadsheet layout and map each required processing field
- [x] Identify and document all batch-processing changes required for the new layout

## New CTC Info XLSX Processor Support (August 11, 2026)
- [x] Update the tracked batch processor for the Row 4 header and Row 5 data layout
- [x] Map Columns D–G to headline, Source URL, image filename, and X-post URL
- [x] Preserve historic TinyURL values as legacy source links during rebuilds
- [x] Validate the updated processor against the supplied sample workbook

## Topic Tag Rename (August 11, 2026)
- [x] Rename the active topic tag Lies to Gaslight-Lies while preserving all existing associations
- [x] Rebuild, verify, and publish the renamed typed tag index

## August 12, 2026 Safeguarded Article Batch
- [x] Extract and validate the CTC Info workbook and all supplied image files
- [x] Present and obtain approval for two-to-four existing topic tags per article
- [x] Create approved person tags, rename Milat Kiros to Melat Kiros, rename Israel to Israel-Jews, and create the approved Seattle topic tag
- [x] Add approved batch images and apply the canonical 20-article page update
- [x] Pass page-order, Search, tag-index, build, and live-deployment verification gates

## August 12 Topic Tag Updates
- [x] Validate all Column A source tags and Column B requested updates against the current typed tag index
- [x] Apply the approved topic-tag updates through the canonical ledger and preserve metadata
- [x] Verify, deploy, and document the reduced topic-tag index

## Current Typed Tag CSV Exports (August 12, 2026)
- [x] Generate separate current person-tag and topic-tag CSV files from the typed tag index

## 100-Article Spreadsheet-to-Live-Site Sampling Audit (August 12, 2026)
- [x] Randomly sample 100 supplied article records and verify NUM, headline, and visitor-facing page number against CTCrazies.com
- [x] Validate the sample results and deliver an auditable report

## Batch Process Script Mapping (August 12, 2026)
- [x] Map each supplied batch-to-publication process step to the active CTCrazies script or command

## Landscape Script-Mapping PDF (August 12, 2026)
- [x] Recreate the process-to-script mapping PDF in landscape orientation with a readable output column

## Virtue Signaling Topic-Tag Consolidation (August 12, 2026)
- [x] Validate and merge Virtue-Signaling into Virtue Signaling through the canonical ledger
- [x] Verify and publish the Virtue Signaling topic-tag consolidation

## GitHub Repository Visibility Assessment (August 13, 2026)
- [x] Assess whether the public CTCrazies repository should be made private, considering exposed content and operational dependencies

## AWS Secret-Scanning Alert Assessment (August 13, 2026)
- [x] Verify the reported public AWS credential exposure scope without disclosing credentials
- [x] Provide containment and cleanup recommendations for the reported AWS alerts

## Project Configuration Cleanup Impact Review (August 13, 2026)
- [x] Prepare and verify the expected impact of removing the exposed project configuration file from repository history without making any remediation changes

## Project Configuration History Cleanup (August 13, 2026)
- [x] Create and verify an isolated recovery copy before history cleanup
- [x] Remove the exposed project configuration file from the cleaned repository history and add an ignore safeguard
- [x] Force-push only the verified cleaned history to GitHub main
- [x] Verify GitHub and live-site integrity after the cleanup

## Browse Tags Bottom Navigation (August 13, 2026)
- [x] Add and verify a clickable Browse Tags link beside the bottom navigation and search controls on every article page

## August 13, 2026 Safeguarded Article Batch
- [x] Review the safeguarded workflow and create a non-publishing draft from the supplied workbook and images
- [x] Declare approved person tags Peggy Flanagan and Joe Scarborough plus topic tags Science and 2nd Amendment
- [x] Apply the user-approved August 13 per-article tag assignments and modifications
- [x] Apply the approved 20-article canonical ledger update and retain the page-order safeguards
- [x] Verify, publish, and conduct the agreed post-publication sampling audit

## August 13 Fresh 100-Article Sampling Audit
- [x] Create a new reproducible 100-record sample that excludes all NUMs used in the August 12 audit
- [x] Compare the fresh sample's NUM, headline, and assigned page with the live CTCrazies site and document the results

## Headline Sampling-Audit Remediation Threshold
- [x] Record the approved rule that headline corrections are not addressed when the sampled workbook-to-site match rate is at least 90%

## Per-Title Headline Audit Review Rule
- [x] Replace the aggregate match-rate rule with the clarified per-title substantive-match review standard

## Topic Tag Keyword CSV Export
- [x] Generate a two-column CSV of current topic tags and their associated keywords

## Seven Topic-Tag Keyword Updates
- [x] Validate and add the supplied keywords to the seven specified existing topic tags
- [x] Verify and publish the synchronized typed tag-index update

## Eighteen Topic-Tag Keyword Updates
- [x] Create approved topic tags Assassination and Non-Profit, then add the supplied keywords to all eighteen specified topic tags
- [x] Update the tag browser to refresh the typed tag index after deployment
- [x] Verify and publish the synchronized typed tag-index update

## Assassination and Non-Profit Article Tag Assignments
- [x] Identify only the articles returned by the supplied Assassination and Non-Profit search-result URLs
- [x] Add a reusable canonical-ledger command for reviewed existing-article tag-assignment plans
- [x] Add only the corresponding topic tag to each identified article through the canonical ledger
- [x] Verify and publish the two-topic article-assignment update

## Person Tag Aliases and Keywords CSV Export
- [x] Generate an updated Person-tag CSV that includes each tag's aliases and keywords

## Corrected Two-Column Person Tag Export
- [x] Recreate the Person-tag CSV with Person Tag in Column A and Aliases / Keywords in Column B only

## Governor-Form Person Tag Consolidations
- [x] Merge Governor Hochul into Kathy Hochul and preserve Governor Hochul as an alias
- [x] Merge Governor Tim Walz into Tim Walz and preserve Governor Tim Walz as an alias
- [x] Create Bob Ferguson as a person tag, merge Governor Ferguson into it, and preserve Governor Ferguson as an alias
- [x] Verify and publish the consolidated typed person-tag index

## Person Tag Alias and Keyword Updates
- [x] Validate and add the supplied aliases and keywords to the specified existing person tags
- [x] Verify and publish the synchronized typed person-tag index update

## Title-Plus-Surname Person Tag Rule
- [x] Record the rule to use the clear canonical full-name person tag for title-plus-surname headlines and request clarification only when identity is genuinely uncertain

## Obama and Sanders Person Tag Updates
- [x] Create Michelle Obama as a person tag
- [x] Consolidate Barack Obama into canonical Obama and preserve Barack Obama as an alias
- [x] Add Bernie as an alias for Bernie Sanders
- [x] Verify and publish the updated typed person-tag index

## Final Current Person and Topic Tag Exports
- [x] Generate the current two-column Person-tag and Topic-tag CSV files with aliases or keywords

## Left-Wing Exact Keyword Replacement
- [x] Replace the Left-Wing topic tag's keywords with the exact 24 user-supplied values while preserving its article associations
- [x] Verify and publish the synchronized typed topic-tag index update

## TinyURL Batch Output Assessment
- [x] Assess a safeguarded TinyURL-generation step that produces a downloadable text file after each article batch
- [x] Assess whether IS.gd can safely replace TinyURL for the optional shortened-link output
- [x] Run a standalone rate-limited IS.gd test using the 20 Source URLs in CTCInfo08132026.xlsx and deliver the results file
- [x] Use the user-confirmed Column B NUM and Column E Source URL mapping for the isolated IS.gd test
- [x] Diagnose the uniform IS.gd "database insert failed" response before drawing a test conclusion

## August 15 2026 Twenty-Article Batch
- [x] Inspect CTCInfoImages08152026.zip and validate its workbook, NUM sequence, and image package
- [x] Resolve the mismatch between the workbook's Column E-to-G headers and the actual row data before preparing the batch
- [x] Validate CTCInfoCorrected08152026.xlsx as the replacement authoritative workbook for this batch
- [x] Prepare the exact-headline article draft and proposed 2-to-4 tag assignments for review
- [x] Obtain approval for the August 15 edited tag plan and the NUM 1458 five-tag exception
- [x] Reconcile the user-edited August 15 tag-review document into the final non-publishing tag plan
- [x] Apply the approved batch, regenerate every derived page and index, and publish after required verification
- [ ] Complete the fresh post-publication sampling audit when the authoritative complete-list workbook is available

## NUM 1458 Headline Correction
- [x] Replace NUM 1458’s headline with the exact user-supplied wording and republish only that correction

## NUM 1453 Headline and Tag Correction
- [x] Replace NUM 1453’s headline with the exact user-supplied wording, add Weaponization, and republish only those corrections

## Future Batch Tag Review Format
- [x] Use an editable DOCX table with NUM, exact X-Post headline, and proposed tags as the standard review document for future batches

## August 17 2026 Twenty-Article Batch
- [x] Inspect CTCInfo08172026.zip and validate its workbook, NUM sequence, and image package
- [x] Prepare an editable DOCX review table with exact headlines and proposed 2-to-4 tag assignments
- [x] Reconcile the user-edited August 17 DOCX into the final approved tag plan
- [x] Apply the user-approved edits from EditedAug17_2026_Twenty-Article_Batch_Tag_Review.docx
- [x] Apply the user-approved batch, regenerate every derived page and index, and publish after required verification
- [ ] Complete the fresh post-publication sampling audit when the authoritative complete-list workbook is available

## August 17 Production Rendering Verification
- [x] Diagnose and resolve the blank production homepage observed immediately after deployment

## NUM 1478 Headline Correction
- [x] Replace NUM 1478’s headline with the exact user-supplied wording and republish only that correction

## Live Headline Image Display
- [x] Identify every affected live page and determine the root cause of missing headline images
- [ ] Apply and verify the minimal image-delivery correction without altering article content or links
- [x] Add a constrained image fallback for temporary jsDelivr asset unavailability

## Missing Historical Image Recovery
- [x] Locate a viable source-page recovery path for the 581 missing historical images
- [x] Recover 538 missing image assets from article-source metadata and identify the exact-original-asset path for the remainder
- [x] Recover 31 of the 34 remaining exact original image assets; retain two legacy public assets and identify one unrecoverable exception
- [ ] Migrate all recovered historical image references to the public jsDelivr image path
- [ ] Publish the recovered historical image files and migrated references, then verify live rendering

## Refreshed Two-Column Person Tag Export
- [x] Generate the current Person-tag CSV with Person Tag in Column A and Aliases / Keywords in Column B
