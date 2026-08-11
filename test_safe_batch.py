"""Core invariants for the safe batch system."""

import unittest

from safe_batch import ARTICLES_PER_PAGE, assign_pages, combine_batch, declare_tag, validate_batch


def article(num: int) -> dict:
    return {
        "num": num,
        "headline": f"Headline {num}",
        "sourceUrl": f"https://source.example/{num}",
        "xPostUrl": f"https://x.com/example/{num}",
        "imageName": f"{num}.jpg",
        "imageUrl": f"https://cdn.example/{num}.jpg",
        "tags": ["Topic"],
    }


class SafeBatchTests(unittest.TestCase):
    def test_forty_article_batch_shifts_existing_content_by_two_pages(self):
        ledger = {
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Topic": {"type": "topic", "keywords": []}},
            "articles": assign_pages([article(num) for num in range(40, 0, -1)]),
        }
        batch = [article(num) for num in range(80, 40, -1)]
        approved = validate_batch(ledger, batch)
        combined = combine_batch(ledger, approved, "August 11, 2026")
        pages = {page: [item["num"] for item in combined["articles"] if item["page"] == page] for page in range(1, 5)}
        self.assertEqual(pages[1], list(range(80, 60, -1)))
        self.assertEqual(pages[2], list(range(60, 40, -1)))
        self.assertEqual(pages[3], list(range(40, 20, -1)))
        self.assertEqual(pages[4], list(range(20, 0, -1)))

    def test_rejects_noncontiguous_incoming_nums_before_any_write(self):
        ledger = {
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Topic": {"type": "topic", "keywords": []}},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        invalid = [article(num) for num in range(40, 20, -1)]
        invalid[-1]["num"] = 1
        with self.assertRaisesRegex(ValueError, "Incoming NUMs"):
            validate_batch(ledger, invalid)

    def test_preserves_historic_tinyurl_as_source_url(self):
        legacy = article(20)
        legacy["sourceUrl"] = "https://tinyurl.com/legacy-link"
        ordered = assign_pages([legacy, *[article(num) for num in range(19, 0, -1)]])
        self.assertEqual(ordered[0]["sourceUrl"], "https://tinyurl.com/legacy-link")

    def test_declared_person_tag_becomes_available_before_batch_validation(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Topic": {"type": "topic", "keywords": []}},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        declare_tag(ledger, "New Person", "person")
        batch = [article(num) for num in range(40, 20, -1)]
        batch[0]["tags"] = ["New Person"]
        self.assertEqual(validate_batch(ledger, batch)[0]["tags"], ["New Person"])


if __name__ == "__main__":
    unittest.main()
