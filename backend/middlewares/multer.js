import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from 'cloudinary';
// destructure cloudinary v2
const { v2: cloudinary } = pkg;
// cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "miska",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
});
// multer middleware 
const upload = multer({ storage: storage });

export default upload;