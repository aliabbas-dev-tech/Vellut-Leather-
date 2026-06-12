import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_collections (
        collections (
          id,
          name
        )
      )
    `);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newProduct = {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      imageUrl: body.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7XxYIOoLtAVepX37UOiTmBMk_AQLG25JeTG6HQnJ0c85vB2y6f0-KFyO4auvzRSiWc0QmUJois9_NSJn77c1iacooQl-cVU4BC9gqdfel8ecxI6L3M2EwKZHAuITsfX4KzzocoF9IXfOX-xHidK3lKCVratul2m5K04vKUW63a5tug-ZkvZfxd6m538Djk-2YV24srN_r1SmvyReE-3vrjvuK8qfgLqe2X3qpjF7N2yAOqVFbdijl8niRS-AvXIu80S7Wd0xxpgU',
      size_pricing: body.size_pricing || { Small: 0, Medium: 0, Large: 0 },
    };

    const { data: productData, error: productError } = await supabase.from('products').insert([newProduct]).select().single();

    if (productError) throw productError;

    if (body.collection_ids && body.collection_ids.length > 0) {
      const productCollections = body.collection_ids.map((id: string) => ({
        product_id: productData.id,
        collection_id: id
      }));
      const { error: collectionsError } = await supabase.from('product_collections').insert(productCollections);
      if (collectionsError) console.error("Failed to link collections:", collectionsError);
    }

    return NextResponse.json(productData, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add product' }, { status: 500 });
  }
}
