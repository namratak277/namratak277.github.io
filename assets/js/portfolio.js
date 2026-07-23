/* ============================================================
   NAMRATA KARKI PORTFOLIO — Interactive JavaScript
   ============================================================ */

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', async function() {
  // Load shared nav from nav.html into #nav-slot to reduce duplication
  try {
    const navSlot = document.getElementById('nav-slot');
    if (navSlot) {
      const resp = await fetch('nav.html');
      if (resp.ok) {
        navSlot.innerHTML = await resp.text();
      }
    }
  } catch (err) {
    console.warn('Could not load nav.html', err);
  }
  // ============================================================
  // NAVIGATION INTERACTIONS
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navBar = document.querySelector('.nav');

  // Mobile nav backdrop
  const navBackdrop = document.createElement('div');
  navBackdrop.className = 'nav-backdrop';
  document.body.appendChild(navBackdrop);

  const closeNav = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    navBackdrop.classList.remove('open');
  };

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      const opening = !navLinks.classList.contains('open');
      navLinks.classList.toggle('open', opening);
      hamburger.classList.toggle('open', opening);
      navBackdrop.classList.toggle('open', opening);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  navBackdrop.addEventListener('click', closeNav);

  // Initialize index streaming grid if present (used on interests.html)
  initIndexStreamingGrid();

  // Initialize interests filters if present (used on interests.html)
  initInterestFilters();

  // Initialize contact form AJAX submission
  initContactForm();

  // Education "academic foundation" carousel (static content, wire immediately)
  initCarousel(document.getElementById('edu-carousel-wrap'));

  // Any static flip cards already in the DOM (e.g. brandcard.html) — the
  // Experience section's own cards are wired again after they're rendered
  initImpactCards();

  // Initialize theme toggle (button is inside nav, so call after nav loads)
  initThemeToggle();

  // UI features
  initScrollProgress();
  initTypewriter();
  initHeroCharGrid();
  initPageTransitions();
  initCustomCursor();

  // Data-driven sections — fetch JSON, render dynamically
  initSkillsFromData();
  initExperienceFromData();
  initInterestsTeaserFromData();
  initProjectsFromData();

  // Scroll effect on navbar
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
  });

  // ============================================================
  // SMOOTH SCROLL BEHAVIOR
  // Handles both href="#section" and href="index.html#section"
  // ============================================================
  document.querySelectorAll('a[href]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href) return;
      let hash = null;
      if (href[0] === '#') {
        hash = href;
      } else {
        try {
          const url = new URL(href, window.location.href);
          if (url.hash && url.pathname === window.location.pathname) hash = url.hash;
        } catch (_) {}
      }
      if (!hash) return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // FADE-IN ANIMATION ON SCROLL
  // ============================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  window._portfolioFadeObserver = observer;

  // Observe static section wrappers; dynamic cards observed after render
  document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ============================================================
  // ACTIVE LINK HIGHLIGHTING
  // ============================================================
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ============================================================
  // PARALLAX EFFECT (optional)
  // ============================================================
  const heroOrbs = document.querySelectorAll('.hero-orb');
  if (heroOrbs.length > 0) {
    window.addEventListener('mousemove', function(e) {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;

      heroOrbs.forEach(orb => {
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ============================================================
  // BUTTON RIPPLE EFFECT
  // ============================================================
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================================
  // COPY TO CLIPBOARD (optional for contact info)
  // ============================================================
  document.querySelectorAll('.copy-to-clipboard').forEach(element => {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      });
    });
  });

  // ============================================================
  // CONSOLE MESSAGE
  // ============================================================
  console.log('%cWelcome to Namrata\'s Portfolio', 'color: #E09F3E; font-size: 20px; font-weight: bold;');
  console.log('%cDesigned & Built with ❤️ using HTML5, CSS3, and JavaScript', 'color: #99bee8; font-size: 12px;');
});

  // ============================================================
  // Shared: autoplay a horizontal row, pausing while hovered
  // ============================================================
  function initAutoScrollRow(row, fraction = 0.25, intervalMs = 3000) {
    let auto;
    let paused = false;
    const start = () => {
      clearInterval(auto);
      auto = setInterval(() => {
        if (!paused) row.scrollBy({ left: row.clientWidth * fraction, behavior: 'smooth' });
      }, intervalMs);
    };
    row.addEventListener('mouseenter', () => { paused = true; });
    row.addEventListener('mouseleave', () => { paused = false; });
    start();
  }

  // ============================================================
  // Index: Streaming row autoplay + preview modal
  // (the homepage's #interests-row is populated from JSON and wires
  // its own autoplay in initInterestsTeaserFromData — skip it here)
  // ============================================================
  function initIndexStreamingGrid() {
    document.querySelectorAll('.netflix-row:not(#interests-row)').forEach(row => {
      initAutoScrollRow(row);

      // click to open preview modal
      row.querySelectorAll('.netflix-card').forEach(card => {
        card.addEventListener('click', () => {
          const img = card.querySelector('img');
          const title = card.querySelector('.card-title') ? card.querySelector('.card-title').textContent : '';
          const caption = card.querySelector('.card-caption') ? card.querySelector('.card-caption').textContent : '';
          openPreviewModal(img ? img.src : '', title, caption);
        });
      });
    });
  }

  function openPreviewModal(src, title, caption) {
    const existing = document.getElementById('preview-modal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.id = 'preview-modal';
    modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,4,3,0.85);z-index:3000;padding:2rem;';
    modal.innerHTML = `<div style="max-width:960px;width:100%;border-radius:12px;overflow:hidden;background:#0c1e24;box-shadow:0 20px 60px rgba(8,3,2,0.85);">
      <div style="position:relative;padding:1rem 1rem 0;background:#0c1e24"><button id="pm-close" style="position:absolute;right:10px;top:6px;background:none;border:none;color:#FFF3B0;font-size:1.25rem;cursor:pointer">✕</button>
      <img src="${src}" style="width:100%;height:360px;object-fit:cover;display:block" alt="${title}"></div>
      <div style="padding:1rem 1.25rem;color:var(--text-muted)"><h3 style="margin:0 0 .5rem;color:var(--white)">${title}</h3><p style="margin:0">${caption}</p></div>
    </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.id === 'pm-close') modal.remove(); });
    document.body.appendChild(modal);
  }

  // ============================================================
  // Interests: Tag filtering
  // ============================================================
  function initInterestFilters() {
    const grid = document.getElementById('interest-grid');
    if (!grid) return;
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        filterGridByTag(grid, filter);
      });
    });
    // default select All
    const defaultChip = document.querySelector('.filter-chip[data-filter="all"]');
    if (defaultChip) defaultChip.click();
  }

  function filterGridByTag(grid, tag) {
    const cards = grid.querySelectorAll('.netflix-card');
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(',').map(t => t.trim()).filter(Boolean);
      if (tag === 'all' || tags.includes(tag)) {
        card.style.display = '';
        card.classList.remove('filtered-out');
      } else {
        card.style.display = 'none';
        card.classList.add('filtered-out');
      }
    });
  }

  // ============================================================
  // Generic infinitely-looping horizontal carousel
  // Duplicates the row's cards once so the auto-scroll can wrap
  // seamlessly, then autoplays and exposes manual arrow controls.
  // ============================================================
  function initCarousel(wrap) {
    if (!wrap || wrap._carouselInit) return;
    wrap._carouselInit = true;

    const row        = wrap.querySelector('.skills-carousel-row');
    const leftButton  = wrap.querySelector('.carousel-arrow-left');
    const rightButton = wrap.querySelector('.carousel-arrow-right');
    if (!row) return;

    // Duplicate the cards once so there's always more track to scroll into
    if (row.children.length) row.innerHTML += row.innerHTML;

    const getStep = () => {
      const card = row.firstElementChild;
      if (!card) return Math.max(280, Math.floor(row.clientWidth * 0.72));
      const gap = 18;
      return Math.round(card.getBoundingClientRect().width + gap);
    };

    const halfWidth = () => row.scrollWidth / 2;

    const normalize = () => {
      const half = halfWidth();
      if (row.scrollLeft >= half) row.scrollLeft -= half;
      else if (row.scrollLeft < 0) row.scrollLeft += half;
    };

    if (leftButton) leftButton.addEventListener('click', () => {
      normalize();
      row.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    if (rightButton) rightButton.addEventListener('click', () => {
      normalize();
      row.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    let paused = false;
    row.addEventListener('mouseenter', () => { paused = true; });
    row.addEventListener('mouseleave', () => { paused = false; });

    let normTimer;
    row.addEventListener('scroll', () => {
      clearTimeout(normTimer);
      normTimer = setTimeout(normalize, 150);
    }, { passive: true });

    setInterval(() => {
      if (paused || halfWidth() <= row.clientWidth) return;
      row.scrollBy({ left: getStep(), behavior: 'smooth' });
    }, 3200);
  }

  // ============================================================
  // IMPACT CARDS — click/tap or Enter/Space to flip
  // ============================================================
  function initImpactCards() {
    document.querySelectorAll('.impact-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('flipped'));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('flipped');
        }
      });
    });
  }

// ============================================================
// CONTACT FORM — AJAX submit via Formspree, inline status
// ============================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    if (status) { status.className = 'form-status'; status.textContent = ''; }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (status) {
          status.className = 'form-status success';
          status.textContent = "Message sent! I'll get back to you soon.";
        }
      } else {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Server error ' + res.status);
      }
    } catch (err) {
      if (status) {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please email me directly at namratak277@gmail.com';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  });
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ============================================================
// TYPEWRITER ROLE CYCLING
// ============================================================
function initTypewriter() {
  const el = document.getElementById('typewriter-role');
  if (!el) return;
  const roles = ['IT Support Specialist', 'Data Analyst', 'Software Developer', 'Project Coordinator'];
  let ri = 0, ci = 0, deleting = false;
  const TYPE = 80, DEL = 42, PAUSE = 2200, RESTART = 360;

  (function tick() {
    const word = roles[ri];
    if (deleting) {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, RESTART); return; }
      setTimeout(tick, DEL);
    } else {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(tick, PAUSE); return; }
      setTimeout(tick, TYPE);
    }
  })();
}

// ============================================================
// HERO CHARACTER GRID — hot-zone code rain
// ============================================================
function initHeroCharGrid() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const heroBg = hero.querySelector('.hero-bg');
  if (!heroBg) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'hero-chargrid';
  heroBg.appendChild(canvas);
  hero.classList.add('hero-chargrid-active');

  const ctx = canvas.getContext('2d');

  const CELL      = 32;           // grid cell size px
  const FONT      = 11;           // character font-size px
  const RADIUS    = 118;          // cursor heat radius px
  const CHARS     = '01ABCDEFabcdef39कखगनमरतसहपलवअइउए०१२३४५६७८९'.split('');
  const isTouch   = window.matchMedia('(pointer: coarse)').matches;

  const mouse   = { x: -9999, y: -9999 };
  let cells     = [];
  let drops     = [];
  let animId    = null;
  let lastTs    = 0;

  // Ambient scan line — sweeps top→bottom every ~7 s
  const scan = { y: -CELL, active: false, timer: 0 };
  const SCAN_PERIOD = 7200;
  const SCAN_SPEED  = 1.9;
  const SCAN_HALF   = 40;
  const SCAN_PEAK   = 0.36;

  // Touch auto-wander
  let wt = 0;

  function rc() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }

  // Teal (cool) → bright cyan (warm) → gold (hot)
  function heatColor(h) {
    let r, g, b, a;
    if (h <= 0.5) {
      const t = h * 2;
      r = Math.round(51  + (82  - 51)  * t);
      g = Math.round(92  + (210 - 92)  * t);
      b = Math.round(103 + (230 - 103) * t);
      a = 0.09 + 0.56 * t;
    } else {
      const t = (h - 0.5) * 2;
      r = Math.round(82  + (224 - 82)  * t);
      g = Math.round(210 + (159 - 210) * t);
      b = Math.round(230 + (62  - 230) * t);
      a = 0.65 + 0.27 * t;
    }
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }

  function buildGrid() {
    cells = [];
    const cols = Math.ceil(canvas.width  / CELL) + 1;
    const rows = Math.ceil(canvas.height / CELL) + 1;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        cells.push({
          x:  c * CELL + CELL * 0.5,
          y:  r * CELL + CELL * 0.5,
          ch: rc(),
          heat: 0,
          ct:  Math.random() * 3000,
        });
      }
    }
  }

  function spawnDrop(cell) {
    if (drops.length > 180) return;
    drops.push({ x: cell.x, y: cell.y, vy: 1.3 + Math.random() * 1.5, ch: cell.ch, a: 0.80, ct: 0 });
  }

  function frame(ts) {
    const dt = Math.min(ts - lastTs, 80);
    lastTs = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font         = `${FONT}px 'Fira Code','Cascadia Code','Consolas',monospace`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    // Scan line
    scan.timer += dt;
    if (!scan.active && scan.timer >= SCAN_PERIOD) { scan.y = -CELL; scan.active = true; scan.timer = 0; }
    if (scan.active) {
      scan.y += SCAN_SPEED * (dt / 16.67);
      if (scan.y > canvas.height + CELL) scan.active = false;
    }

    // Touch auto-wander
    if (isTouch) {
      wt += dt * 0.00042;
      mouse.x = canvas.width  * 0.5 + Math.cos(wt)        * canvas.width  * 0.34;
      mouse.y = canvas.height * 0.5 + Math.sin(wt * 0.61) * canvas.height * 0.30;
    }

    // Cells
    cells.forEach(cell => {
      const dx = cell.x - mouse.x, dy = cell.y - mouse.y;
      let target = Math.max(0, 1 - Math.sqrt(dx*dx + dy*dy) / RADIUS);
      if (scan.active) {
        const sd = Math.abs(cell.y - scan.y);
        target = Math.max(target, SCAN_PEAK * Math.max(0, 1 - sd / SCAN_HALF));
      }

      // Heat rises fast, cools slowly for a lingering glow
      cell.heat += (target - cell.heat) * (target > cell.heat ? 0.13 : 0.055);

      cell.ct += dt;
      const interval = cell.heat > 0.08 ? 55 + (1 - cell.heat) * 310 : 2600 + Math.random() * 1600;
      if (cell.ct >= interval) {
        cell.ch = rc();
        cell.ct = 0;
        if (cell.heat > 0.60 && Math.random() < 0.15) spawnDrop(cell);
      }

      ctx.fillStyle = heatColor(cell.heat);
      ctx.fillText(cell.ch, cell.x, cell.y);
    });

    // Falling drops
    drops = drops.filter(d => d.a > 0.022);
    drops.forEach(d => {
      d.y  += d.vy * (dt / 16.67);
      d.a  *= 0.953;
      d.ct += dt;
      if (d.ct > 105) { d.ch = rc(); d.ct = 0; }
      ctx.fillStyle = `rgba(224,159,62,${d.a.toFixed(2)})`;
      ctx.fillText(d.ch, d.x, d.y);
    });

    animId = requestAnimationFrame(frame);
  }

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    buildGrid();
  }

  resize();
  lastTs = performance.now();
  animId = requestAnimationFrame(frame);

  window.addEventListener('resize', resize, { passive: true });
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) { cancelAnimationFrame(animId); animId = null; }
    else if (!animId) { lastTs = performance.now(); animId = requestAnimationFrame(frame); }
  }, { threshold: 0 }).observe(hero);
}

// ============================================================
// PAGE TRANSITION OVERLAY
// ============================================================
function initPageTransitions() {
  const ov = document.createElement('div');
  ov.className = 'page-transition-overlay';
  ov.style.opacity = '1';
  document.body.appendChild(ov);

  // Reveal page on load
  requestAnimationFrame(() => requestAnimationFrame(() => {
    ov.style.transition = 'opacity 0.45s ease';
    ov.style.opacity = '0';
  }));

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href[0] === '#' || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        a.hasAttribute('download') || a.getAttribute('target') === '_blank') return;
    // Skip same-page hash links (e.g. "index.html#about" when already on index.html)
    try {
      const url = new URL(href, window.location.href);
      if (url.hash && url.pathname === window.location.pathname) return;
    } catch (_) {}
    e.preventDefault();
    ov.style.pointerEvents = 'all';
    ov.style.transition = 'opacity 0.38s ease';
    ov.style.opacity = '1';
    setTimeout(() => { window.location.href = href; }, 400);
  });
}

// ============================================================
// ============================================================
// CUSTOM CURSOR — gold glow dot + spark particles + labels
// ============================================================
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot   = document.createElement('div');   dot.className   = 'cursor-dot';
  const label = document.createElement('div');   label.className = 'cursor-label';
  document.body.appendChild(dot);
  document.body.appendChild(label);

  let mx = -200, my = -200, prevMx = -200, prevMy = -200;

  // ── Spark pool ───────────────────────────────────────────
  let partCount = 0;
  const MAX_PARTS = 14;

  function spawnParticle(x, y, vx, vy) {
    if (partCount >= MAX_PARTS) return;
    partCount++;
    const p = document.createElement('div');
    p.className = 'cursor-particle';
    document.body.appendChild(p);
    const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.6;
    const spd = 0.6 + Math.random() * 1.6;
    const life = 320 + Math.random() * 130;
    let px = x, py = y, age = 0;
    const pvx = Math.cos(angle) * spd, pvy = Math.sin(angle) * spd;
    const tick = setInterval(() => {
      age += 16; px += pvx; py += pvy;
      const a = Math.max(0, 1 - age / life);
      p.style.left = px + 'px'; p.style.top = py + 'px';
      p.style.opacity = a.toFixed(2);
      p.style.transform = `translate(-50%,-50%) scale(${(0.3 + a * 0.7).toFixed(2)})`;
      if (age >= life) { clearInterval(tick); p.remove(); partCount--; }
    }, 16);
  }

  // ── Mouse tracking ───────────────────────────────────────
  document.addEventListener('mousemove', e => {
    prevMx = mx; prevMy = my;
    mx = e.clientX; my = e.clientY;
    dot.style.left   = mx + 'px';
    dot.style.top    = my + 'px';
    label.style.left = mx + 'px';
    label.style.top  = (my + 14) + 'px';
    const dx = mx - prevMx, dy = my - prevMy;
    if (Math.hypot(dx, dy) > 8 && Math.random() < 0.4)
      spawnParticle(mx, my, dx, dy);
  });

  // ── Contextual labels ────────────────────────────────────
  const INTERACTIVE = 'a,button,[role="button"],input,textarea,select,.project-card,.skill-card,.impact-card,.netflix-card,.bento-tile,.blog-card,.carousel-arrow,.cloud-tag,.skill-view-btn';
  const LABEL_RULES = [
    ['.project-card',                                    'VIEW'  ],
    ['.blog-card',                                       'READ'  ],
    ['.netflix-card',                                    'OPEN'  ],
    ['[download],[href*="resume"],[href*="Resume"]',     'SAVE'  ],
    ['[type="submit"]',                                  'SEND'  ],
    ['.hero-socials a,.footer-socials a,.contact-link',  'VISIT' ],
    ['.nav-links a,.nav-logo',                           'GO'    ],
  ];
  function detectLabel(t) {
    for (const [s, l] of LABEL_RULES) { try { if (t.closest(s)) return l; } catch (_) {} }
    return null;
  }

  document.addEventListener('mouseover', e => {
    const el = e.target.closest(INTERACTIVE);
    if (!el) return;
    dot.classList.add('hover');
    const lbl = detectLabel(e.target);
    if (lbl) { label.textContent = lbl; label.classList.add('visible'); }
  });
  document.addEventListener('mouseout', e => {
    if (!e.target.closest(INTERACTIVE)) return;
    dot.classList.remove('hover');
    label.classList.remove('visible');
  });
  document.addEventListener('mousedown', () => dot.classList.add('click'));
  document.addEventListener('mouseup',   () => dot.classList.remove('click'));

  document.documentElement.addEventListener('mouseleave', () => {
    dot.style.opacity = '0'; label.classList.remove('visible');
  });
  document.documentElement.addEventListener('mouseenter', () => {
    dot.style.opacity = '';
  });
}

async function initSkillsFromData() {
  const section   = document.getElementById('skills');
  if (!section) return;
  const row       = document.getElementById('skills-carousel-row');
  const cloudWrap = section.querySelector('.skills-cloud-wrap');
  const viewBar   = section.querySelector('.skills-view-bar');
  const carousel  = document.getElementById('skills-carousel-wrap');
  if (!row) return;

  let data;
  try {
    const res = await fetch('assets/data/skills.json');
    if (!res.ok) throw new Error('skills fetch failed');
    data = await res.json();
  } catch (e) {
    console.warn('Could not load skills.json:', e);
    return;
  }

  const CAT_CLASSES = ['cat-lang','cat-db','cat-sys','cat-anal','cat-lead','cat-course'];

  // ── Render carousel cards ────────────────────────────────
  row.innerHTML = data.categories.map(cat => `
    <div class="skill-card fade-in">
      <div class="skill-card-header">
        <div class="skill-card-icon"><i class="${esc(cat.icon)}"></i></div>
        <h3>${esc(cat.category)}</h3>
      </div>
      <div class="skb-list">
        ${cat.skills.map(s => `
          <div class="skb">
            <span class="skb-name">${esc(s.name)}</span>
            <span class="skb-rating">${s.rating}/5</span>
            <div class="skb-track"><div class="skb-fill" data-pct="${(s.rating / 5) * 100}"></div></div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  if (window._portfolioFadeObserver) {
    row.querySelectorAll('.skill-card').forEach(el => window._portfolioFadeObserver.observe(el));
  }

  // ── Build cloud tags from JSON data ──────────────────────
  if (cloudWrap) {
    cloudWrap.innerHTML = '';
    const pools = {};
    data.categories.forEach((cat, ci) => {
      const cls = CAT_CLASSES[ci % CAT_CLASSES.length];
      cat.skills.forEach(s => {
        const sz = s.rating >= 4.5 ? 'sz-lg' : s.rating >= 3 ? 'sz-md' : 'sz-sm';
        (pools[cls] = pools[cls] || []).push({ name: s.name, cls, sz });
      });
    });
    const catKeys = Object.keys(pools);
    const maxL = Math.max(...catKeys.map(c => pools[c].length));
    let idx = 0;
    for (let i = 0; i < maxL; i++) {
      catKeys.forEach(c => {
        const s = pools[c][i];
        if (!s) return;
        const span = document.createElement('span');
        span.className = `cloud-tag ${s.cls} ${s.sz}`;
        span.textContent = s.name;
        span.style.animationDelay = (idx * 24) + 'ms';
        cloudWrap.appendChild(span);
        idx++;
      });
    }
  }

  // ── Animate bars on scroll ───────────────────────────────
  let barsAnimated = false;
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || barsAnimated) return;
    barsAnimated = true;
    section.querySelectorAll('.skb-fill').forEach((fill, i) => {
      setTimeout(() => { fill.style.width = (fill.getAttribute('data-pct') || '0') + '%'; }, i * 40);
    });
  }, { threshold: 0.2 }).observe(section);

  // ── Toggle Cards / Cloud ─────────────────────────────────
  if (viewBar && carousel) {
    viewBar.querySelectorAll('.skill-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        viewBar.querySelectorAll('.skill-view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.getAttribute('data-view') === 'cloud') {
          carousel.hidden  = true;
          if (cloudWrap) cloudWrap.hidden = false;
        } else {
          carousel.hidden  = false;
          if (cloudWrap) cloudWrap.hidden = true;
        }
      });
    });
  }

  initCarousel(carousel);
}

// ============================================================
// EXPERIENCE — fetch experience.json, render flip-card grid
// ============================================================
async function initExperienceFromData() {
  const grid = document.getElementById('impact-grid');
  if (!grid) return;

  let data;
  try {
    const res = await fetch('assets/data/experience.json');
    if (!res.ok) throw new Error();
    data = await res.json();
  } catch (e) {
    console.warn('Could not load experience.json:', e);
    return;
  }

  grid.innerHTML = data.jobs.map(job => `
    <article class="impact-card fade-in" tabindex="0" role="button" aria-label="${esc(job.title)} — flip for details">
      <div class="impact-card-inner">
        <div class="impact-face impact-front">
          <div class="impact-icon"><i class="${esc(job.icon)}"></i></div>
          <h3>${esc(job.title)}</h3>
          <p class="impact-org">${esc(job.org)} &middot; ${esc(job.dates)}</p>
          ${job.metric ? `
            <div class="impact-metric">
              <span class="impact-metric-num">${esc(job.metric)}</span>
              <span class="impact-metric-label">${esc(job.metricLabel)}</span>
            </div>` : ''}
          <p class="impact-hook">${esc(job.summary)}</p>
          <span class="impact-flip-hint"><i class="fas fa-arrows-rotate"></i> Flip for details</span>
        </div>
        <div class="impact-face impact-back">
          <h3>${esc(job.title)}</h3>
          <ul>${job.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
          <div class="impact-tags">${job.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
      </div>
    </article>
  `).join('');

  if (window._portfolioFadeObserver) {
    grid.querySelectorAll('.impact-card').forEach(el => window._portfolioFadeObserver.observe(el));
  }

  initImpactCards();
}

// ============================================================
// INTERESTS TEASER — fetch interests.json, render home cards
// ============================================================
async function initInterestsTeaserFromData() {
  const row = document.getElementById('interests-row');
  if (!row) return;

  let data;
  try {
    const res = await fetch('assets/data/interests.json');
    if (!res.ok) throw new Error();
    data = await res.json();
  } catch (e) {
    console.warn('Could not load interests.json:', e);
    return;
  }

  row.innerHTML = data.interests.map(item => `
    <div class="netflix-card itc" data-tags="${esc(item.data_tags)}">
      <div class="itc-icon"><i class="${esc(item.icon)}"></i></div>
      <div class="itc-body">
        <div class="card-title">${esc(item.title)}</div>
        <p class="itc-desc">${esc(item.description)}</p>
        <div class="itc-tags">${item.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');

  initAutoScrollRow(row);
}

// ============================================================
// PROJECTS — fetch projects.json, render grid
// ============================================================
async function initProjectsFromData() {
  const projectsGrid  = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  let data;
  try {
    const res = await fetch('assets/data/projects.json');
    if (!res.ok) throw new Error();
    data = await res.json();
  } catch (e) {
    console.warn('Could not load projects.json:', e);
    return;
  }

  if (projectsGrid && data.projects) {
    projectsGrid.innerHTML = data.projects.map(p => `
      <div class="project-card${p.featured ? ' featured' : ''} fade-in">
        <div class="project-card-top">
          <div class="project-icon"><i class="${esc(p.icon)}"></i></div>
          <div class="project-links"><a href="${esc(p.github)}" target="_blank"><i class="fab fa-github"></i></a></div>
        </div>
        <span class="project-type">${esc(p.type)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      </div>
    `).join('');

    if (window._portfolioFadeObserver) {
      projectsGrid.querySelectorAll('.project-card').forEach(el => window._portfolioFadeObserver.observe(el));
    }
  }
}

// ============================================================
// THEME TOGGLE (light / dark)
// ============================================================
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const getTheme = () => localStorage.getItem('theme') || 'light';

  const apply = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = toggle.querySelector('i');
    if (icon) icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', theme);
  };

  apply(getTheme());
  toggle.addEventListener('click', () => {
    apply(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
}