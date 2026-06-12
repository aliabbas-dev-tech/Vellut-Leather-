import type { Metadata } from 'next';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

export const metadata: Metadata = {
  title: 'Leather Gift Guide | Luxury Handcrafted Bags for Him & Her',
  description:
    'Find the perfect handcrafted leather gift. Explore our curated selection of luxury weekender bags, duffel bags, and bespoke travel accessories by Vellut Leather. Free global shipping.',
  alternates: { canonical: '/gift-guide' },
  openGraph: {
    title: 'Leather Gift Guide | Luxury Handcrafted Bags — Vellut Leather',
    description:
      'Curated luxury leather gift ideas — weekender bags, duffel bags, and bespoke travel accessories. Handcrafted to order. Free global shipping.',
    url: '/gift-guide',
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
      name: 'Leather Gift Guide',
      item: `${BASE_URL}/gift-guide`,
    },
  ],
};

export default function GiftGuidePage() {
  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="px-6 md:px-margin-desktop py-16 max-w-5xl mx-auto animate-fade-in text-on-surface">
        <BackButton />

        {/* ── Visible HTML Breadcrumb ─────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-label-sm text-xs text-secondary uppercase tracking-widest list-none m-0 p-0" role="list">
            <li>
              <a href="/" className="hover:text-primary transition-colors">Home</a>
            </li>
            <li aria-hidden="true">
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </li>
            <li aria-current="page">Leather Gift Guide</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-4" style={{ color: '#735c00' }}>
            The Leather Gift Guide
          </h1>
          <p className="font-body-lg text-lg text-secondary max-w-2xl mx-auto">
            Discover the perfect leather companion for the discerning traveler. Each piece is handcrafted to be cherished for a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gift Category 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden relative">
              <img
                src="/gift-weekender.png"
                alt="The Weekender Collection — premium tan leather weekender travel bag"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h2 className="font-headline-md text-2xl text-on-surface mb-2">For the Frequent Flyer</h2>
            <p className="font-body-md text-on-surface-variant mb-4">
              Our signature weekender bags offer timeless elegance and unmatched durability for those always on the move.
            </p>
            <Link href="/weekenders" className="font-label-md uppercase tracking-widest text-primary hover:underline underline-offset-4">
              Shop Premium Travel Bags
            </Link>
          </div>

          {/* Gift Category 2 */}
          <div className="group cursor-pointer md:mt-24">
            <div className="aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden relative">
              <img
                src="/gift-briefcase.png"
                alt="The Pilot Briefcase — classic dark brown leather luxury duffel bag"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h2 className="font-headline-md text-2xl text-on-surface mb-2">For the Business Traveller</h2>
            <p className="font-body-md text-on-surface-variant mb-4">
              Refined, spacious, and undeniably professional. Our cabin bags and briefcases transition seamlessly from boardroom to aircraft cabin.
            </p>
            <Link href="/duffles" className="font-label-md uppercase tracking-widest text-primary hover:underline underline-offset-4">
              Shop Luxury Duffel Bags
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center border-t border-outline-variant/30 pt-16">
          <h3 className="font-headline-sm text-2xl text-on-surface mb-4">Need Personalised Advice?</h3>
          <p className="font-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
            Our bespoke gifting experts are here to help you select the perfect piece or discuss custom monogramming options.
          </p>
          <a
            href="mailto:support@vellutleather.com"
            className="inline-block border border-primary px-8 py-4 font-label-md uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Contact an Expert
          </a>
        </div>
      </div>
    </>
  );
}
