#!/usr/bin/env python3
"""
update_blog_from_linkedin.py
============================
Parses a locally saved LinkedIn company posts page and updates content.ts.

How to use:
  1. Open https://www.linkedin.com/company/wecan-technology/posts/ in Chrome
     while logged in, scroll down to load as many posts as you want.
  2. File -> Save Page As -> "Webpage, Complete" (saves an .html + _files folder)
  3. Run:
       scripts/.venv/bin/python3 scripts/update_blog_from_linkedin.py ~/Downloads/linkedin.html
  4. The script copies new post images into public/images/blog/ and patches content.ts.

Options:
  --dry-run   Print what would be added without writing anything.
"""

import argparse
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

CONTENT_FILE = Path(__file__).parent.parent / "src/data/content.ts"
IMAGES_DIR   = Path(__file__).parent.parent / "public/images/blog"


def activity_id_to_date(activity_id):
    LINKEDIN_EPOCH_MS = 1279422
    ms = (activity_id >> 22) + LINKEDIN_EPOCH_MS
    dt = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)
    return dt.strftime("%B %d, %Y").upper()


def parse_posts(html_path):
    import html as html_mod
    text  = html_path.read_text(encoding="utf-8", errors="replace")
    decoded = html_mod.unescape(text)
    files_dir = html_path.parent / (html_path.stem + "_files")

    # ── Find all activity IDs in document order ───────────────────────────
    activity_pattern = re.compile(r'urn:li:activity:(\d+)')
    all_activities = [(m.start(), int(m.group(1))) for m in activity_pattern.finditer(decoded)]

    # ── Find all post-image positions (aspect-fit = post content image) ───
    # Saved locally as ./stem_files/TIMESTAMP
    img_pattern = re.compile(
        r'<img[^>]+src="\./[^/]+/([^"]+)"[^>]*ivm-view-attr__img--aspect-fit[^>]*>',
        re.IGNORECASE,
    )

    posts = []
    seen_ids = set()

    for m in img_pattern.finditer(decoded):
        img_filename = m.group(1)
        img_pos = m.start()

        # Find closest preceding activity ID
        preceding = [(pos, aid) for pos, aid in all_activities if pos < img_pos]
        if not preceding:
            continue
        _, activity_id = preceding[-1]

        if activity_id in seen_ids:
            continue
        seen_ids.add(activity_id)

        # ── Extract post text: grab lines of 30+ chars after this activity ──
        chunk = decoded[img_pos - 4000: img_pos + 500]
        texts = re.findall(r'>(\w[^\n<]{30,})<', chunk)
        title = ""
        for t in texts:
            t = t.strip()
            # skip meta lines
            if any(skip in t for skip in ["ago •", "followers", "LinkedIn", "http"]):
                continue
            title = re.split(r'[.\n!?]', t)[0].strip()[:80]
            break

        if not title:
            # fall back to slug from URL-style activity (none available; use ID)
            title = f"Post {activity_id}"

        # ── Local image file ───────────────────────────────────────────────
        local_img = files_dir / img_filename if files_dir.exists() else None

        posts.append({
            "activity_id": activity_id,
            "title": title,
            "img_filename": img_filename,
            "local_img": local_img,
        })

    # Sort newest first (highest ID = most recent)
    posts.sort(key=lambda p: p["activity_id"], reverse=True)
    return posts


def existing_links(content):
    return set(re.findall(r'link:\s*"(https://www\.linkedin\.com/posts/[^"]+)"', content))


def build_ts_entry(activity_id, title, image_filename, date_str):
    title = title.replace('"', '\\"')
    link = f"https://www.linkedin.com/feed/update/urn:li:activity:{activity_id}/"
    return (
        "  {\n"
        f'    date: "{date_str}",\n'
        f'    title: "{title}",\n'
        f'    image: baseUrl + "/images/blog/{image_filename}",\n'
        f'    link: "{link}",\n'
        "  },"
    )


def patch_content_ts(new_entries):
    content = CONTENT_FILE.read_text(encoding="utf-8")
    marker = "export const allBlogPosts: BlogPost[] = ["
    if marker not in content:
        print(f"ERROR: Could not find '{marker}' in {CONTENT_FILE}")
        sys.exit(1)
    insertion = "\n".join(new_entries) + "\n"
    patched = content.replace(marker, marker + "\n" + insertion, 1)
    CONTENT_FILE.write_text(patched, encoding="utf-8")
    print(f"  OK  {CONTENT_FILE} updated with {len(new_entries)} new entry/entries.")


def main():
    parser = argparse.ArgumentParser(description="Parse saved LinkedIn HTML -> update content.ts")
    parser.add_argument("html_file", help="Path to the saved LinkedIn company posts HTML file")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be added without writing")
    args = parser.parse_args()

    html_path = Path(args.html_file)
    if not html_path.exists():
        print(f"File not found: {html_path}")
        sys.exit(1)

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Parsing {html_path.name} ...")
    posts = parse_posts(html_path)
    print(f"Found {len(posts)} post(s) with images.")

    if not posts:
        print("Nothing found. Make sure you used 'Save Page As -> Webpage, Complete' while logged in.")
        sys.exit(0)

    # Check which are already in content.ts (match by activity ID in the link)
    content = CONTENT_FILE.read_text(encoding="utf-8")
    existing_ids = set(re.findall(r'activity-(\d+)', content))
    new_posts = [p for p in posts if str(p["activity_id"]) not in existing_ids]

    if not new_posts:
        print("No new posts -- content.ts is already up to date.")
        return

    print(f"\n{len(new_posts)} new post(s) to add:")
    new_entries = []

    for post in new_posts:
        aid     = post["activity_id"]
        date_str = activity_id_to_date(aid)
        print(f"  [{date_str}] {post['title'][:70]}")

        # Copy local image to public/images/blog/
        dest_name = post["img_filename"] + ".jpeg" if "." not in post["img_filename"] else post["img_filename"]
        dest = IMAGES_DIR / dest_name

        if dest.exists():
            print(f"    image already exists: {dest.name}")
        elif post["local_img"] and post["local_img"].exists():
            shutil.copy2(post["local_img"], dest)
            print(f"    image copied: {dest.name}")
        else:
            print(f"    image not found locally -- add manually: {dest_name}")

        new_entries.append(build_ts_entry(aid, post["title"], dest_name, date_str))

    if args.dry_run:
        print("\n-- DRY RUN: would prepend these entries --")
        print("\n".join(new_entries))
        print("\nNOTE: Links will need the correct URL slug filled in (marked XXXX).")
    else:
        patch_content_ts(new_entries)
        print("\nDone.")
        print("NOTE: Review content.ts -- links contain placeholder 'XXXX' slugs.")
        print("      Replace with the actual LinkedIn post URLs.")


if __name__ == "__main__":
    main()
