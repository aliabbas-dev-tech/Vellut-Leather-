'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && mounted) {
        if (session.user.email !== 'vellutleather@gmail.com') {
          router.replace('/dashboard');
        } else {
          setIsAuthenticated(true);
        }
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && mounted) {
        if (session.user.email !== 'vellutleather@gmail.com') {
          router.replace('/dashboard');
        } else {
          setIsAuthenticated(true);
        }
      } else if (!session && mounted) {
        router.replace('/account');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/account';
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p className="font-label-md text-secondary tracking-widest uppercase animate-pulse">Verifying Security Access...</p></div>;
  }

  return (
    <div className="font-body-md text-body-md overflow-x-hidden bg-background">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-white border-r border-outline-variant/20 flex flex-col py-8 px-6 gap-8 z-50">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-sm text-on-surface tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>Vellut Leather</h1>
          <p className="font-label-sm text-secondary tracking-widest uppercase">Admin Console</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className={`flex items-center gap-3 py-3 px-4 transition-all duration-200 font-medium ${pathname === '/admin' ? 'text-primary border-r-2 border-primary bg-surface-container-low' : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md">Overview</span>
          </Link>
          <Link href="/admin/orders" className={`flex items-center gap-3 py-3 px-4 transition-all duration-200 font-medium ${pathname === '/admin/orders' ? 'text-primary border-r-2 border-primary bg-surface-container-low' : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="font-label-md">Orders</span>
          </Link>
          <Link href="/admin/products" className={`flex items-center gap-3 py-3 px-4 transition-all duration-200 font-medium ${pathname === '/admin/products' ? 'text-primary border-r-2 border-primary bg-surface-container-low' : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-md">Products</span>
          </Link>
          <Link href="/admin/collections" className={`flex items-center gap-3 py-3 px-4 transition-all duration-200 font-medium ${pathname === '/admin/collections' ? 'text-primary border-r-2 border-primary bg-surface-container-low' : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">collections_bookmark</span>
            <span className="font-label-md">Collections</span>
          </Link>
          <Link href="/admin/customers" className={`flex items-center gap-3 py-3 px-4 transition-all duration-200 font-medium ${pathname === '/admin/customers' ? 'text-primary border-r-2 border-primary bg-surface-container-low' : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">group</span>
            <span className="font-label-md">Customers</span>
          </Link>
          <Link href="/admin/settings" className={`flex items-center gap-3 py-3 px-4 transition-all duration-200 font-medium ${pathname === '/admin/settings' ? 'text-primary border-r-2 border-primary bg-surface-container-low' : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md">Settings</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-8 border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-container flex items-center justify-center overflow-hidden">
              <img alt="Admin User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCei1ttjDZcrOsl7xI03UBRjmOy4q9fWgZt_cp_FVWsdi3wFxpVKu6DsNn57T9IwxYFNd5Uw9MNpr5d3B49zVDhS7FHsl_CSgTp-mBB7Hg-bR50mhjolpOI8eoum_B8x-O0SV_49pGrLBs_egxNCzfAseXt5nn2mU1m_-qYS-iUy0ZjkqHMwuGrtfoDgJ2CCQHG5dXZDaHVmG_Z-9F9njddFsciwMBC0uX6AxdbOYdnM4x_BWBpiptGURfIqMSfqR0fcK6vZhw58rw"/>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface">Alessandro V.</span>
              <span className="text-[10px] text-secondary tracking-widest uppercase">Senior Curator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 left-64 h-20 bg-surface/95 backdrop-blur-sm z-40 px-margin-desktop flex items-center justify-between border-b border-outline-variant/10">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary scale-75">search</span>
            <input className="w-full bg-transparent border-b border-outline-variant/30 py-2 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors font-label-md text-on-surface placeholder:text-secondary/50" placeholder="Search orders, clients, or SKU..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-secondary hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </button>
          <button className="text-secondary hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <button onClick={handleSignOut} title="Sign Out" className="text-secondary hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ml-64 pt-28 pb-20 px-margin-desktop min-h-screen">
        {children}
      </main>

      <footer className="ml-64 px-margin-desktop py-12 border-t border-outline-variant/10 text-secondary">
        <div className="flex justify-between items-center">
          <p className="font-label-sm tracking-widest uppercase">Vellut Leather © 2026 — Operational Excellence</p>
          <div className="flex gap-8 font-label-sm uppercase tracking-widest">
            <a className="hover:text-primary transition-colors" href="#">Security</a>
            <a className="hover:text-primary transition-colors" href="#">API Docs</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
