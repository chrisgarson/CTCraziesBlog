import unittest

from verify_safe_site import app_registers_page


class SafeSiteRouteRegistrationTests(unittest.TestCase):
    def test_accepts_legacy_eager_page_registration(self):
        app = 'import Page2 from "./pages/Page2";\n<Route path="/page2" component={Page2} />'
        self.assertTrue(app_registers_page(app, 2))

    def test_accepts_generated_lazy_page_registration(self):
        app = 'const Page75 = lazy(() => import("./pages/Page75"));\n<Route path="/page75" component={Page75} />'
        self.assertTrue(app_registers_page(app, 75))

    def test_rejects_page_without_route(self):
        app = 'const Page2 = lazy(() => import("./pages/Page2"));'
        self.assertFalse(app_registers_page(app, 2))


if __name__ == "__main__":
    unittest.main()
