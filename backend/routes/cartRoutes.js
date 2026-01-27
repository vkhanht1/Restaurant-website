import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
// user cart routes
const cartRoutes = express.Router();
// add an item to user's cart
cartRoutes.post("/add", protect, addToCart);
// user's cart
cartRoutes.get("/get", protect, getCart);
// remove item from cart
cartRoutes.delete("/remove/:menuId", protect, removeFromCart);

export default cartRoutes;
