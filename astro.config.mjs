import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { SITE_CONFIG } from './src/config/domain.js';

export default defineConfig({
  site: SITE_CONFIG.url,
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return '_astro/[name].[hash][extname]';
            }
            return '_astro/[name].[hash][extname]';
          }
        }
      }
    }
  }
});