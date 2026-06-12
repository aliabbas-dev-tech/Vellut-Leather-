'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function BackButton({ href, label = 'Back' }: { href?: string, label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    if (href) {
      setLoading(true);
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={loading}
      className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-sm uppercase tracking-widest mb-8 group cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
      ) : (
        <span className="material-symbols-outlined text-[16px] transform group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
      )}
      <span>{loading ? 'Loading...' : label}</span>
    </button>
  );
}
