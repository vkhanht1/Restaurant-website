import React from 'react';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    {
      Icon: FaFacebookF,
      href: "https://www.facebook.com/MiskaPho",
    },
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/MiskaPho",
    },
    {
      Icon: FaMapMarkerAlt,
      href: "https://goo.gl/maps/WarsawPolandPlaceholder",
    },
  ];

  return (
    <footer className="bg-[#110c08] text-amber-50 py-16 px-4 border-t 
    border-amber-900/30 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-dancingscript text-amber-500">
              MiskaPho
            </h2>
            <p className="text-amber-100/60 text-sm leading-relaxed font-light">
              Bringing the authentic soul of Vietnamese cuisine to the heart of Warsaw.
              Traditional flavors, modern elegance.
            </p>

            <div className="flex justify-center md:justify-start gap-4 pt-2">
              {socialLinks.map((item, i) => {
                const { Icon, href } = item;
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-500/20
                    text-amber-500/60 hover:text-amber-500 hover:border-amber-500 transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-amber-100 font-cinzel text-sm uppercase tracking-[0.2em] font-bold">Discover</h3>
            <ul className="space-y-3 text-sm text-amber-100/60 font-light">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-amber-500 transition-colors">Our Menu</Link></li>
              <li><Link to="/book-table" className="hover:text-amber-500 transition-colors">Reservations</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact & Location</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-amber-100 font-cinzel text-sm uppercase tracking-[0.2em] font-bold">Information</h3>
            <ul className="space-y-3 text-sm text-amber-100/60 font-light">
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Allergen Info</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Work with Us</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-amber-100 font-cinzel text-sm uppercase tracking-[0.2em] font-bold">
              Newsletter
            </h3>
            <p className="text-amber-100/60 text-sm font-light">
              Join our culinary journey. Receive latest updates and seasonal offers.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className="bg-transparent border-b border-amber-500/30 py-2 text-sm text-amber-100 
                focus:outline-none focus:border-amber-500 placeholder-amber-100/30 transition-colors"
              />
              <button className="text-left text-xs uppercase tracking-widest text-amber-500
              hover:text-amber-400 font-bold transition-colors mt-2">
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-amber-900/20 pt-8 flex flex-col md:flex-row justify-between
        items-center gap-4 text-xs text-amber-100/40 font-light">
          <p>© 2025 MiskaPho Warsaw. All Rights Reserved.</p>
          <p>Designed with passion for Vietnamese Cuisine.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;