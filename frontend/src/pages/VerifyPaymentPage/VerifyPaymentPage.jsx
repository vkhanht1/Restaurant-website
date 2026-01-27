import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import axios from 'axios';

const VerifyPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const API_URL = "https://miska-pho-backend.vercel.app";

  useEffect(() => {
    const verifyPayment = async () => {
      if (success === "true" && sessionId) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            `${API_URL}/api/orders/confirm`,
            { sessionId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.success) {
            clearCart();
            navigate("/myorders");
          }
        } catch (error) {
          console.error("Confirmation error:", error);
          navigate("/");
        }
      } else {
        if (orderId) {
          const token = localStorage.getItem("token");
          try {
            await axios.post(
              `${API_URL}/api/orders/delete`,
              { id: orderId },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (error) {
            console.error("Cleanup error:", error);
          }
        }
        navigate("/cart");
      }
    };
    verifyPayment();
  }, [success, orderId, sessionId]);

  return (
    <div className="min-h-screen bg-[#1a120b] flex flex-col items-center justify-center text-amber-100">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold font-cinzel tracking-widest uppercase">
        Verifying Transaction...
      </h2>
      <p className="mt-2 text-amber-500/60 italic text-sm">Please do not close this window</p>
    </div>
  );
};

export default VerifyPaymentPage;