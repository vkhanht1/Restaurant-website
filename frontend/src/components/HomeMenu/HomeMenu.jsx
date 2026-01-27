import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const HomeMenu = () => {
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
      } catch (error) { console.error(error); }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/menu/list`)
      .then(res => {
        const items = res.data.menuItems || res.data.data || [];
        if (Array.isArray(items)) {
          const grouped = items.reduce((acc, item) => {
            const cat = item.category || 'Uncategorized';
            acc[cat] = acc[cat] || [];
            acc[cat].push(item);
            return acc;
          }, {});
          setMenuData(grouped);
        }
      }).catch(console.error);
  }, []);

  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity ?? 0;
  const displayItems = (menuData[activeCategory] || []).slice(0, 4);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8] overflow-hidden">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-scales.png')" }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block">
            <span className="text-[#2D1B0E] font-cinzel uppercase tracking-[0.3em] text-sm md:text-base 
            border-b border-[#2D1B0E]/20 pb-1 font-bold">
              Discover Our Tastes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-dancingscript text-amber-700 drop-shadow-sm">
            Our Exquisite Menu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#1a120b] max-w-2xl mx-auto font-sans font-light text-lg leading-relaxed">
            "From the bustling streets of Hanoi to the heart of Warsaw. Experience the perfect harmony of
            traditional Vietnamese recipes and modern culinary art."
          </motion.p>
        </div>

        {/* category */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16">
          {categories.length > 0 ? (
            categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative pb-2 text-sm md:text-base font-cinzel uppercase tracking-widest 
                  transition-all duration-300 
                  ${activeCategory === cat
                    ? 'text-[#1a120b] font-bold'
                    : 'text-[#1a120b] hover:text-[#1a120b]'
                  }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="underline-menu"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-600 
                    shadow-[0_0_10px_rgba(245,158,11,0.5)]"/>
                )}
              </button>
            ))
          ) : (
            <p className="text-gray-400 italic">Loading categories...</p>
          )}
        </div>

        {/* menu */}
        <motion.div layout className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode='popLayout'>
            {displayItems.length > 0 ? (
              displayItems.map((item, index) => {
                const qty = getQuantity(item._id);
                const cartEntry = getCartEntry(item._id);
                return (
                  <motion.div
                    layout
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative bg-white rounded-lg overflow-hidden border 
                    border-[#1a120b]/5 hover:shadow-2xl transition-all duration-500 flex flex-col">

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
                        className="w-full h-full object-cover transform group-hover:scale-110 
                        transition-transform duration-1000 ease-out"
                        onError={(e) => { e.target.src = "https://placehold.co/300x200?text=Miska+Pho"; }
                        } />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent 
                      to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* content area */}
                    <div className="p-5 text-center flex flex-col flex-grow bg-white relative z-10">
                      <h3 className="text-lg font-cinzel font-bold text-[#1a120b] mb-1 truncate 
                      group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#1a120b] mt-1 line-clamp-none">
                        {item.description}
                      </p>
                      <div className="text-lg font-bold text-amber-600 mb-4 font-sans">
                        {Number(item.price).toFixed(2)} zł
                      </div>

                      {/* cart */}
                      <div className="mt-auto pt-4 border-t border-gray-100 w-full flex justify-center">
                        {qty > 0 ? (
                          <div className="flex items-center justify-between bg-[#F5F1E8] 
                          rounded-full px-4 py-1 gap-4 w-full">
                            <button
                              onClick={() =>
                                qty > 1
                                  ? updateQuantity(cartEntry?._id, qty - 1)
                                  : removeFromCart(cartEntry._id)}
                              className="w-6 h-6 flex items-center justify-center text-[#1a120b] 
                              hover:text-amber-600 transition-colors">
                              <FaMinus size={12} />
                            </button>
                            <span className="font-bold text-[#1a120b] text-sm font-mono">{qty}</span>
                            <button
                              onClick={() => updateQuantity(cartEntry._id, qty + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#1a120b] 
                              hover:text-amber-600 transition-colors">
                              <FaPlus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="w-full py-2 bg-[#1a120b] text-white font-cinzel text-xs 
                            font-bold uppercase tracking-widest hover:bg-amber-600 transition-all 
                            rounded-sm flex items-center justify-center gap-2">
                            Add to Cart
                            <FaArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-amber-500 text-4xl mb-4 opacity-50">🍽️</div>
                <p className="text-gray-400 text-lg font-cinzel">Preparing menu for {activeCategory}...</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* button */}
        <div className="mt-16 text-center">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-3 px-10 py-3 border border-[#1a120b] 
            text-[#1a120b] font-cinzel tracking-[0.2em] uppercase text-xs rounded-sm 
            hover:bg-[#1a120b] hover:text-white transition-all duration-300">
            Explore Menu
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;