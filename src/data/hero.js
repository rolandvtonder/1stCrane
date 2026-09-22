/**
 * The homepage hero — Lagoon layout, 1st Crane content.
 *
 * Behind it, the dusk-graded photos drift and dissolve into each other like a
 * slow video. `focus` is the point of each photo kept in frame (x% y%): on a
 * wide screen the y value picks the band of a tall photo, on a phone the x
 * value picks the slice of a wide one. `drift` is where the slow push ends up.
 *
 * With real footage: put the clip in public/ (e.g. public/hero.mp4) and set
 * `video: '/hero.mp4'` — it replaces the photo loop. (Paths are relative to
 * the site root; the base path is added for you.)
 */
export const HERO = {
  badge: ['Cranes on call 24/7', ' · Southern Africa'], // second part drops on the narrowest phones
  title: { lines: ['Crane hire & rigging,', 'handled with'], accent: 'precision' },
  sub: 'Owner-run crane hire in Centurion since 2012, with certified operators and riggers for construction, mining and industry.',
  placeholder: 'What are you lifting?',

  video: null,
  hold: 7000, // ms each photo holds before dissolving into the next
  // Copy is centred here, so nothing hides the edges of the frame: photos with
  // a third-party billboard in view (billboard-lift, billboard-lift-wide,
  // boom-low-angle) are left out of the loop.
  shots: [
    { name: 'lime-crane', focus: '60% 30%', drift: ['1.5%', '-1%'] },
    { name: 'container-lift', focus: '42% 44%', drift: ['-1%', '1%'] },
    { name: 'steel-truss', focus: '42% 44%', drift: ['1%', '1%'] },
  ],

  strip: {
    label: 'Lifting for',
    items: ['Construction', 'Mining', 'Civil', 'Petro-chemical', 'Ports', 'Wind farms'],
  },
};
