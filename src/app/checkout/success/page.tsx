'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function generateOrderRef(): string {
  // Use a mock order number as requested
  return `#VL-1024`;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [orderRef] = useState(generateOrderRef);
  const [paymentStatus, setPaymentStatus] = useState<'succeeded' | 'processing' | 'pending'>('succeeded');

  useEffect(() => {
    const redirectStatus = searchParams.get('redirect_status');
    if (redirectStatus === 'processing') setPaymentStatus('processing');
  }, [searchParams]);

  const estimatedDispatch = new Date();
  estimatedDispatch.setDate(estimatedDispatch.getDate() + 14);
  const dispatchDateStr = estimatedDispatch.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-5xl text-on-surface mb-3">
          Order Confirmed
        </h1>
        <p className="font-body-lg text-secondary text-lg">
          Thank you for your purchase. We're already planning your piece.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="border border-outline-variant/30 bg-surface-container-lowest mb-8">
        <div className="p-6 border-b border-outline-variant/20">
          <h2 className="font-headline-sm text-xl text-on-surface uppercase tracking-widest">Order Details</h2>
        </div>

        <div className="p-6 space-y-4 font-body-md text-sm">
          <div className="flex justify-between items-center">
            <span className="text-secondary uppercase tracking-widest text-xs">Order Reference</span>
            <span className="font-headline-sm text-on-surface font-medium">{orderRef}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary uppercase tracking-widest text-xs">Payment Status</span>
            <span className={`flex items-center gap-2 font-medium ${paymentStatus === 'succeeded' ? 'text-green-700' : 'text-amber-700'}`}>
              <span className="material-symbols-outlined text-[16px]">
                {paymentStatus === 'succeeded' ? 'check_circle' : 'schedule'}
              </span>
              {paymentStatus === 'succeeded' ? 'Payment Successful' : 'Payment Processing'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary uppercase tracking-widest text-xs">Order Date</span>
            <span className="text-on-surface">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
            <span className="text-secondary uppercase tracking-widest text-xs">Currency</span>
            <span className="text-on-surface">USD $ — US Dollars</span>
          </div>

          {/* Itemized Summary */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-surface-container-low border border-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px] text-primary">luggage</span>
              </div>
              <div>
                <p className="font-headline-sm text-sm text-on-surface">Premium Leather Travelling Bag</p>
                <p className="text-xs text-secondary mt-1">Full-grain leather · Vintage Brown</p>
              </div>
            </div>
            <span className="font-label-md text-on-surface">$599.00</span>
          </div>
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-outline-variant/20">
            <span className="text-secondary font-headline-sm uppercase tracking-widest text-xs">Total Paid</span>
            <span className="font-headline-sm text-on-surface text-lg">$599.00</span>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="border border-outline-variant/30 bg-surface-container-lowest mb-8">
        <div className="p-6 border-b border-outline-variant/20">
          <h2 className="font-headline-sm text-xl text-on-surface uppercase tracking-widest">What Happens Next</h2>
        </div>

        <div className="p-6 space-y-6">
          {[
            {
              step: '01',
              icon: 'mail',
              title: 'Confirmation Email',
              body: 'You will receive an order confirmation email to the address provided at checkout within the next few minutes.',
            },
            {
              step: '02',
              icon: 'local_shipping',
              title: 'Fast Dispatch & Tracking',
              body: 'As each piece is handcrafted to order, please allow 7–14 business days for production, then 3–7 business days for global delivery. Total estimated time: 10–21 business days. You will receive a tracking number by email once dispatched.',
            },
            {
              step: '04',
              icon: 'package_2',
              title: '14-Day Return Right',
              body: 'You have a 14-day right to cancel after receiving your goods. Please see our Return & Refund Policy for full details.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-surface-container-low border border-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]" style={{ color: '#735c00' }}>{item.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-sm text-on-surface uppercase tracking-widest mb-1">{item.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact / Support */}
      <div className="p-6 border border-outline-variant/20 bg-surface-container-low mb-10">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-[24px] flex-shrink-0 mt-0.5" style={{ color: '#735c00' }}>support_agent</span>
          <div>
            <h3 className="font-headline-sm text-sm uppercase tracking-widest text-on-surface mb-2">Need Help?</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-3">
              Questions about your order? Please quote your reference <strong className="text-on-surface">{orderRef}</strong> in all correspondence.
            </p>
            <a
              href="mailto:support@vellutleather.shop"
              className="inline-flex items-center gap-2 font-label-md text-sm uppercase tracking-widest text-primary hover:underline underline-offset-4"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              support@vellutleather.shop
            </a>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex-1 text-center bg-on-surface text-surface-white py-4 font-label-md uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/tracking"
          className="flex-1 text-center border border-outline-variant py-4 font-label-md uppercase tracking-widest text-on-surface hover:bg-surface-container-low transition-colors"
        >
          Track My Order
        </Link>
      </div>

      {/* Legal note */}
      <p className="text-center font-body-sm text-xs text-secondary/60 mt-8 leading-relaxed">
        ZEESHAN RAZZAQ LLC · Registered in USA<br />
        1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA · All prices in USD ($) · Payments processed by Stripe
      </p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background-cream pt-32 pb-section-gap px-6 md:px-margin-desktop">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
