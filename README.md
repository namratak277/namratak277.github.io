# Namrata Karki — Portfolio

**Live site:** https://namratak277.github.io

A personal portfolio designed to look and work like a **manila folder**. Each tab along the top opens one page: a cover, then About, Experience, Projects, Education, Interests and Contact. Under every page sits **"Namrata's Brain"**, a word cloud of skills where clicking a word explains where that skill comes from.

This README explains the project at two levels. Each section starts in plain language, then goes into the technical detail.

| | |
|---|---|
| **Who it's for** | Recruiters and hiring managers in IT, data analysis, software engineering and project management |
| **Whose it is** | Namrata Karki: Computer Science student at UNCG (B.S., Dec 2026, minor in IT), with IT support, full-stack and campus leadership experience |
| **Built with** | Plain HTML, CSS and JavaScript, plus **Jekyll**, the page builder that is built into GitHub Pages |
| **Hosted on** | GitHub Pages (free) |
| **Server / database** | None. Every page is a ready-made file, and the contact form goes through Formspree |

---

## Contents

1. [The idea: a folder](#1-the-idea-a-folder)
2. [Tour of the pages](#2-tour-of-the-pages)
3. [Design system](#3-design-system)
4. [How it works](#4-how-it-works)
5. [Design decisions and trade-offs](#5-design-decisions-and-trade-offs)
6. [Project structure](#6-project-structure)
7. [Working on the site](#7-working-on-the-site)
8. [Quality checks and publishing](#8-quality-checks-and-publishing)
9. [Known limitations and next steps](#9-known-limitations-and-next-steps)
10. [Glossary](#10-glossary)

---

## 1. The idea: a folder

**In plain terms:** most portfolios are one long page you scroll through. This one works like a folder on a desk. Tabs stick out along the top, you pick the one you want, and you see one page at a time. Each page is a different kind of paper: a letter, index cards, a transcript, a postcard. That way each section feels distinct while still belonging to one folder.

**Design intent:**

- **One topic per view.** A recruiter can jump straight to Experience or Projects without scrolling past everything else. Each tab is its own page with its own link, so a single page can be shared.
- **Variety through materials, not layout tricks.** The pages stand apart because of the *paper* they're printed on (ruled, index card, graph, transcript, corkboard, airmail), not because of extra colors, fonts or animation.
- **Restraint.** There are two typefaces, no tilted elements, and no added motion. The paper textures carry the personality, so everything else stays calm.
- **Skills stay visible.** Instead of a separate Skills page, the word cloud sits under every page, so skills are always one scroll away.

---

## 2. Tour of the pages

| Tab | Looks like | What's on it | Where the content lives |
|---|---|---|---|
| **Cover** (logo tab) | The front of the folder | Name, a cycling job title, short bio, photo framed by lotus petals, four skill bubbles, and a background grid of Nepali and code characters that glows near the cursor | `index.html` |
| **About** | A letter on ruled notebook paper, beside a "student file" ID card | A two-paragraph introduction; location, degree, graduation, "Open to roles" stamp, resume and GitHub links | `about.html` |
| **Experience** | Index cards with rubber-stamped numbers | One card per role: title, organization, dates, a one-line summary and a key number (e.g. "350+ residents"). Click a card to flip it for details | `assets/data/experience.json` |
| **Projects** | Spec sheets taped onto graph paper | Each project's type, description, tools used and a link to its code; the featured project spans the full width | `assets/data/projects.json` |
| **Education** | A transcript | University and program, course list with status, honors and leadership | `education.html` |
| **Interests** | Polaroids pinned to a corkboard | Hobbies with short descriptions | `assets/data/interests.json` |
| **Contact** | An airmail postcard with a stamp | Email, LinkedIn and GitHub on the left; a message form on the right | `contact.html` |
| **Namrata's Brain** (under every page) | A packed word cloud | About 50 skills. Bigger means more prominent, color shows the group, some words run sideways. Click a word for a note on where that skill was learned or used | `assets/js/brain.js` |

There is also `brand.html`, a brand kit page (logo, colors, type, business card) that hasn't been moved into the folder design yet.

---

## 3. Design system

**In plain terms:** these are the visual rules the whole site follows, so every page feels like part of the same set.

### Themes
- **Light (the default):** warm beige "paper" background, maroon headings and buttons, sage and teal accents.
- **Dark:** deep navy background, gold accents, cream text.
- The sun/moon button switches between them, and the browser remembers the choice (`localStorage`).
- Every color is a named variable (a "design token"). Shared tokens live in `:root` in `assets/css/portfolio.css`; folder-specific ones (`--paper`, `--stamp`, `--folder-bg`, word cloud colors…) live in `:root` in `assets/css/folder.css`. Each is defined once for light and once for dark.

### Typography: two fonts only
- **Playfair Display** (serif) for headings and short italic notes ("flip me →", "Click to learn more").
- **DM Sans** (sans-serif) for everything else: body text, tabs, labels, the word cloud.
- Small uppercase labels with wide letter spacing ("NO. 02", "INSTITUTION") play the role a typewriter font would have, without adding a third typeface.

### The logo
A terminal-style `>` prompt, a line-art "NK" monogram and a blinking `_` cursor. It reads as "a developer's signature". It's the cover tab, and it also appears in the footer.

### Paper vocabulary
Each page uses one material, built only with CSS (no images): **ruled lines** whose spacing matches the text so words sit exactly on them, **index-card** red rules, **graph paper**, **tape**, **rubber stamps**, a **paperclip**, **corkboard** dots and an **airmail border**.

### Motion policy
No tilts and no added animation. Tabs switch pages instantly, with no fade. What remains:
- the blinking logo cursor
- the cycling job title on the cover
- the cursor-reactive character grid
- cards flipping when clicked
- a subtle fade-in as sections scroll into view (inherited from the original site)

### Accessibility notes
- Tabs are real links. The current one is marked `aria-current="page"`, so screen readers announce it.
- Experience cards flip with click, tap, or Enter/Space from the keyboard.
- Word cloud words are buttons, and their note closes with Esc.
- Visible focus outlines are kept.
- For visitors who've asked their system for reduced motion, the cover's entrance animations and the tab logo's blinking cursor are turned off.

---

## 4. How it works

### The big picture

**In plain terms:** think of a print shop. You hand in a *template* (the folder: tabs, header, footer) and a stack of *page contents*. The print shop puts each page's content into the template and hands back finished pages. **Jekyll is the print shop.** GitHub runs it automatically every time the code changes, and visitors only ever receive the finished pages.

Once a page is open in someone's browser, a few small scripts add the interactive parts: flipping cards, the word cloud, the theme switch.

```
  WHAT IS EDITED                   BUILD (GitHub runs Jekyll)            IN THE VISITOR'S BROWSER
  ──────────────                   ──────────────────────────            ────────────────────────
  _layouts/folder.html  (frame) ─┐
  _data/tabs.yml   (tab list)    ├──► experience.html is assembled:  ──►  portfolio.js loads the jobs
  experience.html  (content only)┘     frame + tabs + content + cloud     from experience.json and
                                                                          draws the index cards;
                                                                          brain.js lays out the cloud
```

### Step 1: Build time (Jekyll)

Every folder page starts with a short settings block called **front matter**:

```yaml
---
layout: folder                      # put me inside _layouts/folder.html
title: Experience — Namrata Karki   # browser-tab title
tab: experience                     # which tab to highlight
---
```

Below it is *only* that page's content. Jekyll then combines four kinds of source:

| Piece | File | What it does |
|---|---|---|
| **Layout** | `_layouts/folder.html` | The frame shared by every page: `<head>`, fonts, styles, tab bar, word cloud, footer, scripts. `{{ content }}` marks where the page's own content goes. |
| **Data** | `_data/tabs.yml` | The ordered list of tabs. The layout loops over it to draw the tab bar, highlights the tab matching the page's `tab:`, and numbers pages by position. |
| **Includes** | `_includes/brain.html`, `_includes/file-line.html` | Reusable snippets dropped in with `{% include … %}`: the word cloud, and the typed "No. 02 ——— Experience" line at the top of each page. |
| **Config** | `_config.yml` | Site settings, and which working files (README, Gemfile) stay out of the published site. |

Files with no front matter (CSS, JavaScript, images, `brand.html`) are published unchanged. Folders starting with `_` are build inputs and are never published themselves.

### Step 2: In the browser (three scripts)

| Script | Runs on | Responsibilities |
|---|---|---|
| `assets/js/portfolio.js` | Every page | The original site engine: the light/dark theme, fetching the JSON files and drawing Experience/Projects/Interests cards, card flipping, the cover's character grid and cycling title, the contact form, the custom cursor (desktop), scroll effects. |
| `assets/js/folder.js` | Folder pages | Makes tab clicks switch instantly (it skips portfolio.js's page-fade), connects the folder's sun/moon button to the theme, keeps the current tab visible on phones, and forwards old links (`index.html#projects` → `projects.html`). |
| `assets/js/brain.js` | Folder pages | The word cloud: the skills list (`WORDS`), the layout, the click-for-details notes, and the "Scroll for more" hint. |

### Step 3: Content as data

**In plain terms:** jobs, projects and interests aren't typed into the page design. They live in simple lists (JSON files), and the site turns each list item into a card. Adding a job means adding one entry to a list, without touching any layout code.

**Technically:** `portfolio.js` calls `fetch('assets/data/experience.json')`, then builds each card's HTML from a template string, escaping every value first. This is client-side rendering; see the trade-offs in section 5.

### Step 4: The word cloud

**In plain terms:** the big words go in the middle first, then each smaller word looks for the nearest empty gap, a bit like packing a suitcase or playing Tetris. Before it starts, it measures how much room all the words need and scales them so together they fill a neat rectangle.

**Technically** (`layout()` in `brain.js`):
1. **Measure.** Render every word at base size and add up their areas. Pick a scale so the words cover about 62% of a target rectangle (wide on desktop, taller on phones), capped so the widest word still fits.
2. **Order.** Sort by size, biggest first. A seeded shuffle breaks ties, so the "random" mix is the same on every visit.
3. **Place.** Walk each word outward from the center along an elliptical spiral. Take the first spot that stays inside the rectangle and doesn't overlap any placed word (a rectangle-intersection check with a 2px gap). If no spot exists, shrink the word 15% and retry up to three times.
4. **Sideways words.** About a third of the smaller words use `writing-mode: vertical-rl`. That swaps the box's width and height, so the same collision math works without special cases.
5. **Re-layout.** It recalculates only when the width actually changes. On phones, scrolling also fires resize events, so height changes alone are ignored.

Each word is a `<button>` carrying its group (sets the color), size (1–4) and a "how I know it" note. The notes are drawn from the resume, `experience.json` and `projects.json`.

---

## 5. Design decisions and trade-offs

| Decision | Why | Cost / trade-off |
|---|---|---|
| **Jekyll instead of a framework** (React, Next.js, Astro) | GitHub Pages runs it for free with no setup. One layout feeds every page, so the tabs and footer are written once. It's plenty for a content site. | Pages must be built before they look right. Opening a page file directly (or in VS Code's preview) shows plain, unstyled text. Previewing needs Jekyll; see section 7. |
| **One page per tab** (not one long page) | Each section gets its own link to share; the back button works; the folder metaphor stays literal. | Switching tabs loads a new page instead of swapping instantly. It's a small static page, so in practice it's fast. |
| **Content as JSON, drawn in the browser** | Edit content without touching markup; the CMS editor can target the same files. | Those cards don't exist until the script runs, so search engines and no-JavaScript visitors see empty sections. A next step is moving the JSON into `_data/` so Jekyll builds the cards into the HTML. |
| **Two CSS files** (`portfolio.css` + `folder.css`) | Keeps the original design system intact, with the folder look layered on top. | Some older rules in `portfolio.css` are overridden rather than removed. |
| **The old nav still loads, hidden, on folder pages** | `portfolio.js` owns the theme logic, and its toggle button lives in `nav.html`. Reusing it avoided rewriting that logic. | A hidden dependency: the folder's theme button "clicks" the hidden one. Moving the theme code into `folder.js` would remove it. |
| **Word cloud skills in JavaScript**, not JSON | It's the one section that's purely presentational, and keeping the words next to the layout code makes sizes easy to tune. | Editing skills means editing a `.js` file. |

---

## 6. Project structure

```
namratak277.github.io/
├── _config.yml                  ← Jekyll settings
├── _layouts/folder.html         ← The folder frame: head, tabs, word cloud, footer
├── _includes/
│   ├── brain.html               ← Word cloud markup
│   └── file-line.html           ← "No. 02 ——— Experience" line
├── _data/tabs.yml               ← Tab order, labels and links
│
├── index.html                   ← Cover
├── about.html                   ← About (letter + ID card)
├── experience.html              ← Experience (index cards)
├── projects.html                ← Projects (spec sheets)
├── education.html               ← Education (transcript)
├── interests.html               ← Interests (polaroids)
├── contact.html                 ← Contact (postcard + form)
├── brand.html                   ← Brand kit (older design, not in the folder yet)
├── nav.html                     ← Older nav, loaded into each page (hidden on folder pages)
│
├── assets/
│   ├── css/
│   │   ├── portfolio.css        ← Original design system: tokens, shared components, cover
│   │   └── folder.css           ← The folder: tabs, papers, word cloud, light/dark folder colors
│   ├── js/
│   │   ├── portfolio.js         ← Shared behavior + drawing cards from JSON
│   │   ├── folder.js            ← Folder helpers (instant tabs, theme button, old links)
│   │   └── brain.js             ← Word cloud (skills list, layout, notes)
│   ├── data/                    ← experience.json, projects.json, interests.json
│   ├── images/                  ← Profile photo; hobby photos (not used yet)
│   └── files/                   ← Downloadable resume (.docx)
│
├── admin/                       ← Decap CMS editor configuration (see section 9)
├── Gemfile                      ← Jekyll version for local preview (GitHub ignores it)
├── .htmlhintrc                  ← HTML lint rules
└── .github/workflows/ci.yml     ← Automatic checks on every push
```

---

## 7. Working on the site

### Previewing locally

> **Important:** the page files are templates. Opening `experience.html` in a browser or in VS Code's preview shows **plain words with no design**. That's expected. To see the real site, run Jekyll and open `http://localhost:4000`.

Jekyll needs Ruby; to avoid installing it, run Jekyll in Docker. Start **Docker Desktop**, then in PowerShell from the project folder:

```powershell
docker run --rm -it -p 4000:4000 -v "${PWD}:/srv/site" -v jekyll-gems:/usr/local/bundle -w /srv/site ruby:3.3 sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"
```

- Open **http://localhost:4000**.
- Leave it running. Saving any file rebuilds the site in a few seconds; refresh the browser to see the change.
- Restart the command after editing `_config.yml`.
- Stop it with `Ctrl+C`.
- The first run downloads Jekyll and takes a few minutes; later runs are quick.
- The built site is written to `_site/`, which git ignores.

### Common edits

| I want to… | Edit |
|---|---|
| Add, change or remove a job | `assets/data/experience.json` |
| Add or change a project | `assets/data/projects.json` (`"featured": true` makes it full width) |
| Change interests | `assets/data/interests.json` |
| Change the About letter or ID card | `about.html` |
| Change courses or honors | `education.html` |
| Add, resize or reword a skill in the word cloud | The `WORDS` list at the top of `assets/js/brain.js` (`s` = size 1–4, `g` = group, `how` = the note) |
| Reorder, rename or remove tabs | `_data/tabs.yml` |
| Change the footer, fonts, or anything on every page | `_layouts/folder.html` |
| Change colors | `:root` in `assets/css/folder.css` (folder) or `assets/css/portfolio.css` (shared) |
| Point the contact form somewhere else | The `action` URL of the form in `contact.html` ([Formspree](https://formspree.io) form ID) |
| Replace the resume download | `assets/files/2025 Resume.docx` (keep the name, or update the links in `about.html` and `contact.html`) |

### Adding a new tab

1. **Create the page file,** e.g. `certifications.html`, starting with:
   ```yaml
   ---
   layout: folder
   title: Certifications — Namrata Karki
   tab: certifications
   ---
   ```
2. **Wrap its content** in `<section class="section folder-panel" id="certifications"><div class="container"> … </div></section>`, and put `{% include file-line.html %}` as the first line inside the container.
3. **Register the tab** by adding it to `_data/tabs.yml`:
   ```yaml
   - id: certifications
     label: Certifications
     url: certifications.html
   ```

The tab bar, the highlighting, the page number, the word cloud and the footer are all added automatically.

---

## 8. Quality checks and publishing

**In plain terms:** every time a change is pushed to GitHub, a robot builds the whole site and checks it for broken pages and broken links before anyone notices. A green ✓ next to a commit means it passed; a red ✗ means something needs fixing.

**Technically** (`.github/workflows/ci.yml`, on every push and pull request to `main`):
1. **Build:** `actions/jekyll-build-pages`, the same builder GitHub Pages uses, outputs to `_site/`. If this fails, the live site wouldn't build either.
2. **Validate HTML:** `htmlhint` checks the *built* pages against `.htmlhintrc`: lowercase tags, matched tag pairs, unique IDs, a doctype and a title on every page. The source files aren't linted directly, because they're templates.
3. **Asset audit:** a short Python script confirms every local `src`, `href` and `action` in the built HTML points to a file that exists.

**Publishing:** GitHub Pages builds and deploys the `main` branch on its own. That depends on **Settings → Pages → Source** being set to "Deploy from a branch". CI runs alongside as the safety check.

---

## 9. Known limitations and next steps

- **`brand.html`** still uses the older design. It's the last page to move into the folder.
- **Search engines can't see the JSON-driven cards** (Experience, Projects, Interests), because they're drawn in the browser. Moving the JSON into `_data/` and building the cards with Jekyll would fix this.
- **Hidden nav dependency:** folder pages load `nav.html` only for its theme button. Moving the theme logic into `folder.js` would let it go.
- **Word cloud on phones:** the smallest words become very small; a minimum font size would help.
- **Hobby photos** (`assets/images/hobby1–7.jpg`) aren't used yet. They could replace the icons in the Interests polaroids.
- **Decap CMS (`admin/`)** is still configured to edit the JSON files through GitHub. It hasn't been re-checked since the move to Jekyll, so test it before relying on it.

---

## 10. Glossary

| Term | Meaning here |
|---|---|
| **Static site** | A website made of ready-made files. There's no server program generating pages on request, which makes it simple, fast and free to host. |
| **Jekyll** | The tool that assembles the pages from a shared template plus each page's content. GitHub Pages runs it automatically. |
| **Front matter** | The `---` settings block at the top of a page file (layout, title, which tab). |
| **Layout / template** | The shared frame every page is placed into: tabs, footer, styles. |
| **JSON** | A simple text format for lists of data, used here for jobs, projects and interests. |
| **Client-side rendering** | The browser builds part of the page with JavaScript after the page loads, instead of it arriving ready-made. |
| **Design token** | A named, reusable value such as a color (`--stamp`) or font, defined once and used everywhere. |
| **CI (continuous integration)** | Automatic checks that run on every change pushed to GitHub. |
| **Docker** | A tool that runs software in a sealed container, used here to run Jekyll without installing Ruby. |
| **Formspree** | A third-party service that receives the contact form's messages and emails them on, so the site needs no server of its own. |
