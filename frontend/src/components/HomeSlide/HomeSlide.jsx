import React, { useState, useEffect } from 'react';
import { FaPlay, FaTimes, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import About1 from "../../assets/img8.jpg";
import About2 from "../../assets/img4.jpg";
import About3 from "../../assets/img2.jpg";

const slides = [
  {
    id: 1,
    image: About3,
    subtitle: "Welcome to MiskaPho",
    title: "The Art of European Dining",
    desc: "Immerse yourself in a luxurious atmosphere and savor culinary masterpieces."
  },
  {
    id: 2,
    image: About1,
    subtitle: "Great Ingredients",
    title: "Taste the Perfection",
    desc: "A perfect fusion of premium ingredients and top-notch culinary techniques."
  },
  {
    id: 3,
    image: About2,
    subtitle: "Unforgettable Memories",
    title: "Symphony of Flavors",
    desc: "Every dish tells a story, every glass of wine is a symphony."
  }
];

const HomeSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#0c1918]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out 
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className={`absolute inset-0 w-full h-full transform transition-transform 
            duration-[6000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'}`}>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] 
          via-transparent to-black/30"></div>
        </div>
      ))}

      {/* button */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-amber-500/70"></div>
              <span className="text-amber-400 font-cinzel uppercase tracking-[0.4em] t
              ext-xs md:text-sm font-light">
                {slides[currentSlide].subtitle}
              </span>
              <div className="h-[1px] w-12 bg-amber-500/70"></div>
            </div>

            {/* title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-dancingscript 
            text-white drop-shadow-lg tracking-wide">
              {slides[currentSlide].title}
            </h1>

            {/* description */}
            <p className="text-white/80 font-sans font-light text-base md:text-lg 
            max-w-2xl mx-auto leading-relaxed tracking-wide">
              {slides[currentSlide].desc}
            </p>

            {/* booking button */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
              <Link
                to="/book-table"
                className="group relative px-8 py-3 bg-amber-600/90 text-white 
                font-cinzel text-xs uppercase tracking-[0.2em] transition-all duration-500 
                hover:bg-amber-700 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Reserve Table
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* navigate */}
      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 
      z-30 p-4 rounded-full border border-white/10 text-white/50 hover:bg-white/10 
      hover:text-white hover:border-white transition-all duration-300 hidden md:block">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 
      z-30 p-4 rounded-full border border-white/10 text-white/50 hover:bg-white/10 hover:text-white 
      hover:border-white transition-all duration-300 hidden md:block">
        <FaChevronRight />
      </button>

      {/* dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-500 rounded-full 
            ${index === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>
    </div>
  );
};

export default HomeSlide;