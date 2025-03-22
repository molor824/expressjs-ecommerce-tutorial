import User from "../models/user.js";
import * as jwt from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/async-handler.js";

const tokenResponder = (res, user) => {
  const token = jwt.generate(user);
  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 30 * 24 * 3600 * 1000,
  });
  res.end();
};
const login = asyncHandler(async (req, res) => {
  const { email, password: rawPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  if (!bcrypt.compareSync(rawPassword, user.password)) {
    res.status(401);
    throw new Error("Password does not match!");
  }

  tokenResponder(res, user);
});
const register = asyncHandler(async (req, res) => {
  const { name, email, password: rawPassword } = req.body;
  const password = bcrypt.hashSync(rawPassword, 10);

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("User with email already exists!");
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    res.status(500);
    throw new Error("Failed to create user");
  }

  tokenResponder(res, user);
});
const info = asyncHandler(async (req, res) => {
  const { name, email, _id } = req.user;
  res.json({ _id, name, email });
});
const updateInfo = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  await User.updateOne({ _id }, { name, email });
  res.end();
});
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.end();
});
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.end();
});
const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  await User.updateOne({ _id: req.params.id }, { name, email });
  res.end();
});

export {
  login,
  register,
  logout,
  info,
  allUsers,
  updateInfo,
  getUser,
  deleteUser,
  updateUser,
};
