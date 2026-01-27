import Menu from "../models/menuModel.js";
import fs from "fs";
import path from "path";
// delete file from local storage
const deleteFile = (filename) => {
   if (!filename) return;
   const filePath = path.join("uploads", filename);
   if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
   }
};
// add new item to menu
export const addMenuItem = async (req, res) => {
   try {
      const { name, description, price, category } = req.body;
      if (!name || !description || !price || !category || !req.file) {
         return res.status(400).json({ success: false, message: "Missing fields" });
      }
      const newMenuItem = await Menu.create({
         name,
         description,
         price: Number(price),
         category,
         image: req.file.path
      });
      res.status(201).json({ success: true, message: "Item added", menuItem: newMenuItem });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
}
// retrieve all menu items
export const getAllMenuItems = async (req, res) => {
   try {
      const menuItems = await Menu.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, menuItems });
   } catch (error) {
      console.error("GET_ITEMS_ERROR:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
   }
}
// update an existing menu item
export const updateMenuItem = async (req, res) => {
   try {
      const { id } = req.body;
      const menuItem = await Menu.findById(id);
      if (!menuItem) return res.status(404).json({ success: false, message: "Not found" });
      if (req.file) {
         menuItem.image = req.file.path;
      }
      if (req.body.name) menuItem.name = req.body.name;
      if (req.body.description) menuItem.description = req.body.description;
      if (req.body.price) menuItem.price = Number(req.body.price);
      if (req.body.category) menuItem.category = req.body.category;
      await menuItem.save();
      res.json({ success: true, message: "Updated successfully" });
   } catch (error) {
      res.json({ success: false, message: "Update error" });
   }
};
// delete menu item
export const deleteMenuItem = async (req, res) => {
   try {
      const { id } = req.body;
      const menuItem = await Menu.findById(id);
      if (!menuItem) {
         return res.status(404).json({ success: false, message: "Menu item not found" });
      }
      deleteFile(menuItem.image);
      await Menu.findByIdAndDelete(id);
      res.json({ success: true, message: "Menu item deleted successfully" });
   } catch (error) {
      console.error("DELETE_ITEM_ERROR:", error);
      res.status(500).json({ success: false, message: "Error deleting menu item" });
   }
}