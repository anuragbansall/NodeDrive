import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadFile } from "../controllers/Upload.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", authorize, upload.single("file"), uploadFile); // Upload a single file with the field name "file"

export default uploadRouter;
