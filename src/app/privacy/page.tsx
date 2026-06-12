import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vellut Leather',
  description: 'Read the Privacy Policy for Vellut Leather. Learn how we collect, use, and protect your personal data in compliance with UK GDPR.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-8 border-b border-outline-variant/30 pb-6" style={{ color: '#735c00' }}>
        Privacy Policy
      </h1>

      <div className="font-body-md text-base leading-relaxed space-y-6 text-on-surface-variant">
        <p><strong>Last Updated: June 2026</strong></p>

        <p>
          This Privacy Policy describes how <strong>ZEESHAN RAZZAQ LLC</strong> ("we", "us", "our") collects, uses,
          and protects your personal data. We are committed to complying with applicable data protection laws.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">1. Data Controller</h2>
        <p>The Data Controller responsible for your personal data is:</p>
        <p>
          <strong>ZEESHAN RAZZAQ LLC</strong><br />
          1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA<br />
          Email: <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">2. Personal Data We Collect</h2>
        <p>We may collect and process the following categories of personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> First name, last name.</li>
          <li><strong>Contact Data:</strong> Email address, postal/billing address.</li>
          <li><strong>Transaction Data:</strong> Details about payments and purchases made through our website. Note: we do not store card details — all payment data is handled securely by Stripe.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, operating system, time zone, and pages visited, collected automatically when you access our site.</li>
          <li><strong>Communication Data:</strong> Any messages or enquiries you send us.</li>
        </ul>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">3. Lawful Basis for Processing</h2>
        <p>We process your personal data on the following lawful bases:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Contractual Necessity:</strong> To fulfil your purchase order, arrange delivery, and manage your account.</li>
          <li><strong>Legal Obligation:</strong> To comply with applicable laws, such as maintaining financial records for tax authorities.</li>
          <li><strong>Legitimate Interests:</strong> To improve our website, prevent fraud, and manage our business operations, where such interests are not overridden by your rights.</li>
          <li><strong>Consent:</strong> Where you have given explicit consent, such as subscribing to marketing emails. You may withdraw consent at any time.</li>
        </ul>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">4. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To process and fulfil your orders and payments.</li>
          <li>To communicate with you about your order, including dispatch and delivery updates.</li>
          <li>To respond to your enquiries and provide customer support.</li>
          <li>To comply with legal and regulatory obligations.</li>
          <li>To improve our website and user experience.</li>
          <li>To send you marketing communications where you have given consent (you can unsubscribe at any time).</li>
        </ul>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">5. Third-Party Service Providers</h2>
        <p>We share your data with carefully selected third-party processors who act on our behalf, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Stripe:</strong> Payment processing. Stripe is PCI-DSS compliant and handles all card data securely.</li>
          <li><strong>Supabase:</strong> Secure cloud database for storing order and account information.</li>
          <li><strong>DHL / FedEx:</strong> International shipping partners who receive your delivery address to fulfil orders.</li>
        </ul>
        <p>We do not sell your personal data to any third party.</p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">6. Data Retention</h2>
        <p>We retain your personal data only for as long as necessary for the purposes it was collected:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Order and transaction records:</strong> Retained for 7 years to comply with tax financial record-keeping requirements.</li>
          <li><strong>Customer account data:</strong> Retained for as long as your account is active. You may request deletion at any time.</li>
          <li><strong>Marketing consents:</strong> Retained until you withdraw consent.</li>
          <li><strong>Technical/log data:</strong> Retained for up to 12 months.</li>
        </ul>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">7. Your Privacy Rights</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> You can request correction of any inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request deletion of your personal data where there is no compelling reason for us to continue processing it.</li>
          <li><strong>Right to Restrict Processing:</strong> You can ask us to restrict how we process your data in certain circumstances.</li>
          <li><strong>Right to Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
          <li><strong>Right to Object:</strong> You can object to our processing of your data based on legitimate interests or for marketing purposes.</li>
          <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>.
          We will respond within <strong>30 days</strong>.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">8. Cookies</h2>
        <p>
          Our website uses cookies — small text files stored on your device — to improve your experience and enable
          essential functionality (such as your shopping cart). We use the following types of cookies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Strictly Necessary Cookies:</strong> Required for the website to function (e.g., cart session). These cannot be disabled.</li>
          <li><strong>Analytics Cookies:</strong> Used to understand how visitors interact with our website. We only set these with your consent.</li>
        </ul>
        <p>
          You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our site.
          By continuing to use our website, you consent to our use of strictly necessary cookies.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">9. International Data Transfers</h2>
        <p>
          Some of our service providers (including Stripe and Supabase) may process data internationally. Where this occurs,
          we ensure appropriate safeguards are in place in accordance with applicable data protection laws.
        </p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">10. How to Complain</h2>
        <p>
          If you believe we have not handled your personal data properly, you have the right to lodge a complaint with your
          local data protection supervisory authority.
        </p>
        <p>We would, however, appreciate the opportunity to address your concern directly before you contact any authorities.</p>

        <h2 className="font-headline-sm text-2xl text-on-surface mt-8 mb-4">11. Contact Us</h2>
        <p>For any privacy-related enquiries or to exercise your rights, please contact:</p>
        <p>
          <strong>ZEESHAN RAZZAQ LLC</strong><br />
          1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA<br />
          Email: <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>
        </p>
      </div>
    </div>
  );
}
