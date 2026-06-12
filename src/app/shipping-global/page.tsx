import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Global Shipping & Delivery Policy | Vellut Leather',
  description:
    'Vellut Leather ships worldwide via DHL Express and FedEx. Learn about our production times, international delivery timelines, customs duties, lost parcel policy, and order tracking.',
  alternates: { canonical: '/shipping-global' },
};

export default function ShippingPage() {
  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1
        className="font-display-lg text-4xl md:text-5xl text-primary mb-8 border-b border-outline-variant/30 pb-6"
        style={{ color: '#735c00' }}
      >
        Global Shipping &amp; Delivery Policy
      </h1>

      <div className="font-body-md text-base leading-relaxed space-y-6 text-on-surface-variant">
        <p><strong>Last Updated: June 2026</strong></p>

        <p>
          This Shipping &amp; Delivery Policy applies to all orders placed with <strong>ZEESHAN RAZZAQ LLC</strong> (trading as
          Vellut Leather), registered at 1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA. We are committed
          to delivering your handcrafted leather goods safely and efficiently, worldwide.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">1. Order Processing &amp; Production Time</h2>
        <p>
          Because every Vellut Leather product is <strong>meticulously handcrafted to order</strong>, please allow{' '}
          <strong>7 to 14 business days</strong> for your item to be crafted, inspected, and prepared for dispatch.
          Custom or bespoke orders (e.g., custom colour or monogramming) may require additional production time.
          You will receive an email notification when your order has been dispatched.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">2. Shipping Methods &amp; Estimated Timelines</h2>
        <p>
          We partner with premium international couriers (DHL Express and FedEx) to ensure your goods arrive safely
          and with full tracking. Estimated transit times <em>after dispatch</em> are:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>North America &amp; Europe:</strong> 3–5 business days after dispatch.</li>
          <li><strong>Middle East &amp; Asia:</strong> 2–4 business days after dispatch.</li>
          <li><strong>Rest of the World:</strong> 5–7 business days after dispatch.</li>
        </ul>
        <p>
          <strong>Total estimated time from order to delivery:</strong> 10–21 business days (production + transit).
          These are estimates and may be affected by customs clearance times or peak periods.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">3. Shipping Costs</h2>
        <p>
          <strong>Free complimentary global shipping</strong> is included on all orders. There are no hidden
          shipping fees. The price displayed at checkout is the total price you pay for the goods.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">4. Customs, Import Duties &amp; Taxes</h2>
        <p>
          International shipments may be subject to import duties, taxes, and customs fees levied by the destination
          country. These charges are entirely the <strong>buyer&apos;s responsibility</strong>. Vellut Leather has no
          control over these charges and cannot predict what they may be. We recommend checking with your local customs
          authority before placing your order if you are concerned about import fees.
        </p>
        <p>
          We declare the true value of goods on all customs documentation in compliance with international trade laws.
          We do not mark shipments as &ldquo;gifts&rdquo; to avoid customs duties.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">5. Order Tracking</h2>
        <p>
          Once your order is dispatched, you will receive an email containing your tracking number and a direct link
          to monitor your shipment in real time via the courier&apos;s website. You can also use our{' '}
          <a href="/tracking" className="text-primary hover:underline">Order Tracking</a> page at any time.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">6. Lost, Damaged, or Delayed Parcels</h2>
        <p>
          In the rare event that your parcel is lost, significantly delayed, or arrives damaged in transit, please
          contact us <strong>within 7 days of the expected delivery date</strong> at{' '}
          <a href="mailto:support@vellutleather.shop" className="text-primary hover:underline">
            support@vellutleather.shop
          </a>{' '}
          with your order number and (if applicable) photographs of any damage.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Lost parcels:</strong> We will open a formal investigation with the courier. If the parcel is
            confirmed lost, we will either re-ship your order or provide a full refund at no cost to you.
          </li>
          <li>
            <strong>Damaged parcels:</strong> Please retain all original packaging and take photographs immediately
            upon receipt. We will arrange a remedy (repair, replacement, or refund) at no cost to you.
          </li>
          <li>
            <strong>Delayed parcels:</strong> Delays can occur due to customs inspections or carrier backlogs.
            Please allow an additional 7 business days before contacting us. We will assist in tracking your shipment.
          </li>
        </ul>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">7. Incorrect Delivery Address</h2>
        <p>
          Please ensure your delivery address is accurate at the time of order. We are unable to redirect parcels once
          dispatched. If a parcel is returned to us due to an incorrect or incomplete address provided by the customer,
          we will contact you to arrange re-delivery (re-shipping costs may apply).
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">8. Contact Us</h2>
        <p>
          For any shipping enquiries, please contact our support team:
        </p>
        <p>
          <strong>ZEESHAN RAZZAQ LLC</strong><br />
          1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA<br />
          Email:{' '}
          <a href="mailto:support@vellutleather.shop" className="text-primary hover:underline">
            support@vellutleather.shop
          </a>
          <br />
          Phone:{' '}
          <a href="tel:+13078889612" className="text-primary hover:underline">
            +1 307 888 9612
          </a>
          <br />
          We aim to respond to all queries within 24 hours.
        </p>
      </div>
    </div>
  );
}
