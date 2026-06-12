import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('collections')
      .update({
        name: body.name,
        description: body.description,
        image_url: body.image_url,
        is_featured: body.is_featured,
      })
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update collection' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', resolvedParams.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete collection' }, { status: 500 });
  }
}
