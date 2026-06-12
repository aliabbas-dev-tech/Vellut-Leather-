import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newOrder = {
      customerName: body.customerName,
      email: body.email,
      total: body.total,
      status: 'Pending',
      date: new Date().toISOString(),
      items: body.items, // JSONB column
      trackingNumber: null,
    };

    const { data, error } = await supabase.from('orders').insert([newOrder]).select().single();

    if (error) throw error;

    // --- Send Email Notifications via Resend ---
    const adminEmail = process.env.ADMIN_EMAIL || 'vellutleather@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    // 1. Email to Admin
    const { error: adminEmailError } = await resend.emails.send({
      from: `Vellut Leather <${senderEmail}>`,
      to: [adminEmail],
      subject: `New Order Received - ${body.customerName}`,
      html: `
        <h1>New Order Confirmed!</h1>
        <p><strong>Customer:</strong> ${body.customerName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Total:</strong> $${body.total.toFixed(2)}</p>
        <p>Log in to Supabase to view the full order details and items.</p>
      `,
    });

    if (adminEmailError) {
      console.error('Failed to send admin email:', adminEmailError);
    }

    // 2. Email to Customer
    const { error: customerEmailError } = await resend.emails.send({
      from: `Vellut Leather <${senderEmail}>`,
      to: [body.email],
      subject: `Order Confirmed - Vellut Leather`,
      html: `
        <h1>Thank you for your order, ${body.customerName}!</h1>
        <p>We have successfully received your payment of $${body.total.toFixed(2)}.</p>
        <p>Your order is currently being processed. We will notify you once it has been shipped.</p>
        <br/>
        <p>Best regards,</p>
        <p>Vellut Leather Team</p>
      `,
    });

    if (customerEmailError) {
      console.error('Failed to send customer email:', customerEmailError);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
