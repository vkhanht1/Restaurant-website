import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit2, FiCheck, FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const styles = {
    formWrapper: "min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-10 px-4 sm:px-6 lg:px-8 font-sans",
    inputField: "w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-amber-100 placeholder-white/20 transition-all",
    actionBtn: "w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-95 mt-4",
    iconBtn: "p-2 rounded-lg transition-all hover:bg-white/10 mx-0.5",
};

const Category = ({ url }) => {
    const API_URL = url || "https://miska-pho-backend.vercel.app";
    const [categories, setCategories] = useState([]);
    const [newCatName, setNewCatName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");

    const getToken = () => localStorage.getItem("token");

    const fetchCategories = useCallback(async () => {
        try {
            const res = await axios.get(`${API_URL}/api/category/list`);
            if (res.data.success) {
                const sorted = res.data.categories.sort((a, b) => (a.order || 0) - (b.order || 0));
                setCategories(sorted);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const newOrder = categories.length;

            const res = await axios.post(
                `${API_URL}/api/category/add`,
                { name: newCatName, order: newOrder },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                toast.success("Added successfully");
                setNewCatName("");
                fetchCategories();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error adding");
        }
    }

    const startEditing = (item) => {
        setEditingId(item._id);
        setEditName(item.name);
    };

    const saveEdit = async (id) => {
        try {
            const token = getToken();
            const res = await axios.post(
                `${API_URL}/api/category/update/${id}`,
                { name: editName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                toast.success("Updated");
                setEditingId(null);
                fetchCategories();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const removeCategory = async (id) => {
        if (!window.confirm("Delete this category?")) return;
        try {
            const token = getToken();
            const res = await axios.post(
                `${API_URL}/api/category/remove/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                toast.success("Deleted");
                fetchCategories();
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const moveCategory = async (index, direction) => {
        const newCategories = [...categories];
        if (direction === -1 && index === 0) return;
        if (direction === 1 && index === newCategories.length - 1) return;
        const itemToMove = newCategories[index];
        newCategories.splice(index, 1);
        newCategories.splice(index + direction, 0, itemToMove);
        setCategories(newCategories);

        try {
            const token = getToken();
            await axios.post(
                `${API_URL}/api/category/reorder`,
                { categories: newCategories },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Reorder fail:", error);
            toast.error("Failed to save order");
            fetchCategories();
        }
    };

    return (
        <div className={styles.formWrapper}>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#2D1B0E]/90 p-8 rounded-2xl border border-amber-900/30 shadow-2xl h-fit">
                    <h3 className="text-2xl text-amber-400 font-bold mb-6 font-cinzel text-center">Add New Category</h3>
                    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-amber-100 font-medium ml-1">Category Name</label>
                            <input
                                onChange={(e) => setNewCatName(e.target.value)}
                                value={newCatName}
                                type="text"
                                placeholder="Ex: Pizza..."
                                className={styles.inputField}
                                required />
                        </div>
                        <button type="submit" className={styles.actionBtn}>Add Category</button>
                    </form>
                </div>

                <div className="bg-[#2D1B0E]/90 p-8 rounded-2xl border border-amber-900/30 shadow-2xl">
                    <h3 className="text-2xl text-amber-400 font-bold mb-6 font-cinzel text-center">Current Categories</h3>

                    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin 
                    scrollbar-thumb-amber-900/50 scrollbar-track-transparent">
                        {categories.map((item, index) => (
                            <div key={item._id || index} className="flex justify-between items-center bg-black/20 
                            p-3 rounded-xl border border-amber-500/10 hover:bg-white/5 transition-colors group">

                                <div className="flex-1 min-w-0 mr-2">
                                    {editingId === item._id ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="bg-black/40 text-amber-100 px-3 py-1.5 rounded border 
                                                border-amber-500/50 focus:outline-none w-full text-sm"
                                                autoFocus
                                            />
                                            <button onClick={() => saveEdit(item._id)} className="text-emerald-400 
                                            hover:bg-emerald-500/20 p-1.5 rounded">
                                                <FiCheck size={16} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="text-red-400 
                                            hover:bg-red-500/20 p-1.5 rounded">
                                                <FiX size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-amber-100 font-medium text-lg pl-2 truncate">{item.name}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <div className="flex flex-col mr-2 bg-white/5 rounded-lg">
                                        <button
                                            onClick={() => moveCategory(index, -1)}
                                            disabled={index === 0}
                                            className="p-1 text-amber-400/50 hover:text-amber-400 disabled:opacity-20 transition-colors">
                                            <FiArrowUp size={14} />
                                        </button>
                                        <button
                                            onClick={() => moveCategory(index, 1)}
                                            disabled={index === categories.length - 1}
                                            className="p-1 text-amber-400/50 hover:text-amber-400 disabled:opacity-20 transition-colors">
                                            <FiArrowDown size={14} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => startEditing(item)}
                                        disabled={editingId !== null}
                                        className={`${styles.iconBtn} text-blue-400/60 hover:text-blue-400 disabled:opacity-30`}
                                        title="Edit">
                                        <FiEdit2 size={18} />
                                    </button>

                                    <button
                                        onClick={() => removeCategory(item._id)}
                                        className={`${styles.iconBtn} text-red-400/60 hover:text-red-400`}
                                        title="Delete">
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <p className="text-center text-amber-100/40 py-6">No categories found.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Category;