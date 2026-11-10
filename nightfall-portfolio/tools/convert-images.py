"""Convert portfolio images to AVIF and update portfolio.json.

Usage (from the repo root):
    python tools/convert-images.py            # convert + update portfolio.json
    python tools/convert-images.py --delete   # ...and remove the converted originals

For every PNG/JPG in Resources/ it writes into Resources/img/:
    <name>.avif       full size, longest edge capped at 1920px
    <name>-720.avif   720px-wide thumbnail for grids (only when the source is wider)
For every MP4 in Resources/Videos/ it writes a poster frame: Resources/img/<name>-poster.avif
(plus a <name>-poster-720.avif thumbnail).

<name> is the original file name lower-cased with spaces turned into hyphens.
Then every image path in portfolio.json is pointed at the AVIF file and gets "w"/"h"
fields (intrinsic size) so the page can reserve space before the image loads.

Needs Pillow >= 11.2 (built-in AVIF) and ffmpeg on PATH for posters.
"""

import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Resources"
OUT = SRC / "img"
VIDEOS = SRC / "Videos"
DATA = ROOT / "portfolio.json"

MAX_EDGE = 1920
THUMB_W = 720
POSTER_MAX_W = 1280
# Second to grab the poster frame from; default 2s, override per video file stem.
POSTER_AT = {"GoldenAgeTrailler": 35}


def slug(stem: str) -> str:
    return re.sub(r"\s+", "-", stem.strip()).lower()


def prepare(im: Image.Image) -> Image.Image:
    """Drop the alpha channel when the image is fully opaque."""
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        if im.getchannel("A").getextrema()[0] == 255:
            return im.convert("RGB")
        return im
    return im.convert("RGB")


def save_avif(im: Image.Image, path: Path, screenshot: bool) -> None:
    im.save(
        path,
        "AVIF",
        quality=70 if screenshot else 60,
        speed=4,
        # 4:4:4 keeps thin coloured UI text crisp; photos/renders are fine with 4:2:0.
        subsampling="4:4:4" if screenshot else "4:2:0",
    )


def fit(im: Image.Image, max_edge: int) -> Image.Image:
    if max(im.size) <= max_edge:
        return im
    im = im.copy()
    im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    return im


def convert_image(src: Path) -> dict:
    name = slug(src.stem)
    screenshot = src.suffix.lower() == ".png"
    with Image.open(src) as raw:
        im = fit(prepare(raw), MAX_EDGE)
    save_avif(im, OUT / f"{name}.avif", screenshot)
    if im.width > THUMB_W:
        thumb = im.resize((THUMB_W, round(im.height * THUMB_W / im.width)), Image.LANCZOS)
        save_avif(thumb, OUT / f"{name}-720.avif", screenshot)
    return {"src": f"Resources/img/{name}.avif", "w": im.width, "h": im.height}


def make_poster(video: Path) -> dict:
    stem = video.name.removesuffix(".mp4").removesuffix(".h264")  # encoded by encode-videos.py
    name = slug(stem)
    with tempfile.TemporaryDirectory() as tmp:
        frame = Path(tmp) / "frame.png"
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-ss", str(POSTER_AT.get(stem, 2)), "-i", str(video),
             "-frames:v", "1", str(frame)],
            check=True,
        )
        with Image.open(frame) as raw:
            im = fit(raw.convert("RGB"), POSTER_MAX_W)
    save_avif(im, OUT / f"{name}-poster.avif", screenshot=False)
    thumb = im.resize((THUMB_W, round(im.height * THUMB_W / im.width)), Image.LANCZOS)
    save_avif(thumb, OUT / f"{name}-poster-720.avif", screenshot=False)
    return {"src": f"Resources/img/{name}-poster.avif", "w": im.width, "h": im.height}


def patch_json(images: dict, posters: dict) -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))

    def walk(node):
        if isinstance(node, dict):
            src = node.get("src")
            if isinstance(src, str):
                if src in images:
                    node.update(images[src])
                elif src in posters and node.get("type") == "video":
                    p = posters[src]
                    node.update({"poster": p["src"], "w": p["w"], "h": p["h"]})
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    walk(data)
    DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    delete = "--delete" in sys.argv
    OUT.mkdir(exist_ok=True)

    images, before, after = {}, 0, 0
    sources = sorted(p for p in SRC.iterdir() if p.suffix.lower() in (".png", ".jpg", ".jpeg"))
    for src in sources:
        info = convert_image(src)
        images[f"Resources/{src.name}"] = info
        size_in = src.stat().st_size
        size_out = (ROOT / info["src"]).stat().st_size
        before, after = before + size_in, after + size_out
        print(f"{src.name:28} {size_in / 1024:8.0f} KB -> {size_out / 1024:6.0f} KB")

    posters = {}
    # One poster per video: skip the AV1 twin of an encoded H.264 file.
    for video in sorted(p for p in VIDEOS.glob("*.mp4") if not p.name.endswith((".av1.mp4", ".part.mp4"))):
        posters[f"Resources/Videos/{video.name}"] = make_poster(video)
        print(f"poster: {video.name}")

    patch_json(images, posters)
    print(f"\nTotal: {before / 1048576:.1f} MB -> {after / 1048576:.1f} MB (full-size AVIFs)")

    if delete:
        for src in sources:
            src.unlink()
        print(f"Deleted {len(sources)} originals.")


if __name__ == "__main__":
    main()
