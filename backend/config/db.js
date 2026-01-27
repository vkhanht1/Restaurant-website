import mongoose from "mongoose";
// data connection configuration
export const connectDB = async (req, res) => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database connected")
   } catch (error) {
      console.log(`error in connecting database ${error}`)
   }
}