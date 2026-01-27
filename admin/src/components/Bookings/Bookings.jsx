import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiUsers, FiMessageSquare, FiTrash2 } from 'react-icons/fi';

const layoutClasses = {
    page: 'min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8 font-sans',
    card: 'bg-[#4b3b3b]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-amber-500/20',
    heading: 'text-3xl font-bold mb-8 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent text-center font-cinzel',
};

const tableClasses = {
    wrapper: 'overflow-x-auto',
    table: 'w-full',
    headerRow: 'bg-[#3a2b2b]/50',
    headerCell: 'p-4 text-left text-amber-400 font-cinzel text-sm uppercase tracking-wider',
    row: 'border-b border-amber-500/20 hover:bg-[#3a2b2b]/30 transition-colors group',
    cellBase: 'p-4 text-amber-100/80 text-sm',
};

const Bookings = () => {
    const API_URL = "https://miska-pho-backend.vercel.app";
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const bookingStatusStyles = {
        Pending: {
            label: "Pending",
            color: "text-amber-400",
            border: "border-amber-400/50",
            bg: "bg-amber-400/10"
        },
        Confirmed: {
            label: "Confirmed",
            color: "text-emerald-400",
            border: "border-emerald-400/50",
            bg: "bg-emerald-400/10"
        },
        Cancelled: {
            label: "Cancelled",
            color: "text-red-400",
            border: "border-red-400/50",
            bg: "bg-red-400/10"
        }
    };

    const getToken = () => localStorage.getItem("token");
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = getToken();
                if (!token) return;

                const response = await axios.get(`${API_URL}/api/bookings/bookings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    const sortedList = response.data.bookings.reverse();
                    setList(sortedList);
                } else {
                    toast.error("Error fetching bookings");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error connecting to server");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        const originalList = [...list];
        setList(list.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));

        try {
            const token = getToken();
            const response = await axios.put(
                `${API_URL}/api/bookings/update-status/${bookingId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                toast.success(`Booking updated to ${newStatus}`);
            } else {
                setList(originalList);
                toast.error("Update failed");
            }
        } catch (error) {
            console.error(error);
            setList(originalList);
            toast.error("Error updating status");
        }
    };

    const removeBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to DELETE this reservation?")) return;

        try {
            const token = getToken();
            const response = await axios.post(
                `${API_URL}/api/bookings/delete`,
                { id: bookingId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                toast.success("Reservation deleted successfully");
                setList(prevList => prevList.filter(item => item._id !== bookingId));
            } else {
                toast.error("Error deleting reservation");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error connecting to server");
        }
    };

    return (
        <div className={layoutClasses.page}>
            <div className="max-w-7xl mx-auto">
                <div className={layoutClasses.card}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={layoutClasses.heading}>Table Reservations</h2>
                        <span className="text-amber-400/60 text-sm font-mono bg-amber-900/20 px-3 py-1 rounded-full
                        border border-amber-500/10">
                            Total: {list.length}
                        </span>
                    </div>
                    {loading ? (
                        <div className="text-center py-12 text-amber-400 animate-pulse font-cinzel">
                            Loading reservations...
                        </div>
                    ) : (
                        <div className={tableClasses.wrapper}>
                            <table className={tableClasses.table}>
                                <thead className={tableClasses.headerRow}>
                                    <tr>
                                        <th className="p-4 text-left font-cinzel text-amber-400 uppercase tracking-wider text-sm">Customer</th>git add .
                                        <th className="p-4 text-left font-cinzel text-amber-400 uppercase tracking-wider text-sm">Guests</th>
                                        <th className="p-4 text-left font-cinzel text-amber-400 uppercase tracking-wider text-sm">Date & Time</th>
                                        <th className="p-4 text-left font-cinzel text-amber-400 uppercase tracking-wider text-sm">Note</th>
                                        <th className="p-4 text-left font-cinzel text-amber-400 uppercase tracking-wider text-sm">Status</th>
                                        <th className="p-4 text-center font-cinzel text-amber-400 uppercase tracking-wider text-sm">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-900/20">
                                    {list.map((item) => {
                                        const currentStyle = bookingStatusStyles[item.status] || bookingStatusStyles.Pending;
                                        return (
                                            <tr key={item._id} className={tableClasses.row}>
                                                <td className="p-4">
                                                    <div className="font-bold text-amber-100">{item.name}</div>
                                                    <div className="text-xs text-amber-400/60 font-mono mt-1">{item.phone}</div>
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex items-center gap-2 text-amber-200">
                                                        <FiUsers className="text-amber-500" />
                                                        <span className="font-bold text-lg">{item.numberOfPeople}</span>
                                                    </div>
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-amber-100">
                                                            <FiCalendar className="text-amber-500" />
                                                            {new Date(item.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-amber-400/70">
                                                            <FiClock />
                                                            {item.time}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-4">
                                                    {item.note ? (
                                                        <div className="flex items-start gap-2 text-sm text-amber-100/80 italic max-w-[200px]">
                                                            <FiMessageSquare className="mt-1 flex-shrink-0 text-amber-500/50" />
                                                            "{item.note}"
                                                        </div>
                                                    ) : (
                                                        <span className="text-amber-900/40 text-sm">--</span>
                                                    )}
                                                </td>

                                                <td className="p-4">
                                                    <select
                                                        value={item.status}
                                                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                                        className={`bg-[#2D1B0E] 
                                                            ${currentStyle.color} 
                                                            ${currentStyle.border} border rounded-lg px-3 py-1.5 text-xs font-bold uppercase 
                                                            tracking-wide focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer
                                                            transition-all shadow-sm`}>
                                                        <option value="Pending" className="bg-[#2D1B0E] text-amber-400 py-2">Pending</option>
                                                        <option value="Confirmed" className="bg-[#2D1B0E] text-emerald-400 py-2">Confirmed</option>
                                                        <option value="Cancelled" className="bg-[#2D1B0E] text-red-400 py-2">Cancelled</option>
                                                    </select>
                                                </td>

                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => removeBooking(item._id)}
                                                        className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg 
                                                        transition-all active:scale-95"
                                                        title="Delete Reservation">
                                                        <FiTrash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {list.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-12 text-amber-400/40 text-lg border-t border-amber-900/20">
                                                No reservations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookings;