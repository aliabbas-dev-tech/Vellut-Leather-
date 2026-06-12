'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { supabase } from '@/utils/supabase';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import { usePathname } from 'next/navigation';

// Primary category pages — used in both desktop nav and mobile drawer
const PRIMARY_NAV_LINKS = [
  { href: '/shop-all',   label: 'Shop All' },
  { href: '/weekenders', label: 'Premium Travel Bags' },
  { href: '/duffles',    label: 'Luxury Duffel Bags' },
  { href: '/gift-guide', label: 'Gift Guide' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Check session for header links
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserEmail(session.user.email || null);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserEmail(session.user.email || null);
      } else {
        setUserEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getAccountLink = () => {
    if (!userEmail) return '/account';
    return userEmail === 'vellutleather@gmail.com' ? '/admin' : '/dashboard';
  };

  const getAccountText = () => {
    if (!userEmail) return 'ACCOUNT';
    return userEmail === 'vellutleather@gmail.com' ? 'ADMIN' : 'DASHBOARD';
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 border-b"
        style={{
          backgroundColor: 'rgba(253, 251, 247, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderColor: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="flex flex-col items-center w-full px-6 md:px-margin-desktop py-4">

          {/* ── Utility Bar (desktop only) ──────────────────────────────── */}
          <div className="hidden md:flex justify-between w-full mb-4 border-b border-outline-variant/10 pb-2">
            <nav aria-label="Utility navigation">
              <ul className="flex gap-8 list-none m-0 p-0">
                <li>
                  <Link
                    className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    href="/shipping-global"
                  >
                    Global Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    href="/gift-guide"
                  >
                    Gift Guide
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="Account navigation">
              <ul className="flex gap-8 list-none m-0 p-0">
                <li>
                  <Link
                    className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    href="/tracking"
                  >
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    href={getAccountLink()}
                  >
                    {mounted ? getAccountText() : 'ACCOUNT'}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ── Main Header Row ─────────────────────────────────────────── */}
          <div className="flex justify-between items-center w-full relative h-10">

            {/* Left: Burger + Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="cursor-pointer active:opacity-70 p-2 z-50"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                <span className="material-symbols-outlined text-on-surface" aria-hidden="true">menu</span>
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="cursor-pointer active:opacity-70 p-2 z-50"
                aria-label="Search products"
              >
                <span className="material-symbols-outlined text-on-surface" aria-hidden="true">search</span>
              </button>
            </div>

            {/* Centre: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 mt-1">
              <Link href="/" aria-label="Vellut Leather — return to homepage">
                <img
                  src="/vl-logo-transparent.png"
                  alt="Vellut Leather — Handcrafted Premium Leather Travel Goods"
                  className="h-14 md:h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right: Cart */}
            <div className="flex items-center gap-4 z-50">
              <button
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer active:opacity-70 p-2 relative inline-flex"
                aria-label={`Shopping cart${mounted && cartItemCount > 0 ? `, ${cartItemCount} item${cartItemCount > 1 ? 's' : ''}` : ''}`}
              >
                <span className="material-symbols-outlined text-on-surface" aria-hidden="true">shopping_cart</span>
                {mounted && cartItemCount > 0 && (
                  <span className="absolute top-1 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4" aria-hidden="true">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── Desktop Primary Navigation ──────────────────────────────── */}
          {/* Visible inline nav so Googlebot indexes these category links   */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex w-full justify-center mt-3 border-t border-outline-variant/10 pt-3"
          >
            <ul className="flex items-center gap-10 list-none m-0 p-0">
              {PRIMARY_NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`font-label-sm text-label-sm uppercase tracking-widest transition-colors hover:text-primary ${
                      pathname === href ? 'text-primary border-b border-primary pb-0.5' : 'text-on-surface-variant'
                    }`}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </header>

      {/* ── Mobile Drawer Overlay ──────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <div className="relative w-[80%] max-w-[320px] h-full bg-background-cream shadow-2xl flex flex-col">
            <div className="p-6 flex justify-end border-b border-outline-variant/20">
              <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Close navigation menu">
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Primary category links */}
            <nav
              id="mobile-nav"
              aria-label="Main navigation"
              className="p-8 border-b border-outline-variant/20"
            >
              <ul className="flex flex-col gap-6 list-none m-0 p-0 font-headline-sm text-xl tracking-wide text-on-surface">
                <li>
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors block">
                    Home
                  </Link>
                </li>
                {PRIMARY_NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-primary transition-colors block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Secondary / utility links */}
            <nav aria-label="Account and utility navigation" className="p-8">
              <ul className="flex flex-col gap-6 list-none m-0 p-0 font-headline-sm text-xl tracking-wide text-on-surface">
                <li>
                  <Link href={getAccountLink()} onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors block">
                    {mounted
                      ? getAccountText() === 'ADMIN'
                        ? 'Admin Dashboard'
                        : getAccountText() === 'DASHBOARD'
                        ? 'My Dashboard'
                        : 'My Account'
                      : 'My Account'}
                  </Link>
                </li>
                <li>
                  <Link href="/tracking" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors block">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-global" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors block">
                    Global Shipping
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-auto p-8 border-t border-outline-variant/20">
              <span className="font-label-sm uppercase tracking-widest text-secondary">© 2026 Vellut Leather</span>
            </div>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
