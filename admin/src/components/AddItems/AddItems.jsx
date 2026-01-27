import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { TbCurrencyZloty } from "react-icons/tb";
import { toast } from 'react-toastify';

const styles = {
  formWrapper: "min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-10 px-4 sm:px-6 lg:px-8 font-sans",
  formCard: "bg-[#2D1B0E]/90 backdrop-blur-md border border-amber-900/30 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto",
  formTitle: "text-3xl font-bold mb-8 text-amber-400 font-cinzel text-center",
  uploadWrapper: "flex justify-center mb-8",
  uploadLabel: "w-full max-w-sm h-64 bg-[#3a2b2b]/40 border-2 border-dashed border-amber-500/30 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-amber-400 hover:bg-[#3a2b2b]/60 transition-all group",
  uploadIcon: "text-4xl text-amber-500 mb-3 mx-auto group-hover:scale-110 transition-transform",
  uploadText: "text-amber-100/70 text-sm font-medium",
  previewImage: "w-full h-full object-cover",
  inputField: "w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-amber-400 text-amber-100 placeholder-white/20 transition-all text-base",
  relativeInput: "relative",
  zoltyIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 text-lg",
  gridTwoCols: "grid grid-cols-1 md:grid-cols-2 gap-6",
  actionBtn: "w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-95 mt-8 uppercase tracking-widest",
};

const AddItems = ({ url }) => {
  const API_URL = url || "https://miska-pho-backend.vercel.app";

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    total: 0,
    image: null,
    preview: ''
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/category/list`);
        if (res.data.success) {
          const catNames = res.data.categories.map(cat => cat.name);
          setCategories(catNames);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [API_URL]);


  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/menu/add`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.data.success) {
        toast.success("Menu item added successfully!");
        setFormData({
          name: '', description: '', category: '',
          price: '', total: 0, image: null, preview: ''
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error('Error uploading item:', err);
      toast.error("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Add New Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className={styles.uploadWrapper}>
            <label className={styles.uploadLabel}>
              {formData.preview ? (
                <img src={formData.preview} alt="Preview" className={styles.previewImage} />
              ) : (
                <div className="text-center p-6">
                  <FiUpload className={styles.uploadIcon} />
                  <p className={styles.uploadText}>Click to upload product image</p>
                  <p className="text-xs text-amber-500/40 mt-1">(Max 5MB)</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                required />
            </label>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-bold text-amber-400 uppercase tracking-wide">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Enter product name"
                required />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-amber-400 uppercase tracking-wide">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`${styles.inputField} h-32 resize-none`}
                placeholder="Enter product description"
                required />
            </div>

            <div className={styles.gridTwoCols}>
              <div>
                <label className="block mb-2 text-sm font-bold text-amber-400 uppercase tracking-wide">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  required>
                  <option value="" className="text-gray-400">Select Category</option>
                  {categories.map((c, index) => (
                    <option key={index} value={c} className="bg-[#3a2b2b]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-amber-400 uppercase tracking-wide">
                  Price (zł)
                </label>
                <div className={styles.relativeInput}>
                  <TbCurrencyZloty className={styles.zoltyIcon} />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`${styles.inputField} pl-10 sm:pl-12`}
                    placeholder="0.00" min="0" step="0.01"
                    required />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.actionBtn}>
              Add to Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;