"""Generate the Android launcher icon set from the brand mark.

Same source and the same composition as the PWA icon route: the flame-runner on its own,
centred on a warm white ground. The full logo includes the wordmark, which is unreadable at
48px and is why the web icon does not use it either.
"""
from PIL import Image, ImageDraw

ROOT = "D:/fuelmyathlete.com/android/app/src/main/res/"
SRC = "D:/fuelmyathlete.com/public/images/favicon.png"
BG = (245, 244, 241, 255)  # #F5F4F1, the same ground the PWA icon uses

mark = Image.open(SRC).convert("RGBA")

# Legacy square/round icons, in dp: these are the whole icon, so the mark can be generous.
LEGACY = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
# Adaptive foreground is a 108dp canvas of which only the inner 72dp is guaranteed visible;
# the launcher masks and parallaxes the rest. At 50% the mark measures 54x42dp, whose diagonal
# is 68dp, so it stays inside the 72dp circle even on a launcher that masks hardest.
ADAPTIVE = {"mdpi": 108, "hdpi": 162, "xhdpi": 216, "xxhdpi": 324, "xxxhdpi": 432}


def fitted(box, fraction):
    """The mark scaled to `fraction` of a `box` square, centred, on transparency."""
    target = int(box * fraction)
    w, h = mark.size
    scale = min(target / w, target / h)
    m = mark.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    canvas = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    canvas.paste(m, ((box - m.width) // 2, (box - m.height) // 2), m)
    return canvas


for density, size in LEGACY.items():
    fg = fitted(size, 0.74)

    square = Image.new("RGBA", (size, size), BG)
    square.alpha_composite(fg)
    square.save(f"{ROOT}mipmap-{density}/ic_launcher.png")

    # The round variant is the same art on a circle, not a circle-cropped square: cropping
    # a square would shave the flame at the left edge.
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    round_icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    round_icon.paste(Image.new("RGBA", (size, size), BG),
                     (0, 0), mask.resize((size, size), Image.LANCZOS))
    round_icon.alpha_composite(fitted(size, 0.62))
    round_icon.save(f"{ROOT}mipmap-{density}/ic_launcher_round.png")

for density, size in ADAPTIVE.items():
    fitted(size, 0.50).save(f"{ROOT}mipmap-{density}/ic_launcher_foreground.png")

print("wrote", len(LEGACY) * 2 + len(ADAPTIVE), "files")
