"""Compose WeePoint UI + official WeeKobi wordmark onto customer-app photo."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


BASE = Path(
    r"C:\Users\hanif\.cursor\projects\c-ismail-dev-weecomi-me\assets\weekobi-customer-base.png"
)
APP_UI = Path(
    r"C:\Users\hanif\.cursor\projects\c-ismail-dev-weecomi-me\assets\c__Users_hanif_AppData_Roaming_Cursor_User_workspaceStorage_6fff9d85535fb01d0ebc1bd86d8d1276_images_image-20666daf-0a1e-4f4a-95dc-b927cd819d36.png"
)
LOGO = Path(r"C:\ismail_dev\weecomi-me\frontend\public\logos\weekobi.png")
OUT = Path(
    r"C:\ismail_dev\weecomi-me\frontend\public\images\ecosystem-carousel\weekobi-customer-app.png"
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


def polygon_mask(size, quad, blur=1.5):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).polygon(quad, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(blur))


def trim_alpha(img: Image.Image):
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def remove_near_black(img: Image.Image, threshold=55):
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                px[x, y] = (r, g, b, 0)
    return trim_alpha(img)


def add_screen_glare(canvas: Image.Image, quad):
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.polygon(quad, fill=(255, 255, 255, 22))
    draw.line([quad[0], quad[1]], fill=(255, 255, 255, 48), width=2)
    return Image.alpha_composite(canvas, overlay)


def make_premium_label(size):
    label = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(label)
    pad = 14
    draw.rounded_rectangle(
        (pad, pad, size[0] - pad, size[1] - pad),
        radius=18,
        fill=(252, 248, 242, 245),
        outline=(255, 255, 255, 180),
        width=2,
    )
    return label.filter(ImageFilter.GaussianBlur(0.3))


def main():
    base = Image.open(BASE).convert("RGBA")
    size = base.size

    # Phone screen quad tuned for weekobi-customer-base.png (1536x1024)
    phone_quad = [
        (552, 338),
        (704, 330),
        (718, 688),
        (566, 694),
    ]

    app = Image.open(APP_UI).convert("RGBA")
    app = app.resize((430, 930), Image.Resampling.LANCZOS)
    phone_layer = warp_rgba(app, phone_quad, size)
    phone_mask = polygon_mask(size, phone_quad, blur=1.2)

    bezel = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(bezel).polygon(phone_quad, fill=(8, 8, 10, 255))
    result = Image.composite(bezel, base, phone_mask)
    result = Image.alpha_composite(result, phone_layer)
    result = add_screen_glare(result, phone_quad)

    # Premium cream foil label + official wordmark on orange bag
    label_src = make_premium_label((640, 220))
    label_quad = [
        (768, 500),
        (958, 493),
        (965, 598),
        (775, 605),
    ]
    label_layer = warp_rgba(label_src, label_quad, size)

    logo = remove_near_black(Image.open(LOGO).convert("RGBA"))
    logo = logo.resize((500, int(500 * logo.size[1] / logo.size[0])), Image.Resampling.LANCZOS)
    logo = trim_alpha(logo)
    logo_quad = [
        (788, 528),
        (938, 522),
        (941, 578),
        (791, 584),
    ]
    logo_layer = warp_rgba(logo, logo_quad, size)

    bag_stack = Image.new("RGBA", size, (0, 0, 0, 0))
    bag_stack = Image.alpha_composite(bag_stack, label_layer)
    bag_stack = Image.alpha_composite(bag_stack, logo_layer)

    # Soft shadow from label alpha only
    label_shadow = label_src.convert("L").point(lambda v: int(v * 0.35))
    label_shadow = Image.merge("RGBA", (label_shadow, label_shadow, label_shadow, label_shadow))
    shadow_quad = [(x + 2, y + 4) for x, y in label_quad]
    sh = warp_rgba(label_shadow, shadow_quad, size)
    result = Image.alpha_composite(result, sh)
    result = Image.alpha_composite(result, bag_stack)

    result.convert("RGB").save(OUT, "PNG", optimize=True)
    print("saved", OUT)


if __name__ == "__main__":
    main()
