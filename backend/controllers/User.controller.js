import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.model.js";
import { validationResult, matchedData } from "express-validator";
import aj from "../config/arcjet.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg || "Validation failed");
      error.statusCode = 422;
      error.validationErrors = errors.array();
      throw error;
    }

    const data = matchedData(req);
    const { name, email, password } = data;

    if (!name || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    const decision = await aj.protect(req, {
      requested: 1,
      email: email,
      ua: req.headers["user-agent"] || "Unknown-UA",
      ip: req.ip,
    });

    if (decision.isDenied()) {
      const error = new Error("Email validation failed");
      error.status = 403; // Forbidden
      throw error;
    }

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser, res);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: password,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg || "Validation failed");
      error.statusCode = 422;
      error.validationErrors = errors.array();
      throw error;
    }

    const data = matchedData(req);
    const { email, password } = data;

    if (!email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user, res);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: password,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
