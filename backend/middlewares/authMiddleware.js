import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
// middleware protect routes/verify jwt
export const protect = async (req, res, next) => {
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         token = req.headers.authorization.split(" ")[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decoded.id).select("-password");
         if (!req.user) {
            return res.status(401).json({ message: "User not found with this token" });
         }
         next();
      } catch (error) {
         console.error("Auth Middleware Error:", error.message);
         return res.status(401).json({ message: "Not authorized, token failed" });
      }
   }
   if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
   }
};
// middleware restrict and protect
export const adminOnly = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      console.log(" Admin check failed for:", req.user ? req.user.email : "Unknown");
      res.status(401).json({ message: "Not authorized as an admin" });
   }
};