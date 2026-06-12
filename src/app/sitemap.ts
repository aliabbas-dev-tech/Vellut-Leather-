import { MetadataRoute } from 'next';
import { supabase } from '@/utils/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.shop';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // ── Primary category pages — highest priority for Sitelinks ──────────
    {
      url: `${BASE_URL}/shop-all`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/weekenders`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/duffles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // ── Supporting content pages ──────────────────────────────────────────
    {
      url: `${BASE_URL}/gift-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shipping-global`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // ── Legal pages ───────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/returns`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic Product Routes
  const { data: products } = await supabase.from('products').select('id, created_at');
  const productRoutes = (products || []).map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Category Routes
  const { data: collections } = await supabase.from('collections').select('name');
  const categoryRoutes = (collections || []).map((collection) => ({
    url: `${BASE_URL}/${collection.name.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
