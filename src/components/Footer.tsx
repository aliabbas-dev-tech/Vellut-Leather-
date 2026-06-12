'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full pt-section-gap pb-8 bg-surface-container dark:bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col items-center justify-between px-6 md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-12 mb-20">

          {/* ── Brand Column ─────────────────────────────────────────── */}
          <div className="flex flex-col items-start">
            <span className="font-headline-sm text-headline-sm text-primary mb-4" style={{ color: '#735c00' }}>
              Vellut Leather
            </span>
            <p className="font-body-md text-body-md text-secondary max-w-xs mb-2">
              Crafting premium leather travel goods for the modern adventurer.
            </p>
            <p className="font-body-sm text-xs text-secondary/70 mb-1">ZEESHAN RAZZAQ LLC</p>
            <p className="font-body-sm text-xs text-secondary/70 mb-1">
              1500 N GRANT ST STE 34785, DENVER COLORADO CO 80203, USA
            </p>
            <p className="font-body-sm text-xs text-secondary/70 mb-1">
              <a href="mailto:support@vellutleather.shop" className="hover:text-primary transition-colors">support@vellutleather.shop</a>
            </p>
            <p className="font-body-sm text-xs text-secondary/70 mb-6">
              <a href="tel:+13078889612" className="hover:text-primary transition-colors">+1 307 888 9612</a>
            </p>
            <div className="flex gap-4">
              <a
                aria-label="Vellut Leather on Instagram"
                className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                href="https://www.instagram.com/vellutleather"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">photo_camera</span>
              </a>
              <a
                aria-label="Vellut Leather on Facebook"
                className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                href="https://www.facebook.com/vellutleather"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">public</span>
              </a>
              <a
                aria-label="Email Vellut Leather customer support"
                className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                href="mailto:support@vellutleather.shop"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">mail</span>
              </a>
            </div>
          </div>

          {/* ── Shop Categories Column ────────────────────────────────── */}
          <nav aria-label="Shop categories">
            <h2 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface mb-4">
              Shop
            </h2>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              <li>
                <Link
                  href="/shop-all"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Shop All Leather Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/weekenders"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Premium Travel Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/duffles"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Luxury Duffel Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-guide"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Leather Gift Guide
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── Navigation Column ─────────────────────────────────────── */}
          <nav aria-label="Company navigation">
            <h2 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface mb-4">
              Company
            </h2>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              <li>
                <Link
                  href="/about"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary text-sm font-label-md tracking-widests uppercase hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-global"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/tracking"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Order Tracking
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── Legal Column ──────────────────────────────────────────── */}
          <nav aria-label="Legal information">
            <h2 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface mb-4">
              Legal
            </h2>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-global"
                  className="text-secondary text-sm font-label-md tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </nav>

        </div>

        {/* ── Bottom Bar ──────────────────────────────────────────────── */}
        <div className="w-full border-t border-outline-variant/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            © 2026 ZEESHAN RAZZAQ LLC. All Rights Reserved.
          </span>
          <div className="flex items-center gap-8">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
              United States | USD $
            </span>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary opacity-50" aria-hidden="true">payments</span>
              <span className="material-symbols-outlined text-secondary opacity-50" aria-hidden="true">credit_card</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
