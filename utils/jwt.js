import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;
if (!SECRET_KEY) {
  throw new Error("JWT secret key not found");
}

export function generate(user) {
  return jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: "30d",
  });
}
export async function getUser(token) {
  const verifiedToken = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(verifiedToken.id).select("-password");

  return user;
}
