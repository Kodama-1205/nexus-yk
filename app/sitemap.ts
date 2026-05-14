import type { MetadataRoute } from 'next';

import { getAllApps } from '@/lib/apps-data';
import { getAllDifyItems } from '@/lib/dify-data';

const BASE_URL = 'https://nexus-yk.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [apps, difyItems] = await Promise.all([getAllApps(), getAllDifyItems()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/apps`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/dify`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/legal/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/legal/privacy`, priority: 0.3, changeFrequency: 'yearly' },
  ];

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${BASE_URL}/apps/${app.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  const difyRoutes: MetadataRoute.Sitemap = difyItems.map((item) => ({
    url: `${BASE_URL}/dify/${item.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...appRoutes, ...difyRoutes];
}
