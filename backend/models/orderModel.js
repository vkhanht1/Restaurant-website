import mongoose from 'mongoose';
// order item schema
const orderItemSchema = new mongoose.Schema({
  item: {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true }
  },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: true });
// main order schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  note: { type: String, default: "" },
  items: [orderItemSchema],
  paymentMethod: { type: String, required: true, enum: ['cod', 'online'], index: true },
  paymentIntentId: { type: String },
  sessionId: { type: String, index: true },
  paymentStatus: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending', index: true },
  subtotal: { type: Number, required: true, min: 0 },
  tax: { type: Number, required: true, min: 0 },
  shipping: { type: Number, required: true, min: 0, default: 0 },
  total: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["Food Processing", "Out for Delivery", "Delivered", "Cancelled"],
    default: 'Food Processing',
    index: true
  },
}, { timestamps: true });
// check if model exists
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;