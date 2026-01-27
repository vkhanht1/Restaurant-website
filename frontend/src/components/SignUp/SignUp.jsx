import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const url = 'https://miska-pho-backend.vercel.app';

const AwesomeToast = ({ message, icon }) => (
  <div className="animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-br
  from-amber-500 to-amber-600 px-6 py-4 rounded-lg shadow-lg border-2 border-amber-300/20 z-50">
    <span className="text-2xl mr-3 text-[#2D1B0E]">{icon}</span>
    <span className="font-semibold text-[#2D1B0E]">{message}</span>
  </div>
);

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', icon: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (toast.visible && toast.message === 'Registration successful!') {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: '', icon: null });
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, navigate]);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(' SignUp handleSubmit fired', formData);

    try {
      const res = await axios.post(`${url}/api/auth/register`, formData);
      console.log('register response:', res.data);
      if (res.data.success) {
        setToast({
          visible: true,
          message: 'Registration successful!',
          icon: <FaCheckCircle />,
        });
      } else {
        throw new Error(res.data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(' register error:', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed.';
      setToast({ visible: true, message: msg, icon: <FaCheckCircle /> });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant Background"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {toast.visible && <AwesomeToast message={toast.message} icon={toast.icon} />}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-[#2D1B0E]/90 
      to-[#4a372a]/90 p-8 rounded-xl shadow-2xl border-2 border-amber-700/30 transform 
      transition-all duration-300 backdrop-blur-md hover:shadow-amber-500/20">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 
        to-amber-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform 
        font-dancingscript tracking-wide">
          Create New Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1a120b]/60 text-amber-100 
            placeholder-amber-400/50 border border-amber-900/30 focus:outline-none focus:ring-2 
            focus:ring-amber-600 focus:border-transparent transition-all duration-200 hover:bg-[#1a120b]/80"
            required />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1a120b]/60 text-amber-100 
            placeholder-amber-400/50 border border-amber-900/30 focus:outline-none focus:ring-2 
            focus:ring-amber-600 focus:border-transparent transition-all duration-200 hover:bg-[#1a120b]/80"
            required />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1a120b]/60 text-amber-100 
              placeholder-amber-400/50 border border-amber-900/30 focus:outline-none focus:ring-2 
              focus:ring-amber-600 focus:border-transparent transition-all duration-200 hover:bg-[#1a120b]/80"
              required />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-4 flex items-center text-amber-500/70 hover:text-amber-400 
              transition-colors transform hover:scale-110">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-[#1a120b] 
            font-bold rounded-lg hover:from-amber-400 hover:to-amber-600 hover:shadow-lg hover:shadow-amber-500/20 
            transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wider text-sm mt-2">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="group inline-flex items-center text-amber-400 hover:text-amber-300 transition-all 
            duration-300 font-medium text-sm">
            <FaArrowLeft className="mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 
            group-hover:opacity-100 transition-all duration-300" />
            <span className="transform group-hover:-translate-x-1 transition-all duration-300">
              Back to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;