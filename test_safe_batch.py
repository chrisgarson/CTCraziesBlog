"""Core invariants for the safe batch system."""

import unittest

from safe_batch import ARTICLES_PER_PAGE, apply_tag_plan, assign_pages, combine_batch, declare_tag, rename_tag, render_article, render_search, validate_batch


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

    def test_tag_rename_retains_type_keywords_and_article_association(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Lies": {"type": "topic", "keywords": ["Falsehood"]}},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        ledger["articles"][0]["tags"] = ["Lies"]
        rename_tag(ledger, "Lies", "Gaslight-Lies")
        self.assertNotIn("Lies", ledger["tagMetadata"])
        self.assertEqual(ledger["tagMetadata"]["Gaslight-Lies"], {"type": "topic", "keywords": ["Falsehood"]})
        self.assertEqual(ledger["articles"][0]["tags"], ["Gaslight-Lies"])

    def test_generated_search_records_retain_num_and_rendered_quotes_are_valid_jsx(self):
        item = article(20)
        item["headline"] = 'Headline With "Quoted" Text'
        item["page"] = 1
        search = render_search([item], "const articles = []\nexport default articles;\n")
        self.assertIn('"num": 20', search)
        block = render_article(item)
        self.assertIn("Headline With &quot;Quoted&quot; Text", block)

    def test_tag_plan_requires_every_batch_num_and_only_approved_tags(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Existing": {"type": "topic", "keywords": []}, "Person": {"type": "person", "keywords": []}},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        batch = [article(21)]
        batch[0]["imageName"] = "image.jpg"
        valid = apply_tag_plan(batch, {"tags": {"21": ["Existing", "Person"]}}, ledger)
        self.assertEqual(valid[0]["tags"], ["Existing", "Person"])
        with self.assertRaises(ValueError):
            apply_tag_plan(batch, {"tags": {"22": ["Existing", "Person"]}}, ledger)

    def test_tag_plan_allows_five_tags_only_for_an_explicitly_approved_num(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {str(index): {"type": "topic", "keywords": []} for index in range(5)},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        batch = [article(21)]
        batch[0]["imageName"] = "image.jpg"
        tags = [str(index) for index in range(5)]
        valid = apply_tag_plan(batch, {"tags": {"21": tags}, "allowFiveTagNums": [21]}, ledger)
        self.assertEqual(valid[0]["tags"], tags)
        with self.assertRaises(ValueError):
            apply_tag_plan(batch, {"tags": {"21": tags}}, ledger)


if __name__ == "__main__":
    unittest.main()
