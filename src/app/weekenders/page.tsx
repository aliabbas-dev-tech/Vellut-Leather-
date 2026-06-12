import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

export const metadata: Metadata = {
  title: 'Premium Leather Weekender Bags | Handcrafted Travel Bags',
  description:
    'Discover Vellut Leather\'s bespoke weekender bags — handcrafted from full-grain leather, made to order. Lifetime guarantee and free global shipping. Shop luxury leather weekenders.',
  alternates: { canonical: '/weekenders' },
  openGraph: {
    title: 'Premium Leather Weekender Bags | Handcrafted Travel Bags — Vellut Leather',
    description:
      'Bespoke, handcrafted leather weekender bags made to order from full-grain leather. Free global shipping. Lifetime guarantee.',
    url: '/weekenders',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Premium Leather Weekender Bags',
      item: `${BASE_URL}/weekenders`,
    },
  ],
};

// ── CollectionPage JSON-LD ──────────────────────────────────────────────────
const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE_URL}/weekenders#webpage`,
  name: 'Premium Leather Weekender Bags',
  description:
    'Handcrafted, made-to-order premium leather weekender bags from Vellut Leather. Full-grain leather, free global shipping, lifetime guarantee.',
  url: `${BASE_URL}/weekenders`,
  isPartOf: { '@id': `${BASE_URL}/#website` },
  breadcrumb: { '@id': `${BASE_URL}/weekenders#breadcrumb` },
};

export default function WeekendersPage() {
  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* JSON-LD: CollectionPage */}
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
            <li>
              <a href="/shop-all" className="hover:text-primary transition-colors">Shop All</a>
            </li>
            <li aria-hidden="true">
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </li>
            <li aria-current="page">Premium Leather Weekender Bags</li>
          </ol>
        </nav>

        <ProductGrid collectionName="Weekenders" />
      </div>
    </>
  );
}
