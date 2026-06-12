import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

export const metadata: Metadata = {
  title: 'About Vellut Leather | Our Story, Craft & Heritage',
  description:
    'Learn about Vellut Leather — a US-registered luxury leather goods brand creating handcrafted, made-to-order travel bags from full-grain leather. Our artisans bring generations of expertise to every piece.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    title: 'About Vellut Leather | Our Story, Craft & Heritage',
    description:
      'ZEESHAN RAZZAQ LLC is a US-registered brand creating bespoke, handcrafted leather travel goods. Discover our heritage, materials, and philosophy.',
    url: '/about',
  },
};

// ── AboutPage JSON-LD ────────────────────────────────────────────────────────
const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${BASE_URL}/about#webpage`,
  url: `${BASE_URL}/about`,
  name: 'About Vellut Leather — Our Story, Craft & Heritage',
  description:
    'ZEESHAN RAZZAQ LLC is a US-registered luxury leather goods company. We produce handcrafted, made-to-order premium travel bags, weekenders, and duffel bags using sustainably sourced full-grain leather.',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  about: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
    ],
  },
};

const brandValues = [
  {
    icon: 'verified',
    title: 'Made to Order',
    body: 'Every Vellut bag is crafted only after your order is placed — no warehouses, no mass production, no compromise on quality.',
  },
  {
    icon: 'eco',
    title: 'Responsibly Sourced',
    body: 'Our full-grain hides are by-products of the food industry, vegetable-tanned using plant extracts, ensuring minimal environmental impact.',
  },
  {
    icon: 'hardware',
    title: 'Lifetime Guarantee',
    body: 'We stand behind every stitch and rivet. If any hardware or seam fails due to a manufacturing defect, we repair it free of charge — for life.',
  },
  {
    icon: 'local_shipping',
    title: 'Free Global Shipping',
    body: 'We ship to over 150 countries via DHL Express and FedEx, with full tracking and an estimated 10–21 business day delivery from order date.',
  },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in text-on-surface">
      {/* JSON-LD: AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <article className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto">
        <BackButton />

        {/* Page header */}
        <header className="mb-12 border-b border-outline-variant/30 pb-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-label-sm text-xs text-secondary uppercase tracking-widest" role="list">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li aria-hidden="true"><span className="material-symbols-outlined text-[12px]">chevron_right</span></li>
              <li aria-current="page">About Us</li>
            </ol>
          </nav>

          <h1
            className="font-display-lg text-4xl md:text-5xl mb-4 leading-tight"
            style={{ color: '#735c00' }}
          >
            Our Story
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Welcome to Vellut Leather — where timeless craftsmanship meets modern elegance.
            A US-registered company built on a belief that true luxury is defined not by logos, but by the quality of every stitch.
          </p>
        </header>

        <div className="font-body-md text-base leading-relaxed space-y-12 text-on-surface-variant">

          {/* Section 1 */}
          <section aria-labelledby="about-heritage">
            <h2 id="about-heritage" className="font-headline-sm text-2xl text-on-surface mb-4">
              Our Heritage &amp; Mission
            </h2>
            <p>
              Founded on a passion for premium materials and artisanal techniques, <strong className="text-on-surface">Vellut Leather</strong> is
              dedicated to creating high-end bespoke leather travel goods. Registered in the USA (ZEESHAN RAZZAQ LLC),
              our workshop brings together generations of leather-working expertise, combining traditional hand techniques with
              modern design sensibility.
            </p>
            <p className="mt-4">
              We ship globally from our workshop, reaching customers across the UK, Europe, North America, the Middle East, and beyond.
              Every bag in our catalogue — from the signature Weekender to the cabin-ready Duffel — is available in multiple sizes
              and a choice of natural leather colours including Black, Brown, Grey, or fully custom.
            </p>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="about-craft">
            <h2 id="about-craft" className="font-headline-sm text-2xl text-on-surface mb-4">
              The Craft &amp; Materials
            </h2>
            <p>
              We use exclusively <strong className="text-on-surface">full-grain leather</strong> — the top layer of the hide, the densest and most
              durable grade available. Unlike corrected-grain or bonded leather, full-grain retains all natural surface characteristics
              and develops a rich, personal patina over years of use. Our hides are sourced as by-products of the food industry
              and processed using <strong className="text-on-surface">vegetable-tanning</strong> methods that are gentler on the environment
              and safer for our artisans.
            </p>
            <p className="mt-4">
              Every stitch, fold, and burnished edge tells a story. Our artisans handcraft each piece individually — hand-cutting
              the leather panels, hand-stitching with waxed linen thread, hand-burnishing every edge. No piece leaves our workshop
              without passing a rigorous multi-point quality inspection.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="about-promise">
            <h2 id="about-promise" className="font-headline-sm text-2xl text-on-surface mb-4">
              Our Promise to You
            </h2>
            <p>
              We don't just make bags — we craft companions for your journey. At Vellut Leather, our promise is
              <strong className="text-on-surface"> uncompromising quality</strong>, transparent business practices, and customer service
              that exceeds expectations. Every purchase includes:
            </p>
            {/* Brand value cards */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose" role="list">
              {brandValues.map((val) => (
                <li key={val.title} className="flex gap-4 p-6 border border-outline-variant/20 bg-surface-container-low">
                  <span
                    className="material-symbols-outlined text-[24px] flex-shrink-0 mt-0.5"
                    style={{ color: '#735c00' }}
                    aria-hidden="true"
                  >
                    {val.icon}
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-base text-on-surface mb-1 uppercase tracking-widest">
                      {val.title}
                    </h3>
                    <p className="font-body-md text-sm leading-relaxed">{val.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <aside className="border-t border-outline-variant/20 pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <p className="font-headline-sm text-lg text-on-surface mb-1">Ready to commission your piece?</p>
              <p className="font-body-md text-sm">Browse our full collection of handcrafted leather travel goods.</p>
            </div>
            <a
              href="/shop-all"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-on-surface text-surface-white px-8 py-4 font-label-md uppercase tracking-widest hover:bg-primary transition-colors duration-300"
            >
              Shop All
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </a>
          </aside>
        </div>
      </article>
    </div>
  );
}
