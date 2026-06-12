import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Vellut Leather',
  description: 'Details on Vellut Leather\'s return and refund policy, including our 14-day cooling-off period and lifetime craftsmanship guarantee.',
  alternates: { canonical: '/returns' },
};

export default function ReturnsPage() {
  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-8 border-b border-outline-variant/30 pb-6" style={{ color: '#735c00' }}>
        Return &amp; Refund Policy
      </h1>

      <div className="font-body-md text-base leading-relaxed space-y-6 text-on-surface-variant">
        <p><strong>Last Updated: June 2026</strong></p>

        <p>
          This Return &amp; Refund Policy applies to all purchases made from ZEESHAN RAZZAQ LLC, registered at
          1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA, through our website.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">1. Your Statutory Right to Cancel (14-Day Cooling-Off Period)</h2>
        <p>
          As a consumer purchasing online, you have the <strong>legal right to cancel your order within 14 calendar days</strong> of
          receiving your goods, for <strong>any reason</strong> — including simply changing your mind. You do not need to provide a reason.
        </p>
        <p>
          After cancelling, you then have a further <strong>14 calendar days</strong> to return the goods to us. We will process
          your refund within <strong>14 days</strong> of receiving the returned item.
        </p>
        <p>
          To exercise your right to cancel, please notify us in writing by email at{' '}
          <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>{' '}
          before the 14-day cancellation period expires, clearly stating your order number and your intention to cancel.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">2. Return Conditions</h2>
        <p>To be eligible for a return and full refund under your statutory rights, items must be:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Returned within 14 days of your cancellation notice.</li>
          <li>In their original condition — unused, unaltered, and with all original packaging where possible.</li>
          <li>Accompanied by your order confirmation or proof of purchase.</li>
        </ul>
        <p>
          Return shipping costs for cancelled orders (change of mind) are the responsibility of the customer unless the item is
          faulty or was incorrectly sent.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">3. Faulty, Damaged, or Incorrect Items</h2>
        <p>
          If your item arrives damaged, defective, or is not as described, you have enhanced rights under the{' '}
          <strong>Consumer Rights Act 2015</strong>. You are entitled to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>30 days:</strong> A full refund if the goods are faulty.</li>
          <li><strong>Up to 6 months:</strong> A repair or replacement (and a refund if repair/replacement is not possible).</li>
          <li><strong>Up to 6 years:</strong> A claim if a fault was present at the time of purchase.</li>
        </ul>
        <p>
          Please contact us within <strong>48 hours of delivery</strong> if your item is damaged or defective. Email{' '}
          <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>{' '}
          with your order number and clear photographs of the issue. We will arrange return postage and a full remedy at no cost to you.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">4. Bespoke &amp; Custom Orders</h2>
        <p>
          Items that have been <strong>personalised, monogrammed, or custom-made to your specification</strong> are exempt from
          the standard 14-day cancellation right under Regulation 28(1)(b) of the Consumer Contracts Regulations 2013, as
          these are goods made to a consumer's specific requirements. This exception does not affect your statutory rights
          regarding faulty or misdescribed goods.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">5. Refund Process</h2>
        <p>
          Once we receive and inspect your returned item, we will notify you of the outcome. Approved refunds will be issued
          to your original payment method within <strong>14 days</strong> of us receiving the returned goods. Refund
          timeframes may vary depending on your card issuer or bank.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">6. Natural Leather Characteristics</h2>
        <p>
          Genuine full-grain leather has natural variations including grain patterns, minor marks, and slight colour
          differences. These are hallmarks of authentic premium leather and are <strong>not considered defects</strong>.
          They will be clearly acknowledged in product descriptions where applicable.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">7. Lifetime Craftsmanship Guarantee</h2>
        <p>
          In addition to your statutory rights, ZEESHAN RAZZAQ LLC offers a <strong>Lifetime Craftsmanship Guarantee</strong> on all hardware and
          stitching. This means:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>If any seam, stitch, or metal hardware fails due to a manufacturing defect at any point during the lifetime of the product, we will repair it free of charge.</li>
          <li>This guarantee covers manufacturing defects only — not damage caused by misuse, accidents, or normal wear and patina of the leather (which is considered desirable).</li>
          <li>To claim under this guarantee, contact us at <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a> with your order number and photographs of the issue.</li>
          <li>We will assess the claim and arrange a prepaid return label if the guarantee applies.</li>
        </ul>
        <p>
          This guarantee does not limit or replace any of your statutory rights under UK law.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">8. Pricing &amp; VAT</h2>
        <p>
          All prices displayed on the Vellut Leather website are in <strong>US Dollars (USD $)</strong>. As an international seller, customers outside the US may be subject to local import duties or taxes — these
          are the responsibility of the buyer. Please refer to our <a href="/shipping-global" className="text-primary hover:underline">Shipping Policy</a> for further details.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">9. Contact Us</h2>
        <p>To initiate a return, cancellation, or to raise a complaint, please contact:</p>
        <p>
          <strong>ZEESHAN RAZZAQ LLC</strong><br />
          1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA<br />
          Email: <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a><br />
          We aim to respond to all queries within 24 hours.
        </p>
      </div>
    </div>
  );
}
