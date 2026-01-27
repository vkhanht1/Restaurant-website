import Order from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
// initialize stripe gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = "https://miska-pho-frontend.vercel.app";
// initialize new order and handle payment logic
export const createOrder = async (req, res) => {
  try {
    // security check
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const userId = req.user._id;
    const {
      firstName, lastName, phone, email,
      address, city, zipCode, note,
      paymentMethod, subtotal, tax, total,
      items
    } = req.body;
    // validate the cart
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // format items for order schema
    const orderItems = items.map((item) => ({
      item: { name: item.name, price: Number(item.price), imageUrl: item.imageUrl || '' },
      quantity: Number(item.quantity)
    }));
    // initialize order document
    const newOrder = new Order({
      user: userId, firstName, lastName, phone, email, address, city, zipCode,
      note: note || "", paymentMethod, subtotal, tax, total,
      items: orderItems, paymentStatus: 'pending'
    });
    // logic for online payment
    if (paymentMethod === 'online') {
      const line_items = orderItems.map((o) => ({
        price_data: {
          currency: 'pln',
          product_data: { name: o.item.name },
          unit_amount: Math.round(o.item.price * 100)
        },
        quantity: o.quantity
      }));
      // delivery fee
      line_items.push({
        price_data: { currency: "pln", product_data: { name: "Delivery Fee" }, unit_amount: 200 },
        quantity: 1
      });
      // tax
      if (tax > 0) {
        line_items.push({
          price_data: {
            currency: "pln",
            product_data: { name: "Tax (5%)" },
            unit_amount: Math.round(tax * 100)
          },
          quantity: 1
        });
      }
      // create secure stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: line_items,
        customer_email: email,
        success_url: `${FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
      });
      newOrder.sessionId = session.id;
      await newOrder.save();
      return res.status(201).json({ success: true, session_url: session.url, orderId: newOrder._id });
    } else {
      // cod payment
      await newOrder.save();
      return res.status(201).json({ success: true, order: newOrder });
    }
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: error.message });
  }
};
// verify stripe payment status/update order
export const confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: 'Session ID is required' });
    // retrieve session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // if stripe confirm 
    if (session.payment_status === 'paid') {
      const updatedOrder = await Order.findOneAndUpdate(
        { sessionId: sessionId },
        { paymentStatus: 'paid' },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      return res.json({ success: true, message: "Payment Verified and Order Updated" });
    }
    return res.json({ success: false, message: "Payment Not Verified" });
  } catch (err) {
    console.error("Payment Confirmation Error:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// user fetch order history 
export const getOrders = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetch User Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};
// admin fetch order history 
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Fetch All Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching all orders" });
  }
};
// admin update status 
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status: status });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};
// admin delete order
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Order Permanently Deleted" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.json({ success: false, message: "Error deleting order" });
  }
};