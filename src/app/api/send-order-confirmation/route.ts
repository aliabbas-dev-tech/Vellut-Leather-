import { NextResponse } from 'next/server';

/**
 * POST /api/send-order-confirmation
 *
 * Sends an order confirmation email to the customer after successful payment.
 * Currently uses a mailto: fallback / logs to console.
 * To enable real email sending, set RESEND_API_KEY in .env.local and
 * uncomment the Resend block below.
 *
 * Stripe Compliance Note: Customers MUST receive an order confirmation email.
 * Without this, dispute rates increase significantly.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, orderRef, items, total, currency = 'USD' } = body;

    if (!email || !customerName) {
      return NextResponse.json({ error: 'email and customerName are required.' }, { status: 400 });
    }

    // ── Option A: Resend (recommended — uncomment when RESEND_API_KEY is set) ──
    // Install with: npm install resend
    //
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'Vellut Leather <noreply@vellutleather.com>',
    //   to: email,
    //   subject: `Order Confirmed — ${orderRef} | Vellut Leather`,
    //   html: buildOrderConfirmationHtml({ customerName, orderRef, items, total, currency }),
    // });

    // ── Option B: Log to console (active until email provider is configured) ──
    console.log(`[Order Confirmation] Would send email to: ${email}`);
    console.log(`  Customer: ${customerName}`);
    console.log(`  Order Ref: ${orderRef}`);
    console.log(`  Total: ${currency} $${total}`);
    console.log(`  Items: ${JSON.stringify(items)}`);
    console.log(
      `  ACTION REQUIRED: Add RESEND_API_KEY to .env.local and uncomment the Resend block in /api/send-order-confirmation/route.ts`
    );

    return NextResponse.json({
      success: true,
      message: `Confirmation queued for ${email}`,
    });

  } catch (error: any) {
    console.error('[Order Confirmation API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email.' },
      { status: 500 }
    );
  }
}

/**
 * Builds the HTML body for the order confirmation email.
 * Uses inline styles for maximum email client compatibility.
 */
function buildOrderConfirmationHtml({
  customerName,
  orderRef,
  items,
  total,
  currency,
}: {
  customerName: string;
  orderRef: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  currency: string;
}) {
  const itemRows = (items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f0ebe0; font-family: Georgia, serif; font-size: 14px; color: #3d3020;">${item.name}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f0ebe0; text-align: center; font-family: Arial, sans-serif; font-size: 14px; color: #6b5c3e;">${item.quantity}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f0ebe0; text-align: right; font-family: Arial, sans-serif; font-size: 14px; color: #735c00; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #fdf8f0; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdf8f0; padding: 40px 20px;">
    <tr>
      <td>
        <table width="600" align="center" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #fefcf7; border: 1px solid #e8e0d0;">
          <!-- Header -->
          <tr>
            <td style="background-color: #fdf8f0; padding: 32px; text-align: center; border-bottom: 1px solid #e8e0d0;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 28px; color: #735c00; letter-spacing: 4px; font-weight: normal;">VELLUT LEATHER</h1>
              <p style="margin: 8px 0 0; font-size: 11px; color: #9c8866; letter-spacing: 3px; text-transform: uppercase;">Handcrafted. Made to Order.</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="font-family: Georgia, serif; font-size: 22px; color: #3d3020; font-weight: normal; margin: 0 0 8px;">Order Confirmed</h2>
              <p style="color: #6b5c3e; font-size: 15px; margin: 0 0 24px;">Dear ${customerName},</p>
              <p style="color: #6b5c3e; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">
                Thank you for your order. We're already planning your piece — every Vellut Leather bag is handcrafted individually just for you.
              </p>

              <!-- Order Reference -->
              <div style="background-color: #fdf8f0; border: 1px solid #e8e0d0; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 11px; color: #9c8866; letter-spacing: 2px; text-transform: uppercase;">Order Reference</p>
                <p style="margin: 4px 0 0; font-size: 20px; color: #735c00; font-family: Georgia, serif;">${orderRef}</p>
              </div>

              <!-- Items Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <thead>
                  <tr>
                    <th style="text-align: left; font-size: 11px; color: #9c8866; letter-spacing: 2px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid #e8e0d0;">Item</th>
                    <th style="text-align: center; font-size: 11px; color: #9c8866; letter-spacing: 2px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid #e8e0d0;">Qty</th>
                    <th style="text-align: right; font-size: 11px; color: #9c8866; letter-spacing: 2px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid #e8e0d0;">Price</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding-top: 12px; font-size: 13px; color: #6b5c3e; font-weight: bold;">Total (${currency})</td>
                    <td style="padding-top: 12px; text-align: right; font-size: 16px; color: #735c00; font-weight: bold;">$${total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="font-size: 11px; color: #9c8866; padding-top: 4px; text-align: right;">Complimentary global shipping included</td>
                  </tr>
                </tfoot>
              </table>

              <!-- What Happens Next -->
              <div style="border-top: 1px solid #e8e0d0; padding-top: 24px; margin-bottom: 24px;">
                <h3 style="font-family: Georgia, serif; font-size: 16px; color: #3d3020; font-weight: normal; margin: 0 0 16px; letter-spacing: 2px; text-transform: uppercase;">What Happens Next</h3>
                <p style="color: #6b5c3e; font-size: 13px; line-height: 1.7; margin: 0 0 8px;">🛠️ <strong>Production:</strong> Your piece will be handcrafted over the next 7–14 business days.</p>
                <p style="color: #6b5c3e; font-size: 13px; line-height: 1.7; margin: 0 0 8px;">📦 <strong>Dispatch:</strong> We'll email your DHL/FedEx tracking number as soon as your order ships.</p>
                <p style="color: #6b5c3e; font-size: 13px; line-height: 1.7; margin: 0 0 8px;">🌍 <strong>Delivery:</strong> Estimated 10–21 business days total from order date.</p>
                <p style="color: #6b5c3e; font-size: 13px; line-height: 1.7; margin: 0;">↩️ <strong>Returns:</strong> You have a 14-day right to cancel after receiving your goods.</p>
              </div>

              <!-- Support -->
              <div style="background-color: #fdf8f0; border: 1px solid #e8e0d0; padding: 16px 20px;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #9c8866; letter-spacing: 1px; text-transform: uppercase;">Need Help?</p>
                <p style="margin: 0; font-size: 13px; color: #6b5c3e;">Email <a href="mailto:support@vellutleather.shop" style="color: #735c00;">support@vellutleather.shop</a> or call <a href="tel:+13078889612" style="color: #735c00;">+1 307 888 9612</a>. Quote your order reference <strong>${orderRef}</strong>.</p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #fdf8f0; padding: 24px 32px; border-top: 1px solid #e8e0d0; text-align: center;">
              <p style="margin: 0; font-size: 10px; color: #9c8866; letter-spacing: 1px; text-transform: uppercase;">ZEESHAN RAZZAQ LLC · 1500 N GRANT ST STE 34785, DENVER CO 80203, USA</p>
              <p style="margin: 4px 0 0; font-size: 10px; color: #9c8866;">All prices in USD ($) · Payments processed by Stripe</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
