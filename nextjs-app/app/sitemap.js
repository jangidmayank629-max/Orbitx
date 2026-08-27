import { siteConfig } from '../lib/seo/siteConfig';

export default function sitemap() {
  const currentDate = new Date().toISOString();

  return [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${siteConfig.url}#services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}#work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}#arsenal`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${siteConfig.url}#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ];
}
