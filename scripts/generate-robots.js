import { SITE_CONFIG } from '../src/config/domain.js';
import fs from 'fs';

const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_CONFIG.url}/sitemap.xml

# Crawl-delay for better server performance
Crawl-delay: 1

# Block access to admin areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/
Disallow: /cgi-bin/
Disallow: /?s=
Disallow: /author/

# Allow all important pages
Allow: /
Allow: /how-to-install-jennymod
Allow: /download-java
Allow: /mcpe
Allow: /privacy-policy
Allow: /terms-and-conditions
Allow: /disclaimer
Allow: /cookie-policy`;

fs.writeFileSync('public/robots.txt', robotsContent);
console.log('Robots.txt generated successfully!');