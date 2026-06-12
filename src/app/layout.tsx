import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Vellut Leather | Premium Leather Travelling Bags & Luxury Duffels',
    template: '%s | Vellut Leather',
  },
  description:
    'ZEESHAN RAZZAQ LLC crafts handmade, premium leather travel bags, luxury leather duffel bags, and bespoke handcrafted luggage. Free global shipping. 14-day returns.',
  keywords: [
    'Premium Leather Travelling Bags',
    'Luxury Leather Duffels',
    'Handcrafted Travel Backpacks',
    'bespoke leather goods',
    'made-to-order leather bags',
    'full grain leather travel bag',
    'leather weekender bag UK',
    'handmade leather duffle',
    'luxury leather cabin bag',
    'buy leather bags UK',
    'vellut leather',
  ],
  authors: [{ name: 'ZEESHAN RAZZAQ LLC', url: BASE_URL }],
  creator: 'ZEESHAN RAZZAQ LLC',
  publisher: 'ZEESHAN RAZZAQ LLC',
  category: 'Luxury Leather Goods',
  classification: 'E-commerce / Luxury Fashion / Leather Goods',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'Vellut Leather',
    title: 'Vellut Leather | Premium Leather Travelling Bags & Luxury Duffels UK',
    description:
      'Handcrafted, made-to-order leather travel goods — Premium Leather Travel Bags, Luxury Leather Duffel Bags & Bespoke Handcrafted Luggage. US Registered (ZEESHAN RAZZAQ LLC). Free global shipping.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vellut Leather — Premium Handcrafted Leather Goods, UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vellut Leather | Premium Leather Travelling Bags & Luxury Duffels UK',
    description:
      'Handcrafted premium leather travel bags and bespoke luggage. Full-grain leather. Free global shipping. US registered company.',
    images: ['/og-image.jpg'],
  },
  // AI-engine clarity signals
  other: {
    'application-name': 'Vellut Leather',
    'business-type': 'E-commerce',
    'business-country': 'United States',
    'business-registration': 'ZEESHAN RAZZAQ LLC',
    'product-type': 'Luxury Leather Goods',
    'currency': 'USD',
    'shipping': 'Free Global Shipping',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ── Sitewide JSON-LD Schemas ─────────────────────────────────────────────
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'ZEESHAN RAZZAQ LLC',
    legalName: 'ZEESHAN RAZZAQ LLC',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/vl-logo-transparent.png`,
      width: 300,
      height: 120,
    },
    image: `${BASE_URL}/og-image.jpg`,
    description:
      'ZEESHAN RAZZAQ LLC is a US-registered luxury leather goods company producing handcrafted, made-to-order premium travel bags, weekenders, and duffel bags. Each piece is crafted from full-grain leather and shipped globally.',
    foundingDate: '2024',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1500 N GRANT ST STE 34785',
      addressLocality: 'DENVER',
      addressRegion: 'COLORADO',
      postalCode: '80203',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@vellutleather.com',
      telephone: '+1 307 888 9612',
      availableLanguage: 'English',
      areaServed: 'Worldwide',
    },
    sameAs: [
      'https://www.instagram.com/vellutleather',
      'https://www.facebook.com/vellutleather',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Vellut Leather',
    description:
      'Buy premium handcrafted leather travelling bags, luxury duffels, and bespoke weekenders made to order. Free global shipping. US registered company.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/shop-all?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-GB',
  };

  return (
    <html lang="en-GB">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-W7NQKNB35K" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-W7NQKNB35K');
          `}
        </Script>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        {/* Organization Schema — tells AI engines WHO we are */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema — enables Sitelinks SearchBox in Google / AI engine entity mapping */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${outfit.variable} antialiased`}>
        <Header />
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '75px' }}>
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

