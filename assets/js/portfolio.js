/* ============================================================
   NAMRATA KARKI PORTFOLIO — Interactive JavaScript
   ============================================================ */

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

  // Toggle hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // Initialize index streaming grid if present
  initIndexStreamingGrid();

  // Initialize interests filters if present
  initInterestFilters();

  // Initialize skills carousel auto-scroll
  initSkillsCarousel();

  // Initialize timeline event clicks
  initTimelineEvents();

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
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
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

  // Add fade-in class to elements and observe
  document.querySelectorAll('.section, .skill-card, .project-card, .timeline-card').forEach(el => {
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
  console.log('%cWelcome to Namrata\'s Portfolio', 'color: #3b74c8; font-size: 20px; font-weight: bold;');
  console.log('%cDesigned & Built with ❤️ using HTML5, CSS3, and JavaScript', 'color: #99bee8; font-size: 12px;');
});

  // ============================================================
  // Index: Streaming row autoplay + preview modal
  // ============================================================
  function initIndexStreamingGrid() {
    const rows = document.querySelectorAll('.netflix-row');
    if (!rows || rows.length === 0) return;

    rows.forEach(row => {
      let auto; let paused = false;
      const start = () => {
        if (auto) clearInterval(auto);
        auto = setInterval(() => {
          if (paused) return;
          row.scrollBy({ left: row.clientWidth * 0.25, behavior: 'smooth' });
        }, 3000);
      };
      row.addEventListener('mouseenter', () => { paused = true; });
      row.addEventListener('mouseleave', () => { paused = false; });
      start();

      // click to open preview modal
      row.querySelectorAll('.netflix-card').forEach(card => {
        card.addEventListener('click', (e) => {
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
    modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(5,14,31,0.75);z-index:3000;padding:2rem;';
    modal.innerHTML = `<div style="max-width:960px;width:100%;border-radius:12px;overflow:hidden;background:#071024;box-shadow:0 20px 60px rgba(2,6,23,0.8);">
      <div style="position:relative;padding:1rem 1rem 0;background:#071024"><button id="pm-close" style="position:absolute;right:10px;top:6px;background:none;border:none;color:#fff;font-size:1.25rem;cursor:pointer">✕</button>
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
  // Skills: Carousel auto-scroll
  // ============================================================
  function initSkillsCarousel() {
    const carousel = document.querySelector('.skills-carousel-row');
    if (!carousel) return;

    const cards = Array.from(carousel.children);
    if (cards.length === 0) return;

    // Duplicate cards so the strip can loop without a hard jump.
    if (!carousel.dataset.loopReady) {
      cards.forEach(card => {
        carousel.appendChild(card.cloneNode(true));
      });
      carousel.dataset.loopReady = 'true';
    }

    // Nudge the strip off the hard zero position so the auto-loop is visible immediately.
    carousel.scrollLeft = 1;

    let userInteracting = false;
    let interactionTimer = null;
    let lastTime = null;
    let virtualScrollLeft = carousel.scrollLeft;
    const pixelsPerSecond = 30;
    const loopWidth = carousel.scrollWidth / 2;

    const setInteraction = (active) => {
      userInteracting = active;
      if (interactionTimer) {
        clearTimeout(interactionTimer);
        interactionTimer = null;
      }

      if (active) {
        virtualScrollLeft = carousel.scrollLeft;
      } else {
        interactionTimer = setTimeout(() => {
          userInteracting = false;
        }, 150);
      }
    };

    carousel.addEventListener('pointerdown', () => setInteraction(true));
    carousel.addEventListener('pointerup', () => setInteraction(false));
    carousel.addEventListener('pointercancel', () => setInteraction(false));
    carousel.addEventListener('pointerleave', () => setInteraction(false));
    carousel.addEventListener('touchstart', () => setInteraction(true), { passive: true });
    carousel.addEventListener('touchend', () => setInteraction(false), { passive: true });
    
    // Only treat horizontal wheel scroll as carousel interaction, ignore vertical page scroll
    carousel.addEventListener('wheel', (e) => {
      if (e.deltaX !== 0) {
        setInteraction(true);
      }
    }, { passive: true });

    carousel.addEventListener('scroll', () => {
      if (userInteracting) {
        virtualScrollLeft = carousel.scrollLeft;
      }
    }, { passive: true });

    const tick = (time) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!userInteracting && carousel.scrollWidth > carousel.clientWidth) {
        virtualScrollLeft += (pixelsPerSecond * delta) / 1000;

        if (virtualScrollLeft >= loopWidth) {
          virtualScrollLeft -= loopWidth;
        }

        carousel.scrollLeft = virtualScrollLeft;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  // ============================================================
  // TIMELINE EVENTS — Click to toggle details (optional click support)
  // ============================================================
  function initTimelineEvents() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const eventsArr = Array.from(timelineEvents);
    
    // helper: reset transforms on all events
    const resetShifts = () => {
      timelineEvents.forEach(ev => {
        ev.style.transform = '';
        ev.style.zIndex = '';
      });
    };

    const adjustLayout = (activeEvent) => {
      // Do not shift or translate sibling events. Only ensure the active event sits above others.
      timelineEvents.forEach(ev => {
        ev.style.transform = '';
        if (ev === activeEvent && activeEvent.classList.contains('active')) {
          ev.style.zIndex = 30;
        } else {
          ev.style.zIndex = '';
        }
      });
    };

    timelineEvents.forEach(event => {
      const dot = event.querySelector('.timeline-dot');
      const handleClick = (e) => {
        e.stopPropagation();
        timelineEvents.forEach(otherEvent => { if (otherEvent !== event) otherEvent.classList.remove('active'); });
        const willOpen = !event.classList.contains('active');
        event.classList.toggle('active', willOpen);
        if (willOpen) adjustLayout(event); else resetShifts();
        if (dot) dot.setAttribute('aria-expanded', String(willOpen));
      };
      // attach click for all devices; info shows only on click now
      event.addEventListener('click', handleClick);
    });
    
    // Close all on outside click
    document.addEventListener('click', (e) => {
      const clickedTimeline = e.target.closest('.timeline-event');
      if (!clickedTimeline) {
        timelineEvents.forEach(event => {
          event.classList.remove('active');
          // reset any transforms
          event.style.transform = '';
          event.style.zIndex = '';
        });
      }
    });
    // reset on resize so layout recalculates
    window.addEventListener('resize', () => resetShifts());
  }

// ============================================================
// UTILITY: Smooth scroll polyfill for older browsers
// ============================================================
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScroll = function(target) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) smoothScroll(target);
      }
    });
  });
}