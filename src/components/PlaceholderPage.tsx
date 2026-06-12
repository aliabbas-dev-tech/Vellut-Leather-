import Link from 'next/link';

export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-margin-desktop py-section-gap max-w-[1440px] mx-auto text-center animate-fade-in">
      <h1 className="font-display-md md:font-display-lg text-4xl md:text-6xl text-primary mb-6" style={{ color: '#735c00' }}>
        {title}
      </h1>
      <p className="font-body-lg text-lg text-secondary max-w-2xl mx-auto mb-12">
        {description || "This experience is currently being crafted. We appreciate your patience as we prepare something extraordinary."}
      </p>
      
      <Link href="/" className="inline-block border border-outline-variant px-8 py-4 font-label-md uppercase tracking-widest text-on-surface hover:bg-primary hover:text-white transition-colors duration-300">
        Return to Home
      </Link>
    </div>
  );
}
