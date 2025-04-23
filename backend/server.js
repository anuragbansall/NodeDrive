import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import connectDB from "./db/connectDB.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the NodeDrive API!",
  });
});

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
