import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  deleteFiles,
  getFiles,
  uploadFile,
} from "../controllers/Upload.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", authorize, upload.single("file"), uploadFile); // Upload a single file with the field name "file"

uploadRouter.get("/", authorize, getFiles);

uploadRouter.delete("/", authorize, deleteFiles);

export default uploadRouter;
