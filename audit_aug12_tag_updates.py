#!/usr/bin/env python3
"""Read-only validation for CTCTagupdates08122026.xlsx requests."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ledger = json.loads((ROOT / "data" / "article-ledger.json").read_text(encoding="utf-8"))
metadata = ledger["tagMetadata"]
counts = {tag: 0 for tag in metadata}
for article in ledger["articles"]:
    for tag in article["tags"]:
        counts[tag] = counts.get(tag, 0) + 1

sources = [
    "AOC", "Enrique Sanchez", "Ken Martin", "Melat Kiros", "Sylvia Luke",
    "Islam-Muslim", "Hate", "Violence", "Journalism", "Mainstream Media",
    "Media Bias", "Midterm Elections", "2026 Elections",
]
targets = [
    "Alexandria Ocasio-Cortez", "Islam-Muslims", "Hate-Violence",
    "Journalism-MediaBias", "2026 Elections",
]

print("SOURCE TAG AUDIT")
for tag in sources:
    entry = metadata.get(tag)
    status = "PRESENT" if entry else "MISSING"
    tag_type = entry.get("type") if entry else "—"
    print(f"{tag}\t{status}\ttype={tag_type}\tarticles={counts.get(tag, 0)}")

print("\nTARGET TAG AUDIT")
for tag in targets:
    entry = metadata.get(tag)
    status = "PRESENT" if entry else "NEW"
    tag_type = entry.get("type") if entry else "topic (proposed)"
    print(f"{tag}\t{status}\ttype={tag_type}\tarticles={counts.get(tag, 0)}")

print("\nPERSON-TYPE REQUESTS")
for tag in ["Enrique Sanchez", "Ken Martin", "Melat Kiros", "Sylvia Luke"]:
    entry = metadata.get(tag)
    print(f"{tag}\tcurrent={entry.get('type') if entry else 'MISSING'}")
