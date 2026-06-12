'use client';
import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // Mock submission function
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you, your message has been sent!');
    }, 800);
  };

  return (
    <div className="px-6 md:px-margin-desktop py-16 max-w-4xl mx-auto animate-fade-in text-on-surface">
      <BackButton />
      <h1
        className="font-display-lg text-4xl md:text-5xl text-primary mb-8 border-b border-outline-variant/30 pb-6"
        style={{ color: '#735c00' }}
      >
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body-md text-base leading-relaxed">

        {/* Business Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-headline-sm text-xl text-on-surface mb-4 uppercase tracking-widest">Business Details</h2>
            <div className="space-y-3 text-on-surface-variant">
              <p><strong className="text-on-surface">Business Name:</strong> ZEESHAN RAZZAQ LLC</p>
              <p><strong className="text-on-surface">Registered in:</strong> USA</p>
              <p>
                <strong className="text-on-surface">Registered Address:</strong><br />
                1500 N GRANT ST STE 34785<br />
                DENVER COLORADO<br />
                CO 80203<br />
                USA
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-headline-sm text-xl text-on-surface mb-4 uppercase tracking-widest">Get In Touch</h2>
            <div className="space-y-3 text-on-surface-variant">
              <p>
                <strong className="text-on-surface">Email:</strong>{' '}
                <a href="mailto:support@vellutleather.shop" className="text-primary hover:underline underline-offset-4">
                  support@vellutleather.shop
                </a>
              </p>
              <p>
                <strong className="text-on-surface">Phone:</strong>{' '}
                <a href="tel:+13078889612" className="text-primary hover:underline underline-offset-4">
                  +1 307 888 9612
                </a>
              </p>
              <div className="p-4 bg-surface-container-low border border-outline-variant/20 text-sm leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] mt-0.5 flex-shrink-0" style={{ color: '#735c00' }}>schedule</span>
                  <span>We offer <strong className="text-on-surface">email and phone support</strong>, typically responding within 24 hours. Please include your order number in any correspondence.</span>
                </p>
              </div>
              <p><strong className="text-on-surface">Order Enquiries:</strong> Please include your order number in any correspondence.</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-3 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]" style={{ color: '#735c00' }}>verified</span>
              <span>US Registered Company (ZEESHAN RAZZAQ LLC)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]" style={{ color: '#735c00' }}>lock</span>
              <span>Payments secured by Stripe — PCI-DSS compliant</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]" style={{ color: '#735c00' }}>package_2</span>
              <span>14-day return right after receiving your goods</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="font-headline-sm text-xl text-on-surface mb-6 uppercase tracking-widest">Send a Message</h2>

          {status === 'success' ? (
            <div className="p-8 border border-green-200 bg-green-50 text-center animate-fade-in">
              <span className="material-symbols-outlined text-green-600 text-4xl mb-4 block">check_circle</span>
              <h3 className="font-headline-sm text-xl text-green-800 mb-2">Message Sent</h3>
              <p className="text-green-700 text-sm">
                Thank you for reaching out. We'll respond to <strong>{formData.email || 'your email'}</strong> within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 font-label-md uppercase tracking-widest text-sm text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-label-md uppercase tracking-widest text-secondary text-xs">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-label-md uppercase tracking-widest text-secondary text-xs">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="font-label-md uppercase tracking-widest text-secondary text-xs">
                  Subject *
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full appearance-none bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface cursor-pointer"
                >
                  <option value="">Select a subject...</option>
                  <option value="Order Enquiry">Order Enquiry</option>
                  <option value="Return / Refund Request">Return / Refund Request</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Custom Order">Custom Order</option>
                  <option value="Shipping & Delivery">Shipping &amp; Delivery</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-label-md uppercase tracking-widest text-secondary text-xs">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full bg-transparent border border-outline-variant/30 py-3 px-4 focus:outline-none focus:border-primary transition-colors text-on-surface resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-4 font-label-md uppercase tracking-widest hover:bg-[#5a4800] transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
