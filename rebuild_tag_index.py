"""Retired compatibility entry point.

The historic script wrote only an untyped public tag index and could discard the
approved person/topic classifications and keyword mappings. It is intentionally
disabled. Use `safe_batch.py sync-indexes` or `safe_batch.py apply` instead.
"""

import sys


if __name__ == "__main__":
    print("RETIRED SCRIPT: rebuild_tag_index.py must not be used.")
    print("Use safe_batch.py sync-indexes or safe_batch.py apply instead.")
    sys.exit(2)
