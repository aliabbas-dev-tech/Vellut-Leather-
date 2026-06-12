'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';

// Use environment variable for Publishable Key strictly.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || items.length === 0) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Submit the elements (required before confirmPayment if using PaymentElement)
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || 'Payment submission failed.');
        setLoading(false);
        fetch('/api/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: formData.name,
            email: formData.email,
            errorReason: submitError.message
          })
        }).catch(err => console.error('Failed to notify payment failure', err));
        return;
      }

      // 2. Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/checkout/success',
          receipt_email: formData.email,
          payment_method_data: {
            billing_details: {
              name: formData.name,
              email: formData.email,
            }
          }
        },
        redirect: 'if_required' // Allows us to save the order locally if no redirect is mandated
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed.');
        setLoading(false);
        fetch('/api/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: formData.name,
            email: formData.email,
            errorReason: error.message
          })
        }).catch(err => console.error('Failed to notify payment failure', err));
        return;
      }

      // 3. Save order to our backend after successful charge
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          total: subtotal,
          items: items.map(i => ({ productId: i.id, quantity: i.quantity }))
        })
      });

      if (!response.ok) throw new Error('Order creation failed on our end.');

      const orderData = await response.json().catch(() => ({}));
      const orderRef = orderData?.id ? `#VL-${String(orderData.id).slice(-4).toUpperCase()}` : '#VL-CONF';

      // 4. Send order confirmation email to customer (fire-and-forget)
      fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          orderRef,
          items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
          total: subtotal,
          currency: 'USD',
        }),
      }).catch(err => console.warn('[Checkout] Could not send confirmation email:', err));

      // 5. Complete checkout flow
      clearCart();
      router.push('/checkout/success');

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 font-body-md rounded">
          {errorMessage}
        </div>
      )}

      {/* Shipping Details */}
      <div className="bg-surface-container-lowest p-8 border border-outline-variant/30">
        <h3 className="font-headline-sm text-2xl mb-6">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block font-label-md uppercase tracking-widest text-secondary mb-2">Email Address</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors" placeholder="your@email.com" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-label-md uppercase tracking-widest text-secondary mb-2">Full Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-label-md uppercase tracking-widest text-secondary mb-2">Street Address</label>
            <input required type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors" placeholder="123 Luxury Ave" />
          </div>
          <div className="col-span-1">
            <label className="block font-label-md uppercase tracking-widest text-secondary mb-2">City</label>
            <input required type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors" placeholder="New York" />
          </div>
          <div className="col-span-1">
            <label className="block font-label-md uppercase tracking-widest text-secondary mb-2">Postal Code</label>
            <input required type="text" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors" placeholder="10001" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-label-md uppercase tracking-widest text-secondary mb-2">Country</label>
            <input required type="text" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors" placeholder="United States" />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-surface-container-lowest p-8 border border-outline-variant/30">
        <h3 className="font-headline-sm text-2xl mb-6">Payment Method</h3>
        <div className="p-4 border border-outline-variant/30 bg-surface-container">
          <PaymentElement options={{
            layout: 'tabs',
          }} />
        </div>
        {/* Secured by Stripe badge */}
        <div className="flex items-center justify-center gap-2 mt-4 text-secondary">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">lock</span>
          <span className="font-label-sm text-[11px] uppercase tracking-widest">Secured by Stripe · 256-bit SSL Encryption · PCI-DSS Compliant</span>
        </div>
      </div>

      {/* Legal consent + Pay button */}
      <div className="flex flex-col gap-3">
        <p className="font-body-sm text-[11px] text-secondary text-center leading-relaxed">
          By placing your order you agree to our{' '}
          <a href="/terms" target="_blank" className="text-primary hover:underline underline-offset-2">Terms of Service</a>
          {', '}
          <a href="/returns" target="_blank" className="text-primary hover:underline underline-offset-2">Return &amp; Refund Policy</a>
          {', and '}
          <a href="/shipping-global" target="_blank" className="text-primary hover:underline underline-offset-2">Shipping Policy</a>.
          {' '}You have a 14-day right to cancel after receiving your goods.
        </p>
        <button
          type="submit"
          disabled={!stripe || loading || items.length === 0}
          className="w-full bg-primary text-white py-5 font-label-md uppercase tracking-widest hover:bg-[#5a4800] transition-colors disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">lock</span>
          )}
          {loading ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
        </button>
        <p className="font-body-sm text-[10px] text-secondary/60 text-center">
          All prices in USD ($) · ZEESHAN RAZZAQ LLC · Registered in USA
        </p>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length > 0) {
      // Create PaymentIntent as soon as the page loads
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(subtotal * 100) }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.error("Error creating PaymentIntent:", error));
    }
  }, [mounted, items, subtotal]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background-cream pt-32 pb-section-gap px-6 md:px-margin-desktop">
      <div className="w-full animate-fade-in">
        <h1 className="font-display-md text-4xl text-on-surface mb-12">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body-lg text-secondary mb-8">Your cart is empty.</p>
            <Link href="/" className="inline-block border border-outline-variant px-8 py-4 font-label-md uppercase tracking-widest text-on-surface hover:bg-primary hover:text-white transition-colors">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Form Column */}
            <div className="lg:col-span-7">
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="flex justify-center items-center py-24">
                  <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
                </div>
              )}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-low p-8 sticky top-32 border border-outline-variant/20">
                <h3 className="font-headline-sm text-2xl mb-8">Order Summary</h3>

                <div className="flex flex-col gap-6 mb-8 border-b border-outline-variant/20 pb-8 max-h-[400px] overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-background-cream flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <div className="flex justify-between">
                          <span className="font-headline-sm text-sm line-clamp-1">{item.name}</span>
                          <span className="font-label-md">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <span className="text-sm text-secondary">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-secondary">
                    <span className="font-body-md">Subtotal</span>
                    <span className="font-body-md">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span className="font-body-md">Shipping</span>
                    <span className="font-body-md uppercase tracking-widest text-xs">Complimentary</span>
                  </div>
                  <div className="h-[1px] w-full bg-outline-variant/30 my-2" />
                  <div className="flex justify-between text-on-surface">
                    <span className="font-headline-sm text-lg">Total</span>
                    <span className="font-headline-sm text-xl">${subtotal.toFixed(2)} USD</span>
                  </div>
                  <a
                    href="/returns"
                    target="_blank"
                    className="font-body-sm text-[10px] text-secondary hover:text-primary transition-colors underline underline-offset-2 text-center"
                  >
                    14-day cancellation &amp; return right
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
