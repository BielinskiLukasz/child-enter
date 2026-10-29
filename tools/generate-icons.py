#!/usr/bin/env python3
"""Generate the offline PWA and Apple PNG icons with Python's standard library."""
from __future__ import annotations
import math
import pathlib
import struct
import zlib

ROOT = pathlib.Path(__file__).resolve().parents[1] / "public" / "icons"

class Canvas:
    def __init__(self, size: int, scale: int = 2):
        self.size, self.scale = size, scale
        self.side = size * scale
        self.pixels = bytearray(self.side * self.side * 4)

    def paint(self, color: str, inside):
        color = tuple(bytes.fromhex(color.lstrip("#"))) + (255,)
        for y in range(self.side):
            cy = (y + 0.5) / self.side
            for x in range(self.side):
                if inside((x + 0.5) / self.side, cy):
                    offset = (y * self.side + x) * 4
                    self.pixels[offset:offset + 4] = bytes(color)

    def rect(self, x0, y0, x1, y1, color):
        self.paint(color, lambda x, y: x0 <= x <= x1 and y0 <= y <= y1)

    def round_rect(self, x0, y0, x1, y1, radius, color):
        def inside(x, y):
            if not (x0 <= x <= x1 and y0 <= y <= y1):
                return False
            cx = min(max(x, x0 + radius), x1 - radius)
            cy = min(max(y, y0 + radius), y1 - radius)
            return (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2
        self.paint(color, inside)

    def circle(self, cx, cy, radius, color):
        self.paint(color, lambda x, y: (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2)

    def polygon(self, points, color):
        def inside(x, y):
            hit = False
            j = len(points) - 1
            for i, (xi, yi) in enumerate(points):
                xj, yj = points[j]
                if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi:
                    hit = not hit
                j = i
            return hit
        self.paint(color, inside)

    def png(self):
        n, s = self.size, self.scale
        raw = bytearray()
        for y in range(n):
            raw.append(0)
            for x in range(n):
                r = g = b = a = 0
                for dy in range(s):
                    for dx in range(s):
                        i = (((y * s + dy) * self.side) + x * s + dx) * 4
                        r += self.pixels[i]; g += self.pixels[i + 1]
                        b += self.pixels[i + 2]; a += self.pixels[i + 3]
                count = s * s
                raw.extend((r // count, g // count, b // count, a // count))
        def chunk(kind, data):
            body = kind + data
            return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body) & 0xffffffff)
        return (b"\x89PNG\r\n\x1a\n" +
                chunk(b"IHDR", struct.pack(">2I5B", n, n, 8, 6, 0, 0, 0)) +
                chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b""))

def make_icon(size: int, path: pathlib.Path):
    c = Canvas(size, 2)
    c.rect(0, 0, 1, 1, "#f6f3e8")
    # A softly rounded red locomotive and a green passenger carriage.
    c.round_rect(.13, .48, .61, .72, .045, "#b96f52")
    c.rect(.17, .44, .58, .50, "#cc8d68")
    c.round_rect(.42, .26, .62, .52, .025, "#4e6754")
    c.round_rect(.45, .30, .59, .45, .018, "#d4dec8")
    c.rect(.25, .32, .31, .49, "#4e6754")
    c.polygon([(.23,.33),(.25,.28),(.33,.28),(.35,.33)], "#4a6251")
    c.rect(.245, .325, .335, .34, "#d2ac70")
    c.round_rect(.64, .37, .88, .69, .025, "#dfbc70")
    c.rect(.655, .40, .875, .44, "#5b7460")
    c.round_rect(.68, .45, .84, .59, .015, "#c8d7c5")
    c.rect(.755, .45, .77, .59, "#dfbc70")
    c.circle(.28, .75, .075, "#405d4b")
    c.circle(.51, .75, .075, "#405d4b")
    c.circle(.74, .75, .075, "#405d4b")
    c.circle(.28, .75, .035, "#dfbc70")
    c.circle(.51, .75, .035, "#dfbc70")
    c.circle(.74, .75, .035, "#dfbc70")
    c.round_rect(.12, .69, .9, .73, .018, "#405d4b")
    ROOT.mkdir(parents=True, exist_ok=True)
    path.write_bytes(c.png())

make_icon(192, ROOT / "icon-192.png")
make_icon(512, ROOT / "icon-512.png")
make_icon(512, ROOT / "maskable-512.png")
make_icon(180, ROOT / "apple-touch-icon.png")
print(f"Generated PNG icons in {ROOT}")
