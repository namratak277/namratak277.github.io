# namratak277.github.io — Developer Portfolio OS

Personal portfolio site built as a fully static JAMstack system on GitHub Pages. Vanilla HTML, CSS, and JavaScript — no build tools, no framework, no cost.

**Live site:** https://namratak277.github.io

---

## Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Main portfolio — hero, about, skills, experience, projects, GitHub stats, education, interests teaser, contact form |
| `blog.html` | `/blog.html` | Blog listing; `/blog.html?post=<slug>` for single post view |
| `resume.html` | `/resume.html` | Full printable resume with download link |
| `interests.html` | `/interests.html` | Hobbies and interests with category filter |
| `nav.html` | _(partial)_ | Shared navigation — fetched and injected into `#nav-slot` on every page |

---

## Project Structure

```
namratak277.github.io/
├── .github/
│   └── workflows/
│       └── ci.yml              ← GitHub Actions: HTML validation + asset audit
├── .htmlhintrc                 ← HTML lint rules
│
├── index.html
├── blog.html
├── resume.html
├── interests.html
├── nav.html
├── favicon.ico
│
└── assets/
    ├── css/
    │   ├── portfolio.css       ← Primary design system (custom properties, all components)
    │   └── styles.css          ← Legacy styles scoped to resume.html
    ├── js/
    │   ├── portfolio.js        ← All interactive behavior (nav, scroll, GitHub stats, contact form)
    │   ├── blog.js             ← Blog page client-side router and renderer
    │   └── main.js             ← Legacy GitHub API integration (used by resume/interests pages)
    ├── data/
    │   └── posts.json          ← Blog CMS: all post content and metadata
    ├── images/
    │   └── profilepic.png
    └── files/
        └── 2025 Resume.docx
```

---

## Design System

**Colors** — CSS custom properties in `:root` inside `portfolio.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--blue-950` | `#050e1f` | Page background base |
| `--blue-400` | `#3b74c8` | Primary accent / interactive |
| `--gold` | `#c9a84c` | Highlight accent |
| `--gold-lt` | `#f0d78a` | Italic emphasis text |
| `--text-main` | `#e5eef9` | Body text |
| `--text-muted` | `#9fb0c7` | Secondary / labels |
| `--border` | `rgba(122,168,234,0.18)` | Card borders |

**Typography:**
- Display: `Playfair Display` (section titles, blog headings)
- Body: `DM Sans` (all body copy, UI)

---

## JavaScript Overview

### `portfolio.js`

Loaded on every page. Runs on `DOMContentLoaded`.

| Function | What it does |
|----------|--------------|
| _(inline)_ | Fetches `nav.html` → injects into `#nav-slot` |
| _(inline)_ | Hamburger toggle, scroll effects, active link highlighting |
| `initIndexStreamingGrid()` | Auto-scrolling Netflix-style interest strip + preview modal |
| `initInterestFilters()` | Tag-based filtering for the interests grid |
| `initSkillsCarousel()` | Manual left/right scroll for skill cards |
| `initTimelineEvents()` | Click-to-expand timeline events |
| `initGitHubStats()` | Fetches GitHub API → animates repo/star/fork counts + language bar chart |
| `initContactForm()` | AJAX Formspree submission with inline success/error states |

### `blog.js`

Loaded only on `blog.html`.

| Function | What it does |
|----------|--------------|
| _(init)_ | Detects `?post=` URL param; routes to listing or single post |
| `renderListing()` | Renders sorted blog card grid from `posts.json` |
| `renderPost()` | Renders a full post with back-nav and HTML content |
| `renderNotFound()` | Graceful 404 state for unknown slugs |

---

## Blog CMS (`assets/data/posts.json`)

Posts are plain JSON — no build step, no external CMS. To add a post:

1. Add a new entry to the `posts` array in `assets/data/posts.json`
2. Required fields: `slug`, `title`, `date` (YYYY-MM-DD), `category`, `readTime`, `tags` (array), `excerpt`, `content` (HTML string)
3. Commit and push — the blog updates automatically

**Post URL format:** `blog.html?post=your-slug-here`

---

## Contact Form

The contact section uses **Formspree** for AJAX form submissions without a backend.

To activate it:
1. Sign up at [formspree.io](https://formspree.io), create a new form
2. Copy the form ID from the endpoint URL
3. In `index.html`, find the `<form>` action and replace the placeholder:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

The form handles success and error states inline without page reload.

---

## CI/CD (`.github/workflows/ci.yml`)

Runs automatically on every push and pull request to `main`.

**`validate-html` job:**
- Installs `htmlhint`
- Validates all `*.html` files against `.htmlhintrc` rules
- Checks: tag pairs, unique IDs, doctype-first, src/attr not empty, title required

**`audit-assets` job:**
- Python script parses all local `src=`, `href=`, `action=` attributes
- Confirms every referenced local file exists on disk
- Fails the build if any local asset is missing

GitHub Pages deploys automatically from `main` after these checks pass.

---

## Running Locally

No build step needed. Serve the root directory with any static server:

```bash
# Python (built-in)
python -m http.server 8080

# Node.js
npx serve .

# VS Code Live Server / Five Server extensions also work
```

Open `http://localhost:8080/index.html`

---

## Updating Content

| What to change | Where |
|----------------|-------|
| Hero, about, experience, projects, contact | `index.html` |
| GitHub stats section | `index.html` + `initGitHubStats()` in `portfolio.js` |
| Blog posts | `assets/data/posts.json` |
| Navigation links | `nav.html` |
| Styles / design tokens | `assets/css/portfolio.css` |
| Resume page content | `resume.html` + `assets/css/styles.css` |
| Interests / hobbies | `interests.html` |
| Animations, carousels, scroll behavior | `assets/js/portfolio.js` |

---

## Notes

- GitHub API is unauthenticated — rate limit is 60 requests/hour per IP. Stats and language bars gracefully fall back silently if the limit is hit.
- The blog renders raw HTML from `posts.json` `content` fields — keep content trusted (no user input).
- `assets/css/styles.css` and `assets/js/main.js` are legacy files scoped to `resume.html` and `interests.html` respectively. New features go into `portfolio.css` / `portfolio.js`.
