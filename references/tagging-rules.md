# Article Tagging Rules

**MANDATORY:** Read this document before generating tags for any batch of articles.

---

## The Core Rule

**Tags must always be generated from the full article content, not from the headline.**

For each article:
1. Visit the article's Tiny URL in the browser
2. Read the full article text on the destination page
3. Generate 4 tags based on the article content

---

## Fallback: Headline-Only Tagging

Headline-based tagging is permitted **only** when the article URL is completely inaccessible due to:
- A 404 / page not found error
- A hard paywall with no visible content
- A redirect loop or broken link

When falling back to headline-based tagging, note the article NUM and reason in the final report to the user.

---

## API Failure Rule

If the LLM API fails during tag generation:
- **Stop immediately** — do not proceed with the batch
- Do not silently fall back to headline-based tagging for API failures
- Diagnose and resolve the API issue, then retry from content

---

## Permanently Retired Tags — NEVER USE AGAIN

The following tags have been deleted or replaced and must **never** be used for any future article batch, regardless of article content or headline:

| Retired Tag | Replacement (if any) |
|---|---|
| Democratic Party | Democrat Party |
| Democrat Candidates | 2026 Candidates |
| Democrat Corruption | Corruption-Fraud |
| Corruption | Corruption-Fraud |
| Fraud | Corruption-Fraud |
| Partisan Democrat Activists | Partisan-Democrat |
| Partisan | Partisan-Democrat (compound only — never standalone) |
| Democrat Overreach | (deleted — no replacement) |
| Democrat Hypocrisy | Hypocrisy |
| House Democrats | U.S. House |
| Democrat Activists | Activist |
| Democrat Governance | Governance-Policies |
| Democrat Policies | Governance-Policies |
| Democrat Soft-On-Crime | Soft-On-Crime |
| Democratic Member | (deleted — no replacement) |
| Democratic-Farmer-Labor Party | Democrat Party |
| Far-Left Democrat | Antifa-Democrats |
| Senate Democrats | U.S. Senate |
| Soros Democrats | Soros-Democrat |

---

## Keyword-Triggered Tags

Certain tags MUST be applied whenever specific keywords appear in the article headline:

| Tag | Trigger Keywords (any one is sufficient) |
|---|---|
| **Antifa-Democrats** | Extreme, Radical, Far Left, Antifa, Rioters, Violence |
| **DNC** | DNC, Democratic National Committee |
| **Incompetence** | incompetent, incompetence, mismanagement |
| **Progressive-Democrat** | progressive |

These rules apply regardless of tagging method (content-based or headline-based).

---

## Tag Quality Rules

- Generate exactly **4 tags** per article (for new batches; existing articles may have fewer after tag edits)
- Use existing root tags from `tag-index.json` wherever possible
- Create a new tag only when no existing tag accurately describes the article's subject
- Do not use news source names (e.g., "Gateway Pundit," "Breitbart") as tags
- Tags should reflect the article's **subject matter**, not its tone or framing
- Prefer specific root tags (e.g., "California Politics") over generic ones (e.g., "Politics") when the article is clearly about a specific state or topic

---

## Tag Aliases — Consolidation Map

The following word combinations are **aliases** for an existing root tag. When any alias appears in a headline or article, use the root tag instead. Do NOT create a new tag for any alias listed here.

| Root Tag | Aliases (all map to root) |
|---|---|
| **2026 Elections** | 2026 Candidates, 2026 Midterms, Congressional Race, Election Propaganda, Gerrymander Map, Hollywood Politics, Latino Voters, Political Campaigns, Political Candidate, Political Donations, Political Endorsements, Political Funding, Political Fundraising, Primary Elections, Redistricting, Senate Race, US Senate Candidate |
| **CBP-DHS-ICE** | Abolish ICE, Air Travel, Airport Security, Border Security, Commercial Driver's License, DHS, DHS Arrests, DHS Employee, DHS Funding, DHS Investigation, DHS Shutdown, Deportation, ICE, ICE Enforcement, Naturalization Fraud, Naturalization Process, TSA Agents, TSA Defunding, TSA Employees, TSA Escorts, TSA Funding, TSA Officers, TSA Policy, TSA Staffing, Transportation Security Administration |
| **Immigration** | Anchor Babies, Birthright Citizenship, CDL Revocations, Chinese Birth Tourism, Citizenship, Deporting Fraudsters Act, English-Only CDL, Homeless Illegals, Illegal Immigration, Immigration Fraud, Immigration Policy, Legal Immigration, Low-Wage Aliens, Multiculturalism, Sanctuary Cities, Temporary Protected Status |
| **Politics** | Political Accountability, Political Affiliation, Political Agenda, Political Alliances, Political Attacks, Political Bias, Political Bills, Political Candidate, Political Commentary, Political Controversy, Political Correctness, Political Corruption, Political Debanking, Political Discourse, Political Extremism, Political Ideology, Political Incitement, Political Investigations, Political Issue, Political Lies, Political Meltdown, Political Messaging, Political Migration, Political Mobilization, Political Opposition, Political Overdrive, Political Pandering, Political Polarization, Political Rant, Political Rhetoric, Political Scandal, Political Scandals, Political Strategy, Political Threats, Race Politics, Racial Politics |
| **NYC** | New York City, NYC Childcare, NYC Council, NYC Grocery Stores, NYC Squatters, NYPD, Mamdani Administration |
| **Zohran Mamdani** | Mamdani, Mayor Mamdani |
| **JB Pritzker** | J.B. Pritzker, Pritzker Family, Thomas Pritzker |
| **Election Fraud** | Voter Rolls, Voter ID, Voter Fraud, Voter Verification, Voter Verifications, Voter Identification, Voter Photo-ID, Voter Photo ID, Voting Official, Unregistered Voters, Homeless Voters, Voter Database, Voter Fraudster, Election Farce, Election Rigging, Election Integrity, Election Official, Election Anti-Fraud, Election Machines, Election Machine, Election Machinery, Election Denial, Ballots, Ballot System, Mail-In Ballots, Election Meddling, Legal Right To Vote, Illegal Alien Voting, Illegal Alien Registered, Insecure Election, Forged Signatures, Dead Voters, Voter Suppression, Voter Treatment, Fulton County, Mail-In Voting, SAVE Act, SAVE America Act, Voting Rights |
| **Culture War** | Cultural Wars, Abortion, DEI, DEI Policies, Diversity Equity Inclusion, Child Pornography, Child Sexual Abuse, Identity Politics, Parental Rights In Education, Pro-Life Activist, Pro-Life Activists, Pro-Life Defendants, Religious Commentary, Religious Depictions, Religious Freedom, Religious Freedom Restoration Act, Religious Right, Planned Parenthood, Pregnancy Centers, Pride Flag Bill, Second Amendment, School Choice, School Safety, Social Impact, Social Justice, Title IX, WokeDEI, Women's Sports, Workplace Discrimination |
| **Left-Wing** | Progressive-Left, Antifa-Democrats, Antifa, Radical Left, Radical Politics, Code Pink, CodePink, Collectivism, Anti-American Protesters, Soros, Soros-Democrat, Leftism, Liberal Ideology, Microlooting, Molotov Cocktails, Molotov cocktail attack, Political Violence, Progressive-Democrat, White Liberals |
| **Judiciary-Judicial** | Federal Courts, SCOTUS, SCOTUS Ruling, Sentencing Disparity, Juvenile Justice Reform, Ninth Circuit, Partisan Activists, Plea Deal, Progressive Prosecutors, Repeat Offender Problem, Supreme Court, US Supreme Court, Judiciary, Judicial, Justice |
| **2026 Elections** | (existing aliases) + Campaign Ethics, Campaign Finance, FEC Ethics, Fundraising Scandal, Dark Money, Ethical Accusations, Financial Disclosure, Foreign Donations, Hollywood Donors, Misconduct Allegations, PACs, ActBlue, Midterm Elections |
| **Democrat Party** | DNC, Democrat Overreach, Court Packing, Hollywood, Hollywood Celebrities, Hollywood Film Studios, Hypocrisy, Incompetence, Project2029 Agenda, Trump Opposition |
| **Racial Issues** | Anti-Discrimination Law, Anti-White Discrimination, Anti-White Racism, Civil Rights, Civil Rights Group, Civil Rights Lawsuit, Charlottesville Rally, Black Voters |
| **Assassination** | Assassination Attempt, Assassination Attempts, Assassination Joke, Assassination Plot, WHCD, WHCD Shooter, White House Correspondents, White House Correspondents' Dinner |
| **Taxation** | Taxpayer Funding, Taxpayer Funds, Taxpayer Money, Taxpayer Theft Allegations, Taxpayer Waste, Tax Hike, Wealth Tax, Estate Tax |
| **LGBTQ** | Transgender, Gender Affirming Care, Gender Issues, Girls Sports, Conversion Therapy, Bathroom Policies |
| **Homeless** | Homeless Assailant, Homeless Encampments, Homeless Outreach, Homelessness, Homelessness Crisis |
| **Weaponization** | Government Weaponization, Maximum Warfare, Lawfare, Political Weaponization, Weaponize Government |
| **SPLC** | KKK Funding Scandal, Ku Klux Klan, Southern Poverty Law Center, SPLC Fraud, SPLC Indictment, SLPC |
| **Unions** | AFSCME Union, Government Unions, SEIU Local 99, Teachers Unions, United Farm Workers |
| **Censorship** | Cancel Culture, Campus Issues, First Amendment, Hate Speech Laws, FACE Act |
| **January 6 Protest** | January 6 Capitol Attack, January 6 Committee, January 6th Capitol |
| **Immigration** | (existing aliases) + Encampment Sweeps, Kilmar Abrego Garcia, MS-13, Tren de Aragua |
| **Corruption-Fraud** | Concealment Money Laundering, Welfare Abuse, Welfare Fraud, Money Laundering |
| **Non-Profit** | Non-Profit Abuse, Nonprofit Accountability, Nonprofit Funding |
| **Israel** | Temple Israel, Synagogue Attack, Zionists |
| **Epstein** | Pedophile Associate, Pedophile |
| **Christianity** | Anti-Christian Bias, Vatican Clash |
| **WashingtonDC** | DC Statehood |
| **U.S. Congress** | Congress |
| **Sexual Misconduct** | Sexual Harassment, Sex Crimes, Sex Remark, Sexual Misconduct Allegations, Sexual Orientation, Sexual Predators |
| **Affordability** | Affordability Crisis, Cost Of Living, Cost of Living, High Cost of Living |
| **Foreign Policy** | Hormuz Strait, Middle East Policy |
| **Media Bias** | Mainstream Media, MS NOW |
| **Alexandria Ocasio-Cortez** | AOC |
| **Boston** | Boston Mayor |
| **Climate Change** | Climate Policy |
| **Criminal Justice** | Soft-On-Crime |
| **Energy Policy** | Energy Costs |
| **San Francisco** | San Francisco Mayor |
| **State of the Union** | State Of The Union |

---

## Person Name Variants

Some person-name tags have multiple name forms that all refer to the same individual. When any variant appears in a headline or article, use the root tag listed below:

| Root Tag | Also Matches |
|---|---|
| **Darializa Avila Chevalier** | Darializa Chevalier, Avila Chevalier |
| **JB Pritzker** | J.B. Pritzker, Pritzker Family, Thomas Pritzker |

---

## Process Confirmation

After completing tag generation for a batch, confirm in the report:
- How many articles were tagged from content
- How many fell back to headlines (and which article NUMs)
- Whether any API failures occurred
# Last updated: 2026-06-19 (RootTagmerge06192026 — 159 tags merged into 24 root groups)
