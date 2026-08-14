"""Compose WeePoint app UI + logo onto boutique checkout base photo."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont


BASE = Path(
    r"C:\Users\hanif\.cursor\projects\c-ismail-dev-weecomi-me\assets\weepoint-base.png"
)
APP_UI = Path(
    r"C:\Users\hanif\.cursor\projects\c-ismail-dev-weecomi-me\assets\c__Users_hanif_AppData_Roaming_Cursor_User_workspaceStorage_6fff9d85535fb01d0ebc1bd86d8d1276_images_ingilizce-phone-36f026f2-6df1-4d70-9a89-66909db6e75f.png"
)
ICON = Path(r"C:\ismail_dev\weecomi-me\frontend\public\logos\weekobi-icon.png")
OUT = Path(
    r"C:\ismail_dev\weecomi-me\frontend\public\images\ecosystem-carousel\weepoint-customer-app.png"
)


def find_coeffs(source_coords, target_coords):
    matrix = []
    for s, t in zip(source_coords, target_coords):
        matrix.append([t[0], t[1], 1, 0, 0, 0, -s[0] * t[0], -s[0] * t[1]])
        matrix.append([0, 0, 0, t[0], t[1], 1, -s[1] * t[0], -s[1] * t[1]])
    a = np.matrix(matrix, dtype=float)
    b = np.array(source_coords).reshape(8)
    res = np.dot(np.linalg.inv(a.T * a) * a.T, b)
    return np.array(res).reshape(8)


def warp_rgba(src: Image.Image, dst_quad, canvas_size):
    w, h = src.size
    src_quad = [(0, 0), (w, 0), (w, h), (0, h)]
    coeffs = find_coeffs(src_quad, dst_quad)
    warped = src.transform(canvas_size, Image.PERSPECTIVE, coeffs, Image.Resampling.BICUBIC)
    return warped.convert("RGBA")


def polygon_mask(size, quad, blur=1.2):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).polygon(quad, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(blur))


def trim_alpha(img: Image.Image):
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def remove_near_black(img: Image.Image, threshold=40):
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                px[x, y] = (r, g, b, 0)
    return trim_alpha(img)


def make_bag_print_layer(icon: Image.Image, size=(460, 200)):
    """Icon + WeePoint label for screen-print look on orange kraft."""
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    icon = icon.resize((130, 130), Image.Resampling.LANCZOS)
    # Slightly desaturate icon for ink-on-kraft realism
    icon_rgb = ImageEnhance.Color(icon).enhance(0.82)
    icon_rgb = ImageEnhance.Contrast(icon_rgb).enhance(1.08)
    canvas.paste(icon_rgb, (size[0] // 2 - 65, 8), icon_rgb)

    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("arial.ttf", 32)
    except OSError:
        font = ImageFont.load_default()
    text = "WeePoint"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(
        ((size[0] - tw) // 2, 145),
        text,
        fill=(38, 38, 38, 245),
        font=font,
    )
    return canvas


def screen_print_blend(base: Image.Image, layer: Image.Image, quad, canvas_size):
    warped = warp_rgba(layer, quad, canvas_size)
    out = base.copy()
    mask = warped.split()[3]

    # Split icon colors vs text: keep icon hue, deepen into kraft
    warped_rgb = warped.convert("RGB")
    base_rgb = base.convert("RGB")

    # Sample local bag tone for subtle paper interaction
    multiplied = ImageChops.multiply(
        base_rgb,
        ImageEnhance.Brightness(warped_rgb).enhance(0.72),
    )
    # Soft-light mix keeps orange warmth while anchoring ink
    blended = ImageChops.soft_light(base_rgb, warped_rgb)
    mixed = Image.blend(multiplied, blended, 0.45)
    out.paste(mixed, (0, 0), mask)
    return out


def main():
    base = Image.open(BASE).convert("RGBA")
    size = base.size

    # Phone screen quad (TL, TR, BR, BL) — tuned for weepoint-base.png
    phone_quad = [
        (668, 518),
        (776, 512),
        (784, 812),
        (674, 818),
    ]

    app = Image.open(APP_UI).convert("RGBA")
    app = app.resize((430, 930), Image.Resampling.LANCZOS)
    phone_layer = warp_rgba(app, phone_quad, size)
    phone_mask = polygon_mask(size, phone_quad, blur=1.0)

    bezel = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(bezel).polygon(phone_quad, fill=(6, 6, 8, 255))
    result = Image.composite(bezel, base, phone_mask)
    result = Image.alpha_composite(result, phone_layer)

    # Subtle screen glare
    glare = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(glare).polygon(phone_quad, fill=(255, 255, 255, 18))
    ImageDraw.Draw(glare).line([phone_quad[0], phone_quad[1]], fill=(255, 255, 255, 40), width=2)
    result = Image.alpha_composite(result, glare)

    # Bag print: icon + WeePoint on orange kraft
    icon = remove_near_black(Image.open(ICON).convert("RGBA"))
    print_art = make_bag_print_layer(icon)
    bag_quad = [
        (488, 548),
        (632, 538),
        (642, 708),
        (498, 718),
    ]
    result = screen_print_blend(result, print_art, bag_quad, size)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    result.convert("RGB").save(OUT, "PNG", optimize=True)
    print("saved", OUT)


if __name__ == "__main__":
    main()
