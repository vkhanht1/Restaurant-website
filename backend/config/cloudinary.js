import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
// cloudinary configuration
const connectCloudinary = async () => {
   try {
      cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET
      });
      console.log("Cloudinary Connected Successfully");
   } catch (error) {
      console.log("Cloudinary Connection Failed", error);
   }
}

export default connectCloudinary;