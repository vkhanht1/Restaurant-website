import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import axios from 'axios';
import ContactImg from "../../assets/img11.jpg";

const CheckoutPage = () => {
  const { totalAmount, cartItems: rawCart, clearCart } = useCart();
  const cartItems = rawCart.filter(ci => ci.item);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cartItems.length === 0 && !loading) {
      navigate('/cart');
    }
  }, [cartItems, navigate, loading]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
    note: ''
  });

  const API_URL = 'https://miska-pho-backend.vercel.app';
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const payload = {
      ...formData,
      subtotal,
      tax,
      total: Number((subtotal + tax).toFixed(2)),
      items: cartItems.map(({ item, quantity }) => ({
        name: item.name,
        price: item.price,
        quantity,
        imageUrl: item.image || item.imageUrl || "https://placehold.co/100x100"
      }))
    };

    try {
      const { data } = await axios.post(
        `${API_URL}/api/orders/place`,
        payload,
        { headers: authHeaders }
      );

      if (formData.paymentMethod === 'online') {
        const paymentUrl = data.session_url || data.checkoutUrl || data.url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          setError("Server did not return a payment link.");
        }
      } else {
        navigate('/myorders', { state: { order: data.order } });
        setTimeout(() => {
          clearCart();
        }, 500);
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit order');
    } finally {
      if (formData.paymentMethod !== 'online') {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative bg-[#1a120b] text-white py-16 px-4 pt-28 font-[Poppins]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={ContactImg}
          alt="Background"
          className="w-full h-full object-cover filter blur-md scale-110 opacity-70"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <Link to="/cart" className="inline-flex items-center gap-2 text-amber-400 mb-8 
        hover:text-amber-300 transition-colors font-medium group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 font-dancingscript 
        text-amber-500 drop-shadow-lg">
          Secure Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-[#2a1e14]/60 backdrop-blur-md p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl border border-amber-500/20">
            <h2 className="text-2xl font-bold text-amber-100 border-b border-amber-500/30 pb-3 font-cinzel">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
            <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            <Input label="Street Address" name="address" value={formData.address} onChange={handleInputChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
              <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
            </div>
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-amber-100/70">Order Note (Optional)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows="3"
                placeholder="Eg: No onions..."
                className="w-full bg-[#1a120b]/60 text-white border border-amber-500/20 rounded-xl 
                px-4 py-3 focus:outline-none focus:border-amber-500 transition-all placeholder-white/20"
              />
            </div>
          </div>

          {/* payment details */}
          <div className="bg-[#2a1e14]/60 backdrop-blur-md p-6 md:p-8 rounded-3xl space-y-6 
          shadow-2xl border border-amber-500/20 h-fit">
            <h2 className="text-2xl font-bold text-amber-100 border-b border-amber-500/30 
            pb-3 font-cinzel">
              Payment Summary
            </h2>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {cartItems.map(({ _id, item, quantity }) => (
                <div key={_id} className="flex justify-between items-center bg-black/20 p-3 
                rounded-lg border border-amber-500/10">
                  <div className="flex-1">
                    <span className="text-amber-50 font-medium block text-sm">{item.name}</span>
                    <span className="text-amber-500/60 text-xs">Qty: {quantity}</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">{(item.price * quantity).toFixed(2)} zł</span>
                </div>
              ))}
            </div>

            <PaymentSummary totalAmount={totalAmount} />

            <div className="pt-2">
              <label className="block mb-2 text-sm font-medium text-amber-100/80">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
                className="w-full bg-[#1a120b]/80 text-white border border-amber-500/30 rounded-xl px-4 py-3 
                appearance-none focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="" disabled>Choose an option...</option>
                <option value="cod">Cash on Delivery (COD)</option>
                <option value="online">Online Payment (Stripe)</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-4 
              rounded-xl font-bold flex justify-center items-center gap-2 hover:from-amber-500 
              hover:to-orange-600 transition-all shadow-lg disabled:opacity-70 uppercase tracking-wider text-sm mt-4">
              <FaLock /> {loading ? 'Processing...' : `Place Order (${(totalAmount * 1.05).toFixed(2)} zł)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-amber-100/70">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full bg-[#1a120b]/60 text-white border border-amber-500/20 rounded-xl 
      px-4 py-3 focus:outline-none focus:border-amber-500 transition-all"
      placeholder={`Enter ${label.toLowerCase()}`} />
  </div>
);

const PaymentSummary = ({ totalAmount }) => {
  const subtotal = Number(totalAmount.toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return (
    <div className="space-y-3 bg-black/20 p-5 rounded-xl border border-amber-500/10">
      <div className="flex justify-between text-amber-100/70 text-sm">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} zł</span>
      </div>
      <div className="flex justify-between text-amber-100/70 text-sm">
        <span>Tax (5%)</span>
        <span>{tax.toFixed(2)} zł</span>
      </div>
      <div className="h-[1px] bg-amber-500/20 my-2"></div>
      <div className="flex justify-between font-bold text-lg text-amber-400">
        <span>Total</span>
        <span>{total.toFixed(2)} zł</span>
      </div>
    </div>
  );
};

export default CheckoutPage;