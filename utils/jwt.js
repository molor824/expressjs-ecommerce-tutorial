import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;
if (!SECRET_KEY) {
  throw new Error("JWT secret key not found");
}

export function generate(user) {
  return jwt.sign({ id: user._id, password: user.password }, SECRET_KEY, {
    expiresIn: "1h",
  });
}
export async function getUser(token) {
  const { id, password } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User does not exist!");
  }
  if (user.password !== password) {
    throw new Error("Invalid JWT token!");
  }
  return user;
}
