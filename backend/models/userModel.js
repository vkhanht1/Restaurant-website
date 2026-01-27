import mongoose from "mongoose";
// user schema 
const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   isAdmin: { type: Boolean, default: false }
}, { timestamps: true });
// create the user model
const User = mongoose.model("User", userSchema);

export default User;