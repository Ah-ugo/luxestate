/** @format */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://luxestate.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
