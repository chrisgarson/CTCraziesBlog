# August 13, 2026 Fresh 100-Article Sampling Audit Verification

The post-publication audit used `AllCTCArticlesList08132026.xlsx`, whose authoritative list contains 1,440 articles with NUM, WebPage, and headline values. A reproducible 100-record sample was selected using seed `20260813` after excluding every NUM from the 100-record August 12 manifest.

| Audit condition | Result |
|---|---:|
| Workbook population | 1,440 |
| Prior audit NUMs excluded | 100 |
| Eligible fresh population | 1,340 |
| Fresh sample records | 100 |
| Overlap with prior audit | 0 |
| Matching NUM assignments | 100 / 100 |
| Matching page assignments | 100 / 100 |
| Matching visitor-visible headlines | 95 / 100 |
| Headline discrepancies | 5 |

The five sampled headline differences are historical records: NUM 763, 232, 1337, 886, and 271. They do not affect the fresh batch page-order result. The production JavaScript asset exactly matched the locally built asset used by the audit, confirming that the generated page content assessed by the audit was the content served in production.
