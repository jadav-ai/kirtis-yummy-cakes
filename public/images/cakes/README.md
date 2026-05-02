# Cake gallery assets

Images in subfolders (`sculpted/`, `theme-kids/`, etc.) power the cake showcase thumbnails. Hero files are named `01-hero.*`.

## Adding posts from Instagram

Instagram blocks anonymous bulk scraping. To add real IG photos:

1. From [@kirtis_yummy_cake_class](https://www.instagram.com/kirtis_yummy_cake_class/), save the post images you own (or use Meta’s export).
2. Drop **2–4** files into the matching folder here (e.g. `theme-kids/`).
3. Update the `images` array in `components/sections/cake-showcase.tsx` with the new paths and `alt` text.

Optional CLI (requires Python): `pip install instaloader` then `instaloader kirtis_yummy_cake_class --fast-update` and copy selected files into these folders.
