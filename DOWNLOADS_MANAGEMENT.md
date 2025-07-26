# Downloads Management System

## 📦 **Centralized Downloads Configuration**

All download links, sizes, and release dates are now managed from a single configuration file: `src/config/downloads.js`

### 🏗️ **File Structure**

```javascript
// src/config/downloads.js
export const DOWNLOADS_CONFIG = {
  fapcraft: [
    {
      id: 'unique-id',
      version: 'Display Name',
      size: 'File Size',
      uploadDate: 'Release Date',
      downloadUrl: 'GitHub Release URL',
      isRecommended: true/false,
      colorTheme: 'color-name'
    }
  ],
  forge: [
    // Same structure as fapcraft
  ]
};
```

### 🎯 **How to Add New Downloads**

#### **1. Edit the Configuration File**
Open `src/config/downloads.js` and add your new download to the appropriate array:

```javascript
// For Fapcraft versions
fapcraft: [
  {
    id: 'jenny-mod-fapcraft-1-2',
    version: 'Fapcraft v1.2 (Latest)',
    size: '44.1 MB',
    uploadDate: '15th May 2025',
    downloadUrl: 'https://github.com/ZellRaihan/Jenny-Mod/releases/download/publish/Fapcraft.1.12.2.v1.2.jar',
    isRecommended: true,
    colorTheme: 'green'
  }
  // ... existing downloads
]

// For Forge versions
forge: [
  {
    id: 'jenny-mod-forge-1-3',
    version: 'Jenny Mod v1.3 (Latest Forge)',
    size: '43.2 MB',
    uploadDate: '20th May 2025',
    downloadUrl: 'https://github.com/ZellRaihan/Jenny-Mod/releases/download/publish/Jenny-Mod-Forge-1.12.2-v1.3.jar',
    isRecommended: true,
    colorTheme: 'yellow'
  }
  // ... existing downloads
]
```

#### **2. Available Color Themes**
- `green` - For latest/recommended downloads
- `blue` - For stable versions
- `yellow` - For forge versions
- `orange` - For older versions
- `purple` - For special versions
- `lime` - For beta versions
- `pink` - For experimental versions
- `cyan` - For archived versions
- `indigo` - For development versions
- `teal` - For community versions
- `emerald` - For enhanced versions
- `amber` - For legacy versions

### 🛠️ **Management Commands**

#### **Validate Download URLs**
```bash
npm run downloads:validate
```
Lists all download URLs for manual verification.

#### **Generate Summary Report**
```bash
npm run downloads:summary
```
Shows count of Fapcraft and Forge downloads.

#### **Add New Download (Helper)**
```bash
npm run downloads:add fapcraft
# or
npm run downloads:add forge
```
Provides guidance for adding new downloads.

### 📊 **Current Downloads Structure**

#### **Fapcraft Downloads** (Latest & Best)
- ✅ **Fapcraft v1.1** (Latest) - 43.7 MB - Recommended
- ✅ **Fapcraft v1.0** - 42.3 MB

#### **Forge Downloads** (All Versions)
- ✅ **Jenny Mod v1.2** (Latest Forge) - 42.8 MB - Recommended
- ✅ **Jenny Mod v1.9.0** - 42.57 MB
- ✅ **Jenny Mod v1.8.0** - 42.15 MB
- ✅ **Jenny Mod v1.7.5** - 42.14 MB
- ✅ **Jenny Mod v1.7.4** - 42.14 MB
- ✅ **Jenny Mod v1.7.3** - 42.14 MB
- ✅ **Jenny Mod v1.6.9** - 81.31 MB
- ✅ **Jenny Mod v1.6.8** - 94.75 MB
- ✅ **Jenny Mod v1.6.2** - 94.2 MB
- ✅ **Jenny Mod v1.5.2** - 93.8 MB
- ✅ **Jenny Mod v1.4.0** - 92.5 MB

### 🔧 **Helper Functions Available**

```javascript
import { 
  getAllDownloads,
  getRecommendedDownloads,
  getLatestDownloads,
  getDownloadById
} from '../config/downloads.js';

// Get all downloads organized by type
const { fapcraft, forge } = getAllDownloads();

// Get only recommended downloads
const recommended = getRecommendedDownloads();

// Get latest 3 downloads
const latest = getLatestDownloads(3);

// Get specific download by ID
const download = getDownloadById('jenny-mod-fapcraft-1-1');
```

### 🎯 **Benefits of Centralized Management**

1. **Single Source of Truth**: All download data in one place
2. **Easy Updates**: Change URLs, sizes, dates in one file
3. **Consistency**: Same data structure across all pages
4. **Maintainability**: Easy to add/remove downloads
5. **Validation**: Built-in tools to check URLs
6. **Flexibility**: Helper functions for different use cases

### 📝 **Best Practices**

1. **Always update both URL and metadata** when adding downloads
2. **Use descriptive IDs** (e.g., `jenny-mod-fapcraft-1-2`)
3. **Mark latest versions as recommended** (`isRecommended: true`)
4. **Use consistent date format** (e.g., "15th May 2025")
5. **Choose appropriate color themes** for visual organization
6. **Test URLs before adding** to ensure they work
7. **Keep downloads ordered** (latest first)

### 🚀 **Automatic Integration**

The download page (`/download-java`) automatically uses this configuration:
- ✅ No need to edit the page file
- ✅ Changes reflect immediately
- ✅ Maintains consistent styling
- ✅ Preserves all functionality

**Just edit `src/config/downloads.js` and your changes will appear on the website!** 🎉