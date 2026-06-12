import { redirect } from 'next/navigation';

// This page redirects to the canonical shipping-global page to avoid duplicate/orphaned content
export default function ShippingPage() {
  redirect('/shipping-global');
}
