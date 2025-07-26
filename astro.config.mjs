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
    inlineStylesheets: 'never', // Keep CSS in separate files
    assets: '_astro'
  },
  vite: {
    build: {
      cssCodeSplit: false, // Bundle CSS to reduce requests
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Bundle node_modules into vendor chunk
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          assetFileNames: '_astro/[name].[hash][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js'
        }
      },
      target: 'es2020',
      minify: 'esbuild' // Use esbuild instead of terser for faster builds
    }
  }
});