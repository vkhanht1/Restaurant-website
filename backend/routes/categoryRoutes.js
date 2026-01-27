import express from "express";
import { addCategory, deleteCategory, getAllCategories, updateCategory, reorderCategories } from "../controllers/categoryController.js";

// category management routes
const categoryRoutes = express.Router();
// retrieve all food
categoryRoutes.get("/list", getAllCategories);
// create new category
categoryRoutes.post("/add", addCategory);
// delete category
categoryRoutes.post("/remove/:id", deleteCategory);
// update category
categoryRoutes.post("/update/:id", updateCategory);
// update categories
categoryRoutes.post("/reorder", reorderCategories);

export default categoryRoutes;