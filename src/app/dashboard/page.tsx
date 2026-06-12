'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CustomerDashboard() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && mounted) {
        setEmail(session.user.email || '');
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && mounted) {
        setEmail(session.user.email || '');
      } else if (!session && mounted) {
        router.push('/account');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col pt-[140px] bg-background-cream">
      <Header />
      <div className="container px-6 md:px-margin-desktop py-section-gap max-w-[1000px] mx-auto flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant/30 pb-8 mb-12 gap-4">
          <div>
            <h1 className="font-display-lg text-primary mb-2" style={{ color: '#735c00' }}>My Dashboard</h1>
            <p className="font-body-md text-on-surface-variant">Welcome back, {email}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-2 border border-outline-variant text-secondary font-label-md hover:bg-surface-white transition-colors"
            >
              Home Page
            </button>
            <button 
              onClick={handleSignOut}
              className="px-6 py-2 bg-primary text-white font-label-md hover:bg-on-surface transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-white p-8 border border-outline-variant/10 flex flex-col justify-between min-h-[250px]">
            <div>
              <h3 className="font-headline-sm text-on-surface mb-2">Order History</h3>
              <p className="font-body-md text-secondary mb-6">Track your bespoke creations and view past purchases.</p>
            </div>
            <button className="bg-surface-container-low text-secondary py-3 px-6 font-label-md w-fit">
              You have no active orders.
            </button>
          </div>

          <div className="bg-surface-white p-8 border border-outline-variant/10 flex flex-col justify-between min-h-[250px]">
            <div>
              <h3 className="font-headline-sm text-on-surface mb-2">Account Settings</h3>
              <p className="font-body-md text-secondary mb-6">Manage your shipping addresses and communication preferences.</p>
            </div>
            <button className="bg-surface-container text-secondary py-3 px-6 font-label-md w-fit hover:text-primary transition-colors">
              Edit Details
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
