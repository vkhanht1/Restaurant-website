import express from "express";
import { adminLogin, getProfile, isAuth, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
// public auth routes
const authRoutes = express.Router();
// register new user
authRoutes.post("/register", registerUser);
// authenticate user / get token
authRoutes.post("/login", loginUser);
// login for admin
authRoutes.post("/admin/login", adminLogin);
// logout
authRoutes.post("/logout", logoutUser);

// protected auth routes

// retrieve personal
authRoutes.get("/profile", protect, getProfile);
// check session/token
authRoutes.get("/is-auth", protect, isAuth);

export default authRoutes;
