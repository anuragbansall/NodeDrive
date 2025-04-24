import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto", // Will auto-select "raw" for PDFs, videos, etc.
    format: async (req, file) => file.originalname.split(".").pop(), // Keep original extension
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    access_mode: "public",
  },
});

const upload = multer({ storage });

export default upload;
