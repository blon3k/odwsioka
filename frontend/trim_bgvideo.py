#!/usr/bin/env python3
"""Trim the middle 4 minutes of the cow background video to bgvideo.mp4."""

import json
import shutil
import subprocess
import sys
from pathlib import Path

CLIP_SECONDS = 4 * 60
ASSETS_DIR = Path(__file__).resolve().parent / "src" / "assets"
SOURCE_NAME = (
    "4K Ultra HD Relaxing COW VIDEO, "
    "Deep Sleep Nature Sounds for Anxiety Relief 💤🌾.mp4"
)
OUTPUT_NAME = "bgvideo.mp4"


def require_tool(name: str) -> str:
    path = shutil.which(name)
    if not path:
        print(f"Error: {name} is not installed or not on PATH.", file=sys.stderr)
        sys.exit(1)
    return path


def get_duration_seconds(ffprobe: str, source: Path) -> float:
    result = subprocess.run(
        [
            ffprobe,
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "json",
            str(source),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    data = json.loads(result.stdout)
    return float(data["format"]["duration"])


def main() -> None:
    ffprobe = require_tool("ffprobe")
    ffmpeg = require_tool("ffmpeg")

    source = ASSETS_DIR / SOURCE_NAME
    output = ASSETS_DIR / OUTPUT_NAME

    if not source.exists():
        print(f"Error: source video not found:\n  {source}", file=sys.stderr)
        sys.exit(1)

    duration = get_duration_seconds(ffprobe, source)
    if duration <= CLIP_SECONDS:
        print(
            f"Error: source is {duration:.1f}s, shorter than {CLIP_SECONDS}s clip.",
            file=sys.stderr,
        )
        sys.exit(1)

    start = (duration - CLIP_SECONDS) / 2
    print(f"Source duration: {duration:.1f}s")
    print(f"Extracting {CLIP_SECONDS}s from middle (start: {start:.1f}s)")
    print(f"Writing: {output}")

    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-ss",
            f"{start:.3f}",
            "-i",
            str(source),
            "-t",
            str(CLIP_SECONDS),
            "-c",
            "copy",
            str(output),
        ],
        check=True,
    )

    print("Done.")


if __name__ == "__main__":
    main()
