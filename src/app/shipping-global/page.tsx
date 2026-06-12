import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Global Shipping & Delivery | Vellut Leather',
  description: 'Vellut Leather offers secure and expedited global shipping. Learn about our dispatch times, international couriers, and delivery expectations.',
  alternates: { canonical: '/shipping-global' },
};

export default function ShippingPage() {
  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-8 border-b border-outline-variant/30 pb-6" style={{ color: '#735c00' }}>
        Global Shipping & Delivery
      </h1>
      
      <div className="font-body-md text-base leading-relaxed space-y-6 text-on-surface-variant">
        <p>Vellut Leather is proud to offer secure and expedited shipping to discerning customers worldwide from our workshop in Pakistan.</p>
        
        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">1. Order Processing Time</h2>
        <p>Because each Vellut Leather product is meticulously handcrafted to order, please allow <strong>7 to 14 business days</strong> for your item to be crafted, inspected, and prepared for dispatch. Custom or bespoke orders may require additional time.</p>
        
        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">2. Shipping Methods & Timelines</h2>
        <p>We partner with premium international couriers (such as DHL Express and FedEx) to ensure your goods arrive safely.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>North America & Europe:</strong> 3-5 business days after dispatch.</li>
          <li><strong>Middle East & Asia:</strong> 2-4 business days after dispatch.</li>
          <li><strong>Rest of the World:</strong> 5-7 business days after dispatch.</li>
        </ul>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">3. Customs, Duties & Taxes</h2>
        <p>Please note that international shipments may be subject to import duties, taxes, and customs fees levied by the destination country. These charges are the buyer's responsibility. Vellut Leather has no control over these charges and cannot predict what they may be.</p>
        
        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">4. Order Tracking</h2>
        <p>Once your order is dispatched, you will receive an email containing your tracking number and a link to monitor your shipment's journey.</p>
      </div>
    </div>
  );
}
