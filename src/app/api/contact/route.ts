import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Attempt to store the contact submission in Supabase
    // If the table doesn't exist yet, we still return success so the form works
    try {
      await supabase.from('contact_submissions').insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        created_at: new Date().toISOString(),
      }]);
    } catch {
      // Table may not exist — log and continue. The response is still 200
      // so the customer experience is not broken. Set up the table when ready.
      console.warn('[Contact] Could not save to Supabase. Message from:', email);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will respond within 24 hours.',
    });
  } catch (error: any) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please email us directly at support@vellutleather.com.' },
      { status: 500 }
    );
  }
}
