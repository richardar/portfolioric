# Portfolio - Anthuvan Rosario

This is a modern, dark Next.js portfolio scaffold tailored for a software and machine learning engineer.

Quick start

1. Install dependencies:

```powershell
cd c:\Users\gratu\Projects\portfolio
npm install
```

2. Run dev server:

```powershell
npm run dev
```

Open http://localhost:3000

Notes
- Your resume PDF has been copied to `public/resume.pdf` (if present in the workspace). Replace or update if needed.
- Edit `pages/index.js`, `components/*` and `styles/globals.css` to add projects, experience, and details from your resume.

Auto-populate projects from GitHub
- You can run the included script to fetch public repos and write `data/projects.json`:

```powershell
node scripts/fetchGithub.js <github-username>
```

Contact form (Formspree)
- The contact form posts to Formspree. Create a form on https://formspree.io, copy the `FORM_ID` and replace the action in `components/Contact.js` (search for `FORM_ID`).

Typewriter & animated hero
- The hero now includes a lightweight typewriter effect and an animated gradient overlay. No extra packages required.

Adding custom project screenshots
- To use custom screenshots (recommended for best visuals), add image files to `public/assets/projects/` using the repository name as the filename. Example:

```none
public/assets/projects/DSML-Fin.png
public/assets/projects/konectapp.png
public/assets/projects/Gesture_based_Authentication.png
public/assets/projects/facialAttendence.png
```

- The Projects component will prefer these local screenshots automatically. If a local file is missing the site falls back to the GitHub OpenGraph image. Use PNG or JPG and 1200×630 or similar aspect ratio for best results.

Project detail modal (optional)
- If you'd like, I can add a modal that opens a larger screenshot and renders the full README for each project when users click "Details". Tell me if you want that and I’ll implement it next.
