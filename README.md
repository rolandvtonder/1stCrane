# 1st Crane Mining & Transport — website

Vite + React 18. Seven pages on the old site's addresses (`/`, `/aboutus/`, `/services/`, `/fleet/`, `/for-sale/`, `/gallery/`, `/contact-us/`). The homepage opens with a full-screen hero over a slow, drifting loop of crane photos; the rest follows a pale, numbered-section layout.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

## Put it online

**GitHub Pages (preview):** every push to `main` builds the site and publishes it to https://rolandvtonder.github.io/1stCrane/ via `.github/workflows/deploy.yml`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**. Pages serves the site from `/1stCrane/`, so the workflow builds with `BASE_PATH=/1stCrane/`. All links go through `src/url.js`, which adds it.

**Your own domain:** run `npm run build` (base `/`) and upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, or cPanel `public_html`). Serve it over HTTPS at `www.1stcrane.co.za`.

Old WordPress addresses that no longer exist redirect in the browser already. If your host supports server redirects, add these as 301s as well — it's better for Google:

| Old | New |
| --- | --- |
| `/liebherr/` | `/fleet/#liebherr` |
| `/grove/` | `/fleet/#grove` |
| `/mobile-cranes/` | `/fleet/#mobile-cranes` |
| `/crane-booking/` | `/contact-us/` |
| `/plant-hire-blogs/` | `/` |

## Change the content

Everything editable lives in `src/data/`:

- `site.js`: phone, fax, email, address, Facebook link, the four homepage stats
- `hero.js`: the homepage hero: badge, headline, intro, the photos in the loop, the "Lifting for" strip
- `services.js`: service cards, the full list of 17, FAQs, industries
- `fleet.js`: crane types and the Liebherr / Grove text
- `forSale.js`: cranes for sale. Add a listing by copying the Grove entry
- `photos.js`: captions, alt text and gallery order

## Contact form

The homepage quote box ("What are you lifting?") opens this form with the visitor's text already in the message. Until it has a key, the form opens the visitor's email app with the enquiry filled in. To have enquiries arrive in the inbox directly, create a free access key at [web3forms.com](https://web3forms.com) for `info@1stcranehire.co.za` and paste it into `form.accessKey` in `src/data/site.js`.

## Photos

Originals live in `media/source/` and are never changed. `npm run photos` grades and resizes them into `public/photos/` and `public/film/`. To add a photo, put the JPG in `media/source/`, add a line to `SOURCES` in `scripts/prepare-photos.mjs`, run `npm run photos`, then add a caption in `src/data/photos.js`.

## Swap in real footage

The hero currently loops graded photos. With a landscape clip of a crane at work (8–15 seconds, 1080p, muted, ideally under 8 MB), save it as `public/hero.mp4` and set `video: '/hero.mp4'` in `src/data/hero.js`. It plays muted on a loop, pauses when scrolled out of view, and shows a still frame to visitors who have reduced motion turned on.
