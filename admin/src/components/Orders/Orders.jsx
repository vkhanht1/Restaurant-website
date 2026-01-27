import React, { useState, useEffect } from 'react';
import { FiUser, FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const layoutClasses = {
  page: 'min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8 font-sans',
  card: 'bg-[#4b3b3b]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-amber-500/20',
  heading: 'text-3xl font-bold mb-8 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent text-center font-cinzel',
};

const tableClasses = {
  wrapper: 'overflow-x-auto',
  table: 'w-full',
  headerRow: 'bg-[#3a2b2b]/50',
  headerCell: 'p-4 text-left text-amber-400 font-cinzel text-sm uppercase tracking-wider',
  row: 'border-b border-amber-500/20 hover:bg-[#3a2b2b]/30 transition-colors group',
  cellBase: 'p-4 text-amber-100/80 text-sm align-top',
};

const statusStyles = {
  "Food Processing": {
    label: "Processing",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  "Out for Delivery": {
    label: "Out for Delivery",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  "Delivered": {
    label: "Delivered",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  "Cancelled": {
    label: "Cancelled",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
};

const paymentMethodDetails = {
  cod: {
    label: 'COD',
    class: 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/30',
  },
  card: {
    label: 'Credit Card',
    class: 'bg-blue-600/20 text-blue-300 border border-blue-500/30',
  },
  upi: {
    label: 'UPI Payment',
    class: 'bg-purple-600/20 text-purple-300 border border-purple-500/30',
  },
  default: {
    label: 'Online',
    class: 'bg-green-600/20 text-green-300 border border-green-500/30',
  },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://miska-pho-backend.vercel.app";
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const myToken = getToken();
        if (!myToken) throw new Error("No token found. Please login.");

        const response = await axios.get(
          `${API_URL}/api/orders/all`,
          { headers: { Authorization: `Bearer ${myToken}` } }
        );

        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const filteredData = sortedData.filter(order => {
          const payStatus = order.paymentStatus?.toLowerCase();
          if (order.paymentMethod === 'online') {
            return payStatus === 'paid';
          }
          return true;
        });

        const formatted = filteredData.map(order => ({
          ...order,
          note: order.note || '',
          address: order.address ?? order.shippingAddress?.address ?? '',
          city: order.city ?? order.shippingAddress?.city ?? '',
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
          phone: order.phone || order.phoneNumber || order.user?.phone || 'No Phone',
          items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
        }));
        setOrders(formatted);
        setError(null);
      } catch (err) {
        console.error("Fetch orders error:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please logout and login again.");
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load orders.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const originalOrders = [...orders];
    setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));

    try {
      const myToken = getToken();
      await axios.post(
        `${API_URL}/api/orders/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${myToken}` } }
      );
      toast.success("Order status updated");
    } catch (err) {
      console.error(err);
      setOrders(originalOrders);
      toast.error("Update failed");
    }
  };

  const removeOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to DELETE this order permanently?")) return;

    try {
      const myToken = getToken();
      const response = await axios.post(
        `${API_URL}/api/orders/delete`,
        { id: orderId },
        { headers: { Authorization: `Bearer ${myToken}` } }
      );

      if (response.data.success) {
        toast.success("Order deleted successfully");
        setOrders(prev => prev.filter(order => order._id !== orderId));
      } else {
        toast.error("Error deleting order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    }
  };

  if (loading) return (
    <div className={`${layoutClasses.page} flex items-center justify-center min-h-screen`}>
      <div className="text-amber-400 text-xl font-bold animate-pulse font-cinzel">
        Loading orders...
      </div>
    </div>
  );

  if (error) return (
    <div className={`${layoutClasses.page} flex items-center justify-center min-h-screen`}>
      <div className="text-red-400 text-xl bg-red-900/20 p-4 rounded-lg 
      border border-red-500/30">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className={layoutClasses.page}>
      <div className="max-w-7xl mx-auto">
        <div className={layoutClasses.card}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={layoutClasses.heading}>Order Management</h2>
            <span className="text-amber-400/60 text-sm font-mono bg-amber-900/20 
            px-3 py-1 rounded-full border border-amber-500/10">
              Total: {orders.length}
            </span>
          </div>

          <div className={tableClasses.wrapper}>
            <table className={tableClasses.table}>
              <thead className={tableClasses.headerRow}>
                <tr>
                  {['Date & Time', 'Customer', 'Address', 'Items', 'Qty', 'Price', 'Payment', 'Status', 'Delete'].map(h => (
                    <th
                      key={h}
                      className={`${tableClasses.headerCell} ${h === 'Qty' || h === 'Delete' ? 'text-center' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  const totalPrice = order.total ?? order.items.reduce((s, i) => s + (i.item?.price || 0) * i.quantity, 0);
                  const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                  const stat = statusStyles[order.status] || statusStyles["Food Processing"] || { color: 'text-gray-400', bg: 'bg-gray-800' };
                  const dateObj = new Date(order.createdAt);
                  const dateStr = dateObj.toLocaleDateString('en-GB');
                  const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  return (
                    <tr key={order._id} className={tableClasses.row}>
                      {/* time */}
                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-amber-100 font-medium">
                            <FiCalendar className="text-amber-500" /> {dateStr}
                          </div>
                          <div className="flex items-center gap-2 text-amber-500/60 text-xs">
                            <FiClock /> {timeStr}
                          </div>
                        </div>
                      </td>
                      {/* customer */}
                      <td className={tableClasses.cellBase}>
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col">
                            <span className="text-amber-100 font-bold text-sm">
                              {order.firstName
                                ? `${order.firstName} ${order.lastName}`
                                : (order.user?.name || "Guest")}
                            </span>
                            <span className="text-amber-500/70 text-xs font-mono mt-0.5">
                              {order.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* address and note */}
                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col gap-1 group relative">
                          <div className="flex items-start gap-1.5 text-amber-100/90 leading-tight">
                            <span className="text-amber-500 mt-0.5 text-xs">📍</span>
                            <p className="text-[12px] capitalize line-clamp-2" title={`${order.address}, ${order.city}`}>
                              {order.address}, {order.city}
                            </p>
                          </div>

                          {order.note && (
                            <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-2 mt-1">
                              <p className="text-[10px] text-amber-500 font-bold uppercase mb-1">💬 Note:</p>
                              <p className="text-[11px] text-amber-100 italic leading-snug break-words whitespace-pre-wrap">
                                "{order.note}"
                              </p>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col gap-2 pr-2 scrollbar-thin 
                        scrollbar-thumb-amber-900/50 scrollbar-track-transparent">
                          {order.items.map((itm, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 bg-black/20 p-2 rounded-lg hover:bg-white/5 
                            transition-colors border border-white/5">
                              <div className="relative w-10 h-8 flex-shrink-0">
                                <img
                                  src={itm.item?.imageUrl
                                    ? (itm.item.imageUrl.startsWith('http')
                                      ? itm.item.imageUrl
                                      : `${API_URL}/images/${itm.item.imageUrl}`)
                                    : 'https://placehold.co/40?text=NoImg'}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/40?text=Error';
                                  }}
                                  alt="Food"
                                  className="w-full h-full object-cover rounded-md border border-amber-500/20"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-amber-100/90 text-xs font-medium truncate">
                                  {itm.item?.name}
                                </p>
                                <p className="text-amber-500/50 text-[10px]">
                                  Qty: {itm.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="text-center p-4">
                        <span
                          className="bg-amber-900/30 text-amber-200 px-2.5 py-1 rounded-md 
                          text-xs font-bold border border-amber-500/20">
                          {totalItems}
                        </span>
                      </td>

                      <td className={`${tableClasses.cellBase} px-2 text-amber-300 font-bold 
                        font-mono text-base`}>
                        {totalPrice} zł
                      </td>

                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col items-center">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase 
                          tracking-wider ${payMethod.class}`}>{payMethod.label}
                          </span>
                          <span className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded border ${order.paymentStatus === 'paid'
                            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                            : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                            }`}>
                            {order.paymentStatus?.toUpperCase()}
                          </span>
                        </div>
                      </td>

                      <td className={tableClasses.cellBase}>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`bg-[#1a120b] ${stat.color} border border-amber-500/20 rounded-lg px-0.5 
                          py-1.5 text-xs font-bold uppercase tracking-wide cursor-pointer outline-none 
                          focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-sm`}>
                          {Object.keys(statusStyles).map(s => (
                            <option key={s} value={s} className="bg-[#1a120b] text-amber-100 py-2">
                              {statusStyles[s].label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => removeOrder(order._id)}
                          className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 
                          rounded-lg transition-all active:scale-95"
                          title="Delete Order"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;