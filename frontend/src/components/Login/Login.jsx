import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaArrowRight, FaUserPlus, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

const url = 'https://miska-pho-backend.vercel.app';
const Login = ({ onLoginSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', isError: false });

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${url}/api/auth/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        if (formData.rememberMe) {
          localStorage.setItem('loginData', JSON.stringify(formData));
        } else {
          localStorage.removeItem('loginData');
        }
        setToast({ visible: true, message: 'Login successful!', isError: false });
        setTimeout(() => {
          if (res.data.user.isAdmin === true || res.data.user.role === 'admin') {
            window.location.href = 'https://miska-pho-admin.vercel.app';
            return;
          }
          if (onLoginSuccess) {
            onLoginSuccess(res.data.user);
          }
          if (onClose) {
            onClose();
          }
        }, 1000);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Login failed';
      setToast({ visible: true, message: msg, isError: true });
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* toast */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-300
          ${toast.visible ?
            'translate-y-0 opacity-100'
            : '-translate-y-20 opacity-0'
          }`}>
        <div
          className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm 
            ${toast.isError
              ? 'bg-red-600 text-white'
              : 'bg-green-600 text-white'
            }`}>
          <FaCheckCircle className="flex-shrink-0" />
          <span>{toast.message}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* email */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-amber-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 
            focus:outline-none focus:ring-2 focus:ring-amber-600 pl-10 pr-4 py-3"
            required />
        </div>

        {/* password */}
        <div className="relative">
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-amber-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 
            focus:outline-none focus:ring-2 focus:ring-amber-600 pl-10 pr-4 py-3"
            required />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-amber-600 bg-[#2D1B0E] border-amber-400 
              rounded focus:ring-amber-600"/>
            <span className="ml-2 text-amber-100">Remember me</span>
          </label>
        </div>

        {/* button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold 
          rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
          Login <FaArrowRight />
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/signup"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-600 transition-colors">
          <FaUserPlus /> Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;