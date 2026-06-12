'use client';
import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    setLoading(true);
    // Simulate lookup — in production this would query your orders API
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-3xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-4 border-b border-outline-variant/30 pb-6" style={{ color: '#735c00' }}>
        Order Tracking
      </h1>
      <p className="font-body-md text-on-surface-variant mb-12">
        Enter your order number and the email address used at checkout to track your shipment.
        A tracking number will also be sent to your email once your order is dispatched.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-surface-container-low border border-outline-variant/20 p-8 md:p-12">
          <div className="flex flex-col gap-2">
            <label htmlFor="order-number" className="font-label-md uppercase tracking-widest text-secondary text-xs">
              Order Number *
            </label>
            <input
              id="order-number"
              type="text"
              required
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
              placeholder="e.g. VL-20260001"
              className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="track-email" className="font-label-md uppercase tracking-widest text-secondary text-xs">
              Email Address *
            </label>
            <input
              id="track-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 font-label-md uppercase tracking-widest hover:bg-[#5a4800] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            )}
            {loading ? 'Searching...' : 'Track My Order'}
          </button>
        </form>
      ) : (
        <div className="bg-surface-container-low border border-outline-variant/20 p-8 md:p-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-4xl text-primary">local_shipping</span>
            <div>
              <h2 className="font-headline-sm text-xl text-on-surface">Order #{orderNumber}</h2>
              <p className="font-body-md text-secondary text-sm">Tracking information for {email}</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-sm">
            <p className="font-body-md text-amber-800 text-sm">
              <strong>Your order is being handcrafted.</strong> As all Vellut Leather pieces are made to order, please allow 7–14 business days for production. 
              Once dispatched, you will receive a DHL/FedEx tracking link via email at <strong>{email}</strong>.
            </p>
          </div>
          <p className="mt-6 font-body-sm text-secondary text-sm">
            Questions? Contact us at{' '}
            <a href="mailto:support@vellutleather.com" className="text-primary hover:underline">support@vellutleather.com</a>
          </p>
          <button
            onClick={() => { setSubmitted(false); setOrderNumber(''); setEmail(''); }}
            className="mt-6 font-label-md uppercase tracking-widest text-secondary hover:text-primary transition-colors text-sm"
          >
            ← Track Another Order
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-16 border-t border-outline-variant/20 pt-12">
        <h3 className="font-headline-sm text-lg text-on-surface mb-6 uppercase tracking-widest">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'schedule', title: 'Handcrafted Time', body: '7–14 business days production before dispatch.' },
            { icon: 'flight', title: 'Delivery Time', body: '3–7 business days after dispatch via DHL / FedEx.' },
            { icon: 'support_agent', title: 'Need Help?', body: 'Email support@vellutleather.com with your order number.' }
          ].map(item => (
            <div key={item.title} className="flex flex-col gap-2 p-6 border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
              <h4 className="font-headline-sm text-sm text-on-surface uppercase tracking-widest">{item.title}</h4>
              <p className="font-body-md text-secondary text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
