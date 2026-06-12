import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  const { data, error } = await supabase.from('collections').select('*').order('created_at', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newCollection = {
      name: body.name,
      description: body.description,
      image_url: body.image_url,
      is_featured: body.is_featured || false,
    };

    const { data, error } = await supabase.from('collections').insert([newCollection]).select().single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add collection' }, { status: 500 });
  }
}
