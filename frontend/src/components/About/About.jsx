import React from 'react';
import { motion } from 'framer-motion';
import { GiChefToque, GiGrapes, GiKnifeFork } from 'react-icons/gi';
import About1 from "../../assets/img5.jpg";
import About2 from "../../assets/img1.jpg";
import About3 from "../../assets/img3.jpg";
import About4 from "../../assets/About.jpg";
import About5 from "../../assets/img9.jpg";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#1a120b] text-amber-50 font-sans overflow-hidden">
      <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(${About5})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(30%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b]/30 via-transparent to-[#1a120b] z-10"></div>

        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}>
            <span className="block text-amber-500 font-cinzel tracking-[0.3em] uppercase text-sm md:text-base mb-0 ">
              Est. 2018
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-dancingscript text-amber-100 mb-6 drop-shadow-lg">
              A Symphony of Taste
            </h1>
            <p className="text-lg md:text-xl text-amber-100/90 font-cinzel max-w-2xl mx-auto leading-relaxed">
              "Where cuisine is not merely a dish, but a symphony of emotions and memories."
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-500"></div>
              <span className="text-amber-500 font-cinzel uppercase tracking-widest text-sm">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-cinzel text-amber-100 mb-8 leading-tight">
              Heritage from the <br /> <span className="text-amber-600 italic font-serif">Imperial Gardens</span>
            </h2>
            <p className="text-amber-100/70 text-lg leading-relaxed font-sans mb-6 text-justify">
              Bringing the timeless spirit of Vietnam to the heart of Europe, our restaurant is built on a
              foundation of respect for nature and history. We blend the delicate traditions of the East with
              the modern elegance of the West.
            </p>
            <p className="text-amber-100/70 text-lg leading-relaxed font-sans text-justify">
              The space is designed to blur the boundaries between indoors and outdoors, evoking the
              sensation of "dining in an Eden garden." Every detail is meticulously curated, from the soft
              glow of candlelight to the soothing rhythms of Jazz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-t-full rounded-b-lg overflow-hidden border 
            border-amber-900/30 shadow-2xl shadow-amber-900/20 h-[600px]">
              <img
                src={About2}
                alt="Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      <section className="py-40 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `url(${About3})`
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-black/70"></div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10">
          <div className="mb-6 text-amber-500 text-4xl opacity-80">❝</div>
          <p className="text-3xl md:text-5xl font-dancingscript text-amber-100 mb-8 leading-relaxed drop-shadow-lg">
            "We don't just serve food, we serve memories."
          </p>

          <div className="flex items-center justify-center gap-4 opacity-70 mb-6">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="h-[1px] w-12 bg-amber-500"></div>
          </div>

          <p className="text-sm font-cinzel text-amber-500 uppercase tracking-[0.3em] font-bold">
            MiskaPho Team
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#231710]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>

            <div className="grid grid-cols-2 gap-4">
              <div className="mt-12 rounded-lg overflow-hidden h-80 shadow-xl">
                <img
                  src={About4}
                  alt="Chef"
                  className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden h-80 shadow-xl">
                <img
                  src={About1}
                  alt="Dish"
                  className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            <div className="flex items-center gap-4 mb-6 justify-end lg:justify-start">
              <span className="text-amber-500 font-cinzel uppercase tracking-widest text-sm">The Philosophy</span>
              <div className="w-12 h-[1px] bg-amber-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-cinzel text-amber-100 mb-8 leading-tight text-right lg:text-left">
              The Art of <br /> <span className="text-amber-600 italic font-serif">Cooking</span>
            </h2>
            <p className="text-amber-100/70 text-lg leading-relaxed font-sans mb-6 text-justify">
              Our Head Chef believes that cooking is a delicate balance between traditional Vietnamese
              heritage and modern innovation. We utilize the finest local European ingredients, combined
              with advanced culinary techniques, to create dishes that "awaken every sense."
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12 border-t border-amber-900/30 pt-8">
              <div className="text-center">
                <GiChefToque className="text-4xl text-amber-500 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-widest text-amber-200">Friendly Chef</p>
              </div>
              <div className="text-center">
                <GiGrapes className="text-4xl text-amber-500 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-widest text-amber-200">Fresh Ingredients</p>
              </div>
              <div className="text-center">
                <GiKnifeFork className="text-4xl text-amber-500 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-widest text-amber-200">Good Service</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;