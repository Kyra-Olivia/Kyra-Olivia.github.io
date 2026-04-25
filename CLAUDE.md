---

### CLAUDE.md

```markdown
# Portfolio Site — Project Reference

## Tech Constraints
- Pure HTML, CSS, and vanilla JavaScript only. No frameworks, no Node, no bundlers.
- Must deploy to GitHub Pages by opening `index.html` directly — no local server required.
- No CDN scripts beyond Google Fonts.

## Critical Rule — Client Editability
All editable content (text, image paths, project data, contact info, category names) MUST be sourced from `content.json`. The client will edit this file directly in GitHub's browser UI — they are not a developer. JS reads this file on page load and renders the site dynamically. No content may be hardcoded in HTML except structural tags and loading states.

**Stop and ask before any decision that would require the client to touch HTML or JS to update their content.**

---

## File Structure
```
/
├── index.html
├── style.css
├── main.js
├── content.json
├── images/
│   ├── about/
│   └── [category-name]/   ← one folder per project category
└── README.md
```

---

## Design Tokens

```css
--color-blush: #e8dde5;    /* page background */
--color-plum:  #4a3347;    /* headings, nav */
--color-olive: #7a8c4f;    /* category tags, accents */
--color-dusk:  #6b6d9a;    /* links, hover, active filter tab */
--color-mauve: #b08a9a;    /* borders, subtle dividers */
--color-ink:   #1a1a1f;    /* body text, footer */
--color-white: #ffffff;    /* card backgrounds, lightbox */
```

**All colors must be defined as CSS custom properties in `:root`. Never hardcode hex values outside of `:root`.**

### Typography
- Headings: `Cormorant Garamond` (400, 600 italic) via Google Fonts
- Body: `Inter` (400, 500) via Google Fonts
- Use `clamp()` for fluid type sizing — no breakpoint-specific font-size overrides.

### Layout
- Max content width: 1200px, centered
- Section vertical padding: 80px desktop / 48px mobile
- Project grid: 3 columns desktop, 2 tablet, 1 mobile — CSS Grid, 24px gap
- Cards: white background, 4px border-radius, 1px `--color-mauve` border, no resting shadow
- Hover state: slight scale + shadow lift only. No other animations except hero fade-in on load.

---

## content.json Schema

```json
{
  "site": {
    "name": "Full Name",
    "tagline": "One-line professional tagline",
    "favicon": "images/favicon.png"
  },
  "nav": {
    "logo": "Full Name"
  },
  "hero": {
    "headline": "Art. Curation. Design.",
    "subheading": "Multidisciplinary creative based in [City]."
  },
  "about": {
    "photo": "images/about/portrait.jpg",
    "bio": "Bio text here.",
    "cv_link": "path/to/cv.pdf",
    "cv_label": "Download CV"
  },
  "projects": [
    {
      "id": "proj-001",
      "title": "Project Title",
      "category": "Fine Arts",
      "image": "images/fine-arts/project-001.jpg",
      "description": "Short description visible on card.",
      "full_description": "Longer description shown in lightbox.",
      "year": "2024"
    }
  ],
  "contact": {
    "intro": "Available for freelance, curatorial, and design collaborations.",
    "formspree_endpoint": "https://formspree.io/f/XXXXXXXX"
  },
  "social": {
    "instagram": "",
    "linkedin": "",
    "behance": ""
  }
}
```

- `cv_link` is optional — if empty or null, the CV link must not render.
- Social fields are optional — render only if the string is non-empty.
- `category` values in the projects array drive the filter tabs dynamically — never hardcode category names.

---

## Guardrails — Stop and Ask Before:
- Using any font other than Cormorant Garamond and Inter
- Adding any dependency, npm package, or CDN script beyond Google Fonts
- Deviating from the content.json schema above
- Making any content field non-nullable that could reasonably be left blank by the client

---

## Completion Checklist
- [ ] `index.html` opens correctly in a browser with no local server
- [ ] All content renders from `content.json` — no hardcoded strings in HTML
- [ ] Category filter tabs generate dynamically from whatever categories exist in the JSON
- [ ] Lightbox opens, closes on click-outside and ESC, navigates with arrow keys
- [ ] Contact form submits to Formspree without page reload; shows success/error inline
- [ ] Fully responsive from 320px to 1440px
- [ ] README written for a non-technical client
```

---

