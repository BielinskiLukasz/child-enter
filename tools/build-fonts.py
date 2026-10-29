#!/usr/bin/env python3
"""Regenerate src/fonts.css with the web fonts embedded as data URLs.

The activity must work offline from a single HTML file, so the fonts cannot be
left as separate asset files or fetched from a font CDN at runtime. This script
downloads the Latin and Latin Extended subsets (Latin Extended carries the
Polish characters) and writes them into src/fonts.css as base64 data URLs.

Usage: python3 tools/build-fonts.py
"""

import base64
import pathlib
import re
import subprocess

CSS_API = (
    "https://fonts.googleapis.com/css2"
    "?family=DM+Sans:wght@500"
    "&family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500"
    "&display=swap"
)
# A modern browser user agent makes the API answer with compact woff2 files.
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
SUBSETS = ("latin", "latin-ext")
OUTPUT = pathlib.Path("src/fonts.css")

HEADER = """/* Fonts: DM Sans and Fraunces, SIL Open Font License (see src/assets/licenses/).
   Latin + Latin Extended subsets, embedded as data URLs so the built single
   file works offline and never requests a font from the network.
   Regenerate with tools/build-fonts.py. */
"""


def fetch(url: str, user_agent: str | None = None) -> bytes:
    command = ["curl", "-sSL", "--fail", url]
    if user_agent:
        command += ["-A", user_agent]
    result = subprocess.run(command, capture_output=True, check=True)
    return result.stdout


def main() -> None:
    api_css = fetch(CSS_API, USER_AGENT).decode()
    blocks = re.findall(
        r"/\* (" + "|".join(SUBSETS) + r") \*/\s*(@font-face \{.*?\})", api_css, re.S
    )
    if not blocks:
        raise SystemExit("No matching @font-face blocks were found.")

    parts = [HEADER]
    for subset, block in blocks:
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        family = re.search(r"font-family: '([^']+)'", block).group(1)
        style = re.search(r"font-style: (\w+)", block).group(1)
        weight = re.search(r"font-weight: ([^;]+);", block).group(1)
        unicode_range = re.search(r"unicode-range: ([^;]+);", block).group(1)
        data = base64.b64encode(fetch(url)).decode()
        parts.append(
            f"/* {family} {style} {subset} */\n"
            "@font-face {\n"
            f'  font-family: "{family}";\n'
            f"  font-style: {style};\n"
            f"  font-weight: {weight};\n"
            "  font-display: swap;\n"
            f'  src: url("data:font/woff2;base64,{data}") format("woff2");\n'
            f"  unicode-range: {unicode_range};\n"
            "}\n"
        )
        print(f"{family} {style} {subset}")

    OUTPUT.write_text("\n".join(parts))
    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
