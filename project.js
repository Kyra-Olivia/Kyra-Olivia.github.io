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
      'This site requires a web server to run — opening <code>project.html</code> directly ' +
      'as a file:// URL is blocked by browser security.<br><br>' +
      'On GitHub Pages everything works automatically. ' +
      'For local preview, run: <code>python3 -m http.server 8080</code> ' +
      'in this folder, then open <code>http://localhost:8080</code>.' +
      '</p>';
    return;
  }

  /* ── Find project from ?id= param ────────────────────────── */
  const params       = new URLSearchParams(window.location.search);
  const projectId    = params.get('id');
  const projects     = data.projects;
  const projectIndex = projects.findIndex(p => p.id === projectId);

  if (projectIndex === -1) {
    window.location.href = 'index.html#work';
    return;
  }

  const proj = projects[projectIndex];

  /* ── Site meta ────────────────────────────────────────────── */
  document.title = `${proj.title} — ${data.site.name}`;
  if (data.site.favicon) {
    document.getElementById('favicon').href = data.site.favicon;
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

  /* ── Project header ───────────────────────────────────────── */
  document.getElementById('project-category').textContent  = proj.category;
  document.getElementById('project-title').textContent     = proj.title;
  document.getElementById('project-year').textContent      = proj.year;
  document.getElementById('project-description').textContent = proj.full_description;

  /* ── Gallery ──────────────────────────────────────────────── */
  const images    = (proj.gallery && proj.gallery.length) ? proj.gallery : [proj.image];
  const galleryEl = document.getElementById('project-gallery');

  images.forEach(src => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-figure';
    const img = document.createElement('img');
    img.className = 'gallery-img';
    img.src     = src;
    img.alt     = proj.title;
    img.loading = 'lazy';
    img.onerror = () => { figure.style.display = 'none'; };
    figure.appendChild(img);
    galleryEl.appendChild(figure);
  });

  /* ── Prev / next navigation ───────────────────────────────── */
  const prevIndex = (projectIndex - 1 + projects.length) % projects.length;
  const nextIndex = (projectIndex + 1) % projects.length;
  const prevProj  = projects[prevIndex];
  const nextProj  = projects[nextIndex];

  document.getElementById('project-nav-prev').href             = `project.html?id=${prevProj.id}`;
  document.getElementById('project-nav-prev-label').textContent = prevProj.title;
  document.getElementById('project-nav-next').href             = `project.html?id=${nextProj.id}`;
  document.getElementById('project-nav-next-label').textContent = nextProj.title;

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
      a.href        = base + handle;
      a.textContent = label;
      a.target      = '_blank';
      a.rel         = 'noopener noreferrer';
      socialContainer.appendChild(a);
    }
  });
})();
