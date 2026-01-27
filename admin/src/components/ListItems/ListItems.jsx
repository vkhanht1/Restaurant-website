import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit, FiX } from 'react-icons/fi';

const styles = {
  formWrapper: "min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-10 px-4 sm:px-6 lg:px-8 font-sans",
  inputField: "w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-amber-100 placeholder-white/20 transition-all",
};

const ListItems = () => {
  const API_URL = "https://miska-pho-backend.vercel.app";
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: '', name: '', description: '', price: '', category: '', image: null, preview: ''
  });

  const getImageUrl = (imageName) => {
    if (!imageName || imageName === "undefined") return 'https://placehold.co/60?text=NoImg';
    if (imageName.startsWith('http')) return imageName;
    const baseUrl = `${API_URL}/images/${imageName}`;
    return `${baseUrl}?t=${new Date().getTime()}`;
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category/list`);
      if (res.data.success) {
        setCategories(res.data.categories.map(c => c.name));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menu/list`);
      if (response.data.success) {
        const items = response.data.menuItems || response.data.data || [];
        setList(items);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);

  const removeFood = async (foodId) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;
    try {
      const response = await axios.post(`${API_URL}/api/menu/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      }
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  const handleEditClick = (item) => {
    setEditData({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: null,
      preview: getImageUrl(item.image)
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (editData.preview && editData.preview.startsWith('blob:')) {
        URL.revokeObjectURL(editData.preview);
      }
      setEditData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const closeEditModal = () => {
    if (editData.preview && editData.preview.startsWith('blob:')) {
      URL.revokeObjectURL(editData.preview);
    }
    setIsEditing(false);
    setEditData({ id: '', name: '', description: '', price: '', category: '', image: null, preview: '' });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editData.id);
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("price", Number(editData.price));
    formData.append("category", editData.category);

    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      const response = await axios.post(`${API_URL}/api/menu/update`, formData);
      if (response.data.success) {
        toast.success("Updated successfully!");
        closeEditModal();
        setTimeout(() => fetchList(), 200);
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error during update");
    }
  };

  return (
    <>
      <div className={`${styles.formWrapper} min-h-screen pt-10`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#2D1B0E]/90 backdrop-blur-md border border-amber-900/30 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-amber-400 font-cinzel">
              Manage Menu Items
            </h2>

            <div className="overflow-x-auto rounded-xl border border-amber-900/30">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#3a2b2b] text-amber-400 text-sm uppercase">
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20">
                  {list.length > 0 ? (
                    list.map((item) => (
                      <tr key={item._id} className="hover:bg-amber-900/20 transition-colors">
                        <td className="p-4">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-amber-500/20"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/60?text=NoImg';
                            }}
                          />
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-amber-100">{item.name}</p>
                          <p className="text-xs text-amber-100/60 mt-1 line-clamp-1">{item.description}</p>
                        </td>
                        <td className="p-4 text-amber-200">{item.category}</td>
                        <td className="p-4 font-mono text-amber-400 font-bold">{item.price} zł</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleEditClick(item)} className="p-2 bg-blue-500/10 text-blue-400 
                            rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                              <FiEdit size={18} />
                            </button>
                            <button onClick={() => removeFood(item._id)} className="p-2 bg-red-500/10 text-red-400 
                            rounded-lg hover:bg-red-500 hover:text-white transition-all">
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-10 text-center text-amber-100/40">No items found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#2D1B0E] border border-amber-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] 
          overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-amber-500/20 pb-4">
                <h3 className="text-2xl font-bold text-amber-400 font-cinzel">Update Item</h3>
                <button onClick={closeEditModal} className="text-amber-400/60 hover:text-red-400">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={saveEdit} className="space-y-5">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-amber-500/30 group">
                    <img
                      src={editData.preview || 'https://placehold.co/128?text=NoPreview'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 
                    group-hover:opacity-100 cursor-pointer transition-all">
                      <span className="text-xs text-white bg-amber-600 px-2 py-1 rounded">Change Image</span>
                      <input type="file" hidden onChange={handleEditImageUpload} accept="image/*" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-400 text-sm mb-1">Name</label>
                    <input type="text" name="name" value={editData.name} onChange={handleEditChange} className={styles.inputField} required />
                  </div>
                  <div>
                    <label className="block text-amber-400 text-sm mb-1">Price (zł)</label>
                    <input type="number" name="price" value={editData.price} onChange={handleEditChange} className={styles.inputField} required />
                  </div>
                </div>

                <div>
                  <label className="block text-amber-400 text-sm mb-1">Category</label>
                  <select name="category" value={editData.category} onChange={handleEditChange} className={styles.inputField}>
                    <option value="" disabled>Select Category</option>
                    {categories.map((c, index) => (
                      <option key={index} value={c} className="bg-[#3a2b2b]">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-amber-400 text-sm mb-1">Description</label>
                  <textarea name="description" value={editData.description} onChange={handleEditChange} className={styles.inputField + " h-24"} required></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={closeEditModal} className="flex-1 py-2 rounded-lg border 
                  border-amber-500/30 text-amber-400 hover:bg-amber-900/50">Cancel</button>
                  <button type="submit" className="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 
                  to-orange-600 text-white font-bold">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItems;