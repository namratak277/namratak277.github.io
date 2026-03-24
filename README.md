# namratak277.github.io

Personal portfolio site built with HTML, CSS, and JavaScript, deployed on GitHub Pages.

## Overview

This project is a multi-page portfolio website. Pages are static, but JavaScript adds shared navigation behavior and live GitHub repository data on the Projects page.

Language/tools:
- HTML5 for page structure
- CSS (`assets/css/styles.css`) for layout, theme, responsiveness, and page-specific components
- JavaScript (`assets/js/main.js`) for dynamic navigation injection and GitHub API rendering
- Bootstrap + Font Awesome for utility classes and icons

## Project Structure

Top-level pages:
- `index.html`: Main  page (bio, education, experience, skills)
- `projects.html`: Live GitHub repository gallery
- `resume.html`: Resume-focused page with experience highlights and download links
- `personal.html`: Personal interests/hobbies page with media sections
- `interests.html`: Category-based hobbies page (legacy/alternate personal page)
- `nav.html`: Shared navigation partial loaded into pages that use `#nav-slot`

Assets:
- `assets/css/styles.css`: Global theme + component styles for all pages
- `assets/js/main.js`: Shared client-side behavior and GitHub API integration
- `assets/images/`: Profile and hobby images
- `assets/files/`: Resume and downloadable files
- `assets/plugins/`: Local third-party dependencies (Bootstrap, jQuery, Font Awesome, etc.)

## Page-by-Page Documentation

### `index.html` (Home)

Purpose:
- Acts as the main landing page and professional summary.

Key sections:
- Shared navigation via `#nav-slot`
- Hero/header with profile image, objective statement, and call-to-action buttons
- Education section with degree/coursework details
- Work experience section with summaries of professional roles
- Right-column sidebars for technical skills, leadership, and languages
- Footer with contact/social information

How it works:
- Mostly static HTML content with resume information synced from `resume.html`.
- Includes `assets/js/main.js` for `#nav-slot` injection and optional GitHub project feed rendering.
- Uses classes in `styles.css` for two-column layout, cards, and themed typography/colors.

### `projects.html` (GitHub Gallery)

Purpose:
- Displays a live gallery of public GitHub repositories.

Key sections:
- Shared navigation via `#nav-slot`
- `My GitHub Gallery` section with container `#github-gallery`
- Footer with contact/social links

How it works:
- `main.js` requests repos from GitHub API:
	- `https://api.github.com/users/namratak277/repos?sort=updated`
- Filters out forked repositories.
- Renders up to 8 repos into cards (`.repo-card`) in `.repo-gallery-grid`.
- For each repo, it calls `repo.languages_url` to fetch languages and displays up to 4 language pills.
- Includes basic fallbacks for API errors and missing language data.

### `interests.html` (Interests - Category View)

Purpose:
- Alternate interests page organized by hobby categories and anchor links.

Key sections:
- Shared navigation via `#nav-slot`
- Category overview links
- Detailed hobby blocks under categories
- Footer with contact/social links

How it works:
- Entirely static layout and content blocks.
- Loads `main.js` for `#nav-slot` navigation injection and active link detection.

### `nav.html` (Shared Navigation Partial)

Purpose:
- Single source of truth for navigation links used by all pages.

Contents:
- Navigation bar with brand and links: Home, Projects, Resume, Interests.
- Each link includes a `data-page` attribute for active page detection.

How it works:
- `main.js` fetches this file and injects it into `#nav-slot` placeholders on all pages.
- Script detects current page pathname and marks the matching link as active.
- Ensures consistent navigation across the entire site.

## JavaScript Logic (`assets/js/main.js`)

Execution flow:
1. Wait for `document.ready`.
2. If `#nav-slot` exists:
- Fetch `nav.html`.
- Inject HTML into `#nav-slot`.
- Compute current pathname and set active nav link.
3. On `window.load`:
- Animate any `.level-bar-inner` skill bars (if present).
- Enable tooltips on `.level-label`.
- Fetch GitHub repositories.
- Render optional containers if they exist:
	- `#project-feed` (home-style compact feed)
	- `#github-gallery` (projects page gallery)

Important behaviors:
- Defensive checks prevent errors on pages missing specific containers.
- API fallbacks show user-friendly error messages.
- Language pills are fetched asynchronously per repository.

Main functions:
- `requestUserRepos(username)`: Fetches repositories sorted by update time.
- `renderProjectFeed(repos)`: Renders first 4 repos for compact feed layouts.
- `renderGitHubGallery(repos)`: Renders first 8 repos as gallery cards.
- `buildLanguageList(repo)`: Fetches languages and returns a populated `<ul>`.
- `setLoadError(elementId)`: Displays an API failure message in target container.
- `requestRepoLanguages(url)`: Fetches repository language metadata.

## CSS Logic (`assets/css/styles.css`)

High-level organization:
- Global reset and root theme variables (`:root`)
- Typography and shared element styling
- Navigation styles (`.navbar`, `.navbar-menu`, etc.)
- Section/card system (`.section`, `.section-inner`, `.heading`)
- Page-specific components (skills, hobby cards, contact blocks, repo gallery)

Theme model:
- Uses custom properties (`--navy`, `--light-blue`, etc.) for consistent color usage.
- Most sections use a gradient panel style (`.section-inner`) for a cohesive visual system.

GitHub gallery styling:
- `.github-gallery .section-inner`: Gallery container layout and spacing
- `.github-gallery .heading`: Center alignment for gallery title
- `.repo-gallery-grid`: Responsive CSS grid for repo cards
- `.repo-card`: Card visuals (background, border, shadow, spacing)
- `.pill`: Reusable chip style for language labels

## Data Flow: GitHub Gallery

1. Page loads and `main.js` runs.
2. Script calls GitHub user repos endpoint.
3. Non-fork repositories are selected.
4. Up to 8 repos are rendered in the gallery.
5. For each repo card, a second request fetches languages.
6. Language chips are appended when data returns.
7. If any request fails, fallback message is shown.

## Running Locally

Because this is a static site, any local server works.

Example options:
- VS Code Five Server extension (already used in this project)
- VS Code Live Server extension
- Any static server (`python -m http.server`, `npx serve`, etc.)

Then open:
- `http://localhost:<port>/index.html`

## Updating Content

Common updates:
- Home bio/experience/skills: edit `index.html`
- Projects gallery heading/intro: edit `projects.html`
- Resume details and links: edit `resume.html`
- Personal/hobby content: edit `personal.html` and/or `interests.html`
- Shared nav links: edit `nav.html`
- Site-wide styles/theme: edit `assets/css/styles.css`
- Dynamic behavior/API logic: edit `assets/js/main.js`

### `resume.html` (Full Resume)

Purpose:
- Dedicated resume page with full professional details and download option.

Key sections:
- Shared navigation via `#nav-slot`
- Professional objective/summary
- Education and skills (side-by-side layout on large screens)
- Course projects (full project descriptions)
- Professional experience (all roles in compact card layout)
- Download resume button

How it works:
- Structured as a printable resume page with `.resume-page` class for scoped styling.
- Implements responsive side-by-side layout: Education (col-lg-5) + Skills (col-lg-7) on large screens.
- Experience cards displayed in 2-column grid on medium+ screens, stacking on mobile.
- Maintains uniform 16px spacing between all major sections for clean visual hierarchy.
- Includes `assets/js/main.js` for `#nav-slot` injection.

## Navigation Architecture

**All pages now use unified navigation via `#nav-slot`:**
- `index.html` → `#nav-slot`
- `projects.html` → `#nav-slot`
- `resume.html` → `#nav-slot`
- `interests.html` → `#nav-slot`
- `personal.html` → `#nav-slot`

This ensures:
- Single source of truth (edit once in `nav.html`, updates everywhere)
- Consistent active link highlighting across all pages
- Easy maintenance when adding/removing navigation items

## Notes

- The GitHub API is unauthenticated in this setup, so very high traffic could hit rate limits.
- Resume content is maintained in both `index.html` and `resume.html` and should be kept in sync.
