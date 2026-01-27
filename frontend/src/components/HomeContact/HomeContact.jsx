import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, FaEnvelope, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContact = () => {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8] overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-scales.png')" }}>
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 text-center lg:text-left">
                        <div>
                            <span className="text-[#2D1B0E] font-cinzel uppercase tracking-[0.2em] 
                            text-sm font-bold border-b border-[#2D1B0E]/20 pb-1">
                                Visit Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-dancingscript text-[#1a120b] mt-4">
                                Find Our Location
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* contact information */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-600/10 flex items-center
                                    justify-center text-amber-600 shrink-0">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <h3 className="text-[#1a120b] font-cinzel font-bold text-lg">Address:</h3>
                                </div>
                                <p className="text-gray-600 font-sans leading-relaxed pl-0 lg:pl-14">
                                    Złota 6, <br />00-019 Warszawa
                                </p>
                                <div className="pl-0 lg:pl-14 pt-2 space-y-2">
                                    <p className="flex items-center justify-center lg:justify-start gap-2 text-gray-600
                                    hover:text-amber-600 transition-colors cursor-pointer">
                                        <FaPhoneAlt size={12} />+48 792 700 838
                                    </p>
                                    <p className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 
                                    hover:text-amber-600 transition-colors cursor-pointer">
                                        <FaEnvelope size={12} />miskapho@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-600/10 flex items-center justify-center 
                                    text-amber-600 shrink-0">
                                        <FaClock />
                                    </div>
                                    <h3 className="text-[#1a120b] font-cinzel font-bold text-lg">Opening Hours:</h3>
                                </div>
                                <ul className="text-gray-600 font-sans space-y-2 pl-0 lg:pl-14">
                                    <li className="flex justify-between md:justify-start gap-8">
                                        <span className="w-24 font-bold text-amber-600">Mon - Fri:</span>
                                        <span className="text-[#1a120b]">11:00 AM - 09:30 PM</span>
                                    </li>
                                    <li className="flex justify-between md:justify-start gap-8">
                                        <span className="w-24 font-bold text-amber-600">Sat - Sun:</span>
                                        <span className="text-[#1a120b]">12:00 AM - 10:30 PM</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#1a120b]/10 flex flex-col md:flex-row items-center 
                        gap-8 justify-between">
                            <div className="flex gap-4">
                                {[
                                    { Icon: FaFacebookF, link: "https://www.facebook.com/miskapho" },
                                    { Icon: FaInstagram, link: "https://www.instagram.com/miskapho/" },
                                    { Icon: FaMapMarkerAlt, link: "https://goo.gl/maps/WarsawAddress" }
                                ].map(({ Icon, link }, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-[#1a120b]/20 flex items-center
                                        justify-center text-[#1a120b]/60 hover:bg-amber-600 hover:text-white 
                                        hover:border-amber-600 transition-all duration-300">
                                        <Icon />
                                    </a>
                                ))}
                            </div>

                            <Link
                                to="/book-table"
                                className="group relative px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 
                                rounded-full overflow-hidden shadow-lg shadow-amber-900/10 hover:shadow-amber-600/30 
                                transition-all duration-300 transform hover:-translate-y-1">
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] 
                                transition-transform duration-500 skew-x-12"></div>
                                <div className="relative flex items-center gap-3 font-cinzel font-bold tracking-wider 
                                text-white text-sm uppercase">
                                    <FaCalendarAlt />
                                    <span>Book A Table</span>
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>

                    {/* google-map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full">
                        <div className="w-full h-[400px] bg-white p-2 rounded-2xl shadow-xl shadow-black/5 
                        border border-[#1a120b]/5">
                            <div className="w-full h-full rounded-xl overflow-hidden filter grayscale-[20%] 
                            hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    title="MiskaPho Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.5682436331113!2d21.00883137670009!3d52.23306157198727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd10af5393db%3A0x711160f25751d8f4!2sMiska%20Pho%20%26%20BubbleFly!5e0!3m2!1svi!2spl!4v1768907874398!5m2!1svi!2spl"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;