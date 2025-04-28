import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

export const {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  ARCJET_KEY,
} = process.env;
  