import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/CartPage/CartPage';
import SignUp from './components/SignUp/SignUp';
import ContactPage from './pages/ContactPage/ContactPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Menu from './pages/MenuPage/MenuPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MyOrdersPage from './pages/MyOredrsPage/MyOrdersPage';
import VerifyPaymentPage from './pages/VerifyPaymentPage/VerifyPaymentPage';
import BookingPage from './pages/BookingPage/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';

function App() {
  const [isCheckingLogout, setIsCheckingLogout] = useState(true);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    if (action === 'logout') {
      localStorage.clear();
      window.location.href = '/';
    } else {
      setIsCheckingLogout(false);
    }
  }, []);
  if (isCheckingLogout) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/verify" element={<VerifyPaymentPage />} />
      <Route path="/book-table" element={<BookingPage />} />
      <Route path="/myorders" element={<PrivateRoute><MyOrdersPage /></PrivateRoute>} />
      <Route path="/my-bookings" element={<PrivateRoute><MyBookingsPage /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
    </Routes>
  );
}

export default App;