import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default function generateToken(user, res) {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
}
