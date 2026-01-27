import mongoose from "mongoose";
// menu schema
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });
// create and export menu model
const Menu = mongoose.model("Menu", menuSchema);

export default Menu;