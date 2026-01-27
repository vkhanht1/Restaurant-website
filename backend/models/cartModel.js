import mongoose from "mongoose";
// cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,

      }
    }
  ]
}, { timestamps: true });
// initialize and export cart model
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;