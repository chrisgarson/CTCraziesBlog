import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Link } from 'wouter';

const articles = [
  {
    "headline": "Democrat-Radicals Build a Nationwide Armed Paramilitary Group Known As ‘Red Rabbits’",
    "tinyUrl": "https://tinyurl.com/yu7f53f2",
    "xPostUrl": "https://x.com/C3Heditor/status/2069085223535440279",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_104927.jpg",
    "tags": ["Socialism", "Left-Wing", "Violence", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "DOJ Corruption Probe of California’s Gov. Gavin Newsom Targets Behested Payments, Family Nonprofits, & Questions of Influence",
    "tinyUrl": "https://tinyurl.com/yjaa4avy",
    "xPostUrl": "https://x.com/C3Heditor/status/2069086424293335207",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_105435.jpg",
    "tags": ["Gavin Newsom", "DOJ", "Corruption-Fraud", "California"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Top Federal Prosecutor Warns That Democrats In California Have Effectively ‘Decriminalized Voter Fraud’",
    "tinyUrl": "https://tinyurl.com/y2jpmuru",
    "xPostUrl": "https://x.com/C3Heditor/status/2069087077635862961",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_105652.jpg",
    "tags": ["Election Fraud", "California", "DOJ", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Democrat-Controlled Denver School Board Forced To Fire Teacher After Kids Were Graded on Same-Sex Kissing Roleplays",
    "tinyUrl": "https://tinyurl.com/yj3uh5n4",
    "xPostUrl": "https://x.com/C3Heditor/status/2069087815585894609",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_105955.jpg",
    "tags": ["Education Policy", "LGBTQ", "Colorado", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Giants Baseball Players Accused of ‘DEFACING’ Their Uniforms With Bible Verses by Democrat Propaganda Publication, the San Francisco Chronicle",
    "tinyUrl": "https://tinyurl.com/342fucsw",
    "xPostUrl": "https://x.com/C3Heditor/status/2069088451509543224",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_110216.jpg",
    "tags": ["San Francisco", "Culture War", "Media Bias", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "New York Democrat Government Hit With DOJ Fraud Lawsuit Over Its $10 Billion Medicaid Home Care Program",
    "tinyUrl": "https://tinyurl.com/29jpkxfe",
    "xPostUrl": "https://x.com/C3Heditor/status/2069089617299599797",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_110705.jpg",
    "tags": ["New York", "DOJ", "Healthcare Policy", "Corruption-Fraud"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "While Democrat Anti-Capitalists Protest SpaceX’s ‘No Trillionaires’, Over 4,000 Employees Become Millionaires, Even Welders",
    "tinyUrl": "https://tinyurl.com/ytsb48am",
    "xPostUrl": "https://x.com/C3Heditor/status/2069090194171519360",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_110917.jpg",
    "tags": ["Socialism", "Economic Policy", "Left-Wing", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "The Democrat District Attorney Larry Krasner Is so Soft on Crime That Even Pennsylvania’s Dem Judges Have Had Enough",
    "tinyUrl": "https://tinyurl.com/445ct949",
    "xPostUrl": "https://x.com/C3Heditor/status/2069090686658338856",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_111104.jpg",
    "tags": ["Larry Krasner", "Pennsylvania", "Violent Crime", "Judiciary-Judicial"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Booted From Alaska’s Primary Ballot: Democrats’ Fake GOP ‘Sham’ Candidate Loses His Spot in the Race",
    "tinyUrl": "https://tinyurl.com/44thevvd",
    "xPostUrl": "https://x.com/C3Heditor/status/2069092412564046093",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_111451.jpg",
    "tags": ["2026 Elections", "Election Fraud", "Republican Party", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "New Mexico’s Democrat Rep. Gabe Vasquez Exposed for Lavish Fake Wedding That Turns Out Not to Be a Legal Marriage",
    "tinyUrl": "https://tinyurl.com/5avpmbrm",
    "xPostUrl": "https://x.com/C3Heditor/status/2069093073296953608",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_112049.jpg",
    "tags": ["Gabe Vasquez", "New Mexico", "Corruption-Fraud", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Texas James Talarico, Running for U.S. Senate, Claims Faith Bars Him Accepting ‘Big Money’ Influence but His Own Campaign Website Coordinates with Super PACS",
    "tinyUrl": "https://tinyurl.com/44k4wk4m",
    "xPostUrl": "https://x.com/C3Heditor/status/2069104956276142172",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_120747.jpg",
    "tags": ["James Talarico", "2026 Elections", "Corruption-Fraud", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Election Fraud Investigation Leads FBI to Raid a Soros-Connected Democrat Ohio Voter Mobilization Group",
    "tinyUrl": "https://tinyurl.com/3k6c73fe",
    "xPostUrl": "https://x.com/C3Heditor/status/2069105517285220816",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_121007.jpg",
    "tags": ["Election Fraud", "FBI", "George Soros", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Michigan’s Top Politics News Outlet Pressured To Kill Poll That Has Democrat Senate Candidate, Mallory McMorrow, With Only 6% Support",
    "tinyUrl": "https://tinyurl.com/3mhpb722",
    "xPostUrl": "https://x.com/C3Heditor/status/2069106057792598275",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_121222.jpg",
    "tags": ["Mallory McMorrow", "Michigan", "Media Bias", "2026 Elections"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Most ICE Democrat Protesters Arrested at Newark’s Delaney Hall Were Not Even From New Jersey",
    "tinyUrl": "https://tinyurl.com/w8ubjjn7",
    "xPostUrl": "https://x.com/C3Heditor/status/2069106767477235748",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_121505.jpg",
    "tags": ["Immigration", "New Jersey", "Left-Wing", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Wisconsin Democrat Governor Hopeful, Francesca Hong, Will Pursue Sanctuary State Policies",
    "tinyUrl": "https://tinyurl.com/vwtrb46w",
    "xPostUrl": "https://x.com/C3Heditor/status/2069107782096179340",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_121633.jpg",
    "tags": ["Francesca Hong", "Wisconsin", "Immigration", "2026 Elections"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Georgia’s SPLC-Funded Democrat Senator Ossoff Declines Comments About His Donors ‘Pay-to-Play White Supremacy’ Scandal",
    "tinyUrl": "https://tinyurl.com/3ffhjcep",
    "xPostUrl": "https://x.com/C3Heditor/status/2069108421882728629",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_122139.jpg",
    "tags": ["Jon Ossoff", "SPLC", "Corruption-Fraud", "Georgia"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Democrat VA Gov. Spanberger Appoints LGBT Activist Who Fought Girls’ Bathroom Protections From Male Intrusions for Virginia State Board Role",
    "tinyUrl": "https://tinyurl.com/79b73cf8",
    "xPostUrl": "https://x.com/C3Heditor/status/2069109046653694006",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_122428.jpg",
    "tags": ["Abigail Spanberger", "Virginia", "LGBTQ", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Illegal Alien DACA Recipient Was Democrat-Activist Mastermind Behind Planned Drone Attack at White House’s 250 UFC Event",
    "tinyUrl": "https://tinyurl.com/59jrbfn6",
    "xPostUrl": "https://x.com/C3Heditor/status/2069109808603476406",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_122711.jpg",
    "tags": ["Immigration", "Terrorism", "National Security", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Democrats’ Open Border Policies Gave Arrested Illegal Alien Opportunity For Drone Attacks On FIFA World Cup Venues",
    "tinyUrl": "https://tinyurl.com/y63mmbfk",
    "xPostUrl": "https://x.com/C3Heditor/status/2069110471488119204",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_122945.jpg",
    "tags": ["Immigration", "Terrorism", "National Security", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "Dem Rep. Sheila Cherfilus-McCormick Indicted on Federal Bribery Charges",
    "tinyUrl": "https://tinyurl.com/4rnzxmkv",
    "xPostUrl": "https://x.com/C3Heditor/status/2069111052499861870",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-22_123205.jpg",
    "tags": ["Sheila Cherfilus-McCormick", "Federal Indictment", "Corruption-Fraud", "Democrat Party"],
    "page": 1,
    "batchDate": "June 22, 2026"
  },
  {
    "headline": "NYC's Democrat Congressional Candidate, Darializa Avila Chevalier, Caught Up in FIFA World Cup Unsanctioned Tickets Scheme",
    "tinyUrl": "https://tinyurl.com/4khjhu5j",
    "xPostUrl": "https://x.com/C3Heditor/status/2068815444417380814",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_165723.jpg",
    "tags": ["Darializa Avila Chevalier", "NYC", "Corruption-Fraud", "Democrat Party"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Rooting Against America: Democrats Can't Even Seem to Back Their Own Country in the World Cup",
    "tinyUrl": "https://tinyurl.com/mr2x2adz",
    "xPostUrl": "https://x.com/C3Heditor/status/2068814758761881851",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_165440.jpg",
    "tags": ["Democrat Party", "Patriotism", "Culture War", "Politics"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Army Colonel Demands Maryland's Democrat Governor Wes Moore Come Clean as the 'Stolen Valor' Storm Grows Louder",
    "tinyUrl": "https://tinyurl.com/y2v9z6hn",
    "xPostUrl": "https://x.com/C3Heditor/status/2068813325161361731",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_164900.jpg",
    "tags": ["Wes Moore", "Maryland", "Democrat Party", "Criminal Investigation"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "In Democrat Connecticut, Signature Forgery Allegations Land a Pastor Under Arrest Ahead of Democratic Primary",
    "tinyUrl": "https://tinyurl.com/ykjvryte",
    "xPostUrl": "https://x.com/C3Heditor/status/2068812197665354122",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_164428.jpg",
    "tags": ["Connecticut", "Election Fraud", "Democrat Party", "Criminal Investigation"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Cross-Burning in Chicago Once Feared to Be a Racist Threat Turns Out to Be Anti-Trump Democrat's Hate-Stunt",
    "tinyUrl": "https://tinyurl.com/mrxnp8j7",
    "xPostUrl": "https://x.com/C3Heditor/status/2068811137185874387",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_163832.jpg",
    "tags": ["Chicago", "Hate", "Democrat Party", "Racial Issues"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "California Democrats Now Require Proof of Sexual Orientation to Win Taxpayer-Funded Contracts",
    "tinyUrl": "https://tinyurl.com/34t8mvs9",
    "xPostUrl": "https://x.com/C3Heditor/status/2068810150790529107",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_163618.jpg",
    "tags": ["California", "LGBTQ", "Democrat Party", "Economic Policy"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Democrats' First Transgender Lawmaker in New Hampshire Sentenced to 33 Years for Child Exploitation",
    "tinyUrl": "https://tinyurl.com/5489eu8c",
    "xPostUrl": "https://x.com/C3Heditor/status/2068809693967856029",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_163430.jpg",
    "tags": ["LGBTQ", "Democrat Party", "Felony Charges", "Sexual Misconduct"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Democrat Activists Socialists' Platform Openly Calls for Abolishing the Senate, SCOTUS & the Presidency",
    "tinyUrl": "https://tinyurl.com/5akcjrhv",
    "xPostUrl": "https://x.com/C3Heditor/status/2068808467888955850",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_162950.jpg",
    "tags": ["Socialism", "Democrat Party", "U.S. Constitution", "Politics"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Gunmakers Keep Fleeing Anti-Job Democrat Blue States, Move To Freedom-Loving Red States",
    "tinyUrl": "https://tinyurl.com/mr33pjy4",
    "xPostUrl": "https://x.com/C3Heditor/status/2068809024791891993",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_163153.jpg",
    "tags": ["Gun Control", "Blue States", "Business Relocation", "Democrat Party"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Court Filing Reveals Democrat AGs Conspired With Fringe Leftist Groups on 'How to Stop Trump'",
    "tinyUrl": "https://tinyurl.com/msfvp7nb",
    "xPostUrl": "https://x.com/C3Heditor/status/2068807887082664133",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_162733.jpg",
    "tags": ["Democrat Party", "Weaponization", "Left-Wing", "DOJ"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "DHS Blasts Virginia Democrat Governor Spanberger's Sanctuary Policies After Illegal Alien Pedophile Gets Low Bond",
    "tinyUrl": "https://tinyurl.com/4sar63wr",
    "xPostUrl": "https://x.com/C3Heditor/status/2068806953229271256",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_162404.jpg",
    "tags": ["Abigail Spanberger", "Virginia", "Immigration", "CBP-DHS-ICE"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Democrat Sanctuary Illegal Alien Who Raped a New York Teen Had an ICE Removal Order That Was Ignored",
    "tinyUrl": "https://tinyurl.com/9tf8njav",
    "xPostUrl": "https://x.com/C3Heditor/status/2068806391964315988",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_162131.jpg",
    "tags": ["Immigration", "New York", "Violent Crime", "CBP-DHS-ICE"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Muslim Ally of Democrat-Marxist NYC's Mayor Mamdani Arrested Over Alleged Ties to a $38 Million Medicaid Scam",
    "tinyUrl": "https://tinyurl.com/3z9x6c8r",
    "xPostUrl": "https://x.com/C3Heditor/status/2068805826781806782",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_161913.jpg",
    "tags": ["Zohran Mamdani", "NYC", "Corruption-Fraud", "Healthcare Policy"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Arizona's Radical-Democrat AG Drops Unconstitutional Weaponized Lawfare Case Against Giuliani and Trump Allies",
    "tinyUrl": "https://tinyurl.com/yjnfcnmj",
    "xPostUrl": "https://x.com/C3Heditor/status/2068805379689988297",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_161725.jpg",
    "tags": ["Arizona", "Kris Mayes", "Weaponization", "Democrat Party"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Fraud Scandal Keeps Haunting Democrats as Minnesota's Gov. Tim Walz's Approval Sinks to a Record Lower Than Trump's",
    "tinyUrl": "https://tinyurl.com/5afsaaxr",
    "xPostUrl": "https://x.com/C3Heditor/status/2068804896531398920",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_161528.jpg",
    "tags": ["Tim Walz", "Minnesota", "Corruption-Fraud", "Polling"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Gross Incompetence of Democrats JB Pritzker & Brandon Johnson On Full Display as 6 Killed and 28 Wounded in Chicago Shootings",
    "tinyUrl": "https://tinyurl.com/yd7kpzd8",
    "xPostUrl": "https://x.com/C3Heditor/status/2068804339838124459",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_161324.jpg",
    "tags": ["JB Pritzker", "Brandon Johnson", "Chicago", "Violent Crime"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Washington D.C. Ravaged by Teen Crime Is About to Be Run by a Soft-On-Crime Democrat-Socialist Janeese Lewis George",
    "tinyUrl": "https://tinyurl.com/2cbxnbek",
    "xPostUrl": "https://x.com/C3Heditor/status/2068803636935676030",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_161030.jpg",
    "tags": ["Janeese Lewis George", "WashingtonDC", "Violent Crime", "Democrat Party"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Michigan's Muslim Democrat Senate Candidate Abdul El-Sayed Makes Sick Joke About Trump Dying",
    "tinyUrl": "https://tinyurl.com/3z5p6wz4",
    "xPostUrl": "https://x.com/C3Heditor/status/2068802946721051089",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_160826.jpg",
    "tags": ["Abdul El-Sayed", "Michigan", "Islam-Muslim", "Democrat Party"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Gargantuan Hypocrite Dem Ro Khanna Believes Female Accusers of Maine's Democrat Senate Hopeful, Graham Platner, But Defends Him Anyway",
    "tinyUrl": "https://tinyurl.com/yedjvsch",
    "xPostUrl": "https://x.com/C3Heditor/status/2068802359619191005",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_160529.jpg",
    "tags": ["Ro Khanna", "Graham Platner", "Sexual Misconduct", "Democrat Party"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Even Texas Democrat Jasmine Crockett Thinks Dem James Talarico Is A Bad Choice for Black Voters",
    "tinyUrl": "https://tinyurl.com/mrypb27b",
    "xPostUrl": "https://x.com/C3Heditor/status/2068801724857376797",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-21_160015.jpg",
    "tags": ["Jasmine Crockett", "James Talarico", "Texas", "Racial Issues"],
    "page": 2,
    "batchDate": "June 21, 2026"
  },
  {
    "headline": "Fresh Allegations Regarding Democrat U.S. Senate Nominee Graham Platner Emerge as Primary Approaches",
    "tinyUrl": "https://tinyurl.com/fmz2rsb7",
    "xPostUrl": "https://x.com/C3Heditor/status/2066988337835945570",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/qzkGZqIoZcTOfKMQ.jpg",
    "tags": ["Graham Platner", "2026 Elections", "Sexual Misconduct"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Jobs Surge Under Trump While Democrat-Run Hollywood Sheds Thousands in Ongoing Industry Collapse",
    "tinyUrl": "https://tinyurl.com/4nn4hf4m",
    "xPostUrl": "https://x.com/C3Heditor/status/2066987835945570716",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/DgIHArJKfyFMesaV.jpg",
    "tags": ["Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Biden's Democrat Education Department Bureaucrats Defied Court Orders to Keep Pushing Gender Ideology in Schools",
    "tinyUrl": "https://tinyurl.com/4nn4hf4m",
    "xPostUrl": "https://x.com/C3Heditor/status/2066987135974912285",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/dPpfBwvsHhBdqpeZ.jpg",
    "tags": ["Biden Administration", "LGBTQ", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Florida Democrat Governor Nominee's Running Mate: Illegal Aliens Should Have Driver's Licenses",
    "tinyUrl": "https://tinyurl.com/fmz2rsb7",
    "xPostUrl": "https://x.com/C3Heditor/status/2066986286498361488",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/NGGChKXQRkRSABCz.jpg",
    "tags": ["Florida", "Immigration", "2026 Elections"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Seriously, Democrat-Socialist Francesca Hong Wants to Abolish Prisons and Is Running to Be Wisconsin's Next Governor",
    "tinyUrl": "https://tinyurl.com/ycx3ht6a",
    "xPostUrl": "https://x.com/C3Heditor/status/2066985770020126857",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/uxuruayASAomVwTV.jpg",
    "tags": ["Francesca Hong", "Wisconsin", "Left-Wing", "2026 Elections"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Champagne Democrat-Socialist Mayor Zohran Mamdani Scores Free Exclusive Tickets to Multiple World Cup Matches",
    "tinyUrl": "https://tinyurl.com/yc6nkpw7",
    "xPostUrl": "https://x.com/C3Heditor/status/2066984017413415333",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/kdDOaWmZWHfkRMNS.jpg",
    "tags": ["Zohran Mamdani", "NYC", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "In Democrat-Controlled Washington State, a High School Female Wrestler Sexually Assaulted by a Transgender Athlete During Official Match",
    "tinyUrl": "https://tinyurl.com/4wda9d2y",
    "xPostUrl": "https://x.com/C3Heditor/status/2066982814600294717",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/hHFDoGIIxxeFathS.jpg",
    "tags": ["LGBTQ", "Washington", "Sexual Misconduct"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "California Sh^thole: New Survey Ranks Democrat-Run Los Angeles Among the DEADEST Downtowns in the Entire World",
    "tinyUrl": "https://tinyurl.com/4m9a945p",
    "xPostUrl": "https://x.com/C3Heditor/status/2066982232128962991",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/JDlSzEoOhqSizOnS.jpg",
    "tags": ["California", "Los Angeles", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Democrat Candidate Abdul El-Sayed's MI U.S. Senate Bid Is Overshadowed by a Resurging Detroit Animal Shelter Scandal",
    "tinyUrl": "https://tinyurl.com/4bp8fa9f",
    "xPostUrl": "https://x.com/C3Heditor/status/2066981523270627533",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/wnfkQomAUSsrYTkb.jpg",
    "tags": ["Abdul El-Sayed", "Michigan", "2026 Elections"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Drug 'Zombies' Haunt a Democrat-Run Philly Neighborhood Just Minutes From the World Cup Stadium",
    "tinyUrl": "https://tinyurl.com/4ck6aye6",
    "xPostUrl": "https://x.com/C3Heditor/status/2066980729242706219",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/xkzvDanyfYEIsFdY.jpg",
    "tags": ["Philadelphia", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Result of Democrats' Open Borders: White Students Fall Below Half of U.S. School Enrollment as Latino Numbers Keep Surging",
    "tinyUrl": "https://tinyurl.com/bdh72a5t",
    "xPostUrl": "https://x.com/C3Heditor/status/2066978586142142819",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/VUjhxttqsyQSjZEp.jpg",
    "tags": ["Immigration", "Racial Issues", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Democrats' Illegal Aliens Hit With Federal Charges in a Migrant Child Smuggling Operation",
    "tinyUrl": "https://tinyurl.com/4rpa9bjs",
    "xPostUrl": "https://x.com/C3Heditor/status/2066978140727996600",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/DDesvXefRtijZcAh.jpg",
    "tags": ["CBP-DHS-ICE", "Immigration", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "DOJ Says Over 475K Children Were Trafficked Into U.S. Under Democrat Biden Admin  - 300K Still Missing",
    "tinyUrl": "https://tinyurl.com/2e2khzkm",
    "xPostUrl": "https://x.com/C3Heditor/status/2066977510709924088",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/YPgdcGzfDlZUducV.jpg",
    "tags": ["Biden Administration", "Immigration", "CBP-DHS-ICE"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "New Poll Shows Growing Numbers (71%) of Democrats Back Mass Deportation of Criminal Migrants",
    "tinyUrl": "https://tinyurl.com/mwcbzsdf",
    "xPostUrl": "https://x.com/C3Heditor/status/2066976981011317114",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/jMzOPtLOupvBOQBN.jpg",
    "tags": ["CBP-DHS-ICE", "Immigration", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Option #1: He Must Be On Crack ==> Hunter Biden Floats Running as Democrat Gavin Newsom's VP in a 2028 White House Bid in Stunning Interview",
    "tinyUrl": "https://tinyurl.com/2s3wrfe5",
    "xPostUrl": "https://x.com/C3Heditor/status/2066976391787094264",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/cZIkVhZosksEMrix.jpg",
    "tags": ["Hunter Biden", "Gavin Newsom", "Democrat Party"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "DOJ Will Challenge Virginia's Democrat Spanberger In Court Over Her Obvious 'Unconstitutional' Anti-ICE Laws",
    "tinyUrl": "https://tinyurl.com/4uu9es7s",
    "xPostUrl": "https://x.com/C3Heditor/status/2066975599344631887",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/EHZItodOGyeaxKKk.jpg",
    "tags": ["Abigail Spanberger", "Virginia", "CBP-DHS-ICE", "2026 Elections"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Texas Democrat Hopeful for U.S. Senate, James Talarico, Said Doctors Have a 'Moral Obligation' to Treat Gender Dysphoria in Children",
    "tinyUrl": "https://tinyurl.com/3t7psa64",
    "xPostUrl": "https://x.com/C3Heditor/status/2066974461778125267",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/ObGCozbhfJJXjvBK.jpg",
    "tags": ["James Talarico", "Texas", "LGBTQ", "2026 Elections"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "Democrat-Muslim Mayor Zohran Mamdani Infuriates Congressional Hispanic Caucus With Endorsement of Darializa Avila Chevalier, a Black Radical-Left Candidate",
    "tinyUrl": "https://tinyurl.com/ywaf6w2c",
    "xPostUrl": "https://x.com/C3Heditor/status/2066973312052347107",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/RuTNgwppEysFvKny.jpg",
    "tags": ["Zohran Mamdani", "Darializa Avila Chevalier", "NYC", "Left-Wing"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "No Joke - These Democrat Freakshow Candidates Represent a Real Threat to the Nation",
    "tinyUrl": "https://tinyurl.com/2xxk55fh",
    "xPostUrl": "https://x.com/C3Heditor/status/2066972192911262140",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/oFmZcCRsgZDaQjXJ.jpg",
    "tags": ["Democrat Party", "2026 Elections", "Left-Wing"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "CNN Does Brutal Takedown of Democrats' California One-Party Rule Incompetence",
    "tinyUrl": "https://tinyurl.com/42k3yrxx",
    "xPostUrl": "https://x.com/C3Heditor/status/2066566439293603842",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/YpcPQxVMUHCHfElL.jpg",
    "tags": ["California", "Democrat Party", "Fareed Zakaria", "Mainstream Media"],
    "page": 3,
    "batchDate": "June 16, 2026"
  },
  {
    "headline": "It's Agreed by All, California is America's 'Banana Republic'",
    "tinyUrl": "https://tinyurl.com/y8mbn3r7",
    "xPostUrl": "https://x.com/C3Heditor/status/2065510291371110591",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_110945_16b0bea4.jpg",
    "tags": ["California", "Democrat Party", "Government"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Democrats Can't Even Run a Zoo Properly: The San Francisco Zoo Becomes the Latest Case Study in Dem Mismanagement & Wasted Funds",
    "tinyUrl": "https://tinyurl.com/ymtvx6ne",
    "xPostUrl": "https://x.com/C3Heditor/status/2065509254941798548",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_139001_922d63a4.jpg",
    "tags": ["California", "Government", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Blacks Will Quit Voting Unless They Get Reparation Payoffs Says Democrat House Rep. Summer Lee",
    "tinyUrl": "https://tinyurl.com/3ufn2r3b",
    "xPostUrl": "https://x.com/C3Heditor/status/2065507885753233665",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_135423_5866a5e6.jpg",
    "tags": ["Summer Lee", "Reparations", "Racial Issues", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Illegal Aliens Were Signed up to Vote in Democrat New Jersey Without Their Knowledge",
    "tinyUrl": "https://tinyurl.com/fc3ptrp2",
    "xPostUrl": "https://x.com/C3Heditor/status/2065507269849063429",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_135206_84a0d131.jpg",
    "tags": ["New Jersey", "Immigration", "Election Fraud", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Former NY Governor Democrat David Paterson Rips Fellow Dem Gov Kathy Hochul & Others Over Their Partisan Redistricting Push",
    "tinyUrl": "https://tinyurl.com/y7zcyre9",
    "xPostUrl": "https://x.com/C3Heditor/status/2065505465040007407",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_134451_df74b913.jpg",
    "tags": ["David Paterson", "Kathy Hochul", "New York", "2026 Elections"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Sexually Explicit Books Found In Candidate James Talarico's Church As Texas Democrat Attempts to Prove He's A Moderate",
    "tinyUrl": "https://tinyurl.com/3xzdvrn5",
    "xPostUrl": "https://x.com/C3Heditor/status/2065492821230940217",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_125441_5492b94e.jpg",
    "tags": ["James Talarico", "Sexual Misconduct", "2026 Elections", "Texas"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "MLK Jr.'s Niece, Dr. Alveda King, Blasts SPLC as Modern KKK & Their Democrat Congressional Supporters",
    "tinyUrl": "https://tinyurl.com/cbm7y84v",
    "xPostUrl": "https://x.com/C3Heditor/status/2065492254546952498",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_125216_c264d270.jpg",
    "tags": ["SPLC", "Racial Issues", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Staffer for MI U.S. Senate Democrat Candidate Abdul El-Sayed Busted in Hamas-Linked Threat Plot Against Univ of Michigan Officials",
    "tinyUrl": "https://tinyurl.com/26ymcpuv",
    "xPostUrl": "https://x.com/C3Heditor/status/2065487802989482240",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_123453_90b79175.jpg",
    "tags": ["Abdul El-Sayed", "Michigan", "Terrorism", "2026 Elections"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Men Are Abandoning Democrats and the Party's Cultural Disconnect Explains Exactly Why",
    "tinyUrl": "https://tinyurl.com/yc5a427x",
    "xPostUrl": "https://x.com/C3Heditor/status/2065487093023805543",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_123143_89ad24d7.jpg",
    "tags": ["Democrat Party", "Politics", "2026 Elections"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Pressed on Illegal Foreign Donations for Democrats, ActBlue CEO Refuses To Cooperate",
    "tinyUrl": "https://tinyurl.com/39wutf9f",
    "xPostUrl": "https://x.com/C3Heditor/status/2065486385050513547",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_122859_44189727.jpg",
    "tags": ["2026 Elections", "Immigration", "Corruption-Fraud", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Supporting Nazi-Misogynist Abuser Graham Platner Has Exposed Democrats as Pure 'Hypocrites,' CNN Panelist",
    "tinyUrl": "https://tinyurl.com/yw43va4a",
    "xPostUrl": "https://x.com/C3Heditor/status/2065485497456066894",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_122530_f9d4a5d0.jpg",
    "tags": ["Graham Platner", "Mainstream Media", "Democrat Party", "Politics"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Democrats' Anti-ICE Campaign to Protect Open Borders & Illegal Immigration an Epic Fail",
    "tinyUrl": "https://tinyurl.com/pbn8m4jv",
    "xPostUrl": "https://x.com/C3Heditor/status/2065483754194231784",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_121926_ac9076f3.jpg",
    "tags": ["CBP-DHS-ICE", "Immigration", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Democrat-Muslim NYC Mayor Zohran Mamdani Pushes Dems to Embrace His Radical 'Abolish ICE' Message Nationwide",
    "tinyUrl": "https://tinyurl.com/2txv5bdh",
    "xPostUrl": "https://x.com/C3Heditor/status/2065482454601814030",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_121325_42d8c5f8.jpg",
    "tags": ["Zohran Mamdani", "CBP-DHS-ICE", "Left-Wing", "NYC"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Illinois Democrats' New Budget Proposal Has Absurd Social Media Tax per Users - Clueless About Who or What They Are Actually Taxing",
    "tinyUrl": "https://tinyurl.com/3mp8nw7w",
    "xPostUrl": "https://x.com/C3Heditor/status/2065481666819223670",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_121015_9083a5d9.jpg",
    "tags": ["Illinois", "Taxation", "Government", "Democrat Party"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Michigan Muslim Abdul El-Sayed Running For U.S. Senate Is Surging and Putting Establishment Democrats On Edge Regarding Anti-Semitism",
    "tinyUrl": "https://tinyurl.com/mukcxdp7",
    "xPostUrl": "https://x.com/C3Heditor/status/2065480264256499877",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_120205_a6b924d3.jpg",
    "tags": ["Abdul El-Sayed", "Michigan", "Islam-Muslim", "Israel"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Democrat Staffers For Candidates Keep Censoring People Who Dare to Ask Legitimate Questions",
    "tinyUrl": "https://tinyurl.com/2jpdub7n",
    "xPostUrl": "https://x.com/C3Heditor/status/2065479088060375307",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_120004_006e88b4.jpg",
    "tags": ["Democrat Party", "Politics", "2026 Elections"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Minnesota Democrats Tim Walz & Keith Ellison Slammed in Report for Turning a Blind Eye to Their State's Massive Welfare Fraud",
    "tinyUrl": "https://tinyurl.com/mr3m9dpr",
    "xPostUrl": "https://x.com/C3Heditor/status/2065478185165131971",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_115155_fafb607b.jpg",
    "tags": ["Tim Walz", "Keith Ellison", "Minnesota", "Corruption-Fraud"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Democrats, Graham Platner & MSM Journalists Make It Clear: Believe All Women - Unless She Votes Republican",
    "tinyUrl": "https://tinyurl.com/snydxx4f",
    "xPostUrl": "https://x.com/C3Heditor/status/2065476052856508456",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_114550_3af96334.jpg",
    "tags": ["Graham Platner", "Mainstream Media", "Media Bias", "Politics"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Election Fraud on Steroids: Hard Evidence Points to an Extreme Lack of Integrity in the California Primary Process",
    "tinyUrl": "https://tinyurl.com/6bdbn7kh",
    "xPostUrl": "https://x.com/C3Heditor/status/2065474983468408971",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_114345_e2e74180.jpg",
    "tags": ["California", "Election Fraud", "Politics"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Democrat Hypocrisy of 'Do As I Say, Not As I Do' is 24/7/365 Feature",
    "tinyUrl": "https://tinyurl.com/583cxj77",
    "xPostUrl": "https://x.com/C3Heditor/status/2065474378913952037",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-12_113718_0ddd9e22.jpg",
    "tags": ["Democrat Party", "Politics", "Media Bias"],
    "page": 4,
    "batchDate": "June 12, 2026"
  },
  {
    "headline": "Top Democrat Epstein Accuser Ro Khanna Humiliates Himself by Campaigning for Maine's Nazi Woman-Abuser Graham Platner",
    "tinyUrl": "https://tinyurl.com/mr4xxyny",
    "xPostUrl": "https://x.com/C3Heditor/status/2064103432957342004",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_165337_7e6f2119.jpg",
    "tags": ["Ro Khanna", "Graham Platner", "Maine", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Another Texas Legislature Capitol Staffer Confirms Romantic Relationship With Democrat Senate Hopeful James Talarico",
    "tinyUrl": "https://tinyurl.com/v9uhdpm3",
    "xPostUrl": "https://x.com/C3Heditor/status/2064102737340453155",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_165051_06bc8c5e.jpg",
    "tags": ["James Talarico", "Texas", "Sexual Misconduct", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Alarming New Poll Captures the Depth of Democrats' Hatred for Their Own Country",
    "tinyUrl": "https://tinyurl.com/8wyymaz6",
    "xPostUrl": "https://x.com/C3Heditor/status/2064101700181320071",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_164720_ff3769e1.jpg",
    "tags": ["Democrat Party", "Politics", "Left-Wing", "Media Bias"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Democrat Al Green Loses It Completely - Screams 'SHUT up!' and Calls DHS Sec. Mullin a Racist",
    "tinyUrl": "https://tinyurl.com/ysvxpdtp",
    "xPostUrl": "https://x.com/C3Heditor/status/2064101132432032136",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_164437_a232a8a8.jpg",
    "tags": ["Al Green", "Racial Issues", "Democrat Party"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Tax-Free Reparations for Blacks Demanded by California Democrat Tina McKinnor, Before Recipients Are Even Identified",
    "tinyUrl": "https://tinyurl.com/2zeady9m",
    "xPostUrl": "https://x.com/C3Heditor/status/2064100663395553566",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_164132_719c9fe3.jpg",
    "tags": ["Tina McKinnor", "California", "Reparations", "Racial Issues"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Arizona Democrat Congressional Hopeful JoAnna Mendoza Backed Legalizing Prostitution to Benefit Trans People",
    "tinyUrl": "https://tinyurl.com/57ach575",
    "xPostUrl": "https://x.com/C3Heditor/status/2064099743324647563",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_163856_54447dd8.jpg",
    "tags": ["JoAnna Mendoza", "Arizona", "LGBTQ", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "U.S. House Candidate Iowa Democrat Lindsay James Issued Apology to Voters Simply for Being White",
    "tinyUrl": "https://tinyurl.com/vf8pmxdn",
    "xPostUrl": "https://x.com/C3Heditor/status/2064099216905896228",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_163555_ad7963b1.jpg",
    "tags": ["Lindsay James", "Iowa", "Racial Issues", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "In Democrat-Muslim Mayor Mamdani's NYC, Anti-Jewish Hate Crimes Surge 71 Percent, Now Average One Every 18 Hours",
    "tinyUrl": "https://tinyurl.com/mws2hkt",
    "xPostUrl": "https://x.com/C3Heditor/status/2064097423513809350",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_162951_3d420019.jpg",
    "tags": ["Zohran Mamdani", "NYC", "Israel", "Hate"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Democrat Consultant James Carville Finally Tells the Truth: Democrat Hypocrisy Over Maine's U.S. Senate Candidate Graham Platner Is Very Real",
    "tinyUrl": "https://tinyurl.com/ycx4w32x",
    "xPostUrl": "https://x.com/C3Heditor/status/2064096934982234386",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_162747_2fa53abd.jpg",
    "tags": ["James Carville", "Graham Platner", "Maine", "Politics"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Illegal Alien Detainees' Snack Sales Explode at NJ Delaney Hall as Democrats Push Hunger Strike Hoax",
    "tinyUrl": "https://tinyurl.com/44nrd5z6",
    "xPostUrl": "https://x.com/C3Heditor/status/2064096248332726436",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_162506_bd25445c.jpg",
    "tags": ["New Jersey", "Immigration", "CBP-DHS-ICE", "Democrat Party"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Deep Democrat Ties of Obama Judge John J. McConnell Jr. Raise Red Flags After Trump Immigration Rules Are Tossed",
    "tinyUrl": "https://tinyurl.com/mvf34anc",
    "xPostUrl": "https://x.com/C3Heditor/status/2064095488240976364",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_162159_d1b00c44.jpg",
    "tags": ["John J. McConnell Jr.", "Judiciary-Judicial", "Immigration", "Politics"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Chicago Bears Flee Incompetent Democrat-Run City for Red State Indiana in Major NFL Franchise Move",
    "tinyUrl": "https://tinyurl.com/2wkx96pt",
    "xPostUrl": "https://x.com/C3Heditor/status/2064094969149657418",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_161957_351dfd50.jpg",
    "tags": ["Chicago", "Democrat Party", "Government"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "California's Bad Policies & High Costs Are Driving People Out of Democrats' One-Party Rule State at a Record Pace",
    "tinyUrl": "https://tinyurl.com/yeu4m87f",
    "xPostUrl": "https://x.com/C3Heditor/status/2064094357641154589",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_161742_700421c6.jpg",
    "tags": ["California", "Democrat Party", "Government"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Top Wisconsin Democrat Governor Hopeful Francesca Hong Hit With Lawsuit Over Unpaid Credit Card Debt",
    "tinyUrl": "https://tinyurl.com/59wvjmuh",
    "xPostUrl": "https://x.com/C3Heditor/status/2064093510156906728",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_161417_1055cb96.jpg",
    "tags": ["Francesca Hong", "Wisconsin", "Politics", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Outrage Erupts as Iowa Democrat Nate Willems Draws Comparison Between Real WWII D-Day Heroes and Radical-Left Antifa Thugs",
    "tinyUrl": "https://tinyurl.com/jt2crk5a",
    "xPostUrl": "https://x.com/C3Heditor/status/2064093048586285549",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_161218_341675e3.jpg",
    "tags": ["Nate Willems", "Iowa", "Left-Wing", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "CT Democrat Senator Chris Murphy Exposed for Bankrolling Extremist Left-Wing Group Behind Anti-ICE Violence",
    "tinyUrl": "https://tinyurl.com/a36sk352",
    "xPostUrl": "https://x.com/C3Heditor/status/2064092473576608071",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_161007_c97e45d8.jpg",
    "tags": ["Chris Murphy", "Connecticut", "Left-Wing", "CBP-DHS-ICE"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Democrat Congressional Candidate & Squatter Kicked Out of Luxury NYC Manhattan Condo - Did Not Pay Rent",
    "tinyUrl": "https://tinyurl.com/4hmtd8e9",
    "xPostUrl": "Democrat Congressional Candidate & Squatter Kicked Out of Luxury NYC Manhattan Condo - Did Not Pay Rent",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_160643_60f0a40a.jpg",
    "tags": ["NYC", "2026 Elections", "Politics", "Corruption-Fraud"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "After Failing Miserably On First Attempt, Arizona Democrat AG Kris Mayes Attempts Another Weaponization Indictment Against Trump's 2020 Election Team",
    "tinyUrl": "https://tinyurl.com/mawp2z5n",
    "xPostUrl": "https://x.com/C3Heditor/status/2064090770018046368",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_160334_21e79fed.jpg",
    "tags": ["Kris Mayes", "Arizona", "Weaponization", "Election Fraud"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "Sexual Misconduct Probe Looms but California Democratic Rep. Jimmy Gomez Somehow Still Wins His Primary",
    "tinyUrl": "https://tinyurl.com/44x8wwbe",
    "xPostUrl": "https://x.com/C3Heditor/status/2064089707764494421",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_160014_f1e5e6cc.jpg",
    "tags": ["Jimmy Gomez", "California", "Sexual Misconduct", "2026 Elections"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "NBC's Oh-By-The-Way: It Casually Admits Mail-in Ballots Always Favor Democrats as Far-Left Los Angeles Candidate Surges",
    "tinyUrl": "https://tinyurl.com/4xd6mssn",
    "xPostUrl": "https://x.com/C3Heditor/status/2064088984863613219",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-08_155857_955938d3.jpg",
    "tags": ["Mainstream Media", "Election Fraud", "California"],
    "page": 5,
    "batchDate": "June 8, 2026"
  },
  {
    "headline": "USPS Mail-In Ballot Verification Integrity Plan For Clean Elections Draws Immediate Lawsuit Threats From Democrats",
    "tinyUrl": "https://tinyurl.com/nwwupx8f",
    "xPostUrl": "https://x.com/C3Heditor/status/2062934483095937075",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_112850_e58fd9f8.jpg",
    "tags": ["Election Fraud", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "California's Latest Democrat Election Farce Production Has Launched Several Federal Investigations",
    "tinyUrl": "https://tinyurl.com/4fvya697",
    "xPostUrl": "https://x.com/C3Heditor/status/2062933791295877412",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_112551_373e5931.jpg",
    "tags": ["California", "Election Fraud", "Judiciary-Judicial", "Politics"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Democrat Party Rebranding Will Never Cure the Party's Deep Strain of Anti-Americanism",
    "tinyUrl": "https://tinyurl.com/4bb2sjj9",
    "xPostUrl": "https://x.com/C3Heditor/status/2062932035610542590",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_111856_0305279d.jpg",
    "tags": ["Democrat Party", "Politics", "Left-Wing"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "New Poll Finds Broad Decline in Support for Democrats' Midterm Hot-Woke Priorities: LGBT Issues, Gay Marriage, & Gender Changes",
    "tinyUrl": "https://tinyurl.com/32tx735p",
    "xPostUrl": "https://x.com/C3Heditor/status/2062931477319344154",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_111647_1bc8c975.jpg",
    "tags": ["LGBTQ", "Culture War", "2026 Elections"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "No Stopping Democrats' Woke Idiocracy As NY Rules That Mothers Are Now Officially 'Gestating Parent'",
    "tinyUrl": "https://tinyurl.com/4292nbyf",
    "xPostUrl": "https://x.com/C3Heditor/status/2062930769836650895",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_111352_a1b35241.jpg",
    "tags": ["New York", "Culture War", "LGBTQ", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "It Increasingly Appears Democrats Lack Any Credible Plan To Win Back Male Voters",
    "tinyUrl": "https://tinyurl.com/22rrpyu6",
    "xPostUrl": "https://x.com/C3Heditor/status/2062929507988672857",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_111030_558c4f98.jpg",
    "tags": ["Democrat Party", "Politics", "2026 Elections"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "NJ Democrats Pick Nominee With 9/11 Ties to Al-Qaeda Islamicist Terrorists and The WTC Blind Sheikh Bomber",
    "tinyUrl": "https://tinyurl.com/2v2mhc2p",
    "xPostUrl": "https://x.com/C3Heditor/status/2062928615541444819",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_110537_b404f1e0.jpg",
    "tags": ["New Jersey", "Terrorism", "Islam-Muslim", "2026 Elections"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "San Francisco Bay Area Residents Would Face BART Rapid Transit Tax Under New Democrats Proposal, Whether They Ride or Not",
    "tinyUrl": "https://tinyurl.com/2dvbxej3",
    "xPostUrl": "https://x.com/C3Heditor/status/2062926900876521805",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_105830_0eadd2d7.jpg",
    "tags": ["California", "Taxation", "Government", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Meet the Democrats Still Defending Maine's Nazi-Tattooed, Sexting Porta-Potty Masturbator Senate Hopeful Graham Platner",
    "tinyUrl": "https://tinyurl.com/26bx2hz8",
    "xPostUrl": "https://x.com/C3Heditor/status/2062926251724050840",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_105609_c174b519.jpg",
    "tags": ["Maine", "Graham Platner", "Politics", "Sexual Misconduct"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Massachusetts's Democrat Governor's Top Aide Busted In Major Cocaine Sting Claims DEI Means He Can Keep $31K Unused Vacation Pay",
    "tinyUrl": "https://tinyurl.com/2dzujesr",
    "xPostUrl": "https://x.com/C3Heditor/status/2062925275935973869",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_105019_c4df71bf.jpg",
    "tags": ["Massachusetts", "Culture War", "Drug Crime", "Politics"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Democrat Insanity: Say It's 'Economic Violence' If Bosses Won't Pay Women to Stay Home During Their Periods",
    "tinyUrl": "https://tinyurl.com/58jmjydj",
    "xPostUrl": "https://x.com/C3Heditor/status/2062922306565915043",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_104300_bc8ec037.jpg",
    "tags": ["Culture War", "Menstrual Products", "Left-Wing", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "NYC Democrat-Marxist Mayor Mamdani Ignites Democrat Civil War With a Divisive Endorsement of a Hate-Filled U.S. House Rep Candidate",
    "tinyUrl": "https://tinyurl.com/25kmwu3t",
    "xPostUrl": "https://x.com/C3Heditor/status/2062921121620439265",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_103536_0d0630d9.jpg",
    "tags": ["Zohran Mamdani", "NYC", "Democrat Party", "Politics"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "MA's Cape Cod Taxpayer Blasts Local Democrat Council Members Over Illegal Immigrant Benefits In Furious Speech",
    "tinyUrl": "https://tinyurl.com/5cx4m9av",
    "xPostUrl": "https://x.com/C3Heditor/status/2062874881696436385",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_073145_31292df5.jpg",
    "tags": ["Massachusetts", "Immigration", "Taxation", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Democrats Roll Out the Welcome Mat for Another Socialist Candidate - This One Plans to 'Californize' Wisconsin As Governor",
    "tinyUrl": "https://tinyurl.com/5ex38sty",
    "xPostUrl": "https://x.com/C3Heditor/status/2062873552630513810",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_072818_af2eab19.jpg",
    "tags": ["Wisconsin", "Left-Wing", "2026 Elections", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Eric Swalwell Drags Another Democrat Buddy Into the Sludge: New House Probe Triggered as Rep. Jimmy Gomez Admits to Cheating on His Wife",
    "tinyUrl": "https://tinyurl.com/wyxeh654",
    "xPostUrl": "https://x.com/C3Heditor/status/2062872482634203564",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_072216_0c0aacc5.jpg",
    "tags": ["Eric Swalwell", "U.S. Congress", "Sexual Misconduct", "Politics"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Texas Has Democrat Strategist James Carville Worried: Candidate James Talarico Must Drop the Six-Gender Idiocy to Win",
    "tinyUrl": "https://tinyurl.com/jykza7u6",
    "xPostUrl": "https://x.com/C3Heditor/status/2062864396863312161",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_065027_b56ef486.jpg",
    "tags": ["Texas", "James Talarico", "James Carville", "Culture War"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "New Poll Finds Most Americans Expect Democrats to Launch Third Trump Impeachment If They Win November Midterms",
    "tinyUrl": "https://tinyurl.com/4ztjxvec",
    "xPostUrl": "https://x.com/C3Heditor/status/2062863398988026191",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_064606_072d15f4.jpg",
    "tags": ["Impeachment", "Democrat Party", "2026 Elections", "Politics"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Court-Wrecking Pledge From Democrats Raises Alarm About the Future of the Supreme Court",
    "tinyUrl": "https://tinyurl.com/4su4tkhf",
    "xPostUrl": "https://x.com/C3Heditor/status/2062862557518381380",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_064249_b1c32ccc.jpg",
    "tags": ["Judiciary-Judicial", "Democrat Party"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Another Democrat Utopia: California's Santa Monica Shoppers Terrorized by Bat-Wielding Driver Shouting Antisemitic Slurs",
    "tinyUrl": "https://tinyurl.com/ycyea475",
    "xPostUrl": "https://x.com/C3Heditor/status/2062861600508313651",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_063902_73eda6a4.jpg",
    "tags": ["California", "Israel", "Violent Crime", "Hate"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "Chicago Democrat Hispanic Alderman Slams Mayor Brandon Johnson After Teen Takeover Chaos Injures Five Cops",
    "tinyUrl": "https://tinyurl.com/mj4szm78",
    "xPostUrl": "https://x.com/C3Heditor/status/2062859295171981527",
    "imageUrl": "https://static-assets.manus.space/manus-storage/2026-06-05_063404_feb94f1e.jpg",
    "tags": ["Chicago", "Brandon Johnson", "Violent Crime", "Politics"],
    "page": 6,
    "batchDate": "June 5, 2026"
  },
  {
    "headline": "CA Democrat Rep. Ro Khanna Gets Badly Schooled After He Compares Nazi-Tat Democrat to FDR",
    "tinyUrl": "https://tinyurl.com/2fz3hrmc",
    "xPostUrl": "https://x.com/C3Heditor/status/2062288943123435897",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_164327_40ae9f27.jpg",
    "tags": ["Ro Khanna", "Democrat Party", "Politics", "Left-Wing"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "'Crazy' Might Not Be Strong Enough: Fight Climate Change and Live Like 'the Jetsons,' Democrat James Talarico Promises Texas Voters",
    "tinyUrl": "https://tinyurl.com/bdf4je8b",
    "xPostUrl": "https://x.com/C3Heditor/status/2062286187469959390",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_163232_3c4a8f41.jpg",
    "tags": ["James Talarico", "Texas", "Climate Change", "2026 Elections"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Party Went Too Far, Black Rep. James Clyburn Warns Democrats: 'We Have to Get Back to Some Basics'",
    "tinyUrl": "https://tinyurl.com/5c5d826j",
    "xPostUrl": "https://x.com/C3Heditor/status/2062285352639889732",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_162908_022fc92c.jpg",
    "tags": ["Democrat Party", "Racial Issues", "Politics", "Left-Wing"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Even Legacy Media Can't Ignore It: Black Voters Are Walking Away From The Democrat Party",
    "tinyUrl": "https://tinyurl.com/3zvvuy9r",
    "xPostUrl": "https://x.com/C3Heditor/status/2062284811109113923",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_162706_78bc5fff.jpg",
    "tags": ["Racial Issues", "Democrat Party", "Mainstream Media", "Politics"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Black Reparations Activists Turn on Democrats Over the Ongoing Migration Surge Problem",
    "tinyUrl": "https://tinyurl.com/e4jsjzsb",
    "xPostUrl": "https://x.com/C3Heditor/status/2062284302373490696",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_162510_bc948891.jpg",
    "tags": ["Reparations", "Immigration", "Democrat Party", "Politics"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "New Degenerate's Scandal Forces NJ Sen. Cory Booker to Admit Democrat Graham Platner 'Has Questions to Answer'",
    "tinyUrl": "https://tinyurl.com/3neexk2d",
    "xPostUrl": "https://x.com/C3Heditor/status/2062283679771021584",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_162138_d6f9375b.jpg",
    "tags": ["New Jersey", "Cory Booker", "Politics", "Sexual Misconduct"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Illegal Aliens Are 'Our North Star,' Declares NJ Democrat Senator in Stunning Priority Reveal",
    "tinyUrl": "https://tinyurl.com/5dw6h9wf",
    "xPostUrl": "https://x.com/C3Heditor/status/2062282153438703804",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_161632_5ec8791c.jpg",
    "tags": ["New Jersey", "Immigration", "Democrat Party"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "California's \"Moderate\" Democrats Move to Criminalize Investigative Journalism to Shield Immigrant Fraud",
    "tinyUrl": "https://tinyurl.com/49ka2xz5",
    "xPostUrl": "https://x.com/C3Heditor/status/2062281615171035580",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_161419_15262a36.jpg",
    "tags": ["California", "Censorship", "Journalism", "Corruption-Fraud"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Hawaii Democrat Candidate Brandishes Firearm at County Workers in Off-the-Rails Incident",
    "tinyUrl": "https://tinyurl.com/4a3aphbz",
    "xPostUrl": "https://x.com/C3Heditor/status/2062280932954898738",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_161137_74fe0b2a.jpg",
    "tags": ["Hawaii", "Violent Crime", "2026 Elections", "Politics"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Samsung Leaves Democrat-Controlled New Jersey for Better Business Climate of Texas - 1,000 Garden State Jobs Gone",
    "tinyUrl": "https://tinyurl.com/nk8f4u4b",
    "xPostUrl": "https://x.com/C3Heditor/status/2062280231843418116",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_160845_a6f70c88.jpg",
    "tags": ["New Jersey", "Business Relocation", "Texas", "Business Climate"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Los Angeles Became a Living Hell and Democrats Made It Happen Every Step of the Way",
    "tinyUrl": "https://tinyurl.com/3b3cues6",
    "xPostUrl": "https://x.com/C3Heditor/status/2062278629309001799",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_160227_d77197cf.jpg",
    "tags": ["California", "Urban Decay", "Soft-On-Crime", "Government"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Arrest After Arrest by ICE Exposes the Criminals Democrats Keep Insisting Don’t Exist",
    "tinyUrl": "https://tinyurl.com/2pbwrcuc",
    "xPostUrl": "https://x.com/C3Heditor/status/2062277962431393981",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_155952_75b10a71.jpg",
    "tags": ["Immigration", "Violent Crime", "CBP-DHS-ICE"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Former Biden Staffers Ignite Democrat Civil War by Openly Turning Against Jill Biden For Her ‘Lived Experience’",
    "tinyUrl": "https://tinyurl.com/bdf98yrp",
    "xPostUrl": "https://x.com/C3Heditor/status/2062277276826263778",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_155727_7aafb6dd.jpg",
    "tags": ["Biden Administration", "Democrat Party", "Joe Biden", "Politics"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Sheriffs & Prosecutors Push Back Hard Against Democrat VA & MD Governors’ Far-Left Gun Policy Agenda",
    "tinyUrl": "https://tinyurl.com/u7982vhd",
    "xPostUrl": "https://x.com/C3Heditor/status/2062276345648812077",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_155329_6c547506.jpg",
    "tags": ["Virginia", "Maryland", "Gun Control", "Culture War"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Nebraska Democrat Senate Candidate Dan Osborn Quietly Drops ‘Abortion’ From Site, But Keeps Planned Parenthood Cash",
    "tinyUrl": "https://tinyurl.com/7w9fex3x",
    "xPostUrl": "https://x.com/C3Heditor/status/2062275711998583158",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_155053_ef384096.jpg",
    "tags": ["Nebraska", "Dan Osborn", "Culture War", "2026 Elections"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Virginia’s Affordability Party: Democrats Hiding More Taxes Within New Budget",
    "tinyUrl": "https://tinyurl.com/bdhh5cu7",
    "xPostUrl": "https://x.com/C3Heditor/status/2062274222899015690",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_154556_563f1989.jpg",
    "tags": ["Virginia", "Taxation", "Government"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Fresh Gutter Scandal Hits Maine Democrat Graham Platner Over Explicit Messages Sent During His Marriage",
    "tinyUrl": "https://tinyurl.com/24b8vb73",
    "xPostUrl": "https://x.com/C3Heditor/status/2062274198215557629",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_154500_f6c6457c.jpg",
    "tags": ["Maine", "2026 Elections", "Sexual Misconduct", "Politics"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Newly Surfaced Records Expose Democrat NC Senate Hopeful Roy Cooper’s Dark-Money Group Ties",
    "tinyUrl": "https://tinyurl.com/bded45tc",
    "xPostUrl": "https://x.com/C3Heditor/status/2062272205203857414",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_153701_ee9550a1.jpg",
    "tags": ["Roy Cooper", "North Carolina", "2026 Elections", "Politics"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Leaked Secret Signal Message Exposes the Democrat-Funded Machine Behind NJ ICE Facility Chaos Riots",
    "tinyUrl": "https://tinyurl.com/y5y5fsf9",
    "xPostUrl": "https://x.com/C3Heditor/status/2062271588456653282",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_153441_a6c19bcd.jpg",
    "tags": ["New Jersey", "Left-Wing", "CBP-DHS-ICE", "2026 Elections"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Texas School District Fires Muslim Principal After One Week Over Sharia Law and BLM Posts",
    "tinyUrl": "https://tinyurl.com/22u7264z",
    "xPostUrl": "https://x.com/C3Heditor/status/2062271039212585192",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-03_153219_5b0f605e.jpg",
    "tags": ["Texas", "Islam-Muslim", "Culture War"],
    "page": 7,
    "batchDate": "June 3, 2026"
  },
  {
    "headline": "Democrat House Rep. Admits Party Is 'Dodging' Hard Questions on Border, Crime, and Spending",
    "tinyUrl": "https://tinyurl.com/ykz2ywnc",
    "xPostUrl": "https://x.com/C3Heditor/status/2061536474780897531",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_150632_71989704.jpg",
    "tags": ["Democrat Party", "CBP-DHS-ICE", "Immigration", "Government"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Study of College Faculty Campaign Donations Reveals a Striking Far-Left Ideological Skew",
    "tinyUrl": "https://tinyurl.com/53kknp22",
    "xPostUrl": "https://x.com/C3Heditor/status/2061535858279866601",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_150347_7b80a1fe.jpg",
    "tags": ["Politics", "Left-Wing", "Democrat Party"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Democrat Ignoring U.S. Supreme Court Rulings: Maryland Governor Wes Moore Signs GLOCK Ban Bill Into Law",
    "tinyUrl": "https://tinyurl.com/mrz4mtan",
    "xPostUrl": "https://x.com/C3Heditor/status/2061535248416890040",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_150133_e8e004a8.jpg",
    "tags": ["Maryland", "Gun Control", "Judiciary-Judicial", "Government"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Radical Islamist Linda Sarsour Is a Mentor of Michigan Democrat Senate Hopeful Abdul El-Sayed",
    "tinyUrl": "https://tinyurl.com/9wnev6x8",
    "xPostUrl": "https://x.com/C3Heditor/status/2061534995988357232",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_145550_2734cb46.jpg",
    "tags": ["Michigan", "Islam-Muslim", "2026 Elections", "Left-Wing"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Major Felony Charges In Case of Prominent Michigan Democrat &amp; Associate of Governor Whitmer",
    "tinyUrl": "https://tinyurl.com/mr83uv4r",
    "xPostUrl": "https://x.com/C3Heditor/status/2061534774756966710",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_145201_16f3d4e7.jpg",
    "tags": ["Michigan", "Politics", "Corruption-Fraud", "Gretchen Whitmer"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Newark Anti-ICE Violence Mounts and NJ Governor Is Forced Admit Outside Rioters Are To Blame",
    "tinyUrl": "https://tinyurl.com/27v7uc9h",
    "xPostUrl": "https://x.com/C3Heditor/status/2061534209614688483",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_144854_33005c38.jpg",
    "tags": ["New Jersey", "Left-Wing", "CBP-DHS-ICE", "Violent Crime"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "NYC Is Financially Broken Yet Democrat-Marxist Mayor Mamdani Plans $5.2M Spending on Propaganda Bureau",
    "tinyUrl": "https://tinyurl.com/36m5y4w4",
    "xPostUrl": "https://x.com/C3Heditor/status/2061534628993741070",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_144607_71302c37.jpg",
    "tags": ["Zohran Mamdani", "New York", "Taxation", "Government"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Tennessee Democrat Rep Faces FBI Probe For Fraudulent PAC That Bilked Kamala Donors",
    "tinyUrl": "https://tinyurl.com/3ahj94tw",
    "xPostUrl": "https://x.com/C3Heditor/status/2061533643776893058",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_144213_9d05ca3f.jpg",
    "tags": ["Tennessee Politics", "Corruption-Fraud", "2026 Elections", "Politics"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Wisconsin Democrat Governor Candidate Francesca Hong Plans to Stream On Podcast With Hasan Piker Who Said &quot;We deserved what happened on 9/11&quot;",
    "tinyUrl": "https://tinyurl.com/mvvf5ee9",
    "xPostUrl": "https://x.com/C3Heditor/status/2061533056180142408",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_143953_cbb82da4.jpg",
    "tags": ["Wisconsin", "2026 Elections", "Terrorism", "Left-Wing"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "&quot;Moderate&quot; Democrats Desire To Tax Everything In Virginia, Including Taxes On Gym Memberships &amp; Streaming Services",
    "tinyUrl": "https://tinyurl.com/39d83tda",
    "xPostUrl": "https://x.com/C3Heditor/status/2061532235484807230",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-06-01_143640_e4ebe1c3.jpg",
    "tags": ["Virginia", "Taxation", "Democrat Party", "Government"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "On Democrat-Run Atlanta's Rapid Transit a 'Senseless' Broad Daylight Stabbing Attack on Woman Who Died From The Injuries",
    "tinyUrl": "https://tinyurl.com/4tp9ph3n",
    "xPostUrl": "https://x.com/C3Heditor/status/2061201100980855108",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_164104_f8e3f637.jpg",
    "tags": ["Georgia", "Violent Crime", "Soft-On-Crime", "Public Safety"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Taxpayer-Funded 'Peace Ambassador' Linked to Los Angeles Democrat Mayor Karen Bass Arrested as Convicted Murderer",
    "tinyUrl": "https://tinyurl.com/ybkk24ds",
    "xPostUrl": "https://x.com/C3Heditor/status/2061200509026070781",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_163821_d49d090e.jpg",
    "tags": ["California", "Corruption-Fraud", "Taxation", "Violence"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Utterly Creepy: Texas Senate Candidate James Talarico Actually Thought Posting Texts With a 13-Year-Old Was Fine",
    "tinyUrl": "https://tinyurl.com/2yasf42d",
    "xPostUrl": "https://x.com/C3Heditor/status/2061199602691551359",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_163452_c7af0d59.jpg",
    "tags": ["James Talarico", "Texas", "2026 Elections", "Sex Crimes"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Scandals Widen as Democrat's Maine U.S. Senate Hopeful Graham Platner Has Active Profile on Pedophile 'Predator's Paradise' App",
    "tinyUrl": "https://tinyurl.com/2x58atw5",
    "xPostUrl": "https://x.com/C3Heditor/status/2061199041082618255",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_163229_d965b042.jpg",
    "tags": ["Maine", "2026 Elections", "Sex Crimes", "Politics"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Child Sex Abuse Charges Land El Paso Democrat Council Candidate Behind Bars on $1.1M Bond",
    "tinyUrl": "https://tinyurl.com/85nubb45",
    "xPostUrl": "https://x.com/C3Heditor/status/2061198322787123330",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_162940_a66ad941.jpg",
    "tags": ["Texas", "2026 Elections", "Sex Crimes", "Politics"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "90% of Party Nominating Petition Signatures Are Fraudulent for New York Democrat Candidate",
    "tinyUrl": "https://tinyurl.com/yjvwwhb2",
    "xPostUrl": "https://x.com/C3Heditor/status/2061196979167015222",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_162709_e7ef510a.jpg",
    "tags": ["New York", "Election Fraud", "2026 Elections"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Anti-ICE Protests Backfire on New Jersey Democrats as Spiraling Violence Forces a Curfew",
    "tinyUrl": "https://tinyurl.com/33rynmc9",
    "xPostUrl": "https://x.com/C3Heditor/status/2061196381751222445",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_162201_c38a5a15.jpg",
    "tags": ["New Jersey", "CBP-DHS-ICE", "Left-Wing", "Violent Crime"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Growing Democrat Antisemitism Causes Pennsylvania Supreme Court Justice to Leave the Party",
    "tinyUrl": "https://tinyurl.com/56uejss7",
    "xPostUrl": "https://x.com/C3Heditor/status/2061195475953565841",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_161825_a40bf9f2.jpg",
    "tags": ["Pennsylvania", "Israel", "Democrat Party", "Judiciary-Judicial"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Democrats Still Want Open Borders: Deported Four Times, Mexican Illegal Alien Pleads Guilty To Killing A California 11-Year-Old Boy",
    "tinyUrl": "https://tinyurl.com/ycyxa3bc",
    "xPostUrl": "https://x.com/C3Heditor/status/2061192920783544521",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_160852_20f0acc4.jpg",
    "tags": ["Immigration", "Violent Crime", "CBP-DHS-ICE", "California"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "Prison Doors Close on California Democrat Congressman Sentenced for Fraud",
    "tinyUrl": "https://tinyurl.com/mry393kj",
    "xPostUrl": "https://x.com/C3Heditor/status/2061191385311842378",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-31_160213_9bde89f4.jpg",
    "tags": ["California", "Corruption-Fraud", "U.S. Congress", "Politics"],
    "page": 8,
    "batchDate": "June 1, 2026"
  },
  {
    "headline": "'Islam Is Part of the Fabric of America' Claim Is Direct Result of Democrats' Illegal Mass Immigration",
    "tinyUrl": "https://tinyurl.com/ym5akc6h",
    "xPostUrl": "https://x.com/C3Heditor/status/2060796629569937705",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_135335_2e1c5646.jpg",
    "tags": ["Immigration", "Islam-Muslim", "Democrat Party"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Swatting Attack Violence by Democrat Activists on Conservative SCOTUS Justice Amy Coney Barrett",
    "tinyUrl": "https://tinyurl.com/yhkbs2y5",
    "xPostUrl": "https://x.com/C3Heditor/status/2060795023512244314",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_134712_1725b39e.jpg",
    "tags": ["Judiciary-Judicial", "Left-Wing", "Violent Crime"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Analysts Warn Democrat Gov. Newsom Is Leaving California Dangerously Unprepared For Economic Collapse",
    "tinyUrl": "https://tinyurl.com/3zsujmj3",
    "xPostUrl": "https://x.com/C3Heditor/status/2060794118473765354",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_134338_1d75349d.jpg",
    "tags": ["California", "Gavin Newsom", "Government", "Democrat Party"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Clinton-Appointed Judge Blocks Trump's $1.8B Fund for Victims of Wrongful DOJ's Democrat Prosecution",
    "tinyUrl": "https://tinyurl.com/3ufh2jhv",
    "xPostUrl": "https://x.com/C3Heditor/status/2060793328241700905",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_134033_e4e33bd6.jpg",
    "tags": ["Judiciary-Judicial", "Democrat Party", "Weaponization", "Biden Administration"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Left-Wing Politico Concedes That the Democrats' Plan of 100% Tax Confiscation of Any Wealth Over $1B Is Doomed",
    "tinyUrl": "https://tinyurl.com/mutsh9e2",
    "xPostUrl": "https://x.com/C3Heditor/status/2060792092251566168",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_133538_662252ca.jpg",
    "tags": ["Taxation", "Democrat Party", "Government"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Charges Filed Against Radical Democrat Activist's Terrorist Threats Targeting TPUSA & Erika Kirk",
    "tinyUrl": "https://tinyurl.com/yxuy9pv3",
    "xPostUrl": "https://x.com/C3Heditor/status/2060790254857007592",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_132853_1e8f2351.jpg",
    "tags": ["Left-Wing", "Terrorism", "Turning Point USA"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "MSNOW Democrat Propagandist Embarrasses Herself By Revealing Complete Ignorance of Where American Rights Emanate From: “endowed by their Creator”",
    "tinyUrl": "https://tinyurl.com/4bvar7z4",
    "xPostUrl": "https://x.com/C3Heditor/status/2060788856702566686",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_132245_fcab9c76.jpg",
    "tags": ["Mainstream Media", "Media Bias", "U.S. Constitution", "Democrat Party"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "New York's Democrat Ban On Non-Lethal Weapons Is Unconstitutional & Directly Undermines the Supreme Court",
    "tinyUrl": "https://tinyurl.com/mjufd43a",
    "xPostUrl": "https://x.com/C3Heditor/status/2060788145424150923",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_132006_ca22e0d3.jpg",
    "tags": ["New York", "Culture War", "Gun Control", "Judiciary-Judicial"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Texans Blowback Causes Democrat Vegan James Talarico to Mislead About His Dislike of Beef",
    "tinyUrl": "https://tinyurl.com/bdfadt5n",
    "xPostUrl": "https://x.com/C3Heditor/status/2060786890727358635",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_130048_0cd6678e.jpg",
    "tags": ["James Talarico", "Texas", "2026 Elections"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Anti-White Racism Remarks Targeting a White Employee Lands Democrat Racist Black Judge a Suspension",
    "tinyUrl": "https://tinyurl.com/4htjtyej",
    "xPostUrl": "https://x.com/C3Heditor/status/2060781201489531311",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_125233_fc6f46c1.jpg",
    "tags": ["Racial Issues", "Judiciary-Judicial", "Culture War", "Democrat Party"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Prominent California Democrat Candidate Accused of Exposing Herself To Employee Then Paying Her Off With $350K",
    "tinyUrl": "https://tinyurl.com/3awj7v34",
    "xPostUrl": "https://x.com/C3Heditor/status/2060761176225591307",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_113244_45eb4d40.jpg",
    "tags": ["California", "Politics", "Taxation", "Sex Crimes"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Democrat-Marxist Mayor NYC Mamdani Backs NY Candidate Who Called President Biden a 'Rapist' & 'War Criminal'",
    "tinyUrl": "https://tinyurl.com/yvunemwn",
    "xPostUrl": "https://x.com/C3Heditor/status/2060759907570266193",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_112744_37e0c6e6.jpg",
    "tags": ["Zohran Mamdani", "New York", "2026 Elections", "Joe Biden"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Biden Family Refusal to Disappear From Public Eye Leaves Democrats Quietly Seething With Fury",
    "tinyUrl": "https://tinyurl.com/23rv2vtj",
    "xPostUrl": "https://x.com/C3Heditor/status/2060759022593032657",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_112413_9f1fc221.jpg",
    "tags": ["Joe Biden", "Democrat Party", "Biden Administration", "Politics"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Scandalous Sexual Affair Between Black Female Judge Appointed by Democrat Obama With Local Official in Her Court Chambers",
    "tinyUrl": "https://tinyurl.com/ycanw2ak",
    "xPostUrl": "https://x.com/C3Heditor/status/2060758515036123544",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_112203_e98e3459.jpg",
    "tags": ["Judiciary-Judicial", "Sex Crimes", "Politics"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Exposed: Democrat Biden Administration Fleeced Taxpayers to Fund Terror-Linked NGOs",
    "tinyUrl": "https://tinyurl.com/2ph2nubn",
    "xPostUrl": "https://x.com/C3Heditor/status/2060757294443348379",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_111730_c4c4f4b7.jpg",
    "tags": ["Biden Administration", "Terrorism", "Taxation", "Corruption-Fraud"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Soft-On-Crime In Democrat-Controlled Seattle As Another Violent Criminal Walks Free",
    "tinyUrl": "https://tinyurl.com/4dns9byt",
    "xPostUrl": "https://x.com/C3Heditor/status/2060756753512358278",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_111515_1770996a.jpg",
    "tags": ["Soft-On-Crime", "Violent Crime", "Washington", "Democrat Party"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Know Your Place, Woman: Hijab-Clad Democrat AOC Gets Talked Over & Ignored by Muslim Men at NYC Address",
    "tinyUrl": "https://tinyurl.com/5cwe9zv3",
    "xPostUrl": "https://x.com/C3Heditor/status/2060756068372759023",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_111229_c1312495.jpg",
    "tags": ["AOC", "Islam-Muslim", "New York", "Democrat Party"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "MSM Bites Dog Story: CNN Host Slams Democrats for Years of Hiding Biden's Worsening Cognitive Decline",
    "tinyUrl": "https://tinyurl.com/ycxkuhvr",
    "xPostUrl": "https://x.com/C3Heditor/status/2060755090877690182",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_110833_45351329.jpg",
    "tags": ["Mainstream Media", "Joe Biden", "Media Bias", "Biden Administration"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "Democrats Fear It will Become Common Knowledge for Donors Outside of Texas That Candidate James Talarico Is Considered One Creepy Weirdo by Texans",
    "tinyUrl": "https://tinyurl.com/3ekybpn5",
    "xPostUrl": "https://x.com/C3Heditor/status/2060752788183715998",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_105925_49936f0b.jpg",
    "tags": ["James Talarico", "Texas", "2026 Elections"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "North Carolina Court Rules Democrat State Board Broke the Constitution by Allowing Election Fraud",
    "tinyUrl": "https://tinyurl.com/5bwv25f8",
    "xPostUrl": "https://x.com/C3Heditor/status/2060751885972230552",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-30_105611_871b33bc.jpg",
    "tags": ["North Carolina", "Election Fraud"],
    "page": 9,
    "batchDate": "May 30, 2026"
  },
  {
    "headline": "California's Shady Non-Profit 'Health Charities' Channel Funds to Los Angeles Mayor Karen Bass & Democrats",
    "tinyUrl": "https://tinyurl.com/yc8bnavb",
    "xPostUrl": "https://x.com/C3Heditor/status/2060387501592695250",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_104817_9ab7b074.jpg",
    "tags": ["California", "Corruption-Fraud", "Non-Profit", "2026 Elections"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "The Democrat-Partisan ABA Abandons Illegal DEI Discrimination To Shield Its Law School Monopoly From Trump & State Courts",
    "tinyUrl": "https://tinyurl.com/bdzymbbx",
    "xPostUrl": "https://x.com/C3Heditor/status/2060388742121070617",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_105242_82e69735.jpg",
    "tags": ["Culture War", "Democrat Party"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Democrat Weirdo Confirms He's Also Delusional: Texas Senate Candidate James Talarico Claims Republicans Are Secretly Supporting Him",
    "tinyUrl": "https://tinyurl.com/5e8vza4d",
    "xPostUrl": "https://x.com/C3Heditor/status/2060390117383020841",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_105510_da1230a7.jpg",
    "tags": ["Texas", "LGBTQ", "2026 Elections"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "California Makes the Case That the Extreme Left Has Become the Democrat Mainstream",
    "tinyUrl": "https://tinyurl.com/4tsby4b5",
    "xPostUrl": "https://x.com/C3Heditor/status/2060390374435164362",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_105919_44b970ca.jpg",
    "tags": ["California", "Left-Wing", "Democrat Party", "Politics"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Democrat White-Privileged Hypocrisy: Rep. Debbie Wasserman Schultz Condemned For Running In Black District Primary",
    "tinyUrl": "https://tinyurl.com/e24kpxmt",
    "xPostUrl": "https://x.com/C3Heditor/status/2060391380938096865",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_110533_5e19a253.jpg",
    "tags": ["Politics", "Democrat Party", "U.S. Congress", "Florida"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Democrat Running for California Lt. Governor Linked to Chinese Communist Donor Funding",
    "tinyUrl": "https://tinyurl.com/mtv7mhzr",
    "xPostUrl": "https://x.com/C3Heditor/status/2060392910789419482",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_111123_1df8340c.jpg",
    "tags": ["California", "2026 Elections"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Anti-White Casting Discrimination in Democrat-Controlled Hollywood As Actress Blows Whistle",
    "tinyUrl": "https://tinyurl.com/2f7t9z48",
    "xPostUrl": "https://x.com/C3Heditor/status/2060394271442694222",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_111443_59eef124.jpg",
    "tags": ["Democrat Party", "Racial Issues", "Entertainment Industry"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Democrat Los Angeles Mayor Karen Bass Draws Fierce Backlash For Pushing Taxpayer-Funded Free Dental Care For Meth Drug Addicts",
    "tinyUrl": "https://tinyurl.com/ydmrrrw6",
    "xPostUrl": "https://x.com/C3Heditor/status/2060398628884074626",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_113202_b5d31df7.jpg",
    "tags": ["California", "Karen Bass", "Taxation"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "New York Governor & Democrats Provide $557M Pension-Pork After Public-Sector Unions Donated Millions to Campaigns",
    "tinyUrl": "https://tinyurl.com/3us3k2nd",
    "xPostUrl": "https://x.com/C3Heditor/status/2060399419795620034",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_113509_2cca7561.jpg",
    "tags": ["New York", "Corruption-Fraud", "Corruption-Fraud", "Corruption-Fraud"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Still Doubling Down: Democrats Refuse To Learn Their Lesson On Defunding The Police",
    "tinyUrl": "https://tinyurl.com/yb98sjv3",
    "xPostUrl": "https://x.com/C3Heditor/status/2060399940132577764",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_114610_df673ad3.jpg",
    "tags": ["NYC", "Socialism", "Democrat Party", "Politics"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Soft-On-Crime Minnesota Democrat Gov. Tim Walz Pardons Illegal Alien Convicted of Armed Robbery Before ICE Deportation",
    "tinyUrl": "https://tinyurl.com/3tz4u3z5",
    "xPostUrl": "https://x.com/C3Heditor/status/2060402891379065204",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_114853_1bec4a63.jpg",
    "tags": ["Minnesota", "Tim Walz", "Criminal Justice", "Soft-On-Crime"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Incompetent Democrat Mayor of Boston Pushes Non-Serious Policies - Promotes Menstruation Event for Transgenders",
    "tinyUrl": "https://tinyurl.com/ye2a6ayb",
    "xPostUrl": "https://x.com/C3Heditor/status/2060421475534827683",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_130243_099cb04d.jpg",
    "tags": ["Boston", "Immigration", "Democrat Party"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Surprise! Arizona Democrat Sen. Ruben Gallego, the Play Pal of Eric Swalwell, Establishes Legal Defense Fund To Fight Ethics Probe",
    "tinyUrl": "https://tinyurl.com/3ed77ehn",
    "xPostUrl": "https://x.com/C3Heditor/status/2060422148661854268",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_130517_aa736f2b.jpg",
    "tags": ["Arizona", "Election Fraud", "Democrat Party"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "More & More Evidence Confirms Voter Fraud Exists And Voter ID Laws Remain The Obvious Solution Despite Democrat Obstruction",
    "tinyUrl": "https://tinyurl.com/3xvnx562",
    "xPostUrl": "https://x.com/C3Heditor/status/2060423180108337338",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_130940_54993373.jpg",
    "tags": ["Election Fraud", "Corruption-Fraud"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Remember When MSM Claimed Dead People Don't Vote: Chicago-Area Democrat Alderwoman Arrested For Casting Ballot on Behalf of Her Deceased Mothe",
    "tinyUrl": "https://tinyurl.com/3nc4k2yr",
    "xPostUrl": "https://x.com/C3Heditor/status/2060423932474265946",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_131231_d640bf3b.jpg",
    "tags": ["Election Fraud", "Corruption-Fraud"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Texas Democrat Who Vilified and Desired to Jail & Castrate Jews/Zionists Loses Congressional Runoff Election",
    "tinyUrl": "https://tinyurl.com/427zc3uc",
    "xPostUrl": "https://x.com/C3Heditor/status/2060424588694081593",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_131508_58ec004a.jpg",
    "tags": ["Texas", "Politics", "2026 Elections"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Man Bites Dog Surprise: Democrats Admit LGBT Extremism, Identity Politics Hurt Kamala Harris in 2024 Election",
    "tinyUrl": "https://tinyurl.com/yycucptm",
    "xPostUrl": "https://x.com/C3Heditor/status/2060425186801856886",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_131734_97e2ba56.jpg",
    "tags": ["LGBTQ", "Democrat Party", "Politics", "Culture War"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Michigan Democrat Goes Full Stupid: Says The Filibuster 'must go' But Then Says Dems Should Use It To Stop 'big ugly bill'",
    "tinyUrl": "https://tinyurl.com/2s752cbe",
    "xPostUrl": "https://x.com/C3Heditor/status/2060425803301531770",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_132006_438a0e51.jpg",
    "tags": ["Michigan", "Democrat Party", "U.S. Congress"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "New Mexico's Democrat Governor Goes Beyond Full Stupid - Says Party Should Only Focus On Women Voters",
    "tinyUrl": "https://tinyurl.com/4ju6uh77",
    "xPostUrl": "https://x.com/C3Heditor/status/2060426326851338462",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_132200_b318a5ab.jpg",
    "tags": ["New Mexico", "Democrat Party", "Politics"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },
  {
    "headline": "Vegan's Campaign War Against Texas Meat Lovers Is Democrat James Talarico's Idea of A Winning Strategy",
    "tinyUrl": "https://tinyurl.com/mubjxxpm",
    "xPostUrl": "https://x.com/C3Heditor/status/2060429979029012840",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-29_133452_923210b8.jpg",
    "tags": ["Texas", "Veganism", "2026 Elections"],
    "page": 10,
    "batchDate": "May 29, 2026"
  },

  {
    num: 900,
    headline: "New York City Mayor Mamdani\'s Democrat-Marxist\'s Vision: Plan Is To Seize Private Real Estate Block By Block Across The City",
    tinyUrl: "https://tinyurl.com/2n39kxje",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_160517_98b4fc75.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059742832366109071",
    tags: ["Left-Wing", "Democrat Party", "Housing", "Government"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 899,
    headline: "Unconstitutional Anti-2nd-Amendment Policies Targeting Glock Handguns Approved by Maryland\'s Democratic Governor",
    tinyUrl: "https://tinyurl.com/3rfkx44u",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_160012_2e66c7b0.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059742129165922348",
    tags: ["Second Amendment", "Democrat Party", "Gun Control", "Maryland Politics"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 898,
    headline: "Incompetent Los Angeles Democrat-Marxist Mayor Axes the Repairs of Pothole-Plagued Streets",
    tinyUrl: "https://tinyurl.com/5n7n2vvn",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_155354_f9712f4f.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059739723443159513",
    tags: ["Los Angeles Politics", "Government", "Business Climate", "Democrat Party"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 897,
    headline: "Hypocrisy of The Anti-Oligarchy Tour: Democrat-Socialist Bernie Sanders Spent $608,000 On Jets, Hotels & Limos",
    tinyUrl: "https://tinyurl.com/4krcukkp",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_155047_ee18d31c.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059738992304672874",
    tags: ["Democrat Party", "Left-Wing", "Campaign Finance", "Government"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 896,
    headline: "Democrat Party Drops Dem Jasmine Crockett For White Dude James Talarico, But She Rants About GOP Racism Instead",
    tinyUrl: "https://tinyurl.com/52yb7xwx",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_154832_c80a6cc3.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059738231042891871",
    tags: ["Democrat Party", "Left-Wing", "Media Bias", "Politics"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 895,
    headline: "TikTok Video Shows Anti-American Michigan Democrat Cruelly Mocking Erika Kirk & MAGA",
    tinyUrl: "https://tinyurl.com/bd28rrcc",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_154344_bb0630d0.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059737216621166771",
    tags: ["Alternative & Social Media", "Democrat Party", "Donald Trump", "Michigan Politics"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 894,
    headline: "Rep. Jamie Raskin Tries Reviving The Long-Debunked, Democrat Charlottesville Lie of \'Fine Peoples\' Hoax About Trump",
    tinyUrl: "https://tinyurl.com/495ke6vb",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_154153_cf85cdae.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059736717280862439",
    tags: ["Donald Trump", "Trump Opposition", "Democrat Party", "Media Bias"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 893,
    headline: "California Democrat Darling Flooded With Donor Cash From Sources Tied To Chinese Government & CCP Intelligence",
    tinyUrl: "https://tinyurl.com/hzt9u4d8",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_153905_944e8030.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059736031994482971",
    tags: ["Democrat Party", "Campaign Finance", "Government", "California Politics"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 892,
    headline: "Michigan Democrat U.S. Senate Candidate Mallory McMorrow Doubles Down On Defending Child Gender Mutilation",
    tinyUrl: "https://tinyurl.com/hwu42zf3",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_153109_f96201e7.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059734050995397037",
    tags: ["Michigan Politics", "Democrat Party", "Left-Wing", "Gender Issues"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 891,
    headline: "Reality Sucks When the Comatose Awake: Caught in An Anger Trap, Democrats Worry Trump Has Exposed Their Political Weakness",
    tinyUrl: "https://tinyurl.com/bd6hard5",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_152916_e1de9784.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059733557854245168",
    tags: ["Donald Trump", "Democrat Party", "Polling", "Trump Opposition"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 890,
    headline: "American Sniper Widow Blasts Maine Democrat U.S. Senate Candidate Graham Platner Over His Attacks On Her Late Husband",
    tinyUrl: "https://tinyurl.com/bdz7p9ku",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_152359_e24ecf75.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059732225357480195",
    tags: ["Democrat Party", "Midterm Elections", "Mainstream Media", "Military"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 889,
    headline: "North Carolina Democrat Roy Cooper Oversaw Nation\'s Highest Health Costs But Promises Affordability As Candidate For U.S. Senate",
    tinyUrl: "https://tinyurl.com/57y9xa36",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_152148_c19d1397.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059731614578651465",
    tags: ["Healthcare Policy", "Democrat Party", "North Carolina Politics", "Government"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 888,
    headline: "California Democrat Governor Candidate Tom Steyer Backs Transgender Athletes In High School Sports",
    tinyUrl: "https://tinyurl.com/4ktnfd5k",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_151839_80ef6a92.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059730913043640710",
    tags: ["California Politics", "Democrat Party", "Left-Wing", "Midterm Elections"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 887,
    headline: "AOC\'s Ex-Chief Of Staff Threatens Democrat Who Refuses To Support A Nazi-Linked Candidate",
    tinyUrl: "https://tinyurl.com/y8yunz2v",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_151640_28d99044.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059730376898359728",
    tags: ["Democrat Party", "Left-Wing", "Politics", "Media Bias"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 886,
    headline: "Federal Funds For Drag Story Hour Sought By Two New York 2026 Candidates",
    tinyUrl: "https://tinyurl.com/25zcy68s",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_151438_e9ea2ec1.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059729885581713853",
    tags: ["Democrat Party", "Government", "Left-Wing", "New York Politics"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 885,
    headline: "Backlash Forces Democrat Ghouls To Delete DNC Post Politicizing Death Of 13 Service Members",
    tinyUrl: "https://tinyurl.com/w2v5fn2v",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_151204_a79e265c.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059729014659723281",
    tags: ["Democrat Party", "DNC", "Donald Trump", "Trump Opposition"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 884,
    headline: "Black Athletes Are Called-On To Sacrifice Their College Careers For The Democrats\' Political Agenda",
    tinyUrl: "https://tinyurl.com/4yhsfcz9",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_150641_7e443be0.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059727752547516772",
    tags: ["Left-Wing", "Democrat Party", "Media Bias", "Identity Politics"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 883,
    headline: "California Taxpayers Are Footing The Bill For Democrat Gov. Gavin Newsom\'s Porn Deliveries To Death Row Inmates Via Free Digital Tablets",
    tinyUrl: "https://tinyurl.com/4zr8kpup",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_145925_9e970861.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059725868390310312",
    tags: ["California Politics", "Government", "Criminal Justice", "Left-Wing"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 882,
    headline: "Democrats Want To Shut Down Medicare\'s AI Tool For Because It\'s Too Good At Spotting Prior Authorization Fraud",
    tinyUrl: "https://tinyurl.com/3sd4f6vf",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_145538_8ccf9a09.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059725101092728878",
    tags: ["Corruption-Fraud", "Democrat Party", "Healthcare Policy", "Government"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    num: 881,
    headline: "Cook County\'s Woke Democrats Let Hundreds Of Dangerous, Violent Criminals Go Completely Off-Grid, Untraceable",
    tinyUrl: "https://tinyurl.com/yc2fkmbu",
    imageUrl: "https://static-assets.manus.space/manus-storage/2026-05-27_145324_0ab236e8.jpg",
    xPostUrl: "https://x.com/C3Heditor/status/2059722930439720997",
    tags: ["Violent Crime", "Criminal Justice", "Democrat Party", "Left-Wing"],
    page: 3,
    batchDate: "May 27, 2026",
  },
  {
    "headline": "New York City Mayor Mamdani\'s Democrat-Marxist\'s Vision: Plan Is To Seize Private Real Estate Block By Block Across The City",
    "tinyUrl": "https://tinyurl.com/2n39kxje",
    "xPostUrl": "https://x.com/C3Heditor/status/2059742832366109071",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_160517_98b4fc75.jpg",
    "tags": ["Left-Wing", "Democrat Party", "Housing", "Government"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Unconstitutional Anti-2nd-Amendment Policies Targeting Glock Handguns Approved by Maryland\'s Democratic Governor",
    "tinyUrl": "https://tinyurl.com/3rfkx44u",
    "xPostUrl": "https://x.com/C3Heditor/status/2059742129165922348",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_160012_2e66c7b0.jpg",
    "tags": ["Culture War", "Democrat Party", "Gun Control", "Maryland"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Incompetent Los Angeles Democrat-Marxist Mayor Axes the Repairs of Pothole-Plagued Streets",
    "tinyUrl": "https://tinyurl.com/5n7n2vvn",
    "xPostUrl": "https://x.com/C3Heditor/status/2059739723443159513",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_155354_f9712f4f.jpg",
    "tags": ["Los Angeles", "Government", "Business Climate", "Democrat Party"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Hypocrisy of The Anti-Oligarchy Tour: Democrat-Socialist Bernie Sanders Spent $608,000 On Jets, Hotels & Limos",
    "tinyUrl": "https://tinyurl.com/4krcukkp",
    "xPostUrl": "https://x.com/C3Heditor/status/2059738992304672874",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_155047_ee18d31c.jpg",
    "tags": ["Democrat Party", "Left-Wing", "2026 Elections", "Government"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Democrat Party Drops Dem Jasmine Crockett For White Dude James Talarico, But She Rants About GOP Racism Instead",
    "tinyUrl": "https://tinyurl.com/52yb7xwx",
    "xPostUrl": "https://x.com/C3Heditor/status/2059738231042891871",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_154832_c80a6cc3.jpg",
    "tags": ["Democrat Party", "Left-Wing", "Media Bias", "Politics"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "TikTok Video Shows Anti-American Michigan Democrat Cruelly Mocking Erika Kirk & MAGA",
    "tinyUrl": "https://tinyurl.com/bd28rrcc",
    "xPostUrl": "https://x.com/C3Heditor/status/2059737216621166771",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_154344_bb0630d0.jpg",
    "tags": ["Alternative & Social Media", "Democrat Party", "Michigan"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Rep. Jamie Raskin Tries Reviving The Long-Debunked, Democrat Charlottesville Lie of \'Fine Peoples\' Hoax About Trump",
    "tinyUrl": "https://tinyurl.com/495ke6vb",
    "xPostUrl": "https://x.com/C3Heditor/status/2059736717280862439",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_154153_cf85cdae.jpg",
    "tags": ["Democrat Party", "Media Bias"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "California Democrat Darling Flooded With Donor Cash From Sources Tied To Chinese Government & CCP Intelligence",
    "tinyUrl": "https://tinyurl.com/hzt9u4d8",
    "xPostUrl": "https://x.com/C3Heditor/status/2059736031994482971",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_153905_944e8030.jpg",
    "tags": ["Democrat Party", "2026 Elections", "Government", "California"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Michigan Democrat U.S. Senate Candidate Mallory McMorrow Doubles Down On Defending Child Gender Mutilation",
    "tinyUrl": "https://tinyurl.com/hwu42zf3",
    "xPostUrl": "https://x.com/C3Heditor/status/2059734050995397037",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_153109_f96201e7.jpg",
    "tags": ["Michigan", "Democrat Party", "Left-Wing", "LGBTQ"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Reality Sucks When the Comatose Awake: Caught in An Anger Trap, Democrats Worry Trump Has Exposed Their Political Weakness",
    "tinyUrl": "https://tinyurl.com/bd6hard5",
    "xPostUrl": "https://x.com/C3Heditor/status/2059733557854245168",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_152916_e1de9784.jpg",
    "tags": ["Democrat Party", "Polling"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "American Sniper Widow Blasts Maine Democrat U.S. Senate Candidate Graham Platner Over His Attacks On Her Late Husband",
    "tinyUrl": "https://tinyurl.com/bdz7p9ku",
    "xPostUrl": "https://x.com/C3Heditor/status/2059732225357480195",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_152359_e24ecf75.jpg",
    "tags": ["Democrat Party", "Midterm Elections", "Mainstream Media"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "North Carolina Democrat Roy Cooper Oversaw Nation\'s Highest Health Costs But Promises Affordability As Candidate For U.S. Senate",
    "tinyUrl": "https://tinyurl.com/57y9xa36",
    "xPostUrl": "https://x.com/C3Heditor/status/2059731614578651465",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_152148_c19d1397.jpg",
    "tags": ["Healthcare Policy", "Democrat Party", "North Carolina", "Government"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "California Democrat Governor Candidate Tom Steyer Backs Transgender Athletes In High School Sports",
    "tinyUrl": "https://tinyurl.com/4ktnfd5k",
    "xPostUrl": "https://x.com/C3Heditor/status/2059730913043640710",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_151839_80ef6a92.jpg",
    "tags": ["California", "Democrat Party", "Left-Wing", "Midterm Elections"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "AOC\'s Ex-Chief Of Staff Threatens Democrat Who Refuses To Support A Nazi-Linked Candidate",
    "tinyUrl": "https://tinyurl.com/y8yunz2v",
    "xPostUrl": "https://x.com/C3Heditor/status/2059730376898359728",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_151640_28d99044.jpg",
    "tags": ["Democrat Party", "Left-Wing", "Politics", "Media Bias"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Federal Funds For Drag Story Hour Sought By Two New York 2026 Candidates",
    "tinyUrl": "https://tinyurl.com/25zcy68s",
    "xPostUrl": "https://x.com/C3Heditor/status/2059729885581713853",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_151438_e9ea2ec1.jpg",
    "tags": ["Democrat Party", "Government", "Left-Wing", "New York"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Backlash Forces Democrat Ghouls To Delete DNC Post Politicizing Death Of 13 Service Members",
    "tinyUrl": "https://tinyurl.com/w2v5fn2v",
    "xPostUrl": "https://x.com/C3Heditor/status/2059729014659723281",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_151204_a79e265c.jpg",
    "tags": ["Democrat Party", "Media Bias"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Black Athletes Are Called-On To Sacrifice Their College Careers For The Democrats\' Political Agenda",
    "tinyUrl": "https://tinyurl.com/4yhsfcz9",
    "xPostUrl": "https://x.com/C3Heditor/status/2059727752547516772",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_150641_7e443be0.jpg",
    "tags": ["Left-Wing", "Democrat Party", "Media Bias", "Culture War"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "California Taxpayers Are Footing The Bill For Democrat Gov. Gavin Newsom\'s Porn Deliveries To Death Row Inmates Via Free Digital Tablets",
    "tinyUrl": "https://tinyurl.com/4zr8kpup",
    "xPostUrl": "https://x.com/C3Heditor/status/2059725868390310312",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_145925_9e970861.jpg",
    "tags": ["California", "Government", "Criminal Justice", "Left-Wing"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Democrats Want To Shut Down Medicare\'s AI Tool For Because It\'s Too Good At Spotting Prior Authorization Fraud",
    "tinyUrl": "https://tinyurl.com/3sd4f6vf",
    "xPostUrl": "https://x.com/C3Heditor/status/2059725101092728878",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_145538_8ccf9a09.jpg",
    "tags": ["Corruption-Fraud", "Democrat Party", "Healthcare Policy", "Government"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },
  {
    "headline": "Cook County\'s Woke Democrats Let Hundreds Of Dangerous, Violent Criminals Go Completely Off-Grid, Untraceable",
    "tinyUrl": "https://tinyurl.com/yc2fkmbu",
    "xPostUrl": "https://x.com/C3Heditor/status/2059722930439720997",
    "imageUrl": "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/2026-05-27_145324_0ab236e8.jpg",
    "tags": ["Violent Crime", "Criminal Justice", "Democrat Party", "Left-Wing"],
    "page": 12,
    "batchDate": "May 27, 2026"
  },

  {
    "headline": "Hypocrisy: The Black Caucus That Claims Congress Is Silencing Black Voices Itself Silences Black Voices They Disagree With",
    "tinyUrl": "https://tinyurl.com/yx7sbmwz",
    "xPostUrl": "https://x.com/C3Heditor/status/2059377828441837711",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Uh-Oh: Hakeem Jeffries Claims The Democrats' Ghosts-of-the-Confederacy Are Still Haunting America Today",
    "tinyUrl": "https://tinyurl.com/4rfewemx",
    "xPostUrl": "https://x.com/C3Heditor/status/2059376816020652387",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Forget 'Black Fatigue': Race Hysteria Has Again Become The Democrats' Chosen Strategy Heading Into The Midterms",
    "tinyUrl": "https://tinyurl.com/45r94ydf",
    "xPostUrl": "https://x.com/C3Heditor/status/2059375074658959848",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "New Dem Survey: \"A lot of Democrats are willing to sacrifice Black voting power to beat the GOP\"",
    "tinyUrl": "https://tinyurl.com/mpsjt3zk",
    "xPostUrl": "https://x.com/C3Heditor/status/2059373428587545023",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Covering Up Domestic Terror: Democrats Lie About The Trump Assassination Attempts",
    "tinyUrl": "https://tinyurl.com/324ny4u2",
    "xPostUrl": "https://x.com/C3Heditor/status/2059371846357729311",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Democrat California Congressional Candidate Turns Back On Flag, Refuses To Say Pledge Of Allegiance",
    "tinyUrl": "https://tinyurl.com/mr4xm6zr",
    "xPostUrl": "https://x.com/C3Heditor/status/2059370392829972528",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Cultural Marxism And Hatred Of Trump, Christians & White People: The Democrats' Platform In A Nutshell ",
    "tinyUrl": "https://tinyurl.com/32zypbda",
    "xPostUrl": "https://x.com/C3Heditor/status/2059369730406793420",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Radical Lefty Democrat Mayors Across America Have Become A Malignant And Dangerous Threat",
    "tinyUrl": "https://tinyurl.com/48f9zex9",
    "xPostUrl": "https://x.com/C3Heditor/status/2059365251473142006",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Democrat-Marxist Mayor Mamdani Freaks Out NYC Leaders With His Tax-The-Rich Rhetoric",
    "tinyUrl": "https://tinyurl.com/yv49ktan",
    "xPostUrl": "https://x.com/C3Heditor/status/2059364645521981694",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Same Democrat Who Cheered Seattle's Socialist Mayor Billionaire Attacks Now Alarmed By Mass Business Exodus",
    "tinyUrl": "https://tinyurl.com/3nvmat2j",
    "xPostUrl": "https://x.com/C3Heditor/status/2059363929520836697",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Another Round Of Starbucks Layoffs Hits Democrat-Controlled Seattle With 252 More Workers Let Go",
    "tinyUrl": "https://tinyurl.com/mu4h76jf",
    "xPostUrl": "https://x.com/C3Heditor/status/2059361427169718657",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Washington Manufacturer Flees Democrat-Run Blue State Over Surging Crime, Taxes, & Politics ",
    "tinyUrl": "https://tinyurl.com/zy6w5e95",
    "xPostUrl": "https://x.com/C3Heditor/status/2059360837324738683",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "ABC New's Host 'Whoopi' Tells Wildfire Victim & LA Mayoral Candidate To Stop Criticizing California Democrats For Their Terrible Failures",
    "tinyUrl": "https://tinyurl.com/52p2z6zp",
    "xPostUrl": "https://x.com/C3Heditor/status/2059359833933910336",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Texas Democrat Congressional Candidate Vows First Vote Will Be To Impeach Trump & Restore Biden's Open Border Policy",
    "tinyUrl": "https://tinyurl.com/4xrvc6n5",
    "xPostUrl": "https://x.com/C3Heditor/status/2059358941792911778",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Wisconsin Democrats Single-Handedly Kill The Bipartisan Tax Relief Deal - Dead On Arrival",
    "tinyUrl": "https://tinyurl.com/48ufmyw2",
    "xPostUrl": "https://x.com/C3Heditor/status/2059357536348733930",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "With Midterms Approaching, Google News Is Actively Pushing Propaganda For Democrats",
    "tinyUrl": "https://tinyurl.com/5b9t9ard",
    "xPostUrl": "https://x.com/C3Heditor/status/2059244552477687994",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Ohio Democrat Governor Candidate Poses As Moderate While Funneling Millions To Radical Leftist Groups",
    "tinyUrl": "https://tinyurl.com/3w8d7jyt",
    "xPostUrl": "https://x.com/C3Heditor/status/2059243906928148514",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Anti-Fraud Task Force Shuts Down $1.4 Billion Democrat Facilitated Multi-State Hospice Fraud Operation",
    "tinyUrl": "https://tinyurl.com/43hchjvb",
    "xPostUrl": "https://x.com/C3Heditor/status/2059243236871336449",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "California Rep. Admits Democrat Overregulation Is Blocking Housing Affordability For Americans",
    "tinyUrl": "https://tinyurl.com/3bsuwtrp",
    "xPostUrl": "https://x.com/C3Heditor/status/2059242120439882019",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Black Chicago Citizen Delivers Searing Rebuke Of Democrats Weaponizing Absurd Voting Rights Propaganda",
    "tinyUrl": "https://tinyurl.com/2v5r9mas",
    "xPostUrl": "https://x.com/C3Heditor/status/2059240650747289751",
    "page": 13,
    "batchDate": "May 26, 2026"
  },
  {
    "headline": "Now Democrats Want To Abolish The Virginia State Government Entirely After Losing In Court",
    "tinyUrl": "https://tinyurl.com/3jdj6d3x",
    "xPostUrl": "https://x.com/C3Heditor/status/2056476424626679964",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Democrat Partisan Judicial System Hates Law & Order: Out-of-Control Judges Lead To Out-of-Control Crime",
    "tinyUrl": "https://tinyurl.com/bdfd53rc",
    "xPostUrl": "https://x.com/C3Heditor/status/2056476173845045697",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "They're Actually Serious: Top Democrat Leaders Dismiss Islamic Terror On U.S. Soil As Nothing But A Conspiracy Theory",
    "tinyUrl": "https://tinyurl.com/4udkwhmx",
    "xPostUrl": "https://x.com/C3Heditor/status/2056475287995461979",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "It's Another Democrat Liar: Michigan's U.S. Senate Hopeful Abdul El-Sayed Claims He's A Physician But Has No Medical License",
    "tinyUrl": "https://tinyurl.com/msarz7nt",
    "xPostUrl": "https://x.com/C3Heditor/status/2056474697420657017",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "SCOTUS Kills Virginia's Wildly Illegitimate Gerrymander Redistricting Plan Causing Gov. Spanberger To Rage On 'X'",
    "tinyUrl": "https://tinyurl.com/59xmh38y",
    "xPostUrl": "https://x.com/C3Heditor/status/2056472510342869337",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Ambulance Chasing Trial Lawyer PACs Fund Democrats' Redistricting Power Grab With Millions In Dark Money",
    "tinyUrl": "https://tinyurl.com/ms8v6ca4",
    "xPostUrl": "https://x.com/C3Heditor/status/2056471328572551392",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Kamala Harris Lays Out The Simple Democrat Anti-Democracy Agenda: Pack The Courts, Add D.C. As A State & Kill The Electoral College",
    "tinyUrl": "https://tinyurl.com/4pukwd32",
    "xPostUrl": "https://x.com/C3Heditor/status/2056470525627494784",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Massachusett's Sen. Markey Promises Democrats Will Investigate Trump & His Family After Midterm Wins",
    "tinyUrl": "https://tinyurl.com/29f3eyjx",
    "xPostUrl": "https://x.com/C3Heditor/status/2056469820724384057",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Oregon Voters Not Happy Over Democrats' New Gas Tax Piled On Top of Rising Gas Prices",
    "tinyUrl": "https://tinyurl.com/4dy66a5f",
    "xPostUrl": "https://x.com/C3Heditor/status/2056469119449334017",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Panicked Democrats Plot Sweeping California Voting Rule Changes To Block All-GOP Governor Primary",
    "tinyUrl": "https://tinyurl.com/42bzzf7b",
    "xPostUrl": "https://x.com/C3Heditor/status/2056467080115900427",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "U.S. House Beg Sec of State Rubio To Treat Narco Criminals & Terrorists With More Kindness And Respect",
    "tinyUrl": "https://tinyurl.com/4t5yuz8f",
    "xPostUrl": "https://x.com/C3Heditor/status/2056461793439215807",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Climate Change Scam Quietly Fades Away As Americans Refuse To Buy The Democrat Lies Any Longer",
    "tinyUrl": "https://tinyurl.com/42yc5y5m",
    "xPostUrl": "https://x.com/C3Heditor/status/2056461222120439820",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Black Congressman In A White-Majority District Publicly Torches Democrat Party Over Their Absurd 'Jim Crow' Rhetoric",
    "tinyUrl": "https://tinyurl.com/2s3jyy7e",
    "xPostUrl": "https://x.com/C3Heditor/status/2056460326959567255",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "TMZ Founder: Admits Los Angeles Has Completely Fallen Apart Under The Democrats He Supported",
    "tinyUrl": "https://tinyurl.com/mrbsxe7h",
    "xPostUrl": "https://x.com/C3Heditor/status/2056459703824355458",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Even Liberal Media Is Waking Up To Democrats' Willingness To Shred The Rule Of Law",
    "tinyUrl": "https://tinyurl.com/hv4wwzvu",
    "xPostUrl": "https://x.com/C3Heditor/status/2056459126738391434",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Aiding Communist Dictators: Michigan's Democrat Rep. Jayapal Admits Helping Cuba Dodge The U.S. Oil Blockade",
    "tinyUrl": "https://tinyurl.com/rc5cj9tf",
    "xPostUrl": "https://x.com/C3Heditor/status/2056458637095338179",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "It's The Same 'Old' Strategy Playbook: Democrats Roll Out Their 'New' Strategy Of Blaming Trump For Everything",
    "tinyUrl": "https://tinyurl.com/4ny4tx3d",
    "xPostUrl": "https://x.com/C3Heditor/status/2056457437952274530",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Brooklyn Is Now Ground Zero For The AntiSemite Intifada Under New York City's Democrat Marxist Mayor Mamdani",
    "tinyUrl": "https://tinyurl.com/3ks9cvef",
    "xPostUrl": "https://x.com/C3Heditor/status/2056456725927211386",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Zilch Democrats Showed Up To The Critical COVID Investigation Hearing",
    "tinyUrl": "https://tinyurl.com/mwu6ebsx",
    "xPostUrl": "https://x.com/C3Heditor/status/2056456158085525946",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Evidence Surfaces: FDA Memo Proves The Democrat Biden Administration Covered Up Pediatric COVID Vaccine Deaths",
    "tinyUrl": "https://tinyurl.com/4nu5rf3y",
    "xPostUrl": "https://x.com/C3Heditor/status/2056454876066992150",
    "page": 14,
    "batchDate": "May 18, 2026"
  },
  {
    "headline": "Soros-Funded Virginia Democrat DA Under DOJ Investigation For Giving Illegal Aliens Special Treatment In Court",
    "tinyUrl": "https://tinyurl.com/3cmpefda",
    "xPostUrl": "https://x.com/C3Heditor/status/2053223060564558229",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Media Propaganda Outlets: Gee Whiz, It's Only A Nazi Tattoo, No Big Deal: Press Runs Cover For Maine's Democrat U.S. Senate Candidate Platner",
    "tinyUrl": "https://tinyurl.com/y29efu2k",
    "xPostUrl": "https://x.com/C3Heditor/status/2053222302783779148",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Democrat Urban Violence: Murders Up 300% In NYC Subway System, Robberies Surge: New York City Police Data",
    "tinyUrl": "https://tinyurl.com/yn3cyadu",
    "xPostUrl": "https://x.com/C3Heditor/status/2053221687676604451",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Caught Breaking The Law: DOJ Finds UCLA Med School Using Democrat-Approved Illegal Race-Based Admissions",
    "tinyUrl": "https://tinyurl.com/598xb52c",
    "xPostUrl": "https://x.com/C3Heditor/status/2053221021444891025",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Stunning 2020 Election Audit Finds That Over 12% Of Democrat Detroit's Mail-In Ballots Were Invalid",
    "tinyUrl": "https://tinyurl.com/yz58jfke",
    "xPostUrl": "https://x.com/C3Heditor/status/2053220368760947122",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Nearly 50% of Inmates North Carolina's Democrat Gov. Roy Cooper Freed Have Reoffended \u2014 18 Citizens Killed Since",
    "tinyUrl": "https://tinyurl.com/2jbvbarf",
    "xPostUrl": "https://x.com/C3Heditor/status/2053219280364138520",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Luke Skywalker No Longer: Democrat TDS Celebrity Mark Hamill Proves He Lost The 'Force' To A Political Death Cult",
    "tinyUrl": "https://tinyurl.com/byyft37f",
    "xPostUrl": "https://x.com/C3Heditor/status/2053218553571029153",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Court Victory For Trump: Federal Judge Throws Out Democrats' Illegitimate Lawsuit, ICE Has Green Light To Operate Near Schools",
    "tinyUrl": "https://tinyurl.com/3bwhnnt9",
    "xPostUrl": "https://x.com/C3Heditor/status/2053217361184890960",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Hollywood Democrat-Socialist Creatives Flip Orwell's Anti-Communist 'Animal Farm' 180 Degrees To An Anti-Capitalism Script",
    "tinyUrl": "https://tinyurl.com/3wu9cuzz",
    "xPostUrl": "https://x.com/C3Heditor/status/2053216691836829923",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Industry Warnings That California's Red Tape Under Democrat Gov. Newsom Could Send California Gas Prices Skyrocketing",
    "tinyUrl": "https://tinyurl.com/2sp3wfvv",
    "xPostUrl": "https://x.com/C3Heditor/status/2053214361695506515",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Justice Finally Arrives: Democrat-Protected, Illegal Alien Terrorist Behind Boulder, Colorado's Deadly Molotov Attack Going To Prison",
    "tinyUrl": "https://tinyurl.com/jkwtrce4",
    "xPostUrl": "https://x.com/C3Heditor/status/2053207972134662179",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Expulsion Calls Grow After Unhinged Democrat Rep. Justin Pearson Attacks Innocent Tennessee Troopers",
    "tinyUrl": "https://tinyurl.com/3evwp7y5",
    "xPostUrl": "https://x.com/C3Heditor/status/2053206767086059833",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "New Evidence Expands The Full Picture of Biden's and Democrats' War On Christians Was Far Worse Than Realized",
    "tinyUrl": "https://tinyurl.com/2x5chvrj",
    "xPostUrl": "https://x.com/C3Heditor/status/2053205721622167611",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "California Bigotry: CAIR Leader Tells Muslim-Democrats It's Fine To Hate Zionists Privately",
    "tinyUrl": "https://tinyurl.com/2c55a2tf",
    "xPostUrl": "https://x.com/C3Heditor/status/2053203297004048397",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Democrat-Marxist LA Mayor Karen Bass Torched $250,000 In Taxpayer Money Putting Up Anti-ICE Signs Across Los Angeles",
    "tinyUrl": "https://tinyurl.com/mshsbyvp",
    "xPostUrl": "https://x.com/C3Heditor/status/2053201221549265200",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "TDS Sufferer: Wisconsin Bar Owner Who Incentivized Violence by Offering Free Beer If Trump Died Is Now Running In Democrat Primary For Governor",
    "tinyUrl": "https://tinyurl.com/2s3rekyh",
    "xPostUrl": "https://x.com/C3Heditor/status/2053200479664980400",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Democrat-Marxist Mayor Mamdani Hands Out $500,000 For Black Reparations While Claiming NYC Faces A Financial Crisis",
    "tinyUrl": "https://tinyurl.com/2esvzxpp",
    "xPostUrl": "https://x.com/C3Heditor/status/2053199541055140010",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Federal Court Strikes Down Democrat Biden's Unlawful Discriminatory 'Digital Equity' Rules",
    "tinyUrl": "https://tinyurl.com/34py75wk",
    "xPostUrl": "https://x.com/C3Heditor/status/2053198951369629759",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Democrat Urban Violence: Brutal Random Assault On 77-yo Man by 2 Males In Seattle",
    "tinyUrl": "https://tinyurl.com/3r66b4r8",
    "xPostUrl": "https://x.com/C3Heditor/status/2053197174855344283",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Unhinged Democrat Hollywood Hate: Lunatic Celebrity Kathy Griffin Attacks Erika Kirk, Claims Charlie Was a \u2018Straight-Up Nazi\u2019",
    "tinyUrl": "https://tinyurl.com/57ctpthf",
    "xPostUrl": "https://x.com/C3Heditor/status/2053196588516798616",
    "page": 15,
    "batchDate": "May 09, 2026"
  },
  {
    "headline": "Proof That Democrats Hate Transparency: Washington Governor Eliminates Press Access Across State Agencies",
    "tinyUrl": "https://tinyurl.com/yh5vba52",
    "xPostUrl": "https://x.com/C3Heditor/status/2052861351979016616",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Democrat Mob Censorship: Free Speech Emergency That UCLA Is Desperately Trying To Hide",
    "tinyUrl": "https://tinyurl.com/47r9uphp",
    "xPostUrl": "https://x.com/C3Heditor/status/2052859413141029291",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Major Projection Alert: Democrat Obama, Conveniently Forgetting About His Wingman's DOJ, Accuses Trump of Using DOJ To Target Political Enemies",
    "tinyUrl": "https://tinyurl.com/bdh9k9w2",
    "xPostUrl": "https://x.com/C3Heditor/status/2052858650490765760",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Bombshell SPLC Indictment Reveals Partisan Activists Were Secretly Running The FBI Terror Program",
    "tinyUrl": "https://tinyurl.com/4z279zf2",
    "xPostUrl": "https://x.com/C3Heditor/status/2052855410466374100",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Antisemitism Is Quietly Sweeping Through Democrat California Under The Disguise Of 'Social Justice'",
    "tinyUrl": "https://tinyurl.com/mr43jk6w",
    "xPostUrl": "https://x.com/C3Heditor/status/2052854035628151035",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Far-Left Democrat Candidate For Los Angeles Mayor Provides Proof That Progressives Choose To Facilitate Violence",
    "tinyUrl": "https://tinyurl.com/4puknn34",
    "xPostUrl": "https://x.com/C3Heditor/status/2052853408156049639",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Texas U.S. Senate Candidate, James Talarico, Campaigned Against Ballot Initiative To Increase Police Staffing As Homicides Rose In Austin",
    "tinyUrl": "https://tinyurl.com/5xx89ac7",
    "xPostUrl": "https://x.com/C3Heditor/status/2052852481642598883",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Democrat-Controlled University Of Oregon's Woke Emergency Alerts Treat ICE Agents Exactly Like They're Active Shooters",
    "tinyUrl": "https://tinyurl.com/ycx9c4nu",
    "xPostUrl": "https://x.com/C3Heditor/status/2052851695692992824",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Budget Rollout Disaster: New York Leaders Embarrass Incompetent Democrat Governor Hochul",
    "tinyUrl": "https://tinyurl.com/ymvzfze5",
    "xPostUrl": "https://x.com/C3Heditor/status/2052850912104702232",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Minnesota Democrat Governor Walz Slammed As A Fraud Over Alleged $9 Billion In Taxpayer Theft",
    "tinyUrl": "https://tinyurl.com/5f5dce9t",
    "xPostUrl": "https://x.com/C3Heditor/status/2052849683198865889",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Activist Chaos At NYC ICE Protest As Police Arrest Nigerian Illegal Alien Who Weaponized His Vehicle Against Agents",
    "tinyUrl": "https://tinyurl.com/24a3s4r5",
    "xPostUrl": "https://x.com/C3Heditor/status/2052848966564221331",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Just another Day In Violent Democrat Urban Areas: 14-Year-Old Boy Shot While Sitting In A Parked Car In Targeted NYC Attack",
    "tinyUrl": "https://tinyurl.com/6numhm3f",
    "xPostUrl": "https://x.com/C3Heditor/status/2052847646801297452",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "File Under *Democrats Are Crazy*: Progressive Moms Cheer As Pregnant Woman Reveals Her Method For Trying To Make Her Son Gay",
    "tinyUrl": "https://tinyurl.com/ymvcz5ma",
    "xPostUrl": "https://x.com/C3Heditor/status/2052846768849584310",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Forget Reading And Math: Democrat-Run Schools Are Now Grading Kids On Their Personality And Emotions",
    "tinyUrl": "https://tinyurl.com/4trdt2ss",
    "xPostUrl": "https://x.com/C3Heditor/status/2052845627520815105",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Two School Chiefs Expose The 'Unacceptable' State of Democrat San Francisco's Education System",
    "tinyUrl": "https://tinyurl.com/4wzhkkf6",
    "xPostUrl": "https://x.com/C3Heditor/status/2052843208745324688",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Fairfax, Virginia Schools Bankroll Democrat Administrators' PhDs While Cutting Teacher Jobs",
    "tinyUrl": "https://tinyurl.com/93htk2sd",
    "xPostUrl": "https://x.com/C3Heditor/status/2052842747363471437",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Medicaid Fraud Strikes Again In Democrat Milwaukee As Another Woman Gets Caught & Busted",
    "tinyUrl": "https://tinyurl.com/7u6erd5c",
    "xPostUrl": "https://x.com/C3Heditor/status/2052842045085987074",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Democrat-Socialist Seattle Mayor Laughs Off Amazon & Starbuck's Wealth Exodus From The Big Taxes & Crime-Ridden City",
    "tinyUrl": "https://tinyurl.com/fh83uha7",
    "xPostUrl": "https://x.com/C3Heditor/status/2052841214001480170",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Financial Ruin Is Spreading Fast As Democrat Blue Cities Across America Spiral Into Fiscal Collapse",
    "tinyUrl": "https://tinyurl.com/2df7xwhp",
    "xPostUrl": "https://x.com/C3Heditor/status/2052838872090915186",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "NYC May Day Events Bankrolled By Pro-China Billionaire Who Supports Democrat-Marxist Mayor Mamdani's Big Tax & Spend A Lot Govt",
    "tinyUrl": "https://tinyurl.com/mrxe4beu",
    "xPostUrl": "https://x.com/C3Heditor/status/2052837486515089817",
    "page": 16,
    "batchDate": "May 08, 2026"
  },
  {
    "headline": "Spirit Airlines Didn't Fall Off A Financial Cliff, It Was Pushed by Democrats",
    "tinyUrl": "https://tinyurl.com/3hcd7d8s",
    "xPostUrl": "https://x.com/C3Heditor/status/2052041629884731821",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "People Are Starting To Realize That Democrats Are An Immediate & Serious Threat To The Nation",
    "tinyUrl": "https://tinyurl.com/yu56zbc3",
    "xPostUrl": "https://x.com/C3Heditor/status/2052038802869195028",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Decade In Review: The Democrat-Left's Long & Violent Legacy of Political Attacks On The Right",
    "tinyUrl": "https://tinyurl.com/fy5avruj",
    "xPostUrl": "https://x.com/C3Heditor/status/2052012602356592794",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "New York Times Explains Democrat Activism: It Makes The Case From Micro-Looting To Murder - Self Documents Dems' Stunning Moral Collapse",
    "tinyUrl": "https://tinyurl.com/mt755dcr",
    "xPostUrl": "https://x.com/C3Heditor/status/2052010337273016700",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Charlottesville's Real Story: How Lefty Journalists & SPLC Built And Exploited A False 'White Supremacist' Narrative Used By Democrats",
    "tinyUrl": "https://tinyurl.com/h3wynuay",
    "xPostUrl": "https://x.com/C3Heditor/status/2052011180839878791",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Democrat Blue States Are In Big Trouble Due To Feds Medicaid Fraud Audits",
    "tinyUrl": "https://tinyurl.com/5vwbkpsk",
    "xPostUrl": "https://x.com/C3Heditor/status/2052043160973430915",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Democrats' Weaponized IRS To Target Conservative Pastors While Letting Liberals Slide, DOJ Finds",
    "tinyUrl": "https://tinyurl.com/3byhbpwc",
    "xPostUrl": "https://x.com/C3Heditor/status/2052041022964719795",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "ABC's 'The View' Is Criticized By Its Fans As Being Hypocrites On Political Violence After WHCD Assassination Attempt",
    "tinyUrl": "https://tinyurl.com/yc5cx9cw",
    "xPostUrl": "https://x.com/C3Heditor/status/2052040184200335453",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "911 Emergency Call System Is Close To Collapse Due To Incompetent Govt In Democrat Los Angeles",
    "tinyUrl": "https://tinyurl.com/mrd67w22",
    "xPostUrl": "https://x.com/C3Heditor/status/2052013613653627199",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Wildfire Warning Ignored By LA Democrat Mayor Bass As She Was Alerted Before Her Virtue-Signaling Africa Trip",
    "tinyUrl": "https://tinyurl.com/3n3257mx",
    "xPostUrl": "https://x.com/C3Heditor/status/2052012043511693538",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Pressed About Her Suspicious Financial History, House Democrat Ilhan Omar Seethes & Deflects",
    "tinyUrl": "https://tinyurl.com/2y79v6xk",
    "xPostUrl": "https://x.com/C3Heditor/status/2051784564142477616",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Prominent House Democrat Faces Serious Factual Ethical & Corruption Accusations",
    "tinyUrl": "https://tinyurl.com/ynchutvp",
    "xPostUrl": "https://x.com/C3Heditor/status/2051783923571593419",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "How One Democrat Weaponized DEI And The Bureaucracy To Seize Power & Commit Fraud",
    "tinyUrl": "https://tinyurl.com/bdf5udmv",
    "xPostUrl": "https://x.com/C3Heditor/status/2051782830330396936",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Feds Drops A Bombshell Exposing About The Huge SNAP Fraud That Democrats Aggressively Ignore",
    "tinyUrl": "https://tinyurl.com/yxzbvsm5",
    "xPostUrl": "https://x.com/C3Heditor/status/2051781765757284535",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Left-Wing Bias Isn't Just Apple News \u2014 It's Rampant On Most Major Democrat Propaganda Tech Sites",
    "tinyUrl": "https://tinyurl.com/yzjku6xm",
    "xPostUrl": "https://x.com/C3Heditor/status/2051780743181803739",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Hollywood Democrat Celebrities Prove Again They're Stuck-On-TDS: Claims Trump Staged His Own WHCDAssassination Attempt",
    "tinyUrl": "https://tinyurl.com/53ph6yf5",
    "xPostUrl": "https://x.com/C3Heditor/status/2051779883240464693",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Rich Author Brags About Shoplifting From Whole Foods \u2014 And Reveals Typical Hypocrisy",
    "tinyUrl": "https://tinyurl.com/48h8kk9n",
    "xPostUrl": "https://x.com/C3Heditor/status/2051778784148271129",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Left-Wing Political Violence Has Consumed The Activist Base \u2014 And It Must Now Be Destroyed",
    "tinyUrl": "https://tinyurl.com/2s3bk88r",
    "xPostUrl": "https://x.com/C3Heditor/status/2051777293597413441",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Demanding Trump Lower The Temperature, Muslim Activist Begs For Trump To Die In Foul Rant",
    "tinyUrl": "https://tinyurl.com/muzbpehh",
    "xPostUrl": "https://x.com/C3Heditor/status/2051776070014091282",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Begging NY State For A Budget Bailout, Democrat Mayor Mamdani Feels The Cold Grip of Collectivism Squeezing",
    "tinyUrl": "https://tinyurl.com/3jhsmw5m",
    "xPostUrl": "https://x.com/C3Heditor/status/2051775314179633200",
    "page": 17,
    "batchDate": "May 06, 2026"
  },
  {
    "headline": "Caught On Camera: A Not-So-Bright Democrat Senate Candidate Bashes Her Own State In Leaked Remarks",
    "tinyUrl": "https://tinyurl.com/ymbyhjeu",
    "xPostUrl": "https://x.com/C3Heditor/status/2051062982558241039",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "In Democrat NYC Deli Worker Murdered Outside His Store -- Had Warned About Rising Violence A Year Prior",
    "tinyUrl": "https://tinyurl.com/sf9he4zd",
    "xPostUrl": "https://x.com/C3Heditor/status/2051062382701563947",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Pennsylvania Democrat Running For U.S. Senate Arrested For Threatening Trump",
    "tinyUrl": "https://tinyurl.com/8zxcmec5",
    "xPostUrl": "https://x.com/C3Heditor/status/2051059729628086624",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Exposing Democrat SPLC Fraud And Money Laundering: Charges May Be Just The Tip Of The Iceberg, Analysts Warn",
    "tinyUrl": "https://tinyurl.com/uwt7cm76",
    "xPostUrl": "https://x.com/C3Heditor/status/2051059192295727310",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Democrat Stacey Abrams Rushes To Defend The Disgraced KKK Funders, The Southern Poverty Law Center",
    "tinyUrl": "https://tinyurl.com/4dh6v3xr",
    "xPostUrl": "https://x.com/C3Heditor/status/2051058624659640530",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Host Stunned: Can't Believe Joy Reid Makes Absurd Claim That Democrats Never Play Politics",
    "tinyUrl": "https://tinyurl.com/etv898cb",
    "xPostUrl": "https://x.com/C3Heditor/status/2051057877989617847",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Man-Burner Suspect With Over 100 Arrests Represents Repeat Crime Problem in America's Democrat Urban Areas",
    "tinyUrl": "https://tinyurl.com/yc7dh7p9",
    "xPostUrl": "https://x.com/C3Heditor/status/2051056520079527948",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Birthright Citizenship Debate Shines Light On The Vast Chinese Birth Tourism Industry Protected By Democrats",
    "tinyUrl": "https://tinyurl.com/3wda6sby",
    "xPostUrl": "https://x.com/C3Heditor/status/2051055790459392204",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Because SCOTUS Disagrees With Skin-Color Favoritism, Democrat House Minority Leader Hakeem Jeffries Calls Them Illegitimate",
    "tinyUrl": "https://tinyurl.com/3pevrjfk",
    "xPostUrl": "https://x.com/C3Heditor/status/2051055136336711808",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "CNN Pollster Finds That Democrats' Hate-Trump & Hate-America Rhetoric Is Is Not Playing Well With Black Voters",
    "tinyUrl": "https://tinyurl.com/44vju2ny",
    "xPostUrl": "https://x.com/C3Heditor/status/2051052621054558230",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Gov. Gavin Newsom's Broken 911 System Is A Half-Billion-Dollar Democrat Joke Paid For By Taxpayers",
    "tinyUrl": "https://tinyurl.com/2zbdr9ve",
    "xPostUrl": "https://x.com/C3Heditor/status/2051050551362629708",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Minnesota Fraud: FBI & Homeland Security Raid 'Quality Learing Center' And 20 Other Democrat Favored Somali Businesses",
    "tinyUrl": "https://tinyurl.com/3bt4jdkh",
    "xPostUrl": "https://x.com/C3Heditor/status/2051049922229629253",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Kimmel & His Ilk Keep Dehumanizing Conservatives \u2014 Yet The Left Wonders Why Violence Grows",
    "tinyUrl": "https://tinyurl.com/4n2hzdpx",
    "xPostUrl": "https://x.com/C3Heditor/status/2051047021855866996",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Political Violence Is Being Fanned By The Same Democrat Propaganda Media That Helped Kill Charlie Kirk",
    "tinyUrl": "https://tinyurl.com/7dbwsemw",
    "xPostUrl": "https://x.com/C3Heditor/status/2051045040672125153",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Democrat Oregon Releases Newlyweds' Illegal Alien Killer Who Was Recklessly Driving With A CDL License",
    "tinyUrl": "https://tinyurl.com/22zhh4kj",
    "xPostUrl": "https://x.com/C3Heditor/status/2051044256136024499",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Legacy FakeNews Media Pivots To False Narrative After WHCD Shooter's Democrat Identity Surfaces",
    "tinyUrl": "https://tinyurl.com/28az8rfc",
    "xPostUrl": "https://x.com/C3Heditor/status/2051042131045761123",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Dead Voters Could Represent A Sizable Voting Bloc For Democrats In This Key Battleground State",
    "tinyUrl": "https://tinyurl.com/yxmk68nr",
    "xPostUrl": "https://x.com/C3Heditor/status/2051040599113883719",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Family Trio of Activists Indicted For Viciously Assaulting Conservative Journalist",
    "tinyUrl": "https://tinyurl.com/yc6uh24m",
    "xPostUrl": "https://x.com/C3Heditor/status/2051039167656718480",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "In Democrat Controlled Chicago, Judge Freed Robbery Suspect On Condition of Wearing Ankle Monitor \u2014 He Then Murdered A City Cop",
    "tinyUrl": "https://tinyurl.com/3tamdh4f",
    "xPostUrl": "https://x.com/C3Heditor/status/2051038080937635908",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "EPA Chief Shrieked At By Purple-Haired Democrat Rep Who Told Him To Drink Weed Killer At A House Hearing",
    "tinyUrl": "https://tinyurl.com/yc2fjsdk",
    "xPostUrl": "https://x.com/C3Heditor/status/2051036887301661122",
    "page": 18,
    "batchDate": "May 03, 2026"
  },
  {
    "headline": "Disney's Loony Partisan-Democrat Host States That Dogs & Guns Still Being Used Against Black Voters At The Polls",
    "tinyUrl": "https://tinyurl.com/mumm83fd",
    "xPostUrl": "https://x.com/C3Heditor/status/2050619813668528481",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "After Declaring Michigan Her Permanent Home, Democrat Politician Still Voted In California",
    "tinyUrl": "https://tinyurl.com/ax5nyt2e",
    "xPostUrl": "https://x.com/C3Heditor/status/2050617595817029911",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Enough Already: Democrats Must Stop Stoking Violent Rhetoric Before Someone Gets Killed",
    "tinyUrl": "https://tinyurl.com/2hfnx4d3",
    "xPostUrl": "https://x.com/C3Heditor/status/2050616616379957265",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Even Former Democrat, Lefty Rep. Barney Frank, Admits His Own Party's Agenda Has Gone 'Beyond Politically Acceptable'",
    "tinyUrl": "https://tinyurl.com/5xcae7uz",
    "xPostUrl": "https://x.com/C3Heditor/status/2050615879713403115",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Lunatic Democrat Thinks Sec. of War Hegseth Committed War Crimes, Threatens Execution",
    "tinyUrl": "https://tinyurl.com/muca8js",
    "xPostUrl": "https://x.com/C3Heditor/status/2050614753035239921",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "House Democrat Minority Leader Becomes Unhinged: Calls For Maximum Warfare Against The GOP",
    "tinyUrl": "https://tinyurl.com/5bsyxtbk",
    "xPostUrl": "https://x.com/C3Heditor/status/2050548351406404093",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "The Democrats' Wacky, Nazi-Tattooed Maine Senate Hopeful Calls For Shutting Down The Trump Administration",
    "tinyUrl": "https://tinyurl.com/2rsyth9n",
    "xPostUrl": "https://x.com/C3Heditor/status/2050547157007307185",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "A Constitutional SCOTUS Voting-Rights Ruling Sends Democrats Into Anti-Democracy Spasm Demanding Term Limits & Impeachment",
    "tinyUrl": "https://tinyurl.com/9w8ucpk5",
    "xPostUrl": "https://x.com/C3Heditor/status/2050542156272808168",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Exposed: Planned Parenthood Used Secret Codeword 'Benghazi' To Hide Millions In Democrat Administration's PPP Loans",
    "tinyUrl": "https://tinyurl.com/txa2rkrj",
    "xPostUrl": "https://x.com/C3Heditor/status/2050539613706699082",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Religious Leader In NYC Allegedly Sexually Abused Ten-Year-Old Girls Inside His Mosque, Democrats Look The Other Way",
    "tinyUrl": "https://tinyurl.com/2rzzm49b",
    "xPostUrl": "https://x.com/C3Heditor/status/2050532990791590108",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "The View's Mouthpiece, Sonny Hostin, Claims Her Kids Somehow Lost Their Civil Rights After SCOTUS Ended Race-Based Districts - Her Family Lives In A Majority White Democrat District",
    "tinyUrl": "https://tinyurl.com/2admsu46",
    "xPostUrl": "https://x.com/C3Heditor/status/2050336878390321647",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "5 Shocking Examples Of Biden Democrat DOJ's Anti-Christian Bias Exposed In Damning New Report",
    "tinyUrl": "https://tinyurl.com/3dckvumu",
    "xPostUrl": "https://x.com/C3Heditor/status/2050335271195951436",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Minnesota Fraud Hearing Moves Forward Without The Major Fraud Facilitator, The Democrat Governor, Who Refuses To Appear",
    "tinyUrl": "https://tinyurl.com/2983mxy2",
    "xPostUrl": "https://x.com/C3Heditor/status/2050334383375065556",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Democrat-Appointed Judge Frees Interpol-Wanted Illegal Migrant Charged With Murder",
    "tinyUrl": "https://tinyurl.com/bdfcvyu3",
    "xPostUrl": "https://x.com/C3Heditor/status/2050333513493156115",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Another Delusional Democrat Example: Defeated Jasmine Crockett Declares Herself Among The 535 Most Powerful People In America",
    "tinyUrl": "https://tinyurl.com/2s3njhdk",
    "xPostUrl": "https://x.com/C3Heditor/status/2050331882106065256",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Places To Avoid In 2026: Flea-Borne Typhus Surges To Record Levels Across Democrat-Run Los Angeles",
    "tinyUrl": "https://tinyurl.com/ms6r7uwa",
    "xPostUrl": "https://x.com/C3Heditor/status/2050330222835237281",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Wisconsin's Election Ballot System Has Been Breached \u2014 And The Whistleblower Was Punished For It By Democrats",
    "tinyUrl": "https://tinyurl.com/4f833b6h",
    "xPostUrl": "https://x.com/C3Heditor/status/2050328922294788258",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "After Pushing Virtue-Signaling 'No Kings' Rhetoric, Democrats Get Mocked For Exuberantly Applauding UK's King Charles",
    "tinyUrl": "https://tinyurl.com/mr3emv32",
    "xPostUrl": "https://x.com/C3Heditor/status/2050327779292446776",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Anti-Crime Signs Removed By Woke Democrat City Council Members Who Call Them 'Racist'",
    "tinyUrl": "https://tinyurl.com/mrykxbye",
    "xPostUrl": "https://x.com/C3Heditor/status/2050326743299260606",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Leaked Emails Expose How Democrats Quietly Plotted To Target & Harass Pro-Trump Nuns",
    "tinyUrl": "https://tinyurl.com/4mpchpxr",
    "xPostUrl": "https://x.com/C3Heditor/status/2050311138340958521",
    "page": 19,
    "batchDate": "May 02, 2026"
  },
  {
    "headline": "Mainstreaming Democrats' Violent Rhetoric Against a President, From One Assassination Attempt to the Next",
    "tinyUrl": "https://tinyurl.com/5bfbzce7",
    "xPostUrl": "https://x.com/C3Heditor/status/2048866523692081583",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Attempt To Incite Violence By The Democrat Deranged: America Under Trump Compared To Nazi-Occupied France By Major Publication",
    "tinyUrl": "https://tinyurl.com/3hvyww2w",
    "xPostUrl": "https://x.com/C3Heditor/status/2048865622923374863",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Declares Democrats' Anti-Conservative SPLC Directly Responsible For The Charlie Kirk Assassination Plot",
    "tinyUrl": "https://tinyurl.com/47afw97z",
    "xPostUrl": "https://x.com/C3Heditor/status/2048862126463479875",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Anti-ICE Rioters Walk Free Despite Violence Against Police, Prompting Furious Cops To Turn On Vermont Lefty Democrat DA",
    "tinyUrl": "https://tinyurl.com/ts8p78tm",
    "xPostUrl": "https://x.com/C3Heditor/status/2048861045758861651",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Lured Into A Trap, Missouri Teen Gunned Down By A Democrats' Open-Border Illegal Gang Member",
    "tinyUrl": "https://tinyurl.com/4w4rcjm4",
    "xPostUrl": "https://x.com/C3Heditor/status/2048859675714617783",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Democrat Unaffordability: Soaring Costs Drive Californians Away, Leaving Schools Facing A Bleak Future",
    "tinyUrl": "https://tinyurl.com/48tcwaac",
    "xPostUrl": "https://x.com/C3Heditor/status/2048858599879774268",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Evil Naturally Infuses The Left: Democrat-Owner of Wisconsin Beer Company Complains About Failure of Trump Assassination",
    "tinyUrl": "https://tinyurl.com/3f9jev85",
    "xPostUrl": "https://x.com/C3Heditor/status/2048857906787873188",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Democrat Approval Ratings Hit Rock Bottom As 2026 Midterm Discontent Surges",
    "tinyUrl": "https://tinyurl.com/5cr6ca88",
    "xPostUrl": "https://x.com/C3Heditor/status/2048857040773160971",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Border Agents Arrest An Illegal Somali Pirate Who Gained Entry Into U.S. During Democrat Open Borders",
    "tinyUrl": "https://tinyurl.com/u9yfh2a8",
    "xPostUrl": "https://x.com/C3Heditor/status/2048856363187515409",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Cheering Pro-Iran Propaganda, Democrat Sen. Murphy Calls Anti-U.S. Fake News 'Awesome'",
    "tinyUrl": "https://tinyurl.com/4y823sdx",
    "xPostUrl": "https://x.com/C3Heditor/status/2048849433635508536",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Rallying His Violent Shock-Troops, Democrat Senator Incites 'Foot Soldiers' To Fight Against 'Darkness'",
    "tinyUrl": "https://tinyurl.com/3x4mkm5y",
    "xPostUrl": "https://x.com/C3Heditor/status/2048848099314167865",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "During House Probe, Democrats' ActBlue Employees Pleaded The Fifth An Astonishing 146 Times",
    "tinyUrl": "https://tinyurl.com/228x8dc5",
    "xPostUrl": "https://x.com/C3Heditor/status/2048846730624750037",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Criminal Investigation Launched Against The Democrats' SPLC Over Its Paid KKK Activist Program To Incite Violence",
    "tinyUrl": "https://tinyurl.com/2z9cbz4b",
    "xPostUrl": "https://x.com/C3Heditor/status/2048845826831630835",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Top House Democrat Slips Up, Provides Insight On His Party's' Plan To Weaponize Government",
    "tinyUrl": "https://tinyurl.com/ye4szf24",
    "xPostUrl": "https://x.com/C3Heditor/status/2048845113011458109",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "LA School District Staffer Accused Of $22M Kickback As California's Democrat Fraud Scandal Expands",
    "tinyUrl": "https://tinyurl.com/cv5nky92",
    "xPostUrl": "https://x.com/C3Heditor/status/2048843662432383017",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "More Democrat Pedophilia: Charged With Soliciting A Minor, DC's First Openly Gay Police Union Chief Is Arrested",
    "tinyUrl": "https://tinyurl.com/bdcrxuh8",
    "xPostUrl": "https://x.com/C3Heditor/status/2048842666981622245",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Federal Appeals Court Blocks California Democrats' Ludicrous Anti-ICE Law",
    "tinyUrl": "https://tinyurl.com/3wurzd4c",
    "xPostUrl": "https://x.com/C3Heditor/status/2048839221721608645",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "NYC Tenants Suffer In Squalor While Democrat Mayor Mamdani Funnels $2.5 Billion Into EV Chargers",
    "tinyUrl": "https://tinyurl.com/4b3daa9y",
    "xPostUrl": "https://x.com/C3Heditor/status/2048838040454639786",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Major Democrat Mega-Donor Abandons The Party Entirely In Wake Of The Swalwell Scandal",
    "tinyUrl": "https://tinyurl.com/2vnc8hus",
    "xPostUrl": "https://x.com/C3Heditor/status/2048836267375571327",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Democrat Actress Mia Farrow Goes Full MTG, Suggests Trump May Have Staged WHCD Shooting",
    "tinyUrl": "https://tinyurl.com/mr2zuech",
    "xPostUrl": "https://x.com/C3Heditor/status/2048834862648528897",
    "page": 20,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "SPLC's $520K-A-Year CEO Turned A Civil Rights Group Into A Democrat-Partisan Smear Machine",
    "tinyUrl": "https://tinyurl.com/3jzw4whp",
    "xPostUrl": "https://x.com/C3Heditor/status/2048742770995826991",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Racial Division For Profit: The Democrat Left's Blueprint To Manufacture & Monetize Racism To Scam Donors",
    "tinyUrl": "https://tinyurl.com/4vsy7utu",
    "xPostUrl": "https://x.com/C3Heditor/status/2048741953043562773",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "New Flag Law Compels Boise's Woke Democrat Mayor To Take Down The LGBT Banner From City Hall",
    "tinyUrl": "https://tinyurl.com/5yrrt4w4",
    "xPostUrl": "https://x.com/C3Heditor/status/2048740595095781557",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Global Marxist-Leftists Welcome & Embrace Prominent Democrats In Barcelona",
    "tinyUrl": "https://tinyurl.com/yud825zd",
    "xPostUrl": "https://x.com/C3Heditor/status/2048740021780480028",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Fleeing The Democrats' Unaffordable California: Which State Is Reaping The Biggest Rewards From The Exodus?",
    "tinyUrl": "https://tinyurl.com/3mpwwy6a",
    "xPostUrl": "https://x.com/C3Heditor/status/2048737828398608692",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Arizona's Top Lawmaker Refers Democrat AG & Secretary Of State To DOJ For Election Witness Tampering",
    "tinyUrl": "https://tinyurl.com/548skdpm",
    "xPostUrl": "https://x.com/C3Heditor/status/2048736964988547150",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "A Democrat Open Border Illegal Immigrant Pleads Guilty To Raping 12-Year-Old Relative",
    "tinyUrl": "https://tinyurl.com/34kkct97",
    "xPostUrl": "https://x.com/C3Heditor/status/2048736085711487104",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Minnesota Democrats Close Ranks To Protect Fraud-Facilitator Gov. Walz From Impeachment, Sparking Outrage",
    "tinyUrl": "https://tinyurl.com/ycy5djpf",
    "xPostUrl": "https://x.com/C3Heditor/status/2048735447061524633",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Democrat- Woke DEI Legacy: Massive Disney Layoffs Begin As Entire Teams And Full Divisions Are Officially Eliminated",
    "tinyUrl": "https://tinyurl.com/5e7ub2e8",
    "xPostUrl": "https://x.com/C3Heditor/status/2048734816959635803",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Biden's Democrat Administration Allowed Violent Alien To Be Naturalized Who Then Killed A DHS Employee",
    "tinyUrl": "https://tinyurl.com/kjwu835t",
    "xPostUrl": "https://x.com/C3Heditor/status/2048734113969172808",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "China-Linked Group's Anti-U.S. Meeting In Colombia Has Support of NYC's Former Democrat Mayor",
    "tinyUrl": "https://tinyurl.com/5dwj7jh6",
    "xPostUrl": "https://x.com/C3Heditor/status/2048732997269295244",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Even After Rape Claims, Democrat Swalwell Kept Raking In Cash While Grabbing Control of $4Mil",
    "tinyUrl": "https://tinyurl.com/2wf45zns",
    "xPostUrl": "https://x.com/C3Heditor/status/2048728260792689062",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "It's A Twofer: Democrat Open Borders & Open Voting - Career Criminal Who Voted In 2020 & 2024 Turns Out To Be An Illegal Alien",
    "tinyUrl": "https://tinyurl.com/yc4m8nhv",
    "xPostUrl": "https://x.com/C3Heditor/status/2048726794212352324",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "New York's 2026 Candidates Call To Abolish ICE In Debate",
    "tinyUrl": "https://tinyurl.com/bw62bkzs",
    "xPostUrl": "https://x.com/C3Heditor/status/2048725832001261898",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Iranian National Busted By DOJ For Smuggling Illegal Iranian Aliens Into U.S. During Democrats' Open Border",
    "tinyUrl": "https://tinyurl.com/u2kb4js4",
    "xPostUrl": "https://x.com/C3Heditor/status/2048722904586871282",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Globalism, Not Christianity, Is Where The Democrat-Activist Pope's True Loyalty Actually Lies",
    "tinyUrl": "https://tinyurl.com/37eypt7k",
    "xPostUrl": "https://x.com/C3Heditor/status/2048722215500411295",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Behind Closed Doors, Hollywood's Former Swalell Elite Donors Turn Their Attention To His Democrat Dollar-Grubbing Colleagues",
    "tinyUrl": "https://tinyurl.com/y8z9kr93",
    "xPostUrl": "https://x.com/C3Heditor/status/2048721530117619916",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "While On SPLC Board, Democrat Governor Candidate Watched It Fund A KKK Member",
    "tinyUrl": "https://tinyurl.com/yc3md6hf",
    "xPostUrl": "https://x.com/C3Heditor/status/2048522402519236747",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Democrat Hell: \"He's The Victim\" - NYC Thug's Mother Defends Son Who Body-Slammed & Stomped A Small Hispanic Girl's Head",
    "tinyUrl": "https://tinyurl.com/34tx434b",
    "xPostUrl": "https://x.com/C3Heditor/status/2048521440874447248",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Democrat Blue-State Exodus Explained: Maryland Prosecutor Reveals The Real Driving Forces",
    "tinyUrl": "https://tinyurl.com/269mk9xd",
    "xPostUrl": "https://x.com/C3Heditor/status/2048520191252770976",
    "page": 21,
    "batchDate": "Apr 27, 2026"
  },
  {
    "headline": "Michigan's Top Democrat Senate Contender Accused Of Hiding $500K In Campaign Spending",
    "tinyUrl": "https://tinyurl.com/mtnm383v",
    "xPostUrl": "https://x.com/C3Heditor/status/2048509736698462533",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Democrats Hand Hollywood Film Studios Over $100 Million In California Taxpayer Subsidies",
    "tinyUrl": "https://tinyurl.com/mssxkdex",
    "xPostUrl": "https://x.com/C3Heditor/status/2048509088519045606",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Making California Unaffordble: Skyrocketing Costs Due To Democrat Policies Are Pushing Families Out Of The State",
    "tinyUrl": "https://tinyurl.com/mwte7jx6",
    "xPostUrl": "https://x.com/C3Heditor/status/2048508324665086226",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Switching To GOP, NC Democrat Strikes Back At Dem Governor Over His Pro-Illegal Aliens Stance",
    "tinyUrl": "https://tinyurl.com/3hprtn6h",
    "xPostUrl": "https://x.com/C3Heditor/status/2048507552069988591",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "KKK Funding Scandal Ignored: 250 Major Companies Still Rely On The Democrat Smear Agent, SPLC, To Vet Donations",
    "tinyUrl": "https://tinyurl.com/tmmhc4w",
    "xPostUrl": "https://x.com/C3Heditor/status/2048506766330085789",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Self-Described 'Mexican Lesbian' Democrat House Candidate Accused Of Unwanted Sexual Advances",
    "tinyUrl": "https://tinyurl.com/2wp5w8mu",
    "xPostUrl": "https://x.com/C3Heditor/status/2048503281295499347",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Somali Restaurant Posing As Clinic Exposed As Democrat Ilhan Omar's Alleged $1.4M Funnel For Federal Funds",
    "tinyUrl": "https://tinyurl.com/48t2d5nn",
    "xPostUrl": "https://x.com/C3Heditor/status/2048502449321718067",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Delusional Democrat Does Crazy: Trump Is Going To Seize Media Control Away From Dems",
    "tinyUrl": "https://tinyurl.com/y7cj6jps",
    "xPostUrl": "https://x.com/C3Heditor/status/2048447824560336977",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Anti-White Discrimination Lawsuit Finally Costs The DEI-Democrat Cincinnati Police Chief Her Job",
    "tinyUrl": "https://tinyurl.com/33w4hjmb",
    "xPostUrl": "https://x.com/C3Heditor/status/2048447128427429964",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Maine Democrat Senate Hopeful Wants The U.S. To Cooperate On Climate Policy With World's Worst Polluter",
    "tinyUrl": "https://tinyurl.com/4czwbepu",
    "xPostUrl": "https://x.com/C3Heditor/status/2048446384462831941",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Democrat Senator Blasted As 'Lying Scumbag' After Trashing Border Patrol & ICE On Senate Floor",
    "tinyUrl": "https://tinyurl.com/bdz64zsb",
    "xPostUrl": "https://x.com/C3Heditor/status/2048445137756320026",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Democrat Swalwell Hires Private Eye To Go After Ex-Aides As Accuser Works With Manhattan D.A.",
    "tinyUrl": "https://tinyurl.com/57pmwkst",
    "xPostUrl": "https://x.com/C3Heditor/status/2048444264191820164",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Long History Of Targeting Christians Haunts Partisan-Democrat SPLCS Amid New Hate Group Funding Accusations",
    "tinyUrl": "https://tinyurl.com/mry69ukt",
    "xPostUrl": "https://x.com/C3Heditor/status/2048442373311504710",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Trust In The Legacy News Media Pushing Democrat Propaganda Has Collapsed \u2014 More Than Half See It As Totally Worthless",
    "tinyUrl": "https://tinyurl.com/4he6jzbm",
    "xPostUrl": "https://x.com/C3Heditor/status/2048441493422010704",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Refinery Shutdowns Following Democrats' Strict Anti-Fossil Fuel Rules Put California On The Brink Of Gas Shortages",
    "tinyUrl": "https://tinyurl.com/2s44bufe",
    "xPostUrl": "https://x.com/C3Heditor/status/2048439157618552893",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Dark Money From Soros-Linked Groups Seals Virginia's Unfair Democrat Gerrymander Map Drawings",
    "tinyUrl": "https://tinyurl.com/5n8u3tne",
    "xPostUrl": "https://x.com/C3Heditor/status/2048437472263057880",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "An Immediate And Serious Threat To The Nation \u2014 That Is What Democrats Have Become",
    "tinyUrl": "https://tinyurl.com/nhzz8dp9",
    "xPostUrl": "https://x.com/C3Heditor/status/2048355310847348798",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Democrat Extremist Journalists: 250+ Demand Protest Against Trump at White House Correspondents\u2019 Dinner",
    "tinyUrl": "https://tinyurl.com/44sve2ej",
    "xPostUrl": "https://x.com/C3Heditor/status/2048351956335231006",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Playing The Race Card Again: California's Democrat Governor Candidates Cry Racism",
    "tinyUrl": "https://tinyurl.com/3ya63r6j",
    "xPostUrl": "https://x.com/C3Heditor/status/2048346687190528504",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Incompetent Governance: Democrat State Unable To Account For $1.3 Billion In Childcare Funds",
    "tinyUrl": "https://tinyurl.com/yc7v4pbj",
    "xPostUrl": "https://x.com/C3Heditor/status/2048342550843474099",
    "page": 22,
    "batchDate": "Apr 26, 2026"
  },
  {
    "headline": "Democrat Senator's Treasonous Overseas Attack: Calls Trump 'Biggest Threat to Democracy Since Civil War' as Backlash Explodes",
    "tinyUrl": "https://tinyurl.com/mryru9am",
    "xPostUrl": "https://x.com/C3Heditor/status/2046710667684495827",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Scandal-Plagued And Sinking Fast, Arizona Democrat Ruben Gallego's Senate Career Looks Finished",
    "tinyUrl": "https://tinyurl.com/3y8syfh4",
    "xPostUrl": "https://x.com/C3Heditor/status/2046710002300158163",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "California Democrats Now Offer Free Breast Implants To Homeless Transgender Illegals",
    "tinyUrl": "https://tinyurl.com/yskeuvyb",
    "xPostUrl": "https://x.com/C3Heditor/status/2046709276471611576",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Democrat Sen. Warren Endorses Nazi-Tattooed, Hamas-Praising Maine Senate Candidate, Claiming He Shares Her Values",
    "tinyUrl": "https://tinyurl.com/3zdh93da",
    "xPostUrl": "https://x.com/C3Heditor/status/2046707582916612459",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Compared To Today, No Democrat Would Have Embraced Hasan Piker A Generation Ago, Says Former Party Strategist",
    "tinyUrl": "https://tinyurl.com/ywxbnyb8",
    "xPostUrl": "https://x.com/C3Heditor/status/2046706849748074888",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Hasan Piker Called For Sen. Rick Scott's Death \u2014 And Scott Reminds All: \"This Is The Democrat Party\"",
    "tinyUrl": "https://tinyurl.com/39j7wep5",
    "xPostUrl": "https://x.com/C3Heditor/status/2046704532298637788",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Biden-Era Democrats' Unconstitutional FBI Raid On Pro-Life Father Ends In Million-Dollar Settlement Victory",
    "tinyUrl": "https://tinyurl.com/mvuzt4fv",
    "xPostUrl": "https://x.com/C3Heditor/status/2046703579851862328",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Apple Forced to Close Store Plagued by Retail Crime & Lootings In Democrat-Controlled Baltimore\u00a0County",
    "tinyUrl": "https://tinyurl.com/bd589d4u",
    "xPostUrl": "https://x.com/C3Heditor/status/2046702473075630325",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Priced Out Of Their Own Cities: Large Homes In These 10 Large Democrat-Run Cities Now Unaffordable",
    "tinyUrl": "https://tinyurl.com/354n38tj",
    "xPostUrl": "https://x.com/C3Heditor/status/2046701760207548641",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Philadelphia's Democrat Mayor Lashes Out At Uber & Lyft For Pushing Back On Her Tax on Their Services",
    "tinyUrl": "https://tinyurl.com/433h94t9",
    "xPostUrl": "https://x.com/C3Heditor/status/2046700919543177495",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Minnesota Democrat Prosecutor Issues Felony Charges Against Non-Violent ICE Agent, But No Charges Against Anti-ICE Violent Protestors",
    "tinyUrl": "https://tinyurl.com/ymrjajsy",
    "xPostUrl": "https://x.com/C3Heditor/status/2046700109358842244",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Democrat-Partisan Justice Sotomayor Apologizes for Unprovoked \u201cinappropriate\u201d Remarks About Justice Kavanaugh",
    "tinyUrl": "https://tinyurl.com/2y344hj3",
    "xPostUrl": "https://x.com/C3Heditor/status/2046699406443819073",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Pew Data Reveals The Result of Democrats' Policy: Nearly 10% Of 2023 Us Births Were To Illegal Or Temporary Immigrant Mothers",
    "tinyUrl": "https://tinyurl.com/4p6jx4se",
    "xPostUrl": "https://x.com/C3Heditor/status/2046698818779967877",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Democrat Mayor's Wage Mandate Is Crushing Los Angeles Hotels, New Report Finds",
    "tinyUrl": "https://tinyurl.com/5n6tk6mn",
    "xPostUrl": "https://x.com/C3Heditor/status/2046697816492282044",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "After Smearing FBI Director Kash Patel, Democrat Party Mouthpiece, The Atlantic, Actually Compares Modern America To Nazi-Occupied France",
    "tinyUrl": "https://tinyurl.com/ypzf9u9k",
    "xPostUrl": "https://x.com/C3Heditor/status/2046697107063554115",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Utah's Gerrymander Judge Accused Of Having An Affair With The Democrat Redistricting Attorney",
    "tinyUrl": "https://tinyurl.com/bdd96su5",
    "xPostUrl": "https://x.com/C3Heditor/status/2046695864547086826",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Two Democrat Politicians Busted And Arrested For Running A Mail-In Ballot Fraud Scheme",
    "tinyUrl": "https://tinyurl.com/yteamsv7",
    "xPostUrl": "https://x.com/C3Heditor/status/2046695317823737873",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Swalwell Pal, Married Democrat Rep. Gomez, Accused Of Sexual Harassment of Young Staffer",
    "tinyUrl": "https://tinyurl.com/bdfjfxdf",
    "xPostUrl": "https://x.com/C3Heditor/status/2046694728222028218",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "California Gov. Newsom's $2 Billion Budget Blunder Exposed After Democrat Leaders Hid It For Months",
    "tinyUrl": "https://tinyurl.com/bdf5j7ca",
    "xPostUrl": "https://x.com/C3Heditor/status/2046693437194260877",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Surging Antisemitism Within His Own Party Draws Scorching Rebuke From Democrat Senator",
    "tinyUrl": "https://tinyurl.com/484u7pnh",
    "xPostUrl": "https://x.com/C3Heditor/status/2046692533510475977",
    "page": 23,
    "batchDate": "Apr 21, 2026"
  },
  {
    "headline": "Dem Strategist Urges Democrats To End Filibuster, Pack The Court & Add 2 New States To Retain Political Power Forever",
    "tinyUrl": "https://tinyurl.com/2xjck623",
    "xPostUrl": "https://x.com/C3Heditor/status/2046335930496131095",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "In Democrat-Run Macon County, GA, Healthcare Fraud Charges Filed Against Election Workers",
    "tinyUrl": "https://tinyurl.com/nvj4f5kv",
    "xPostUrl": "https://x.com/C3Heditor/status/2046333234498109580",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "New Poll Demolishes Media Claim That Catholic Voters Turned Against Trump Over The Pope",
    "tinyUrl": "https://tinyurl.com/ycxpy4d3",
    "xPostUrl": "https://x.com/C3Heditor/status/2046330282563801110",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Democrats\u2019 Extreme Leftist Takeover Will Shorten American Lives\u2014Eastern Europe\u2019s Communist Nightmare Proves It",
    "tinyUrl": "https://tinyurl.com/4m79a4ck",
    "xPostUrl": "https://x.com/C3Heditor/status/2046329362316714336",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Wealthy New Yorkers Fleeing Over Taxes? Delusional Democrat Mayor Mamdani Dismisses The Threat As Purely Imagined",
    "tinyUrl": "https://tinyurl.com/52yj4e3d",
    "xPostUrl": "https://x.com/C3Heditor/status/2046328411405127853",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "$2 Million Dollar Biden DOJ Grant Puts Democrat Prosecutor Fani Willis Squarely Under Federal Investigation",
    "tinyUrl": "https://tinyurl.com/yzbnau69",
    "xPostUrl": "https://x.com/C3Heditor/status/2046327484539433423",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Fiery Mob Chaos Erupts In The NYC Socialist Utopia & Spineless Democrat Lawmakers Who Don't Support Police Do Nothing But Shout",
    "tinyUrl": "https://tinyurl.com/2tsn3n2r",
    "xPostUrl": "https://x.com/C3Heditor/status/2046326033486336437",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Shocking Call From A House Democrat Urging Leftist Activists To Eliminate President Trump",
    "tinyUrl": "https://tinyurl.com/2mmjwfus",
    "xPostUrl": "https://x.com/C3Heditor/status/2046323338486960436",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Democrat-Controlled Seattle Playgrounds Covered In Fentanyl Foil Like Autumn Leaves While A Nonprofit Fuels It",
    "tinyUrl": "https://tinyurl.com/4d4keh5r",
    "xPostUrl": "https://x.com/C3Heditor/status/2046322379627069635",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Failed Illegal Trucker CDL Revocations Cost Democrat New York $73 Million In Federal Highway Funding",
    "tinyUrl": "https://tinyurl.com/v87efft6",
    "xPostUrl": "https://x.com/C3Heditor/status/2046318213663985735",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Minnesota Lt. Gov. Flanagan Demands Democrats Rip ICE Apart And Prosecute Federal Agents",
    "tinyUrl": "https://tinyurl.com/5n98b7kw",
    "xPostUrl": "https://x.com/C3Heditor/status/2046316647376453655",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Declassified Revelations: Putting Spotlight On Treasonous Democrat Operation To Impeach Trump",
    "tinyUrl": "https://tinyurl.com/bdh8nprk",
    "xPostUrl": "https://x.com/C3Heditor/status/2046315144142102763",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Democrat Mayor Mamdani's New Grand Socialist Vision: Get New Yorkers To Actually Use Trash Bins By The Year 2031",
    "tinyUrl": "https://tinyurl.com/yn5xak6k",
    "xPostUrl": "https://x.com/C3Heditor/status/2046313592861946167",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Democrats & Media Both Admit They Had Knowledge of Swalwell's Sexual Misconduct Rumors",
    "tinyUrl": "https://tinyurl.com/293bf4jk",
    "xPostUrl": "https://x.com/C3Heditor/status/2046312781675434086",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Soaring LA Homeless Camp Fires In Democrat City Are Slowing Emergency Response Times With Deadly Results",
    "tinyUrl": "https://tinyurl.com/4xprddya",
    "xPostUrl": "https://x.com/C3Heditor/status/2046310557557440651",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Anti-Trump Democrat Senator Claims Iran Won Despite Its Military Being Utterly Decimated",
    "tinyUrl": "https://tinyurl.com/36jyr68e",
    "xPostUrl": "https://x.com/C3Heditor/status/2046308903907197254",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Phony Ukraine Impeachment Leader Makes A Stunning Damning Admission About The Whole Democrat Scheme",
    "tinyUrl": "https://tinyurl.com/hkjzysjb",
    "xPostUrl": "https://x.com/C3Heditor/status/2046309956773937651",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Video Surfaces Of Michigan Democrat Joking About The MSU Shooter Just Weeks After Attack",
    "tinyUrl": "https://tinyurl.com/54ym7z86",
    "xPostUrl": "https://x.com/C3Heditor/status/2046304259269103964",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Citizens Are Still Suffering From Democrats' Open Border Policies: Illegal Alien Brutally Assaults & Attempts To Rape Missouri Woman",
    "tinyUrl": "https://tinyurl.com/5aj4mf7p",
    "xPostUrl": "https://x.com/C3Heditor/status/2046303395947090037",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "Democrat Ilhan Omar\u2019s Jaw-Dropping $30 Million Net Worth Vanishes in Suspicious \u2018Accounting Error\u2019",
    "tinyUrl": "https://tinyurl.com/34mutm4n",
    "xPostUrl": "https://x.com/C3Heditor/status/2046302133558169909",
    "page": 24,
    "batchDate": "Apr 20, 2026"
  },
  {
    "headline": "After Swalwell'S Downfall, Eyes Now Turn To Democrat Senator Ruben Gallego As The Next",
    "tinyUrl": "https://tinyurl.com/yuc6zsdn",
    "xPostUrl": "https://x.com/C3Heditor/status/2045534929170174385",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Kimmel Goes Silent On Scandal Despite Hosting The Swalwell Democrat Governor Campaign Launch On ABC",
    "tinyUrl": "https://tinyurl.com/f4dprdds",
    "xPostUrl": "https://x.com/C3Heditor/status/2045534111582810122",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrat-Run California Coastal Commission Reaches New Low By Blocking Fireworks For Nation's 250th Birthday",
    "tinyUrl": "https://tinyurl.com/yckdvh8w",
    "xPostUrl": "https://x.com/C3Heditor/status/2045533019314758140",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Nigerian Islamists Kidnap Priests & Christians While Democrat-Operative Pope Does Zilch For Them",
    "tinyUrl": "https://tinyurl.com/yh2wtkbs",
    "xPostUrl": "https://x.com/C3Heditor/status/2045531132536516848",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Texas Democrat Shatters Records For Spending Donor Cash Recklessly - Will Wildly Spend Even More As U.S. Senator",
    "tinyUrl": "https://tinyurl.com/mszfdmn3",
    "xPostUrl": "https://x.com/C3Heditor/status/2045530223152681396",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Teacher's Union Pours $1.7M Into Democrat Anti-ICE Rallies As Kid Gets Suspended For Pro-ICE Flyer",
    "tinyUrl": "https://tinyurl.com/4t4hwppx",
    "xPostUrl": "https://x.com/C3Heditor/status/2045527260103393496",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrats Did This: Post-Obamacare, Rural Hospitals Are Hanging by a Thread",
    "tinyUrl": "https://tinyurl.com/5p3zk4x9",
    "xPostUrl": "https://x.com/C3Heditor/status/2045526584401031173",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Trump Derangement Syndrome On Full Display As Democrats Rage At The White House Ballroom",
    "tinyUrl": "https://tinyurl.com/599k9dk8",
    "xPostUrl": "https://x.com/C3Heditor/status/2045521791288742255",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Virginia's Electoral Votes Will Now Be Tied To Democrat-Controlled California Due To Bill Gov Spanberger Signed",
    "tinyUrl": "https://tinyurl.com/dcffb8sp",
    "xPostUrl": "https://x.com/C3Heditor/status/2045520994308161954",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Putting The Country First Is Not On Their Agenda: Trump Impeachment After The Midterm Elections Predicted By Top Democrat",
    "tinyUrl": "https://tinyurl.com/2vhw3be4",
    "xPostUrl": "https://tinyurl.com/2vhw3be4",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Clueless Sen. Adam Schiff Calls Iran A Tragic Quagmire As Democrats Struggle With Reality",
    "tinyUrl": "https://tinyurl.com/y5h67nyf",
    "xPostUrl": "https://x.com/C3Heditor/status/2045516351003820293",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrats' Self-Made Fuel Crisis: Experts Estimate California\u2019s Inventories 30% Below Normal Due To State's Climate Policies",
    "tinyUrl": "https://tinyurl.com/36p9m8s8",
    "xPostUrl": "https://x.com/C3Heditor/status/2045515239605625138",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Deported Illegal Gang Member Who Crossed Open Border During Democrat Administration Is Now Wanted For Murder In Florida",
    "tinyUrl": "https://tinyurl.com/36kyxnjr",
    "xPostUrl": "https://x.com/C3Heditor/status/2045511977968013635",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Politico Had The Swalwell Story In 2019 But Killed It When He Dropped His Presidential Bid",
    "tinyUrl": "https://tinyurl.com/56fhhz5s",
    "xPostUrl": "https://x.com/C3Heditor/status/2045510687166787979",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Washington Post Baffled That Democrats Ever Noticed Or Reported That Swalwell Was A Creep All Along",
    "tinyUrl": "https://tinyurl.com/4zaw5vr8",
    "xPostUrl": "https://x.com/C3Heditor/status/2045509855801184538",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Journalist Reports Eric Swalwell's Misconduct 'Was Known' to Democrats",
    "tinyUrl": "https://tinyurl.com/42k5ycmz",
    "xPostUrl": "https://x.com/C3Heditor/status/2045508580896280718",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrat Mayor's 'Happy Tax Day' Video About NYC Increasing Taxes Even More Backfires",
    "tinyUrl": "https://tinyurl.com/2bb2en98",
    "xPostUrl": "https://x.com/C3Heditor/status/2045506975757173094",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Desperate Democrats Now Running As Fake Republicans Just To Get A Foot In The Door",
    "tinyUrl": "https://tinyurl.com/2efb57ym",
    "xPostUrl": "https://x.com/C3Heditor/status/2045504876495417690",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Oversight Panel Urged To Probe Democrats' Woke Ideology That Has Infiltrated America's Major Insurers",
    "tinyUrl": "https://tinyurl.com/y6saeshn",
    "xPostUrl": "https://x.com/C3Heditor/status/2045504182401024056",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Remaining Democrat Prosecutors From Biden's Term Who Used FACE Act To Censor Pro-Life Activists Are Fired",
    "tinyUrl": "https://tinyurl.com/bde8m4ew",
    "xPostUrl": "https://x.com/C3Heditor/status/2045503247851434224",
    "page": 25,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Lawsuit Filed By Democrats To Derail Government's Newest Push For Election Anti-Fraud Measures",
    "tinyUrl": "https://tinyurl.com/96jmw65v",
    "xPostUrl": "https://x.com/C3Heditor/status/2045478046388425056",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Hollywood Elite Swalwell Backers Go Quiet After His Humiliating Resignation From Congress",
    "tinyUrl": "https://tinyurl.com/2rsyv42u",
    "xPostUrl": "https://x.com/C3Heditor/status/2045477305825349853",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Elite Democrats' Holiday Playground, Lake Tahoe, Is In Trouble With Their 2,000 Ski Instructors Over Wage Violations",
    "tinyUrl": "https://tinyurl.com/3xaz4vtw",
    "xPostUrl": "https://x.com/C3Heditor/status/2045476677011001549",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrat-Partisan Pope Fail: Among Mass-Attending Catholics, Trump Pulls A 58% Approval Rating",
    "tinyUrl": "https://tinyurl.com/4ttrmf5h",
    "xPostUrl": "https://x.com/C3Heditor/status/2045475534251942285",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Chicago's Democrat Mayor Johnson Claims The Restaurant Industry Still Carries Vestiges of Slavery",
    "tinyUrl": "https://tinyurl.com/yhj7392y",
    "xPostUrl": "https://x.com/C3Heditor/status/2045474641213264076",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Ugly Truth Of Transgender Ideology Accidentally Exposed By A Careless Democrat",
    "tinyUrl": "https://tinyurl.com/ywj5r2b4",
    "xPostUrl": "https://x.com/C3Heditor/status/2045473361233318267",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Cash Tips & Overtime Won't Get Tax Relief After Democrat Gov Evers Vetoes Wisconsin Bills",
    "tinyUrl": "https://tinyurl.com/y4r6spv9",
    "xPostUrl": "https://x.com/C3Heditor/status/2045472693764419756",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrats In New York Refuse An ICE Hold On Illegal Alien Arson Suspect Who Killed Four & Injured Seven",
    "tinyUrl": "https://tinyurl.com/4d3y4c34",
    "xPostUrl": "https://x.com/C3Heditor/status/2045472161024917943",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Biden's Democrat-Run DHS Freed Illegal Alien Accused Of Raping A Missouri Woman On Easter Sunday",
    "tinyUrl": "https://tinyurl.com/2w363ddw",
    "xPostUrl": "https://x.com/C3Heditor/status/2045471515722850453",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Hypocrisy: Swalwell Demands Standard Of Fairness That He Refused Brett Kavanaugh In 2018",
    "tinyUrl": "https://tinyurl.com/2hzb3t5t",
    "xPostUrl": "https://x.com/C3Heditor/status/2045468778687864921",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Legal Immigration Drops Fifty Percent As The Trump Reforms Reverse Democrat-Era Policies",
    "tinyUrl": "https://tinyurl.com/43mb8h9e",
    "xPostUrl": "https://x.com/C3Heditor/status/2045468075026214918",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrats' Urban Hell: Elderly Man Beaten By Stranger In Deranged Unprovoked Attack On NYC's Upper East Side",
    "tinyUrl": "https://tinyurl.com/44eyef6f",
    "xPostUrl": "https://x.com/C3Heditor/status/2045467129219039378",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Michigan Democrat Candidate for U.S. Senator El-Sayed Claims America Created Terrorism By Causing Pain",
    "tinyUrl": "https://tinyurl.com/5dy5b24t",
    "xPostUrl": "https://x.com/C3Heditor/status/2045466528695349572",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrats' ActBlue Likely Deceived Congress About Illegal Foreign Donations, Probe Indicates",
    "tinyUrl": "https://tinyurl.com/2tn2u9hj",
    "xPostUrl": "https://x.com/C3Heditor/status/2045465820487102868",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Remove Trump via 25th Amendment, Democrat Ro Khanna Says, Over Alleged War Crime Threats",
    "tinyUrl": "https://tinyurl.com/2s3t575p",
    "xPostUrl": "https://x.com/C3Heditor/status/2045464843583389963",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Birth Rates Are Cratering As The Democrat-Left Dismantles The Family And Abortions Mount",
    "tinyUrl": "https://tinyurl.com/25k2cr9u",
    "xPostUrl": "https://x.com/C3Heditor/status/2045463049734119616",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrats Force Lawyers To Swear They Won't Help Feds Nab Illegals",
    "tinyUrl": "https://tinyurl.com/mus8d9su",
    "xPostUrl": "https://x.com/C3Heditor/status/2045462276417741281",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Former Obama Chief Of Staff Makes Stunning Admission: Democrats Have 'Lost The Plot'",
    "tinyUrl": "https://tinyurl.com/ykdsaetc",
    "xPostUrl": "https://x.com/C3Heditor/status/2045461563503485231",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Approval Collapse: Maryland Democrat Governor's Poll Numbers Crater As Taxes & Power Bills Soar",
    "tinyUrl": "https://tinyurl.com/2ccpdne2",
    "xPostUrl": "https://x.com/C3Heditor/status/2045460228347502650",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Uh-Oh...Democrat California Has Largest Afghan Population In U.S. ===> France Arrests Afghan Man Who Rapes Goats And Sheep",
    "tinyUrl": "https://tinyurl.com/bdh3wpds",
    "xPostUrl": "https://x.com/C3Heditor/status/2045459949224955938",
    "page": 26,
    "batchDate": "Apr 18, 2026"
  },
  {
    "headline": "Democrat-Run Houston On Path to Lose $110 Million of Texas Funds Over Illegal Sanctuary City Policies",
    "tinyUrl": "https://tinyurl.com/4355pp6y",
    "xPostUrl": "https://x.com/C3Heditor/status/2044827027631440303",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "California's Woke-Democrat Lawmaker Calls It Racist To Fine Nigerian Man For Cutting Down 38 Protected Trees",
    "tinyUrl": "https://tinyurl.com/2s68mepu",
    "xPostUrl": "https://x.com/C3Heditor/status/2044825373511188812",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Boston Mayor Buries Delivery Companies Under New Rules That Drive Up Costs And Paperwork",
    "tinyUrl": "https://tinyurl.com/3u94rz9b",
    "xPostUrl": "https://x.com/C3Heditor/status/2044824111415787553",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "A Billionaire Democrat More Anti-American Than George Soros - Steyer Vows To Abolish ICE, Imprison Its Agents & Will Ignore SCOTUS Rulings",
    "tinyUrl": "https://tinyurl.com/3nkawdbk",
    "xPostUrl": "https://x.com/C3Heditor/status/2044823276581536255",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "114 Pages of Democrat Swalwell's 1,700 Donors Fully Exposed, Including Depraved Hollywood Celebrities",
    "tinyUrl": "https://tinyurl.com/nhhvnma3",
    "xPostUrl": "https://x.com/C3Heditor/status/2044820339201282212",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Democrat Mayor's City-Owned Grocery Stores Are Coming To NYC And Bread Lines May Not Be Far Behind",
    "tinyUrl": "https://tinyurl.com/wwnv2aza",
    "xPostUrl": "https://x.com/C3Heditor/status/2044812290092843258",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Major Home Builder Abandons Democrat California For A More Business-Friendly Red State",
    "tinyUrl": "https://tinyurl.com/2r6hp82e",
    "xPostUrl": "https://x.com/C3Heditor/status/2044809726848811376",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Exposing The Ideological Disease That Has Taken Over & Now Drives The Democrat Party",
    "tinyUrl": "https://tinyurl.com/3m48tc6b",
    "xPostUrl": "https://x.com/C3Heditor/status/2044808804483620949",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Gov. Hochul Targets Wealthy New Yorkers With New Democrat Tax On 2nd Homes Valued Above Five Million",
    "tinyUrl": "https://tinyurl.com/2jmcrnph",
    "xPostUrl": "https://x.com/C3Heditor/status/2044806403206865311",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Biden's Democrat DOJ Secretly Enlisted Abortion Groups To Spy On And Target Pro-Life Activists",
    "tinyUrl": "https://tinyurl.com/a4ws49fu",
    "xPostUrl": "https://x.com/C3Heditor/status/2044805440513388588",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Jewish Comedians Who Deviate From Democrat-Controlled Hollywood Cult Now Face Death Threats",
    "tinyUrl": "https://tinyurl.com/3z9v5b7c",
    "xPostUrl": "https://x.com/C3Heditor/status/2044788111457075613",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Is The View's Joy Behar the Democrats' Biblical Scholar? She Ignorantly Claims Jesus Never Declared Himself To Be The Messiah",
    "tinyUrl": "https://tinyurl.com/58xwaetu",
    "xPostUrl": "https://x.com/C3Heditor/status/2044787203339943998",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "It's Just Another Day & Just Another Democrat Racist Reveal: 'Y'all Look Alike'",
    "tinyUrl": "https://tinyurl.com/ytku49ad",
    "xPostUrl": "https://x.com/C3Heditor/status/2044778039536419278",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Democrats Do Virtue-Signaling: Chicago Names Playground For Armed Gunman Killed In Justified Shooting",
    "tinyUrl": "https://tinyurl.com/48m9t32d",
    "xPostUrl": "https://x.com/C3Heditor/status/2044784828239782165",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Wasting Taxpayer Dollars On Illegal Aliens Who Seek 'Free' Sex Changes In Democrat-Run California",
    "tinyUrl": "https://tinyurl.com/5emu5bpd",
    "xPostUrl": "https://x.com/C3Heditor/status/2044770878462755048",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "While Christians Violently Die or Simply Vanish Across The Globe, Partisan-Democrat Pope Leo XIV Provides Hugs For Islam",
    "tinyUrl": "https://tinyurl.com/ytcczbrd",
    "xPostUrl": "https://x.com/C3Heditor/status/2044596234950779294",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "California Moves To Criminalize Journalism To Shield Democrats' Rampant Government Fraud",
    "tinyUrl": "https://tinyurl.com/4wtw2ccx",
    "xPostUrl": "https://x.com/C3Heditor/status/2044594512006119618",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Democrat Mayor Mamdani's Own Video Director Praised October 7 Massacre Architect Yahya Sinwar As A Heroic Figure",
    "tinyUrl": "https://tinyurl.com/msd28tn3",
    "xPostUrl": "https://x.com/C3Heditor/status/2044548837818183776",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Luddites Make A Comeback: Democrat-Governed Maine Is First State To Pass A Sweeping Ban On AI Data Centers",
    "tinyUrl": "https://tinyurl.com/yr6tuntw",
    "xPostUrl": "https://x.com/C3Heditor/status/2044548172295381490",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Their Outrage Is Mighty Selective: Democrats Said Nothing When Obama Was Depicted As Jesus Christ",
    "tinyUrl": "https://tinyurl.com/7rxkc4a3",
    "xPostUrl": "https://x.com/C3Heditor/status/2044547947061244157",
    "page": 27,
    "batchDate": "Apr 16, 2026"
  },
  {
    "headline": "Protecting Democrat Election Fraud: DOJ Lawsuit Seeking MA Voter Rolls For Analysis Tossed By Obama-Appointed Judge",
    "tinyUrl": "https://tinyurl.com/mry7r7fm",
    "xPostUrl": "https://x.com/C3Heditor/status/2044136911128723746",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Will Democrats Continue To Force Taxpayers To Fund Anti-Catholic Abortion & \u2018Gender-Mutilation\u2019 Policies in 2026?",
    "tinyUrl": "https://tinyurl.com/wxn4fx3f",
    "xPostUrl": "https://x.com/C3Heditor/status/2044135855728509231",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Every Woman Is Harmed By The Democrat Cover-Up That Shielded Swalwell For So Long",
    "tinyUrl": "https://tinyurl.com/5a4bs83m",
    "xPostUrl": "https://x.com/C3Heditor/status/2044134284458336494",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Democrat Propaganda News Media Refuses To Acknowledge GOP Administration's Reduction of Violent Crime",
    "tinyUrl": "https://tinyurl.com/2p9kpbd9",
    "xPostUrl": "https://x.com/C3Heditor/status/2044133002490319292",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Democrat Mayor Mamdani Decides To Ban NYC's Times Square Celebrations For America's 250th Birthday",
    "tinyUrl": "https://tinyurl.com/27s4aj28",
    "xPostUrl": "https://x.com/C3Heditor/status/2044132197129478396",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "21 Suspects Charged In $267 Million Hospice Fraud That Democrat Policies Facilitated",
    "tinyUrl": "https://tinyurl.com/bp7bx2yc",
    "xPostUrl": "https://x.com/C3Heditor/status/2044131119092695295",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Accused Killer With Decades Of Crimes Shielded By Democrat Policies That Protect Guilty From Accountability",
    "tinyUrl": "https://tinyurl.com/5hyfnz72",
    "xPostUrl": "https://x.com/C3Heditor/status/2044130281859244510",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Maryland Democrat Gov's Fabricated Life Story Gets Cover From MS NOW's Jen Psaki As She Helps Kill The Probe",
    "tinyUrl": "https://tinyurl.com/ytu97y8y",
    "xPostUrl": "https://x.com/C3Heditor/status/2044129434941247739",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Democrat Candidate For Maine U.S. Senate Seat Blames His Nazi Tattoo On America's Military Culture",
    "tinyUrl": "https://tinyurl.com/5fdnz3ma",
    "xPostUrl": "https://x.com/C3Heditor/status/2044128420968190158",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Scandals Keep Piling Up In Democrat Governed Minnesota - Dubbed The Nation's Most Dysfunctional State",
    "tinyUrl": "https://tinyurl.com/yc84hx6d",
    "xPostUrl": "https://x.com/C3Heditor/status/2044127343459852562",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Alcohol, Drugs & Property Damage: Police Called To Ohio Democrat Governor Candidate's Home",
    "tinyUrl": "https://tinyurl.com/4vw64mf8",
    "xPostUrl": "https://x.com/C3Heditor/status/2044126108589687197",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Why Did Democrat Swalwell Resign & Quit Gov Race? Staffer Accused Him Of Twice Raping Her",
    "tinyUrl": "https://tinyurl.com/ykb6bdh8",
    "xPostUrl": "https://x.com/C3Heditor/status/2044125002992074879",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Extreme Partisan Democrat Gerrymandering Pushes Beyond The Absurd",
    "tinyUrl": "https://tinyurl.com/53zp5hsw",
    "xPostUrl": "https://x.com/C3Heditor/status/2044124170322051223",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Jewish Democrat Gov. JB Pritzker Has Praise For Catholic Leader After Pope Lashes Out At Trump",
    "tinyUrl": "https://tinyurl.com/tc6bmye9",
    "xPostUrl": "https://x.com/C3Heditor/status/2044054778091618807",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Spend Way Too Much, Then Tax A Lot: Democrats Give LAUSD Teachers A Staggering 24% Pay Hike",
    "tinyUrl": "https://tinyurl.com/34njxwcd",
    "xPostUrl": "https://x.com/C3Heditor/status/2044053689812304154",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Demand to Remove Iryna Zarutska Mural Defines Democrats' Values Regarding Violent Crime",
    "tinyUrl": "https://tinyurl.com/4b6xr4vc",
    "xPostUrl": "https://x.com/C3Heditor/status/2044050700712198449",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "The Sunrise Movement's Radical Revolution Playbook Is A Blueprint For Democrats' Eco-Socialism",
    "tinyUrl": "https://tinyurl.com/4yxch2fu",
    "xPostUrl": "https://x.com/C3Heditor/status/2044049962996998530",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Kentucky Democrat Gov's Refusal To Extend Civil Rights To Young Adults Deserves A Serious Explanation",
    "tinyUrl": "https://tinyurl.com/ycymhk98",
    "xPostUrl": "https://x.com/C3Heditor/status/2044048792668783062",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Which U.S. Catholic Cardinal Denounced Democrat's Policy? Biden DOJ Enlisted Abortion Groups To Help Track Pro-Life Activists",
    "tinyUrl": "https://tinyurl.com/yeykkhmj",
    "xPostUrl": "https://x.com/C3Heditor/status/2044044084793208966",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "CBS '60 Minutes' Allows 3 American Cardinals To Persuade Catholics To Vote Based On Democrats' Playbook For 2026 Midterms",
    "tinyUrl": "https://tinyurl.com/4n47jbbh",
    "xPostUrl": "https://x.com/C3Heditor/status/2044042916717273498",
    "page": 28,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "U.S. Senate Democrat Candidate In Texas Says He Doesn't Want Police Guarding Schools",
    "tinyUrl": "https://tinyurl.com/yr96ruu9",
    "xPostUrl": "https://x.com/C3Heditor/status/2043802558590849439",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Guilty On 106 Felony Counts, A Democrat Voter Fraudster Is Running For Mayor Again, But In Different State",
    "tinyUrl": "https://tinyurl.com/mw8dyc28",
    "xPostUrl": "https://x.com/C3Heditor/status/2043801764328063075",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Woke Judge Lets $11M Somali Fraudster Flee The Country, Leaving Democrats Red-Faced",
    "tinyUrl": "https://tinyurl.com/8mrwheaw",
    "xPostUrl": "https://x.com/C3Heditor/status/2043801192992534741",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Criminals Terrorize Seattle While Its Democrat Socialist Mayor Wages War On ICE, Union Warns",
    "tinyUrl": "https://tinyurl.com/yu6shvhc",
    "xPostUrl": "https://x.com/C3Heditor/status/2043798447921270828",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Voters Escaping Blue Govt Failures In Multiple U.S. States Now Face Punishment Under New Democrat Proposals",
    "tinyUrl": "https://tinyurl.com/4dz5dnvw",
    "xPostUrl": "https://x.com/C3Heditor/status/2043797725183946954",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Expulsion Votes Mount As Democrat Rep. Swalwell's Sex Scandal Spirals Into A Full-Blown Purge Threat",
    "tinyUrl": "https://tinyurl.com/mwunhrk5",
    "xPostUrl": "https://x.com/C3Heditor/status/2043796139615346834",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Women & Children Left Exposed As Democrats Shield Criminal Illegal Alien Predators",
    "tinyUrl": "https://tinyurl.com/32webdtd",
    "xPostUrl": "https://x.com/C3Heditor/status/2043795050132365697",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Remember When Democrats Filed Articles Of Impeachment Over A Phone Call, Now They're Doing It Over A Social Media Post",
    "tinyUrl": "https://tinyurl.com/bdf2xuv8",
    "xPostUrl": "https://x.com/C3Heditor/status/2043794249838157865",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Bay State Democrats Push Bill That Would Cap How Many Miles You Will Be Allowed To Drive Your Own Car",
    "tinyUrl": "https://tinyurl.com/bdz9uus7",
    "xPostUrl": "https://x.com/C3Heditor/status/2043793482158870692",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Democrat-Fascist Lawmaker Vows To Build Lists Of Trump Officials To Receive Weaponized Lawfare In The Future",
    "tinyUrl": "https://tinyurl.com/ydef8xbb",
    "xPostUrl": "https://x.com/C3Heditor/status/2043792837397877157",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Under Democrat Gov. Newsom's Watch, California Hemorrhaged At Least $180 Billion In Fraud Losses",
    "tinyUrl": "https://tinyurl.com/5n73tkpb",
    "xPostUrl": "https://x.com/C3Heditor/status/2043791506939531510",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "It's Now A Top Democrat Priority To Again Force Airline Passengers To Remove Their Shoes",
    "tinyUrl": "https://tinyurl.com/yck6wz4m",
    "xPostUrl": "https://x.com/C3Heditor/status/2043790186543292900",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Nope! Ohio Democrat Who Tried To Run As A Republican Gets Booted By SCOTUS",
    "tinyUrl": "https://tinyurl.com/p6bh4u9j",
    "xPostUrl": "https://x.com/C3Heditor/status/2043789453865422987",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "DEI Wokeism Is In The Constitution, So Says Democrat Hakeem Jeffries \u2014 It Is Not",
    "tinyUrl": "https://tinyurl.com/bderk8ap",
    "xPostUrl": "https://x.com/C3Heditor/status/2043788503129915630",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "The Data Dismantles Every Democrat Lie About Gas Prices",
    "tinyUrl": "https://tinyurl.com/7uxfmsep",
    "xPostUrl": "https://x.com/C3Heditor/status/2043787717125832847",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Banning Christian Speech: Democrats Are Nearly As Aggressive As Canada In Censorship Push",
    "tinyUrl": "https://tinyurl.com/ytwt8zxf",
    "xPostUrl": "https://x.com/C3Heditor/status/2043787028454580682",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "LA Fire Victims Still Waiting As Democrats Break Their Promise To Rebuild Quickly - So Far, Only 1 Home Rebuilt",
    "tinyUrl": "https://tinyurl.com/muxbs876",
    "xPostUrl": "https://x.com/C3Heditor/status/2043786228089188754",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Local Paper Unearths Damaging Dirt On Maryland Democrat Governor, Sending His Team Into Panic",
    "tinyUrl": "https://tinyurl.com/2s3zbzy2",
    "xPostUrl": "https://x.com/C3Heditor/status/2043785598108856724",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Sexual Assault Accusation Against Eric Swalwell Triggers A Manhattan D.A. Investigation",
    "tinyUrl": "https://tinyurl.com/yavcyatf",
    "xPostUrl": "https://x.com/C3Heditor/status/2043784765225009387",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "Relentless Racial Division Pushed By Democrats Is Taking A Serious Toll On America",
    "tinyUrl": "https://tinyurl.com/6u6pezwu",
    "xPostUrl": "https://x.com/C3Heditor/status/2043783226368413894",
    "page": 29,
    "batchDate": "Apr 14, 2026"
  },
  {
    "headline": "California's $126B Democrat Rail Fiasco Earns 'Stonehenge' Label As Gov. Newsom Aide Admits The Blunder",
    "tinyUrl": "https://tinyurl.com/cct5uuv3",
    "xPostUrl": "https://x.com/C3Heditor/status/2043437382720950329",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Mar-A-Lago Raid On Trump Ordered By Democrat President's DOJ Despite FBI Objections, Records Now Confirm",
    "tinyUrl": "https://tinyurl.com/482hhrkw",
    "xPostUrl": "https://x.com/C3Heditor/status/2043436562084467073",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Democrats' Own Voters Can't Stand Them, CNN Analysis Finds In A Brutal Numbers Breakdown",
    "tinyUrl": "https://tinyurl.com/4jzzbkdn",
    "xPostUrl": "https://x.com/C3Heditor/status/2043435863023956420",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Humiliation: Joe Biden Is Erased From Democrats' Easter Message As His Own Party Tries To Move On",
    "tinyUrl": "https://tinyurl.com/4bmr5ybt",
    "xPostUrl": "https://x.com/C3Heditor/status/2043434843866849405",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Back To Pro-Woke, Anti-White Governance: Virginia DEI Office Revived By Democrat Governor",
    "tinyUrl": "https://tinyurl.com/fu69ue6p",
    "xPostUrl": "https://x.com/C3Heditor/status/2043433965466312834",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Democrats Denounced By Dem Senator For Backing Liberal Hasan Piker, Who Claimed America Deserved 9/11",
    "tinyUrl": "https://tinyurl.com/28p4hm96",
    "xPostUrl": "https://x.com/C3Heditor/status/2043432339150197060",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Virtue-Signaling Democrat Sheds Crocodile Tears For Illegal Alien Criminal Who Caused Big Pileup While Fleeing ICE",
    "tinyUrl": "https://tinyurl.com/3j5kkavw",
    "xPostUrl": "https://x.com/C3Heditor/status/2043431496015282603",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Rising Costs From Democrats' Over-Regulation Drive Even More Residents Out As California' Migration Wave Keeps Growing",
    "tinyUrl": "https://tinyurl.com/7hzymksc",
    "xPostUrl": "https://x.com/C3Heditor/status/2043429866347909269",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Political Debanking of Democrat Opposition Triggers FTC Warning For Visa, Mastercard, Paypal & Stripe",
    "tinyUrl": "https://tinyurl.com/nwss5sau",
    "xPostUrl": "https://x.com/C3Heditor/status/2043429229132403004",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Corruption: Foreign Donation Scandal Sends Democratic Fundraiser ActBlue's Legal Team Into Crisis Mode",
    "tinyUrl": "https://tinyurl.com/ynn7n2uc",
    "xPostUrl": "https://x.com/C3Heditor/status/2043428401684357436",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Trump Assassination Joke Draws Roaring Applause From The SNL's Democrat Studio Audience",
    "tinyUrl": "https://tinyurl.com/yc4k8wbh",
    "xPostUrl": "https://x.com/C3Heditor/status/2043427514815545654",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Utility Bills On Long Island Spike 20%, Leaving Residents Feeling The Financial Strain of Democrat Energy Policies",
    "tinyUrl": "https://tinyurl.com/fd5nurrb",
    "xPostUrl": "https://x.com/C3Heditor/status/2043426627841908853",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Long After Covid, Taxpayers Are Still Fleeing Democrat Blue States In Massive Numbers",
    "tinyUrl": "https://tinyurl.com/49se3b8w",
    "xPostUrl": "https://x.com/C3Heditor/status/2043425964013559825",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Democrat Mayor Calls Mural Honoring Stabbing Victim Iryna Zarutska 'divisive,' Calls For A Halt",
    "tinyUrl": "https://tinyurl.com/st8xmpfn",
    "xPostUrl": "https://x.com/C3Heditor/status/2043424582472815033",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "ABC Anchor Fact-Checks Democrat Live, Dismantling His False DHS Shutdown Narrative On Air",
    "tinyUrl": "https://tinyurl.com/yf492kud",
    "xPostUrl": "https://x.com/C3Heditor/status/2043423812071403633",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "High Gas Prices In Democrat California Are A Homegrown Crisis, Not Trump's Fault, Data Shows",
    "tinyUrl": "https://tinyurl.com/4hsbtzar",
    "xPostUrl": "https://x.com/C3Heditor/status/2043415978877296869",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Scrutiny Mounts As Corruption Questions Swirl Around Democrat AOC's Use Of Her Campaign War Chest",
    "tinyUrl": "https://tinyurl.com/yvdja986",
    "xPostUrl": "https://x.com/C3Heditor/status/2043415210598232486",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Democrat Manhattan D.A. Alvin Bragg Strikes A Pathetic Plea Deal For A 'Trans' Illegal Alien Who Raped A 14-year-old Boy",
    "tinyUrl": "https://tinyurl.com/kmtpeyt8",
    "xPostUrl": "https://x.com/C3Heditor/status/2043414539530637490",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Georgia Democrat Sen. Jon Ossoff Backed By Hasan Piker, Who Openly Endorses Terrorist Groups",
    "tinyUrl": "https://tinyurl.com/2b78naez",
    "xPostUrl": "https://x.com/C3Heditor/status/2043413618876666148",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Democrats' Idiotic Policies: Illegal Immigrant Costs Blow Colorado's Budget By A Jaw-Dropping 611%",
    "tinyUrl": "https://tinyurl.com/bdfbda43",
    "xPostUrl": "https://x.com/C3Heditor/status/2043412312497811521",
    "page": 30,
    "batchDate": "Apr 12, 2026"
  },
  {
    "headline": "Michigan Synagogue Victims Ignored By Democrat News Outlet, NPR, Which Instead Interviewed The Terrorist'S Pals",
    "tinyUrl": "https://tinyurl.com/yau4349s",
    "xPostUrl": "https://x.com/C3Heditor/status/2043080360783655413",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Georgia Lieutenant Governor Democrat Candidate Shaming Those Who Are Critical of Islam Sharia",
    "tinyUrl": "https://tinyurl.com/56bvjehw",
    "xPostUrl": "https://x.com/C3Heditor/status/2043079552901972350",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Michican Democrat Rep. Quits Politics, Blasting Her Paty's Abortion And LGBTQ Agenda As Anti-Christian",
    "tinyUrl": "https://tinyurl.com/4w4mx79j",
    "xPostUrl": "https://x.com/C3Heditor/status/2043076819264385434",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Dozens of Women Now Coming Forward Over Democrat Rep. Swalwell's Potentially Criminal Sexual Misconduct",
    "tinyUrl": "https://tinyurl.com/376p6pv7",
    "xPostUrl": "https://x.com/C3Heditor/status/2043076235488526732",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "NYC's Democrat Mayor Mamdani's Tax Hike Obsession Pushes New York City Business Leaders To Weigh An Exit",
    "tinyUrl": "https://tinyurl.com/yhkjevax",
    "xPostUrl": "https://x.com/C3Heditor/status/2043074548958933315",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Visitors Must Show ID To Enter The Obama Presidential Library, But Democrat Want No ID Requirements To Vote",
    "tinyUrl": "https://tinyurl.com/3rd8a543",
    "xPostUrl": "https://x.com/C3Heditor/status/2043073149978267901",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Minnesota Judge Hands Somali Fraudster Just 6 Months After $500K Theft in Child Food Scam",
    "tinyUrl": "https://tinyurl.com/3x2pt3ju",
    "xPostUrl": "https://x.com/C3Heditor/status/2043071682982605297",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Los Angeles Is Being Driven Into The Ground By Newsom & His California Democrats",
    "tinyUrl": "https://tinyurl.com/yrxjsdma",
    "xPostUrl": "https://x.com/C3Heditor/status/2043070598948012202",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Laundromat Kidnapping: Ecuadorian Illegal Snatches 4-Year-Old But Walks Free On Monitor, Because of NY's Democrat Policies",
    "tinyUrl": "https://tinyurl.com/2uvrzj8w",
    "xPostUrl": "https://x.com/C3Heditor/status/2043068660768518404",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Democrat Candidate Faces Stolen Valor Storm as Veterans Rage Over His Fake Cemetery Photo",
    "tinyUrl": "https://tinyurl.com/7etanejk",
    "xPostUrl": "https://x.com/C3Heditor/status/2043067029066764745",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Woke Democrat Mayor Turns Once-Beautiful American City Into A Haven For Homeless 'Drug Zombies'",
    "tinyUrl": "https://tinyurl.com/mr2yw8xd",
    "xPostUrl": "https://x.com/C3Heditor/status/2043065671655792657",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Ohio Passes a Kids Indecent Exposure Bill \u2014 Every Single Democrat Voted Against It",
    "tinyUrl": "https://tinyurl.com/2s3dx997",
    "xPostUrl": "https://x.com/C3Heditor/status/2043064922209173532",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Major News Networks Gave Literally Zero Seconds To The House Ethics Trial of a Democrat Member",
    "tinyUrl": "https://tinyurl.com/3ft3apk4",
    "xPostUrl": "https://x.com/C3Heditor/status/2043064162096447863",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "In Democrat Governed California, Rampant Fraud Has Become Less A Glitch And More A Deliberate Design",
    "tinyUrl": "https://tinyurl.com/ykmmwa2n",
    "xPostUrl": "https://x.com/C3Heditor/status/2043062721944416735",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Something Unites Every Radical Democrat Prosecutor Across America: Soros Dark Money",
    "tinyUrl": "https://tinyurl.com/ydew94j3",
    "xPostUrl": "https://x.com/C3Heditor/status/2043062061530218544",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Democrats' Ruinous Energy Policies Pushed San Francisco Diesel Above $8/Gallon",
    "tinyUrl": "https://tinyurl.com/5737jdbc",
    "xPostUrl": "https://x.com/C3Heditor/status/2043061145066496059",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Celebrating America Enrages The Democrats As The Dept. of Education Now Leans Patriotic",
    "tinyUrl": "https://tinyurl.com/5n82zjfc",
    "xPostUrl": "https://x.com/C3Heditor/status/2043059146426098127",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Haitian\u00a0Illegal Alien Thug Kills Woman in FL Hammer Attack Was Protected From Deportation Under Democrat Pres. Biden",
    "tinyUrl": "https://tinyurl.com/77vb5hfz",
    "xPostUrl": "https://x.com/C3Heditor/status/2043058128904708170",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Taxpayers Shell Out $19M For A NY PR Firm To Rebrand Democrat Gov. Newsom's California Fiasco",
    "tinyUrl": "https://tinyurl.com/scdn86zp",
    "xPostUrl": "https://x.com/C3Heditor/status/2042638329103982816",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Hospital Severs Ties With Democrat-Activist Doctor Who Bragged About Harassing ICE Agents At The Airport",
    "tinyUrl": "https://tinyurl.com/53wybn9f",
    "xPostUrl": "https://x.com/C3Heditor/status/2042636909143359663",
    "page": 31,
    "batchDate": "Apr 11, 2026"
  },
  {
    "headline": "Feds Zero In On New York Democrat And Gov. Hochul Aide Over Migrant Shelter Bribery Scam",
    "tinyUrl": "https://tinyurl.com/yeypmdvn",
    "xPostUrl": "https://x.com/C3Heditor/status/2040064221841371384",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "A Closer Look at Democrat Gov. Gavin Newsom's Remarkably Long and Documented Record of Not Liking To Work",
    "tinyUrl": "https://tinyurl.com/yjnhe8x5",
    "xPostUrl": "https://x.com/C3Heditor/status/2040062151809810807",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Voter Rolls Denied To DHS By Democrat Blue States But Freely Shared With Leftist Organizations",
    "tinyUrl": "https://tinyurl.com/uu98a365",
    "xPostUrl": "https://x.com/C3Heditor/status/2040061172020339018",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "A Dissident Democrat Blasts His Own Party On Virginia's Gerrymandering & Gun Control",
    "tinyUrl": "https://tinyurl.com/2czbzus8",
    "xPostUrl": "https://x.com/C3Heditor/status/2040059770921480665",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Transgender Advocates Fight Trump Policies With Tactics From Lawsuits to Murder Threats",
    "tinyUrl": "https://tinyurl.com/hcupu9yv",
    "xPostUrl": "https://x.com/C3Heditor/status/2040058740678734190",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Hypocrisy On Steroids: Epstein Files Should Be Released -Says Democrat Swalwell- But Not His Own Chinese-Spy Fang Fang Files",
    "tinyUrl": "https://tinyurl.com/ms73x952",
    "xPostUrl": "https://x.com/C3Heditor/status/2040057311209636120",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Murder Charge Filed Against Another Illegal Alien In Democrat-Controlled Fairfax County, Virginia",
    "tinyUrl": "https://tinyurl.com/mp4apnsw",
    "xPostUrl": "https://x.com/C3Heditor/status/2040056142894706791",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "ICE Agent Rammed By Vehicle Driven By Fugitive Illegal Migrant With A Long Criminal Record",
    "tinyUrl": "https://tinyurl.com/mrb8xcsh",
    "xPostUrl": "https://x.com/C3Heditor/status/2040055486523879558",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Another Democrat-Run Utopia: Elderly Woman Stabbed In The Neck In Random, Unprovoked Downtown LA Attack",
    "tinyUrl": "https://tinyurl.com/yb8e3p2u",
    "xPostUrl": "https://x.com/C3Heditor/status/2040053733007020196",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Maine's Democrat U.S. Senate Hopeful - Who Railed Against 'Epstein Elite' - Secretly Funded By A Pedophile Associate",
    "tinyUrl": "https://tinyurl.com/c4xfcfya",
    "xPostUrl": "https://x.com/C3Heditor/status/2040052840501031345",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Declassified Intel Reveals a Secret Scheme to Siphon Hundreds of Millions to the Democrats",
    "tinyUrl": "https://tinyurl.com/5exuau77",
    "xPostUrl": "https://x.com/C3Heditor/status/2040051928797778240",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Updated Data Reveals Far More Residents Have Abandoned Democrat Governed California Than Initially Reported",
    "tinyUrl": "https://tinyurl.com/yvvnkpvy",
    "xPostUrl": "https://x.com/C3Heditor/status/2040050953164919180",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Democrat Senator Blasts Legacy Media For Aiding Iran With Biased Coverage Of Operation Epic Fury",
    "tinyUrl": "https://tinyurl.com/yfh5e3y8",
    "xPostUrl": "https://x.com/C3Heditor/status/2040040528910180826",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Washington State's Millionaire Tax Produces a Huge Surge In Luxury Home Sale Listings - Up 65 Percent Overnight",
    "tinyUrl": "https://tinyurl.com/j2mrbjby",
    "xPostUrl": "https://x.com/C3Heditor/status/2040050342335820016",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Sanctuary From What? TranTifa Activists Urge Worcester City's Democrat Council To Declare A Sanctuary City For The Community",
    "tinyUrl": "https://tinyurl.com/ym4zhaww",
    "xPostUrl": "https://x.com/C3Heditor/status/2040054304753520977",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Democrats' Conversion Therapy Ban Struck Down As 'egregious' Censorship By SCOTUS",
    "tinyUrl": "https://tinyurl.com/yx73mktx",
    "xPostUrl": "https://x.com/C3Heditor/status/2040049555656302937",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "The Democrats' Propaganda Arm, NY Times, Forced To Walk Back Story Over Fabricated Trump Quotes",
    "tinyUrl": "https://tinyurl.com/36zc86bp",
    "xPostUrl": "https://x.com/C3Heditor/status/2040048741990703264",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Progressive Insurance Company Embraces Democrats' Racial Discrimination Policies & Calls It Progress \u2014 Seriously",
    "tinyUrl": "https://tinyurl.com/3d9hn6af",
    "xPostUrl": "https://x.com/C3Heditor/status/2040047596417269938",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Mural Honoring Slain Refugee Who Had Neck Slashed Declared Contrary To City Values By A Democrat Candidate",
    "tinyUrl": "https://tinyurl.com/25b476yb",
    "xPostUrl": "https://x.com/C3Heditor/status/2040046978420097448",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Explosive Report Reveals Democrat-controlled California's Fraud Scandal And How Taxpayer Cash Is Being Wasted",
    "tinyUrl": "https://tinyurl.com/2w4jkuw3",
    "xPostUrl": "https://x.com/C3Heditor/status/2040045859979632912",
    "page": 32,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Guatemalan Illigal Aliens Handed 25-year Prison Terms For Kidnapping And Killing A New York Man",
    "tinyUrl": "https://tinyurl.com/5f9bjnsv",
    "xPostUrl": "https://x.com/C3Heditor/status/2040045257300095213",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Democrats Deploy Celebrities to Fight Voter ID \u2014 Claim Women Are Too Dumb to Obtain One",
    "tinyUrl": "https://tinyurl.com/y3vaacet",
    "xPostUrl": "https://x.com/C3Heditor/status/2040044433316385067",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Virginia Democrats Pass Bill Requiring Schools to Teach January 6 As A Violent Insurrection, Except That's Disinformation",
    "tinyUrl": "https://tinyurl.com/324amdb9",
    "xPostUrl": "https://x.com/C3Heditor/status/2040043569415675974",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "NYC Democrat Mayor's New Top Priority: $250,000 Anti-Catcalling Campaign Rolls Out On NYC Subways, Ferries And Construction Sites",
    "tinyUrl": "https://tinyurl.com/3fpzh86a",
    "xPostUrl": "https://x.com/C3Heditor/status/2040042162952237454",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Top 4 News Apps Quietly Bury California Health Care Fraud Tied To Leading Democrats",
    "tinyUrl": "https://tinyurl.com/5cfa6tbr",
    "xPostUrl": "https://x.com/C3Heditor/status/2040041433680232703",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "State Democrat Party Leader Taken Into Custody For Beating A Disabled Veteran At 'No Kings' Protest",
    "tinyUrl": "https://tinyurl.com/4wyp32e9",
    "xPostUrl": "https://x.com/C3Heditor/status/2040039948280082820",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Justice Department Takes Minnesota's Democrat Administration To Court Over Girls' Transgender Sports Eligibility Rules",
    "tinyUrl": "https://tinyurl.com/5n6mjedh",
    "xPostUrl": "https://x.com/C3Heditor/status/2040038634414363044",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Democrat-Partisan Florida Judge Who Freed Pedophile Now Faces Removal After A Child Was Murdered",
    "tinyUrl": "https://tinyurl.com/4f9djz7j",
    "xPostUrl": "https://x.com/C3Heditor/status/2040037574979305784",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Not A Single Minnesota House Democrat Voted In Support of Age Verification Requirements for Online Porn",
    "tinyUrl": "https://tinyurl.com/yc6hwtv5",
    "xPostUrl": "https://x.com/C3Heditor/status/2040036917153038672",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Colorado Democrat-Run School District Handed 61 Girls' Sports Slots to Boys, Feds Determine",
    "tinyUrl": "https://tinyurl.com/ysundbzr",
    "xPostUrl": "https://x.com/C3Heditor/status/2040035582437368062",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Democrat Senator Calls Out Fellow Democrats for Staying Silent When Protesters Wish Death on US Soldiers",
    "tinyUrl": "https://tinyurl.com/3n7edmsw",
    "xPostUrl": "https://x.com/C3Heditor/status/2040034841194852386",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Huh? Iowa Democrat Reframes Male Athletes in Women's Sports as Proof of White Male Panic",
    "tinyUrl": "https://tinyurl.com/2s3tjtux",
    "xPostUrl": "https://x.com/C3Heditor/status/2040034084970229941",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Sixteen Years of Democrats' Obamacare - Drug Prices (also premiums & deductibles) Still Sky-High",
    "tinyUrl": "https://tinyurl.com/mpear48a",
    "xPostUrl": "https://x.com/C3Heditor/status/2040032834778272087",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Election Fraud Is Real: Petition Cheaters In California Tapped Into Voter Database To Get Real Names For Forged Signatures",
    "tinyUrl": "https://tinyurl.com/rsts7ccb",
    "xPostUrl": "https://x.com/C3Heditor/status/2039824702235955465",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Voting Official Caught Stealing Election Access Tool Prior To Democrat's Mar-a-Lago Win",
    "tinyUrl": "https://tinyurl.com/pxpxvz2w",
    "xPostUrl": "https://x.com/C3Heditor/status/2039823157465411888",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Chevron Puts Gov. Newsom on Notice: The Democrats' Climate Alarmism Threatens 500,000 California Jobs",
    "tinyUrl": "https://tinyurl.com/2h26bdu9",
    "xPostUrl": "https://x.com/C3Heditor/status/2039822194692251938",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Random San Francisco Stabbing Reveals The Democrats' Woke Policy That Critics Say Shields the Attackers",
    "tinyUrl": "https://tinyurl.com/bmy7s939",
    "xPostUrl": "https://x.com/C3Heditor/status/2039821196552781842",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "White House Slams Mainstream Media Blackout On Murder Of Chicago Loyola Student Sheridan Gorman By Venezuelan Illegal Alien",
    "tinyUrl": "https://tinyurl.com/59enynu8",
    "xPostUrl": "https://x.com/C3Heditor/status/2039820511698420222",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Convicted Democrat-Liberal Architect Of 'Feeding Our Future' Corruption Scam Receives A Disgracefully Light Plea Deal",
    "tinyUrl": "https://tinyurl.com/43sx5fv8",
    "xPostUrl": "https://x.com/C3Heditor/status/2039819863410065682",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Democrats Did This: Human Hunting Murder Spree Across California And Nevada Blamed On MS-13, Per Prosecutors",
    "tinyUrl": "https://tinyurl.com/bp6curr9",
    "xPostUrl": "https://x.com/C3Heditor/status/2039819011479761297",
    "page": 33,
    "batchDate": "Apr 03, 2026"
  },
  {
    "headline": "Minnesota Democrat Governance Failure: Audit Identifies consistent Failures That Allowed Somali Fraud",
    "tinyUrl": "https://tinyurl.com/2chpazpu",
    "xPostUrl": "https://x.com/C3Heditor/status/2039082745360757131",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Govt Incompetence: Two Years Later, No Key Bridge Rebuild As Maryland Democrats Focus On\u00a0Tampons\u00a0In Men's Bathrooms",
    "tinyUrl": "https://tinyurl.com/7uubwxpk",
    "xPostUrl": "https://x.com/C3Heditor/status/2039081331708326342",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Corrupt Democrat Lawmaker Sentenced for Fabricating Support Letters & Probed for Bullying",
    "tinyUrl": "https://tinyurl.com/4uk9rdzh",
    "xPostUrl": "https://x.com/C3Heditor/status/2039079834844909822",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Mississippi Education Miracle That Democrats Can't Stand Due To Blue State Education Fails",
    "tinyUrl": "https://tinyurl.com/mw69jf26",
    "xPostUrl": "https://x.com/C3Heditor/status/2039078983187280225",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrat-Socialist Sen. Bernie Sanders Unable Name Even One Benefit of the DHS Chaos He Supports",
    "tinyUrl": "https://tinyurl.com/ycxcwbfw",
    "xPostUrl": "https://x.com/C3Heditor/status/2039078410480214436",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Michigan Voter Rolls Are Full of Dead Registrants \u2014 and Democrat Officials Refusing To Audit",
    "tinyUrl": "https://tinyurl.com/yu8tcr8z",
    "xPostUrl": "https://x.com/C3Heditor/status/2039077081145909607",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrats Raced to Cancel Their Past Hero Cesar Chavez From Everything \u2014 Because of Jeffrey Epstein",
    "tinyUrl": "https://tinyurl.com/yscm4rcw",
    "xPostUrl": "https://x.com/C3Heditor/status/2039076054673858667",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Justice Dept Seeks Citizenship Revocation of Former Democrat Mayor Over Fraud Charges",
    "tinyUrl": "https://tinyurl.com/3nv425k3",
    "xPostUrl": "https://x.com/C3Heditor/status/2039075370813579523",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrats Threaten Any Business That Backed Trump With Breakup and Retaliation Campaigns",
    "tinyUrl": "https://tinyurl.com/k4rhpr88",
    "xPostUrl": "https://x.com/C3Heditor/status/2039074364788769250",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Never Forget: Democrats Withhold Applause as Trump Honors American Olympic Hockey Champions",
    "tinyUrl": "https://tinyurl.com/bdcmss8y",
    "xPostUrl": "https://x.com/C3Heditor/status/2039073582156836886",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Federal DOJ Enters Anti-White Discrimination Suit Against LA's Largest, Democrat-Run School District",
    "tinyUrl": "https://tinyurl.com/bp9cd6fb",
    "xPostUrl": "https://x.com/C3Heditor/status/2039070244665200826",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "ESPN Star Tells Democrats Their Real Goal Is Allowing Illegal Aliens to Vote",
    "tinyUrl": "https://tinyurl.com/5crv6paw",
    "xPostUrl": "https://x.com/C3Heditor/status/2039069452780621921",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "U.S. U.S. House Block a Bill That Would Deport Illegal Aliens Who Attack Police Animals",
    "tinyUrl": "https://tinyurl.com/5x8b6smk",
    "xPostUrl": "https://x.com/C3Heditor/status/2039068823567949837",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Radical Michigan Imam Who Shouted 'Death to America' Linked To Top Democrats",
    "tinyUrl": "https://tinyurl.com/jsuc5ak4",
    "xPostUrl": "https://x.com/C3Heditor/status/2039068170837729301",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrat Perks: Silicon Valley Water Boss & NAACP Leader Pockets $500K Exit Deal Days Before a Sex Attack Report Drops",
    "tinyUrl": "https://tinyurl.com/yhrec8hr",
    "xPostUrl": "https://x.com/C3Heditor/status/2039067163294597287",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrat Senator Sounds Alarm: His Own Party Is Still Sick With Trump Derangement Syndrome",
    "tinyUrl": "https://tinyurl.com/s5m6txkh",
    "xPostUrl": "https://x.com/C3Heditor/status/2039066364724253040",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Chicago Dem Blasts Gov. Pritzker and His Party \u2014 Reveals Why Democrats Block Trump on Immigration",
    "tinyUrl": "https://tinyurl.com/bdd3tb6x",
    "xPostUrl": "https://x.com/C3Heditor/status/2039065503004516452",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Massive Polling Support for Voter ID Nationwide Delivers Devastating Blow For Democrats",
    "tinyUrl": "https://tinyurl.com/ypjsa6ae",
    "xPostUrl": "https://x.com/C3Heditor/status/2039064324887523820",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Indiana Democrat-Partisan Judge Invents a Religious Right to Abortion and Uses It to Block the State Ban",
    "tinyUrl": "https://tinyurl.com/msmv4zty",
    "xPostUrl": "https://x.com/C3Heditor/status/2039063260901847255",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "U.S. House Democrat Cherfilus-McCormick Found Guilty of 25 Ethics Violations \u2014 Expulsion Has Yet to Be Decided",
    "tinyUrl": "https://tinyurl.com/2tnv5sb4",
    "xPostUrl": "https://x.com/C3Heditor/status/2039061905223094275",
    "page": 34,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "U.S. House Democrat Swalwell Caught in an Ethics Violation That Sends Shockwaves Through Democrat Party",
    "tinyUrl": "https://tinyurl.com/yvky7uka",
    "xPostUrl": "https://x.com/C3Heditor/status/2039059874424717750",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Top Democrat Accidentally Reveals Exactly What Her Party Fears Most About SAVE Act - Stopping Dems' Voter Fraud",
    "tinyUrl": "https://tinyurl.com/2krk4nr3",
    "xPostUrl": "https://x.com/C3Heditor/status/2039059091855667202",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Radical Democrat-Fascists Tell Conservative Students to Die - Use Charlie Kirk Death Imagery as Threats",
    "tinyUrl": "https://tinyurl.com/2s7erd3j",
    "xPostUrl": "https://x.com/C3Heditor/status/2039058285542670771",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Hitler-Groupie Nick Fuentes Is Being Discovered By Appreciative Democrat Lefties",
    "tinyUrl": "https://tinyurl.com/54vsaxvx",
    "xPostUrl": "https://x.com/C3Heditor/status/2039057216246833340",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "NY Democrats Back Energy Plans Designed to Bring 3rd World-Style Blackouts",
    "tinyUrl": "https://tinyurl.com/nh56eeta",
    "xPostUrl": "https://x.com/C3Heditor/status/2039055253685903686",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "State Trooper Killed by Democrat-Marxist at a Traffic Stop",
    "tinyUrl": "https://tinyurl.com/mry7m6me",
    "xPostUrl": "https://x.com/C3Heditor/status/2039054035248890094",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "For The Record Book: Democrats' DHS Shutdown Is Now the Longest Government Shutdown in American History",
    "tinyUrl": "https://tinyurl.com/4su93zu9",
    "xPostUrl": "https://x.com/C3Heditor/status/2039052095056122339",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Michigan Senate Candidate Abdul El-Sayed Helped Lead Anti-Police Group as It Organized Detroit Protest Turned Deadly Riot",
    "tinyUrl": "https://tinyurl.com/2ffd9zr8",
    "xPostUrl": "https://x.com/C3Heditor/status/2039050127118065953",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Even Liberal Media Outlets Are Calling Democrats Out for Their Reckless Wasteful Spending",
    "tinyUrl": "https://tinyurl.com/5n9y44j2",
    "xPostUrl": "https://x.com/C3Heditor/status/2038999251917668654",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Fanaticism: NYC Democrat Mayor Mamdani's Wife Liked Posts Celebrating Hamas's October 7 Slaughter of Israeli Civilians",
    "tinyUrl": "https://tinyurl.com/yc255dz2",
    "xPostUrl": "https://x.com/C3Heditor/status/2038998532053426568",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Fraud Charges Filed Against Illegal Alien for Voting in a Key Swing State in the 2024 Election",
    "tinyUrl": "https://tinyurl.com/y728sznm",
    "xPostUrl": "https://x.com/C3Heditor/status/2038741448720339190",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "State of Corruption: A New Minnesota Democrat Slush Fund Would Siphon Cash Directly From Energy Companies",
    "tinyUrl": "https://tinyurl.com/yurk3tus",
    "xPostUrl": "https://x.com/C3Heditor/status/2038739226255044866",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Creepy Maine's Democrat Senate Hopeful Brags About Wrestling & Beating High School Girls",
    "tinyUrl": "https://tinyurl.com/4upwnu9y",
    "xPostUrl": "https://x.com/C3Heditor/status/2038738398333001842",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrat-Controlled Intel Buried China 2020 Election Meddling to Hide Their Own Anti-Trump Bias From Public Scrutiny",
    "tinyUrl": "https://tinyurl.com/4pht9b89",
    "xPostUrl": "https://x.com/C3Heditor/status/2038736752815260098",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "186 U.S. U.S. House Voted to Protect Foreigners Who Defraud the United States",
    "tinyUrl": "https://tinyurl.com/yk22hdkj",
    "xPostUrl": "https://x.com/C3Heditor/status/2038735873538150495",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "San Francisco's Black Residents Reparations Program Exposes Everything Wrong With the Current Democrats",
    "tinyUrl": "https://tinyurl.com/r4a8h7pc",
    "xPostUrl": "https://x.com/C3Heditor/status/2038731770837819801",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "City's Dismal Finances Doesn't Stop NYC Council Democrats To Push Ahead With Scheme to Give Itself a Nice Pay Raise",
    "tinyUrl": "https://tinyurl.com/3nju2fze",
    "xPostUrl": "https://x.com/C3Heditor/status/2038730878617051207",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "California Gov. Newsom Concedes on Kimmel That Democrat-Run California Is Severely Overregulated",
    "tinyUrl": "https://tinyurl.com/9mh6smsm",
    "xPostUrl": "https://x.com/C3Heditor/status/2038730191451594940",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Former Illinois Democrat Mayor Calls on Trump to Fight Crime After Her Own Father Gets Shot",
    "tinyUrl": "https://tinyurl.com/mtu476dh",
    "xPostUrl": "https://x.com/C3Heditor/status/2038729360488693767",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "San Diego's Democrat School Board Members Vote Themselves a 400% Pay Raise as Furious Staff Look On",
    "tinyUrl": "https://tinyurl.com/4xjf35dw",
    "xPostUrl": "https://x.com/C3Heditor/status/2038728466019840070",
    "page": 35,
    "batchDate": "Mar 31, 2026"
  },
  {
    "headline": "Democrats Vote Down a Simple Voter Photo-ID Amendment Despite Telling Public They Would Support It",
    "tinyUrl": "https://tinyurl.com/2vydpphm",
    "xPostUrl": "https://x.com/C3Heditor/status/2038373004837564563",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Result of Democrat Immigration Policy: 3 Salvadoran Nationals Busted on Long Island After Cops Find Them With Molotovs",
    "tinyUrl": "https://tinyurl.com/3srhxnrn",
    "xPostUrl": "https://x.com/C3Heditor/status/2038371814687072543",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Maryland Democrat Idiocracy: Dems Debate Appropriate Sized Tampons To Be Stocked in Every Public Men's Restroom",
    "tinyUrl": "https://tinyurl.com/mr42xxbv",
    "xPostUrl": "https://x.com/C3Heditor/status/2038369822296195372",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Stockholm Syndrome: Trans Activists Using Democrats as Political Hostage-Warriors",
    "tinyUrl": "https://tinyurl.com/yfvzfnks",
    "xPostUrl": "https://x.com/C3Heditor/status/2038368866720502201",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Democrat Senator Throws Hissy-Fit Over ICE At Airport, Comic Calls Him A \u2018F*cking P*ssy\u2019",
    "tinyUrl": "https://tinyurl.com/27dsed4m",
    "xPostUrl": "https://x.com/C3Heditor/status/2038368016866464142",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Moms for Liberty' a Full Terrorist Organization? That's What South Carolina Democrat Claims About 'Parental Rights' Group",
    "tinyUrl": "https://tinyurl.com/77byszvj",
    "xPostUrl": "https://x.com/C3Heditor/status/2038367309836792058",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Result of Democrat Immigration Policy: NC Cops Arrest Illegal Alien Who Confessed to Two Murders",
    "tinyUrl": "https://tinyurl.com/4buyuybh",
    "xPostUrl": "https://x.com/C3Heditor/status/2038365699203010614",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "FBI Nabs MS-13 Member Tied to a El Salvador Pastor's Murder - Arrested In Democrat Connecticut",
    "tinyUrl": "https://tinyurl.com/4nery9ny",
    "xPostUrl": "https://x.com/C3Heditor/status/2038362714805092390",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Refugees From Democrat Insanity: Yamaha and Exxon Join the Flood of Businesses Bolting Blue States for Red Ones",
    "tinyUrl": "https://tinyurl.com/bk9zua7h",
    "xPostUrl": "https://x.com/C3Heditor/status/2038362070471836061",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Texas U.S. Senate Democrat Candidate Says Hanging Ten Commandments in Schools Is Violence",
    "tinyUrl": "https://tinyurl.com/4cpsvr7s",
    "xPostUrl": "https://x.com/C3Heditor/status/2038361205698670985",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Corruption Is A Democrat Feature Not A Bug: Newsom Uses a Loophole to Funnel Over $4M to His Wife's Causes",
    "tinyUrl": "https://tinyurl.com/mv5kcybc",
    "xPostUrl": "https://x.com/C3Heditor/status/2038359437631463576",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Obama's Democrat Partisan Judge Blocks Trump Deportation Reforms \u2014 Critics Are Calling It Judicial Sabotage",
    "tinyUrl": "https://tinyurl.com/5eaatw9n",
    "xPostUrl": "https://x.com/C3Heditor/status/2038358690537853179",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "New Lawsuit: Ohio State University Officials Attacked 'The Whites' While Running Illegal DEI Programs",
    "tinyUrl": "https://tinyurl.com/ytp3sbtz",
    "xPostUrl": "https://x.com/C3Heditor/status/2038357910858657867",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Soros Democrat DA Blames the Old Dominion ISIS Attack on Pro-Gun Judges and Republican Lawmakers",
    "tinyUrl": "https://tinyurl.com/3spmr34k",
    "xPostUrl": "https://x.com/C3Heditor/status/2038356595671695682",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "A Gang Brawls With Doorman & Then Invades Luxury Apartments In Democrat-Run LA",
    "tinyUrl": "https://tinyurl.com/2p3ch78j",
    "xPostUrl": "https://x.com/C3Heditor/status/2038355855188324370",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Democrat Utopia: Elderly Veteran Shoved Onto NYC Subway Tracks \u2014 Illegal Alien Charged",
    "tinyUrl": "https://tinyurl.com/muue6ssv",
    "xPostUrl": "https://x.com/C3Heditor/status/2038354427946426787",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "If Democrats Win the Midterms, Multiple Anti-Trump Investigations Will Immediately Launch",
    "tinyUrl": "https://tinyurl.com/57xvseee",
    "xPostUrl": "https://x.com/C3Heditor/status/2038353495393194055",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "U.S. House Democrat Demands Reparations For Illegal Immigrants",
    "tinyUrl": "https://tinyurl.com/228575yh",
    "xPostUrl": "https://x.com/C3Heditor/status/2038352377120469082",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Democrats' Energy Disasters Have Made the Ongoing Hormuz Strait Crisis Significantly Worse",
    "tinyUrl": "https://tinyurl.com/yyej2x6x",
    "xPostUrl": "https://x.com/C3Heditor/status/2038351641863197140",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Joe Biden's Democrat Administration Loosened Abortion Guardrails & Adverse Events Soared, Report Reveals",
    "tinyUrl": "https://tinyurl.com/46z94s82",
    "xPostUrl": "https://x.com/C3Heditor/status/2038350965191917706",
    "page": 36,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Virginia Democrat Governor Faces Backlash Over Pathetic Response to the ODU Attack By ISIS Alien",
    "tinyUrl": "https://tinyurl.com/35bmsh6y",
    "xPostUrl": "https://x.com/C3Heditor/status/2038349886467297295",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Minnesota Democrat Election Judge Pleads Guilty to Letting Unregistered Voters Cast 2024 Ballots",
    "tinyUrl": "https://tinyurl.com/3nvvsjwt",
    "xPostUrl": "https://x.com/C3Heditor/status/2038348156836974894",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Chevron Warns Newsom's Democrat Energy Policy Will Hit California Consumers Hard in the Wallet",
    "tinyUrl": "https://tinyurl.com/ym2sf594",
    "xPostUrl": "https://x.com/C3Heditor/status/2038346580416225683",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Democrat Economics At Work: Bay Area Drivers Pay $150 Per Fill-Up as Northern California Tops the State's Gas Prices",
    "tinyUrl": "https://tinyurl.com/mpbh5v6j",
    "xPostUrl": "https://x.com/C3Heditor/status/2038344728341537131",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Seattle's Woke-Democrat Mayor Kills New Police Cameras to Protect Illegal Immigrants From Detection",
    "tinyUrl": "https://tinyurl.com/yxd6khw3",
    "xPostUrl": "https://x.com/C3Heditor/status/2038343098082701799",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Economists Warn the Democrats War on Poverty May Have Permanently Created a New American Underclass",
    "tinyUrl": "https://tinyurl.com/ytujmu6m",
    "xPostUrl": "https://x.com/C3Heditor/status/2038342373017571351",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Napa Valley Residents Furious At After Incompetent Democrat Officials Declaring Their Foul Brown Tap Water Safe",
    "tinyUrl": "https://tinyurl.com/2x2ec3en",
    "xPostUrl": "https://x.com/C3Heditor/status/2038341525164159463",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Americans Blast Democrat Gov. Newsom Over the Synagogue Attack \u2014 His Own anti-Semitic Rhetoric Is the Problem",
    "tinyUrl": "https://tinyurl.com/asmpbcwn",
    "xPostUrl": "https://x.com/C3Heditor/status/2038339293580583349",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Federal Judge Blasts Woke Democrat Colleagues for Letting Biological Males Walk Into Women's Spas",
    "tinyUrl": "https://tinyurl.com/2vh9et9h",
    "xPostUrl": "https://x.com/C3Heditor/status/2038334742349672591",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Democrat Utopia: NYC Teens Rip Out Cashier's Hair & Slug Security Guard in Wild Supermarket Brawl",
    "tinyUrl": "https://tinyurl.com/ycydw5e5",
    "xPostUrl": "https://x.com/C3Heditor/status/2038334008325484774",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "After Years Calling Shutdowns Catastrophic, Democrats Have Now Caused Three of Them",
    "tinyUrl": "https://tinyurl.com/mwsb474r",
    "xPostUrl": "https://x.com/C3Heditor/status/2038333841002139898",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "One of America's Most Corrupt, Poorly Run Democrat Cities Eyes Massive Pay Bumps for Its Council Members",
    "tinyUrl": "https://tinyurl.com/4vw9wm48",
    "xPostUrl": "https://x.com/C3Heditor/status/2038329923421479002",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "North Carolina's Democrat Governor Goes Full-Pander To Please Islamicists",
    "tinyUrl": "https://tinyurl.com/bd4buwya",
    "xPostUrl": "https://x.com/C3Heditor/status/2038206941474808076",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Chicago Democrat Claims Murdered Loyola College Student Had Herself to Blame Not The Illegal Alien",
    "tinyUrl": "https://tinyurl.com/panuaham",
    "xPostUrl": "https://x.com/C3Heditor/status/2038198790620950977",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Democrat Gov. Pritzker Lays Out the Dems' Project2029 Agenda to Weaponize Govt Lawfare Against GOP & Trump Officials",
    "tinyUrl": "https://tinyurl.com/43sthx5v",
    "xPostUrl": "https://x.com/C3Heditor/status/2038198173349347824",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Soros Democrats: Anti-American Crowd Caught Cheering US Troops Returning Home in Body Bags",
    "tinyUrl": "https://tinyurl.com/25ye6ek4",
    "xPostUrl": "https://x.com/C3Heditor/status/2038195899025727687",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Cops Blame SF Mayor Democrat Daniel Lurie for the Wild Brawl That Injured His Own Security Guards",
    "tinyUrl": "https://tinyurl.com/ujeexhj4",
    "xPostUrl": "https://x.com/C3Heditor/status/2038194323259347296",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "When Pressed, Bernie Sanders Cannot Name a Single Benefit of the Democrats' DHS Shutdown",
    "tinyUrl": "https://tinyurl.com/3vnrthxp",
    "xPostUrl": "https://x.com/C3Heditor/status/2038193652694909273",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "Gov. Spanberger Embraces Full Damage Control as Democrats' Redistricting Rig-The-Vote Efforts Blow Up Badly",
    "tinyUrl": "https://tinyurl.com/rcnwdcue",
    "xPostUrl": "https://x.com/C3Heditor/status/2038192661878759600",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "On Camera: Democrats Paying California Homeless to Sign Ballots in Election Fraud Scheme",
    "tinyUrl": "https://tinyurl.com/35b4mmh3",
    "xPostUrl": "https://x.com/C3Heditor/status/2038191822783037477",
    "page": 37,
    "batchDate": "Mar 29, 2026"
  },
  {
    "headline": "As Trump Said, 'These people are crazy': U.S. Democrat Senator Warns ICE Agents Will Shoot and Kill Families When Deployed to US Airports",
    "tinyUrl": "https://tinyurl.com/442rew2y",
    "xPostUrl": "https://x.com/C3Heditor/status/2037267134355579015",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Remember, the Late Chuck Norris Left the Democrats Because They Lost All Sense of What America Stands For",
    "tinyUrl": "https://tinyurl.com/c785yddm",
    "xPostUrl": "https://x.com/C3Heditor/status/2037270352242348277",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats Have Invited Non-Citizens Into US Elections on at Least Twenty-Two Occasions",
    "tinyUrl": "https://tinyurl.com/yzp4jxnn",
    "xPostUrl": "https://x.com/C3Heditor/status/2037268323386134935",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "The Anti-AmericanFirst Platform: Illegal Aliens Are \u2018The People We Care About Most\u2019, per U.S. Democrat Senator",
    "tinyUrl": "https://tinyurl.com/n9fh6aze",
    "xPostUrl": "https://x.com/C3Heditor/status/2037265068157448595",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Unprovoked California Violence: Democrat Homeless Advocate Gets Her Jaw Shattered In Pipe Attack At LA Encampment",
    "tinyUrl": "https://tinyurl.com/62pxuhsh",
    "xPostUrl": "https://x.com/C3Heditor/status/2037262880949616760",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats Say The Darnedest (& Dumbest) Things: Chinese Spying at Universities a \u2018Xenophobic Conspiracy Theory\u2019",
    "tinyUrl": "https://tinyurl.com/29vyr7d5",
    "xPostUrl": "https://x.com/C3Heditor/status/2037259221050269923",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Tax-Payer Funded NPR Bashes GOP Islamophobia While Ignoring Islamic Violence & Democrat Anti-Semitism",
    "tinyUrl": "https://tinyurl.com/37tc6rth",
    "xPostUrl": "https://x.com/C3Heditor/status/2037233814993252679",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "At Democrat-Run San Jose State Graffiti Calls for Erasing Jews and Tells Students to Make Osama Proud",
    "tinyUrl": "https://tinyurl.com/ybnu3nnp",
    "xPostUrl": "https://x.com/C3Heditor/status/2037232986551107590",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Texas U.S. Senate Democrat candidate insults American students by ranking them below illegal aliens",
    "tinyUrl": "https://tinyurl.com/bdwzezu2",
    "xPostUrl": "https://x.com/C3Heditor/status/2037231998163390681",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "The Crying Clown Caucus: Democrat Presidential Hopefuls Lean Into Childhood Trauma to Win Voters Over",
    "tinyUrl": "https://tinyurl.com/yc3za2yn",
    "xPostUrl": "https://x.com/C3Heditor/status/2037228375253627128",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Ex-Biden Staffer Rips Democrat-Run Cities for Spiraling Into Chaos: 'Is This a Joke?'",
    "tinyUrl": "https://tinyurl.com/3s8xyptj",
    "xPostUrl": "https://x.com/C3Heditor/status/2037210537151410672",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "University of Kentucky Staff Gave to Democrats Over Republicans at a Nearly 10-to-1 Rate",
    "tinyUrl": "https://tinyurl.com/3f8hnudd",
    "xPostUrl": "https://x.com/C3Heditor/status/2037209864909267130",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats' Antifa Storm-Troopers Convicted for Storming Texas ICE Facility & Shooting Cop",
    "tinyUrl": "https://tinyurl.com/2wx2269v",
    "xPostUrl": "https://x.com/C3Heditor/status/2037208984667529239",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "NYC Council Democrats Hatch a Bozo-Plan to Micro-Manage Supermarket Self-Checkout Lines",
    "tinyUrl": "https://tinyurl.com/3rzh3m9s",
    "xPostUrl": "https://x.com/C3Heditor/status/2037207991649230971",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Chicago Economics' Doesn't Mean What It Used To: Democrats Think Raising the Hotel Tax Is the Way to Bring More Tourists In",
    "tinyUrl": "https://tinyurl.com/yc3u3pck",
    "xPostUrl": "https://x.com/C3Heditor/status/2037206816459747449",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "From Rolling Stone to NYT: Editor Accused of Shielding Friend in Child Porn Raid Story Lands Opinion Gig",
    "tinyUrl": "https://tinyurl.com/yu7p5j8u",
    "xPostUrl": "https://x.com/C3Heditor/status/2037204725586632995",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "White-Priviledged, Democrat-Controlled School District Tells SCOTUS to Butt Out of Their Fight With Mom Over Her Girl's Gender Switch",
    "tinyUrl": "https://tinyurl.com/3jj7vhau",
    "xPostUrl": "https://x.com/C3Heditor/status/2037202876435444136",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "What TX Democrat Senate Hopeful Delivered From the Pulpit Wasn't Christianity \u2014 Heresy Is More Accurate",
    "tinyUrl": "https://tinyurl.com/msewf22",
    "xPostUrl": "https://x.com/C3Heditor/status/2037199706351161440",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "TSA Workers Forced To Sell Own Blood to Survive as the Democrat Shutdown Drags On",
    "tinyUrl": "https://tinyurl.com/mvkebraf",
    "xPostUrl": "https://x.com/C3Heditor/status/2037198532537409550",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats Hate Americans: Air Travelers Are Being Held Hostage by Dems Who Still Refuse Funding of DHS",
    "tinyUrl": "https://tinyurl.com/mwpnytde",
    "xPostUrl": "https://x.com/C3Heditor/status/2037197413698412798",
    "page": 38,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Whistleblower: Lack of Govt Oversight Turned Democrat Governed Minnesota Into a Fraud Paradise",
    "tinyUrl": "https://tinyurl.com/ymtd8vnh",
    "xPostUrl": "https://x.com/C3Heditor/status/2037173763578515583",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "In Democrat-Run Arizona, Mexican Illegal Alien Teen Kills A Beloved Grandma But only Gets a Slap-on-the-Wrist Sentence",
    "tinyUrl": "https://tinyurl.com/3ku8t2mv",
    "xPostUrl": "https://x.com/C3Heditor/status/2037172642579407134",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Gov. Newsom Tries To Blame Trump for High CA Energy Costs \u2014 It Doesn't Go Well",
    "tinyUrl": "https://tinyurl.com/4mcesyeh",
    "xPostUrl": "https://x.com/C3Heditor/status/2037170480126300246",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Pacific Northwest Progressives Are Quietly Waging a War Against Democratic Norms",
    "tinyUrl": "https://tinyurl.com/m2ypenaa",
    "xPostUrl": "https://x.com/C3Heditor/status/2037169140364947712",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Another Vulgar Democrat: Candidate who ran \u2018F*ck Trump\u2019 ad wins senate primary",
    "tinyUrl": "https://tinyurl.com/3ttw6s29",
    "xPostUrl": "https://x.com/C3Heditor/status/2037168195635667289",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Mamdani's Democrat Policies Force a Beloved NYC Preschool to Jack Up Its Annual Tuition to $36,000",
    "tinyUrl": "https://tinyurl.com/22yhmj9c",
    "xPostUrl": "https://x.com/C3Heditor/status/2037165751396618481",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats Already Plotting Investigations of Companies & Law Firms That Aided Trump",
    "tinyUrl": "https://tinyurl.com/2upb258j",
    "xPostUrl": "https://x.com/C3Heditor/status/2037164740586164495",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "What A Surprise! Obama Delivered a Race-Baiting Eulogy at the Funeral of a Lifelong Democrat Race Hustler",
    "tinyUrl": "https://tinyurl.com/3xkzc2r5",
    "xPostUrl": "https://x.com/C3Heditor/status/2037163390678810794",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Another Case of Democrat Ugliness: Candidate for Congress Makes a Disgusting Sex Remark Targeting Melania Trump",
    "tinyUrl": "https://tinyurl.com/3524cxz2",
    "xPostUrl": "https://x.com/C3Heditor/status/2037162482456809805",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Culture: Trans Woman in a Blues Brothers Costume Allegedly Murders a Millionaire Developer in LA",
    "tinyUrl": "https://tinyurl.com/y2s4dwsy",
    "xPostUrl": "https://x.com/C3Heditor/status/2037149461219049747",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "California Democrat Introduces a Bill to Officially Add Two New Muslim State Holidays",
    "tinyUrl": "https://tinyurl.com/54cszwxk",
    "xPostUrl": "https://x.com/C3Heditor/status/2037148154655637630",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Leave It To A Muslim Democrat To Ruin a Christian Celebration: On St. Patrick's Day Mayor Mamdani Invokes Palestinian 'Genocide'",
    "tinyUrl": "https://tinyurl.com/mpvuanxc",
    "xPostUrl": "https://x.com/C3Heditor/status/2037147188510253112",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "LA's Taxpayer-Funded Homeless Hotel Blasted as a Democrat Boondoggle With $625K Rooms",
    "tinyUrl": "https://tinyurl.com/ypzhdkhh",
    "xPostUrl": "https://x.com/C3Heditor/status/2037145345239445682",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Gettyburg's #1 LGBTQ Promoter/Democrat Mayor Arrested and Charged With Child Sex Crimes",
    "tinyUrl": "https://tinyurl.com/2s3z9vvd",
    "xPostUrl": "https://x.com/C3Heditor/status/2037161576013213745",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Result of Voting For Democrats: VA Dems Push Sweeping Gun Bans To Strip Citizens of Right To Self-Defense",
    "tinyUrl": "https://tinyurl.com/598jntme",
    "xPostUrl": "https://x.com/C3Heditor/status/2037142591754457361",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "FakeNews 24/7/365: MS NOW Gets Caught Mislabeling a Lifelong Segregationist Democrat as a Republican",
    "tinyUrl": "https://tinyurl.com/mr4dk9df",
    "xPostUrl": "https://x.com/C3Heditor/status/2037141569845756204",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats-In-Action: Biden Judge Boots Top NJ Prosecutor From Child Porn Hearing in Tantrum Over Trump Picks",
    "tinyUrl": "https://tinyurl.com/yrkwst2h",
    "xPostUrl": "https://x.com/C3Heditor/status/2037140920240398440",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Half A Century Later the Democrats' Giant Spool of Red Tape Delays Finally Unravels For Nuke Energy",
    "tinyUrl": "https://tinyurl.com/3brhaae2",
    "xPostUrl": "https://x.com/C3Heditor/status/2036926898324869401",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Woke Women Are Twerking on ICE Agents to Defend Gang Members \u2014 Welcome to Democrats' Clown World 2026",
    "tinyUrl": "https://tinyurl.com/23z9fs8a",
    "xPostUrl": "https://x.com/C3Heditor/status/2036924522293514725",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "California Democrat Celebrity Gobsmacked When Told His Own State Bans Voter ID Requirements",
    "tinyUrl": "https://tinyurl.com/mr3jxc2r",
    "xPostUrl": "https://x.com/C3Heditor/status/2036923115373056272",
    "page": 39,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "NYC Democrat Mayor Mamdani Pushes to Slash Estate Tax Exemption From $7M to $750K in Major Tax Hike",
    "tinyUrl": "https://tinyurl.com/y4rbrsca",
    "xPostUrl": "https://x.com/C3Heditor/status/2036921171321532503",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats During Biden's Term Released At Least 729 Illegal Iranians Into The U.S.\u2014 how many are terrorists?",
    "tinyUrl": "https://tinyurl.com/mstuyzsn",
    "xPostUrl": "https://x.com/C3Heditor/status/2036920314240684119",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Two Illegals Who Entered on Democraty Biden's Open Invite Arrested After a Florida Machete Attack",
    "tinyUrl": "https://tinyurl.com/ym434vvu",
    "xPostUrl": "https://x.com/C3Heditor/status/2036916320302780513",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Equity Hypocrisy: Obama's Chicago Center Recruits 100 Unpaid Volunteers While His Democrat Crony Collects a $740K Salary",
    "tinyUrl": "https://tinyurl.com/9fxwfcau",
    "xPostUrl": "https://x.com/C3Heditor/status/2036915142928027969",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Economic Stupidity Beyond Comprehension: Governor Told Wealthy To Leave and Now Begs For Their Return",
    "tinyUrl": "https://tinyurl.com/mupttvnc",
    "xPostUrl": "https://x.com/C3Heditor/status/2036887009046737405",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Fear and Misery Are the Only Things the Democrat Party Has Left to Offer American Voters",
    "tinyUrl": "https://tinyurl.com/yxkf77tw",
    "xPostUrl": "https://x.com/C3Heditor/status/2036885768069697551",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Nepo-Baby Nazi-Tattooed Dem Senate Candidate Decries \\'Anti-Semitism,\\' Claims \\'Anti-Trans\\' Agenda Cooked Up By \\'Billionaires\\'",
    "tinyUrl": "https://tinyurl.com/yeu9exjr",
    "xPostUrl": "https://x.com/C3Heditor/status/2036884964336095614",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Rapist Who Got His Stepdaughter Pregnant Could Walk Free Under Democrat Gov. Newsom's New Law",
    "tinyUrl": "https://tinyurl.com/zmfmx6zr",
    "xPostUrl": "https://x.com/C3Heditor/status/2036879876037189632",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "U.S. House Drops a Report Documenting How Democrat-Run American Colleges Have Become Antisemitic Hotbeds",
    "tinyUrl": "https://tinyurl.com/4sw54t4m",
    "xPostUrl": "https://x.com/C3Heditor/status/2036878957501440335",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Partisan-Judge Frees a 4-Time-Deported MS-13 Gang Member With a Documented Rape History",
    "tinyUrl": "https://tinyurl.com/vzmurw8c",
    "xPostUrl": "https://x.com/C3Heditor/status/2036877354601992250",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Stuck-On-Stupid: Democrat AZ Governor Works to Undermine a Conservative & Successful, PETA-Pleasing Conservation Win",
    "tinyUrl": "https://tinyurl.com/yu9u45cn",
    "xPostUrl": "https://x.com/C3Heditor/status/2036846215875137991",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Minnesota Democrats Pass Harsh Gun Laws After Silencing the State's Largest Gun Rights Group",
    "tinyUrl": "https://tinyurl.com/4w34nv94",
    "xPostUrl": "https://x.com/C3Heditor/status/2036844792278061400",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Result of Democrats' Immigration Policies: Texas Bar Shooter's Home Harbored a Full Iran Shrine With Regime Flags & Leader Photos",
    "tinyUrl": "https://tinyurl.com/628es7cn",
    "xPostUrl": "https://x.com/C3Heditor/status/2036842656542712313",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Hidden Camera Footage Blows the Lid Off a Deliberate California Democrat Election Fraud Operation",
    "tinyUrl": "https://tinyurl.com/4d2xx5tu",
    "xPostUrl": "https://x.com/C3Heditor/status/2036841871352254522",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Senate Hopeful Peddled Left-Wing Politics on Sixth Graders While a School Teacher",
    "tinyUrl": "https://tinyurl.com/8xa59be2",
    "xPostUrl": "https://x.com/C3Heditor/status/2036840957161718199",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "VA Democrat Concedes His Party's Election Rigging Plan for Virginians Is Wrong \u2014 Yet Backs It",
    "tinyUrl": "https://tinyurl.com/yfbjh7fh",
    "xPostUrl": "https://x.com/C3Heditor/status/2036839826041782517",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Even In Democrat One-Party California Children Have Free Speech Rights To Say 'All Lives Matter'",
    "tinyUrl": "https://tinyurl.com/4uxw4tsm",
    "xPostUrl": "https://x.com/C3Heditor/status/2036838338858999992",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Americans Favor an Age Cap for Lawmakers as Democrats Quietly Seethe Over Maxine Waters Running at 87",
    "tinyUrl": "https://tinyurl.com/y7at77mn",
    "xPostUrl": "https://x.com/C3Heditor/status/2036837472642986351",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Another Democrat Illegal Alien: Tren de Aragua's Leader 'El Turko' Nabbed in LA on Murder & Kidnapping Charges",
    "tinyUrl": "https://tinyurl.com/3xxj5j5v",
    "xPostUrl": "https://x.com/C3Heditor/status/2036804509826257374",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Incompetence or Purposeful? Los Angeles Exposed for Running a Massive Hospice Fraud Scheme",
    "tinyUrl": "https://tinyurl.com/r5znwpm2",
    "xPostUrl": "https://x.com/C3Heditor/status/2036803605467185303",
    "page": 40,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Even After All The Failed Billions In $$$ Expenditures, Democrats Still Believe That Throwing Money at Public Schools Will Fix the Literacy",
    "tinyUrl": "https://tinyurl.com/zcnbdv2r",
    "xPostUrl": "https://x.com/C3Heditor/status/2036795889918849461",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "California Under Democrat Gov. Newsom Is Openly Looting Its Own Medicaid Program in Broad Daylight",
    "tinyUrl": "https://tinyurl.com/2c36cs8t",
    "xPostUrl": "https://x.com/C3Heditor/status/2036794652184265142",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats Move to Censure GOP Rep for Muslim Remarks While Cheering a U.S. Senate Hopeful Who Hates Whites",
    "tinyUrl": "https://tinyurl.com/5dcvrf7r",
    "xPostUrl": "https://x.com/C3Heditor/status/2036793961441071583",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "GOP Rep Exposes Democrat Biden Administration's DEI Spending That Included Making Federal Maps 'More Gay'",
    "tinyUrl": "https://tinyurl.com/bd9dwmz3",
    "xPostUrl": "https://x.com/C3Heditor/status/2036792891545423937",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "California Democrats Breed AntiSemitic Hatred: These Thugs Had Plans",
    "tinyUrl": "https://tinyurl.com/4ramw2cc",
    "xPostUrl": "https://x.com/C3Heditor/status/2036791777366057358",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats Want To Replace Blue-Collar Americans With Low-Wage Aliens Who Are Temporary-Protected-Status Holders",
    "tinyUrl": "https://tinyurl.com/2v6dfzuk",
    "xPostUrl": "https://x.com/C3Heditor/status/2036790125154210033",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "After Israel Takes Him Out, NYT's Democrat Propagandist Nicholas Kristof Mourns Iranian Butcher as a Peace Partner",
    "tinyUrl": "https://tinyurl.com/mwz3suyp",
    "xPostUrl": "https://x.com/C3Heditor/status/2036787781750435853",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Shutdown Drives Out 450+ TSA Officers and Continues Chaos For Air Travelers",
    "tinyUrl": "https://tinyurl.com/uapdb68t",
    "xPostUrl": "https://x.com/C3Heditor/status/2036786302016782676",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrat Mayor Mamdani's Embrace of Extremism Is Normalizing Radicalism in Post-9/11 NYC",
    "tinyUrl": "https://tinyurl.com/t8vjrjnt",
    "xPostUrl": "https://x.com/C3Heditor/status/2036784693526270213",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Result of Democrat Immigration Policies: 4 MS-13 Illegal Aliens Indicted for Murdering a 14-Year-Old",
    "tinyUrl": "https://tinyurl.com/2mnjxx6m",
    "xPostUrl": "https://x.com/C3Heditor/status/2036783286073090515",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "No One Is Surprised, Except Democrats - Every Recent Terrorist Attack in America Shares One Unmistakable Common Thread",
    "tinyUrl": "https://tinyurl.com/39e4nwh8",
    "xPostUrl": "https://x.com/C3Heditor/status/2036781152392892762",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Feds Challenge School District Run by Democrats That Is Handing Girls' Sports Slots to Trans Athletes",
    "tinyUrl": "https://tinyurl.com/2ykzd3wa",
    "xPostUrl": "https://x.com/C3Heditor/status/2036779671078007129",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Democrats' Gun Control's True Endgame Has Always Been Stripping Every Last American of Every Gun",
    "tinyUrl": "https://tinyurl.com/2zus86mp",
    "xPostUrl": "https://x.com/C3Heditor/status/2036778351868719424",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "53 U.S. House Vote to Erase Iran's Official Terror Sponsor Designation",
    "tinyUrl": "https://tinyurl.com/2hu3s9s8",
    "xPostUrl": "https://x.com/C3Heditor/status/2036777387543671060",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Homeless Man In Democrat-Run California Chases Down a Mother and Daughter Before Savagely Beating Them Both",
    "tinyUrl": "https://tinyurl.com/apxxbxny",
    "xPostUrl": "https://x.com/C3Heditor/status/2036776023920869553",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Minneapolis Mayor Tells Trump to Hire More TSA \u2014 Oblivious That the Dem Shutdown Bars That",
    "tinyUrl": "https://tinyurl.com/3mp62wj5",
    "xPostUrl": "https://x.com/C3Heditor/status/2036566666466009452",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Irresponsible Democrats Stopping America's Primary National Security Department Efforts While Simultaneously Blaming Trump for Terror Threats",
    "tinyUrl": "https://tinyurl.com/38bmjtr9",
    "xPostUrl": "https://x.com/C3Heditor/status/2036564997032259851",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Biden Released the Illegal Alien who Murdered Student in Chicago and Democrat Gov. JB Pritzker Blames Trump",
    "tinyUrl": "https://tinyurl.com/ms6h2m83",
    "xPostUrl": "https://x.com/C3Heditor/status/2036562963298181373",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Taxpayer Funds of $400M for Democrats' NYC 'Ghost' Schools That Were Never Opened",
    "tinyUrl": "https://tinyurl.com/2u6aepj5",
    "xPostUrl": "https://x.com/C3Heditor/status/2036560519038116126",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Arizona Democrat Senator Tried Lying About Trump and Iran on CNN \u2014 the Host Castrates His Story on Air",
    "tinyUrl": "https://tinyurl.com/bdfktbs6",
    "xPostUrl": "https://x.com/C3Heditor/status/2036559291315003502",
    "page": 41,
    "batchDate": "Mar 26, 2026"
  },
  {
    "headline": "Voter Backlash Incoming: TX Democrat Candidate For U.S. Senate Demands Texans Stop Eating Meat",
    "tinyUrl": "https://tinyurl.com/448n9yts",
    "xPostUrl": "https://x.com/C3Heditor/status/2036526071240409235",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Controlled LA School District Hid Student's Gender Switch \u2014 Family Now Suing After Teen's Suicide",
    "tinyUrl": "https://tinyurl.com/mw7bt8er",
    "xPostUrl": "https://x.com/C3Heditor/status/2036524286006141378",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "There Is No Other Way to Say It: The Democrat Party Has Gone on an All-Out Taxing Binge",
    "tinyUrl": "https://tinyurl.com/2fan6vb4",
    "xPostUrl": "https://x.com/C3Heditor/status/2036522970450108788",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats 'GetTrump!' Dream-Team: Mueller Team Drank on the Job, Doctored Records & Broke Security Rules",
    "tinyUrl": "https://tinyurl.com/47ncpf37",
    "xPostUrl": "https://x.com/C3Heditor/status/2036521586858270804",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Preserving My Sanity Required Walking Away From California's Democrat Party for Good",
    "tinyUrl": "https://tinyurl.com/2s4bfj5j",
    "xPostUrl": "https://x.com/C3Heditor/status/2036445329093173578",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Lies Are 2nd Nature For Democrats: Congressional Staffer Falsely Claimed to Be an Immigration Attorney on 11 Occasions",
    "tinyUrl": "https://tinyurl.com/3sexjhb4",
    "xPostUrl": "https://x.com/C3Heditor/status/2036444278512406673",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Fringe-Loon Democrat Influencer Melts Down Because Joe Biden Did Not Launch a Full Purge of America's Conservatives",
    "tinyUrl": "https://tinyurl.com/4vn2dv77",
    "xPostUrl": "https://x.com/C3Heditor/status/2036442651009098075",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Defunded TSA Workers \u2014 Now ICE Agents Are In The Airports Instead - Enjoy the Irony",
    "tinyUrl": "https://tinyurl.com/3tkcakh5",
    "xPostUrl": "https://x.com/C3Heditor/status/2036441408341680260",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "A Texas Democrat Congressional Candidate: Made denigrating comments about male homosexuals",
    "tinyUrl": "https://tinyurl.com/f6a25s95",
    "xPostUrl": "https://x.com/C3Heditor/status/2036440121323696532",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Trump Prosecutors Keep Getting Tossed by Federal Democrat-Partisan Judges, Stoking Judicial Impartiality Concerns",
    "tinyUrl": "https://tinyurl.com/mpssves2",
    "xPostUrl": "https://x.com/C3Heditor/status/2036438367106375787",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Result of Democrats' Illegal Alien Policies: Family's Murder Suspect - A Salvadoran Gang Member",
    "tinyUrl": "https://tinyurl.com/5t2ehuf4",
    "xPostUrl": "https://x.com/C3Heditor/status/2036436719533478183",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Dismantling Criminal Gangs': DHS Has Arrested Thousands of Democrats' Open-Border Illegal Migrant Gangbangers",
    "tinyUrl": "https://tinyurl.com/4fk87hbh",
    "xPostUrl": "https://x.com/C3Heditor/status/2036427106804973769",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats' DHS Shutdown Is 'Absolute Insanity' \u2014 Travelers Line Up Outside Atlanta Airport",
    "tinyUrl": "https://tinyurl.com/ytbrpkmk",
    "xPostUrl": "https://x.com/C3Heditor/status/2036425662999794035",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Nobody Believes Democrat Gov. Newsom's Outlandish Lie That CA Taxes Are Lower Than Those In TX & FL",
    "tinyUrl": "https://tinyurl.com/yc9t82v7",
    "xPostUrl": "https://x.com/C3Heditor/status/2036424857861165560",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Masked U.S. Senate Candidate Believes Veganism Is The Path To Texas Voters Hearts",
    "tinyUrl": "https://tinyurl.com/5eakkczt",
    "xPostUrl": "https://x.com/C3Heditor/status/2036423377712230751",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Prelude To Seizure: Democrats Claim a Foiled Terror Plot Proves Americans Shouldn't Be Allowed to Own Guns",
    "tinyUrl": "https://tinyurl.com/59rbj5h6",
    "xPostUrl": "https://x.com/C3Heditor/status/2036421395467374986",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Ohio Democrat Governor Hopeful Is A 'Dr. Lockdown' COVID Tyrannical Authoritarian",
    "tinyUrl": "https://tinyurl.com/y8b3uwts",
    "xPostUrl": "https://x.com/C3Heditor/status/2036417585583988906",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Giant Spectacular Failure per Survey: The Democrats' Voter ID Messaging",
    "tinyUrl": "https://tinyurl.com/ysunrp43",
    "xPostUrl": "https://x.com/C3Heditor/status/2036416326667841729",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats' Energy Betrayal: Tax American Workers and Route Every Subsidy Dollar to Beijing",
    "tinyUrl": "https://tinyurl.com/3y48ry9a",
    "xPostUrl": "https://x.com/C3Heditor/status/2036413816108368205",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Illinois Democrat Governor Jets to MN to Mourn ICE Victims but Won't Speak on Chicago's Illegal Alien Murder",
    "tinyUrl": "https://tinyurl.com/4yxvet3z",
    "xPostUrl": "https://x.com/C3Heditor/status/2036411952319037830",
    "page": 42,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Self-Exposing: Democrat Lies About The SAVE Act Are So Lame They're Racist",
    "tinyUrl": "https://tinyurl.com/yd8tnty9",
    "xPostUrl": "https://x.com/C3Heditor/status/2036092520845746282",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Virginia County Democrat Officials Refuse to Hand Over To Feds The Illegal Alien Who Sexually Abused Multiple Students",
    "tinyUrl": "https://tinyurl.com/4vrpfpwd",
    "xPostUrl": "https://x.com/C3Heditor/status/2036091131440644468",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Idiocracy Favorite, Democrat Jasmine Crockett: Her Fake Security Guard Gets Gunned Down by a SWAT Team in Dallas",
    "tinyUrl": "https://tinyurl.com/jx63xntc",
    "xPostUrl": "https://x.com/C3Heditor/status/2036090006108840154",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Black Voters Deserve Better Than Democrat Newsom's Condescending 'I'm as Dumb as You Are' Pandering",
    "tinyUrl": "tinyurl.com/43z4vntn",
    "xPostUrl": "https://x.com/C3Heditor/status/2030753090811367808",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Black Voters Deserve Better Than Democrat Biden's Boast That He's Smarter Than All of Them",
    "tinyUrl": "http://tinyurl.com/mrt6fa9a #FtrDLS",
    "xPostUrl": "https://x.com/C3Heditor/status/2030753395527618644",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Coming To Your State Soon: VA Democrats Push Sweeping Gun Control Less Than Month Into Their Legislative Term",
    "tinyUrl": "https://tinyurl.com/m67cnt39",
    "xPostUrl": "https://x.com/C3Heditor/status/2036088603273478562",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Las Vegas Housing Complex Descends Into Typical Democrat Mad-Max Chaos As Crazed Vagrants Take Control",
    "tinyUrl": "https://tinyurl.com/4u3zc2d3",
    "xPostUrl": "https://x.com/C3Heditor/status/2036087042082230700",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Chicago's Democrat-Run Teachers Union Pushes to Shut Down Their Lousy Education Facilities May 1st As A Trump Protest",
    "tinyUrl": "https://tinyurl.com/wv26nwbe",
    "xPostUrl": "https://x.com/C3Heditor/status/2036085341375897918",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "NY Democrat AG James Forces a Hospital to Resume Gender-Transition Treatments for Underage Patients",
    "tinyUrl": "https://tinyurl.com/3ddurt4b",
    "xPostUrl": "https://x.com/C3Heditor/status/2030758532530774329",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "SCOTUS Tells Activist Lower Courts to Stop Ignoring a Century of Settled Parental Rights Precedents",
    "tinyUrl": "https://tinyurl.com/ywuncrtm",
    "xPostUrl": "https://x.com/C3Heditor/status/2030760174663700600",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Openly Accuse Fellow Democrats of Rigging Their Own Party's Primary Contests",
    "tinyUrl": "https://tinyurl.com/32zfu4c7",
    "xPostUrl": "https://x.com/C3Heditor/status/2030760767687979313",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Harvard Poll Hands Democrats a Brutal Reality Check on Their Midterm Blue Wave Fantasies",
    "tinyUrl": "https://tinyurl.com/5xebjahw",
    "xPostUrl": "https://x.com/C3Heditor/status/2030764272175747257",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Foot-Soldier: Idaho Illegal Alien Busted by ICE for Allegedly Trafficking Children Into State as Labor",
    "tinyUrl": "https://tinyurl.com/8rhekhc2",
    "xPostUrl": "https://x.com/C3Heditor/status/2030766132190146754",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats' Hellhole: Ex-Con Squatter in Posh NYC Building Threatens Neighbors and Stashes Gas Cans in the Hall",
    "tinyUrl": "https://tinyurl.com/mfdbp6k4",
    "xPostUrl": "https://x.com/C3Heditor/status/2030767065317990889",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Minnesota Democrat Gov. Tim Walz Humiliated Over The 34,200% Autism Spending Spike He Can't Explain",
    "tinyUrl": "https://tinyurl.com/58vub6tb",
    "xPostUrl": "https://x.com/C3Heditor/status/2030768102489632781",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Party Platform, Soon: Strip Elderly of Their Assets",
    "tinyUrl": "https://tinyurl.com/d4wc5awx",
    "xPostUrl": "https://x.com/C3Heditor/status/2036082515044188580",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Washington Post Whines That Republicans Keep Accurately Calling Democrat James Talarico a Radical",
    "tinyUrl": "https://tinyurl.com/5ytzm98r",
    "xPostUrl": "https://x.com/C3Heditor/status/2036080760118039013",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "A Yogurt Shop Near Spokane Is Getting Death Threats From Activists Over Its Tribute to Charlie Kirk",
    "tinyUrl": "https://tinyurl.com/35m88fjj",
    "xPostUrl": "https://x.com/C3Heditor/status/2030768992344764883",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Immigration Policies: Illegal Alien Student, 18, Charged With Groping 12 Virginia Female Classmates",
    "tinyUrl": "https://tinyurl.com/mryphb2b",
    "xPostUrl": "https://x.com/C3Heditor/status/2036079922112766432",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "7th Circuit Slaps Down Chicago Partisan-Democrat Judge's Constitutionally Suspect Orders Targeting Trump",
    "tinyUrl": "https://tinyurl.com/mtwmvdtj",
    "xPostUrl": "https://x.com/C3Heditor/status/2036078275714269466",
    "page": 43,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "As Iranian Terrorism Risk Grows, Democrats Humiliate Themselves Over DHS Funding",
    "tinyUrl": "https://tinyurl.com/mu8vpczb",
    "xPostUrl": "https://x.com/C3Heditor/status/2036076639398867230",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Long-Time Democrat Hero Cesar Chavez Is Now Too Toxic Even For The Left Left As UFW Drops Him Over Sexual Misconduct Claims",
    "tinyUrl": "https://tinyurl.com/465h8ekz",
    "xPostUrl": "https://x.com/C3Heditor/status/2036073337521144300",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Left-Wing MA Governor Builds an Online Snitch Portal For Democrat Residents To Report ICE Agents",
    "tinyUrl": "https://tinyurl.com/my5kf337",
    "xPostUrl": "https://x.com/C3Heditor/status/2036071849067499702",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Elitist Democrat Senator Destroyed for Unhinged Reply When a Teenage Girl Fights to Keep Men Off Her Team",
    "tinyUrl": "https://tinyurl.com/257vtznc",
    "xPostUrl": "https://x.com/C3Heditor/status/2036070096158802026",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "VIP Seat-Stealing, Privileged-Democrat Texas Judge Gets Booted From the Rodeo for the Second Time",
    "tinyUrl": "https://tinyurl.com/mwjuv7t9",
    "xPostUrl": "https://x.com/C3Heditor/status/2036069232086077555",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Allowed Convicted ISIS Terrorist Back On Old Dominion University Campus To Kill",
    "tinyUrl": "https://tinyurl.com/ykescbzw",
    "xPostUrl": "https://x.com/C3Heditor/status/2036067085403504849",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "For Years Democrats Have Blocked Armed Guards At Public Schools \u2014 Armed Security Just Stopped a Synagogue Massacre",
    "tinyUrl": "https://tinyurl.com/mr2mzy5n",
    "xPostUrl": "https://x.com/C3Heditor/status/2036064969620422978",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Why of course! Democrat Mayor Mamdani Believes A Critical Need For NYC Is Establishing A LGBTQIA+ Office",
    "tinyUrl": "https://tinyurl.com/3b49ukf5",
    "xPostUrl": "https://x.com/C3Heditor/status/2036063900655861835",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Congressional Democrat Hopeful Faces Major Scandal After a Jeopardy Contestant Accuses Him of Sexual Inappropriateness",
    "tinyUrl": "https://tinyurl.com/2ctk8vnu",
    "xPostUrl": "https://x.com/C3Heditor/status/2036059286829224164",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat-Run Sanctuary Seattle Moves to Widen Its Defiance of Federal Immigration Enforcement",
    "tinyUrl": "https://tinyurl.com/4cxs86ud",
    "xPostUrl": "https://x.com/C3Heditor/status/2036060117687255090",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Nancy Guthrie's Bumbling Democrat Sheriff Now Faces Being Fired by Outraged Arizona Locals",
    "tinyUrl": "https://tinyurl.com/5yffkun2",
    "xPostUrl": "https://x.com/C3Heditor/status/2036057266848157785",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat LA Council Chief Who Wept Racism Over a Traffic Stop Exposed as a Colossal Hypocrite",
    "tinyUrl": "https://tinyurl.com/3nc29evf",
    "xPostUrl": "https://x.com/C3Heditor/status/2036058011983081631",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Gay Democrat Mayor Faces 'Child Sex Crime' Arrest in a Case That Is Rocking His Community",
    "tinyUrl": "https://tinyurl.com/njv4m396",
    "xPostUrl": "https://x.com/C3Heditor/status/2036055476526301510",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Diversity: FBI Busts 10 Indian Nationals for Running Armed Robberies as Cover for a Visa Fraud Ring",
    "tinyUrl": "https://tinyurl.com/22b9kt5d",
    "xPostUrl": "https://x.com/C3Heditor/status/2036048775580405848",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "U.S. Senate Keep Ruining Air Travel for Everyone \u2014 Here Is the Clear and Simple Reason Why",
    "tinyUrl": "https://tinyurl.com/3cy3b2y2",
    "xPostUrl": "https://x.com/C3Heditor/status/2035838639108673822",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Partisan-Judge Attempts To Stop Investigation of Fed Chair's Incompetence",
    "tinyUrl": "https://tinyurl.com/b2xcsmrp",
    "xPostUrl": "https://x.com/C3Heditor/status/2035837803787907084",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Uber's Billionaire Co-Founder Joinsd the Growing Exodus Out of Democrat-Controlled California",
    "tinyUrl": "https://tinyurl.com/4f7xwxsd",
    "xPostUrl": "https://x.com/C3Heditor/status/2035836332279209991",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democats New-Wave Economist: Jemele Hill's Wild Claim That Blue Collar Jobs Are a Secret Plot to Keep Poor People Down",
    "tinyUrl": "https://tinyurl.com/248sbd6j",
    "xPostUrl": "https://x.com/C3Heditor/status/2035835698264084849",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "A Prominent White Liberal Democrat's New Dream Is to Escape America for Super-White Switzerland",
    "tinyUrl": "https://tinyurl.com/2xs5bf95",
    "xPostUrl": "https://x.com/C3Heditor/status/2035833404374016452",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Just How Revolting Are the Democrats? This Latest Episode Makes the Answer Brutally Clear",
    "tinyUrl": "tinyurl.com/47k8uzbh",
    "xPostUrl": "https://x.com/C3Heditor/status/2035832328514056513",
    "page": 44,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Cutting The Democrat Bureaucracy: 250,000 Positions Cut As Trump Administration Reduces Federal Workforce",
    "tinyUrl": "https://tinyurl.com/5b7sk5f3",
    "xPostUrl": "https://x.com/C3Heditor/status/2028603510476947704",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Three Dem Senators Keep Putting Illegal Aliens Ahead of Their Own American Citizens",
    "tinyUrl": "https://tinyurl.com/jzvufttj",
    "xPostUrl": "https://x.com/C3Heditor/status/2028222260369109502",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Outrage Erupts After LA Confesses It Needs 270 Days Just to Fix a Single Streetlight",
    "tinyUrl": "https://tinyurl.com/3jnscpaa",
    "xPostUrl": "https://x.com/C3Heditor/status/2028223356944719912",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "CNN Staffers Are Panicking at the Prospect of Working Under a Trump-Friendly New Owner",
    "tinyUrl": "https://tinyurl.com/49a72zjs",
    "xPostUrl": "https://x.com/C3Heditor/status/2028224148825166269",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Facing a Bloated Budget Gap, Maryland Democrats Eye Raiding the State Green Energy Fund",
    "tinyUrl": "https://tinyurl.com/58ezbz5x",
    "xPostUrl": "https://x.com/C3Heditor/status/2028224801790136483",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Federal Contracts With Woke Anthropic AI Severed by the Trump Administration",
    "tinyUrl": "https://tinyurl.com/5afx5dnu",
    "xPostUrl": "https://x.com/C3Heditor/status/2028225587320402349",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Paramount Win: Vindictive Minority Democrat On Netflix Board Places Partisan CNN Hacks In Mortal Danger",
    "tinyUrl": "https://tinyurl.com/mua3bp46",
    "xPostUrl": "https://x.com/C3Heditor/status/2027772936556253588",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Storage Giant Becomes Latest Major Company Fleeing Democrat California's Hostile Business Climate",
    "tinyUrl": "https://tinyurl.com/35ttcezk",
    "xPostUrl": "https://x.com/C3Heditor/status/2028228421499711725",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Unhinged U.S. House Attempt to Shout Down Trump During State of Union Address Tuesday",
    "tinyUrl": "https://tinyurl.com/2axfbzh6",
    "xPostUrl": "https://x.com/C3Heditor/status/2028227690377916615",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Activitsts Vandalize Kennedy Center in a Targeted Rage Attack Over Trump's Renaming",
    "tinyUrl": "https://tinyurl.com/49pebjx3",
    "xPostUrl": "https://x.com/C3Heditor/status/2028229048061595702",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Immigration By Democrats: ICE Detainers Filed Against Illegal Aliens Who Beat, Sodomized Victim In Home Invasion",
    "tinyUrl": "https://tinyurl.com/5hzhybr5",
    "xPostUrl": "https://x.com/C3Heditor/status/2028230077608009775",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Three Democrat Area Michigan Public Schools Face Federal DOJ Scrutiny Over Gender Lessons and Bathrooms",
    "tinyUrl": "https://tinyurl.com/r776fdpj",
    "xPostUrl": "https://x.com/C3Heditor/status/2028231723423547456",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Better Than Democrat Fascism: CNN Fearmongers About Christian Nationalism",
    "tinyUrl": "https://tinyurl.com/2s2vne6m",
    "xPostUrl": "https://x.com/C3Heditor/status/2028233712337310185",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "It's The Case of Common Sense Versus Democrats' Crazy Radical Agenda",
    "tinyUrl": "https://tinyurl.com/5dcfm2ph",
    "xPostUrl": "https://x.com/C3Heditor/status/2028234786821533969",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat State Medicaid Expenditures Explode Nationwide as Fraud Scandals Proliferate",
    "tinyUrl": "https://tinyurl.com/3vw47xhx",
    "xPostUrl": "https://x.com/C3Heditor/status/2028235890493940022",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Unhinged Democrat Ugliness: Don Lemon's Wacky Rant Dismisses Patriotism as Tacky in Bewildering Commentary",
    "tinyUrl": "https://tinyurl.com/2vakrebk",
    "xPostUrl": "https://x.com/C3Heditor/status/2028236710908444877",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "FOIA Requests About Obama's Temple Obstructed by Illinois/Chicago Democrat Bureaucrats",
    "tinyUrl": "https://tinyurl.com/25m6cjf2",
    "xPostUrl": "https://x.com/C3Heditor/status/2028238059372703968",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Somali Women in Minnesota Seek Reparations From ICE for the Trauma of Enforcement",
    "tinyUrl": "https://tinyurl.com/ykunrzbu",
    "xPostUrl": "https://x.com/C3Heditor/status/2028226539372835234",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "This Is Nation's Future If Democrats Win: A Revenge Purge the Moment They Manage to Reclaim Power",
    "tinyUrl": "https://tinyurl.com/yte4ysaj",
    "xPostUrl": "https://x.com/C3Heditor/status/2028238889626820663",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Gotta Make BigPharma Happy: Democrat Newsom Hates MAHA When RFK Jr. Threatens Campaign Donors",
    "tinyUrl": "https://tinyurl.com/28stvn27",
    "xPostUrl": "https://x.com/C3Heditor/status/2028240323235684643",
    "page": 45,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Mamdani and AOC Face Backlash for Urging Illegals to Enroll in Free NYC Programs",
    "tinyUrl": "https://tinyurl.com/4n6sknny",
    "xPostUrl": "https://x.com/C3Heditor/status/2028241245659701264",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Virginia Economics: Democrats Give Themselves a Raise While Refusing to Eliminate \u2018the Most Hated Tax\u2019 in VA",
    "tinyUrl": "https://tinyurl.com/4ff9sur3",
    "xPostUrl": "https://x.com/C3Heditor/status/2028582248572658022",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Special Needs 6th Grader Abandoned & Forgotten by Democrats at a California Anti-ICE Walkout",
    "tinyUrl": "https://tinyurl.com/mr2b2td6",
    "xPostUrl": "https://x.com/C3Heditor/status/2028583283269746910",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Canceling This Anti-Lefty Comedian Only Made Him Bigger \u2014 More Shows & a Wave of New Fans",
    "tinyUrl": "https://tinyurl.com/mup87mwn",
    "xPostUrl": "https://x.com/C3Heditor/status/2028584065784308067",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Are Angry People: New Poll Surfaces Suggesting Link Between Transgender Identity & Shootings",
    "tinyUrl": "https://tinyurl.com/4s2t6ecp",
    "xPostUrl": "https://x.com/C3Heditor/status/2028585025525219730",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Single State of Union Moment Put Democrats On-The-Ropes For Midterm Elections",
    "tinyUrl": "https://tinyurl.com/b43jyuee",
    "xPostUrl": "https://x.com/C3Heditor/status/2028586459762999692",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Illinois Democrat Governor Makes Shocking Comparison: Trump's America Worse Than Nazi Germany",
    "tinyUrl": "https://tinyurl.com/mr8v2pe9",
    "xPostUrl": "https://x.com/C3Heditor/status/2028587352998937030",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "The Liberal Left Progressive Imbeciles of Canada Made Their Resource Rich Nation Poorer Than Alabama",
    "tinyUrl": "https://tinyurl.com/4cyfe987",
    "xPostUrl": "https://x.com/C3Heditor/status/2028588850151309670",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Live TV Moment: Reporter Catches Democrat LA Mayor Lying Outright About Pothole Repair Numbers",
    "tinyUrl": "https://tinyurl.com/yrezkbu7",
    "xPostUrl": "https://x.com/C3Heditor/status/2028589773674230243",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Blue State Democrat-Fascism: NY Teacher Punished Simply for Helping Students Form a TPUSA Club",
    "tinyUrl": "https://tinyurl.com/362hhuwj",
    "xPostUrl": "https://x.com/C3Heditor/status/2028590904332746955",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat-Psyop's Commentary Seen as Supporting Muslim Brotherhood Agenda",
    "tinyUrl": "https://tinyurl.com/2mhudjtu",
    "xPostUrl": "https://x.com/C3Heditor/status/2028592838213009878",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Tax & Spend Democrat Draws Fury for a $239M Plan to Give California's Worst Prison a Nordic Facelift",
    "tinyUrl": "https://tinyurl.com/bp5ktz7f",
    "xPostUrl": "https://x.com/C3Heditor/status/2028594128838070666",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Voters Stunned: Democrats Sit Silent Through Victories: Cheap Gas, Less Crime, and Lives Saved",
    "tinyUrl": "https://tinyurl.com/3pcj2x9j",
    "xPostUrl": "https://x.com/C3Heditor/status/2028595282871521553",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Corruption by Demcorat: Nonprofit Boss Caught with Trunk Full of Jewelry Faces Felony Fraud Charges",
    "tinyUrl": "https://tinyurl.com/4f8nz2kh",
    "xPostUrl": "https://x.com/C3Heditor/status/2028596546896286070",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats In Action: California Budget Allocates $35 Million in Taxpayer Funds to Aid Illegal Aliens",
    "tinyUrl": "https://tinyurl.com/y3dcfev7",
    "xPostUrl": "https://x.com/C3Heditor/status/2028597094047416600",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Unaffordability by Democrats: Gov. Pritzker's Social Media Fee Faces Legal Feasibility Doubts",
    "tinyUrl": "https://tinyurl.com/k59hued7",
    "xPostUrl": "https://x.com/C3Heditor/status/2028598047735681463",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Over Democrat Objections, English-Only CDL Exams Now Required for All Truckers Under New Mandate",
    "tinyUrl": "https://tinyurl.com/4628snd6",
    "xPostUrl": "https://x.com/C3Heditor/status/2028598756719960117",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Blue State Democrat-Fascism: Chicago Educator Terminated for Two-Word Pro-ICE Social Media Post, Files Lawsuit",
    "tinyUrl": "https://tinyurl.com/2yz9d9wf",
    "xPostUrl": "https://x.com/C3Heditor/status/2028599677638095074",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat-Run Catholic Chicago University Is Actively Promoting Pro-Trans Books for Kids",
    "tinyUrl": "https://tinyurl.com/bdjbvzp7",
    "xPostUrl": "https://x.com/C3Heditor/status/2028600156124270811",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Cultural Diversity by Democrats: Illegal Alien on Expired Visa Gets 18 Years for Masterminding $15M Elder Scam",
    "tinyUrl": "https://tinyurl.com/jfzsrpu2",
    "xPostUrl": "https://x.com/C3Heditor/status/2028601013876187527",
    "page": 46,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Why Democrats Election Fraud Will Continue: Because GOP RINOs Dog Parade Is More Important",
    "tinyUrl": "https://tinyurl.com/474fjp99",
    "xPostUrl": "https://x.com/C3Heditor/status/2027360575395704883",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "U.S. Democrat Senator Demands Photo ID at Rally But Rejects Voter Identification Requirements",
    "tinyUrl": "https://tinyurl.com/yc3zj2m9",
    "xPostUrl": "https://x.com/C3Heditor/status/2027358231408861662",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "U.S. Senate & RINOs Reject Poll Data: Two-Thirds of Americans Fear Election Machinery Fraud",
    "tinyUrl": "https://tinyurl.com/uvmkt25t",
    "xPostUrl": "https://x.com/C3Heditor/status/2027355614276374540",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat-Financed ACLU Targets Ohio's Election Integrity Legislation for Complete Legal Dismantling",
    "tinyUrl": "https://tinyurl.com/ncfkebzk",
    "xPostUrl": "https://x.com/C3Heditor/status/2027353813711978841",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Virginia Democrats Demand Three-Day Extension for Absentee Ballot Counting Window",
    "tinyUrl": "https://tinyurl.com/38xvedy3",
    "xPostUrl": "https://x.com/C3Heditor/status/2027352239061221607",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "A Whole Lotta Truth Incoming: Trump Confronts Democrats in SOTU: 'These People Are Completely Crazy'",
    "tinyUrl": "https://tinyurl.com/bdh8pz7k",
    "xPostUrl": "https://x.com/C3Heditor/status/2027157369310900324",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "NY Suburban Democrat-Run School District Secretly Promoted Gender Transitions for Eighth-Grade Students",
    "tinyUrl": "https://tinyurl.com/474hkrpt",
    "xPostUrl": "https://x.com/C3Heditor/status/2027156191898468481",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "180 Degree Flip-Flop For Very Woke Democrat Newsom: Urges Democrats to Embrace Cultural Normalcy",
    "tinyUrl": "https://tinyurl.com/bdfyf28b",
    "xPostUrl": "https://x.com/C3Heditor/status/2027154235922497804",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Congressional Investigation into Somali\u00a0Fraud\u00a0Rings in Minnesota Gets Stonewalled by Democrat Gov. Walz",
    "tinyUrl": "https://tinyurl.com/4ypwuh77",
    "xPostUrl": "https://x.com/C3Heditor/status/2027153398005457386",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Sanctioned Voter Fraud: Democrat Board of Elections Worker Caught Admitting Non-Citizens Do Register",
    "tinyUrl": "https://tinyurl.com/357u6s5k",
    "xPostUrl": "https://x.com/C3Heditor/status/2027150718470148421",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Competence - 15 Deaths Officially Attributed to Brutal Cold Snap by NYC Medical Examiner's Office",
    "tinyUrl": "https://tinyurl.com/mvund7xa",
    "xPostUrl": "https://x.com/C3Heditor/status/2027148489650524364",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Visionary President Trump Confronts Democrat Party Addicted to Protests, Pandemonium & Vitriol",
    "tinyUrl": "https://tinyurl.com/mwtwzeey",
    "xPostUrl": "https://x.com/C3Heditor/status/2027148858258497981",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Big Democrat Donor Begins His Apology Tour Over Close Epstein Ties: 'I Did Nothing Illicit or Criminal'",
    "tinyUrl": "https://tinyurl.com/3ctsn7t6",
    "xPostUrl": "https://x.com/C3Heditor/status/2027143478107385982",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Reject Principle That U.S. Citizens Are The Govt's Priority Over Illegal Aliens",
    "tinyUrl": "https://tinyurl.com/yucypkf8",
    "xPostUrl": "https://x.com/C3Heditor/status/2027142389962346633",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Billionaire Democrat Candidate For CA Governor Tells Union He Supports Higher Corporate Taxes",
    "tinyUrl": "https://tinyurl.com/3xrpd8az",
    "xPostUrl": "https://x.com/C3Heditor/status/2027141430401957996",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Virginia's New Democrat Governor's Affordability Pitch Crumbles Under Scrutiny of Her Own Record",
    "tinyUrl": "https://tinyurl.com/53jxycea",
    "xPostUrl": "https://x.com/C3Heditor/status/2027138644121637051",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Overwhelming 84% of Virginia Voters Support Second Amendment Rights, Including Democrats, New Poll Shows",
    "tinyUrl": "https://tinyurl.com/26tub5ez",
    "xPostUrl": "https://x.com/C3Heditor/status/2027136913572868103",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Georgia Prosecutor Plotted Trump Case with Biden DOJ and Democrat J6 Committee, Records Show",
    "tinyUrl": "https://tinyurl.com/2tkv2u77",
    "xPostUrl": "https://x.com/C3Heditor/status/2027136261266288831",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Economic Transformation Produced By Democrats: Wealthy Migrants Flooding Florida at Hourly Rate of $4 Million",
    "tinyUrl": "https://tinyurl.com/yvj5r6xk",
    "xPostUrl": "https://x.com/C3Heditor/status/2027134815732892146",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Operative Confesses First Trump Impeachment Designed to Shield Biden from Investigators",
    "tinyUrl": "https://tinyurl.com/2p8yhtc5",
    "xPostUrl": "https://x.com/C3Heditor/status/2027133347474850289",
    "page": 47,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Trucking Lobby Funneled $300K to Democrat Official Who Then Issued Illegal Licenses To Non-Citizens",
    "tinyUrl": "https://tinyurl.com/y2n6y856",
    "xPostUrl": "https://x.com/C3Heditor/status/2026424418251985298",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Legacy Media Shields Illinois Billionaire Democrat Family From Scrutiny- Pritzker Scandals Censored",
    "tinyUrl": "https://tinyurl.com/5yu69dft",
    "xPostUrl": "https://x.com/C3Heditor/status/2026422998958232028",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Mayor Awards A Crazed Machete-Wielding Professor For A Lucrative $407K Public Art Commission",
    "tinyUrl": "https://tinyurl.com/vcne6su9",
    "xPostUrl": "https://x.com/C3Heditor/status/2026422018283864282",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "19 CIA Reports Retracted After Expert Review Found Deep Leftist/Democrat Political Bias",
    "tinyUrl": "https://tinyurl.com/y5utbhej",
    "xPostUrl": "https://x.com/C3Heditor/status/2026421073110081899",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats' California Insurance Fraud Now in the Crosshairs as Trump Deploys a Federal Strike Team",
    "tinyUrl": "https://tinyurl.com/ytm535jp",
    "xPostUrl": "https://x.com/C3Heditor/status/2026420336502149576",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Small American Business Tells Democrats At HuffPost To Go F**K Themselves Over Its Bashing U.S. Hockey Team Patriotism",
    "tinyUrl": "https://tinyurl.com/38743amb",
    "xPostUrl": "https://x.com/C3Heditor/status/2026419137229021417",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Taxpayers Burdened with $200M+ Bill From The Obama Democrat Administration's Controversial 'Gift'",
    "tinyUrl": "https://tinyurl.com/yc8xsadz",
    "xPostUrl": "https://x.com/C3Heditor/status/2026418223579615507",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Operative Susan\u00a0Rice\u00a0Let's Mask Slip: Makes Disturbing, Fascist Threats Against Trump Supporters",
    "tinyUrl": "https://tinyurl.com/4dzf72h9",
    "xPostUrl": "https://x.com/C3Heditor/status/2026416016297701670",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Parents Kept In The Dark: Middle School Students Racially Separated by Woke Democrat Administrators",
    "tinyUrl": "https://tinyurl.com/3ytb5sy9",
    "xPostUrl": "https://x.com/C3Heditor/status/2026411701420114068",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "New Proposed Law Protecting Newborns From Infanticide Voted Down by Oregon Democrats",
    "tinyUrl": "https://tinyurl.com/mbvub6ct",
    "xPostUrl": "https://x.com/C3Heditor/status/2026412770938298646",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "New Jersey Democrat Indicted by Grand Jury in Corruption Investigation",
    "tinyUrl": "https://tinyurl.com/42r6crzm",
    "xPostUrl": "https://x.com/C3Heditor/status/2026407222645801343",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Online Reporting Portal for Identifying ICE Enforcement Actions Launched by NJ's New Democrat Governor",
    "tinyUrl": "https://tinyurl.com/4py528pc",
    "xPostUrl": "https://x.com/C3Heditor/status/2026406143187464381",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Reject Global Consensus That Election Voting Requires Photo Identification For Voters",
    "tinyUrl": "https://tinyurl.com/44842r4r",
    "xPostUrl": "https://x.com/C3Heditor/status/2026405151343354304",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Defense Industry Giant Quickly Abandons Virginia Following Democrat Gov. Spanberger's Radical Policy Shifts",
    "tinyUrl": "https://tinyurl.com/2ruu84hu",
    "xPostUrl": "https://x.com/C3Heditor/status/2026404297190047813",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Celebrity Goes Full Nuclear on Hollywood's Radical Transformation To Far-Left Democrat Orthodoxy",
    "tinyUrl": "https://tinyurl.com/45hbf42d",
    "xPostUrl": "https://x.com/C3Heditor/status/2026403386002743792",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Child Abuser Finally Apprehended by DHS After Oregon's Democrat Officials Released Him Earlier",
    "tinyUrl": "https://tinyurl.com/ykb3rkaa",
    "xPostUrl": "https://x.com/C3Heditor/status/2026401115428786417",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "NYC Democrat Mayor Mamdani's Property Tax Proposal Draws Fierce Criticism from Black New York Homeowners",
    "tinyUrl": "https://tinyurl.com/494bkkyu",
    "xPostUrl": "https://x.com/C3Heditor/status/2026400177267875911",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Evil Delivered by Democrats: CA Sacramento's Inaction Enables Expansion of LA's Horrific Sex Trafficking Corridor",
    "tinyUrl": "https://tinyurl.com/w6nun3ve",
    "xPostUrl": "https://x.com/C3Heditor/status/2026399135373373604",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Legacy Democrat-Run Media Outlets Minimize Latest Assassination Attempt Through Coordinated Narrative Control",
    "tinyUrl": "https://tinyurl.com/yc3eacw9",
    "xPostUrl": "https://x.com/C3Heditor/status/2026398005608227076",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Blue Cities' Chaos Triggers CNN: Host says Democrats cannot be trusted to run cities like NYC and LA",
    "tinyUrl": "https://tinyurl.com/ympwxe8n",
    "xPostUrl": "https://x.com/C3Heditor/status/2026396953433546914",
    "page": 48,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Gel-Infused Brain Damage: Newsom proves to Black Democrats this can happen to pandering Whites",
    "tinyUrl": "https://tinyurl.com/5n76w42h",
    "xPostUrl": "https://x.com/C3Heditor/status/2026053815439397285",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Dems' Shutdown Strips TSA Escorts From Congress to 'Secure America's Skies'",
    "tinyUrl": "https://tinyurl.com/msbmp8xd",
    "xPostUrl": "https://x.com/C3Heditor/status/2026054772965437933",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Favorite 'The HuffPost' Is Scorched Online for Calling the US Flag a Turn-Off Right After Team USA Won Gold",
    "tinyUrl": "https://tinyurl.com/3rnabfbf",
    "xPostUrl": "https://x.com/C3Heditor/status/2026055966454636793",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Not a Single One: Democrat Congressional Hopeful Refuses to Deport Any Illegal",
    "tinyUrl": "https://tinyurl.com/48b9ef5y",
    "xPostUrl": "https://x.com/C3Heditor/status/2026056827666833764",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Pritzker & Incompetent Democrat Comrades Push 'Da' Bears To Escape To Red Indiana",
    "tinyUrl": "https://tinyurl.com/3mw49t66",
    "xPostUrl": "https://x.com/C3Heditor/status/2026057776766632074",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "The Woes of A Democrat-Psyop Podcaster",
    "tinyUrl": "https://tinyurl.com/yfmhyntr",
    "xPostUrl": "https://x.com/C3Heditor/status/2026059115420606886",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Stunning ABC Poll: Americans Back Trump Over Democrats in Every Single Category",
    "tinyUrl": "https://tinyurl.com/58mh2wbv",
    "xPostUrl": "https://x.com/C3Heditor/status/2026060066600747260",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "GOP Senator Encourages Republicans To Keep The MIC Open For Democrat AOC",
    "tinyUrl": "https://tinyurl.com/3jwark2w",
    "xPostUrl": "https://x.com/C3Heditor/status/2026061481305923936",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "As Teen Gun Violence Peaks, a Democrat NYC Bill Wants Young Criminals Shielded From Arrest",
    "tinyUrl": "https://tinyurl.com/4csztmxj",
    "xPostUrl": "https://x.com/C3Heditor/status/2026062458566107471",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Illinois CDL Corruption Scandal Is Textbook Reminder That Democrats' Chicago Way Never Fades",
    "tinyUrl": "https://tinyurl.com/yc6su3jn",
    "xPostUrl": "https://x.com/C3Heditor/status/2026063662985748729",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "With Fear of Democrat Reprisals, It's Confirmed JPMorgan De-Banked Over 50 Trump Accounts",
    "tinyUrl": "https://tinyurl.com/4shjssf6",
    "xPostUrl": "https://x.com/C3Heditor/status/2026283015295381942",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Katie Porter's Profanity-Drenched Anti-Trump Tirade Crashes and Burns Spectacularly",
    "tinyUrl": "https://tinyurl.com/bdecxmfr",
    "xPostUrl": "https://x.com/C3Heditor/status/2026284050604757426",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "NY's Democrat Gov. Hochul's Admin Shields Medicaid Fraudsters While Bleeding New York's Rural Hospitals Dry",
    "tinyUrl": "https://tinyurl.com/3xh7fmt6",
    "xPostUrl": "https://x.com/C3Heditor/status/2026285645321117980",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "With 2026 Elections Looming Large, Democrat Hakeem Jeffries Abruptly Proclaims His Inner-Trump Border Security Toughness",
    "tinyUrl": "https://tinyurl.com/yfjwd5nz",
    "xPostUrl": "https://x.com/C3Heditor/status/2026286695222583739",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Mocked Worldwide for Her Foreign Policy Gaps, Democrat AOC Breaks Down in a Teary Public Meltdown",
    "tinyUrl": "https://tinyurl.com/yndvs57p",
    "xPostUrl": "https://x.com/C3Heditor/status/2026287441649242123",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Joe Rogan Tears Into Democrat Mamdani, Calls Him a Psychopath Over Plans to Spend Big on Illegals",
    "tinyUrl": "https://tinyurl.com/429rsdzj",
    "xPostUrl": "https://x.com/C3Heditor/status/2026288267256021277",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Think It's A Brilliant Idea To Make Taxpayers Give $175B To Corporations",
    "tinyUrl": "https://tinyurl.com/4ryzpx2b",
    "xPostUrl": "https://x.com/C3Heditor/status/2026289070960148724",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Low IQ Newsom Claims Voter ID Would Fail Because Democrats Unable To Find Their Birth Certificate",
    "tinyUrl": "https://tinyurl.com/2h6utsa3",
    "xPostUrl": "https://x.com/C3Heditor/status/2026290447115592035",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Celebrity Democrat's Incitement of Violence: It's Up to Us to Stop Him Because Trump Will Never Leave Office",
    "tinyUrl": "https://tinyurl.com/4cnxhfkn",
    "xPostUrl": "https://x.com/C3Heditor/status/2026291273594806508",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "WH Spokeperson Squarely Blames Democrats for Third Assassination Attempt On Trump",
    "tinyUrl": "https://tinyurl.com/fxa3cxyy",
    "xPostUrl": "https://x.com/C3Heditor/status/2026294095946092876",
    "page": 49,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Why Do People Call Them 'LibTards'? Democrats Require Shovel-ID But No Voter-ID",
    "tinyUrl": "https://tinyurl.com/577capmn",
    "xPostUrl": "https://x.com/C3Heditor/status/2025579021254164491",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Another Obama Judge Decides She Is The Immigration Czar",
    "tinyUrl": "https://tinyurl.com/32vmx6dx",
    "xPostUrl": "https://x.com/C3Heditor/status/2025523387489988788",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Former Transgender Patient Is Taking Her Pro-Trans Democrat Therapist to Court for Malpractice",
    "tinyUrl": "https://tinyurl.com/22szpwnt",
    "xPostUrl": "https://x.com/C3Heditor/status/2025580662904836251",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Middle America Residents Are Standing Firmly Behind Federal Immigration Enforcement, Against Democrats",
    "tinyUrl": "https://tinyurl.com/5n6hwzsz",
    "xPostUrl": "https://x.com/C3Heditor/status/2025582423237394789",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Rail Czar Handpicked by Democrat Gov. Newsom Steps Down Following a Domestic Violence Arrest",
    "tinyUrl": "https://tinyurl.com/2e9cjvx4",
    "xPostUrl": "https://x.com/C3Heditor/status/2025583439664083291",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Anti-Americanism by Democrats & Globalist Elites Suck All the Joy Out of the Olympics",
    "tinyUrl": "https://tinyurl.com/9kbxcrkv",
    "xPostUrl": "https://x.com/C3Heditor/status/2025584761104630123",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Pandering On Steroids: Bill Would Give the Pride Flag Same Federal Protections as the US Flag",
    "tinyUrl": "https://tinyurl.com/5adzc2pt",
    "xPostUrl": "https://x.com/C3Heditor/status/2025585984167919627",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Brutal Reality of Democrat Incompetence: LA Wildfire Survivors Hit With $40,000 Bills to Restore Power Service",
    "tinyUrl": "https://tinyurl.com/wxvukshb",
    "xPostUrl": "https://x.com/C3Heditor/status/2025587842043257022",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Incompetence Squanders Millions: Vermont's Electric Bus Fleet Too Unreliable In Cold Weather",
    "tinyUrl": "https://tinyurl.com/mr44jesm",
    "xPostUrl": "https://x.com/C3Heditor/status/2025537941095821588",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Caught on Camera: Legacy Media Reporter Flips Off Marco Rubio at Press Conference",
    "tinyUrl": "https://tinyurl.com/4ta3j3zm",
    "xPostUrl": "https://x.com/C3Heditor/status/2025536162186535348",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Biden-Era, Racist-Based Democrat Rules for PhD Grants Officially Axed by Education Dept",
    "tinyUrl": "https://tinyurl.com/mvrhcyn8",
    "xPostUrl": "https://x.com/C3Heditor/status/2025534854432006609",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "'LibTard' Explained: Study Ties Heavy Childhood Consumption of Ultraprocessed Foods to Lower IQ Scores",
    "tinyUrl": "https://tinyurl.com/w8bymuff",
    "xPostUrl": "https://x.com/C3Heditor/status/2025532587859399004",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Radical Activist Avoids Trial After Court Rules Her Far-Left Extremism Is a Mental Illness",
    "tinyUrl": "https://tinyurl.com/5tpwx79b",
    "xPostUrl": "https://x.com/C3Heditor/status/2025530308297109941",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Lies: Docs Prove Minnesota School Told 8th Graders ICE Uses Tricky, Violent Tactics",
    "tinyUrl": "https://tinyurl.com/5a4b85k2",
    "xPostUrl": "https://x.com/C3Heditor/status/2025528512715567585",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Ed O\\'Keefe\\'s Trump Derangement Is So Bad, Even The White House Press Corps Is Laughing At Him",
    "tinyUrl": "https://tinyurl.com/55xzkcbp",
    "xPostUrl": "https://x.com/C3Heditor/status/2025527251110932493",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Walz's-Era: Arrest #79 in Minnesota Fraud Ring That Drained Millions of Taxpayer Funds",
    "tinyUrl": "https://tinyurl.com/9sru4vbn",
    "xPostUrl": "https://x.com/C3Heditor/status/2025525459685884057",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "DEI Racial Quotas at DC Water Led to 200+ Million Gallons of Raw Sewage Flooding",
    "tinyUrl": "https://tinyurl.com/ym3vvp6d",
    "xPostUrl": "https://x.com/C3Heditor/status/2025607568899379555",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Yet Another Blue State Loses a Major Company to a More Business-Friendly Red State",
    "tinyUrl": "https://tinyurl.com/mrym5xrx",
    "xPostUrl": "https://x.com/C3Heditor/status/2025590192724193358",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Texas Democrat Senate Candidate Lies: Claims FCC Blocked His Stephen Colbert Interview From Airing",
    "tinyUrl": "https://tinyurl.com/3n8kej3a",
    "xPostUrl": "https://x.com/C3Heditor/status/2025591366957305907",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Virginia Democrats Flagrant Misleading Ballot Language Equates Gerrymandering To 'Fairness'",
    "tinyUrl": "https://tinyurl.com/3h8vbkk9",
    "xPostUrl": "https://x.com/C3Heditor/status/2025593157195374616",
    "page": 50,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Gov. Newsom's Own Policy Choices Are the Root Cause of California's Endless Budget Deficits",
    "tinyUrl": "https://tinyurl.com/58npub4t",
    "xPostUrl": "https://x.com/C3Heditor/status/2024951216225042725",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "What Is Driving Democrats Into an Unrelenting State of Radical Political Overdrive?",
    "tinyUrl": "https://tinyurl.com/2vdwa6wu",
    "xPostUrl": "https://x.com/C3Heditor/status/2024950147998707766",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "More Demcorat Legal Action Taken Against the Trump Administration for Probing Child Sex-Change Groups",
    "tinyUrl": "https://tinyurl.com/jptmtp4u",
    "xPostUrl": "https://x.com/C3Heditor/status/2024949259083133438",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Seattle's Democrat-Socialist woke mayor provides another bumbling confirmation that is embarrassing for females",
    "tinyUrl": "https://tinyurl.com/y3hvp5hd",
    "xPostUrl": "https://x.com/C3Heditor/status/2024255470869844268",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Ooh-Boy. The leading FakeNews site lets loose the truth about the legal jihad against Trump",
    "tinyUrl": "https://tinyurl.com/4cyufc7k",
    "xPostUrl": "https://x.com/C3Heditor/status/2024254102398480802",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat-run cities in California are a true clown show of bad policies & incompetence",
    "tinyUrl": "https://tinyurl.com/55b4ufhy",
    "xPostUrl": "https://x.com/C3Heditor/status/2024252153192149304",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats in trouble? CNN's main election analyst shares the bad news",
    "tinyUrl": "https://tinyurl.com/y3sn4pad",
    "xPostUrl": "https://x.com/C3Heditor/status/2024249348435869706",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "California's one-party mismanagement opens door for Republican governor candidates",
    "tinyUrl": "https://tinyurl.com/7u4vrjy4",
    "xPostUrl": "https://x.com/C3Heditor/status/2024248362640289868",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Transgender mass shooting in Rhode Island confirms need for law enforcement to take this continuing risk seriosly",
    "tinyUrl": "https://tinyurl.com/55z3u57j",
    "xPostUrl": "https://x.com/C3Heditor/status/2024247091283763485",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Mentally ill should be incarcerated: Yet another judicial fail as homeless person slashes teenager's neck",
    "tinyUrl": "https://tinyurl.com/2evzsfej",
    "xPostUrl": "https://x.com/C3Heditor/status/2024245580877213848",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats created this NYC crisis: Homelessness Crisis That Mamdani Is Ill-Equipped To Fix",
    "tinyUrl": "https://tinyurl.com/2h2k998p",
    "xPostUrl": "https://x.com/C3Heditor/status/2024243503530742116",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Self-Righteous Hypocrisy of Hollywood Liberal: Downplays Revelation 'The View' Host Was Involved With Epstein",
    "tinyUrl": "https://tinyurl.com/t8j429va",
    "xPostUrl": "https://x.com/C3Heditor/status/2024123534037942706",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat 'Success' By Gov. Newsom: California has led the nation during his tenure in homelessness, unemployment, poverty, illiteracy, gas prices, electricity costs, debt, and outmigration",
    "tinyUrl": "https://tinyurl.com/msb3fhp2",
    "xPostUrl": "https://x.com/C3Heditor/status/2024097899160760573",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Trash-America Democrats Whine To EU Elites & Globalists About Trump and MAGA",
    "tinyUrl": "https://tinyurl.com/cmrwcz3p",
    "xPostUrl": "https://x.com/C3Heditor/status/2023956800924438632",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Redomestication: Moving from a sh*thole Blue state to a state that supports business",
    "tinyUrl": "https://tinyurl.com/4ddne2cb",
    "xPostUrl": "https://x.com/C3Heditor/status/2023955021163897066",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Consultant Share's His Thoughts: \u2018Pathetic And Embarrassing\u2019: Says \u2018More And More\u2019 Democrats \u2018Laughing\u2019 At AOC",
    "tinyUrl": "https://tinyurl.com/5n6cefzf",
    "xPostUrl": "https://x.com/C3Heditor/status/2023897328516550873",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Goldman Sachs Chooses Sanity: 'Debanking' Democrat DEI idiocy is a growth industry",
    "tinyUrl": "https://tinyurl.com/ybkaezyf",
    "xPostUrl": "https://x.com/C3Heditor/status/2023896297007198718",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats' love affair with metally ill people has consequences: Dad In Dress Kills Ex-Wife, Child, Self At School Hockey Game",
    "tinyUrl": "https://tinyurl.com/3tptvvpt",
    "xPostUrl": "https://x.com/C3Heditor/status/2023895037050851570",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Voting for Democrats is cultural suicide: Democrats\u2019 New \u2018Trans Bill of Rights\u2019 Looks to Undo Trump Policies to Protect Women\u2019s Spaces",
    "tinyUrl": "https://tinyurl.com/yck7hvvs",
    "xPostUrl": "https://x.com/C3Heditor/status/2023892413614309662",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "When will the other 'big' loafer fall - Democrat Gov. JB Pritzker\u2019s Cousin Steps Down From Family Business Over Epstein Ties",
    "tinyUrl": "https://tinyurl.com/4pvj66cn",
    "xPostUrl": "https://x.com/C3Heditor/status/2023891283803357590",
    "page": 51,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "When NYC voters want Democrats to exert more control & power, inevitably taxes-hit-the-fan",
    "tinyUrl": "https://tinyurl.com/2m9cmjkp",
    "xPostUrl": "https://x.com/C3Heditor/status/2023890174850256927",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Another American's death due to Democrats' protecting illegal aliens",
    "tinyUrl": "https://tinyurl.com/sueph4af",
    "xPostUrl": "https://x.com/C3Heditor/status/2023888854042964337",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Oregon Trying To Ban Fishing & Hunting: This is what happens when Democrats win elections because Republicans are too lazy to vote",
    "tinyUrl": "https://tinyurl.com/ys8a8prj",
    "xPostUrl": "https://x.com/C3Heditor/status/2023887828820931027",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Hawaii Democrats attempting end runs around 2nd Amendment",
    "tinyUrl": "https://tinyurl.com/ykhrashc",
    "xPostUrl": "https://x.com/C3Heditor/status/2023886617904378143",
    "tags": ["Hawaii"],
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Dimwit Democrat provides diversion cover for her Epstein connected comrades with real-world stupid act",
    "tinyUrl": "https://tinyurl.com/ypv6pjf9",
    "xPostUrl": "https://x.com/C3Heditor/status/2023885702367461398",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Fed agents find 3,360 missing kids in Minneapolis that Democrat politicians didn't care about",
    "tinyUrl": "https://tinyurl.com/5adcz7an",
    "xPostUrl": "https://x.com/C3Heditor/status/2023532286474600499",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Celebrate With California Democrats' At A Special Valentines Day Event: Gang of thugs loot Macy\u2019s on Valentine\u2019s Weekend",
    "tinyUrl": "https://tinyurl.com/3csrwh7e",
    "xPostUrl": "https://x.com/C3Heditor/status/2023529934887809268",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Raging Democrat Rep. Swalwell linked to Epstein files after he agreed to bill that exposed persons like him",
    "tinyUrl": "https://tinyurl.com/3rar56vt",
    "xPostUrl": "https://x.com/C3Heditor/status/2023528436195848665",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Explaining The Idiocracy: Study Links Neuroticism to Liberal/Democrat Views",
    "tinyUrl": "https://tinyurl.com/2zes9rw7",
    "xPostUrl": "https://x.com/C3Heditor/status/2023526511798874545",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Stanford Economist Mocks $500M Super Bowl Impact Claim By Democrats & NFL",
    "tinyUrl": "https://tinyurl.com/s3cun7yt",
    "xPostUrl": "https://x.com/C3Heditor/status/2023525686204657880",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Senator: Fetterman says Dems treat voters like children",
    "tinyUrl": "https://tinyurl.com/3vndw6fx",
    "xPostUrl": "https://x.com/C3Heditor/status/2023524971314893164",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Dem Auditor Sues Democrat Party Over $12M Fraud",
    "tinyUrl": "https://tinyurl.com/3c8nty7c",
    "xPostUrl": "https://x.com/C3Heditor/status/2023524095279899102",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Even Left-Wing CNN Challenges Democrat Schumer on his ludicrous anti-VoterID position that Amwericans overwhelmingly want",
    "tinyUrl": "https://tinyurl.com/y27452rw",
    "xPostUrl": "https://x.com/C3Heditor/status/2023523480814395412",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Maryland Democrats' incompetence produces a gigantic sewage spill into the Potomac",
    "tinyUrl": "https://tinyurl.com/yeymssxs",
    "xPostUrl": "https://x.com/C3Heditor/status/2023517845989323083",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Students Threaten Press at Anti-ICE Walkout: \u2018If I Had A Gun, I\u2019d Pew-Pew Your Motherf*cking A*S!\u2019",
    "tinyUrl": "https://tinyurl.com/3xsu5x7p",
    "xPostUrl": "https://x.com/C3Heditor/status/2023511699215806764",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "NY's leading ditz, Democrat AOC, goes to Europe & proves how bad our education system is",
    "tinyUrl": "https://tinyurl.com/4kytdrma",
    "xPostUrl": "https://x.com/C3Heditor/status/2023513202580222334",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats DHS Funding Block Leaves TSA Employees Unpaid & Opens Door For Airport Crowd Standstills",
    "tinyUrl": "https://tinyurl.com/3xsx62pk",
    "xPostUrl": "https://x.com/C3Heditor/status/2023514948530565416",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats & socialists are fully incapable of understanding the simplest of economic truths: Seattle's DoorDash Minimum Pay Hike Backfires Big-Time",
    "tinyUrl": "https://tinyurl.com/2vc4kp2k",
    "xPostUrl": "https://x.com/C3Heditor/status/2023520031360119125",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "New York's Newest Democrat Fraud: $196 million in Medicaid transport driver scams",
    "tinyUrl": "https://tinyurl.com/mwn2c5zw",
    "xPostUrl": "https://x.com/C3Heditor/status/2023164321820201100",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Thank you, Democrats: California's 'Eat The Rich' policies produce a reverse Gold-Rush",
    "tinyUrl": "https://tinyurl.com/cehtmvh2",
    "xPostUrl": "https://x.com/C3Heditor/status/2023162777582383317",
    "page": 52,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Los Angeles Teachers\\' Union Caught Implementing Anti-ICE \\'Resistance\\'",
    "tinyUrl": "https://tinyurl.com/25r6y3vn",
    "xPostUrl": "https://x.com/C3Heditor/status/2023158422649319667",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Democrat Green Energy Policies Skyrockets Electricity Bills In Unaffordable California",
    "tinyUrl": "https://tinyurl.com/4v7ekc7w",
    "xPostUrl": "https://x.com/C3Heditor/status/2023152638825787575",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Unhinged Rep. Shri Thanedar threatens CBP Commissioner Rodney Scott with future prosecution once Democrats seize power",
    "tinyUrl": "https://tinyurl.com/mvfdekau",
    "xPostUrl": "https://x.com/C3Heditor/status/2023151530304745725",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Virtue-Signaling Democrat: \u2018I Do Love Gays\u2019 But Then Reveals Not Knowing 'LGBTQIA' Stands For",
    "tinyUrl": "https://tinyurl.com/yehp9w2r",
    "xPostUrl": "https://x.com/C3Heditor/status/2023150152773689385",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Despite California being broke, Democrat governor always has more $$$ for killing babies",
    "tinyUrl": "https://tinyurl.com/mrx6e845",
    "xPostUrl": "https://x.com/C3Heditor/status/2022078841058103777",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Even the left-wing Guardian noted this lie: 4 men in unredacted files named by Democrat Rep. Ro Khanna as having ties to Epstein actually had no ties to Epstein",
    "tinyUrl": "https://tinyurl.com/yzsrtm8f",
    "xPostUrl": "https://x.com/C3Heditor/status/2023149972506693925",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Poof: Democrat Newsom's massive $450 million failure for new '911' sysrtem",
    "tinyUrl": "https://tinyurl.com/3wxm33bs",
    "xPostUrl": "https://x.com/C3Heditor/status/2022082882303611227",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Governor Incompetence of Minnesota wants all U.S. citizens to pay for destruction from Democrat's Anti-Ice mobs",
    "tinyUrl": "https://tinyurl.com/ycyam9hz",
    "xPostUrl": "https://x.com/C3Heditor/status/2022082204038574414",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Illegal Student Enrollment Plunge Has Democrats & Their Shock Troops Very Upset",
    "tinyUrl": "https://tinyurl.com/yzfb4kwp",
    "xPostUrl": "https://x.com/C3Heditor/status/2022077336724832706",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Major Democrat activist group tied to Chinese Communist Party activities",
    "tinyUrl": "https://tinyurl.com/bdt748f3",
    "xPostUrl": "https://x.com/C3Heditor/status/2022075822451150879",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "The 'warmth' of collectivism - not so much: Freezing homeless people in Democrat run NYC didn\u2019t get help in 96% of 311 calls made",
    "tinyUrl": "https://tinyurl.com/bdfnddh4",
    "xPostUrl": "https://x.com/C3Heditor/status/2023156895310291438",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Apple pushes on left-wing Democrat propaganda on its news app",
    "tinyUrl": "https://tinyurl.com/5t5e282j",
    "xPostUrl": "https://x.com/C3Heditor/status/2022072863029965073",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "California Democrats take 'dumb' to a new level: Another Billionaire Flees",
    "tinyUrl": "https://tinyurl.com/4h55sfpe",
    "xPostUrl": "https://x.com/C3Heditor/status/2022074125062377562",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Radical Far-Left Forcing Moderate Demcorats To Self-Immolate",
    "tinyUrl": "https://tinyurl.com/9vwjhykz",
    "xPostUrl": "https://x.com/C3Heditor/status/2022070745397174432",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "It Was An Absolute Failure 3 Months Ago But Democrats Think Another Shutdown Is What Americans Are Demanding",
    "tinyUrl": "https://tinyurl.com/4x5d8fre",
    "xPostUrl": "https://x.com/C3Heditor/status/2022066957139554789",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "How Do American-Hating Democrats Get Elected?",
    "tinyUrl": "https://tinyurl.com/yy72upm8",
    "xPostUrl": "https://x.com/C3Heditor/status/2022064303998992417",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Almost 100% of Democrat Politicians Are Against Election Integrity & Proof of Legal Right To Vote",
    "tinyUrl": "https://tinyurl.com/bdehd89c",
    "xPostUrl": "https://x.com/C3Heditor/status/2022058251345641948",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Nothing like sanctimonious, wealthy Hollywood liberal types showing their true colors",
    "tinyUrl": "https://tinyurl.com/jukjn3hd",
    "xPostUrl": "https://x.com/C3Heditor/status/2024619847758364799",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Instead of keeping its own refineries open, the 'Great State of Stupid' does this. It's the Democrat Idiocracy on steroids.",
    "tinyUrl": "https://tinyurl.com/zmvex8m8",
    "xPostUrl": "https://x.com/C3Heditor/status/2024607372300189826",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Democrats won't say they support the mutilation of transgender children so instead they go with 'God supports us Dems'",
    "tinyUrl": "https://tinyurl.com/a9r3t5j3",
    "xPostUrl": "https://x.com/C3Heditor/status/2024613995986993631",
    "page": 53,
    "batchDate": "Feb 20, 2026"
  },
  {
    "headline": "Election Fraud Incoming - Social Security Unable to Match 28% of Voter Verifications",
    "tinyUrl": "https://tinyurl.com/2hxye7f3",
    "xPostUrl": "https://x.com/C3Heditor/status/2022055436011368838",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Biggest Podcaster Blasts Democrats 'Open Borders' Stupidity",
    "tinyUrl": "https://tinyurl.com/343pwa2k",
    "xPostUrl": "https://x.com/C3Heditor/status/2022054149098230265",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Georgia 2020 Election: 17,000+ more Biden votes in Fulton County than actual ballots",
    "tinyUrl": "https://tinyurl.com/58bj3tmm",
    "xPostUrl": "https://x.com/C3Heditor/status/2022052925414191227",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Ilhan Omar Provides Further Proof That Democrats' Lies & Violent Rhetoric Is Their New Normal",
    "tinyUrl": "https://tinyurl.com/ycymrpdc",
    "xPostUrl": "https://x.com/C3Heditor/status/2021710820598538391",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Why do Democrats hate Trump so freaking much? Hint: Look at the chart",
    "tinyUrl": "https://tinyurl.com/y8fkjkcn",
    "xPostUrl": "https://x.com/C3Heditor/status/2021704657530179835",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "\\'Not true\\': Chicago Mayor Johnson\\'s ICE order has his own prosecutors up in arms",
    "tinyUrl": "https://tinyurl.com/yc2z87cu",
    "xPostUrl": "https://x.com/C3Heditor/status/2021702344946167827",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "More Democrat Incompetence: Gov. Whitmer Honors Big-Time Day Care Fraudster",
    "tinyUrl": "https://tinyurl.com/9je5xzuz",
    "xPostUrl": "https://x.com/C3Heditor/status/2021700436709736618",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Pro-Life Groups Sue Michigan Over Democrats Demands That Pro-Abortion Staff Be Hired",
    "tinyUrl": "https://tinyurl.com/49mcjh3b",
    "xPostUrl": "https://x.com/C3Heditor/status/2021698463050703050",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Illinois Democrats fast-track deindustrialization & blue collar job destruction with climate change financial liability proposal",
    "tinyUrl": "https://tinyurl.com/4tk2vht3",
    "xPostUrl": "https://x.com/C3Heditor/status/2021695733091500387",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Gov. Newsom is blasted by critics who call the Democrats' troubled & long-delayed rail project a boondoggle - costing taxpayers a ludicrous $215 million per mile with no end in sight",
    "tinyUrl": "https://tinyurl.com/24xrd293",
    "xPostUrl": "https://x.com/C3Heditor/status/2021689853855838667",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Progressive-Democrat Hatred of Whites Does Not Belong In Government",
    "tinyUrl": "https://tinyurl.com/ypyp2yab",
    "xPostUrl": "https://x.com/C3Heditor/status/2021688005551866354",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "The Obvious Result of Democrats' Stupid Tax Policies: Affluent\u00a0Californians escaping to Las Vegas",
    "tinyUrl": "https://tinyurl.com/bdchfk9w",
    "xPostUrl": "https://x.com/C3Heditor/status/2021684834276372488",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "The Party of Violence: Democrats Incite Teenagers To Plot The Beheading of Law Enforcement Officers",
    "tinyUrl": "https://tinyurl.com/2s4yd24j",
    "xPostUrl": "https://x.com/C3Heditor/status/2021681662271082800",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Collaborating With A Pervert: Democrat Rep Pushed For Funding From Epstein",
    "tinyUrl": "https://tinyurl.com/wpp9aehm",
    "xPostUrl": "https://x.com/C3Heditor/status/2021683064884097310",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "California Democrat Economics: Power bills spike 39% over 6 years \u2014 leads the U.S. in unaffordability for families",
    "tinyUrl": "https://tinyurl.com/tvnvbxyp",
    "xPostUrl": "https://x.com/C3Heditor/status/2021359345305554998",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Jasmine Crockett flat-out refuses to apologize for knowingly spreading lies about a Trump official",
    "tinyUrl": "https://tinyurl.com/fnuywvu7",
    "xPostUrl": "https://x.com/C3Heditor/status/2021358060044996755",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Cali-Fraudnia: Small business fraud is immense amounting to billions of $$$$ in the state",
    "tinyUrl": "https://tinyurl.com/udmdr2pb",
    "xPostUrl": "https://x.com/C3Heditor/status/2021353183579340813",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Blue State Blues: NY Democrats serve up costly regulations & red tape for child care centers",
    "tinyUrl": "https://tinyurl.com/4bzp5nc5",
    "xPostUrl": "https://x.com/C3Heditor/status/2021354564717510745",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Liberal Progressive Judge Reduces Violent Rapist & Kidnapper Criminal\u2019s Sentence, Because He's A Young Black Man",
    "tinyUrl": "https://tinyurl.com/26r3beck",
    "xPostUrl": "https://x.com/C3Heditor/status/2021355009481507057",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Love To Tax: Seattle quarterback will pay California taxes greater than his Super Bowl winnings",
    "tinyUrl": "https://tinyurl.com/yepvusba",
    "xPostUrl": "https://x.com/C3Heditor/status/2021287717129064832",
    "page": 54,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "California Law Enforcement Exposes Democrats' state-Approved Online Voting Allows Foreign-Based Persons To Vote In U.S. Elections",
    "tinyUrl": "https://tinyurl.com/ydj3xcjt",
    "xPostUrl": "https://x.com/C3Heditor/status/2021237353382080810",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "College Voting Rights Suppression? Court Rejects Democrats' Claim It's A Legitimate Issue",
    "tinyUrl": "https://tinyurl.com/58zz98f7",
    "xPostUrl": "https://x.com/C3Heditor/status/2021234457827569993",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Racism On Steroids: Democrat\u00a0is ripped to shreds for saying non-whites should rule America",
    "tinyUrl": "https://tinyurl.com/56ucd74b",
    "xPostUrl": "https://x.com/C3Heditor/status/2021054846233870743",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Chicago\u00a0Mayor Brandon Johnson Admits to 30% Reduction in Homicides...",
    "tinyUrl": "https://tinyurl.com/983tn5vv",
    "xPostUrl": "https://x.com/C3Heditor/status/2021053614685630692",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "ABC's Non-Funny, Fringe Left, Democrat Late Show Host Likens ICE to Serial Killer John Wayne Gacy",
    "tinyUrl": "https://tinyurl.com/2tavhxa9",
    "xPostUrl": "https://x.com/C3Heditor/status/2020943920025436321",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Portland, Oregon: Conservative Livestreamers Shot At By Unhinged Activist",
    "tinyUrl": "https://tinyurl.com/2ztnabp7",
    "xPostUrl": "https://x.com/C3Heditor/status/2020919706425733613",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Pay-Per-Mile Vehicle Tax Proposed By Politicians: California Wants Everyone To Pay More Taxes",
    "tinyUrl": "https://tinyurl.com/yyxdrr6y",
    "xPostUrl": "https://x.com/C3Heditor/status/2020916035042279854",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "California's Corruption: Gov. Newsom Won't Cut Ties to 'Shangri-La' Homeless Fraud",
    "tinyUrl": "https://tinyurl.com/5n8c3rff",
    "xPostUrl": "https://x.com/C3Heditor/status/2020913814951051365",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat-Biased NYT Exposed For Shielding Creepy, Fringe Lefty Billionaire In Epstein Files",
    "tinyUrl": "https://tinyurl.com/sh4ssacf",
    "xPostUrl": "https://x.com/C3Heditor/status/2020869381614424427",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Politicians Ignore The 71% of Their Voters Who Want Voter Photo ID For Elections",
    "tinyUrl": "https://tinyurl.com/4np2bjsh",
    "xPostUrl": "https://x.com/C3Heditor/status/2020870836828110989",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Blue City Idiocracy: 5 largest U.S. cities don\u2019t have enough money to pay bills",
    "tinyUrl": "https://tinyurl.com/2rev8m4b",
    "xPostUrl": "https://x.com/C3Heditor/status/2020243948997079519",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Per latest U-Haul report, top 5 states in population loss: Blue anti-growth states of California, Illinois, New Jersey, New York, & Massachusetts",
    "tinyUrl": "https://tinyurl.com/7n64hxn7",
    "xPostUrl": "https://x.com/C3Heditor/status/2020243376466194655",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Abigail Spanberger, Who Campaigned on \\'Affordability,\\' Signs Opening Salvo of Bills Proposing Constitutional Amendments on Abortion, Redistricting",
    "tinyUrl": "https://tinyurl.com/4acua8z5",
    "xPostUrl": "https://x.com/C3Heditor/status/2020245649586016603",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Fraud Tsunami In Democrat States: Now California's Turn As SBA Suspends 12,000 CA Borrowers for $9B Fraud",
    "tinyUrl": "https://tinyurl.com/mthpfcyk",
    "xPostUrl": "https://x.com/C3Heditor/status/2020250136551780748",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Investigation Into New York's Democrat Gov Hochul re: Medicaid Fraud",
    "tinyUrl": "https://tinyurl.com/df5pm384",
    "xPostUrl": "https://x.com/C3Heditor/status/2020612845453595031",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Dem Officials Resist Federal Election Integrity Push",
    "tinyUrl": "https://tinyurl.com/fjx5vv65",
    "xPostUrl": "https://x.com/C3Heditor/status/2020251139879342455",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Illegal Immigrant Freed by Biden Admin Kills Dad in Chase",
    "tinyUrl": "https://tinyurl.com/4es592y4",
    "xPostUrl": "https://x.com/C3Heditor/status/2020252273092489430",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Ex-CIA Dem Senator Refuses to Comply with DOJ Probe",
    "tinyUrl": "https://tinyurl.com/ym3d794h",
    "xPostUrl": "https://x.com/C3Heditor/status/2020614068865052782",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Obama Counsel Ruemmler Got Lavish Gifts from Epstein",
    "tinyUrl": "https://tinyurl.com/5h79t9dx",
    "xPostUrl": "https://x.com/C3Heditor/status/2020253732890615847",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Omar's Winery Exposed as Fake Shell for Money Laundering",
    "tinyUrl": "https://tinyurl.com/5hbefh4u",
    "xPostUrl": "https://x.com/C3Heditor/status/2020615404859920432",
    "page": 55,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Leftists Put Hits Out on YouTuber Who Exposed Somali Fraud",
    "tinyUrl": "https://tinyurl.com/527etnn3",
    "xPostUrl": "https://x.com/C3Heditor/status/2020617368964337996",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Millionaires Tax Introduced in Washington State",
    "tinyUrl": "https://tinyurl.com/49pphzkp",
    "xPostUrl": "https://x.com/C3Heditor/status/2020257908995637594",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Dem Rep Khanna's Epstein Island Pledge Backfires Instantly - Too Many Democrats Exposed",
    "tinyUrl": "https://tinyurl.com/mpvrvkcw",
    "xPostUrl": "https://x.com/C3Heditor/status/2019870687188730348",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Jasmine Crockett Resurrects Fake Border Agent's Whipping Story",
    "tinyUrl": "https://tinyurl.com/8x8zwrar",
    "xPostUrl": "https://x.com/C3Heditor/status/2019872267774386401",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Major Democrat Donor Resigns From Powerful Law Firm After Epstein Emails Surface",
    "tinyUrl": "https://tinyurl.com/yy7pnmc9",
    "xPostUrl": "https://x.com/C3Heditor/status/2019872828783538537",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Miami's New Democrat Mayor Vows to Obstruct ICE",
    "tinyUrl": "https://tinyurl.com/5n8pc8cw",
    "xPostUrl": "https://x.com/C3Heditor/status/2019876895643562216",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Texas White-Liberal Democrat for U.S. Senate Accused of Racism",
    "tinyUrl": "https://tinyurl.com/473a4xy4",
    "xPostUrl": "https://x.com/C3Heditor/status/2019874633001103772",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Third Georgia Democrat Liberal Busted for Pandemic Fraud",
    "tinyUrl": "https://tinyurl.com/2m7xbhta",
    "xPostUrl": "https://x.com/C3Heditor/status/2019875185416106436",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Fringe Left-Wing ACLU Demands UN Probe Trump",
    "tinyUrl": "https://tinyurl.com/4kru9cz2",
    "xPostUrl": "https://x.com/C3Heditor/status/2019876237142085981",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats Advance 7 Bills Restricting Gun Rights in the Virginia State Senate",
    "tinyUrl": "https://tinyurl.com/yc7xnekx",
    "xPostUrl": "https://x.com/C3Heditor/status/2019880160221356388",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "'Moderate' Dems Take Big Checks from Epstein-Linked Donor",
    "tinyUrl": "https://tinyurl.com/2rm5tkxp",
    "xPostUrl": "https://x.com/C3Heditor/status/2019879421621203198",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Billionaire Dem Donors Bemoan Socialist Takeover of CA",
    "tinyUrl": "https://tinyurl.com/mvpemvmd",
    "xPostUrl": "https://x.com/C3Heditor/status/2019881481917919599",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Chuck Schumer Claims Voter ID Laws Are The Return Of \"Jim Crow\"",
    "tinyUrl": "https://tinyurl.com/4ersmz2a",
    "xPostUrl": "https://x.com/C3Heditor/status/2019883195450421328",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrats' Radical Left-Wing Vision for Virginia",
    "tinyUrl": "https://tinyurl.com/55rkppas",
    "xPostUrl": "https://x.com/C3Heditor/status/2019883593158521147",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Rep. Swalwell Caught Taking Money from CCP-Linked Firm",
    "tinyUrl": "https://tinyurl.com/29cd2mrk",
    "xPostUrl": "https://x.com/C3Heditor/status/2019885454066139581",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Ex-NJ Gov Murphy Granted Clemency to Child Killer",
    "tinyUrl": "https://tinyurl.com/ym5bnx26",
    "xPostUrl": "https://x.com/C3Heditor/status/2019886561584624073",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Hollywood's Outrage Machine: Part of Left's Propaganda",
    "tinyUrl": "https://tinyurl.com/4pwuthdr",
    "xPostUrl": "https://x.com/C3Heditor/status/2019888542441164879",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Unions Bankrolling Far-Left Lunacy: Teachers & Nurses",
    "tinyUrl": "https://tinyurl.com/bdhddnv4",
    "xPostUrl": "https://x.com/C3Heditor/status/2019887252369715242",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat Donors: Bill Gates and Epstein Plotted to Eliminate Poor",
    "tinyUrl": "https://tinyurl.com/mr472x8e",
    "xPostUrl": "https://x.com/C3Heditor/status/2019870045388861874",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Democrat State Senator: In Virginia, You Must Love Islam \u2014 Or Else",
    "tinyUrl": "https://tinyurl.com/muez66zm",
    "xPostUrl": "https://x.com/C3Heditor/status/2019868663273406689",
    "page": 56,
    "batchDate": "Feb 21, 2026"
  },
  {
    "headline": "Inside the Democrat Big Tent: Nazi Tattoos, Fake Doctors, And Now an Al-Qaida Linked Ally",
    "tinyUrl": "https://tinyurl.com/mr2ddr8x",
    "xPostUrl": "https://x.com/C3Heditor/status/2060090787921121306",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "California Democrats Fight to Shield Immigrant Truckers From English Proficiency Test Required for Commercial Drivers",
    "tinyUrl": "https://tinyurl.com/yuu7jejx",
    "xPostUrl": "https://x.com/C3Heditor/status/2060089932203344336",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Federal Guilty Plea Now Confirms Los Angeles Voter Fraud That the Democrats Have Long Claimed Never Happens",
    "tinyUrl": "https://tinyurl.com/32au6ex2",
    "xPostUrl": "https://x.com/C3Heditor/status/2060088946700075128",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Double Ballot Fraud Exposed by California Lawmaker as Democrat Gov. Newsom Scrambles to Secure an Insecure Election Process",
    "tinyUrl": "https://tinyurl.com/3fr5c39r",
    "xPostUrl": "https://x.com/C3Heditor/status/2060088076827492617",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Election Top-2 Primary Rules That Crushed Republicans Are Now Suddenly 'Unfair' When Democrats Face Them In California",
    "tinyUrl": "https://tinyurl.com/2t67erep",
    "xPostUrl": "https://x.com/C3Heditor/status/2060087141688082621",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Wildly False Claim by Texas U.S. Senate Candidate James Talarico: Climate Change Is Killing Thousands of Texans & Americans",
    "tinyUrl": "https://tinyurl.com/2fs45p28",
    "xPostUrl": "https://x.com/C3Heditor/status/2060086290753228889",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Oregon's Woke Democrat Economics: Rock-Bottom Sale of Portland's Flagship Office Tower Shows a City In The Tank",
    "tinyUrl": "https://tinyurl.com/9tzpmm36",
    "xPostUrl": "https://x.com/C3Heditor/status/2060085355613864013",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Murder Charges Now Likely for Registered Democrat Who Viciously Beat Elder Owner of Famous 'Trump House' in Escondido, California",
    "tinyUrl": "https://tinyurl.com/mr3phrwb",
    "xPostUrl": "https://x.com/C3Heditor/status/2060084420474499137",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Connecticut Democrats Push A Homeschool Crackdown That Attacks School Choice & Parental Rights",
    "tinyUrl": "https://tinyurl.com/2zy269f4",
    "xPostUrl": "https://x.com/C3Heditor/status/2060083485335134261",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Democrat Rep. Ro Khanna Wants To Pack SCOTUS With Four More Justices Just Like Progressive-Left Ketanji Brown",
    "tinyUrl": "https://tinyurl.com/c54d7f42",
    "xPostUrl": "https://x.com/C3Heditor/status/2060082550195769385",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Colorado Ranching Area's 8th Congressional District's Democrat Candidate Is a Vegan With Deep Anti-Meat Convictions",
    "tinyUrl": "https://tinyurl.com/ytef72zt",
    "xPostUrl": "https://x.com/C3Heditor/status/2060080027195015420",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Democrat Election Denial Continues: Insists Trump Lost 2024 Swing States Due To Elon's Malware",
    "tinyUrl": "https://tinyurl.com/s92zsex6",
    "xPostUrl": "https://x.com/C3Heditor/status/2060079347017347401",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Mounting Scandals Prompt Democrats to Abandon Maine Senate Hopeful, Nazi-Associated Graham Platner",
    "tinyUrl": "https://tinyurl.com/yc5hypmm",
    "xPostUrl": "https://x.com/C3Heditor/status/2060078360072450105",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "House Probe Reveals Leftist Law Firm Defending China-Based Singham Network of Democrat Protestors Has Deep Marxist Ties",
    "tinyUrl": "https://tinyurl.com/5yyekudd",
    "xPostUrl": "https://x.com/C3Heditor/status/2060076497767927959",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "A Closer Look Back at the Long & Damning Record of Democrats' Blatant Lies",
    "tinyUrl": "https://tinyurl.com/2s445ye5",
    "xPostUrl": "https://x.com/C3Heditor/status/2060075165992484905",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Gov. Hochul & State Democrats Hand NYC Taxpayers a Large $151M Bill by Rolling Back Public-Sector Pension Reforms",
    "tinyUrl": "https://tinyurl.com/5ft7v7uy",
    "xPostUrl": "https://x.com/C3Heditor/status/2060074244747202795",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Xavier Becerra, Democrat Candidate for California Governor, Pushes Free Healthcare for Illegal Aliens While Boasting About Jobs They Take",
    "tinyUrl": "https://tinyurl.com/4efw2wj9",
    "xPostUrl": "https://x.com/C3Heditor/status/2060073406419144734",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "AOC's Choice of Democrat Candidate Worked With Al-Qaeda & Defended World Trade Center Blind Sheikh Bomber",
    "tinyUrl": "https://tinyurl.com/bdz5yrwe",
    "xPostUrl": "https://x.com/C3Heditor/status/2060072480157388930",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Hakeem Jeffries Reveals Democrats' Goal On Trump Voters: 'Our Mission Is To Break Them'",
    "tinyUrl": "https://tinyurl.com/34yrshcp",
    "xPostUrl": "https://x.com/C3Heditor/status/2060071849245942156",
    "page": 11,
    "batchDate": "May 28, 2026"
  },
  {
    "headline": "Hasan Kwame Jeffries, Brother of Top Democrat Hakeem Jeffries, Advocates Violence Against Whites",
    "tinyUrl": "https://tinyurl.com/3vsf8vse",
    "xPostUrl": "https://x.com/C3Heditor/status/2060010202892480843",
    "page": 11,
    "batchDate": "May 28, 2026"
  }
];

const fuseOptions = {
  keys: ['headline'],
  threshold: 0.0,
  ignoreLocation: true,
  useExtendedSearch: true,
  includeScore: true,
  minMatchCharLength: 2,
};

export default function Search() {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(articles, fuseOptions), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    // If the query already uses extended search operators (=, ^, $, !, ', |)
    // pass it through as-is. Otherwise wrap each word in the include-word
    // prefix (') so Fuse.js performs exact token matching instead of fuzzy
    // substring matching.
    const hasOperator = /[=^$!'|]/.test(query);
    const words = query.trim().split(/\s+/);
    const normalizedQuery = hasOperator
      ? query
      : words.map(w => `'${w}`).join(' ');
    const fuseResults = fuse.search(normalizedQuery).map(r => r.item);
    // Post-filter: for plain queries, each search word must appear in the
    // headline either as a standalone word OR as part of a hyphenated compound
    // (e.g. "govt-dental"), but NOT embedded inside a non-hyphenated word
    // (e.g. "accidentally" should NOT match "dental").
    if (hasOperator) return fuseResults;
    return fuseResults.filter(item =>
      words.every(w => {
        // Match: at start/end of string, after a space or hyphen, before a space or hyphen
        const re = new RegExp(`(?:^|[\\s\\-])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[\\s\\-]|$)`, 'i');
        return re.test(item.headline);
      })
    );
  }, [query, fuse]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Back to Home link */}
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 underline">
          &larr; Back to Home
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4" style={{fontFamily: 'Roboto Slab, serif', color: '#800000'}}>
          Curating The Crazies
        </h1>
        <p className="text-xl mb-6" style={{fontFamily: 'Roboto Slab, serif'}}>
          <span style={{color: '#1a1a1a', fontFamily: 'Roboto Slab, serif', fontWeight: 'bold'}}>President Trump:</span>{' '}
          <span style={{color: '#800000', fontFamily: 'Caveat, cursive', fontWeight: 'bold', fontSize: '1.4rem'}}>&ldquo;These people are crazy. I&apos;m telling you, they&apos;re crazy.&rdquo;</span>
        </p>
        <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: 'Roboto Slab, serif', color: '#1a1a1a'}}>
          Search All Articles
        </h2>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search headlines..."
          className="w-full max-w-xl px-4 py-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-red-800"
          style={{fontFamily: 'Roboto Slab, serif'}}
          autoFocus
        />
        <p className="text-xs text-gray-500 mt-2">
          Tip: Use <code>=word</code> for exact match, <code>^word</code> starts with, <code>word$</code> ends with, <code>!word</code> exclude, <code>&#39;word</code> includes, <code>a | b</code> for OR
        </p>
      </div>

      {query.trim() && (
        <p className="text-sm text-gray-600 mb-6" style={{fontFamily: 'Roboto Slab, serif'}}>
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      <div>
        {results.map((article, idx) => (
          <div key={idx} className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-2" style={{fontFamily: 'Roboto Slab, serif', color: '#1a1a1a'}}>
              <a href={article.tinyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {article.headline}
              </a>
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <a href={article.xPostUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                View X Post
              </a>
              <span className="text-sm text-gray-500" style={{fontFamily: 'Roboto Slab, serif'}}>
                <a
                  href={(article as any).page === 1 ? '/' : `/page${(article as any).page}`}
                  className="text-blue-600 hover:underline"
                >
                  Page {(article as any).page}
                </a>
                &nbsp;&bull;&nbsp; {(article as any).batchDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-red-800 hover:underline" style={{fontFamily: 'Roboto Slab, serif'}}>
          &larr; Back to Page 1
        </Link>
      </div>
    </div>
  );
}
