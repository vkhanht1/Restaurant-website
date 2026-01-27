import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import About1 from "../../assets/pho-history.jpg";
import About2 from "../../assets/nemran-history.jpg";
import About3 from "../../assets/buncha-history.jpg";
import About4 from "../../assets/caphe-history.jpg";

const TOPICS = [
  {
    id: 'pho',
    title: 'PHO',
    short: 'The Soul of Vietnam',
    desc: 'Pho is more than just a noodle soup; it\'s a culinary masterpiece. Our traditional recipe features a fragrant broth simmered for 24 hours with star anise, cinnamon, and ginger. Paired with tender beef, fresh herbs, and silky rice noodles, each spoonful tells a story of Vietnamese heritage.',
    image: About1,
  },
  {
    id: 'nem',
    title: 'NEM',
    short: 'Golden Crispy Rolls',
    desc: 'Our Spring Rolls are meticulously hand-wrapped with a delicate rice paper filled with minced pork, glass noodles, and wood ear mushrooms. Fried to a perfect golden crisp, they offer a delightful crunch, complemented by our signature sweet-and-sour dipping sauce.',
    image: About2,
  },
  {
    id: 'bun',
    title: 'Bun Cha',
    short: 'Grilled Pork Delight',
    desc: 'A favorite of Hanoi, Bun Cha features succulent grilled pork patties marinated in fish sauce and garlic, charred to perfection. Served in a light dipping sauce with pickled papaya, vermicelli noodles, and a mountain of fresh herbs, it creates a harmonious balance of sweet, sour, and savory.',
    image: About3,
  },
  {
    id: 'coffee',
    title: 'Ca Phe',
    short: 'Vietnamese Energy',
    desc: 'Experience the strong, rich, and uniquely sweet Vietnamese coffee. Our Ca Phe Sua Da is brewed using dark roasted robusta beans through a traditional phin filter, dripping slowly over condensed milk. A bold, aromatic awakening that invigorates your senses.',
    image: About4,
  }
];

const Cuisine = () => {
  const [selected, setSelected] = useState(TOPICS[0]);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8] overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-scales.png')" }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-amber-600 font-cinzel tracking-[0.3em] uppercase text-sm font-bold">
            Must-Try Experiences
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-serif text-[#2D1B0E] mt-4">
            The Art of <span className="text-red-600">Vietnamese</span> Cuisine
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            {TOPICS.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(topic)}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 
                  transition-all duration-300 ${selected.id === topic.id
                    ? 'border-amber-600 shadow-xl scale-105'
                    : 'border-transparent grayscale-[30%] hover:grayscale-0'
                  }`}>
                <img src={topic.image} alt={topic.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 
                to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white font-cinzel text-lg font-bold">{topic.title}</h4>
                  <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                    {topic.short}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative min-h-[550px] flex items-center lg:pl-6">
            <div className="absolute inset-0 bg-[#2D1B0E] rounded-3xl border border-amber-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"></div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-10 md:p-16 w-full h-full flex flex-col justify-center">
                <div className="mb-10">
                  <span className="text-amber-500/60 font-cinzel text-xs uppercase tracking-[0.5em] font-bold block mb-3">Discover</span>
                  <h3 className="text-5xl md:text-6xl font-serif text-amber-400 leading-tight">{selected.title}</h3>
                  <div className="w-32 h-[1px] bg-amber-600/40 mt-6"></div>
                </div>

                <p className="text-amber-50/90 text-xl md:text-2xl leading-relaxed font-serif italic 
                first-letter:text-8xl first-letter:font-bold first-letter:text-amber-500 
                first-letter:mr-5 first-letter:float-left first-letter:leading-[0.7] first-letter:mt-3
                selection:bg-amber-500 selection:text-[#2D1B0E]">
                  {selected.desc}
                </p>

                <div className="mt-12 pt-8 border-t border-amber-900/30">
                  <p className="text-amber-500/30 font-cinzel uppercase tracking-[0.3em] text-[10px] font-bold italic">
                    Authentic Miska Pho Experience
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cuisine;