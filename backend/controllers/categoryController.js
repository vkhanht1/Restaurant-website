import Category from "../models/categoryModel.js";
// create new category
export const addCategory = async (req, res) => {
  try {
    const { name, order } = req.body;
    // ensure name is provide
    if (!name) {
      return res.status(400).json({ message: "Name is required", success: false });
    }
    // check if duplicate
    const alreadyExists = await Category.findOne({ name });
    if (alreadyExists) {
      return res.status(400).json({ message: "Category already exists", success: false });
    }
    // create category with sort order
    const newCategory = await Category.create({
      name,
      order: order || 0
    });
    res.status(201).json({ message: "Category added", success: true, category: newCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
// get all category
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
// update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found", success: false });
    }
    if (name) category.name = name;
    await category.save();
    res.status(200).json({ message: "Category updated", success: true, category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
// delete category 
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
// update order field multiple category at once
export const reorderCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }
    // generate array of update
    const bulkOps = categories.map((cat, index) => {
      return {
        updateOne: {
          filter: { _id: cat._id },
          update: { order: index }
        }
      };
    });
    // execute all update
    if (bulkOps.length > 0) {
      await Category.bulkWrite(bulkOps);
    }
    res.json({ success: true, message: "Reordered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error reordering categories" });
  }
};