import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1]);

    if (!token) {
      const error = new Error("Authentication token not found");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      const error = new Error("Invalid token or user not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
