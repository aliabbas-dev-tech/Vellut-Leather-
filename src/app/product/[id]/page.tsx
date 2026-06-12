import type { Metadata } from 'next';
import { supabase } from '@/utils/supabase';
import { notFound } from 'next/navigation';
import ProductActions from './ProductActions';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.com';

type Props = {
  params: Promise<{ id: string }>;
};

// ─── Dynamic Metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('id, name, description, imageUrl, price, category')
    .eq('id', id)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = product.name; // layout template turns this into "[Name] - Vellut Leather"
  const description = `${product.description} Shop the ${product.name} — a handcrafted premium leather travel bag by Vellut Leather. Free global shipping.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: `/product/${product.id}`,
      siteName: 'Vellut Leather',
      title: `${product.name} - Vellut Leather`,
      description,
      images: product.imageUrl
        ? [
            {
              url: product.imageUrl,
              width: 800,
              height: 1000,
              alt: `${product.name} — handcrafted premium leather bag by Vellut Leather`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Vellut Leather`,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

// ─── Product Page ───────────────────────────────────────────────────────────────
export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  // ─── JSON-LD Product Schema ────────────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    url: `${BASE_URL}/product/${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Vellut Leather',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: 'Vellut Leather',
      },
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background-cream">
        <div className="w-full px-6 md:px-margin-desktop py-8">
          <Link href="/#collection" className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-12 font-label-md tracking-widest uppercase">
            <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 animate-fade-in">
            {/* Image Column */}
            <div className="bg-surface-container-low aspect-[4/5] relative overflow-hidden group">
              <img
                src={product.imageUrl}
                alt={`${product.name} — handcrafted premium leather bag by Vellut Leather`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Details Column */}
            <div className="flex flex-col justify-center py-12">
              <span className="font-label-sm uppercase tracking-[0.2em] text-secondary mb-4">{product.category}</span>
              <h1 className="font-display-lg text-4xl lg:text-6xl text-on-surface mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="h-[1px] w-full bg-outline-variant/30 mb-8" />

              <p className="font-body-lg text-secondary mb-12 leading-relaxed">
                {product.description}
              </p>

              {/* We need a client component for Add to Cart interactivity */}
              <ProductActions product={product} />

              <div className="mt-16 flex flex-col gap-6 pt-8 border-t border-outline-variant/30">
                <div className="flex items-center gap-4 text-secondary">
                  <span className="material-symbols-outlined">local_shipping</span>
                  <span className="font-body-md text-sm">Complimentary global shipping on all orders.</span>
                </div>
                <div className="flex items-center gap-4 text-secondary">
                  <span className="material-symbols-outlined">verified</span>
                  <span className="font-body-md text-sm">Lifetime warranty on hardware and stitching.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
