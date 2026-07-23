# namratak277.github.io — Developer Portfolio OS

Personal portfolio site built as a fully static system on GitHub Pages. Vanilla HTML, CSS, and JavaScript — no build tools, no framework, no cost.

Live site: https://namratak277.github.io

---

## Project Brief

What this site is built to satisfy — useful as a from-scratch build prompt or a reference for what "on-brand" means here.

**Who this is for:** Namrata Karki, a CS student at UNCG (B.S., graduating Dec 2026) with an IT support background, full-stack dev experience, and campus leadership roles. Target audience: recruiters/hiring managers for IT, data analysis, software engineering, and project management roles.

**Tech constraints:**
- Static site only — plain HTML/CSS/vanilla JS, no framework, no build step.
- Deploy on GitHub Pages. Font Awesome + Google Fonts (Playfair Display, DM Sans) via CDN.
- Frequently-changing content (skills, jobs, projects, interests, blog posts) lives in `assets/data/*.json`, fetched client-side and rendered into the DOM — not hardcoded in HTML — so it can be edited without touching markup.
- Decap CMS (`/admin`) is wired up against those JSON files for GUI-based edits.
- Shared nav/footer markup lives in one `nav.html`, fetched at runtime into `#nav-slot` on every page.
- CI lints all HTML with `htmlhint` and verifies every local asset reference resolves to a real file.

**Design system:**
- Two themes, toggled via a button (persisted in `localStorage`), **light mode as the default**.
  - Dark: deep navy-blue background, gold/terracotta/espresso accents.
  - Light: warm beige/rose-gold background (not stark white), maroon/red CTAs and headings, sage/teal secondary accents.
- One shared circular logo mark — a terminal-style `>` prompt (white) + a line-art monogram SVG + a blinking `_` cursor — identical in the nav bar and footer, gradient-colored per theme.
- Card-and-pill visual language throughout: rounded tiles, pill-shaped tags/buttons, soft shadows, subtle hover-lift.

**Pages:** `index.html` (main portfolio), `blog.html` (posts), `interests.html` (hobbies grid), `resume.html` (printable resume), `/admin` (Decap CMS).

**Homepage section order:** Hero → About → Skills → Education → Experience → Projects → Interests teaser → Contact → Footer.

- **Hero:** name, typewriter role-title cycling, one-line bio, meta pills, two CTAs, socials, circular profile photo with decorative SVG petal rings, four floating "skill bubble" cards (IT & AV Support / Data Analysis / Full-Stack Development / AI-LLM), and an ambient animated canvas background that reacts to the cursor.
- **About:** a bento-grid — two-paragraph bio, a "soft skills" trait-pill tile, a quick-facts tile, resume-download + GitHub buttons. No repetition of hero info.
- **Skills:** JSON-driven, grouped by category. Each skill shows a **5-point bar rating** with the fraction (e.g. "4.5/5"). Toggle between a **Cards** view (infinite-looping autoplay carousel) and a **Cloud** view (tag cloud sized by rating).
- **Education:** a university info card plus a horizontally scrollable, auto-looping carousel (same mechanism as Skills) of course/activity blocks.
- **Experience:** JSON-driven **flip cards** — front shows icon, title, org/dates, a standout metric where one exists, and a one-line hook; back (flip on hover or tap/Enter) shows detail bullets + tags.
- **Projects:** JSON-driven card grid (icon, type, title, description, tags, GitHub link), optional "featured" highlight. Only real, shipped projects.
- **Interests teaser:** auto-scrolling card row linking to the full interests page.
- **Contact:** contact links beside an AJAX form (Formspree) with inline success/error state, plus resume download.

**Interaction details:** custom cursor with contextual labels (desktop only), fade-in-on-scroll, page-transition overlay, scroll-progress bar, active-nav-link highlighting, mobile hamburger nav, button ripple.

**Non-goals:** no placeholder/"in progress" projects, no GitHub-stats widget, no homepage blog teaser that duplicates the dedicated blog page.

---

## Project Structure

```
namratak277.github.io/
├── .github/workflows/ci.yml    ← HTML validation + asset audit (see CI/CD below)
├── .htmlhintrc                 ← HTML lint rules
├── admin/                      ← Decap CMS (config.yml + editor UI)
├── index.html                  ← Main portfolio
├── blog.html                   ← Blog listing; ?post=<slug> for a single post
├── interests.html              ← Hobbies grid with tag filters
├── resume.html                 ← Standalone printable resume
├── nav.html                    ← Shared nav/footer partial, injected into #nav-slot
└── assets/
    ├── css/
    │   ├── portfolio.css       ← Design system + all component styles (index/blog/interests)
    │   └── styles.css          ← Older styles, scoped to resume.html only
    ├── js/
    │   ├── portfolio.js        ← All shared behavior + JSON-driven rendering
    │   ├── blog.js              ← Blog listing/reader router
    │   └── main.js              ← Not currently loaded by any page (unused)
    ├── data/                   ← skills.json, experience.json, projects.json, interests.json, posts.json
    ├── images/, files/         ← Photos, hobby images, downloadable resume
    └── plugins/                ← jQuery/Bootstrap, used only by resume.html
```

---

## Content & Data

Everything content-driven lives in `assets/data/*.json` and renders client-side — no rebuild needed after an edit.

- **Preferred:** edit through the Decap CMS at `/admin`.
- **Manual fallback:** edit the relevant JSON file directly and push. Each file is a flat array/object matching what its section renders (see the source of truth for exact fields: `skills.json`, `experience.json`, `projects.json`, `interests.json`, `posts.json`).
- Blog posts additionally support `content` as a raw HTML string — keep it trusted, since it's rendered unescaped.

**Other things to edit directly in code:** nav links → `nav.html`. Design tokens/colors → `:root` in `assets/css/portfolio.css`. Resume page → `resume.html` + `assets/css/styles.css`.

---

## Contact Form Setup

The contact section posts to **Formspree** (no backend required):

1. Create a form at [formspree.io](https://formspree.io) and copy its form ID.
2. In `index.html`, set the form's `action` to `https://formspree.io/f/YOUR_FORM_ID`.

Success/error states are handled inline, without a page reload.

---

## CI/CD

On every push/PR to `main` (`.github/workflows/ci.yml`):

- **validate-html** — lints all `*.html` files with `htmlhint` against `.htmlhintrc`.
- **audit-assets** — confirms every local `src`/`href`/`action` reference in the HTML resolves to a real file.

GitHub Pages deploys from `main` once both pass.

---

## Running Locally

No build step. Serve the root with any static server, e.g.:

```bash
python -m http.server 8080
# or: npx serve .
```

Then open `http://localhost:8080/index.html`.

---

## Notes

- `assets/css/styles.css` is older code retained for `resume.html` only; new features belong in `portfolio.css`.
- `assets/js/main.js` isn't loaded by any page — it's leftover from an earlier iteration and safe to ignore (or remove) unless you're reviving the GitHub-repo-gallery feature it implements.
