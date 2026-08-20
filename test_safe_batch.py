"""Core invariants for the safe batch system."""

import unittest

from safe_batch import ARTICLES_PER_PAGE, R2_IMAGE_ORIGIN, apply_existing_article_tag_plan, apply_tag_plan, apply_tag_update_plan, assign_pages, combine_batch, declare_tag, rename_tag, render_app, render_article, render_search, validate_batch


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

    def test_new_batch_without_an_explicit_image_url_defaults_to_the_r2_image_domain(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Topic": {"type": "topic", "keywords": []}},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        batch = [article(num) for num in range(40, 20, -1)]
        for item in batch:
            item.pop("imageUrl")
        approved = validate_batch(ledger, batch)
        self.assertEqual(approved[0]["imageUrl"], f"{R2_IMAGE_ORIGIN}/40.jpg")

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

    def test_tag_update_plan_merges_sources_into_keywords_and_changes_person_type(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {
                "AOC": {"type": "topic", "keywords": []},
                "Alexandria Ocasio-Cortez": {"type": "person", "keywords": []},
                "Enrique Sanchez": {"type": "topic", "keywords": []},
            },
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        ledger["articles"][0]["tags"] = ["AOC", "Enrique Sanchez"]
        updated = apply_tag_update_plan(ledger, {
            "typeChanges": [{"tag": "Enrique Sanchez", "type": "person"}],
            "merges": [{"sources": ["AOC"], "target": "Alexandria Ocasio-Cortez", "type": "person"}],
        })
        self.assertEqual(updated["tagMetadata"]["Enrique Sanchez"]["type"], "person")
        self.assertNotIn("AOC", updated["tagMetadata"])
        self.assertIn("AOC", updated["tagMetadata"]["Alexandria Ocasio-Cortez"]["keywords"])
        self.assertEqual(updated["articles"][0]["tags"], ["Alexandria Ocasio-Cortez", "Enrique Sanchez"])

    def test_tag_update_plan_adds_keywords_to_existing_person_tag(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Jane Doe": {"type": "person", "keywords": ["Jane"]}},
            "articles": [article(1)],
        }
        updated = apply_tag_update_plan(ledger, {
            "keywordAdditions": [{"tag": "Jane Doe", "type": "person", "keywords": ["Doe", "Governor Doe", "Jane"]}],
        })
        self.assertEqual(updated["tagMetadata"]["Jane Doe"], {"type": "person", "keywords": ["Jane", "Doe", "Governor Doe"]})

    def test_tag_update_plan_replaces_keywords_without_changing_articles(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {"Left-Wing": {"type": "topic", "keywords": ["Old Keyword", "Retired Alias"]}},
            "articles": [article(1)],
        }
        ledger["articles"][0]["tags"] = ["Left-Wing"]
        updated = apply_tag_update_plan(ledger, {
            "keywordReplacements": [{"tag": "Left-Wing", "type": "topic", "keywords": ["Democrat", "Leftism", "Democrat"]}],
        })
        self.assertEqual(updated["tagMetadata"]["Left-Wing"], {"type": "topic", "keywords": ["Democrat", "Leftism"]})
        self.assertEqual(updated["articles"][0]["tags"], ["Left-Wing"])
        self.assertEqual(ledger["tagMetadata"]["Left-Wing"]["keywords"], ["Old Keyword", "Retired Alias"])

    def test_generated_search_records_retain_num_and_rendered_quotes_are_valid_jsx(self):
        item = article(20)
        item["headline"] = 'Headline With "Quoted" Text'
        item["page"] = 1
        search = render_search([item], "const articles = []\nexport default articles;\n")
        self.assertIn('"num": 20', search)
        block = render_article(item)
        self.assertIn("Headline With &quot;Quoted&quot; Text", block)

    def test_generated_app_defers_non_home_routes_until_visited(self):
        app = render_app(3)
        self.assertIn('import { lazy, Suspense } from "react";', app)
        self.assertIn('import Home from "./pages/Home";', app)
        self.assertIn('const Page2 = lazy(() => import("./pages/Page2"));', app)
        self.assertIn('const Page3 = lazy(() => import("./pages/Page3"));', app)
        self.assertIn('const Search = lazy(() => import("./pages/Search"));', app)
        self.assertIn('const TagsIndex = lazy(() => import("./pages/TagsIndex"));', app)
        self.assertIn("<Suspense fallback=", app)
        self.assertNotIn('import Page2 from "./pages/Page2";', app)

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

    def test_tag_plan_allows_six_tags_only_for_an_explicitly_approved_num(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {str(index): {"type": "topic", "keywords": []} for index in range(6)},
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        batch = [article(21)]
        batch[0]["imageName"] = "image.jpg"
        tags = [str(index) for index in range(6)]
        valid = apply_tag_plan(batch, {"tags": {"21": tags}, "allowSixTagNums": [21]}, ledger)
        self.assertEqual(valid[0]["tags"], tags)
        with self.assertRaises(ValueError):
            apply_tag_plan(batch, {"tags": {"21": tags}}, ledger)
        with self.assertRaises(ValueError):
            apply_tag_plan(batch, {"tags": {"21": tags}, "allowFiveTagNums": [21]}, ledger)

    def test_existing_article_tag_plan_adds_only_the_approved_tag_by_xpost_url(self):
        ledger = {
            "schemaVersion": 1,
            "articlesPerPage": ARTICLES_PER_PAGE,
            "tagMetadata": {
                "Existing": {"type": "topic", "keywords": []},
                "Assassination": {"type": "topic", "keywords": []},
            },
            "articles": assign_pages([article(num) for num in range(20, 0, -1)]),
        }
        target = ledger["articles"][0]
        updated, changes = apply_existing_article_tag_plan(ledger, {
            "expectedAssignmentCount": 1,
            "assignments": [{"xPostUrl": target["xPostUrl"], "tag": "Assassination"}],
        })
        self.assertEqual(updated["articles"][0]["tags"], ["Topic", "Assassination"])
        self.assertEqual(changes[0]["num"], 20)
        self.assertEqual(ledger["articles"][0]["tags"], ["Topic"])
        with self.assertRaisesRegex(ValueError, "unapproved tag"):
            apply_existing_article_tag_plan(ledger, {
                "assignments": [{"xPostUrl": target["xPostUrl"], "tag": "Missing"}],
            })


if __name__ == "__main__":
    unittest.main()
