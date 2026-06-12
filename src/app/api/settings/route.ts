import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is not found
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.value || null);
}

export async function PUT(request: Request) {
  try {
    const { id, value } = await request.json();

    if (!id || !value) {
      return NextResponse.json({ error: 'Missing id or value' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ id, value }, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data.value);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
