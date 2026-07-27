from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT.parent
OUT = ROOT / "assets"


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            pass
    return ImageFont.load_default()


def open_rgb(path):
    img = Image.open(path)
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, "white")
        bg.paste(img, mask=img.split()[-1])
        return bg
    if img.mode != "RGB":
        return img.convert("RGB")
    return img


def fit_image(src, dst, max_width=1800):
    img = open_rgb(src)
    if img.width > max_width:
        height = int(img.height * max_width / img.width)
        img = img.resize((max_width, height), Image.Resampling.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=86, method=6)
    print(f"wrote: {dst}")


def draw_label(draw, box, title, body, accent):
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=24, fill="#ffffff", outline="#dad6cb", width=2)
    draw.rectangle((x1, y1, x1 + 10, y2), fill=accent)
    draw.text((x1 + 34, y1 + 28), title, font=font(44, True), fill="#111111")
    draw.text((x1 + 34, y1 + 88), body, font=font(24), fill="#5d5b55")


def make_avatar(dst):
    size = 1000
    img = Image.new("RGB", (size, size), "#f5f7f7")
    draw = ImageDraw.Draw(img)
    for offset in range(-size, size * 2, 58):
        draw.line((offset, 0, offset - size, size), fill="#dbe4e3", width=1)
    draw.rounded_rectangle((94, 94, size - 94, size - 94), radius=64, outline="#111111", width=5)
    draw.ellipse((710, 126, 824, 240), fill="#c94d3a")
    draw.ellipse((184, 728, 312, 856), outline="#227c70", width=8)
    text = "Y"
    bbox = draw.textbbox((0, 0), text, font=font(360, True))
    draw.text(((size - (bbox[2] - bbox[0])) / 2, 224), text, font=font(360, True), fill="#111111")
    sub = "MARKET / PMF / SALES"
    bbox = draw.textbbox((0, 0), sub, font=font(38, True))
    draw.text(((size - (bbox[2] - bbox[0])) / 2, 650), sub, font=font(38, True), fill="#5b5750")
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"wrote: {dst}")


def make_pmf_cover(dst):
    width, height = 1600, 1000
    img = Image.new("RGB", (width, height), "#f5f7f7")
    draw = ImageDraw.Draw(img)
    for x in range(0, width, 80):
        draw.line((x, 0, x, height), fill="#dce6e4", width=1)
    for y in range(0, height, 80):
        draw.line((0, y, width, y), fill="#dce6e4", width=1)
    draw.rectangle((0, 0, 22, height), fill="#227c70")
    draw.text((92, 88), "JabX North America PMF", font=font(76, True), fill="#111111")
    draw.text((96, 178), "Market validation / User operations / Kickstarter readiness", font=font(34), fill="#605c54")

    metrics = [
        ("126", "PD01 survey responses"),
        ("333", "PD02 survey responses"),
        ("1,153", "reachable user pool"),
        ("98", "WhatsApp seed users"),
    ]
    x = 96
    for value, label in metrics:
        draw.rounded_rectangle((x, 305, x + 320, 500), radius=22, fill="#ffffff", outline="#d8d2c5", width=2)
        draw.text((x + 30, 334), value, font=font(70, True), fill="#111111")
        draw.text((x + 32, 424), label, font=font(24), fill="#5d5b55")
        x += 356

    steps = [
        ("Research", "category and competitor map"),
        ("Test", "PD01 / PD02 ad and survey loop"),
        ("Segment", "Mailchimp, interviews, WhatsApp"),
        ("Activate", "brand co-creation and launch assets"),
    ]
    y = 650
    for i, (title, body) in enumerate(steps):
        x1 = 120 + i * 355
        draw.ellipse((x1, y, x1 + 64, y + 64), fill="#111111")
        draw.text((x1 + 22, y + 16), str(i + 1), font=font(28, True), fill="#ffffff")
        draw.text((x1, y + 92), title, font=font(36, True), fill="#111111")
        draw.text((x1, y + 142), body, font=font(23), fill="#69645d")
        if i < len(steps) - 1:
            draw.line((x1 + 92, y + 32, x1 + 315, y + 32), fill="#c94d3a", width=6)

    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"wrote: {dst}")


def make_sales_cover(dst):
    width, height = 1600, 1000
    img = Image.new("RGB", (width, height), "#f5f7f7")
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, width, height), fill="#f5f7f7")
    for x in range(0, width, 100):
        draw.line((x, 0, x + 260, height), fill="#dce6e4", width=1)
    draw.rectangle((0, height - 30, width, height), fill="#c94d3a")
    draw.text((92, 88), "AI Fighting Robot Commercialization", font=font(70, True), fill="#111111")
    draw.text((96, 174), "0-to-1 sales system / Channel strategy / Delivery loop", font=font(34), fill="#5d5b55")

    cards = [
        ("~500", "qualified leads", "from several thousand contacts"),
        ("25", "units sold", "domestic and overseas"),
        ("~RMB 1.5M", "confirmed revenue", "aggregate public-safe number"),
        ("~36%", "gross margin", "after pricing and cost reset"),
    ]
    positions = [(94, 292), (828, 292), (94, 575), (828, 575)]
    for (value, label, body), (x, y) in zip(cards, positions):
        draw.rounded_rectangle((x, y, x + 642, y + 218), radius=24, fill="#ffffff", outline="#d9d4ca", width=2)
        draw.text((x + 36, y + 30), value, font=font(58, True), fill="#111111")
        draw.text((x + 38, y + 106), label.upper(), font=font(26, True), fill="#227c70")
        draw.text((x + 38, y + 152), body, font=font(25), fill="#67635b")

    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"wrote: {dst}")


def make_sales_framework(dst):
    width, height = 1600, 950
    img = Image.new("RGB", (width, height), "#f5f7f7")
    draw = ImageDraw.Draw(img)
    draw.text((84, 74), "Channel Sales Operating System", font=font(62, True), fill="#111111")
    draw.text((88, 154), "Lead intake to delivery, after-sales, and supply-chain feedback", font=font(30), fill="#5d5b55")
    items = [
        ("01", "Target scenario", "theme parks, showrooms, exhibitions"),
        ("02", "Lead scoring", "budget, urgency, venue, decision maker"),
        ("03", "Quote ladder", "direct, channel, protection period"),
        ("04", "Project filing", "avoid channel conflict"),
        ("05", "Delivery boundary", "contract, logistics, certification"),
        ("06", "Feedback loop", "after-sales to product and suppliers"),
    ]
    for i, (num, title, body) in enumerate(items):
        x = 92 + (i % 3) * 495
        y = 286 + (i // 3) * 260
        draw.rounded_rectangle((x, y, x + 420, y + 190), radius=22, fill="#ffffff", outline="#d7d1c7", width=2)
        draw.text((x + 30, y + 30), num, font=font(34, True), fill="#c94d3a")
        draw.text((x + 96, y + 26), title, font=font(34, True), fill="#111111")
        draw.text((x + 32, y + 96), body, font=font(24), fill="#625f59")
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"wrote: {dst}")


def make_site_preview(dst):
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), "#f5f7f7")
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, 24, height), fill="#227c70")
    draw.rectangle((24, height - 24, width, height), fill="#c94d3a")
    draw.text((82, 86), "Yuan Portfolio", font=font(74, True), fill="#111111")
    draw.text((86, 178), "Market, PMF & commercialization for robotics hardware", font=font(32), fill="#595650")
    draw_label(draw, (86, 292, 540, 492), "JabX PMF", "North America validation and user operations", "#227c70")
    draw_label(draw, (596, 292, 1050, 492), "Robot Sales", "0-to-1 commercial system and channel sales", "#c94d3a")
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"wrote: {dst}")


def main():
    make_avatar(OUT / "profile/avatar.webp")
    make_pmf_cover(OUT / "projects/jabx-north-america-pmf/cover.webp")
    make_sales_cover(OUT / "projects/ai-fighting-robot-commercialization/cover.webp")
    make_sales_framework(OUT / "projects/ai-fighting-robot-commercialization/gallery/channel-system.webp")
    make_site_preview(OUT / "site-preview.webp")

    copies = [
        (
            SOURCE_ROOT / "funnel-diagnosis-visual.png",
            OUT / "projects/jabx-north-america-pmf/gallery/funnel-diagnosis.webp",
        ),
        (
            SOURCE_ROOT / "figures_jabx_pmf_png/03_total_funnel.png",
            OUT / "projects/jabx-north-america-pmf/gallery/total-funnel.webp",
        ),
        (
            SOURCE_ROOT / "figures_jabx_pmf_png/10_email_invitation_funnel.png",
            OUT / "projects/jabx-north-america-pmf/gallery/email-invitation-funnel.webp",
        ),
        (
            SOURCE_ROOT / "kol-management-visuals/KOL-management-visuals-10png/01-kol-flow.png",
            OUT / "projects/jabx-north-america-pmf/gallery/kol-flow.webp",
        ),
        (
            OUT / "projects/ai-fighting-robot-commercialization/gallery/commercialization-snapshot.webp",
            OUT / "projects/ai-fighting-robot-commercialization/gallery/commercialization-snapshot.webp",
        ),
        (
            SOURCE_ROOT / "outputs/embodied_company_fact_table/_codex_fill_work/final_preview_A1_I21.png",
            OUT / "projects/ai-fighting-robot-commercialization/gallery/company-research.webp",
        ),
    ]

    # Regenerate the public-safe aggregate sales snapshot as a gallery asset.
    make_sales_cover(OUT / "projects/ai-fighting-robot-commercialization/gallery/commercialization-snapshot.webp")

    for src, dst in copies:
        if src == dst:
            continue
        if src.exists():
            fit_image(src, dst)
        else:
            print(f"missing: {src}")


if __name__ == "__main__":
    main()
