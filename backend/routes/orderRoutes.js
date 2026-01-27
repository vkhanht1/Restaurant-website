import express from 'express';
import { createOrder, confirmPayment, getOrders, getAllOrders, updateStatus, deleteOrder } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

// customer routes
const router = express.Router();

// create order
router.post('/place', protect, createOrder);
// confirm payment
router.post('/confirm', protect, confirmPayment);
// get order history
router.get('/myorders', protect, getOrders);

// admin routes

//fetch all orders
router.get('/all', protect, adminOnly, getAllOrders);
// update order status 
router.post('/status', protect, adminOnly, updateStatus);
// delete order
router.post('/delete', protect, adminOnly, deleteOrder);

export default router;