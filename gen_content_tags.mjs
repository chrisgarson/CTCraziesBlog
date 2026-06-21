#!/usr/bin/env node
/**
 * Content-aware tag generation for articles 701-800.
 * Fetches each source URL, extracts article text, passes headline + content to LLM,
 * generates 5 specific tags per article.
 * Run from project root: node gen_content_tags.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const API_URL = (process.env.BUILT_IN_FORGE_API_URL || '').replace(/\/$/, '');
const API_KEY = process.env.BUILT_IN_FORGE_API_KEY || '';

if (!API_URL || !API_KEY) {
  console.error('ERROR: BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY not set.');
  process.exit(1);
}
console.log(`API_URL: ${API_URL.slice(0, 40)}...`);

// Read Excel data using Python (simpler than adding xlsx dep)
import { execSync } from 'child_process';

const csvData = execSync(`python3.11 -c "
import openpyxl, json
wb = openpyxl.load_workbook('/home/ubuntu/upload/CTCTags701-800worksheet.xlsx')
ws = wb.active
rows = []
for row in ws.iter_rows(min_row=2, values_only=True):
    if row[0]:
        rows.append({'num': int(row[0]), 'headline': str(row[1] or ''), 'sourceUrl': str(row[2] or ''), 'tinyUrl': str(row[3] or '')})
print(json.dumps(rows))
"`).toString().trim();

const articles = JSON.parse(csvData);
// Sort ascending by NUM
articles.sort((a, b) => a.num - b.num);
console.log(`Loaded ${articles.length} articles (NUM ${articles[0].num}–${articles[articles.length-1].num})\n`);

const SYSTEM_PROMPT = `You are a political news article tagger.
You will be given a news headline and a snippet of the article's content.
Generate exactly 5 short, specific topic tags (1-4 words each).

Rules:
- NEVER use: Democrat, Democrats, Democratic, Dems, or any variation
- NEVER use: Republican, Republicans, GOP (too generic)
- Tags must be SPECIFIC: prefer named people, places, organizations, events over generic categories
- Good examples: "Karen Bass", "IRS Audit", "Los Angeles Wildfires", "SNAP Fraud", "Charlottesville Rally"
- Bad examples: "Politics", "Government", "News", "Article", "Issue"
- Tags must be title-cased
- Return ONLY a valid JSON object: {"tags": ["tag1","tag2","tag3","tag4","tag5"]}`;

// Fetch article content with timeout
async function fetchArticleText(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; research-bot/1.0)',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    clearTimeout(timeout);
    if (!resp.ok) return null;
    const html = await resp.text();
    // Strip HTML tags and extract text
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    // Return first 2000 chars of article body text
    return text.slice(0, 2000);
  } catch (e) {
    return null;
  }
}

// Generate tags via LLM
async function generateTags(headline, articleText) {
  const content = articleText
    ? `Headline: ${headline}\n\nArticle excerpt: ${articleText}`
    : `Headline: ${headline}`;

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'tags',
        strict: true,
        schema: {
          type: 'object',
          properties: { tags: { type: 'array', items: { type: 'string' } } },
          required: ['tags'],
          additionalProperties: false
        }
      }
    },
    max_tokens: 120
  };

  const resp = await fetch(`${API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`LLM error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  const raw = data.choices[0].message.content;
  const parsed = JSON.parse(raw);
  let tags = parsed.tags;

  // Safety filter
  const banned = new Set(['democrat', 'democrats', 'democratic', 'dems', 'republican', 'republicans', 'gop']);
  tags = tags.filter(t => !banned.has(t.toLowerCase()));
  // Ensure exactly 5
  while (tags.length < 5) tags.push('Politics');
  return tags.slice(0, 5);
}

const results = [];
const BATCH_SIZE = 20;

for (let i = 0; i < articles.length; i++) {
  const art = articles[i];
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  if (i % BATCH_SIZE === 0) {
    console.log(`\n=== Batch ${batchNum}/5 (articles ${art.num}–${articles[Math.min(i + BATCH_SIZE - 1, articles.length - 1)].num}) ===`);
  }

  process.stdout.write(`  [${i+1}/100] NUM ${art.num}: fetching...`);
  const articleText = await fetchArticleText(art.sourceUrl);
  process.stdout.write(articleText ? ` (${articleText.length} chars)` : ' (fetch failed, using headline only)');

  const tags = await generateTags(art.headline, articleText);
  process.stdout.write(` → ${JSON.stringify(tags)}\n`);

  results.push({ num: art.num, headline: art.headline, tinyUrl: art.tinyUrl, tags });

  // Small delay to avoid rate limiting
  await new Promise(r => setTimeout(r, 200));
}

// Save results
const outPath = '/home/ubuntu/tags_701_800.json';
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\n✓ Saved ${results.length} tag sets to ${outPath}`);
