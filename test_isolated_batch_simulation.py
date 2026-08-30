import importlib.util
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parent / "data" / "batch-drafts" / "run_isolated_batch_simulation.py"
SPEC = importlib.util.spec_from_file_location("isolated_batch_simulation", SCRIPT)
assert SPEC and SPEC.loader
simulation = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(simulation)


class IsolatedBatchSimulationTests(unittest.TestCase):
    def test_simulation_exercises_twenty_article_batch_without_production_changes(self):
        result = simulation.run_simulation()

        self.assertEqual(result["status"], "passed")
        self.assertTrue(result["simulationOnly"])
        self.assertEqual(result["incomingArticles"], 20)
        self.assertEqual(result["totalArticlesAfterSimulation"], result["preBatchMaxNum"] + 20)
        self.assertEqual(result["pagesAfterSimulation"], (result["preBatchMaxNum"] + 20) // 20)
        self.assertEqual(result["pageOneNums"], list(range(result["preBatchMaxNum"] + 20, result["preBatchMaxNum"], -1)))
        self.assertEqual(result["pageTwoFirstNum"], result["preBatchMaxNum"])
        self.assertEqual(result["mockedR2Uploads"], 20)
        self.assertEqual(result["publicationGateErrors"], [])
        self.assertTrue(result["originalProjectHashesUnchanged"])
        self.assertEqual(result["networkServicesContacted"], [])


if __name__ == "__main__":
    unittest.main()
