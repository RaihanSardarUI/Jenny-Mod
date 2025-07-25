#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

console.log('🧪 Testing Domain Centralization...\n');

// Read current domain config
const configPath = 'src/config/domain.js';
const originalConfig = fs.readFileSync(configPath, 'utf8');

// Extract current domain
const currentDomainMatch = originalConfig.match(/domain: '([^']*)'/) ;
const currentDomain = currentDomainMatch ? currentDomainMatch[1] : 'unknown';

console.log(`📍 Current domain: ${currentDomain}`);

// Test domain
const testDomain = 'test-jennymod.com';
console.log(`🔄 Temporarily changing to: ${testDomain}`);

try {
  // Update domain config
  let testConfig = originalConfig.replace(
    /domain: '[^']*'/,
    `domain: '${testDomain}'`
  );
  testConfig = testConfig.replace(
    /url: '[^']*'/,
    `url: 'https://${testDomain}'`
  );
  
  fs.writeFileSync(configPath, testConfig);
  
  // Regenerate SEO files
  console.log('🔄 Regenerating SEO files...');
  execSync('npm run generate:seo', { stdio: 'pipe' });
  
  // Check if files were updated
  const robotsContent = fs.readFileSync('public/robots.txt', 'utf8');
  const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
  
  const robotsHasTestDomain = robotsContent.includes(testDomain);
  const sitemapHasTestDomain = sitemapContent.includes(testDomain);
  
  console.log(`✅ robots.txt updated: ${robotsHasTestDomain ? '✅' : '❌'}`);
  console.log(`✅ sitemap.xml updated: ${sitemapHasTestDomain ? '✅' : '❌'}`);
  
  if (robotsHasTestDomain && sitemapHasTestDomain) {
    console.log('🎉 Domain centralization test PASSED!');
  } else {
    console.log('❌ Domain centralization test FAILED!');
  }
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
} finally {
  // Restore original config
  console.log(`🔄 Restoring original domain: ${currentDomain}`);
  fs.writeFileSync(configPath, originalConfig);
  
  // Regenerate with original domain
  execSync('npm run generate:seo', { stdio: 'pipe' });
  console.log('✅ Original configuration restored');
}

console.log('\n🧪 Domain centralization test complete!');