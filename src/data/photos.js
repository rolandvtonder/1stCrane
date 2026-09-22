import manifest from './photo-manifest.json';

/**
 * The company's own job photos (2015). Captions describe the job, never the
 * machine model — the photos don't show which crane is which.
 * Sizes come from photo-manifest.json, written by `npm run photos`.
 */
const META = {
  'billboard-lift-wide': {
    alt: 'Yellow 1st Crane mobile crane erecting a large roadside billboard',
    caption: 'Roadside billboard installation',
  },
  'container-lift': {
    alt: 'Yellow 1st Crane & Plant mobile crane lifting a shipping container off a trailer on orange slings',
    caption: 'Container offloading',
  },
  'steel-truss': {
    alt: 'Mobile crane lowering a steel roof truss onto a structure, riggers standing on top',
    caption: 'Steel structure erection',
  },
  'lime-crane': {
    alt: 'Lime-green 1st Crane mobile crane with its boom fully extended on a site yard',
    caption: 'Our lime-green mobile crane on site',
  },
  'boom-low-angle': {
    alt: 'Low-angle view of a 1st Crane & Plant boom rising over a steel billboard frame',
    caption: 'Billboard frame erection',
  },
  'popup-container-lift': {
    alt: 'Lime-green 1st Crane & Plant crane lifting a branded pop-up container shop',
    caption: 'Pop-up container placement',
  },
  'popup-container-lift-wide': {
    alt: 'Lime-green 1st Crane & Plant crane lifting a branded pop-up container shop',
    caption: 'Pop-up container placement',
  },
  'warehouse-machine-lift': {
    alt: 'Lime-green 1st Crane & Plant crane truck lifting machinery at a warehouse loading bay',
    caption: 'Machine lift at a warehouse',
  },
  'plant-lift': {
    alt: 'Mobile crane lifting equipment above an industrial plant',
    caption: 'Industrial plant lift',
  },
  'drilling-site': {
    alt: 'Lime-green crane working beside a drilling rig on site',
    caption: 'Drilling site support',
  },
  'crane-golden-hour': {
    alt: 'Yellow 1st Crane & Plant mobile crane in the late afternoon sun',
    caption: 'Mobile crane at golden hour',
  },
  'billboard-lift': {
    alt: 'Yellow mobile crane working beside a large billboard structure',
    caption: 'Billboard structure lift',
  },
};

/** Everything a <Photo> needs: largest src, srcset, intrinsic size, alt and caption. */
export function photo(name) {
  const m = manifest[name];
  if (!m) throw new Error(`Unknown photo "${name}" — run npm run photos`);
  return {
    name,
    ...META[name],
    w: m.w,
    h: m.h,
    src: `/photos/${name}-${m.widths.at(-1)}.webp`,
    srcSet: m.widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(', '),
    film: m.film ? { sm: `/film/${name}-sm.webp`, lg: `/film/${name}-lg.webp` } : null,
  };
}

export const LOGO = { src: '/brand/logo.png', ...manifest._logo };

/** Gallery order: strongest frames first, alternating shapes so the grid breathes. */
export const GALLERY = [
  'billboard-lift-wide',
  'container-lift',
  'steel-truss',
  'popup-container-lift',
  'lime-crane',
  'warehouse-machine-lift',
  'boom-low-angle',
  'plant-lift',
  'crane-golden-hour',
  'drilling-site',
  'billboard-lift',
];
