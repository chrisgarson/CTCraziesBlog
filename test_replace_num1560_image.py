import importlib.util
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parent / "data" / "batch-drafts" / "replace_num1560_image.py"
SPEC = importlib.util.spec_from_file_location("replace_num1560_image", SCRIPT)
assert SPEC and SPEC.loader
replacement = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(replacement)


class Num1560ImageReplacementTests(unittest.TestCase):
    def _ledger(self, image_url: str | None = None) -> dict:
        return {
            "articles": [
                {
                    "num": 1560,
                    "headline": "Preserved test headline",
                    "imageUrl": image_url or replacement.EXPECTED_IMAGE_URL,
                }
            ]
        }

    def test_allows_only_the_authorized_source_filename_and_existing_r2_object(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / replacement.REQUIRED_SOURCE_BASENAME
            source.write_bytes(b"test-only")

            article = replacement.validate_replacement_input(self._ledger(), source)

        self.assertEqual(article["num"], 1560)
        self.assertEqual(article["imageUrl"], replacement.EXPECTED_IMAGE_URL)

    def test_rejects_any_different_canonical_image_object(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / replacement.REQUIRED_SOURCE_BASENAME
            source.write_bytes(b"test-only")

            with self.assertRaisesRegex(ValueError, "differs from the authorized object"):
                replacement.validate_replacement_input(
                    self._ledger("https://images.ctcrazies.com/article-images/not-num1560.jpg"), source
                )

    def test_derives_a_bounded_cache_busting_url_from_replacement_content(self):
        sha256 = "f67794c810a21a33d71825335414d4e75779b43f596c8faa044158cd3508c92d"

        result = replacement.cache_busted_image_url(sha256)

        self.assertEqual(result, f"{replacement.EXPECTED_IMAGE_URL}?revision=f67794c810a21a33")


if __name__ == "__main__":
    unittest.main()
