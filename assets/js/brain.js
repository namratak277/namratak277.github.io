// ============================================================
// THINGS I KNOW — word cloud; each word opens a note on how I know it.
// s = size 1–4 (bigger = comes up more across my work), g = group (sets the color)
// ============================================================
(function () {
  const GROUPS = {
    code: 'Code', data: 'Data', it: 'IT & systems', design: 'Design & engineering', people: 'People', lang: 'Languages'
  };
  const WORDS = [
    { w: 'Coding', g: 'code', s: 4, how: "Coding is the core of my B.S. in Computer Science at UNCG — mostly Java, Python, and JavaScript — and I keep building outside class, including the Dress Web Store, Daily Diary, Creative Newsletter, and this site." },
    { w: 'JavaScript', g: 'code', s: 4, how: "My go-to language for the web (4.5/5). It runs all three of my course projects — the Dress Web Store, Daily Diary, and Creative Newsletter — and everything interactive on this site." },
    { w: 'HTML', g: 'code', s: 3, how: "4.5/5. The structure behind every web project I've built: the newsletter, the diary app, the web store, and this portfolio." },
    { w: 'CSS', g: 'code', s: 3, how: "4.5/5. Responsive layouts and theming — the Creative Newsletter was built to work on any screen, and this site's light and dark themes are hand-written CSS." },
    { w: 'Java', g: 'code', s: 3, how: "One of my strongest languages (4.5/5), built up through my UNCG computer science coursework." },
    { w: 'Python', g: 'code', s: 3, how: "4.5/5 — one of my strongest languages, used across my CS coursework." },
    { w: 'C++', g: 'code', s: 1, how: "3/5. Comfortable with the fundamentals from my CS coursework." },
    { w: 'Ruby', g: 'code', s: 1, how: "2/5. I've worked with the basics." },
    { w: 'Spring Boot', g: 'code', s: 1, how: "3/5. The Java framework I'm familiar with for building back-end services." },
    { w: 'REST APIs', g: 'code', s: 2, how: "I implemented the CRUD APIs behind the Dress Web Store's product and order management." },
    { w: 'Email API', g: 'code', s: 1, how: "Integrated an Email API into the Creative Newsletter (a duo project) so each issue could be sent out automatically." },
    { w: 'Local Storage', g: 'code', s: 1, how: "Daily Diary keeps every entry and habit in the browser's local storage — no server needed." },
    { w: 'Git / GitHub', g: 'code', s: 2, how: "4.5/5. Version control for all my projects; they live at github.com/namratak277." },
    { w: 'Web development', g: 'code', s: 3, how: "Front to back: the Dress Web Store, Daily Diary, the Creative Newsletter, and this portfolio." },
    { w: 'Front-end', g: 'code', s: 2, how: "HTML, CSS, and JavaScript interfaces — every page of this site and the UIs of my three course projects." },
    { w: 'Back-end', g: 'code', s: 1, how: "CRUD APIs and a PostgreSQL schema for the Dress Web Store, with Spring Boot as my Java framework." },
    { w: 'Jekyll', g: 'code', s: 1, how: "This portfolio is a Jekyll site: one shared folder layout, one page per tab, built by GitHub Pages." },
    { w: 'Docker', g: 'code', s: 1, how: "I preview this site in a Docker container running the same Jekyll setup GitHub Pages uses, so I don't have to install Ruby." },
    { w: 'GitHub Actions', g: 'code', s: 1, how: "This site's CI builds every push and checks the HTML and links before it goes live." },
    { w: 'GitHub Pages', g: 'code', s: 1, how: "Where this portfolio is hosted — pushing to main publishes it." },

    { w: 'PostgreSQL', g: 'data', s: 3, how: "4.5/5. The database behind the Dress Web Store — I designed its schema for products and orders." },
    { w: 'MySQL', g: 'data', s: 2, how: "4.5/5. Relational databases from my Intro to Databases course at UNCG." },
    { w: 'Data Modeling', g: 'data', s: 2, how: "4.5/5. Designing entities, relationships, and keys before anything gets built — like the Dress Web Store schema." },
    { w: 'CRUD', g: 'data', s: 2, how: "4.5/5. Create, read, update, delete: the core of the Dress Web Store's product and order management and Daily Diary's entries." },
    { w: 'Data Analysis', g: 'data', s: 3, how: "As Assistant Manager at Family Fare, I analyze sales and inventory data to optimize stock levels, reduce waste, and improve efficiency." },
    { w: 'Data Viz', g: 'data', s: 1, how: "Daily Diary turns habit data into trends users can actually see." },
    { w: 'ERDPlus', g: 'data', s: 1, how: "3.5/5. Where I draw entity-relationship diagrams for data modeling." },
    { w: 'DBeaver', g: 'data', s: 1, how: "3.5/5. My client for browsing and querying databases." },
    { w: 'Neon', g: 'data', s: 1, how: "3.5/5. Hosted Postgres I've used for cloud databases." },
    { w: 'Databases', g: 'data', s: 2, how: "Intro to Databases at UNCG, then putting it to work in the Dress Web Store's PostgreSQL schema." },
    { w: 'SQL', g: 'data', s: 2, how: "The query language under my PostgreSQL and MySQL work." },
    { w: 'Inventory', g: 'data', s: 1, how: "At Family Fare I use sales data to set stock levels and cut waste." },
    { w: 'Habit tracking', g: 'data', s: 1, how: "Daily Diary logs habits over time and shows the trends." },
    { w: 'Cash reconciliation', g: 'data', s: 1, how: "Balancing the drawer against the day's sales at close as Assistant Manager at Family Fare." },
    { w: 'Sales reporting', g: 'data', s: 1, how: "Pulling sales numbers at Family Fare to see what's moving and set stock levels." },
    { w: 'Financial statements', g: 'data', s: 1, how: "Reading and preparing balance sheets and income statements in my accounting coursework at UNCG." },
    { w: 'Payroll', g: 'data', s: 1, how: "How wages, withholdings, and payroll taxes are recorded, from my accounting coursework at UNCG." },
    { w: 'Excel', g: 'data', s: 1, how: "Spreadsheets, formulas, and financial schedules from my accounting coursework at UNCG." },

    { w: 'Troubleshooting', g: 'it', s: 3, how: "Daily work at UNCG ITS: diagnosing hardware, software, and connectivity issues across 30+ classrooms so lectures start on time." },
    { w: 'ServiceNow', g: 'it', s: 2, how: "3.5/5. I track, prioritize, and resolve faculty and student support tickets in ServiceNow at UNCG ITS." },
    { w: 'Extron AV', g: 'it', s: 2, how: "3.5/5. The classroom audio-visual systems I deploy, configure, and maintain at UNCG ITS." },
    { w: 'ITIL / ITSM', g: 'it', s: 1, how: "3.5/5. Incident management at UNCG ITS follows ITIL-aligned practices." },
    { w: 'Networking', g: 'it', s: 1, how: "Fixing network issues on connected classroom devices at UNCG ITS, plus my Computer Networks course." },
    { w: 'Root-cause fixes', g: 'it', s: 1, how: "At UNCG ITS I document recurring issues with the IT and facilities teams to find root causes and put preventive fixes in place." },
    { w: 'Live event tech', g: 'it', s: 1, how: "As a SOAR intern I configured presentation systems and fixed technical failures in real time during orientation sessions." },
    { w: 'IT Support', g: 'it', s: 3, how: "My job at UNCG ITS: keeping 30+ classrooms working for faculty and students." },
    { w: 'Hardware', g: 'it', s: 1, how: "Diagnosing and fixing classroom hardware at UNCG ITS." },
    { w: 'Help desk', g: 'it', s: 2, how: "Taking faculty and student tickets at UNCG ITS, from first report to fix." },
    { w: 'Classroom tech', g: 'it', s: 1, how: "Projectors, audio, and connected devices across 30+ UNCG classrooms." },
    { w: 'Uptime', g: 'it', s: 1, how: "99%+ uptime across the classrooms I support at UNCG ITS." },
    { w: 'Presentation systems', g: 'it', s: 1, how: "Set up and ran the presentation systems for SOAR orientation sessions." },

    { w: 'Figma', g: 'design', s: 2, how: "3.5/5. I designed the Dress Web Store's UI mockups in Figma before writing any code." },
    { w: 'UX Design', g: 'design', s: 1, how: "Daily Diary was built around user-centered design — fast to log, easy to read back." },
    { w: 'Responsive design', g: 'design', s: 1, how: "The Creative Newsletter and this site both adapt from phone to desktop." },
    { w: 'Software Engineering', g: 'design', s: 2, how: "Completed Software Engineering at UNCG. The Dress Web Store covers the whole cycle: schema, APIs, and a Figma-designed UI." },
    { w: 'Machine Learning', g: 'design', s: 2, how: "Completed Machine Learning at UNCG." },
    { w: 'AI / LLM', g: 'design', s: 2, how: "Completed Artificial Intelligence at UNCG." },
    { w: 'Agile', g: 'design', s: 1, how: "3.5/5. Familiar with iterative, team-based development." },
    { w: 'Requirements', g: 'design', s: 1, how: "3.5/5. Turning what people need into clear requirements before building." },
    { w: 'Problem solving', g: 'design', s: 3, how: "From a classroom that won't project five minutes before lecture to a schema that has to hold every order — I like figuring out why something breaks." },
    { w: 'UI mockups', g: 'design', s: 1, how: "The Dress Web Store's screens started as Figma mockups." },
    { w: 'Prototyping', g: 'design', s: 1, how: "Mocking screens up in Figma first, then building them out in code." },
    { w: 'Branding', g: 'design', s: 1, how: "I made this site's logo, color palette, and type rules — the brand page lays them out." },

    { w: 'Leadership', g: 'people', s: 3, how: "3 years as President of UNCG Jalwa (Bollywood dance club), 2 years as Vice President of the Nepalese Student Association, a UNCG Bronze Leadership Award, and Assistant Manager at Family Fare." },
    { w: 'Team coordination', g: 'people', s: 2, how: "Scheduling and supervising staff as Assistant Manager at Family Fare, and coordinating orientation logistics with the First Year Experience team." },
    { w: 'Conflict resolution', g: 'people', s: 2, how: "As a Residential Advisor I mediated conflicts and enforced policies for 350+ residents." },
    { w: 'De-escalation', g: 'people', s: 1, how: "Responding to incidents and emergencies as an RA, following established protocols under pressure." },
    { w: 'Stakeholder comms', g: 'people', s: 1, how: "Working with directors, coordinators, and tech managers at First Year Experience, and with faculty, IT, and facilities at UNCG ITS." },
    { w: 'Event planning', g: 'people', s: 1, how: "Orientation events for 15,000+ incoming students and families, and community programming as an RA." },
    { w: 'Mentoring', g: 'people', s: 1, how: "Guided new students through their first weeks as Spartan Orientation Staff." },
    { w: 'Documentation', g: 'people', s: 1, how: "Incident reports as an RA, recurring-issue notes at UNCG ITS, and compliance documentation at Family Fare." },
    { w: 'Reliable', g: 'people', s: 2, how: "Keeping 30+ classrooms running with 99%+ uptime at UNCG ITS — people count on the tech working when class starts." },
    { w: 'Detail-oriented', g: 'people', s: 1, how: "Cash handling and compliance at Family Fare, and thorough incident documentation as an RA." },
    { w: 'Curious', g: 'people', s: 2, how: "I'm drawn to the problem nobody's been assigned yet — the recurring ticket that needs a root-cause fix, the process still done by hand." },
    { w: 'Communication', g: 'people', s: 3, how: "Explaining tech fixes to faculty at UNCG ITS, guiding new students at orientation, and running club meetings as president." },
    { w: 'Teamwork', g: 'people', s: 2, how: "The Creative Newsletter was a duo project, and every job I've had — ITS, orientation, RA, Family Fare — runs on a team." },
    { w: 'Scheduling', g: 'people', s: 1, how: "Building staff schedules as Assistant Manager at Family Fare." },
    { w: 'Cash handling', g: 'people', s: 1, how: "Handling cash and closing out accurately at Family Fare." },
    { w: 'Compliance', g: 'people', s: 1, how: "Keeping store operations to policy at Family Fare, and enforcing housing policy as an RA." },
    { w: 'Emergency response', g: 'people', s: 1, how: "Responding to incidents and emergencies as a Residential Advisor." },
    { w: 'Community building', g: 'people', s: 1, how: "Programming for 350+ residents as an RA, and growing UNCG Jalwa and the Nepalese Student Association." },
    { w: 'Club president', g: 'people', s: 1, how: "3 years leading UNCG Jalwa, the Bollywood dance club." },
    { w: 'Onboarding', g: 'people', s: 1, how: "Welcoming 15,000+ incoming students and families as Spartan Orientation Staff." },
    { w: 'Multitasking', g: 'people', s: 1, how: "Balancing a CS degree with UNCG ITS, Family Fare, and club leadership." },
    { w: 'Empathy', g: 'people', s: 1, how: "Supporting 350+ residents as an RA and helping nervous first-year students settle in at orientation." },
    { w: 'Developmental psychology', g: 'people', s: 1, how: "From my psychology coursework at UNCG: how people grow and change across their lives." },
    { w: 'Research methods', g: 'people', s: 1, how: "From my psychology coursework at UNCG: designing studies, collecting data, and judging what results really show." },

    { w: 'Nepali', g: 'lang', s: 3, how: "Native language." },
    { w: 'English', g: 'lang', s: 2, how: "Native language." },
    { w: 'Hindi', g: 'lang', s: 2, how: "Professional proficiency." },
    { w: 'Trilingual', g: 'lang', s: 1, how: "Nepali, English, and Hindi." }
  ];

  const cloud = document.getElementById('know-cloud');
  const card  = document.getElementById('know-card');
  if (!cloud || !card) return;

  // Seeded shuffle so the "random" mix is the same on every visit
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const words = WORDS.slice();
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  // Biggest words first so they claim the middle; ties keep the shuffled mix
  words.sort((a, b) => b.s - a.s);

  const buttons = words.map(item => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'know-word g-' + item.g;
    b.dataset.s = item.s;
    b.textContent = item.w;
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-controls', 'know-card');
    // About a third of the smaller words turn sideways (never the two biggest)
    if (item.s < 4 && rand() < 0.33) b.classList.add('is-vertical');
    b.addEventListener('click', () => show(b, item));
    cloud.insertBefore(b, card);
    return b;
  });

  // ---- Packing: size the words so together they cover most of a target
  // rectangle, then walk a spiral out from the centre and drop each word at
  // the first spot inside the rectangle where it overlaps nothing
  const SIZE = { 4: 60, 3: 38, 2: 25, 1: 17 };
  const setSizes = k => buttons.forEach(b => { b.style.fontSize = (SIZE[b.dataset.s] * k).toFixed(1) + 'px'; });

  function layout() {
    const W = cloud.clientWidth;
    const H0 = Math.round(W * (W > 700 ? 0.44 : 0.95));

    // Total ink area at 1x tells us how much to scale to fill ~68% of the box
    setSizes(1);
    const area = buttons.reduce((sum, b) => sum + b.offsetWidth * b.offsetHeight, 0);
    let scale = Math.sqrt((W * H0 * 0.68) / area);
    const widest = Math.max(...buttons.map(b => b.offsetWidth));
    scale = Math.min(scale, (W * 0.9) / widest);

    // Narrow screens can run out of room before the last (small, long) words
    // are placed. Rather than stacking those in a column under the cloud,
    // make the box 8% taller and pack every word again until they all fit
    let H = H0;
    for (let round = 0; round < 8; round++) {
      setSizes(scale);
      if (pack(W, H, round === 7)) return;
      H = Math.round(H * 1.08);
    }
  }

  // Returns false (and moves nothing) if a word found no room, unless
  // `last` is set — then it uses the old tuck-underneath fallback
  function pack(W, H, last) {
    const gap = 2;
    const stretch = W / H;
    const placed = [];
    const fits = (cx, cy, w, h) =>
      cx >= -W / 2 && cx + w <= W / 2 && cy >= -H / 2 && cy + h <= H / 2 &&
      !placed.some(p => cx < p.x + p.w + gap && cx + w + gap > p.x && cy < p.y + p.h + gap && cy + h + gap > p.y);

    for (const b of buttons) {
      let spot = null;
      // If a word can't find room, shrink it a little and try again
      for (let tries = 0; tries < 4 && !spot; tries++) {
        if (tries) b.style.fontSize = (parseFloat(b.style.fontSize) * 0.85).toFixed(1) + 'px';
        const w = b.offsetWidth, h = b.offsetHeight;
        for (let t = 0; t < 900; t += 0.06) {
          const r = 1.4 * t;
          const cx = Math.cos(t) * r * stretch - w / 2;
          const cy = Math.sin(t) * r - h / 2;
          if (Math.abs(cy) > H && Math.abs(cx) > W) break;
          if (fits(cx, cy, w, h)) { spot = { x: cx, y: cy, w, h }; break; }
        }
      }
      if (!spot) {
        if (!last) return false;
        // Last resort: tuck it under the rectangle rather than overlap
        const w = b.offsetWidth, h = b.offsetHeight;
        const below = Math.max(...placed.map(p => p.y + p.h)) + gap;
        spot = { x: -w / 2, y: below, w, h };
      }
      placed.push({ b, ...spot });
    }

    const top = Math.min(...placed.map(p => p.y));
    const bottom = Math.max(...placed.map(p => p.y + p.h));
    placed.forEach(p => {
      p.b.style.left = Math.round(p.x + W / 2) + 'px';
      p.b.style.top = Math.round(p.y - top) + 'px';
    });
    cloud.style.height = Math.ceil(bottom - top) + 'px';
    cloud.classList.add('is-laid');
    return true;
  }
  // Widths depend on the web font, so wait for it before measuring
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(layout);

  let current = null;
  function show(btn, item) {
    if (current === btn) return hide();
    if (current) current.setAttribute('aria-expanded', 'false');
    current = btn;
    btn.setAttribute('aria-expanded', 'true');
    card.querySelector('.know-card-group').textContent = GROUPS[item.g];
    card.querySelector('h3').textContent = item.w;
    // A leading "4.5/5." in the note becomes the rating beside the title
    const m = item.how.match(/^(\d(?:\.\d)?\/5)[\s.—–-]*/);
    const rating = card.querySelector('.know-card-rating');
    rating.textContent = m ? m[1] : '';
    rating.hidden = !m;
    const how = m ? item.how.slice(m[0].length) : item.how;
    card.querySelector('p').textContent = how.charAt(0).toUpperCase() + how.slice(1);
    card.hidden = false;
    // Drop the note just under the word, kept inside the cloud's edges
    const max = cloud.clientWidth - card.offsetWidth;
    const left = btn.offsetLeft + btn.offsetWidth / 2 - card.offsetWidth / 2;
    card.style.left = Math.max(0, Math.min(max, left)) + 'px';
    card.style.top  = (btn.offsetTop + btn.offsetHeight + 8) + 'px';
    const r = card.getBoundingClientRect();
    if (r.bottom > innerHeight) window.scrollBy({ top: r.bottom - innerHeight + 16, behavior: 'smooth' });
  }
  function hide() {
    if (current) { current.setAttribute('aria-expanded', 'false'); current.focus(); }
    current = null;
    card.hidden = true;
  }
  card.querySelector('.know-card-close').addEventListener('click', hide);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && current) hide(); });
  document.addEventListener('click', e => {
    if (current && !card.contains(e.target) && !e.target.closest('.know-word')) hide();
  });
  // Phones fire resize when the address bar slides; only a width change moves the words
  let lastWidth = cloud.clientWidth;
  window.addEventListener('resize', () => {
    if (cloud.clientWidth === lastWidth) return;
    lastWidth = cloud.clientWidth;
    if (current) hide();
    layout();
  });
})();

// ============================================================
// "SCROLL" hint — hidden once the word cloud is on screen
// ============================================================
(function () {
  const hint = document.getElementById('more-hint');
  const know = document.getElementById('things-i-know');
  if (!hint || !know) return;
  new IntersectionObserver(([entry]) => {
    hint.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.05 }).observe(know);
})();
