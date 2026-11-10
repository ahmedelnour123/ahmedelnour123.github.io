# Portfolio Redesign Plan

Branch: `new-portfolio` · `plan.md` stays out of git (via `.git/info/exclude`).

## Where it is now

- One `index.html` (~670 lines, inline CSS + JS) that builds everything from `portfolio.json`.
- Layout: sticky header, sidebar with dropdowns, and one visible "section" at a time. You can't
  link to a project, and on mobile the sidebar is a cramped 220px scroll box.
- Assets: 46 PNG/JPG images (**~19 MB**, Shanfara PNGs alone are ~13 MB) and 4 MP4s (~225 MB).
- Every YouTube iframe and autoplay video loads up front, including a 93 MB MP4 that autoplays
  even when hidden.

## Goals

1. A modern, distinctive "Nightfall" look that fits the avatar: deep night-blue background,
   violet accent (the avatar's backdrop), crimson secondary (the cap).
2. Use the most efficient image format: **AVIF**.
3. Load fast: lazy media, no layout shift, no heavy work on first paint.
4. Keep it data-driven: `portfolio.json` stays the single source of content.
5. Shareable deep links to each project, keyboard accessible, solid on mobile.

## Image pipeline (AVIF)

- Convert every PNG/JPG in `Resources/` to AVIF with Pillow (Python script kept in the repo at
  `tools/convert-images.py` so new images can be converted the same way).
  - Full size: longest edge capped at 1920px, quality ~60 (AVIF holds detail well at that).
  - Thumbnail: 720px wide `-720.avif` variant for grid cards, served via `srcset`.
  - Keep the alpha channel where the source has real transparency (the avatar).
- Write intrinsic `width`/`height` into `portfolio.json` so the browser reserves space (no CLS).
- Generate AVIF **poster frames** for the 4 local MP4s with ffmpeg, so video cards show an image
  without downloading the video.
- Remove the original PNG/JPG files (they remain in git history).
- AVIF only, no WebP/JPEG fallback: every current browser supports it (Chrome 85+,
  Firefox 93+, Safari 16+). Target: ~19 MB of images down to roughly 2 MB.

## New structure

```
index.html          markup shell + meta/OG tags
css/styles.css      design system (tokens, layout, components)
js/main.js          data loading, rendering, router, lightbox, lazy media
portfolio.json      content (image paths -> .avif, plus width/height)
Resources/*.avif    images + video posters
tools/convert-images.py
```

## Page layout (single scrolling page + project detail view)

1. **Top nav**: avatar + "Nightfall16" wordmark, links (Work, Art, About), social icons.
   Collapses into a menu button on mobile.
2. **Hero**: name, role ("Unreal Engine Tools & Gameplay Programmer"), a short pitch,
   "11+ years" stat chips, CTA buttons (View work / YouTube), soft violet glow + starfield
   background drawn in CSS only (no image cost).
3. **Work**: filter tabs (All · Editor Tools · Game Dev Tools · Game Projects) over a responsive
   card grid. Each card: cover (first image, video poster, or YouTube thumbnail), category tag,
   title, one-line summary, link icons (Fab, Steam, Docs, Source).
4. **Project detail** (`#/project/<id>`): opens as a full page view with back button: title,
   tags, description, links as buttons, key features as a two-column list, then the media
   gallery. Prev/next project navigation at the bottom. Back/forward work through the hash.
5. **Art**: masonry gallery of the 3D character work + Fiverr section, opens in the lightbox.
6. **About**: intro paragraph + three journey cards (Unreal, Early career, 3D artist).
7. **Footer**: socials, current year, GoatCounter analytics kept.

## Performance details

- YouTube: "lite" embeds. Show the thumbnail + play button; the iframe
  (`youtube-nocookie.com`) only loads on click.
- Local MP4s: `preload="none"` + poster. Autoplay clips start only when scrolled into view
  (IntersectionObserver) and pause when out of view.
- Images: `loading="lazy"`, `decoding="async"`, `srcset`/`sizes` with the 720px variant.
- Fonts: Space Grotesk (headings) + Inter (body) from Google Fonts with `display=swap`.
- No framework, no build step; still works on GitHub Pages as-is.

## Accessibility

- Semantic landmarks, real `<button>`s and `<a>`s, visible focus rings.
- Lightbox: focus trap, Esc/←/→, swipe on touch, `aria-modal`.
- `prefers-reduced-motion` turns off animations and video autoplay.

## Content clean-up (light touch)

- Fix obvious typos/capitalisation in `portfolio.json` ("i" → "I", "Multiplyer", "Reactiosn",
  "Wizzard" alt text, etc.) and the literal `**Time Stone Plugin**` markdown.
- Add a short `summary` per project for the cards.

## Out of scope (possible follow-ups)

- Re-encoding the MP4s (AV1/H.265, ~225 MB) — a big, separate win.
- Custom domain / SEO beyond basic meta tags.

## Verification

- Serve locally, check desktop + 375px mobile widths, every project route, lightbox,
  lazy video, filter tabs, and that no console errors or 404s appear.
