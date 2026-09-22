import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* One HTML entry per page. The folder names match the old WordPress URLs
   (/aboutus/, /services/, /contact-us/ …) so existing Google rankings and
   links keep working. */
const pages = ['aboutus', 'services', 'fleet', 'for-sale', 'gallery', 'contact-us'];

const SITE_URL = 'https://www.1stcrane.co.za';

/** Head tags every page shares, so each HTML file only holds its own title and description. */
function sharedHead() {
  return {
    name: 'shared-head',
    transformIndexHtml() {
      const link = (attrs) => ({ tag: 'link', attrs, injectTo: 'head' });
      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' });
      return [
        // mark JS as running before first paint, so reveal-on-scroll never flashes
        { tag: 'script', children: "document.documentElement.classList.add('js')", injectTo: 'head-prepend' },
        meta({ name: 'theme-color', content: '#0B0D09' }),
        meta({ property: 'og:site_name', content: '1st Crane Mining & Transport' }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:locale', content: 'en_ZA' }),
        meta({ property: 'og:image', content: `${SITE_URL}/brand/og-image.jpg` }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        link({ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/brand/favicon-32.png' }),
        link({ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/brand/icon-192.png' }),
        link({ rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' }),
        link({ rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
        link({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }),
        link({
          rel: 'stylesheet',
          // italic is only downloaded where it is used (the hero's accent word)
          href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,75..125,300..800;1,75..125,300..800&family=JetBrains+Mono:wght@400;500&display=swap',
        }),
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), sharedHead()],
  appType: 'mpa',
  base: '/',
  build: {
    assetsInlineLimit: 0, // never inline photos or film stills
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(pages.map((p) => [p, resolve(__dirname, p, 'index.html')])),
      },
    },
  },
});
