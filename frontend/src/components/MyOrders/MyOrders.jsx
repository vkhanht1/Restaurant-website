import React, { useState, useEffect } from 'react';
import { FiTruck, FiCheckCircle, FiClock, FiArrowLeft, FiMapPin, FiCalendar, FiPackage, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import About1 from "../../assets/img12.jpg";

const API_URL = "https://miska-pho-backend.vercel.app";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found");
        const response = await axios.get(`${API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersArray = response.data.data || [];
        const formattedOrders = ordersArray.map(order => ({
          ...order,
          items: order.items?.map(entry => ({
            _id: entry._id,
            item: {
              ...entry.item,
              imageUrl: entry.item?.imageUrl || "https://placehold.co/100x100?text=Food",
              name: entry.item?.name || "Deleted Item"
            },
            quantity: entry.quantity,
          })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
        }));
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please login again.');
        } else {
          setError('Failed to load orders. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusStyles = {
    "Food Processing": { color: 'text-amber-400', bg: 'bg-amber-900/20', icon: <FiClock />, label: 'Food Processing' },
    "Out for Delivery": { color: 'text-blue-400', bg: 'bg-blue-900/20', icon: <FiTruck />, label: 'Out for Delivery' },
    "Delivered": { color: 'text-green-400', bg: 'bg-green-900/20', icon: <FiCheckCircle />, label: 'Delivered' },
    "Cancelled": { color: 'text-red-400', bg: 'bg-red-900/20', icon: <FiXCircle />, label: 'Cancelled' },
    "Paid": { color: 'text-green-400', bg: 'bg-green-900/20', icon: <FiCheckCircle />, label: 'Paid' }
  };

  const getStatusConfig = (order) => {
    let statusKey = order.status || "Food Processing";
    const map = {
      'processing': 'Food Processing',
      'out for delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
      'pending': 'Food Processing'
    };
    if (map[statusKey.toLowerCase()]) {
      statusKey = map[statusKey.toLowerCase()];
    }
    if (statusKey === "Cancelled") return statusStyles["Cancelled"];
    return statusStyles[statusKey] || statusStyles["Food Processing"];
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1a120b] flex justify-center items-center
    text-amber-500 gap-2 font-[Poppins]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      Loading orders...
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#1a120b] flex flex-col items-center 
    justify-center text-red-400 gap-4 font-[Poppins]">
      <p className="text-xl">{error}</p>
      <Link
        to="/login"
        className="bg-amber-600 px-6 py-2 rounded text-white hover:bg-amber-500">
        Go to Login
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen relative font-[Poppins] pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <img
          src={About1}
          alt="Restaurant Background"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a120b]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <Link to="/" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 
          transition-colors group">
            <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-lg">Back to Home</span>
          </Link>
        </div>

        {/* order list container */}
        <div className="bg-[#4b3b3b]/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl 
        border border-amber-500/10">
          <h2 className="text-3xl font-bold mb-8 text-amber-100 flex items-center gap-3">
            My Orders
            <span className="text-sm font-normal text-amber-500/80 bg-amber-900/40 px-3 
            py-1 rounded-full border border-amber-500/20">
              {orders.length} total
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-amber-500/60 border-b border-amber-500/20 text-xs 
                uppercase tracking-wider text-left">
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4 w-1/4">Order Details</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {orders.map((order) => {
                  const status = getStatusConfig(order);
                  return (
                    <tr key={order._id} className="hover:bg-amber-500/5 transition-colors">
                      <td className="p-4 align-top">
                        <div className="flex flex-col">
                          <span className="text-amber-100 font-bold font-mono text-sm">
                            {order.createdAt?.split(',')[0]}
                          </span>
                          <span className="text-xs text-amber-500/60">
                            {order.createdAt?.split(',')[1]}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 align-top text-amber-200/70 text-sm">
                        <div className="flex items-center justify-center h-full">
                          <span className="bg-amber-900/30 text-amber-200 px-3 py-1 rounded-md 
                          text-xs font-bold border border-amber-500/20">
                            {order.items.length} items
                          </span>
                        </div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="flex flex-col">
                          <span className="text-amber-100 font-medium text-sm">
                            {order.firstName
                              ? `${order.firstName} ${order.lastName || ''}`
                              : (order.userId?.name || user?.name || "Guest")}
                          </span>
                          <span className="text-xs text-amber-500/60 mt-1">
                            {order.phone || "No Phone"}</span>
                        </div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-3">
                          {order.items.map((entry, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <img src={entry.item.imageUrl}
                                alt={entry.item.name}
                                className="w-10 h-10 rounded object-cover bg-gray-800"
                                onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Food"; }} />
                              <div>
                                <div className="text-amber-100 text-sm font-medium">
                                  {entry.item.name}
                                </div>
                                <div className="text-xs text-amber-400/60">
                                  Qty: {entry.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-amber-100/90 font-medium">
                            <FiMapPin className="text-amber-500 shrink-0" size={14} />
                            <span className="text-sm capitalize">{order.address}, {order.city}</span>
                          </div>

                          {order.note && (
                            <div className="ml-6 flex items-center gap-2">
                              <div className="h-4 w-[1px] bg-amber-500/30"></div>
                              <span className="text-[15px] text-amber-500/60 font-light italic">
                                " {order.note} "
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="text-amber-300 font-bold">
                          {Number(order.total).toFixed(2)} zł
                        </div>
                        <div className="text-[10px] text-amber-500/60 uppercase">
                          {order.paymentMethod}
                        </div>
                        <span className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded border 
                          ${order.paymentStatus === 'paid'
                            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                            : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                          }`}>
                          {order.paymentStatus?.toUpperCase()}
                        </span>
                      </td>

                      <td className="p-4 align-top">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border 
                          ${status.bg} ${status.color} border-current/10 text-xs font-bold 
                          uppercase whitespace-nowrap`}>
                          {status.icon}
                          {status.label}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-20 flex flex-col items-center">
              <FiPackage className="text-6xl text-amber-500/20 mb-4" />
              <h3 className="text-xl text-amber-200 mb-2">No orders found</h3>
              <Link to="/menu" className="bg-amber-600 px-6 py-2 rounded-full 
              text-white hover:bg-amber-500 transition-colors">
                Order Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default UserOrdersPage;