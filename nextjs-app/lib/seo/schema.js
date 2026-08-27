import { siteConfig } from './siteConfig';

/**
 * Generate comprehensive JSON-LD Structured Data for LocalBusiness & ProfessionalService
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService', 'Organization'],
        '@id': `${siteConfig.url}/#agency`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.alternateName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        image: siteConfig.ogImage,
        description: siteConfig.description,
        telephone: siteConfig.telephone,
        email: siteConfig.email,
        priceRange: siteConfig.priceRange,
        currenciesAccepted: 'INR, USD',
        paymentAccepted: 'UPI, Net Banking, Credit Card, Cash',
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.location.streetAddress,
          addressLocality: siteConfig.location.addressLocality,
          addressRegion: siteConfig.location.addressRegion,
          postalCode: siteConfig.location.postalCode,
          addressCountry: siteConfig.location.addressCountry
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.location.geo.latitude,
          longitude: siteConfig.location.geo.longitude
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Mahwa'
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Dausa'
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Jaipur'
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Rajasthan'
          },
          {
            '@type': 'Country',
            name: 'India'
          }
        ],
        sameAs: Object.values(siteConfig.socialLinks),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'OrbitX Digital Marketing & Growth Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Social Media Marketing & Management',
                description: 'Full-funnel social media strategy, community acceleration, and content curation for brands.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Cinematic Video Editing Services',
                description: 'Viral short-form reels, high-retention TikTok/YouTube Shorts, and corporate video production.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Targeted PPC & Social Ad Campaigns',
                description: 'High-converting performance marketing across Meta, Google Ads, and YouTube.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Search Engine Optimization (SEO)',
                description: 'Local SEO in Mahwa, Rajasthan and global keyword dominance to maximize organic search inbound leads.'
              }
            }
          ]
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '20:00'
          }
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '48',
          bestRating: '5',
          worstRating: '1'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#agency`
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why is OrbitX Marketing the best social media marketing agency in Mahwa, Rajasthan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OrbitX Marketing delivers proven, data-backed social media strategies, viral video editing, and hyper-targeted advertising that consistently generates an average 200% ROI for businesses in Mahwa and worldwide.'
            }
          },
          {
            '@type': 'Question',
            name: 'What video editing services does OrbitX Marketing provide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide cinematic short-form video editing for Instagram Reels and YouTube Shorts, long-form YouTube documentary edits, commercial motion graphics, and audio mastering.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Local SEO help businesses in Mahwa (321608)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Local SEO optimizes your Google Business Profile and local search visibility so your business ranks #1 when customers in Mahwa, Dausa, and Rajasthan search for your products or services.'
            }
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${siteConfig.url}#services`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Contact',
            item: `${siteConfig.url}#contact`
          }
        ]
      }
    ]
  };
}
