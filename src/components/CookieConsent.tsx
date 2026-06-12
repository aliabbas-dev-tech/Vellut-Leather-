'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('vl-cookie-consent');
      if (!consent) {
        // Small delay so it doesn't flash on first render
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available (SSR safety)
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem('vl-cookie-consent', 'accepted'); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem('vl-cookie-consent', 'declined'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[200] animate-fade-in"
      style={{ backgroundColor: 'rgba(253, 251, 247, 0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-margin-desktop py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5" style={{ color: '#735c00' }}>cookie</span>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-2xl">
            We use <strong className="text-on-surface">strictly necessary cookies</strong> to power your shopping cart and checkout. 
            We also use optional analytics cookies to improve your experience — only with your consent.{' '}
            <Link href="/privacy#cookies" className="text-primary hover:underline underline-offset-2 whitespace-nowrap">
              Cookie Policy
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
          <button
            onClick={decline}
            className="font-label-md text-xs uppercase tracking-widest text-secondary hover:text-on-surface transition-colors px-3 py-2"
          >
            Decline Optional
          </button>
          <button
            onClick={accept}
            className="font-label-md text-xs uppercase tracking-widest bg-on-surface text-white px-6 py-3 hover:bg-primary transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
