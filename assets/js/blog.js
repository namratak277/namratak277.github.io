/* ============================================================
   BLOG — Client-side renderer
   Posts data: assets/data/posts.json
   Listing:    blog.html
   Single post: blog.html?post=<slug>
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const main = document.getElementById('blog-main');
  if (!main) return;

  const slug = new URLSearchParams(window.location.search).get('post');

  try {
    const res = await fetch('assets/data/posts.json');
    if (!res.ok) throw new Error('Could not load posts.json');
    const { posts } = await res.json();

    if (slug) {
      const post = posts.find(p => p.slug === slug);
      if (post) renderPost(main, post);
      else renderNotFound(main, slug);
    } else {
      renderListing(main, posts);
    }
  } catch (err) {
    main.innerHTML = `
      <div class="container blog-empty">
        <i class="fas fa-triangle-exclamation" style="font-size:2.5rem;color:var(--text-muted);margin-bottom:1rem;display:block"></i>
        <p>Could not load blog posts. Please try again later.</p>
        <a href="index.html" class="btn btn-ghost" style="margin-top:1.25rem">Back to Portfolio</a>
      </div>`;
  }
});

function renderListing(main, posts) {
  document.title = 'Blog — Namrata Karki';

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  main.innerHTML = `
    <section class="section blog-hero">
      <div class="container">
        <div class="section-label center">Blog</div>
        <h1 class="section-title center">Thoughts &amp; <em>Learnings</em></h1>
        <p class="section-subtitle">Notes on tech, design, and building things that work.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="blog-grid" id="blog-grid"></div>
      </div>
    </section>
  `;

  const grid = main.querySelector('#blog-grid');

  sorted.forEach(post => {
    const card = document.createElement('a');
    card.className = 'blog-card fade-in';
    card.href = `blog.html?post=${post.slug}`;
    card.setAttribute('aria-label', post.title);
    card.innerHTML = `
      <div class="blog-card-meta">
        <span class="blog-category">${escHtml(post.category)}</span>
        <span class="blog-date">${formatDate(post.date)}</span>
        <span class="blog-read-time"><i class="fas fa-clock"></i> ${escHtml(post.readTime)}</span>
      </div>
      <h2>${escHtml(post.title)}</h2>
      <p>${escHtml(post.excerpt)}</p>
      <div class="blog-tags">
        ${post.tags.map(t => `<span class="blog-tag">${escHtml(t)}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });

  requestAnimationFrame(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    main.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });
}

function renderPost(main, post) {
  document.title = `${post.title} — Namrata Karki`;

  main.innerHTML = `
    <div class="section">
      <div class="container">
        <div class="blog-post-wrap">
          <a href="blog.html" class="blog-post-back">
            <i class="fas fa-arrow-left"></i> All Posts
          </a>
          <div class="blog-post-header">
            <span class="blog-category">${escHtml(post.category)}</span>
            <h1>${escHtml(post.title)}</h1>
            <div class="blog-post-meta">
              <span class="blog-date"><i class="fas fa-calendar-alt"></i> ${formatDate(post.date)}</span>
              <span class="blog-read-time"><i class="fas fa-clock"></i> ${escHtml(post.readTime)}</span>
              <div class="blog-tags">
                ${post.tags.map(t => `<span class="blog-tag">${escHtml(t)}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="blog-post-body">${post.content}</div>
          <div class="blog-post-footer">
            <a href="blog.html" class="blog-post-back">
              <i class="fas fa-arrow-left"></i> Back to Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  initReadingProgress(main);
}

function initReadingProgress(main) {
  const postBody = main.querySelector('.blog-post-body');
  if (!postBody) return;

  const wrap = document.createElement('div');
  wrap.className = 'blog-reading-progress';
  const bar = document.createElement('div');
  bar.className = 'blog-reading-bar';
  wrap.appendChild(bar);
  document.body.appendChild(wrap);

  const update = () => {
    const bodyTop = postBody.getBoundingClientRect().top + window.scrollY;
    const range = postBody.offsetHeight - window.innerHeight;
    if (range <= 0) { bar.style.width = '100%'; return; }
    const pct = Math.min(100, Math.max(0, ((window.scrollY - bodyTop) / range) * 100));
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function renderNotFound(main, slug) {
  document.title = 'Post Not Found — Namrata Karki';
  main.innerHTML = `
    <div class="container blog-empty">
      <i class="fas fa-file-circle-question" style="font-size:3rem;color:var(--text-muted);margin-bottom:1rem;display:block"></i>
      <p>Post not found: <code>${escHtml(slug)}</code></p>
      <a href="blog.html" class="btn btn-ghost" style="margin-top:1.25rem">View All Posts</a>
    </div>
  `;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
