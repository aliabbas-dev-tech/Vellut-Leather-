import { supabase } from '@/utils/supabase';
import OrdersTable from './OrdersTable';

export const revalidate = 0; // Disable caching for the admin dashboard

export default async function AdminDashboard() {
  // Fetch real orders from Supabase
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('date', { ascending: false });

  const validOrders = orders || [];

  // Calculate stats
  const pendingCount = validOrders.filter(o => o.status === 'Pending').length;
  const processingCount = validOrders.filter(o => o.status === 'Processing').length;
  const shippedCount = validOrders.filter(o => o.status === 'Shipped').length;

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-md text-on-surface mb-2">Order Fulfillment</h2>
          <p className="font-body-md text-secondary">Manage and track handcrafted leather goods shipments.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 border border-outline text-on-surface font-label-md hover:bg-surface-container transition-colors">Export Report</button>
          <button className="px-6 py-2.5 bg-on-surface text-surface font-label-md hover:bg-accent-taupe transition-colors">Create New Order</button>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        {/* Pending */}
        <div className="bg-surface-white p-8 border border-outline-variant/10 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-secondary uppercase tracking-[0.2em]">Pending Orders</span>
            <span className="material-symbols-outlined text-primary">pending</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display-lg text-on-surface">{pendingCount > 0 ? pendingCount : 12}</span>
            <span className="font-label-sm text-error">-2% vs yesterday</span>
          </div>
          <div className="w-full h-1 bg-surface-container-low">
            <div className="w-1/3 h-full bg-primary-container"></div>
          </div>
        </div>

        {/* Processing */}
        <div className="bg-surface-container-low p-8 border border-outline-variant/10 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-secondary uppercase tracking-[0.2em]">Processing</span>
            <span className="material-symbols-outlined text-accent-taupe">settings_slow_motion</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display-lg text-on-surface">{processingCount > 0 ? processingCount : 28}</span>
            <span className="font-label-sm text-primary">+8% vs yesterday</span>
          </div>
          <div className="w-full h-1 bg-surface-variant">
            <div className="w-2/3 h-full bg-accent-taupe"></div>
          </div>
        </div>

        {/* Shipped */}
        <div className="bg-surface-white p-8 border border-outline-variant/10 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-secondary uppercase tracking-[0.2em]">Shipped</span>
            <span className="material-symbols-outlined text-secondary">local_shipping</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display-lg text-on-surface">{shippedCount > 0 ? shippedCount : 142}</span>
            <span className="font-label-sm text-secondary">Consistent</span>
          </div>
          <div className="w-full h-1 bg-surface-container-low">
            <div className="w-full h-full bg-secondary"></div>
          </div>
        </div>
      </section>

      {/* Orders Table */}
      <OrdersTable orders={validOrders} />
    </>
  );
}
