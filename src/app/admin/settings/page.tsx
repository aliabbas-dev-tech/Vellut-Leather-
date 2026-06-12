'use client';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Hero Settings State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings?id=hero');
        const data = await res.json();
        if (data) {
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
          setImageUrl(data.imageUrl || '');
          setCtaText(data.ctaText || '');
          setCtaUrl(data.ctaUrl || '');
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'hero',
          value: { title, subtitle, imageUrl, ctaText, ctaUrl }
        })
      });
      
      if (res.ok) {
        alert("Hero settings saved successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
    
    setSaving(false);
  };

  if (loading) {
    return <div className="p-12 text-center text-secondary">Loading settings...</div>;
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-md text-on-surface mb-2">System Settings</h2>
          <p className="font-body-md text-secondary">Manage global website configurations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 max-w-4xl">
        
        {/* Hero Section Form */}
        <section className="bg-surface-white border border-outline-variant/10 p-8">
          <h3 className="font-headline-sm text-on-surface mb-6 border-b border-outline-variant/10 pb-4">Hero Page Customization</h3>
          <form onSubmit={handleSaveHero} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Main Title</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Timeless Craftsmanship in Every Stitch." />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Subtitle / Eyebrow</label>
              <input required value={subtitle} onChange={e => setSubtitle(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="The Heritage Collection" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Background Image URL</label>
              <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="url" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-secondary">Call-To-Action (CTA) Text</label>
                <input required value={ctaText} onChange={e => setCtaText(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Shop The Weekender" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-secondary">CTA Link (URL or #id)</label>
                <input required value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="#collection or /shop" />
              </div>
            </div>

            <button disabled={saving} type="submit" className="mt-4 bg-on-surface text-surface py-4 font-label-md uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50 w-full md:w-auto md:self-start md:px-12">
              {saving ? 'Saving...' : 'Save Hero Settings'}
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
