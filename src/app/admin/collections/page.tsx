'use client';
import { useState, useEffect } from 'react';

interface Collection {
  id: string;
  name: string;
  description: string;
  image_url: string;
  is_featured: boolean;
}

export default function CollectionsManagement() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/collections');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCollections(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleEditClick = (collection: Collection) => {
    setEditingId(collection.id);
    setName(collection.name);
    setDescription(collection.description || '');
    setImageUrl(collection.image_url || '');
    setIsFeatured(collection.is_featured);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setImageUrl('');
    setIsFeatured(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    
    try {
      const res = await fetch(`/api/collections/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCollections();
      } else {
        alert('Failed to delete collection');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/collections/${editingId}` : '/api/collections';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          image_url: imageUrl,
          is_featured: isFeatured
        })
      });
      
      if (res.ok) {
        handleCancelEdit(); // Resets form
        fetchCollections();
      } else {
        alert(editingId ? 'Failed to update collection' : 'Failed to add collection');
      }
    } catch (err) {
      console.error(err);
    }
    
    setAdding(false);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-md text-on-surface mb-2">Collections Management</h2>
          <p className="font-body-md text-secondary">Organize your products into featured collections for your homepage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Add/Edit Form */}
        <section className="lg:col-span-4 bg-surface-white border border-outline-variant/10 p-8">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant/10 pb-4">
            <h3 className="font-headline-sm text-on-surface">{editingId ? 'Edit Collection' : 'Create Collection'}</h3>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-secondary hover:text-error text-sm uppercase tracking-widest font-label-sm">Cancel</button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Collection Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Summer Essentials" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="A brief description of this collection..." />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Banner Image URL</label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="url" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input 
                id="isFeatured" 
                type="checkbox" 
                checked={isFeatured} 
                onChange={e => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <label htmlFor="isFeatured" className="font-body-md text-on-surface cursor-pointer select-none">Feature on Homepage</label>
            </div>

            <button disabled={adding} type="submit" className="mt-4 bg-on-surface text-surface py-4 font-label-md uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50">
              {adding ? 'Saving...' : (editingId ? 'Update Collection' : 'Create Collection')}
            </button>
          </form>
        </section>

        {/* Current Collections */}
        <section className="lg:col-span-8 bg-surface-white border border-outline-variant/10 p-0 overflow-hidden">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-label-md text-on-surface uppercase tracking-widest">Active Collections</h3>
            <span className="text-secondary font-label-sm">{collections.length} Collections</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-label-sm text-secondary uppercase tracking-widest bg-surface-container-low/50">
                  <th className="px-6 py-4 font-semibold w-16">Image</th>
                  <th className="px-6 py-4 font-semibold">Name & Desc</th>
                  <th className="px-6 py-4 font-semibold text-center">Featured</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-secondary">Loading collections...</td></tr>
                ) : collections.map(collection => (
                  <tr key={collection.id} className="hover:bg-surface-container-low/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-surface-variant overflow-hidden">
                        {collection.image_url ? (
                           <img src={collection.image_url} alt={collection.name} className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-secondary">
                             <span className="material-symbols-outlined text-xl">image</span>
                           </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-body-md font-medium text-on-surface">{collection.name}</span>
                        <span className="text-xs text-secondary truncate max-w-[250px]">{collection.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {collection.is_featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEditClick(collection)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary transition-colors hover:bg-primary-container rounded">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(collection.id)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-error transition-colors hover:bg-error-container rounded">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
