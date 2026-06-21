#!/usr/bin/env node
/**
 * Generate 5 tags for each of the 20 Home page headlines using the built-in LLM.
 * Run from project root: node gen_tags.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_URL = (process.env.BUILT_IN_FORGE_API_URL || '').replace(/\/$/, '');
const API_KEY = process.env.BUILT_IN_FORGE_API_KEY || '';

if (!API_URL || !API_KEY) {
  console.error('ERROR: BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY not set.');
  process.exit(1);
}
console.log(`API_URL: ${API_URL.slice(0, 40)}...`);
console.log(`API_KEY: SET`);

// Read headlines from Home.tsx
const homePath = path.join(__dirname, 'client/src/pages/Home.tsx');
const homeContent = fs.readFileSync(homePath, 'utf8');
const headlineMatches = [...homeContent.matchAll(/headline="([^"]+)"/g)];
const headlines = headlineMatches.map(m => m[1]
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>'));

console.log(`\nFound ${headlines.length} headlines.\n`);

const SYSTEM_PROMPT = `You are a political news article tagger.
Given a news headline, return exactly 5 short topic tags (1-3 words each).
Rules:
- NEVER use: Democrat, Democrats, Democratic, Dems, or any variation of those words
- Tags should reflect the specific topic, person, institution, or issue in the headline
- Tags must be title-cased (e.g., "Media Bias", "IRS", "Los Angeles")
- Return ONLY a valid JSON object with a single key "tags" containing an array of exactly 5 strings
Example: {"tags": ["Media Bias", "IRS", "Conservative Targeting", "DOJ", "Tax Policy"]}`;

const results = [];

for (let i = 0; i < headlines.length; i++) {
  const headline = headlines[i];
  console.log(`[${i + 1}/20] ${headline.slice(0, 70)}...`);

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Headline: ${headline}` }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'tags',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            tags: { type: 'array', items: { type: 'string' } }
          },
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
    const errText = await resp.text();
    console.error(`  ERROR ${resp.status}: ${errText}`);
    process.exit(1);
  }

  const data = await resp.json();
  const raw = data.choices[0].message.content;
  const parsed = JSON.parse(raw);
  let tags = parsed.tags;

  // Safety: remove any Democrat/Dems variants that slipped through
  const banned = new Set(['democrat', 'democrats', 'democratic', 'dems']);
  tags = tags.filter(t => !banned.has(t.toLowerCase()));

  console.log(`  Tags: ${JSON.stringify(tags)}`);
  results.push({ headline, tags });
}

const outPath = path.join(__dirname, '../tags_batch20.json');
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nSaved ${results.length} tag sets to ${outPath}`);
