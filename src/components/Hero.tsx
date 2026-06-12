import { supabase } from '@/utils/supabase';

export const revalidate = 0; // Ensure fresh data on load

export default async function Hero() {
  const { data } = await supabase.from('site_settings').select('value').eq('id', 'hero').single();
  
  const hero = data?.value || {
    title: "Bespoke Elegance",
    subtitle: "HANDCRAFTED LEATHER...",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1kxoKWAz9gmcJA60ix-0zGCxyYuBwwfopdzkO-QWCu6kOiTdZ_w0DmUnIWUoLT6i1js0feYd8x9HS0_ukJeOgXtR1UWHPS8cpIhhK9YlG0GhkWTBVfdwVS5Rx7_Lumu7h6o-Wc5DpLsDcxjIWQF-EkbYK04oIm_uAN1eaVMBO6_YsetEyWj-_8C5LdRw0arrbJ2MEuOeDfLGrmJuhT_25zb1m1HSqSqJGskoEBn8sab6nkTyOwqSHGrLnUhVKBq1vsxBO0Qr_rQ",
    ctaText: "DISCOVER",
    ctaUrl: "#collection"
  };

  return (
    <section className="w-full flex flex-col md:relative md:h-[80vh] md:overflow-hidden bg-background-cream">
      {/* Image Container */}
      <div className="w-full aspect-square md:aspect-auto md:h-full md:absolute md:inset-0">
        <img 
          src={hero.imageUrl}
          alt="Vellut Leather Bespoke Elegance Premium Handcrafted Traveling Bag"
          className="w-full h-full object-cover md:object-cover object-center"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative md:absolute md:inset-0 md:bg-black/10 flex flex-col justify-end pt-8 pb-12 px-6 md:pb-32 md:px-margin-desktop">
        <div className="max-w-md md:p-0 text-center md:text-left relative z-10">
          <p className="font-label-md text-xs uppercase tracking-[0.2em] mb-3 text-secondary md:text-on-surface">{hero.subtitle}</p>
          <h1 className="font-display-lg text-4xl md:text-5xl font-normal text-on-surface mb-6 md:mb-6 leading-tight tracking-normal">{hero.title}</h1>
          <a className="inline-block bg-inverse-surface text-surface-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-primary transition-all duration-300 w-full md:w-auto shadow-md" href={hero.ctaUrl}>{hero.ctaText}</a>
        </div>
      </div>
    </section>
  );
}
