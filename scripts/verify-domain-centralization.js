#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

console.log('🔍 Verifying domain centralization...\n');

// Check for hardcoded domain references
const hardcodedDomainPatterns = [
    /jennymod\.pro(?!\/)/g,
    /jennymod\.dev(?!\/)/g,
    /https:\/\/jennymod\.(pro|dev)/g,
    /www\.jennymod\.(pro|dev)/g
];

const sourceFiles = await glob('src/**/*.{astro,js,ts,jsx,tsx}');
let issues = [];

for (const file of sourceFiles) {
    // Skip the domain config file itself
    if (file.includes('domain.js')) continue;

    const content = fs.readFileSync(file, 'utf8');

    for (const pattern of hardcodedDomainPatterns) {
        const matches = content.match(pattern);
        if (matches) {
            issues.push({
                file,
                matches: matches,
                pattern: pattern.toString()
            });
        }
    }
}

// Check if files that should import domain config actually do
const filesThatShouldImportDomain = sourceFiles.filter(file => {
    // Skip the domain config file itself
    if (file.includes('domain.js')) return false;

    const content = fs.readFileSync(file, 'utf8');
    // Check if file contains any reference to SITE_CONFIG but doesn't import it
    return content.includes('SITE_CONFIG') && !content.includes("from '../config/domain.js'") && !content.includes("from './config/domain.js'");
});

console.log('📊 Verification Results:\n');

if (issues.length === 0) {
    console.log('✅ No hardcoded domain references found!');
} else {
    console.log('❌ Found hardcoded domain references:');
    issues.forEach(issue => {
        console.log(`   File: ${issue.file}`);
        console.log(`   Matches: ${issue.matches.join(', ')}`);
        console.log('');
    });
}

if (filesThatShouldImportDomain.length === 0) {
    console.log('✅ All files using SITE_CONFIG properly import domain config!');
} else {
    console.log('❌ Files using SITE_CONFIG without importing domain config:');
    filesThatShouldImportDomain.forEach(file => {
        console.log(`   ${file}`);
    });
}

// Check if generated files are up to date
const generatedFiles = ['public/sitemap.xml', 'public/robots.txt'];
let outdatedFiles = [];

for (const file of generatedFiles) {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('jennymod.dev') || !content.includes('jennymod.pro')) {
            outdatedFiles.push(file);
        }
    }
}

if (outdatedFiles.length === 0) {
    console.log('✅ Generated files are up to date!');
} else {
    console.log('❌ Generated files need updating:');
    outdatedFiles.forEach(file => {
        console.log(`   ${file}`);
    });
    console.log('\n💡 Run: npm run generate:seo');
}

console.log('\n🎉 Domain centralization verification complete!');

if (issues.length === 0 && filesThatShouldImportDomain.length === 0 && outdatedFiles.length === 0) {
    console.log('✅ All domain references are properly centralized!');
    process.exit(0);
} else {
    console.log('❌ Some issues found. Please review and fix the above items.');
    process.exit(1);
}