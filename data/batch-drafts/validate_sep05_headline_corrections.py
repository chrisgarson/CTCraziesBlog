#!/usr/bin/env python3
"""Read-only audit of the two user-approved September 5 headline corrections."""

from __future__ import annotations

import json
from pathlib import Path


PROJECT = Path(__file__).resolve().parents[2]
LEDGER = PROJECT / "data" / "article-ledger.json"

EXPECTED = {
    1576: "In Mayor Mamdani's Democrat-Marxist Utopia: NYPD Reports 206% Jump in Felony Assault Arrests of Repeat Offenders",
    1567: "Hmmm…What Could Go Wrong? Non-U.S. Aliens Can Now Serve as Police Officers in Democrat-Run Connecticut City",
}


def main() -> None:
    payload = json.loads(LEDGER.read_text(encoding="utf-8"))
    articles = payload["articles"] if isinstance(payload, dict) else payload
    by_num = {article["num"]: article for article in articles}
    errors = []
    for num, expected in EXPECTED.items():
        actual = by_num.get(num, {}).get("headline")
        if actual != expected:
            errors.append(f"NUM {num}: expected {expected!r}, found {actual!r}")
    if errors:
        raise SystemExit("September 5 headline-correction audit failed:\n- " + "\n- ".join(errors))
    print("PASS: NUM 1576 and NUM 1567 exactly match the user-approved corrected headlines.")


if __name__ == "__main__":
    main()
