// ============================================================
// FOLDER — small helpers for pages built from _layouts/folder.html
// ============================================================

// Links from before the split (index.html#projects, #contact, ...) go to
// the page that section became
(function () {
  const MOVED = {
    about: 'about.html',
    experience: 'experience.html',
    projects: 'projects.html',
    education: 'education.html',
    'interest-teaser': 'interests.html',
    contact: 'contact.html'
  };
  const target = MOVED[location.hash.slice(1)];
  if (target && document.getElementById('hero')) location.replace(target);
})();

// Tabs and the bottom arrows switch pages instantly: the capture phase runs
// before portfolio.js's document-level handler, so its fade-out-then-navigate never starts
document.addEventListener('click', e => {
  if (e.target.closest('.folder-tab, .folder-pager-link')) e.stopPropagation();
}, true);

// Theme toggle — drives the hidden nav's button so portfolio.js keeps
// owning the theme, and mirrors its sun/moon icon
(function () {
  const btn = document.getElementById('folder-theme');
  if (!btn) return;
  const syncIcon = () => {
    btn.querySelector('i').className =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  };
  btn.addEventListener('click', () => document.getElementById('theme-toggle')?.click());
  new MutationObserver(syncIcon).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  syncIcon();
})();

// On phones the tab row scrolls sideways; start it with the current tab in view
(function () {
  const row = document.querySelector('.folder-tabs');
  const current = row && row.querySelector('[aria-current="page"]');
  if (!current) return;
  row.scrollLeft = current.offsetLeft - (row.clientWidth - current.offsetWidth) / 2;
})();
