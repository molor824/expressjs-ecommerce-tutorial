import User from "../models/user.js";
import * as jwt from "../utils/jwt.js";
import bcrypt from "bcryptjs";

function tokenResponder(res, user) {
  const token = jwt.generate(user);
  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: new Date(Date.now() + 3600000),
  });
  res.json({ _id: user._id });
}
export async function login(req, res) {
  const { email, password: rawPassword } = req.body;
  const user = (await User.find({ email })).find((user) =>
    bcrypt.compareSync(rawPassword, user.password)
  );

  if (!user) {
    throw new Error("User not found!");
  }

  tokenResponder(res, user);
}
export async function register(req, res) {
  const { name, email, password: rawPassword } = req.body;
  const password = bcrypt.hashSync(rawPassword, 10);
  const user = await User.create({ name, email, password });

  if (!user) {
    throw new Error("Failed to create user");
  }

  tokenResponder(res, user);
}
export async function info(req, res) {
  const { name, email, _id } = req.user;
  res.json({ _id, name, email });
}
