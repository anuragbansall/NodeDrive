import express from "express";
import { login, logout, register } from "../controllers/User.controller.js";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter.post(
  "/register",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  register
);

userRouter.post(
  "/login",
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  login
);
userRouter.post("/logout", logout);

export default userRouter;
