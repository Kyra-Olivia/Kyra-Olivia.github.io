(async () => {
  /* ── Load content ─────────────────────────────────────────── */
  let data;
  try {
    const res = await fetch('content.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    document.body.innerHTML =
      '<p style="font-family:sans-serif;padding:3rem;max-width:600px;margin:0 auto;">' +
      '<strong>Could not load site content.</strong><br><br>' +
      'This site requires a web server to run — opening <code>index.html</code> directly ' +
      'as a file:// URL is blocked by browser security.<br><br>' +
      'On GitHub Pages everything works automatically. ' +
      'For local preview, run: <code>python3 -m http.server 8080</code> ' +
      'in this folder, then open <code>http://localhost:8080</code>.' +
      '</p>';
    return;
  }

  /* ── Site meta ────────────────────────────────────────────── */
  document.title = data.site.name;
  if (data.site.favicon) {
    document.getElementById('favicon').href = data.site.favicon;
  }
  if (data.site.cursor) {
    document.body.style.cursor = `url('${data.site.cursor}'), auto`;
  }

  /* ── Nav ──────────────────────────────────────────────────── */
  document.getElementById('nav-logo').textContent = data.nav.logo;

  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Hero ─────────────────────────────────────────────────── */
  document.getElementById('hero-headline').textContent  = data.hero.headline;
  document.getElementById('hero-subheading').textContent = data.hero.subheading;

  /* ── About ────────────────────────────────────────────────── */
  const photoEl = document.getElementById('about-photo');
  photoEl.src = data.about.photo;
  photoEl.alt = `Portrait of ${data.site.name}`;
  photoEl.onerror = () => { photoEl.style.display = 'none'; };

  document.getElementById('about-bio').textContent = data.about.bio;

  const cvEl = document.getElementById('cv-link');
  if (data.about.cv_link) {
    cvEl.href        = data.about.cv_link;
    cvEl.textContent = data.about.cv_label || 'Download CV';
    cvEl.download    = '';
    cvEl.style.display = '';
  }

  /* ── Projects & filter ────────────────────────────────────── */
  const allProjects = data.projects;
  const categories  = ['All', ...new Set(allProjects.map(p => p.category))];

  let activeFilter     = 'All';
  let filteredProjects = allProjects.slice();

  const tabsContainer = document.getElementById('filter-tabs');
  const gridContainer = document.getElementById('project-grid');

  function renderTabs() {
    tabsContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className   = 'filter-tab' + (cat === activeFilter ? ' active' : '');
      btn.textContent = cat;
      btn.setAttribute('aria-pressed', String(cat === activeFilter));
      btn.addEventListener('click', () => {
        activeFilter     = cat;
        filteredProjects = cat === 'All'
          ? allProjects.slice()
          : allProjects.filter(p => p.category === cat);
        renderTabs();
        renderGrid();
      });
      tabsContainer.appendChild(btn);
    });
  }

  function renderGrid() {
    gridContainer.innerHTML = '';
    filteredProjects.forEach(proj => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href      = `project.html?id=${proj.id}`;
      card.setAttribute('aria-label', `View project: ${proj.title}`);

      /* image */
      const imgWrap = document.createElement('div');
      imgWrap.className = 'card-img-wrap';
      const img = document.createElement('img');
      img.className = 'card-img';
      img.src     = proj.image;
      img.alt     = proj.title;
      img.loading = 'lazy';
      img.onerror = () => { img.style.display = 'none'; };
      imgWrap.appendChild(img);

      /* body */
      const body = document.createElement('div');
      body.className = 'card-body';

      const catSpan   = document.createElement('span');
      catSpan.className   = 'card-category';
      catSpan.textContent = proj.category;

      const title = document.createElement('h3');
      title.className   = 'card-title';
      title.textContent = proj.title;

      const desc = document.createElement('p');
      desc.className   = 'card-desc';
      desc.textContent = proj.description;

      body.append(catSpan, title, desc);
      card.append(imgWrap, body);

      gridContainer.appendChild(card);
    });
  }

  renderTabs();
  renderGrid();

  /* ── Contact form ─────────────────────────────────────────── */
  document.getElementById('contact-intro').textContent = data.contact.intro;

  const form        = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status');
  const formSuccess = document.getElementById('form-success');
  const submitBtn   = form.querySelector('[type="submit"]');
  const endpoint    = data.contact.formspree_endpoint;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.className   = 'form-status';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (res.ok) {
        form.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      } else {
        let message = 'Something went wrong. Please try again.';
        try {
          const json = await res.json();
          if (json.errors) {
            message = json.errors.map(err => err.message).join(' ');
          }
        } catch { /* ignore parse failures */ }
        formStatus.textContent = message;
        formStatus.className   = 'form-status error';
        submitBtn.disabled     = false;
        submitBtn.textContent  = 'Send Message';
      }
    } catch {
      formStatus.textContent = 'Network error — please check your connection and try again.';
      formStatus.className   = 'form-status error';
      submitBtn.disabled     = false;
      submitBtn.textContent  = 'Send Message';
    }
  });

  /* ── Footer ───────────────────────────────────────────────── */
  document.getElementById('footer-copy').textContent =
    `© ${new Date().getFullYear()} ${data.site.name}`;

  const socialContainer = document.getElementById('footer-social');
  const socialDefs = [
    { key: 'instagram', label: 'Instagram', base: 'https://instagram.com/' },
    { key: 'linkedin',  label: 'LinkedIn',  base: 'https://linkedin.com/in/' },
    { key: 'behance',   label: 'Behance',   base: 'https://behance.net/' },
  ];

  socialDefs.forEach(({ key, label, base }) => {
    const handle = data.social[key];
    if (handle) {
      const a = document.createElement('a');
      a.href   = base + handle;
      a.textContent = label;
      a.target = '_blank';
      a.rel    = 'noopener noreferrer';
      socialContainer.appendChild(a);
    }
  });
})();
