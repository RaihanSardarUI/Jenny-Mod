#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const DOWNLOADS_CONFIG_PATH = 'src/config/downloads.js';

// Helper function to add a new download
function addDownload(type, downloadData) {
  const configContent = fs.readFileSync(DOWNLOADS_CONFIG_PATH, 'utf8');
  
  // Parse the current config (simplified approach)
  console.log(`Adding new ${type} download: ${downloadData.version}`);
  console.log('Please manually add the following to src/config/downloads.js:');
  console.log('\n' + JSON.stringify(downloadData, null, 2));
  console.log('\nAdd this to the appropriate array (fapcraft or forge) in the downloads config.');
}

// Helper function to validate download URLs
async function validateDownloadUrls() {
  console.log('🔍 Validating download URLs...\n');
  
  const configContent = fs.readFileSync(DOWNLOADS_CONFIG_PATH, 'utf8');
  const urlRegex = /downloadUrl: '([^']+)'/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(configContent)) !== null) {
    urls.push(match[1]);
  }
  
  console.log(`Found ${urls.length} download URLs to validate:`);
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  console.log('\n✅ URL validation complete. Please manually check these URLs are accessible.');
}

// Helper function to generate download summary
async function generateDownloadSummary() {
  console.log('📊 Download Summary Report\n');
  
  try {
    // Import the downloads config directly
    const { getAllDownloads } = await import('../src/config/downloads.js');
    const downloads = getAllDownloads();
    
    const mcpeCount = downloads.mcpe ? downloads.mcpe.length : 0;
    const fapcraftCount = downloads.fapcraft ? downloads.fapcraft.length : 0;
    const forgeCount = downloads.forge ? downloads.forge.length : 0;
    
    console.log(`📱 MCPE Downloads: ${mcpeCount}`);
    console.log(`📦 Fapcraft Downloads: ${fapcraftCount}`);
    console.log(`🔨 Forge Downloads: ${forgeCount}`);
    console.log(`📊 Total Downloads: ${mcpeCount + fapcraftCount + forgeCount}`);
    
    console.log('\n✅ Summary generated successfully!');
  } catch (error) {
    console.error('❌ Error reading downloads config:', error.message);
  }
}

// Main CLI interface
const command = process.argv[2];

(async () => {
switch (command) {
  case 'validate':
    validateDownloadUrls();
    break;
  case 'summary':
    await generateDownloadSummary();
    break;
  case 'add':
    const type = process.argv[3]; // 'mcpe', 'fapcraft' or 'forge'
    if (!type || !['mcpe', 'fapcraft', 'forge'].includes(type)) {
      console.log('Usage: node scripts/manage-downloads.js add <mcpe|fapcraft|forge>');
      console.log('Then follow the prompts to add download details.');
      process.exit(1);
    }
    console.log(`Adding new ${type} download...`);
    console.log('Please edit src/config/downloads.js manually to add new downloads.');
    break;
  default:
    console.log('📦 Download Management Tool\n');
    console.log('Available commands:');
    console.log('  validate  - Validate all download URLs');
    console.log('  summary   - Generate download summary report');
    console.log('  add       - Add new download (manual process)');
    console.log('\nUsage: node scripts/manage-downloads.js <command>');
}
})();