'use client';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Sequence of animation stages
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => {
      setStage(3);
      // Unlock body scroll as preloader fades out
      document.body.style.overflow = '';
    }, 4500);
    const t4 = setTimeout(() => setStage(4), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = '';
    };
  }, []);

  // Stage 4: Unmount component completely
  if (stage === 4) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background-cream flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        stage >= 3
          ? 'opacity-0 -translate-y-full blur-sm'
          : 'opacity-100 translate-y-0 blur-none'
      }`}
    >
      <div className="flex flex-col items-center relative">
        
        {/* Stage 1: Logo fades in and scales up */}
        <div
          className={`h-24 md:h-32 transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/vl-logo-transparent.png"
            alt="Vellut Leather Logo"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Stage 2: Horizontal Line scales x from 0 to 100% */}
        <div
          className={`w-full h-[1px] bg-secondary/20 mt-8 mb-6 origin-center transition-all duration-800 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            stage >= 2 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
        />

        {/* Stage 2: Text fades in and slides up */}
        <div className="overflow-hidden h-8 flex items-center justify-center">
          <span
            className={`text-on-surface font-headline-sm uppercase tracking-[0.2em] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            VELLUT LEATHER
          </span>
        </div>

      </div>
    </div>
  );
}
