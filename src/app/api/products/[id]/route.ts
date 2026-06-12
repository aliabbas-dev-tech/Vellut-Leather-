import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    
    const { data: productData, error: productError } = await supabase
      .from('products')
      .update({
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        category: body.category,
        imageUrl: body.imageUrl,
        size_pricing: body.size_pricing,
      })
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (productError) throw productError;

    if (body.collection_ids !== undefined) {
      // First delete existing relations
      await supabase.from('product_collections').delete().eq('product_id', resolvedParams.id);
      
      // Then insert new ones if any
      if (body.collection_ids.length > 0) {
        const productCollections = body.collection_ids.map((id: string) => ({
          product_id: resolvedParams.id,
          collection_id: id
        }));
        await supabase.from('product_collections').insert(productCollections);
      }
    }

    return NextResponse.json(productData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', resolvedParams.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
