// Domain configuration
// Update this file to change the domain across the entire site
export const SITE_CONFIG = {
  domain: 'jennymod.pro',
  url: 'https://jennymod.pro',
  name: 'Jenny Mod',
  description: 'Download Jenny Mod for Your Minecraft Java and MCPE Edition. Here Also You Can Download Jenny Mod Fapcraft Version. Visit Now!'
};

// Helper function to get full URL
export function getFullUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

// Helper function to get domain only
export function getDomain() {
  return SITE_CONFIG.domain;
}

// Helper function to get site URL
export function getSiteUrl() {
  return SITE_CONFIG.url;
}