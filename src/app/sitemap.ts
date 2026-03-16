/** @format */

import { MetadataRoute } from 'next';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.luxestate.online';

interface ListingSitemapData {
  slug: string;
  updated_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/listings`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/register`, lastModified: new Date(), priority: 0.5 },
  ];

  // 2. Dynamic listing pages
  let listingRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await axios.get<ListingSitemapData[]>(
      `${API_URL}/listings/sitemap`,
    );
    listingRoutes = response.data.map((listing) => ({
      url: `${BASE_URL}/listings/${listing.slug}`,
      lastModified: new Date(listing.updated_at),
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch listings for sitemap:', error);
  }

  return [...staticRoutes, ...listingRoutes];
}
