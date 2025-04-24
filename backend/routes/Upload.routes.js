import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadFile } from "../controllers/Upload.controller.js";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), uploadFile); // Upload a single file with the field name "file"

export default uploadRouter;
