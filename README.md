# Kyra Elaine Voss — Portfolio Site

This is your personal portfolio website. All of your content — project descriptions, bio, photos, and contact details — lives in a single file called **content.json**. You can update that file directly in your browser using GitHub, without needing any technical tools.

---

## A note on previewing locally

If you open `index.html` by double-clicking it, your browser will block the site from loading. This is a browser security rule that affects all sites that load data from files — not a bug.

**To preview on your computer:** open a terminal in the site folder and run:
```
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

On **GitHub Pages** (your live site), everything works automatically — no server needed.

---

## How to edit your content in GitHub

GitHub lets you edit files directly in the browser. Here's how:

1. Go to your repository on GitHub (the page that lists all your files).
2. Click on the file you want to edit — for most changes, this will be **`content.json`**.
3. Click the **pencil icon** (✏️) in the top-right corner of the file view. This opens the editor.
4. Make your changes in the text editor that appears.
5. When you're done, scroll down to the **"Commit changes"** section at the bottom.
6. In the first box, write a short note about what you changed (e.g. "Add new photography project").
7. Click the green **"Commit changes"** button.

Your live site will update within a minute or two.

> **Tip:** JSON is strict about formatting. If you accidentally delete a comma, quote mark, or bracket, the site will stop loading. If that happens, look for the missing character — it's almost always a forgotten comma between two items in a list.

---

## How to edit your bio, headline, or contact text

Open `content.json` and find the relevant section:

- **Hero headline and subheading** — look for `"hero"`:
  ```json
  "hero": {
    "headline": "Art. Curation. Design.",
    "subheading": "Multidisciplinary creative based in Amsterdam."
  }
  ```
  Change the text between the quote marks.

- **About bio** — look for `"about"` and edit the `"bio"` field. You can add a blank line between paragraphs by writing `\n\n` in the text.

- **Contact intro** — look for `"contact"` and edit the `"intro"` field.

---

## How individual project pages work

When a visitor clicks a project card, they are taken to a dedicated page for that project. This page shows:

- The project title, category, year, and full description
- A scrollable gallery of all photos for that project
- Previous and next arrows at the bottom to move between projects

The gallery images are defined in the `"gallery"` field of each project in `content.json`. You can add as many images as you like — they will stack vertically down the page. If `"gallery"` is absent or empty, the site falls back to showing the card thumbnail image.

---

## How to add a new project

1. Open `content.json` and find the `"projects"` section — it's a list of entries that each look like this:
   ```json
   {
     "id": "proj-001",
     "title": "Interior Silence",
     "category": "Fine Arts",
     "image": "images/fine-arts/interior-silence.jpg",
     "gallery": [
       "images/fine-arts/interior-silence-1.jpg",
       "images/fine-arts/interior-silence-2.jpg",
       "images/fine-arts/interior-silence-3.jpg"
     ],
     "description": "Short description visible on card.",
     "full_description": "Longer description shown on the project page.",
     "year": "2023"
   }
   ```

2. Copy one of the existing project blocks (from `{` to `},`).

3. Paste it at the end of the list, just before the closing `]`. Make sure there is a comma after the previous project's closing `}`.

4. Update each field:
   - `"id"` — give it a unique ID (e.g. `"proj-010"`)
   - `"title"` — your project title
   - `"category"` — the category this project belongs to (see below)
   - `"image"` — the path to the image shown on the portfolio card (usually the best single photo)
   - `"gallery"` — a list of image paths shown on the project page, in the order you want them displayed. Add one path per line inside the square brackets, separated by commas.
   - `"description"` — one or two sentences shown on the project card
   - `"full_description"` — a longer description shown at the top of the project page
   - `"year"` — the year as a four-digit string, e.g. `"2024"`

5. Upload your images to the `images/` folder (see below), then commit the changes to `content.json`.

---

## How to add more images to an existing project

1. Upload the new images to the relevant `images/` sub-folder (see "How to add images" below).
2. Open `content.json` and find the project's `"gallery"` field:
   ```json
   "gallery": [
     "images/fine-arts/interior-silence.jpg"
   ]
   ```
3. Add the new image paths inside the square brackets, separated by commas:
   ```json
   "gallery": [
     "images/fine-arts/interior-silence.jpg",
     "images/fine-arts/interior-silence-detail.jpg",
     "images/fine-arts/interior-silence-install.jpg"
   ]
   ```
4. Commit the change. Images appear on the project page in the order listed.

---

## How to add or remove a category

**Adding a category:** Simply use a new category name in the `"category"` field of any project. The filter tabs on the site are generated automatically from whatever categories appear in your projects list — you don't need to do anything else.

**Removing a category:** Change the `"category"` field of all projects in that category to a different category name. Once no projects use the old category, its filter tab disappears automatically.

---

## How to add images

Images live in the `images/` folder. To upload a new image:

1. Go to your repository on GitHub.
2. Click on the `images` folder, then navigate into the relevant sub-folder (e.g. `fine-arts`).
3. Click **"Add file"** → **"Upload files"**.
4. Drag your image into the upload area and click **"Commit changes"**.
5. In `content.json`, set the project's `"image"` field to the path you just uploaded, e.g. `"images/fine-arts/my-new-image.jpg"`.

**Image tips:**
- Use JPEG for photographs, PNG only if you need transparency.
- Resize images to around 1200px wide before uploading — large files slow the site down.
- Avoid spaces in file names. Use hyphens instead (e.g. `my-project.jpg` not `my project.jpg`).

---

## How to update your portrait photo

1. Upload a new portrait image to the `images/about/` folder on GitHub (see "How to add images" above).
2. In `content.json`, find the `"about"` section and update the `"photo"` field to match the new file name:
   ```json
   "photo": "images/about/my-new-portrait.jpg"
   ```
3. Commit the change.

---

## How to update or remove your CV file

**To update:** Upload your new CV PDF to a folder on GitHub (e.g. create a `files/` folder). Then in `content.json`, update the `"cv_link"` field to point to the new file:
```json
"cv_link": "files/kyra-voss-cv-2024.pdf"
```

**To remove the CV button entirely:** Set `"cv_link"` to an empty string:
```json
"cv_link": ""
```
The download button will disappear from the site automatically.

---

## How to set a custom cursor

You can replace the browser's default arrow cursor with an image of your choosing — for example a small cross, a dot, or a hand-drawn mark.

1. Prepare your cursor image:
   - Use a **PNG file** with a transparent background.
   - Keep it small — **32 × 32 pixels** is the recommended size. Browsers may ignore larger images on some systems.
   - Avoid spaces in the file name (e.g. `my-cursor.png` not `my cursor.png`).

2. Upload the image to your repository. A good place is a new `images/cursor/` folder, but anywhere inside `images/` works.

3. In `content.json`, find the `"site"` section and set the `"cursor"` field to the path of your image:
   ```json
   "site": {
     "name": "Kyra Elaine Voss",
     "cursor": "images/cursor/my-cursor.png"
   }
   ```

4. Commit the change. The cursor will appear across the whole site.

> **Note:** The custom cursor replaces the default arrow. Links and buttons keep their standard pointer cursor (the hand) so visitors can still tell what's clickable. To remove the custom cursor later, set `"cursor"` to an empty string: `""`.

---

## How to set up Formspree (contact form)

Formspree lets visitors send you messages through your contact form, delivered to your email inbox.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Click **"New Form"** and give it a name (e.g. "Portfolio Contact").
3. Set the email address where you want to receive messages.
4. Copy the **form endpoint URL** — it looks like `https://formspree.io/f/abcdefgh`.
5. Open `content.json` and find the `"contact"` section. Paste your endpoint into the `"formspree_endpoint"` field:
   ```json
   "formspree_endpoint": "https://formspree.io/f/abcdefgh"
   ```
6. Commit the change. Your contact form is now live.

> **Note:** The free Formspree plan allows 50 submissions per month. If you need more, upgrade on their site.

---

## How to add or remove social links

In `content.json`, find the `"social"` section:
```json
"social": {
  "instagram": "kyraelainevoss",
  "linkedin": "kyra-voss",
  "behance": ""
}
```

- To **show** a link, enter your username/handle (just the handle, not the full URL).
- To **hide** a link, set it to an empty string: `""`.

The footer only shows links for platforms where you've entered a handle.

---

## File structure reference

```
/
├── index.html          — portfolio home page (don't edit this)
├── project.html        — individual project page template (don't edit this)
├── style.css           — visual styling (don't edit this)
├── project.css         — project page styling (don't edit this)
├── main.js             — home page behaviour (don't edit this)
├── project.js          — project page behaviour (don't edit this)
├── content.json        — all your content (edit this freely)
├── images/
│   ├── about/          — portrait photo goes here
│   ├── fine-arts/      — images for Fine Arts projects
│   ├── curation/       — images for Curation projects
│   ├── graphic-design/ — images for Graphic Design projects
│   └── photography/    — images for Photography projects
└── files/
    └── kyra-voss-cv.pdf  — your CV file
```

---

If something looks wrong after an edit, the most common cause is a missing comma or quote mark in `content.json`. Use [jsonlint.com](https://jsonlint.com) — paste your file there and it will tell you exactly where the error is.
