import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    
    const updates: any = {};
    if (body.trackingNumber !== undefined) {
      updates.trackingNumber = body.trackingNumber;
      if (body.trackingNumber) updates.status = 'Shipped';
    }
    if (body.status !== undefined) {
      updates.status = body.status;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update order' }, { status: 500 });
  }
}
