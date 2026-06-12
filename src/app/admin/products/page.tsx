'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/db';

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Base price
  const [priceSmall, setPriceSmall] = useState('0');
  const [priceMedium, setPriceMedium] = useState('0');
  const [priceLarge, setPriceLarge] = useState('0');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [availableCollections, setAvailableCollections] = useState<any[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAvailableCollections(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCollections();
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description || '');
    setPrice(product.price.toString());
    setCategory(product.category);
    setImageUrl(product.imageUrl || '');
    
    // Set size pricing if exists
    if (product.size_pricing) {
      setPriceSmall(product.size_pricing.Small?.toString() || '0');
      setPriceMedium(product.size_pricing.Medium?.toString() || '0');
      setPriceLarge(product.size_pricing.Large?.toString() || '0');
    } else {
      setPriceSmall('0');
      setPriceMedium('0');
      setPriceLarge('0');
    }

    // @ts-ignore
    setSelectedCollections(product.product_collections?.map((c: any) => c.collection_id) || []);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImageUrl('');
    setPriceSmall('0');
    setPriceMedium('0');
    setPriceLarge('0');
    setSelectedCollections([]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
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
      const url = editingId ? `/api/products/${editingId}` : '/api/products';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          category,
          imageUrl,
          collection_ids: selectedCollections,
          size_pricing: {
            Small: parseFloat(priceSmall) || 0,
            Medium: parseFloat(priceMedium) || 0,
            Large: parseFloat(priceLarge) || 0
          }
        })
      });
      
      if (res.ok) {
        handleCancelEdit(); // Resets form
        fetchProducts();
      } else {
        alert(editingId ? 'Failed to update product' : 'Failed to add product');
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
          <h2 className="font-headline-md text-on-surface mb-2">Product Management</h2>
          <p className="font-body-md text-secondary">Manage your inventory and add new handcrafted pieces.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Add/Edit Product Form */}
        <section className="lg:col-span-4 bg-surface-white border border-outline-variant/10 p-8">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant/10 pb-4">
            <h3 className="font-headline-sm text-on-surface">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-secondary hover:text-error text-sm uppercase tracking-widest font-label-sm">Cancel</button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Product Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="e.g. The Heritage Weekender" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Description</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Premium full-grain leather..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-secondary">Price (USD)</label>
                <input required value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="0.00" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-secondary">Category</label>
                <input required value={category} onChange={e => setCategory(e.target.value)} type="text" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Duffle" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Size Pricing (Small, Medium, Large)</label>
              <div className="grid grid-cols-3 gap-2">
                <input value={priceSmall} onChange={e => setPriceSmall(e.target.value)} type="number" step="0.01" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Small $" title="Small Size Price" />
                <input value={priceMedium} onChange={e => setPriceMedium(e.target.value)} type="number" step="0.01" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Medium $" title="Medium Size Price" />
                <input value={priceLarge} onChange={e => setPriceLarge(e.target.value)} type="number" step="0.01" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Large $" title="Large Size Price" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-secondary">Image URL</label>
              <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="url" className="border border-outline-variant/30 bg-surface-container-low p-3 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
            </div>

            {availableCollections.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-outline-variant/10 pt-4 mt-2">
                <label className="font-label-sm uppercase tracking-widest text-secondary">Assign to Collections</label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {availableCollections.map(collection => (
                    <label key={collection.id} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-primary cursor-pointer"
                        checked={selectedCollections.includes(collection.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCollections([...selectedCollections, collection.id]);
                          } else {
                            setSelectedCollections(selectedCollections.filter(id => id !== collection.id));
                          }
                        }}
                      />
                      <span className="font-body-md text-on-surface">{collection.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button disabled={adding} type="submit" className="mt-4 bg-on-surface text-surface py-4 font-label-md uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50">
              {adding ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
            </button>
          </form>
        </section>

        {/* Current Inventory */}
        <section className="lg:col-span-8 bg-surface-white border border-outline-variant/10 p-0 overflow-hidden">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-label-md text-on-surface uppercase tracking-widest">Current Inventory</h3>
            <span className="text-secondary font-label-sm">{products.length} Products</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-label-sm text-secondary uppercase tracking-widest bg-surface-container-low/50">
                  <th className="px-6 py-4 font-semibold w-16">Image</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold text-right">Price</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-secondary">Loading inventory...</td></tr>
                ) : products.map(product => (
                  <tr key={product.id} className="hover:bg-surface-container-low/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-surface-variant overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-body-md font-medium text-on-surface">{product.name}</span>
                        <span className="text-xs text-secondary truncate max-w-[200px]">{product.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-on-surface text-right">${Number(product.price).toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEditClick(product)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary transition-colors hover:bg-primary-container rounded">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="w-8 h-8 flex items-center justify-center text-secondary hover:text-error transition-colors hover:bg-error-container rounded">
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
