#!/usr/bin/env python3
"""
Rebuild tag-index.json from all 1,320 articles in Search.tsx.
Output: client/public/tag-index.json
Format: { "TagName": [ {headline, tinyUrl, imageUrl, tags, page, batchDate}, ... ], ... }
"""

import re
import json
import os

SEARCH_PATH = '/home/ubuntu/x-post-platform/client/src/pages/Search.tsx'
OUTPUT_PATH = '/home/ubuntu/x-post-platform/client/public/tag-index.json'

with open(SEARCH_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the articles array
arr_start = content.find('const articles = [')
arr_start = content.find('[', arr_start)
depth = 0
arr_end = arr_start
for i, ch in enumerate(content[arr_start:], arr_start):
    if ch == '[': depth += 1
    elif ch == ']':
        depth -= 1
        if depth == 0:
            arr_end = i
            break

array_str = content[arr_start:arr_end+1]

# Parse all article objects
obj_pattern = re.compile(r'\{[^{}]*\}', re.DOTALL)

tag_index = {}  # tag -> list of article objects
total_articles = 0
tagged_articles = 0

for m in obj_pattern.finditer(array_str, 1):
    obj_str = m.group()
    if '"headline"' not in obj_str:
        continue
    
    total_articles += 1
    
    # Extract fields
    def get_field(name, text):
        match = re.search(rf'"{name}":\s*"((?:[^"\\]|\\.)*)"', text)
        return match.group(1) if match else None
    
    def get_int_field(name, text):
        match = re.search(rf'"{name}":\s*(\d+)', text)
        return int(match.group(1)) if match else None
    
    headline = get_field('headline', obj_str)
    if headline:
        headline = headline.replace("\\'", "'")
    tinyUrl = get_field('tinyUrl', obj_str)
    imageUrl = get_field('imageUrl', obj_str)
    xPostUrl = get_field('xPostUrl', obj_str)
    batchDate = get_field('batchDate', obj_str)
    page = get_int_field('page', obj_str)
    
    # Extract tags array
    tags_match = re.search(r'"tags":\s*\[(.*?)\]', obj_str, re.DOTALL)
    tags = []
    if tags_match:
        tags = re.findall(r'"([^"]+)"', tags_match.group(1))
    
    if not tags:
        continue
    
    tagged_articles += 1
    
    article_obj = {
        'headline': headline,
        'tinyUrl': tinyUrl,
        'imageUrl': imageUrl,
        'xPostUrl': xPostUrl,
        'batchDate': batchDate,
        'page': page,
        'tags': tags
    }
    
    for tag in tags:
        if tag not in tag_index:
            tag_index[tag] = []
        tag_index[tag].append(article_obj)

# Sort tags alphabetically, articles within each tag by page (ascending = oldest first)
sorted_index = {}
for tag in sorted(tag_index.keys(), key=str.lower):
    sorted_index[tag] = sorted(tag_index[tag], key=lambda a: (a.get('page') or 0))

# Write output
with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(sorted_index, f, ensure_ascii=False, separators=(',', ':'))

file_size = os.path.getsize(OUTPUT_PATH)
print(f"Total articles processed: {total_articles}")
print(f"Articles with tags: {tagged_articles}")
print(f"Unique tags: {len(sorted_index)}")
print(f"Output: {OUTPUT_PATH} ({file_size:,} bytes)")
print()
print("Top 20 tags by article count:")
tag_counts = [(tag, len(articles)) for tag, articles in sorted_index.items()]
tag_counts.sort(key=lambda x: -x[1])
for tag, count in tag_counts[:20]:
    print(f"  {count:4d}  {tag}")
