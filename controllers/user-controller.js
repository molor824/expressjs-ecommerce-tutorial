import User from "../models/user.js";
import * as jwt from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/async-handler.js";

const userNotFound = (res) => {
  res.status(404);
  return new Error("User not found");
};

const getUserById = async (res, id) => {
  const user = await User.findById(id);
  if (!user) {
    throw userNotFound(res);
  }
};
const tokenResponder = (res, user) => {
  const token = jwt.generate(user);
  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 30 * 24 * 3600 * 1000,
  });
};
const login = asyncHandler(async (req, res) => {
  const { email, password: rawPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw userNotFound(res);
  }
  if (!bcrypt.compareSync(rawPassword, user.password)) {
    res.status(401);
    throw new Error("Password does not match!");
  }

  tokenResponder(res, user);
  res.json({ ...user, password: undefined });
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
  res.json({ ...user, password: undefined });
});
const info = asyncHandler(async (req, res) => {
  const { name, email, _id } = req.user;
  res.json({ _id, name, email });
});
const updateInfo = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  const user = await getUserById(res, _id);
  user.name = name;
  user.email = email;

  await user.save();
  res.json({ ...user, password: undefined });
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
  const user = await getUserById(res, req.params.id);
  res.json(user);
});
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.end();
});
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;

  const user = await getUserById(res, req.params.id);
  user.name = name;
  user.email = email;
  user.isAdmin = isAdmin;

  await user.save();

  res.json({ ...user, password: undefined });
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
