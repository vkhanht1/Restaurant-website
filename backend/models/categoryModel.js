import mongoose from "mongoose";
// category schema
const categorySchema = new mongoose.Schema({
   name: { type: String, required: true },
   order: { type: Number, default: 0 }
}, { timestamps: true });
// model export
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;