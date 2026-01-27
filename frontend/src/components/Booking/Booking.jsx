import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FiCalendar, FiClock, FiUsers, FiUser, FiPhone, FiMessageSquare, FiMapPin, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BookingImg from "../../assets/img1.jpg";

const API_URL = 'https://miska-pho-backend.vercel.app';
const Booking = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        numberOfPeople: 2,
        note: ''
    });
    const today = new Date().toISOString().split('T')[0];
    const user = JSON.parse(localStorage.getItem('userInfo')) || {};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to book a table!");
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        if (formData.time) {
            const [hour, minute] = formData.time.split(':').map(Number);
            if (hour < 11 || hour > 21 || (hour === 21 && minute > 0)) {
                toast.error("We only accept bookings from 11:00 AM to 09:00 PM!");
                return;
            }
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `${API_URL}/api/bookings/create`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                toast.success("Table booked successfully!");
                setFormData({ name: '', phone: '', date: '', time: '', numberOfPeople: 2, note: '' });
                setTimeout(() => navigate('/my-bookings'), 1500);
            } else {
                toast.error(response.data.message || "Booking failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server connection error. Please try again later!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-25">
            <Toaster position="top-center" />
            <div
                className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: `url(${BookingImg}`
                }}
            ></div>
            <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[3px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-amber-500 font-cinzel uppercase tracking-[0.3em] text-sm">
                        Reservations
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-dancingscript text-amber-100 drop-shadow-lg">
                        Book A Table
                    </motion.h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <div className="space-y-8">
                        <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <h3 className="font-cinzel text-2xl text-amber-100 mb-8 border-b border-white/10 pb-4">
                                Reservation Info
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { icon: FiPhone, title: "Booking Hotline", text: "+48 792 700 838" },
                                    { icon: FiMapPin, title: "Location", text: "Złota 6, 00-019 Warszawa" },
                                    {
                                        icon: FiClock, title: "Dining Hours", text: (
                                            <>
                                                Mon-Fri: 11:00 AM - 09:30 PM <br />
                                                Sat-Sun: 12:00 AM - 22:30 PM
                                            </>
                                        )
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group">
                                        <div className="p-3 bg-white/5 rounded-full text-amber-500 group-hover:bg-amber-600 
                                        group-hover:text-black transition-all duration-300 border border-white/10">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-amber-100 uppercase tracking-wider text-xs mb-1"
                                            >{item.title}</p>
                                            <p className="text-amber-100/70 font-sans text-sm">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-amber-600/10 backdrop-blur-md p-6 rounded-2xl border border-amber-600/30
                         shadow-lg flex items-start gap-4">
                            <FiInfo className="text-amber-500 mt-1 flex-shrink-0" size={25} />
                            <p className="text-amber-100/80 italic text-sm leading-relaxed font-serif">
                                "For groups larger than 10 people, please contact us directly via phone for better arrangement.
                                We hold tables for 15 minutes past reservation time."
                            </p>
                        </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl h-fit">
                        <h3 className="font-cinzel text-2xl text-amber-100 mb-8 text-center">Table Reservation</h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* name*/}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-amber-100/60 ml-1">Your Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-3.5 text-amber-500" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder={user?.name || "Enter Name"}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-amber-100 
                                            focus:border-amber-500 focus:bg-white/10 focus:outline-none placeholder-white/20 
                                            transition-all"/>
                                    </div>
                                </div>
                                {/* phone */}
                                <div className="space-y-1">
                                    <label className="text-xs text-amber-100/60 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3 top-3.5 text-amber-500" />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+48..."
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-amber-100
                                            focus:border-amber-500 focus:bg-white/10 focus:outline-none placeholder-white/20 
                                            transition-all"/>
                                    </div>
                                </div>
                            </div>

                            {/* date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-amber-100/60 ml-1">Date</label>
                                    <div className="relative">
                                        <FiCalendar className="absolute left-3 top-3.5 text-amber-500" />
                                        <input
                                            type="date"
                                            name="date"
                                            min={today}
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 
                                            text-amber-100 focus:border-amber-500 focus:bg-white/10 focus:outline-none 
                                            transition-all [color-scheme:dark]"/>
                                    </div>
                                </div>
                                {/* time */}
                                <div className="space-y-1">
                                    <label className="text-xs text-amber-100/60 ml-1">Time</label>
                                    <div className="relative">
                                        <FiClock className="absolute left-3 top-3.5 text-amber-500" />
                                        <input
                                            type="time"
                                            name="time"
                                            min="11:00" max="21:00"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 
                                            text-amber-100 focus:border-amber-500 focus:bg-white/10 focus:outline-none 
                                            transition-all [color-scheme:dark]"/>
                                    </div>
                                </div>
                            </div>

                            {/* guest */}
                            <div className="space-y-1">
                                <label className="text-xs text-amber-100/60 ml-1">Number of Guests</label>
                                <div className="relative">
                                    <FiUsers className="absolute left-3 top-3.5 text-amber-500" />
                                    <input
                                        type="number"
                                        name="numberOfPeople"
                                        min="1" max="20"
                                        value={formData.numberOfPeople}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 
                                        text-amber-100 focus:border-amber-500 focus:bg-white/10 focus:outline-none 
                                        transition-all"/>
                                </div>
                            </div>

                            {/* note */}
                            <div className="space-y-1">
                                <label className="text-xs text-amber-100/60 ml-1">Special Request (Optional)</label>
                                <div className="relative">
                                    <FiMessageSquare className="absolute left-3 top-3.5 text-amber-500" />
                                    <textarea
                                        rows="3" name="note" value={formData.note} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 
                                        text-amber-100 focus:border-amber-500 focus:bg-white/10 focus:outline-none 
                                        placeholder-white/20 resize-none transition-all"
                                        placeholder="Ex: High chair, Window seat..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* submit */}
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 
                                text-white font-cinzel font-bold py-4 rounded-lg hover:from-amber-500 
                                hover:to-amber-600 transition-all shadow-lg hover:shadow-amber-500/20 mt-4 
                                disabled:opacity-50 flex justify-center items-center gap-2 uppercase tracking-widest text-sm">
                                {loading ? "Processing..." : "Confirm Reservation"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;