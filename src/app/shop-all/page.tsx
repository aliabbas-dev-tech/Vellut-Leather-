import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

export const metadata: Metadata = {
  title: 'Shop All Handcrafted Leather Bags | Weekenders & Duffel Bags',
  description:
    'Browse Vellut Leather\'s full collection — premium leather weekender bags, luxury leather duffel bags, and bespoke handcrafted travel goods. Made to order. Free global shipping.',
  alternates: { canonical: '/shop-all' },
  openGraph: {
    title: 'Shop All Handcrafted Leather Bags | Weekenders & Duffel Bags — Vellut Leather',
    description:
      'Explore our complete collection of made-to-order, full-grain leather travel bags. Premium weekenders, luxury duffels, bespoke luggage.',
    url: '/shop-all',
    type: 'website',
  },
};

// ── BreadcrumbList JSON-LD ──────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shop All Leather Bags',
      item: `${BASE_URL}/shop-all`,
    },
  ],
};

// ── CollectionPage JSON-LD ──────────────────────────────────────────────────
const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE_URL}/shop-all#webpage`,
  name: 'Shop All Handcrafted Leather Bags — Weekenders & Duffel Bags',
  description:
    'Browse the full Vellut Leather collection of handcrafted, made-to-order premium leather travel bags, luxury duffel bags, and bespoke weekenders.',
  url: `${BASE_URL}/shop-all`,
  isPartOf: { '@id': `${BASE_URL}/#website` },
  breadcrumb: { '@id': `${BASE_URL}/shop-all#breadcrumb` },
  hasPart: [
    {
      '@type': 'CollectionPage',
      name: 'Premium Leather Weekender Bags',
      url: `${BASE_URL}/weekenders`,
    },
    {
      '@type': 'CollectionPage',
      name: 'Luxury Leather Duffel Bags',
      url: `${BASE_URL}/duffles`,
    },
  ],
};

export default function ShopAllPage() {
  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* JSON-LD: CollectionPage with hasPart sub-categories */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <div className="pt-32">
        {/* ── Visible HTML Breadcrumb ───────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="px-6 md:px-margin-desktop mb-6"
        >
          <ol className="flex items-center gap-2 font-label-sm text-xs text-secondary uppercase tracking-widest list-none m-0 p-0" role="list">
            <li>
              <a href="/" className="hover:text-primary transition-colors">Home</a>
            </li>
            <li aria-hidden="true">
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </li>
            <li aria-current="page">Shop All Leather Bags</li>
          </ol>
        </nav>

        <ProductGrid />
      </div>
    </>
  );
}
