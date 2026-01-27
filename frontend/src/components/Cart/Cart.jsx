import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash, FaTimes, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ContactImg from "../../assets/img9.jpg";

const API_URL = "https://miska-pho-backend.vercel.app";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const buildImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `${API_URL}/uploads/${path.replace(/^\/uploads\//, '')}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-[#1a120b] font-sans pt-5">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={ContactImg}
          alt="Background Blur"
          className="w-full h-full object-cover filter blur-md scale-110 opacity-60" />
        <div className="absolute inset-0 bg-[#1a120b]/70"></div>
      </div>

      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* header */}
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block">
              <span className="text-amber-500 font-cinzel uppercase tracking-[0.3em] text-sm 
              md:text-base border-b border-amber-500/30 pb-2 font-bold">
                Review Your Order
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-dancingscript text-amber-100 drop-shadow-xl">
              Your <span className="text-amber-600">Selection</span>
            </motion.h1>
          </div>

          {/* cart */}
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center bg-[#1a120b]/40 p-12 rounded-3xl backdrop-blur-md 
              border border-amber-500/10 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🛒</div>
              <p className="text-amber-100/80 text-2xl font-cinzel mb-8">
                Your cart is currently empty.</p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 
                to-amber-700 px-8 py-3 rounded-full font-cinzel text-sm uppercase tracking-widest 
                text-white hover:shadow-lg hover:shadow-amber-600/20 transition-all duration-300 
                transform hover:-translate-y-1">Browse Menu <FaArrowRight />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* grid */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence>
                  {cartItems
                    .filter(ci => ci.item)
                    .map(({ _id, item, quantity }, index) => (
                      <motion.div
                        layout
                        key={_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group bg-[#2a1e14]/60 backdrop-blur-md p-5 rounded-2xl border 
                        border-amber-500/10 hover:border-amber-500/40 flex flex-col items-center gap-5 
                        transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/20 hover:-translate-y-2">
                        {/* image */}
                        <div
                          className="w-32 h-32 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-full border-4
                          border-amber-500/10 group-hover:border-amber-500/30 transition-all duration-500 shadow-lg"
                          onClick={() => setSelectedImage(buildImageUrl(item.imageUrl || item.image))}>
                          <img
                            src={buildImageUrl(item?.imageUrl || item?.image)}
                            alt={item?.name || 'Item'}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        </div>

                        <div className="w-full text-center space-y-2">
                          <h3 className="text-xl font-cinzel font-bold text-amber-100 line-clamp-1 
                          group-hover:text-amber-500 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-amber-100/60 font-sans text-sm">
                            Unit Price: <span className="text-amber-400 font-bold">
                              {Number(item.price).toFixed(2)} zł
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 bg-black/30 rounded-full px-4 py-2 border border-white/5">
                          <button
                            onClick={() => updateQuantity(_id, Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center 
                            hover:bg-amber-500 hover:text-black text-amber-500 transition-all duration-200">
                            <FaMinus size={10} />
                          </button>
                          <span className="w-6 text-center text-amber-100 font-mono font-bold text-lg">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(_id, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center 
                            hover:bg-amber-500 hover:text-black text-amber-500 transition-all duration-200">
                            <FaPlus size={10} />
                          </button>
                        </div>

                        {/* footer */}
                        <div className="flex items-center justify-between w-full pt-4 border-t border-white/5 mt-auto">
                          <button
                            onClick={() => removeFromCart(_id)}
                            className="text-red-400/80 hover:text-red-400 transition-colors flex items-center 
                            gap-1.5 text-xs uppercase tracking-wider font-bold hover:underline">
                            <FaTrash size={12} /> Remove
                          </button>
                          <div className="text-right">
                            <p className="text-[10px] text-amber-100/40 uppercase">Subtotal</p>
                            <p className="text-lg font-cinzel text-amber-400 font-bold">
                              {(Number(item.price) * quantity).toFixed(2)} zł
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>

              {/* summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16 pt-8 border-t border-amber-500/20">
                <div className="bg-[#1a120b]/80 p-8 rounded-3xl border border-amber-500/10 backdrop-blur-xl 
                flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
                  <Link
                    to="/menu"
                    className="text-amber-100/60 hover:text-amber-500 transition-colors flex items-center 
                    gap-2 font-cinzel text-sm uppercase tracking-widest group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Continue Shopping
                  </Link>

                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
                    <div className="text-center md:text-right">
                      <p className="text-amber-100/50 text-sm uppercase tracking-widest mb-1">Total Amount</p>
                      <h2 className="text-4xl md:text-5xl font-dancingscript text-amber-500">
                        {totalAmount.toFixed(2)} zł
                      </h2>
                    </div>

                    <button
                      onClick={() => navigate('/checkout')}
                      className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-700 
                      rounded-full overflow-hidden shadow-lg hover:shadow-amber-600/40 transition-all duration-300 
                      transform hover:-translate-y-1 w-full md:w-auto">
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] 
                      transition-transform duration-500 skew-x-12"></div>
                      <div className="relative flex items-center justify-center gap-3 font-cinzel font-bold 
                      tracking-widest text-white uppercase">
                        <span>Proceed to Checkout</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-full max-h-full">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain shadow-2xl border border-amber-500/20" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 bg-white/10 rounded-full p-3 text-white 
              hover:bg-red-500 hover:text-white transition duration-300 backdrop-blur-sm">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;