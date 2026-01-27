import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire, FaArrowRight } from 'react-icons/fa';
import About1 from "../../assets/img3.jpg";

const aboutfeature = [
  { icon: FaBolt, title: "Quick Order", text: "Seamless digital experience", color: "from-amber-400 to-orange-500" },
  { icon: FaRegClock, title: "Open 24/7", text: "24/7 premium service", color: "from-rose-400 to-pink-600" },
  { icon: FaCalendarCheck, title: " Booking", text: "Priority reservations", color: "from-emerald-400 to-cyan-600" },
  { icon: FaFire, title: "Signature Dishes", text: "Chef's special creations", color: "from-purple-400 to-indigo-600" }
];

const HomeAbout = () => {
  return (
    <section className="relative bg-[#1a120b] py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8">

            <div className="flex items-center gap-4">
              <span className="text-amber-500 font-cinzel uppercase tracking-[0.2em] text-sm">
                Since 2018
              </span>
              <div className="w-16 h-[1px] bg-amber-500/50"></div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-dancingscript 
            text-amber-100 leading-tight">
              Epicurean <br />
              <span className="text-amber-500">Elegance</span>
            </h2>

            <blockquote className="border-l-2 border-amber-500/30 pl-6 italic 
            text-amber-100/80 font-serif text-lg leading-relaxed">
              "In our kitchen, passion meets precision. We don't just create dishes;
              we craft culinary journeys that linger in the heart."
            </blockquote>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {aboutfeature.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-amber-900/20 border border-amber-500/20 
                  flex items-center justify-center text-amber-500 group-hover:bg-amber-500 
                  group-hover:text-[#1a120b] transition-all duration-300">
                    <item.icon size={18} />
                  </div>
                  <span className="text-amber-100/90 font-cinzel text-sm">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link to="/about" className="group inline-flex items-center gap-3 text-amber-500 
              font-cinzel tracking-widest uppercase text-sm hover:text-amber-400 transition-colors">
                Discover Our Story
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative">

            <div className="relative z-10 w-full h-[500px] lg:h-[600px] rounded-t-full rounded-b-lg 
            overflow-hidden border border-amber-900/30 shadow-2xl shadow-amber-900/10">
              <img
                src={About1}
                alt="Restaurant Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-transparent 
              to-transparent opacity-60"></div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-20 -left-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;