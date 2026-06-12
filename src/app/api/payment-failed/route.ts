import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // --- Send Email Notifications via Resend ---
    const adminEmail = process.env.ADMIN_EMAIL || 'vellutleather@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    // 1. Email to Admin
    const { error: adminEmailError } = await resend.emails.send({
      from: `Vellut Leather <${senderEmail}>`,
      to: [adminEmail],
      subject: `Payment Failed Attempt - ${body.customerName || 'Unknown Customer'}`,
      html: `
        <h1>Payment Failed</h1>
        <p>A customer attempted to checkout but the payment failed.</p>
        <p><strong>Customer:</strong> ${body.customerName || 'N/A'}</p>
        <p><strong>Email:</strong> ${body.email || 'N/A'}</p>
        <p><strong>Error Reason:</strong> ${body.errorReason || 'Unknown error'}</p>
      `,
    });

    if (adminEmailError) {
      console.error('Failed to send admin payment failed email:', adminEmailError);
    }

    // 2. Email to Customer (only if email is provided)
    if (body.email) {
      const { error: customerEmailError } = await resend.emails.send({
        from: `Vellut Leather <${senderEmail}>`,
        to: [body.email],
        subject: `Payment Failed - Vellut Leather`,
        html: `
          <h1>Payment Failed</h1>
          <p>Hi ${body.customerName || 'there'},</p>
          <p>We're sorry, but your recent payment attempt at Vellut Leather failed.</p>
          <p><strong>Reason:</strong> ${body.errorReason || 'Please check your payment details and try again.'}</p>
          <br/>
          <p>If you continue to experience issues, please reply to this email for support.</p>
          <p>Best regards,</p>
          <p>Vellut Leather Team</p>
        `,
      });

      if (customerEmailError) {
        console.error('Failed to send customer payment failed email:', customerEmailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to send payment failure emails:', error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
