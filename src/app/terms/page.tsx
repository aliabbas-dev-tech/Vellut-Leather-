import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Terms of Service | Vellut Leather',
  description: 'Terms of Service for ZEESHAN RAZZAQ LLC. Review our conditions of sale, pricing, order acceptance, and website usage policies.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-8 border-b border-outline-variant/30 pb-6" style={{ color: '#735c00' }}>
        Terms of Service
      </h1>

      <div className="font-body-md text-base leading-relaxed space-y-6 text-on-surface-variant">
        <p><strong>Last Updated: June 2026</strong></p>

        <p>
          These Terms of Service govern your use of the Vellut Leather website and your purchase of products from
          ZEESHAN RAZZAQ LLC, with its registered office at 1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA ("we", "us", "our"). By accessing our website or
          placing an order, you agree to be bound by these Terms.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">1. General Conditions</h2>
        <p>
          We reserve the right to refuse service to anyone for any reason at any time. By agreeing to these Terms, you
          confirm that you are at least 18 years of age. We reserve the right to modify these Terms at any time, and
          such changes will be effective immediately upon posting to the website.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">2. Products &amp; Services</h2>
        <p>
          Our bespoke leather goods are handcrafted to order. Due to the natural characteristics of genuine leather,
          slight variations in colour, texture, and grain pattern may occur. These are not defects but authentic
          hallmarks of premium full-grain leather. We reserve the right to limit quantities of any products or services.
        </p>
        <p>
          All product images are as accurate as reasonably possible. Colours may vary slightly due to monitor settings.
          Product descriptions are provided in good faith and comply with the <strong>Consumer Rights Act 2015</strong>.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">3. Pricing &amp; Payment</h2>
        <p>
          All prices are displayed in <strong>US Dollars (USD $)</strong> and are inclusive of any applicable
          taxes unless otherwise stated. We reserve the right to change prices at any time without prior notice.
          Payment must be made in full at the time of ordering. We accept major credit and debit cards processed
          securely via Stripe.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">4. Order Acceptance</h2>
        <p>
          Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order.
          A contract of sale is formed when we send you an order confirmation email. We may cancel an order if a
          product is unavailable, if payment cannot be verified, or for any legitimate reason.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">5. Consumer Rights &amp; Cancellation</h2>
        <p>
          You have the right to cancel your order within 14 days of receiving your goods and return them within a
          further 14 days. Please refer to our{' '}
          <a href="/returns" className="text-primary hover:underline">Return &amp; Refund Policy</a> for full details.
        </p>
        <p>
          Custom or personalised items are exempt from the standard right of return, but this does not affect your rights regarding faulty goods.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">6. Shipping &amp; Delivery</h2>
        <p>
          As our products are handcrafted to order, please allow 7–14 business days for production before dispatch.
          Shipping timelines and methods are detailed in our{' '}
          <a href="/shipping-global" className="text-primary hover:underline">Shipping &amp; Delivery Policy</a>.
          Risk of loss and title for items passes to you upon delivery.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">7. Intellectual Property</h2>
        <p>
          All content on this website — including but not limited to text, images, logos, and design — is the
          exclusive property of ZEESHAN RAZZAQ LLC and is protected by applicable copyright and
          intellectual property laws. You may not reproduce, distribute, or use any content without our prior
          written consent.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ZEESHAN RAZZAQ LLC shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of our website or products. Our
          total liability to you shall not exceed the purchase price of the goods in question. Nothing in these
          Terms limits our liability for death or personal injury caused by negligence, fraud, or any other
          liability that cannot be excluded by applicable law.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">9. Dispute Resolution &amp; Complaints</h2>
        <p>
          If you have a complaint about our products or services, please contact us in the first instance at{' '}
          <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>.
          We aim to resolve all complaints within 5 business days. If we are unable to resolve a dispute to your
          satisfaction, you may refer the matter to an Alternative Dispute Resolution (ADR) provider or the
          appropriate courts.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">10. Governing Law &amp; Jurisdiction</h2>
        <p>
          These Terms of Service are governed by and construed in accordance with the{' '}
          <strong>laws of the State of Colorado</strong>. Any dispute arising under or in connection with these Terms
          shall be subject to the <strong>exclusive jurisdiction of the courts of Colorado</strong>, without
          prejudice to any mandatory consumer rights you may have under the laws of your country of residence.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">11. Contact Us</h2>
        <p>
          <strong>ZEESHAN RAZZAQ LLC</strong><br />
          1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA<br />
          Email: <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>
        </p>
      </div>
    </div>
  );
}
