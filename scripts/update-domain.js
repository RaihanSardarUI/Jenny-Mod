#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/update-domain.js <new-domain>');
  console.log('Example: node scripts/update-domain.js mynewdomain.com');
  process.exit(1);
}

const newDomain = args[0];
const newUrl = `https://${newDomain}`;

// Update domain config
const configPath = 'src/config/domain.js';
let configContent = fs.readFileSync(configPath, 'utf8');

configContent = configContent.replace(
  /domain: '[^']*'/,
  `domain: '${newDomain}'`
);

configContent = configContent.replace(
  /url: '[^']*'/,
  `url: '${newUrl}'`
);

fs.writeFileSync(configPath, configContent);

console.log(`✅ Updated domain config to: ${newDomain}`);

// Regenerate robots.txt and sitemap.xml
try {
  const { execSync } = await import('child_process');
  execSync('node scripts/generate-robots.js', { stdio: 'inherit' });
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
  console.log('✅ Regenerated robots.txt and sitemap.xml');
} catch (error) {
  console.error('❌ Error regenerating files:', error.message);
}

console.log('\n🎉 Domain update complete!');
console.log(`New domain: ${newDomain}`);
console.log(`New URL: ${newUrl}`);