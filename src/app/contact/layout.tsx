import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

export const metadata: Metadata = {
  title: 'Contact Vellut Leather | Customer Support & Bespoke Enquiries',
  description:
    'Contact Vellut Leather for order enquiries, bespoke leather bag commissions, returns, or general support. We respond within 24 hours. Email: support@vellutleather.shop.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Vellut Leather | Customer Support & Bespoke Enquiries',
    description:
      'Reach our team for order enquiries, bespoke commissions, or returns. ZEESHAN RAZZAQ LLC — US-registered luxury leather goods.',
    url: '/contact',
    type: 'website',
  },
};

// ── BreadcrumbList JSON-LD ──────────────────────────────────────────────────
// Injected at layout level because contact/page.tsx is a 'use client' component
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
      name: 'Contact Us',
      item: `${BASE_URL}/contact`,
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD: BreadcrumbList — placed here because page.tsx is a client component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
