import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jxf.co',
      lastModified: new Date(),
    },
  ]
}