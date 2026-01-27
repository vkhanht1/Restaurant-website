import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ url, setToken }) => {
    const [data, setData] = useState({ email: "", password: "" });
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/auth/login`, data);
            if (response.data.success) {
                if (response.data.user.isAdmin) {
                    localStorage.setItem("token", response.data.token);
                    setToken(response.data.token);
                    toast.success("Welcome Admin!");
                } else {
                    toast.error("You are not authorized as Admin");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a120b]">
            <div className="bg-[#2D1B0E] p-8 rounded-2xl shadow-2xl w-full max-w-md 
            border border-amber-500/20">
                <h2 className="text-3xl font-bold text-center text-amber-400 mb-6 
                font-serif">
                    Admin Login
                </h2>
                <form onSubmit={onLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-amber-100/80 text-sm">
                            Email
                        </label>
                        <input
                            name='email'
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder="admin@example.com"
                            required
                            className="p-3 rounded-lg bg-black/20 border border-amber-500/30 
                            text-amber-100 focus:outline-none focus:border-amber-500"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-amber-100/80 text-sm">Password</label>
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder="Your password"
                            required
                            className="p-3 rounded-lg bg-black/20 border border-amber-500/30 
                            text-amber-100 focus:outline-none focus:border-amber-500"/>
                    </div>
                    <button type="submit" className="mt-4 bg-gradient-to-r from-amber-600 to-orange-700 
                    text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;