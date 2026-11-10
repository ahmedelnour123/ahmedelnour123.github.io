# portfolio
my personal projects and stuff i was hired to do in different studios

## Structure

```
index.html              page shell (nav, hero, sections, lightbox)
css/styles.css          design system and layout
js/main.js              renders everything from portfolio.json, routing, lightbox, lazy media
portfolio.json          all content: profile, projects, art, about
Resources/img/*.avif    images (AVIF) and video poster frames
Resources/Videos/*.mp4  local videos
tools/convert-images.py image pipeline
```

Each project has its own link: `#/project/<id>` (the `id` in `portfolio.json`).

## Adding images

1. Drop the PNG/JPG into `Resources/` and reference it in `portfolio.json` with its original
   path, e.g. `"src": "Resources/MyShot.png"`.
2. Run the converter (needs Python with Pillow 11.2+ and ffmpeg):

   ```
   python tools/convert-images.py --delete
   ```

   It writes `Resources/img/myshot.avif` plus a 720px `-720.avif` thumbnail, points the JSON
   entry at the AVIF, adds its width/height, and (with `--delete`) removes the original.

## Adding videos

1. Drop the MP4 into `Resources/Videos/` and reference it in `portfolio.json`
   (`{ "type": "video", "src": "Resources/Videos/MyClip.mp4" }`).
2. Run `python tools/encode-videos.py --delete` (needs ffmpeg with libaom-av1 + libx264).
   It writes `MyClip.av1.mp4` (served first) and `MyClip.h264.mp4` (fallback), updates the JSON,
   and removes the source.
3. Run `python tools/convert-images.py` to make its poster frame.

## Run locally

`fetch()` needs a web server, so open it through one instead of double-clicking the file:

```
python -m http.server 8765
```
