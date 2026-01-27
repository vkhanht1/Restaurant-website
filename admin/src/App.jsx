import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import AddItems from './components/AddItems/AddItems';
import Orders from './components/Orders/Orders';
import ListItems from './components/ListItems/ListItems';
import Bookings from './components/Bookings/Bookings';
import Login from './components/Login/Login';
import Category from './components/Category/Category';
// main admin application
function App() {
  // backend api URL
  const url = "https://miska-pho-backend.vercel.app";
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="min-h-screen bg-[#1a120b]">
      <ToastContainer />
      {token ? (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-amber-900/30" />
          <div className="app-content pt-4">
            <Routes>
              <Route path="/" element={<AddItems url={url} />} />
              <Route path="/add" element={<AddItems url={url} />} />
              <Route path="/list" element={<ListItems url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
              <Route path="/bookings" element={<Bookings url={url} />} />
              <Route path="/category" element={<Category url={url} />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login url={url} setToken={setToken} />
      )}
    </div>
  );
}

export default App;