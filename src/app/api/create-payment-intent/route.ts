import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY is not configured' }, { status: 500 });
  }

  // Initialise Stripe inside the handler so it only runs at request time
  const stripe = new Stripe(stripeSecretKey, {
    // @ts-ignore
    apiVersion: '2023-10-16',
  });

  try {
    const { amount } = await request.json();

    // The amount should be passed from the client in pence (e.g. Math.round(subtotal * 100))
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
