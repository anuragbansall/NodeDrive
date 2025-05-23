import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import connectDB from "./db/connectDB.js";
import userRouter from "./routes/User.routes.js";
import cookieParser from "cookie-parser";
import uploadRouter from "./routes/Upload.routes.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(arcjetMiddleware); // Arcjet middleware for request protection

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the NodeDrive API!",
  });
});

// User routes
app.use("/api/v1/user", userRouter);

// File upload routes
app.use("/api/v1/upload", uploadRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong!";

  console.error(err.stack);
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
