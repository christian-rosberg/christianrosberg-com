// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public origin of the site. Override with SITE_URL when moving to the custom
// domain (e.g. SITE_URL=https://christianrosberg.com), or edit the default.
const site = process.env.SITE_URL ?? 'https://christianrosberg.com';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    // The whole stylesheet is small: inline it to save a render-blocking request.
    inlineStylesheets: 'always',
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
});
