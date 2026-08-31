"""Build the Play Console upload set from emulator captures and the brand art.

Play's phone screenshots have to sit between 16:9 and 9:16. A modern phone screen is 9:20, so a
raw screencap is out of spec on the tall side. Rather than crop, which would take the tab bar or
the header off the bottom or top of every shot, each one is scaled to fit 1920 tall and centred
on the page background. Nothing in the product is lost and the padding reads as a deliberate
frame rather than a mistake.
"""
import sys
from PIL import Image

SRC = sys.argv[1]  # directory of raw 1080x2400 screencaps
OUT = "D:/fuelmyathlete.com/store/play"
BG = (242, 240, 235)  # the app's own page background

# Order matters: this is the order Play shows them in, so it has to read as a story. What the
# app is for, then the week it builds, then the thing a parent actually uses on a Saturday.
SHOTS = ["today", "week", "grocery", "recipes", "guides"]

for name in SHOTS:
    im = Image.open(f"{SRC}/{name}.png").convert("RGB")
    scale = 1920 / im.height
    im = im.resize((round(im.width * scale), 1920), Image.LANCZOS)
    canvas = Image.new("RGB", (1080, 1920), BG)
    canvas.paste(im, ((1080 - im.width) // 2, 0))
    canvas.save(f"{OUT}/screenshots/{name}.png")

# Store icon: 512x512, no transparency and no rounded corners of our own, because Play applies
# its own mask and a pre-rounded icon ends up with two corners.
mark = Image.open("D:/fuelmyathlete.com/public/images/favicon.png").convert("RGBA")
icon = Image.new("RGB", (512, 512), (245, 244, 241))
m = mark.copy()
m.thumbnail((512 * 62 // 100, 512 * 62 // 100), Image.LANCZOS)
icon.paste(m, ((512 - m.width) // 2, (512 - m.height) // 2), m)
icon.save(f"{OUT}/store-icon-512.png")

# Feature graphic: 1024x500, shown at the top of the listing. Text inside it gets cropped on
# some surfaces, so this is the logo on the brand ground and nothing else.
logo = Image.open("D:/fuelmyathlete.com/public/images/logo.png").convert("RGBA")
feature = Image.new("RGB", (1024, 500), (245, 244, 241))
l = logo.copy()
l.thumbnail((620, 340), Image.LANCZOS)
feature.paste(l, ((1024 - l.width) // 2, (500 - l.height) // 2), l)
feature.save(f"{OUT}/feature-graphic-1024x500.png")

print("wrote", len(SHOTS), "screenshots, store icon, feature graphic")
