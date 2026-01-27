import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();
const API_URL = "https://miska-pho-backend.vercel.app/api/cart";
// reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE_CART':
      return action.payload.map(cartItem => ({
        _id: cartItem.menuItem._id || cartItem._id,
        item: cartItem.menuItem || cartItem.item,
        quantity: cartItem.quantity
      }));

    case 'ADD_ITEM': {
      const { _id, item, quantity } = action.payload;
      const exists = state.find(ci => ci._id === _id);
      if (exists) {
        return state.map(ci =>
          ci._id === _id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...state, { _id, item, quantity }];
    }

    case 'UPDATE_ITEM': {
      const { _id, quantity } = action.payload;
      return state.map(ci =>
        ci._id === _id ? { ...ci, quantity } : ci
      );
    }

    case 'REMOVE_ITEM':
      return state.filter(ci => ci._id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

const initializer = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/get`, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const cartData = res.data.cartData || res.data.cart || res.data;
        if (cartData && Array.isArray(cartData)) {
          dispatch({ type: 'HYDRATE_CART', payload: cartData });
        }
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Error fetching cart:", err);
        }
      }
    };
    fetchCart();
  }, []);

  // add
  const addToCart = useCallback(async (item, qty) => {
    dispatch({ type: 'ADD_ITEM', payload: { _id: item._id, item, quantity: qty } });
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/add`,
        { menuId: item._id, quantity: qty },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
    } catch (error) {
      console.error("Error adding to cart (Backend):", error);
      if (error.response?.status === 401) {
        console.log("User not logged in or token expired, saving locally only.");
      }
    }
  }, []);

  // remove
  const removeFromCart = useCallback(async (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_URL}/remove/${itemId}`,
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, []);

  // update
  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({ type: 'UPDATE_ITEM', payload: { _id: itemId, quantity: newQuantity } });
  }, []);

  // clear 
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  }, []);

  // calculate
  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalAmount = cartItems.reduce((sum, ci) => {
    const price = ci?.item?.price ?? 0;
    const qty = ci?.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);