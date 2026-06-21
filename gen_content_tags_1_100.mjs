#!/usr/bin/env node
/**
 * Content-aware tag generation for articles 1-100.
 * Fetches each source URL, extracts article text, passes headline + content to LLM.
 * Generates exactly 4 specific tags per article — NO news source names.
 */

import fs from 'fs';

const API_URL = (process.env.BUILT_IN_FORGE_API_URL || '').replace(/\/$/, '');
const API_KEY = process.env.BUILT_IN_FORGE_API_KEY || '';

if (!API_URL || !API_KEY) {
  console.error('ERROR: BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY not set.');
  process.exit(1);
}
console.log(`API_URL: ${API_URL.slice(0, 40)}...`);

import { execSync } from 'child_process';
const csvData = execSync(`python3.11 -c "
import openpyxl, json
wb = openpyxl.load_workbook('/home/ubuntu/upload/CTCTags1-100worksheet.xlsx')
ws = wb.active
rows = []
for row in ws.iter_rows(min_row=2, values_only=True):
    if row[0]:
        rows.append({'num': int(row[0]), 'headline': str(row[1] or ''), 'sourceUrl': str(row[2] or ''), 'tinyUrl': str(row[3] or '')})
print(json.dumps(rows))
"`).toString().trim();

const articles = JSON.parse(csvData);
articles.sort((a, b) => a.num - b.num);
console.log(`Loaded ${articles.length} articles (NUM ${articles[0].num}–${articles[articles.length-1].num})\n`);

const SYSTEM_PROMPT = `You are a political news article tagger.
You will be given a news headline and a snippet of the article's content.
Generate exactly 4 short, specific topic tags (1-4 words each).

Rules:
- NEVER use news source or publication names as tags (e.g., National Review, New York Post, RealClearPolitics, The Daily Signal, LindellTV, Breitbart, Fox News, The Federalist, Gateway Pundit, Blaze Media, ABC News, Media Research Center, The Atlantic, Modernity, Daily Mail, Daily Caller, The Blaze, Just The News, Zero Hedge, Daily Wire, Washington Examiner, Newsmax, Epoch Times, Townhall, RedState, American Thinker, New York Times, Washington Post, CNN, MSNBC, NBC News, CBS News, NPR, Politico, The Hill, Axios, Huffington Post, Vox, Slate, Salon, Bloomberg, Newsweek, USA Today, Los Angeles Times, AP News, Reuters, Slay News, PJ Media, Legal Insurrection, Twitchy, Western Journal, Bizpac Review, or ANY other media outlet name).
- NEVER use: Democrat, Democrats, Democratic, Dems, or any variation
- NEVER use: Republican, Republicans, GOP (too generic on their own)
- Tags must be SPECIFIC: prefer named people, places, organizations, events, or precise issues
- Good examples: "Karen Bass", "IRS Audit", "Los Angeles Wildfires", "SNAP Fraud", "Charlottesville Rally", "Elizabeth Warren", "JetBlue Merger"
- Bad examples: "Politics", "Government", "News", "Article", "Issue", "Media"
- Tags must be title-cased
- Return ONLY a valid JSON object: {"tags": ["tag1","tag2","tag3","tag4"]}`;

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
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return text.slice(0, 2000);
  } catch (e) {
    return null;
  }
}

const NEWS_SOURCES = new Set([
  'national review','new york post','realclearpolitics','the daily signal','daily signal',
  'lindell tv','lindell media','breitbart','fox news','fox business','the federalist',
  'federalist','the blaze','blaze media','the daily wire','daily wire','washington examiner',
  'washington times','new york sun','american spectator','townhall','pj media','redstate',
  'red state','hot air','powerline','just the news','justthenews','epoch times',
  'the epoch times','one america news','oan','newsmax','western journal','american thinker',
  'frontpage mag','gateway pundit','the gateway pundit','wnd','world net daily','human events',
  'media research center','mrc','newsbusters','the post millennial','post millennial',
  'twitchy','bizpac review','modernity news','modernity','not the bee','the bee',
  'new york times','washington post','cnn','msnbc','abc news','nbc news','cbs news','npr',
  'politico','the hill','axios','huffington post','huffpost','vox','slate','salon',
  'mother jones','the atlantic','new yorker','rolling stone','vice','buzzfeed','daily beast',
  'media matters','associated press','reuters','bloomberg','newsweek','time','usa today',
  'los angeles times','chicago tribune','boston globe','miami herald','new york magazine',
  'ap news','daily mail','daily mail online','the daily mail','mail online','the sun',
  'the guardian','guardian','independent','sky news','bbc','bbc news','zero hedge',
  'zerohedge','infowars','natural news','the intercept','propublica','the dispatch',
  'reason','daily caller','the daily caller','washington free beacon','free beacon',
  'just the news','the federalist papers','federalist papers','american greatness',
  'national pulse','the national pulse','revolver news','revolver',
  'the spectator','spectator','city journal','new criterion','commentary','first things',
  'slay news','slaynews','pj media','pjmedia','legal insurrection','legalinsurrection',
  'american thinker','americanthinker','the western journal','westernjournal',
]);

function isNewsSource(tag) {
  return NEWS_SOURCES.has(tag.toLowerCase().trim());
}

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
    max_tokens: 100
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

  const banned = new Set(['democrat','democrats','democratic','dems','republican','republicans','gop']);
  tags = tags.filter(t => !banned.has(t.toLowerCase()) && !isNewsSource(t));

  while (tags.length < 4) tags.push('Political Issue');
  return tags.slice(0, 4);
}

const results = [];
const BATCH_SIZE = 20;

for (let i = 0; i < articles.length; i++) {
  const art = articles[i];
  if (i % BATCH_SIZE === 0) {
    const end = Math.min(i + BATCH_SIZE - 1, articles.length - 1);
    console.log(`\n=== Batch ${Math.floor(i/BATCH_SIZE)+1}/5 (articles ${art.num}–${articles[end].num}) ===`);
  }

  process.stdout.write(`  [${i+1}/100] NUM ${art.num}: fetching...`);
  const articleText = await fetchArticleText(art.sourceUrl);
  process.stdout.write(articleText ? ` (${articleText.length} chars)` : ' (fetch failed)');

  const tags = await generateTags(art.headline, articleText);
  process.stdout.write(` → ${JSON.stringify(tags)}\n`);

  results.push({ num: art.num, headline: art.headline, sourceUrl: art.sourceUrl, tinyUrl: art.tinyUrl, tags });

  await new Promise(r => setTimeout(r, 200));
}

const outPath = '/home/ubuntu/tags_1_100.json';
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\n✓ Saved ${results.length} tag sets to ${outPath}`);
