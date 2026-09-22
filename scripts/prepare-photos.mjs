/**
 * npm run photos
 *
 * Turns the originals in media/source/ into the graded WebP files the site
 * serves, plus a manifest the components read for width/height and srcset.
 *
 *   public/photos/<name>-<width>.webp   gentle grade, for light sections
 *   public/film/<name>-sm|lg.webp       dusk grade, for the hero film + dark bands
 *   public/brand/…                      logo and icons
 *   src/data/photo-manifest.json        sizes of everything above
 *
 * Originals are never modified. To add a photo: drop it in media/source/,
 * add a line to SOURCES, run `npm run photos`.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { FILM, PHOTO, grade } from './lib/grade.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const at = (p) => root + p;

/** rotate: degrees, applied before anything else (two phone shots were taken sideways). */
const SOURCES = [
  { name: 'boom-low-angle', rotate: -90, film: true },
  { name: 'container-lift', film: true },
  { name: 'lime-crane', film: true },
  { name: 'billboard-lift-wide', rotate: -90, film: true },
  { name: 'steel-truss', film: true },
  { name: 'billboard-lift', film: true },
  { name: 'crane-golden-hour', film: true },
  { name: 'popup-container-lift' },
  { name: 'popup-container-lift-wide' },
  { name: 'warehouse-machine-lift' },
  { name: 'plant-lift' },
  { name: 'drilling-site' },
];

const PHOTO_WIDTHS = [480, 960, 1600, 2400];
const FILM_SMALL_EDGE = 1280; // long edge of the -sm film still

async function gradedBuffer(file, rotate, look) {
  let img = sharp(file);
  if (rotate) img = img.rotate(rotate);
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  grade(data, look);
  return { data, info };
}

const toWebp = (data, info, width, quality) =>
  sharp(data, { raw: info })
    .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.55 })
    .webp({ quality, effort: 5, smartSubsample: true });

async function main() {
  await rm(at('public/photos'), { recursive: true, force: true });
  await rm(at('public/film'), { recursive: true, force: true });
  await mkdir(at('public/photos'), { recursive: true });
  await mkdir(at('public/film'), { recursive: true });
  await mkdir(at('public/brand'), { recursive: true });

  const manifest = {};

  for (const src of SOURCES) {
    const file = at(`media/source/${src.name}.jpg`);
    const entry = {};

    // light-section photos
    const photo = await gradedBuffer(file, src.rotate, PHOTO);
    const { width: w, height: h } = photo.info;
    const top = Math.min(w, PHOTO_WIDTHS.at(-1)); // never upscale
    const widths = [...PHOTO_WIDTHS.filter((x) => x < top), top];
    for (const width of widths) {
      await toWebp(photo.data, photo.info, width, 78).toFile(at(`public/photos/${src.name}-${width}.webp`));
    }
    Object.assign(entry, { w, h, widths });

    // dusk-graded stills for the film and dark bands
    if (src.film) {
      const film = await gradedBuffer(file, src.rotate, FILM);
      const long = Math.max(w, h);
      const smW = Math.round((w * Math.min(FILM_SMALL_EDGE, long)) / long);
      await toWebp(film.data, film.info, w, 80).toFile(at(`public/film/${src.name}-lg.webp`));
      await toWebp(film.data, film.info, smW, 74).toFile(at(`public/film/${src.name}-sm.webp`));
      entry.film = true;
    }

    manifest[src.name] = entry;
    console.log(`  ${src.name.padEnd(28)} ${w}×${h}  [${widths.join(', ')}]${src.film ? '  + film' : ''}`);
  }

  // Brand. The old site's logo file is the same artwork as media/logo.png with
  // a transparent background, so it sits on both the dark and light sections.
  const logo = sharp(at('media/brand/logo-transparent.png')).trim({ threshold: 1 });
  const logoInfo = await logo.clone().png().toFile(at('public/brand/logo.png'));
  manifest._logo = { w: logoInfo.width, h: logoInfo.height };
  await sharp(at('media/brand/icon-192.png')).resize(180).png().toFile(at('public/brand/apple-touch-icon.png'));
  await sharp(at('media/brand/icon-192.png')).png().toFile(at('public/brand/icon-192.png'));
  await sharp(at('media/brand/icon-32.png')).png().toFile(at('public/brand/favicon-32.png'));

  // Social share image: a dusk still with the logo on a dark band.
  const og = await sharp(at('public/film/boom-low-angle-lg.webp'))
    .resize(1200, 630, { fit: 'cover', position: 'right' })
    .toBuffer();
  const band = Buffer.from(
    `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0B0D09" stop-opacity=".92"/><stop offset=".55" stop-color="#0B0D09" stop-opacity=".35"/><stop offset="1" stop-color="#0B0D09" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`
  );
  const ogLogo = await sharp(at('public/brand/logo.png')).resize({ height: 300 }).toBuffer();
  await sharp(og)
    .composite([{ input: band }, { input: ogLogo, left: 80, top: 165 }])
    .jpeg({ quality: 84 })
    .toFile(at('public/brand/og-image.jpg'));

  await writeFile(at('src/data/photo-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('\n  manifest → src/data/photo-manifest.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
