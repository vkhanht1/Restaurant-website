import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import About1 from "../../assets/img6.jpg";

const OurMenu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [menuData, setMenuData] = useState({});
  const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItems = rawCart.filter(ci => ci.item);
  const API_URL = "https://miska-pho-backend.vercel.app";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/category/list`);
        if (res.data.success) {
          const catNames = res.data.categories.map(cat => cat.name);
          setCategories(catNames);
          if (catNames.length > 0) setActiveCategory(catNames[0]);
        }
      } catch (error) { console.error("Error fetching categories:", error); }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/menu/list`);
        const items = res.data.menuItems || res.data.data || [];
        if (Array.isArray(items)) {
          const byCategory = items.reduce((acc, item) => {
            const cat = item.category || 'Uncategorized';
            acc[cat] = acc[cat] || [];
            acc[cat].push(item);
            return acc;
          }, {});
          setMenuData(byCategory);
        }
      } catch (err) { console.error('Failed to load menu:', err); }
    };
    fetchMenu();
  }, []);
  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
  const displayItems = menuData[activeCategory] || [];

  return (
    <div className="min-h-screen text-amber-50 font-sans relative overflow-hidden pt-6">
      <div
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${About1}`
        }}></div>

      {/* overlay */}
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        {/* header */}
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-amber-500 font-cinzel uppercase tracking-[0.3em] text-sm">
            Discover Our Flavors
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-dancingscript text-amber-100 drop-shadow-lg">
            Our Exquisite Menu
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-6"></div>
        </div>

        {/* category */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 border-b border-amber-500/20 pb-4">
          {categories.length > 0 ? (
            categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative pb-3 text-lg font-cinzel tracking-widest uppercase transition-all 
                  duration-300 ${activeCategory === cat
                    ? 'text-amber-500 font-bold scale-105'
                    : 'text-amber-100/60 hover:text-amber-100'
                  }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 
                    shadow-[0_0_15px_rgba(245,158,11,0.8)]"/>
                )}
              </button>
            ))
          ) : (
            <p className="text-amber-100/40 italic">Loading menu categories...</p>
          )}
        </div>

        {/* menu */}
        <motion.div layout className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {displayItems.length > 0 ? (
              displayItems.map((item, index) => {

                const cartEntry = getCartEntry(item._id);

                const quantity = cartEntry?.quantity || 0;
                return (
                  <motion.div
                    layout
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative bg-white rounded-lg overflow-hidden shadow-2xl
                    hover:shadow-amber-500/20 transition-all duration-500 flex flex-col">
                    {/* image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={
                          (item.imageUrl || item.image)
                            ? ((item.imageUrl || item.image).startsWith("http")
                              ? (item.imageUrl || item.image)
                              : `${API_URL}/images/${item.imageUrl || item.image}`)
                            : "https://placehold.co/300x200?text=Miska+Pho"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform 
                        duration-1000 ease-out"
                        onError={(e) => { e.target.src = "https://placehold.co/300x200?text=Miska+Pho"; }} />
                    </div>

                    <div className="p-5 text-center flex flex-col flex-grow bg-white relative z-10">
                      <h3 className="text-lg font-cinzel font-bold text-[#1a120b] mb-1 truncate 
                      group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-[#1a120b] text-md font-sans leading-relaxed line-clamp-2 
                      mb-4 flex-grow font-light">{item.description}</p>
                      <div className="text-lg font-bold text-amber-600 mb-4 font-sans">
                        {Number(item.price).toFixed(2)} zł
                      </div>
                      {/* cart */}
                      <div className="mt-auto pt-4 border-t border-gray-100 w-full flex justify-center">
                        {quantity > 0 ? (
                          <div className="flex items-center justify-between bg-[#F5F1E8] rounded-full 
                          px-4 py-1.5 gap-4 w-full border border-[#1a120b]/5">
                            <button
                              onClick={() => quantity > 1
                                ? updateQuantity(cartEntry?._id, quantity - 1)
                                : removeFromCart(cartEntry._id)}
                              className="w-7 h-7 rounded-full bg-white text-[#1a120b] flex items-center 
                              justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-sm">
                              <FaMinus size={10} />
                            </button>
                            <span className="font-bold text-[#1a120b] w-8 text-center font-mono">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white text-[#1a120b] flex items-center justify-center 
                              hover:bg-amber-600 hover:text-white transition-colors shadow-sm">
                              <FaPlus size={10} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="w-full py-2.5 bg-[#1a120b] text-white font-cinzel font-bold text-xs tracking-[0.2em] 
                            uppercase rounded-lg shadow-lg hover:bg-amber-600 transition-all transform active:scale-95 
                            flex items-center justify-center gap-2">
                            <FaPlus size={10} /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="inline-block p-6 rounded-full bg-amber-600/10 mb-4 animate-pulse">
                  <span className="text-4xl">🍽️</span>
                </div>
                <p className="text-amber-100/50 text-xl font-cinzel">
                  Preparing menu for <span className="text-amber-600">{activeCategory}</span>...
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default OurMenu;