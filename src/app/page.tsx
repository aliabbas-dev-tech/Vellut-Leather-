import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FeatureSection from '@/components/FeatureSection';
import Preloader from '@/components/Preloader';
import FAQ from '@/components/FAQ';

// ── Page-level metadata (overrides layout template for homepage) ─────────────
export const metadata: Metadata = {
  title: 'Premium Leather Travel Bags & Handcrafted Luggage | Vellut Leather',
  description:
    'Shop Vellut Leather for premium leather travel bags, luxury leather duffel bags, and bespoke handcrafted luggage. Full-grain leather, free global shipping.',
  alternates: { canonical: '/' },
};

// ── Homepage with GEO-optimised semantic structure ──────────────────────────
export default function Home() {
  return (
    <>
      <Preloader />

      {/* ① Hero — above-the-fold brand statement */}
      <Hero />

      {/* ② Product Collection — primary content */}
      <section aria-label="Vellut Leather Product Collection">
        <ProductGrid />
      </section>

      {/* ③ Brand Story — who we are and what we stand for */}
      <FeatureSection />

      {/* ④ FAQ — GEO-optimised Q&A for AI engine surfacing */}
      <FAQ />
    </>
  );
}
