import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import ContactImg from "../../assets/img10.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', query: ''
  });

  const socialLinks = [
    { Icon: FaFacebookF, link: "https://www.facebook.com/miskapho" },
    { Icon: FaInstagram, link: "https://www.instagram.com/miskapho/" },
    { Icon: FaMapMarkerAlt, link: "https://maps.app.goo.gl/FFDMR9UbnKknJhuw8" }
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = ` New Message: My name: ${formData.name}, My phone: ${formData.phone}, Note: ${formData.query}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=48792700838&text=${encodeURIComponent(message)}`;
    toast.success('Opening WhatsApp...', {
      style: { border: '1px solid #166534', padding: '16px', color: '#fff', background: '#2D1B0E' },
      iconTheme: { primary: '#22c55e', secondary: '#fff' },
    });
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', phone: '', email: '', query: '' });
  }

  return (
    <div className="min-h-screen text-amber-100 font-sans py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-30">
      <Toaster position="top-center" />
      <div
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${ContactImg}`
        }}
      ></div>

      {/* overlay */}
      <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-[2px]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-amber-500 font-cinzel uppercase tracking-[0.3em] text-sm"
          >
            Get in Touch
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-dancingscript text-amber-100 drop-shadow-lg"
          >
            We'd Love to Hear From You
          </motion.h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h3 className="font-cinzel text-2xl text-amber-100 mb-8 border-b border-white/10 pb-4">
                Contact Information
              </h3>
              <div className="space-y-6">

                {/* info 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-full text-amber-500 group-hover:bg-amber-600 
                  group-hover:text-black transition-all duration-300 border border-white/5">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-amber-100 uppercase tracking-wider text-sm mb-1">Address</p>
                    <p className="text-amber-100/70 leading-relaxed font-light">
                      Złota 6, <br /> 00-019 Warszawa
                    </p>
                  </div>
                </div>

                {/* info 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-full text-amber-500 group-hover:bg-amber-600 
                  group-hover:text-black transition-all duration-300 border border-white/5">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-amber-100 uppercase tracking-wider text-sm mb-1">Phone</p>
                    <p className="text-amber-100/70 font-mono text-lg">+48 792 700 838</p>
                  </div>
                </div>

                {/* info 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-full text-amber-500 group-hover:bg-amber-600 
                  group-hover:text-black transition-all duration-300 border border-white/5">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-amber-100 uppercase tracking-wider text-sm mb-1">Email</p>
                    <p className="text-amber-100/70 font-light">miskapho@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* social */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                {socialLinks.map(({ Icon, link }, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center 
                    text-amber-100/60 hover:bg-amber-600 hover:text-white hover:border-amber-600 
                    transition-all duration-300">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* open hours */}
            <div className="bg-amber-600/10 backdrop-blur-md p-8 rounded-2xl border border-amber-600/30 
            shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-amber-500">
                <FiClock size={100} />
              </div>
              <h3 className="font-cinzel text-2xl text-amber-100 mb-6 flex items-center gap-3">
                Opening Hours
              </h3>
              <ul className="space-y-4 font-cinzel text-sm sm:text-base">
                <li className="flex justify-between border-b border-amber-100/10 pb-2">
                  <span className="text-amber-100/60">Mon - Fri</span>
                  <span className="text-amber-400 font-bold">11:00 AM - 09:30 PM</span>
                </li>
                <li className="flex justify-between border-b border-amber-100/10 pb-2">
                  <span className="text-amber-100/60">Saturday</span>
                  <span className="text-amber-400 font-bold">12:00 AM - 22:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-amber-100/60">Sunday</span>
                  <span className="text-amber-400 font-bold">12:00 AM - 22:30 PM</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h3 className="font-cinzel text-2xl text-amber-100 mb-6">Send Message via WhatsApp</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-amber-100/60 ml-1">Your Name</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-amber-100 
                      focus:border-amber-500 focus:bg-white/10 focus:outline-none transition-all placeholder-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-amber-100/60 ml-1">Phone Number</label>
                    <input
                      type="text" name="phone" value={formData.phone} onChange={handleChange} required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-amber-100 
                      focus:border-amber-500 focus:bg-white/10 focus:outline-none transition-all placeholder-white/20"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-amber-100/60 ml-1">Email (Optional)</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-amber-100 
                    focus:border-amber-500 focus:bg-white/10 focus:outline-none transition-all placeholder-white/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-amber-100/60 ml-1">Message</label>
                  <textarea
                    rows="4" name="query" value={formData.query} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-amber-100 
                    focus:border-amber-500 focus:bg-white/10 focus:outline-none resize-none transition-all placeholder-white/20"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg 
                hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-2 font-cinzel 
                tracking-wider text-sm border border-green-500/50">
                  Send to WhatsApp <FaWhatsapp size={20} />
                </button>
              </form>
            </div>

            {/* google-map */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.5682436331113!2d21.00883137670009!3d52.23306157198727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd10af5393db%3A0x711160f25751d8f4!2sMiska%20Pho%20%26%20BubbleFly!5e0!3m2!1svi!2spl!4v1768642259950!5m2!1svi!2spl" // Thay bằng link map thực tế của bạn
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:filter-none transition-all duration-700"
                title="Restaurant Location"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-lg border border-amber-500/30 
              pointer-events-none backdrop-blur-sm">
                <p className="text-amber-400 font-cinzel text-xs font-bold">Find us here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;