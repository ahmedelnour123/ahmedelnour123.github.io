"""Re-encode portfolio videos with ffmpeg and update portfolio.json.

Usage (from the repo root):
    python tools/encode-videos.py            # encode + update portfolio.json
    python tools/encode-videos.py --delete   # ...and remove the source MP4s

For every source MP4 in Resources/Videos/ (files not already ending in .av1.mp4 / .h264.mp4):
    <name>.av1.mp4    AV1 (libaom), primary: ~2.5x smaller than H.264 at the same quality
    <name>.h264.mp4   H.264 fallback for browsers/devices without AV1 decoding
Both: max 1080p, original frame rate, AAC 96 kbps audio, +faststart so playback starts early.

In portfolio.json the entry's "src" becomes the H.264 file and an "av1" field is added;
the page lists AV1 first and lets the browser pick.
"""

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VIDEOS = ROOT / "Resources" / "Videos"
DATA = ROOT / "portfolio.json"

COMMON_IN = ["-map", "0:v:0", "-map", "0:a:0?", "-vf", "scale=-2:'min(1080,ih)'", "-pix_fmt", "yuv420p"]
AUDIO = ["-c:a", "aac", "-b:a", "96k"]
OUT_FLAGS = ["-movflags", "+faststart", "-map_metadata", "-1"]

AV1 = ["-c:v", "libaom-av1", "-crf", "40", "-cpu-used", "6", "-row-mt", "1", "-tiles", "2x2"]
H264 = ["-c:v", "libx264", "-preset", "slow", "-crf", "28", "-profile:v", "high"]


def encode(src: Path, dst: Path, codec: list) -> None:
    tmp = dst.with_suffix(".part.mp4")
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-stats", "-y", "-i", str(src),
         *COMMON_IN, *codec, *AUDIO, *OUT_FLAGS, str(tmp)],
        check=True,
    )
    tmp.replace(dst)


def main() -> None:
    delete = "--delete" in sys.argv
    sources = sorted(p for p in VIDEOS.glob("*.mp4") if not p.name.endswith((".av1.mp4", ".h264.mp4", ".part.mp4")))
    mapping = {}
    for src in sources:
        av1, h264 = VIDEOS / f"{src.stem}.av1.mp4", VIDEOS / f"{src.stem}.h264.mp4"
        for dst, codec in ((h264, H264), (av1, AV1)):
            if not dst.exists():
                print(f"-> {dst.name}", flush=True)
                encode(src, dst, codec)
        mb = lambda p: p.stat().st_size / 1048576
        print(f"{src.name:32} {mb(src):7.1f} MB -> AV1 {mb(av1):5.1f} MB | H.264 {mb(h264):5.1f} MB")
        mapping[f"Resources/Videos/{src.name}"] = {
            "src": f"Resources/Videos/{h264.name}",
            "av1": f"Resources/Videos/{av1.name}",
        }

    data = json.loads(DATA.read_text(encoding="utf-8"))

    def walk(node):
        if isinstance(node, dict):
            if node.get("type") == "video" and node.get("src") in mapping:
                node.update(mapping[node["src"]])
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    walk(data)
    DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if delete:
        for src in sources:
            src.unlink()
        print(f"Deleted {len(sources)} source videos.")


if __name__ == "__main__":
    main()
