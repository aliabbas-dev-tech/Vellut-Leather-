import Link from 'next/link';

export default function FeatureSection() {
  return (
    <section className="bg-surface-container py-section-gap">
      <div className="w-full px-6 md:px-margin-desktop flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
        
        {/* Left Side: Image with decorative border */}
        <div className="relative w-full lg:w-1/2">
          {/* Decorative outline box */}
          <div className="absolute -top-8 -left-8 w-64 h-64 border border-outline-variant/50 hidden md:block z-0"></div>
          
          <div className="relative z-10 aspect-square w-full max-w-[500px] mx-auto bg-[#e6e6e6] overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7XxYIOoLtAVepX37UOiTmBMk_AQLG25JeTG6HQnJ0c85vB2y6f0-KFyO4auvzRSiWc0QmUJois9_NSJn77c1iacooQl-cVU4BC9gqdfel8ecxI6L3M2EwKZHAuITsfX4KzzocoF9IXfOX-xHidK3lKCVratul2m5K04vKUW63a5tug-ZkvZfxd6m538Djk-2YV24srN_r1SmvyReE-3vrjvuK8qfgLqe2X3qpjF7N2yAOqVFbdijl8niRS-AvXIu80S7Wd0xxpgU" 
              alt="Artisan crafting premium leather travel bag by hand" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Side: Text and Features */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight max-w-md">
            The Art of the Slow Process.
          </h2>
          
          <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-lg">
            Every Vellut piece is the result of hundreds of hours of patient handwork. We believe in materials that age gracefully, developing a unique patina that tells the story of your travels.
          </p>

          <div className="flex flex-col gap-8 mb-12">
            {/* Feature 1 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-[24px] mt-1" style={{ color: '#735c00' }}>verified</span>
              <div>
                <h4 className="font-headline-sm text-[20px] font-medium text-on-surface mb-2">Responsibly Sourced</h4>
                <p className="font-body-md text-sm text-on-surface-variant max-w-sm">Our hides are a byproduct of the food industry, tanned using vegetable extracts.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-[24px] mt-1" style={{ color: '#735c00' }}>hardware</span>
              <div>
                <h4 className="font-headline-sm text-[20px] font-medium text-on-surface mb-2">Lifetime Guarantee</h4>
                <p className="font-body-md text-sm text-on-surface-variant max-w-sm">We stand by our construction. Should a seam ever fail, we will repair it for life.</p>
              </div>
            </div>
          </div>

          <Link href="/about" className="font-label-md text-label-md uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-2 w-fit">
            DISCOVER OUR PROCESS
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
        
      </div>
    </section>
  );
}
