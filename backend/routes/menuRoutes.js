import express from "express";
import upload from "../middlewares/multer.js";
import { addMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";

// menu management routes
const menuRoutes = express.Router();
// add new menu
menuRoutes.post("/add", upload.single("image"), addMenuItem);
// fetch all menu
menuRoutes.get("/list", getAllMenuItems);
// delete menu item
menuRoutes.post("/remove", deleteMenuItem);
// update menu details or image
menuRoutes.post("/update", upload.single("image"), updateMenuItem);

export default menuRoutes;