# ahmedelnour.com

Portfolio of Ahmed Elnour, served by GitHub Pages from this repo (custom domain in `CNAME`).
Plain HTML, CSS and JS: no build step, no dependencies.

```
index.html          page skeleton and link-preview meta tags
content.js          ALL editable content: CVs, socials, projects, experience, skills
assets/site.css     styles (dark theme only)
assets/site.js      renders content.js into the page, project modal
images/projects/    one folder per project, named by its slug
images/og-image.png link preview image (1200x630)
cv/                 the two CV downloads (published from the CV repo)
privacy.html        Sky Hopper privacy policy; Google Play links here, so keep the URL
```

## Preview locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080. Opening `index.html` directly from disk also works.

## Change the main colors

Edit `--accent` and `--game` in the `:root` block at the top of `assets/site.css`.
The glows and tints are derived from them automatically.

## Add a project

1. Make a folder `images/projects/<slug>/` (e.g. `afterglow`) and put the images in it.
2. Add an entry to `projects` in `content.js`:

```js
{
  slug: "afterglow",
  title: "Afterglow",
  tracks: ["interactive"],            // "interactive" and/or "game"; drives the filter
  badge: "New",                       // optional label on the card
  summary: "One or two sentences for the card.",
  tags: ["Unity", "Python", "Art-Net"],
  links: { code: "https://github.com/..." },  // play, code, download, web; only set ones show
  cover: "cover.webp",                // optional; defaults to the first image
  media: ["yt:VIDEO_ID", "cover.webp", "clip.mp4"],
  challenge: "What was hard.",
  solution: "What you built.",
  highlights: ["Bullet one.", "Bullet two."],
},
```

Media strings: `yt:ID` is a YouTube video (thumbnail generated), a bare file name is looked up in the project's folder, `.mp4`/`.webm` play as video, and full URLs work too.
Order in `projects` is the order on the page. Each project can be linked directly: `ahmedelnour.com/#work/<slug>`.

## Update the CVs

The PDFs come from the CV repo (`../CV`). On Linux, run `./publish-cv.sh` there: it builds
`[Portfolio] Ahmed Elnour - Interactive Developer` and `[Portfolio] Ahmed Elnour - Game Developer`
and copies them to `cv/interactive-developer.pdf` and `cv/game-developer.pdf`. Then commit and push this repo.
The URLs never change, so links to them keep working.
