import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCalendar, FiClock, FiUsers, FiInfo, FiCheckCircle, FiXCircle, FiLoader, FiUser, FiPhone, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import About1 from "../../assets/img10.jpg";

const API_URL = "https://miska-pho-backend.vercel.app";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Please login to view bookings");
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`${API_URL}/api/bookings/my-bookings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setBookings(response.data.bookings);
                }
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Failed to load bookings. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const renderStatus = (status) => {
        const s = status?.toLowerCase();
        if (s === 'confirmed') {
            return <span className="text-green-400 bg-green-900/20 px-3 py-1 rounded-full 
            text-xs font-bold flex items-center gap-1 border border-green-500/20">
                <FiCheckCircle /> Confirmed
            </span>;
        } else if (s === 'cancelled') {
            return <span className="text-red-400 bg-red-900/20 px-3 py-1 rounded-full 
            text-xs font-bold flex items-center gap-1 border border-red-500/20">
                <FiXCircle /> Cancelled
            </span>;
        } else {
            return <span className="text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full 
            text-xs font-bold flex items-center gap-1 border border-yellow-500/20">
                <FiClock /> Pending
            </span>;
        }
    };
    if (loading) return (
        <div className="min-h-screen bg-[#1a120b] flex justify-center items-center 
        text-amber-500 gap-2 font-[Poppins]">
            <FiLoader className="animate-spin text-2xl" /> Loading reservations...
        </div>
    );
    if (error) return (
        <div className="min-h-screen bg-[#1a120b] flex flex-col justify-center items-center 
        text-amber-100 font-[Poppins] p-4 text-center">
            <FiAlertCircle className="text-4xl text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-white/60 mb-6">{error}</p>
            <Link to="/login" className="px-6 py-2 border border-amber-500 text-amber-500 
            rounded-full hover:bg-amber-500 hover:text-black transition-colors">
                Go to Login
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen relative font-[Poppins] pt-28 pb-12 px-4 md:px-8">
            <div className="absolute inset-0 z-0">
                <img
                    src={About1}
                    alt="Restaurant Background"
                    className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#1a120b]/80 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 
                        transition-colors group">
                        <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-lg">Back to Home</span>
                    </Link>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text bg-gradient-to-r
                text-amber-50 mb-2">
                    My Reservations
                </h1>
                <p className="text-amber-200/60 mb-8">History of your table bookings</p>
                {bookings.length === 0 ? (
                    <div className="text-center bg-[#4b3b3b]/20 backdrop-blur-md p-12 rounded-3xl 
                    border border-amber-500/10 flex flex-col items-center">
                        <div className="bg-amber-900/30 p-4 rounded-full mb-4">
                            <FiCalendar className="text-4xl text-amber-500/50" />
                        </div>
                        <h3 className="text-xl text-amber-100 font-bold mb-2">No bookings found</h3>
                        <p className="text-amber-500/50 mb-6 max-w-md">You haven't made any reservations yet.</p>
                        <Link to="/book-table" className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 
                        py-3 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-amber-500/20 
                        transition-all transform hover:-translate-y-1">
                            Book A Table Now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-[#2a1e14]/60 backdrop-blur-xl p-6 rounded-2xl 
                            border border-amber-500/10 hover:border-amber-500/30 transition-all hover:bg-[#2a1e14]/80 
                            group relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl 
                                -mr-10 -mt-10 pointer-events-none"></div>

                                {/* header */}
                                <div className="flex justify-between items-start mb-4 border-b border-amber-500/10 pb-4">
                                    <div>
                                        <p className="text-xs text-amber-500/60 font-bold uppercase tracking-wider mb-1">
                                            Date
                                        </p>
                                        <div className="text-xl text-amber-50 font-bold flex items-center gap-2">
                                            {new Date(booking.date).toLocaleDateString('en-GB',
                                                { day: 'numeric', month: 'short', year: 'numeric' }
                                            )}
                                        </div>
                                    </div>
                                    {renderStatus(booking.status)}
                                </div>

                                {/* body */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-black/20 rounded-xl">
                                            <span className="text-amber-200/60 flex items-center gap-2 text-xs 
                                            uppercase font-bold mb-1">
                                                <FiClock className="text-amber-500" /> Time
                                            </span>
                                            <span className="text-amber-50 font-bold font-mono text-lg">
                                                {booking.time}
                                            </span>
                                        </div>
                                        <div className="p-3 bg-black/20 rounded-xl">
                                            <span className="text-amber-200/60 flex items-center gap-2 text-xs 
                                            uppercase font-bold mb-1">
                                                <FiUsers className="text-amber-500" /> Guests
                                            </span>
                                            <span className="text-amber-50 font-bold text-lg">
                                                {booking.numberOfPeople}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-amber-900/10 p-3 rounded-lg border border-amber-500/10 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-amber-500/60 flex items-center gap-1 
                                            uppercase font-bold">
                                                <FiUser /> Name
                                            </span>
                                            <span className="text-sm text-amber-100 font-medium truncate
                                             max-w-[120px]">
                                                {booking.name || "Guest"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-amber-500/60 flex items-center 
                                            gap-1 uppercase font-bold">
                                                <FiPhone /> Phone
                                            </span>
                                            <span className="text-sm text-amber-100 font-medium font-mono">
                                                {booking.phone || "N/A"}
                                            </span>
                                        </div>
                                    </div>

                                    {booking.note && (
                                        <div className="bg-amber-900/10 p-3 rounded-lg border border-amber-500/10">
                                            <p className="text-[10px] text-amber-500/80 mb-1 flex items-center 
                                            gap-1 uppercase font-bold">
                                                <FiInfo /> Note
                                            </p>
                                            <p className="text-sm text-amber-100/80 italic line-clamp-2">
                                                "{booking.note}"
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* footer */}
                                <div className="mt-6 pt-4 flex justify-between items-end border-t border-amber-500/5">
                                    <div className="flex flex-col w-full items-end">
                                        <span className="text-[10px] text-amber-500/40 uppercase tracking-widest">
                                            Booked On
                                        </span>
                                        <span className="text-xs text-amber-500/80 font-mono">
                                            {new Date(booking.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;