import { SITE_CONFIG } from '../src/config/domain.js';
import fs from 'fs';

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/download-java/', priority: '0.9', changefreq: 'monthly' },
  { path: '/mcpe/', priority: '0.9', changefreq: 'monthly' },
  { path: '/how-to-install-jennymod/', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions/', priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer/', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/404/', priority: '0.1', changefreq: 'yearly' }
];

const currentDate = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${SITE_CONFIG.url}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemapContent);
console.log('Sitemap generated successfully!');