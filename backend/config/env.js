import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

export const { PORT, MONGODB_URI } = process.env;
