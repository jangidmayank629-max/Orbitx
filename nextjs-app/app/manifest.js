import { siteConfig } from '../lib/seo/siteConfig';

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: 'OrbitX',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0C',
    theme_color: '#d0bcff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
