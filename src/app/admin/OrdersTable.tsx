'use client';
import React, { useState } from 'react';

export default function OrdersTable({ orders }: { orders: any[] }) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<{ [key: string]: string }>({});
  const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({});

  const displayOrders = orders.length > 0 ? orders : [];

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleTrackingChange = (id: string, value: string) => {
    setTrackingInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveAndEmail = async (order: any) => {
    const trackingNo = trackingInputs[order.id] || order.trackingNumber;
    if (!trackingNo) {
      alert("Please enter a tracking number first.");
      return;
    }

    setLoadingIds(prev => ({ ...prev, [order.id]: true }));

    try {
      // 1. Save to DB
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trackingNo })
      });

      if (!res.ok) throw new Error("Failed to save tracking number");

      // 2. Open Email Draft
      const subject = encodeURIComponent(`Your Vellut Leather Order #${order.id.substring(0, 8)} has shipped!`);
      const body = encodeURIComponent(`Dear ${order.customerName},

We are delighted to inform you that your bespoke leather goods have been crafted and are now on their way to you.

Your Tracking Number: ${trackingNo}

Thank you for choosing Vellut Leather.

Warm regards,
Alessandro V.
Senior Curator, Vellut Leather`);
      
      window.location.href = `mailto:${order.email}?subject=${subject}&body=${body}`;
      
      alert("Tracking saved and email draft opened.");
      
      // We would ideally mutate the local state here to show the updated status, but typically 
      // the parent component would refetch or we just reload. For simplicity:
      window.location.reload();
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingIds(prev => ({ ...prev, [order.id]: false }));
    }
  };

  if (displayOrders.length === 0) {
    return (
      <section className="bg-surface-white border border-outline-variant/10 overflow-hidden p-12 text-center text-secondary">
        No orders found.
      </section>
    );
  }

  return (
    <section className="bg-surface-white border border-outline-variant/10 overflow-hidden">
      <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
        <h3 className="font-label-md text-on-surface uppercase tracking-widest">Active Orders</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="font-label-sm text-secondary uppercase tracking-widest bg-surface-container-low/50">
              <th className="px-8 py-5 font-semibold">Order ID</th>
              <th className="px-8 py-5 font-semibold">Customer</th>
              <th className="px-8 py-5 font-semibold">Date</th>
              <th className="px-8 py-5 font-semibold">Total</th>
              <th className="px-8 py-5 font-semibold">Status</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {displayOrders.map((order) => {
              const isExpanded = expandedRow === order.id;
              const initials = order.customerName ? order.customerName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'VL';
              const orderDate = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              const currentTracking = trackingInputs[order.id] !== undefined ? trackingInputs[order.id] : (order.trackingNumber || '');

              return (
                <React.Fragment key={order.id}>
                  <tr 
                    onClick={() => toggleRow(order.id)}
                    className={`cursor-pointer transition-colors group ${isExpanded ? 'bg-surface-container-low/40' : 'hover:bg-surface-container-low/20'}`}
                  >
                    <td className={`px-8 py-6 font-label-md ${isExpanded ? 'text-primary font-bold' : 'text-on-surface'}`}>
                      #{order.id.substring(0, 8)}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold ${isExpanded ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant'}`}>
                          {initials}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-body-md ${isExpanded ? 'font-medium' : ''}`}>{order.customerName}</span>
                          <span className="text-[10px] text-secondary">{order.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`px-8 py-6 ${isExpanded ? 'text-on-surface' : 'text-secondary'}`}>
                      {orderDate}
                    </td>
                    <td className="px-8 py-6 font-medium text-on-surface">${order.total}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-tighter ${
                        order.status === 'Processing' ? 'bg-primary-container text-on-primary-container' : 
                        order.status === 'Shipped' ? 'bg-secondary-container text-on-secondary-container' : 
                        'bg-surface-container text-secondary'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {isExpanded ? (
                        <span className="material-symbols-outlined text-primary transition-transform">expand_more</span>
                      ) : (
                        <button className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">more_vert</button>
                      )}
                    </td>
                  </tr>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <tr className="bg-surface-container-low/40">
                      <td className="px-8 pb-10" colSpan={6}>
                        <div className="bg-surface-white border border-outline-variant/30 p-8 flex flex-col md:flex-row gap-12">
                          
                          {/* Left: Product Info */}
                          <div className="w-full md:w-1/3">
                            <h4 className="font-headline-sm text-on-surface text-lg mb-4 border-b border-outline-variant/20 pb-2">Order Items</h4>
                            {Array.isArray(order.items) && order.items.length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {order.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-secondary">Item ID: {item.productId.substring(0,6)}...</span>
                                    <span className="font-bold">x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-secondary text-sm">Bespoke Leather Goods</p>
                            )}
                          </div>
                          
                          {/* Right: Fulfillment Form */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-8 mb-8">
                              <div>
                                <p className="font-label-sm text-secondary uppercase tracking-widest mb-2">Customer Email</p>
                                <p className="font-body-md text-on-surface leading-relaxed">
                                  {order.email}
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-6">
                              <div className="relative">
                                <label className="block font-label-sm text-secondary uppercase tracking-widest mb-3">FedEx/DHL Tracking Number</label>
                                <input 
                                  className="w-full bg-surface-container-low border border-outline-variant/40 py-4 px-4 font-body-md focus:outline-none focus:border-primary focus:bg-white transition-all" 
                                  placeholder="e.g. 7748 1294 1029" 
                                  type="text"
                                  value={currentTracking}
                                  onChange={(e) => handleTrackingChange(order.id, e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-4">
                                <button 
                                  onClick={() => handleSaveAndEmail(order)}
                                  disabled={loadingIds[order.id]}
                                  className="flex-1 bg-on-surface text-surface py-4 font-label-md uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                  {loadingIds[order.id] ? 'Saving...' : (order.trackingNumber ? 'Update & Email' : 'Save & Send Email')}
                                </button>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
