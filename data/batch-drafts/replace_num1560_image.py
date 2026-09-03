#!/usr/bin/env python3
"""Replace only the existing R2 image object used by CTCrazies NUM 1560.

This utility intentionally does not edit the ledger, pages, tags, headlines, URLs,
or image filename. It overwrites only the existing R2 object after confirming that
NUM 1560 still points to the expected canonical image URL.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from safe_batch import (
    R2_IMAGE_ORIGIN,
    load_ledger,
    upload_batch_images_to_r2,
    write_ledger,
    write_project_from_ledger,
)


NUM = 1560
IMAGE_NAME = "2026-09-03_111425.jpg"
EXPECTED_IMAGE_URL = f"{R2_IMAGE_ORIGIN}/{IMAGE_NAME}"
REQUIRED_SOURCE_BASENAME = "2026-09-03_145510.jpg"


def validate_replacement_input(ledger: dict, source: Path) -> dict:
    """Confirm that this correction can affect only NUM 1560's known R2 object."""
    source = source.resolve()
    if source.name != REQUIRED_SOURCE_BASENAME:
        raise ValueError(f"Only {REQUIRED_SOURCE_BASENAME} is authorized as the NUM {NUM} replacement source")
    if not source.is_file() or source.suffix.lower() not in {".jpg", ".jpeg"}:
        raise ValueError("Replacement source must be the supplied JPEG file")

    article = next((item for item in ledger["articles"] if int(item["num"]) == NUM), None)
    if not article:
        raise ValueError(f"NUM {NUM} is absent from the canonical ledger")
    if article.get("imageUrl") != EXPECTED_IMAGE_URL:
        raise ValueError(
            f"NUM {NUM} image URL differs from the authorized object: {article.get('imageUrl')!r}"
        )
    return article


def cache_busted_image_url(sha256: str) -> str:
    """Use a content-derived query only for the one corrected image reference."""
    if len(sha256) != 64 or any(character not in "0123456789abcdef" for character in sha256):
        raise ValueError("Replacement SHA-256 must be a lowercase 64-character hexadecimal value")
    return f"{EXPECTED_IMAGE_URL}?revision={sha256[:16]}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Safely replace NUM 1560's existing R2 image object")
    parser.add_argument("--source", required=True, help="Corrected user-supplied JPG file")
    parser.add_argument("--ledger", default="data/article-ledger.json")
    parser.add_argument(
        "--receipt",
        default="data/image-corrections/2026-09-03-num1560-r2-replacement-receipt.json",
    )
    parser.add_argument(
        "--apply-cache-bust",
        action="store_true",
        help="After successful R2 upload, update only NUM 1560's image URL with a content-derived query and regenerate derived files.",
    )
    args = parser.parse_args()

    ledger = load_ledger(Path(args.ledger))
    source = Path(args.source)
    article = validate_replacement_input(ledger, source)
    source = source.resolve()

    receipt_path = Path(args.receipt)
    upload_receipt = upload_batch_images_to_r2(
        [
            {
                "num": NUM,
                "imageName": IMAGE_NAME,
                "imagePath": str(source),
                "imageUrl": EXPECTED_IMAGE_URL,
            }
        ],
        receipt_path,
    )
    uploaded = upload_receipt["uploaded"][0]
    cache_busted_url = None
    if args.apply_cache_bust:
        cache_busted_url = cache_busted_image_url(uploaded["sha256"])
        article["imageUrl"] = cache_busted_url
        write_project_from_ledger(ledger, ledger["articles"][0].get("batchDate"))
        write_ledger(ledger, Path(args.ledger))

    audit_record = {
        "correction": "Replace only NUM 1560's existing R2 image object",
        "num": NUM,
        "headline": article["headline"],
        "sourceFile": source.name,
        "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "replacedObjectKey": uploaded["r2Key"],
        "imageUrl": EXPECTED_IMAGE_URL,
        "publishedImageUrl": cache_busted_url or EXPECTED_IMAGE_URL,
        "uploadedBytes": uploaded["bytes"],
        "uploadedSha256": uploaded["sha256"],
        "uploadAttempts": uploaded["attempts"],
        "unchangedFields": ["headline", "sourceUrl", "xPostUrl", "tags", "batchDate", "page"],
    }
    receipt_path.write_text(json.dumps(audit_record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(audit_record, indent=2))


if __name__ == "__main__":
    main()
