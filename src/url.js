/**
 * Every link and file path goes through here, so the site works wherever it
 * is served from: '/' on www.1stcrane.co.za, '/1stCrane/' on GitHub Pages.
 * The base comes from the build (BASE_PATH, see vite.config.js).
 *
 *   url('/fleet/')  →  '/fleet/'  or  '/1stCrane/fleet/'
 */
const BASE = import.meta.env.BASE_URL; // always ends in '/'

export const url = (path) => BASE + path.replace(/^\//, '');
